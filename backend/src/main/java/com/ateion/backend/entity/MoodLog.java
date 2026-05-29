//According to our architecture, students need a daily Mood Tracker so our AI can recommend wellness content based on if they are stressed or anxious.
package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity 
@Table(name = "mood_logs")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class MoodLog {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; 
    
    // Will store words like "Happy", "Stressed", "Anxious"
    private String mood; 

    @Column(columnDefinition = "TEXT")
    private String journalEntry;

    @CreationTimestamp
    private LocalDateTime loggedAt;
}