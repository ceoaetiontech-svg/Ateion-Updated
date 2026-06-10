package com.ateion.backend.controller;

import com.ateion.backend.dto.ModuleDTO;
import com.ateion.backend.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService moduleService;

    @PostMapping
    public ResponseEntity<ModuleDTO> createModule(@RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(moduleService.createModule(dto));
    }
}