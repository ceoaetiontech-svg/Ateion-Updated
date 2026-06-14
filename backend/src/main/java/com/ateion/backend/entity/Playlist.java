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
@Table(name = "playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String ageSegment;

    // REMOVED: @OneToMany(mappedBy = "playlist") to fix the Spring Boot startup crash.
    // The relationship has been securely migrated to Course -> Module -> Videos.

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}