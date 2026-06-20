package com.ateion.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateCourseRequestDTO {
    private String title;
    private String description;
    private String category;
    private String ageSegment;
    private String price;
    private Boolean isFree;
    private String image;
}
