package com.ateion.backend.dto;

import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class VideoDTO {

    private Long id;

    private String title;

    // YouTube video ID (e.g. "ho32JRawRpw")
    private String videoId;

    private Integer durationSeconds;

    // For create/update requests — which module does this video belong to?
    private Long moduleId;

    // Thumbnail URL — computed from videoId, handy for frontend
    public String getThumbnailUrl() {
        if (videoId != null) {
            return "https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg";
        }
        return null;
    }
}
