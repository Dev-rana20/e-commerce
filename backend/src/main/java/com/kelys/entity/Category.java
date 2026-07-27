package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String name;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(unique=true)
    private String slug;

    private String imageUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
