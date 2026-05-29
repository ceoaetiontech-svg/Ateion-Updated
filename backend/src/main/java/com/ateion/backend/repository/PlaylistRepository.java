package com.ateion.backend.repository;

import com.ateion.backend.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    // This fetches the standalone Upskill videos meant for a specific age group
    List<Playlist> findByAgeSegment(String ageSegment);
}