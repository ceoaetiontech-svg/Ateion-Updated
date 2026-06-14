package com.ateion.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class CourseFullDTO {
    private Long id;
    private String title;
    private List<ModuleDTO> modules;

    @Data
    public static class ModuleDTO {
        private Long id;
        private String title;
        private List<VideoDTO> videos;
    }

    @Data
    public static class VideoDTO {
        private Long id;
        private String title;
        // PURPOSEFULLY EXCLUDED: videoId is hidden until the /access endpoint is called.
        private Integer durationSeconds;
        private Integer videoOrder;
    }
}