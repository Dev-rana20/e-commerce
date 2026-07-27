package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="order_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="product_id")
    private Product product;

    private Integer quantity;

    @Column(precision=10, scale=2)
    private BigDecimal unitPrice;

    private String selectedSize;

    @Column(precision=10, scale=2)
    private BigDecimal subtotal;
}
