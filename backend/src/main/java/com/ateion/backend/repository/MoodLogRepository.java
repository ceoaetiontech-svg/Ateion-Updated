package com.ateion.backend.repository;

import com.ateion.backend.entity.MoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MoodLogRepository extends JpaRepository<MoodLog, Long> {
    List<MoodLog> findByUserId(Long userId);

    List<MoodLog> findByUserIdAndLoggedAtBetween(Long userId, LocalDateTime from, LocalDateTime to);
}