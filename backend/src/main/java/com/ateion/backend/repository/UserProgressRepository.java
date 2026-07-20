//This will do the counting for us automatically.
package com.ateion.backend.repository;

import com.ateion.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    long countByUserId(Long userId);

    boolean existsByUserIdAndVideoId(Long userId, Long videoId);

    List<UserProgress> findByUserIdAndVideoIdIn(Long userId, Collection<Long> videoIds);

    long deleteByVideoIdIn(Collection<Long> videoIds);
}