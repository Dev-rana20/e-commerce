package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String orderNumber;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy="order", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
    private List<OrderItem> items;

    @ManyToOne
    @JoinColumn(name="shipping_address_id")
    private Address shippingAddress;

    @Column(precision=10, scale=2)
    private BigDecimal totalAmount;

    @Column(columnDefinition="DECIMAL(10,2) DEFAULT 0.00")
    private BigDecimal discountAmount;

    @Column(precision=10, scale=2)
    private BigDecimal finalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne(mappedBy="order", cascade=CascadeType.ALL)
    private Payment payment;

    private String couponCode;
    private String notes;

    @CreationTimestamp
    private LocalDateTime orderDate;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
