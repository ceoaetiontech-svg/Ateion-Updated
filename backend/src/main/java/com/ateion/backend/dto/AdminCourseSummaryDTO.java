package com.ateion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AdminCourseSummaryDTO {
    private Long id;
    private String title;
    private String category;
    private String price;
    private Boolean isFree;
    private String ageSegment;
    private String image;
    private String description;
    private String status;
    private long moduleCount;
    private long videoCount;
    private LocalDateTime createdAt;
}
