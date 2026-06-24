package com.ateion.backend.dto;

import lombok.Data;
import java.util.List;

public class YoutubeImportDTOs {

    @Data
    public static class PreviewRequest {
        private String playlistUrl;
    }

    @Data
    public static class PreviewResponse {
        private String playlistTitle;
        private String thumbnailUrl;
        private int totalVideos;
        private List<VideoItem> videos;
    }

    @Data
    public static class VideoItem {
        private String videoId;
        private String title;
        private String thumbnailUrl;
        private Integer durationSeconds; // Changed to Integer
        private Integer playlistOrder;
    }

    @Data
    public static class PublishRequest {
        private String title;
        private String description;
        private String ageSegment;
        private String category;
        private String price;
        private PreviewResponse previewData;
    }

    // ── Audiobook publish request ──────────────────────────────────────────────
    @Data
    public static class PublishAsAudiobookRequest {
        private String title;
        private String author;
        private String description;
        private String category;
        private String coverUrl;        // optional image URL pasted by admin
        private PreviewResponse previewData;
    }
}