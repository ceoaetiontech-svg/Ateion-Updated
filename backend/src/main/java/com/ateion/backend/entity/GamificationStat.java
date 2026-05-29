//This table will store the user's points and their ABCDE behavior type.
package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity 
@Table(name = "gamification_stats")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class GamificationStat {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; 

    @Builder.Default
    private Integer totalPoints = 0;
    
    @Builder.Default
    private Integer currentStreak = 0;

    // Categorizes students into learning/personality types (A, B, C, D, E)
    private String behaviorType; 
}