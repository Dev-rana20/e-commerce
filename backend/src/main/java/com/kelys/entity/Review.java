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
@Table(name="reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name="product_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Product product;

    @Column(nullable=false)
    private Integer rating;

    private String title;

    @Column(columnDefinition="TEXT")
    private String comment;

    @Column(columnDefinition="BOOLEAN DEFAULT FALSE")
    private Boolean verified;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
