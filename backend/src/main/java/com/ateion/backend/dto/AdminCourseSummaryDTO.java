package com.ateion.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AdminCourseSummaryDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String price;
    private Boolean isFree;
    private String ageSegment;
    private String image;
    private String status;
    private long moduleCount;
    private long videoCount;
    private LocalDateTime createdAt;
    // ── Pricing v2 ────────────────────────────────────────────────────────────
    private Double originalPrice;
    private Double sellingPrice;
    private Double discountPercentage;
    private String currency;
    private String buttonText;
    // ── Age Group v2 ──────────────────────────────────────────────────────────
    private String ageGroup;
    // ── Course Highlights ─────────────────────────────────────────────────────
    private String highlights;
}

