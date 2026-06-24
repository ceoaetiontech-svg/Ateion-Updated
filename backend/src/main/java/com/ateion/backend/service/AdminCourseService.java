package com.ateion.backend.service;

import com.ateion.backend.dto.AdminCourseSummaryDTO;
import com.ateion.backend.dto.UpdateCourseRequestDTO;
import com.ateion.backend.entity.Course;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.repository.ModuleRepository;
import com.ateion.backend.repository.UserProgressRepository;
import com.ateion.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCourseService {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final VideoRepository videoRepository;
    private final UserProgressRepository userProgressRepository;

    @Transactional(readOnly = true)
    public List<AdminCourseSummaryDTO> getCourses() {
        return courseRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toSummaryDTO)
                .toList();
    }

    @Transactional
    public AdminCourseSummaryDTO updateCourse(Long courseId, UpdateCourseRequestDTO request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        if (request.getTitle() != null)              course.setTitle(request.getTitle());
        if (request.getDescription() != null)        course.setDescription(request.getDescription());
        if (request.getCategory() != null)           course.setCategory(request.getCategory());
        if (request.getAgeSegment() != null)         course.setAgeSegment(request.getAgeSegment());
        if (request.getPrice() != null)              course.setPrice(request.getPrice());
        if (request.getIsFree() != null)             course.setIsFree(request.getIsFree());
        if (request.getImage() != null)              course.setImage(request.getImage());
        // ── Pricing v2 — now fully stored in DB ─────────────────────────────
        if (request.getOriginalPrice() != null)      course.setOriginalPrice(request.getOriginalPrice());
        if (request.getSellingPrice() != null)       course.setSellingPrice(request.getSellingPrice());
        if (request.getDiscountPercentage() != null) course.setDiscountPercentage(request.getDiscountPercentage());
        if (request.getCurrency() != null)           course.setCurrency(request.getCurrency());
        if (request.getButtonText() != null)         course.setButtonText(request.getButtonText());
        // ── Age Group v2 ────────────────────────────────────────────────────
        if (request.getAgeGroup() != null)           course.setAgeGroup(request.getAgeGroup());
        // ── Course Highlights ───────────────────────────────────────────────
        if (request.getHighlights() != null)         course.setHighlights(request.getHighlights());

        courseRepository.save(course);
        return toSummaryDTO(course);
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        List<Long> videoIds = videoRepository.findIdsByCourseId(courseId);
        if (!videoIds.isEmpty()) {
            userProgressRepository.deleteByVideoIdIn(videoIds);
        }

        courseRepository.delete(course);
        courseRepository.flush();
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private AdminCourseSummaryDTO toSummaryDTO(Course course) {
        return new AdminCourseSummaryDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription()    != null ? course.getDescription()    : "",
                course.getCategory()       != null ? course.getCategory()       : "",
                course.getPrice()          != null ? course.getPrice()          : "0",
                course.getIsFree()         != null ? course.getIsFree()         : true,
                course.getAgeSegment()     != null ? course.getAgeSegment()     : "All Levels",
                course.getImage()          != null ? course.getImage()          : "",
                "Published",
                moduleRepository.countByCourse_Id(course.getId()),
                videoRepository.countByModule_Course_Id(course.getId()),
                course.getCreatedAt(),
                // ── Pricing v2 — read from real DB columns ───────────────────
                course.getOriginalPrice(),
                course.getSellingPrice(),
                course.getDiscountPercentage(),
                course.getCurrency()   != null ? course.getCurrency()   : "INR",
                course.getButtonText() != null ? course.getButtonText() : "Unlock Course",
                // ── Age Group v2 ─────────────────────────────────────────────
                course.getAgeGroup()   != null ? course.getAgeGroup()   : "",
                // ── Course Highlights ────────────────────────────────────────────
                course.getHighlights() != null ? course.getHighlights() : ""
        );
    }
}
