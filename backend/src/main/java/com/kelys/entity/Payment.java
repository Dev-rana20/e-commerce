package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="order_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Order order;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    @Column(precision=10, scale=2)
    private BigDecimal amount;

    @Column(columnDefinition="VARCHAR(10) DEFAULT 'INR'")
    private String currency;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String failureReason;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
