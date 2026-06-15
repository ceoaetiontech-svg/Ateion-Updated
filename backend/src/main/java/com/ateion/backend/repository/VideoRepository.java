package com.ateion.backend.repository;

import com.ateion.backend.entity.Videos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Videos, Long> {

    interface CourseVideoSummary {
        Long getCourseId();
        Long getPreviewModuleId();
        Long getVideoCount();
    }

    List<Videos> findByModuleIdOrderByVideoOrderAsc(Long moduleId);

    boolean existsByVideoId(String videoId);

    long countByModule_Course_Id(Long courseId);

    @Query("select v.id from Videos v where v.module.course.id = :courseId")
    List<Long> findIdsByCourseId(@Param("courseId") Long courseId);

    @Query("""
            select v.module.course.id as courseId,
                   min(v.module.id) as previewModuleId,
                   count(v.id) as videoCount
            from Videos v
            where v.module.course.id in :courseIds
            group by v.module.course.id
            """)
    List<CourseVideoSummary> summarizeByCourseIds(
            @Param("courseIds") Collection<Long> courseIds
    );
}
