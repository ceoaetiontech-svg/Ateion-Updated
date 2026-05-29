//You built the database tables, but we need API endpoints so the React frontend can actually fetch the videos and trigger the paywall!
package com.ateion.backend.controller;

import com.ateion.backend.entity.Course;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;
    private final ProgressService progressService;

    // 1. Fetch courses dynamically based on the student's Age Segment
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses(@RequestParam(required = false) String ageSegment) {
        if (ageSegment != null) {
            return ResponseEntity.ok(courseRepository.findByAgeSegment(ageSegment));
        }
        return ResponseEntity.ok(courseRepository.findAll());
    }

    // 2. The Freemium Video Request Endpoint (Siddhi's Logic)
    @PostMapping("/watch/{videoId}")
    public ResponseEntity<String> watchVideo(@PathVariable Long videoId) {
        // Hardcoded test user ID since Harsh is still building the Login!
        Long currentUserId = 1L; 

        boolean isAllowed = progressService.requestVideoAccess(currentUserId, videoId);

        if (isAllowed) {
            return ResponseEntity.ok("Access Granted! Enjoy the video.");
        } else {
            return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED)
                    .body("Limit Reached: Please Unlock Full Course to watch more videos!");
        }
    }
}