package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(nullable=false, precision=10, scale=2)
    private BigDecimal price;

    @Column(precision=10, scale=2)
    private BigDecimal originalPrice;

    @Column(columnDefinition="INT DEFAULT 0")
    private Integer stockQuantity;

    private String imageUrl;
    private String secondaryImageUrl;
    private String concentration;
    private String volume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="category_id")
    private Category category;

    @OneToOne(mappedBy="product", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    private ProductNote notes;

    @OneToOne(mappedBy="product", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    private Inventory inventory;

    @Column(columnDefinition="BOOLEAN DEFAULT FALSE")
    private Boolean featured;

    @Column(columnDefinition="BOOLEAN DEFAULT TRUE")
    private Boolean active;

    @Column(columnDefinition="DOUBLE DEFAULT 0.0")
    private Double rating;

    @Column(columnDefinition="INT DEFAULT 0")
    private Integer reviewCount;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
