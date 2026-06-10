package com.ateion.backend.controller;

import com.ateion.backend.dto.VideoDTO;
import com.ateion.backend.entity.Course;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;
    private final ProgressService progressService;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses(@RequestParam(required = false) String ageSegment) {
        if (ageSegment != null) {
            return ResponseEntity.ok(courseRepository.findByAgeSegment(ageSegment));
        }
        return ResponseEntity.ok(courseRepository.findAll());
    }

    // FIXED: replaced Long currentUserId = 1L with proper JWT extraction
    @PostMapping("/watch/{videoId}")
    public ResponseEntity<VideoDTO> watchVideo(
            @PathVariable Long videoId,
            @RequestHeader("Authorization") String bearerToken) {

        VideoDTO video = progressService.requestVideoAccess(bearerToken, videoId);
        return ResponseEntity.ok(video);
    }
}
