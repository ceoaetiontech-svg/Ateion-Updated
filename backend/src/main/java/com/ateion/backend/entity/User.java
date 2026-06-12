package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "age_segment", nullable = false)
    private String ageSegment;
    
    @Builder.Default
   @Column(nullable = false)
    private String role = "ROLE_STUDENT";

    // ADDED: required for freemium gate in ProgressService
    @Builder.Default
    @Column(name = "is_premium", nullable = false)
    private Boolean isPremium = false;
    
     

    @CreationTimestamp
    private LocalDateTime createdAt;
}
