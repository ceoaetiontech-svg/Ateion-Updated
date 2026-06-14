package com.ateion.backend.repository;

import com.ateion.backend.entity.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Videos, Long> {
    List<Videos> findByModuleIdOrderByVideoOrderAsc(Long moduleId);

    // Prevents CEO from uploading the same playlist twice
    boolean existsByVideoId(String videoId);
    long countByModule_Course_Id(Long courseId);

    @Query("select v.id from Videos v where v.module.course.id = :courseId")
    List<Long> findIdsByCourseId(@Param("courseId") Long courseId);
}