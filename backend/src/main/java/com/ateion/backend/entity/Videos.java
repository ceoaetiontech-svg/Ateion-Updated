package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "videos")
public class Videos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    // YouTube Video ID (e.g. "ho32JRawRpw") — NOT the full URL
    @Column(name = "video_id", nullable = false, length = 20)
    private String videoId;

    // Keep videoUrl as nullable for future migration to R2/Vimeo
    @Column(name = "video_url")
    private String videoUrl;

    private Integer durationSeconds;  // FIXED: removed duplicate declaration

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    private Module module;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
