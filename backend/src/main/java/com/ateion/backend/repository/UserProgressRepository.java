//This will do the counting for us automatically.
package com.ateion.backend.repository;

import com.ateion.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    // Counts how many free videos the user has consumed
    long countByUserId(Long userId); 
    
    // Checks if they are just re-watching a video they already unlocked
    boolean existsByUserIdAndVideoId(Long userId, Long videoId); 
}