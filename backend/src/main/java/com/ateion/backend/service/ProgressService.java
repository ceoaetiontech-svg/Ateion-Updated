//This is the brain of the operation where Siddhi's Paywall rule is enforced!
package com.ateion.backend.service;

import com.ateion.backend.entity.UserProgress;
import com.ateion.backend.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserProgressRepository progressRepository;

    // Enforces the Freemium 3-Video Paywall
    public boolean requestVideoAccess(Long userId, Long videoId) {
        
        // 1. If they already unlocked this specific video before, let them re-watch it!
        if (progressRepository.existsByUserIdAndVideoId(userId, videoId)) {
            return true;
        }

        // 2. Check how many unique videos they have unlocked so far
        long unlockedVideosCount = progressRepository.countByUserId(userId);

        // 3. The 3-Video Limit Paywall Rule
        if (unlockedVideosCount < 3) {
            // They have free views left! Record this unlock in the database and allow access.
            UserProgress newProgress = UserProgress.builder()
                    .userId(userId)
                    .videoId(videoId)
                    .build();
            progressRepository.save(newProgress);
            
            return true; // Access Granted
        } else {
            // They hit the limit! We block access and will trigger the "Unlock Full Course" prompt.
            return false; // Access Denied
        }
    }
}