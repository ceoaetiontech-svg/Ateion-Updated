package com.ateion.backend.repository;

import com.ateion.backend.entity.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Videos, Long> {

    List<Videos> findByModuleId(Long moduleId);

    List<Videos> findByPlaylistId(Long playlistId);
}
