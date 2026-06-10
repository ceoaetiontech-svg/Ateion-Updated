package com.ateion.backend.service;

import com.ateion.backend.dto.VideoDTO;
import com.ateion.backend.entity.User;
import com.ateion.backend.entity.UserProgress;
import com.ateion.backend.entity.Videos;
import com.ateion.backend.repository.UserProgressRepository;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.repository.VideoRepository;
import com.ateion.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final VideoRepository videoRepository;
    private final JwtUtil jwtUtil;

    private static final int FREE_VIDEO_LIMIT = 3;

    /**
     * Core freemium gate. Called with the raw "Bearer xxx" header value.
     * Returns a VideoDTO (without the real videoId) if access is denied,
     * or a full VideoDTO if access is granted.
     */
    public VideoDTO requestVideoAccess(String bearerToken, Long videoId) {
        // 1. Resolve user from JWT
        String token = bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : bearerToken;
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        // 2. Resolve video
        Videos video = videoRepository.findById(videoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found"));

        // 3. Premium users: unlimited access
        if (Boolean.TRUE.equals(user.getIsPremium())) {
            return buildVideoDTO(video, true);
        }

        // 4. Already watched? Re-watch allowed
        if (progressRepository.existsByUserIdAndVideoId(user.getId(), videoId)) {
            return buildVideoDTO(video, true);
        }

        // 5. Freemium limit check
        long watched = progressRepository.countByUserId(user.getId());
        if (watched < FREE_VIDEO_LIMIT) {
            progressRepository.save(UserProgress.builder()
                    .userId(user.getId())
                    .videoId(videoId)
                    .build());
            return buildVideoDTO(video, true);
        }

        // 6. Limit hit — return 402
        throw new ResponseStatusException(HttpStatus.PAYMENT_REQUIRED,
                "Free limit reached. Upgrade to Premium to continue.");
    }

    private VideoDTO buildVideoDTO(Videos video, boolean includeVideoId) {
        return VideoDTO.builder()
                .id(video.getId())
                .title(video.getTitle())
                .videoId(includeVideoId ? video.getVideoId() : null)
                .durationSeconds(video.getDurationSeconds())
                .moduleId(video.getModule() != null ? video.getModule().getId() : null)
                .build();
    }
}
