package com.ateion.backend.repository;

import com.ateion.backend.entity.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Videos, Long> {
    // Basic database operations inherited automatically from JpaRepository
}