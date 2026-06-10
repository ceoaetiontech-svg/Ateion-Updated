package com.ateion.backend.service;

import com.ateion.backend.dto.ModuleDTO;
import com.ateion.backend.entity.Module;
import com.ateion.backend.entity.Course;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public ModuleDTO createModule(ModuleDTO dto) {

        // 1. Production Safety Check: Reject modules that don't belong to a course
        if (dto.getCourseId() == null) {
            throw new IllegalArgumentException("Course ID is required to create a module");
        }

        // 2. Safely fetch the parent Course
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // 3. Build and link the Module
        Module module = Module.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .course(course)
                .build();

        // 4. Save to Supabase
        Module saved = moduleRepository.save(module);

        // 5. Return the mapped DTO
        return ModuleDTO.builder()
                .id(saved.getId())
                .title(saved.getTitle())
                .description(saved.getDescription())
                .courseId(saved.getCourse() != null ? saved.getCourse().getId() : null)
                .build();
    }
}