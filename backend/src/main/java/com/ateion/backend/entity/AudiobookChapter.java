package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "audiobook_chapters")
public class AudiobookChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audiobook_id", nullable = false)
    private Audiobook audiobook;

    private String title;

    // YouTube video ID (e.g. "dQw4w9WgXcQ") — extracted from the URL
    @Column(name = "youtube_video_id")
    private String youtubeVideoId;

    // Duration in seconds (from YouTube API preview)
    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
