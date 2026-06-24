package com.ateion.backend.controller;

import com.ateion.backend.dto.MoodLogRequestDTO;
import com.ateion.backend.dto.MoodLogResponseDTO;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.service.MoodLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/mood-logs")
@RequiredArgsConstructor
public class MoodLogController {

    private final MoodLogService moodLogService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<MoodLogResponseDTO> createMoodLog(
            @Valid @RequestBody MoodLogRequestDTO request,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(moodLogService.createMoodLog(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<MoodLogResponseDTO>> getOwnMoodLogs(
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        if (from != null || to != null) {
            return ResponseEntity.ok(moodLogService.getOwnMoodLogsByDateRange(userId, from, to));
        }
        return ResponseEntity.ok(moodLogService.getOwnMoodLogs(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoodLog(
            @PathVariable Long id,
            Authentication authentication
    ) {
        Long userId = resolveUserId(authentication);
        moodLogService.deleteMoodLog(userId, id);
        return ResponseEntity.noContent().build();
    }

    private Long resolveUserId(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"))
                .getId();
    }
}
