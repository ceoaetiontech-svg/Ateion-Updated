package com.ateion.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoodLogRequestDTO {

    @NotBlank(message = "Mood is required")
    @Size(max = 50, message = "Mood must be at most 50 characters")
    private String mood;

    @Size(max = 2000, message = "Journal entry must be at most 2000 characters")
    private String journalEntry;
}
