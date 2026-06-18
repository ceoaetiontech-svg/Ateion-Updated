package com.ateion.backend.controller;

import com.ateion.backend.dto.AdminCourseSummaryDTO;
import com.ateion.backend.service.AdminCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
public class AdminCourseController {

    private final AdminCourseService adminCourseService;

    @GetMapping
    public ResponseEntity<List<AdminCourseSummaryDTO>> getCourses() {
        return ResponseEntity.ok(adminCourseService.getCourses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCourse(@PathVariable Long id, @RequestBody com.ateion.backend.dto.CourseUpdateDTO dto) {
        adminCourseService.updateCourse(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        adminCourseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
