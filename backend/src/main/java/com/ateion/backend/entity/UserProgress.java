//We need a table to track which user watched which video so we can count them.
package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity 
@Table(name = "user_progress")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class UserProgress {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The ID of the student
    private Long userId; 
    
    // The ID of the video they are watching
    private Long videoId; 

    @CreationTimestamp
    private LocalDateTime watchedAt;
}