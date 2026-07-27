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
@Table(name="addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private String streetAddress;
    private String city;
    private String state;
    private String zipCode;

    @Column(columnDefinition="VARCHAR(100) DEFAULT 'India'")
    private String country;

    @Column(columnDefinition="BOOLEAN DEFAULT FALSE")
    private Boolean isDefault;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
