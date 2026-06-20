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
                .map(course -> new AdminCourseSummaryDTO(
                        course.getId(),
                        course.getTitle(),
                        course.getDescription() != null ? course.getDescription() : "",
                        course.getCategory() != null ? course.getCategory() : "technology",
                        course.getPrice() != null ? course.getPrice() : "0",
                        course.getIsFree() != null ? course.getIsFree() : true,
                        course.getAgeSegment() != null ? course.getAgeSegment() : "All Levels",
                        course.getImage() != null ? course.getImage() : "",
                        "Published",
                        moduleRepository.countByCourse_Id(course.getId()),
                        videoRepository.countByModule_Course_Id(course.getId()),
                        course.getCreatedAt()
                ))
                .toList();
    }

    @Transactional
    public AdminCourseSummaryDTO updateCourse(Long courseId, UpdateCourseRequestDTO request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        if (request.getTitle() != null)       course.setTitle(request.getTitle());
        if (request.getDescription() != null) course.setDescription(request.getDescription());
        if (request.getCategory() != null)    course.setCategory(request.getCategory());
        if (request.getAgeSegment() != null)  course.setAgeSegment(request.getAgeSegment());
        if (request.getPrice() != null)       course.setPrice(request.getPrice());
        if (request.getIsFree() != null)      course.setIsFree(request.getIsFree());
        if (request.getImage() != null)       course.setImage(request.getImage());

        courseRepository.save(course);

        return new AdminCourseSummaryDTO(
                course.getId(),
                course.getTitle(),
                course.getDescription() != null ? course.getDescription() : "",
                course.getCategory() != null ? course.getCategory() : "technology",
                course.getPrice() != null ? course.getPrice() : "0",
                course.getIsFree() != null ? course.getIsFree() : true,
                course.getAgeSegment() != null ? course.getAgeSegment() : "All Levels",
                course.getImage() != null ? course.getImage() : "",
                "Published",
                moduleRepository.countByCourse_Id(course.getId()),
                videoRepository.countByModule_Course_Id(course.getId()),
                course.getCreatedAt()
        );
    }

    @Transactional
    public void deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        List<Long> videoIds = videoRepository.findIdsByCourseId(courseId);
        if (!videoIds.isEmpty()) {
            userProgressRepository.deleteByVideoIdIn(videoIds);
        }

        // Course -> Module -> Videos is configured with cascade + orphanRemoval,
        // so deleting the course removes its curriculum from the database too.
        courseRepository.delete(course);
        courseRepository.flush();
    }
}
