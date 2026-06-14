package com.ateion.backend.controller;

import com.ateion.backend.dto.CourseFullDTO;
import com.ateion.backend.entity.Course;
import com.ateion.backend.entity.Module;
import com.ateion.backend.entity.Videos;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.repository.ModuleRepository;
import com.ateion.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CourseController {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final VideoRepository videoRepository;

    @GetMapping("/courses")
    public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
        List<Map<String, Object>> response = courseRepository.findAll().stream().map(c -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", c.getId());
            map.put("title", c.getTitle());
            map.put("description", c.getDescription() != null ? c.getDescription() : "");
            map.put("category", c.getCategory() != null ? c.getCategory() : "technology");
            map.put("ageSegment", c.getAgeSegment() != null ? c.getAgeSegment() : "All Levels");
            map.put("isFree", c.getIsFree() != null ? c.getIsFree() : true);
            map.put("price", c.getPrice() != null ? c.getPrice() : "0");
            map.put("image", c.getImage() != null ? c.getImage() : "");
            map.put("rating", c.getRating() != null ? c.getRating() : 5.0);
            map.put("enrollments", c.getEnrollments() != null ? c.getEnrollments() : 0);
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/courses/{id}/full")
    public ResponseEntity<CourseFullDTO> getCourseFull(@PathVariable Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        CourseFullDTO response = new CourseFullDTO();
        response.setId(course.getId());
        response.setTitle(course.getTitle());

        List<Module> modules = moduleRepository.findByCourseId(course.getId());
        List<CourseFullDTO.ModuleDTO> moduleDTOs = new ArrayList<>();

        for (Module mod : modules) {
            CourseFullDTO.ModuleDTO modDTO = new CourseFullDTO.ModuleDTO();
            modDTO.setId(mod.getId());
            modDTO.setTitle(mod.getTitle());

            List<Videos> videos = videoRepository.findByModuleIdOrderByVideoOrderAsc(mod.getId());
            List<CourseFullDTO.VideoDTO> videoDTOs = new ArrayList<>();

            for (Videos vid : videos) {
                CourseFullDTO.VideoDTO vidDTO = new CourseFullDTO.VideoDTO();
                vidDTO.setId(vid.getId());
                vidDTO.setTitle(vid.getTitle());
                // Safely cast Database BIGINT to Frontend Integer
                vidDTO.setDurationSeconds(vid.getDurationSeconds() != null ? vid.getDurationSeconds().intValue() : 0);
                vidDTO.setVideoOrder(vid.getVideoOrder());
                videoDTOs.add(vidDTO);
            }
            modDTO.setVideos(videoDTOs);
            moduleDTOs.add(modDTO);
        }
        response.setModules(moduleDTOs);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/videos/{id}/access")
    public ResponseEntity<Map<String, String>> getVideoAccess(@PathVariable Long id) {
        Videos video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        Map<String, String> response = new LinkedHashMap<>();
        response.put("youtubeVideoId", video.getVideoId());
        return ResponseEntity.ok(response);
    }
}