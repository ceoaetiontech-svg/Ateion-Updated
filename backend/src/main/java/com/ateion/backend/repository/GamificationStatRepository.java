//Spring Boot makes leaderboards incredibly easy. By just naming our method correctly, it will automatically sort the students by their points!
package com.ateion.backend.repository;

import com.ateion.backend.entity.GamificationStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GamificationStatRepository extends JpaRepository<GamificationStat, Long> {
    
    // Automatically fetches the top 10 students with the highest points for our Leaderboard
    List<GamificationStat> findTop10ByOrderByTotalPointsDesc();
    
    // Finds a specific student's stats
    GamificationStat findByUserId(Long userId);
}