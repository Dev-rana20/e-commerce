package com.kelys.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank
    private String name;
    private String description;
    
    @NotNull
    private BigDecimal price;
    
    private BigDecimal originalPrice;
    private int stockQuantity;
    private String imageUrl;
    private String secondaryImageUrl;
    private String concentration;
    private String volume;
    private Long categoryId;
    private boolean featured;
    private String topNotes;
    private String heartNotes;
    private String baseNotes;
    private int lowStockThreshold;
}
