package com.kelys.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer stockQuantity;
    private String imageUrl;
    private String secondaryImageUrl;
    private String concentration;
    private String volume;
    private Long categoryId;
    private String categoryName;
    private Boolean featured;
    private Boolean active;
    private Double rating;
    private Integer reviewCount;
    private String topNotes;
    private String heartNotes;
    private String baseNotes;
    private Integer inventoryQuantity;
}
