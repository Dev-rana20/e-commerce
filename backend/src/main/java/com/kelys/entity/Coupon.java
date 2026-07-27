package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String code;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    @Column(precision=10, scale=2)
    private BigDecimal discountValue;

    @Column(precision=10, scale=2)
    private BigDecimal minOrderAmount;

    @Column(precision=10, scale=2)
    private BigDecimal maxDiscountAmount;

    private Integer usageLimit;

    @Column(columnDefinition="INT DEFAULT 0")
    @Builder.Default
    private Integer usedCount = 0;

    private LocalDate expiryDate;

    @Column(columnDefinition="BOOLEAN DEFAULT TRUE")
    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
