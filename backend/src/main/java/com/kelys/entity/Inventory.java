package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="product_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Product product;

    @Column(columnDefinition="INT DEFAULT 0")
    private Integer quantity;

    @Column(columnDefinition="INT DEFAULT 5")
    private Integer lowStockThreshold;

    @Column(columnDefinition="INT DEFAULT 0")
    private Integer reservedQuantity;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
