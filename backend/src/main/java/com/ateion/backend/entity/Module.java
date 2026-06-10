package com.ateion.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "modules")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    // Removed nullable=false so your test payload works without a Course ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable=false)
    private Course course;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Videos> videos;
}