package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "videos")
public class Videos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, unique = true)
    private String videoId;

    private String thumbnailUrl;

    // CRITICAL FIX: Must be Long to prevent JpaSystemException from PostgreSQL BIGINT
    private Long durationSeconds;

    private Integer videoOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    private Module module;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}