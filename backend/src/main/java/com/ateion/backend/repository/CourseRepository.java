package com.ateion.backend.repository;

import com.ateion.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // This custom method lets us easily fetch only the courses meant for a specific age group!
    List<Course> findByAgeSegment(String ageSegment);
}