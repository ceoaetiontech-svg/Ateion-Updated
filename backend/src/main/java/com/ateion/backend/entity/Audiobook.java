package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "audiobooks")
public class Audiobook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    @Column(name = "cover_url", columnDefinition = "TEXT")
    private String coverUrl;

    @OneToMany(mappedBy = "audiobook", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC")
    private List<AudiobookChapter> chapters;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
}
