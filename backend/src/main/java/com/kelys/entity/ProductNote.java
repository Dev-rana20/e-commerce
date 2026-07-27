package com.kelys.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="product_notes")
public class ProductNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topNotes;
    private String heartNotes;
    private String baseNotes;

    @OneToOne
    @JoinColumn(name="product_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Product product;
}
