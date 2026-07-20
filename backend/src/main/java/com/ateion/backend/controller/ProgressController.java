package com.ateion.backend.controller;

import com.ateion.backend.dto.ProgressResponseDTO;
import com.ateion.backend.dto.ProgressSummaryDTO;
import com.ateion.backend.entity.UserProgress;
import com.ateion.backend.repository.UserProgressRepository;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final UserProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;

    @GetMapping("/me")
    public ResponseEntity<ProgressSummaryDTO> getMyProgress(Authentication authentication) {
        Long userId = resolveUserId(authentication);
        long totalVideosWatched = progressRepository.countByUserId(userId);
        long freeVideosRemaining = Math.max(0, 3 - totalVideosWatched);

        return ResponseEntity.ok(ProgressSummaryDTO.builder()
                .totalVideosWatched(totalVideosWatched)
                .totalCoursesEnrolled(0)
                .freeVideosRemaining(freeVideosRemaining)
                .build());
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<List<ProgressResponseDTO>> getCourseProgress(
            @PathVariable Long courseId,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        List<Long> videoIds = videoRepository.findIdsByCourseId(courseId);
        List<UserProgress> progress = progressRepository.findByUserIdAndVideoIdIn(userId, videoIds);

        List<ProgressResponseDTO> response = progress.stream()
                .map(p -> ProgressResponseDTO.builder()
                        .id(p.getId())
                        .userId(p.getUserId())
                        .videoId(p.getVideoId())
                        .watchedAt(p.getWatchedAt())
                        .courseId(courseId)
                        .build())
                .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/courses/{courseId}")
    public ResponseEntity<Void> markVideoWatched(
            @PathVariable Long courseId,
            @RequestParam Long videoId,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        if (progressRepository.existsByUserIdAndVideoId(userId, videoId)) {
            return ResponseEntity.ok().build();
        }
        progressRepository.save(UserProgress.builder()
                .userId(userId)
                .videoId(videoId)
                .build());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    private Long resolveUserId(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"))
                .getId();
    }
}
