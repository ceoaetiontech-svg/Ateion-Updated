package com.ateion.backend.service;

import com.ateion.backend.dto.AdminCourseSummaryDTO;
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
                        course.getCategory() != null ? course.getCategory() : "technology",
                        course.getPrice() != null ? course.getPrice() : "0",
                        course.getIsFree() != null ? course.getIsFree() : true,
                        course.getAgeSegment() != null ? course.getAgeSegment() : "All Levels",
                        course.getImage() != null ? course.getImage() : "",
                        course.getDescription() != null ? course.getDescription() : "",
                        "Published",
                        moduleRepository.countByCourse_Id(course.getId()),
                        videoRepository.countByModule_Course_Id(course.getId()),
                        course.getCreatedAt()
                ))
                .toList();
    }

    @Transactional
    public void updateCourse(Long courseId, com.ateion.backend.dto.CourseUpdateDTO dto) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setCategory(dto.getCategory());
        course.setAgeSegment(dto.getAgeSegment());
        course.setPrice(dto.getPrice());
        course.setIsFree(dto.getPrice() == null || dto.getPrice().trim().equals("0") || dto.getPrice().trim().isEmpty());
        course.setImage(dto.getImage());

        courseRepository.save(course);
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
