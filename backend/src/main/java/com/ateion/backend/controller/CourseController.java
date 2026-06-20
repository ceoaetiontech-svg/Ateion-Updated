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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final VideoRepository videoRepository;

    @GetMapping("/courses")
    public ResponseEntity<List<Map<String, Object>>> getAllCourses() {
        List<Course> courses = courseRepository.findAllByOrderByCreatedAtDesc();
        List<Long> courseIds = courses.stream().map(Course::getId).toList();

        Map<Long, VideoRepository.CourseVideoSummary> videoSummaries = courseIds.isEmpty()
                ? Map.of()
                : videoRepository.summarizeByCourseIds(courseIds)
                .stream()
                .collect(Collectors.toMap(
                        VideoRepository.CourseVideoSummary::getCourseId,
                        Function.identity()
                ));

        List<Map<String, Object>> response = courses.stream()
                .map(course -> {
                    VideoRepository.CourseVideoSummary videoSummary = videoSummaries.get(course.getId());

                    Map<String, Object> map = new LinkedHashMap<>();
                    map.put("id", course.getId());
                    map.put("title", course.getTitle());
                    map.put("description", course.getDescription() != null ? course.getDescription() : "");
                    map.put("category", course.getCategory() != null ? course.getCategory() : "General");
                    map.put("ageSegment", course.getAgeSegment() != null ? course.getAgeSegment() : "All Levels");
                    map.put("isFree", course.getIsFree() != null ? course.getIsFree() : Boolean.TRUE);
                    map.put("price", course.getPrice() != null ? course.getPrice() : "0");
                    map.put("image", course.getImage() != null ? course.getImage() : "");
                    map.put("rating", course.getRating() != null ? course.getRating() : 5.0);
                    map.put("enrollments", course.getEnrollments() != null ? course.getEnrollments() : 0);
                    map.put("createdAt", course.getCreatedAt());
                    map.put("videoCount", videoSummary != null ? videoSummary.getVideoCount() : 0L);
                    map.put("previewModuleId", videoSummary != null ? videoSummary.getPreviewModuleId() : null);
                    return map;
                })
                .toList();

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

        for (Module module : modules) {
            CourseFullDTO.ModuleDTO moduleDTO = new CourseFullDTO.ModuleDTO();
            moduleDTO.setId(module.getId());
            moduleDTO.setTitle(module.getTitle());

            List<Videos> videos = videoRepository.findByModuleIdOrderByVideoOrderAsc(module.getId());
            List<CourseFullDTO.VideoDTO> videoDTOs = new ArrayList<>();

            for (Videos video : videos) {
                CourseFullDTO.VideoDTO videoDTO = new CourseFullDTO.VideoDTO();
                videoDTO.setId(video.getId());
                videoDTO.setTitle(video.getTitle());
                videoDTO.setDurationSeconds(
                        video.getDurationSeconds() != null
                                ? video.getDurationSeconds().intValue()
                                : 0
                );
                videoDTO.setVideoOrder(video.getVideoOrder());
                videoDTOs.add(videoDTO);
            }

            moduleDTO.setVideos(videoDTOs);
            moduleDTOs.add(moduleDTO);
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
