package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private String ageSegment;
    private Boolean isFree;
    private String price;
    private Double rating;
    private Integer enrollments;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Transient
    private Integer progress;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules;

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private String createdBy;

    // ── Pricing v2 ────────────────────────────────────────────────────────────
    // Columns added via Supabase SQL migration — now fully mapped to the DB.
    @Column(name = "original_price")
    private Double originalPrice;

    @Column(name = "selling_price")
    private Double sellingPrice;

    @Column(name = "discount_percentage")
    private Double discountPercentage;

    @Column(name = "currency")
    private String currency;

    @Column(name = "button_text")
    private String buttonText;
}