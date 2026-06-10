package com.ateion.backend.controller;

import com.ateion.backend.dto.VideoDTO;
import com.ateion.backend.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<List<VideoDTO>> getAllVideos() {
        return ResponseEntity.ok(videoService.getAllVideos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoDTO> getVideo(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }

    @PostMapping
    public ResponseEntity<VideoDTO> createVideo(@RequestBody VideoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(videoService.createVideo(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VideoDTO> updateVideo(@PathVariable Long id, @RequestBody VideoDTO dto) {
        return ResponseEntity.ok(videoService.updateVideo(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.noContent().build();
    }
}
