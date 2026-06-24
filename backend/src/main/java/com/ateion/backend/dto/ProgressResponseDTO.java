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
public class ProgressResponseDTO {
    private Long id;
    private Long userId;
    private Long videoId;
    private String videoTitle;
    private Long courseId;
    private String courseTitle;
    private LocalDateTime watchedAt;
}
