package com.ateion.backend.repository;

import com.ateion.backend.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    // Basic database operations inherited automatically from JpaRepository
}