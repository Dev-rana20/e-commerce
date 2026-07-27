package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="wishlists")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name="wishlist_products",
        joinColumns=@JoinColumn(name="wishlist_id"),
        inverseJoinColumns=@JoinColumn(name="product_id")
    )
    @Builder.Default
    private Set<Product> products = new HashSet<>();
}
