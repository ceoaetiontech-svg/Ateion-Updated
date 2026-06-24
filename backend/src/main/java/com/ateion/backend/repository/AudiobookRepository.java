package com.ateion.backend.repository;

import com.ateion.backend.entity.Audiobook;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AudiobookRepository extends JpaRepository<Audiobook, Long> {

    // Eagerly fetch chapters in a single JOIN to avoid LazyInitializationException
    // (required because spring.jpa.open-in-view=false closes the session early)
    @EntityGraph(attributePaths = {"chapters"})
    List<Audiobook> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"chapters"})
    Optional<Audiobook> findById(Long id);
}
