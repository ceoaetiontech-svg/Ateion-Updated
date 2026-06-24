package com.ateion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoodLogResponseDTO {
    private Long id;
    private Long userId;
    private String mood;
    private String journalEntry;
    private LocalDateTime loggedAt;
}
