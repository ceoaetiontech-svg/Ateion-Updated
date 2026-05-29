package com.ateion.backend.repository;

import com.ateion.backend.entity.MoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    // Allows us to fetch a specific student's mood history
    List<MoodLog> findByUserId(Long userId);
}