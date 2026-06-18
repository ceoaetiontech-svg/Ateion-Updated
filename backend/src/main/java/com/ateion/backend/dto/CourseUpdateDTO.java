package com.ateion.backend.dto;

import lombok.Data;

@Data
public class CourseUpdateDTO {
    private String title;
    private String description;
    private String category;
    private String ageSegment;
    private String price;
    private String image;
}
