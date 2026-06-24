package com.ateion.backend.controller;

import com.ateion.backend.dto.EnrollmentResponseDTO;
import com.ateion.backend.entity.Course;
import com.ateion.backend.entity.Enrollment;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.repository.EnrollmentRepository;
import com.ateion.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<EnrollmentResponseDTO> enroll(
            @RequestBody Map<String, Long> body,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        Long courseId = body.get("courseId");
        if (courseId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "courseId is required");
        }

        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Already enrolled in this course");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        Enrollment enrollment = Enrollment.builder()
                .userId(userId)
                .courseId(courseId)
                .build();
        Enrollment saved = enrollmentRepository.save(enrollment);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(toResponseDTO(saved, course.getTitle()));
    }

    @GetMapping("/me")
    public ResponseEntity<List<EnrollmentResponseDTO>> getMyEnrollments(Authentication authentication) {
        Long userId = resolveUserId(authentication);
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        List<EnrollmentResponseDTO> response = enrollments.stream()
                .map(e -> {
                    String courseTitle = courseRepository.findById(e.getCourseId())
                            .map(Course::getTitle)
                            .orElse("Unknown Course");
                    return toResponseDTO(e, courseTitle);
                })
                .toList();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> unenroll(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        if (!enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enrollment not found");
        }
        enrollmentRepository.deleteByUserIdAndCourseId(userId, courseId);
        return ResponseEntity.noContent().build();
    }

    private Long resolveUserId(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"))
                .getId();
    }

    private EnrollmentResponseDTO toResponseDTO(Enrollment enrollment, String courseTitle) {
        return EnrollmentResponseDTO.builder()
                .id(enrollment.getId())
                .userId(enrollment.getUserId())
                .courseId(enrollment.getCourseId())
                .courseTitle(courseTitle)
                .status(enrollment.getStatus())
                .enrolledAt(enrollment.getEnrolledAt())
                .build();
    }
}
