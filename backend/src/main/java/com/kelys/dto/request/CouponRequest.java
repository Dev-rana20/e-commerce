package com.kelys.dto.request;

import com.kelys.entity.DiscountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CouponRequest {
    @NotBlank
    private String code;
    private DiscountType discountType;
    
    @NotNull
    private BigDecimal discountValue;
    
    private BigDecimal minOrderAmount;
    private BigDecimal maxDiscountAmount;
    private int usageLimit;
    private LocalDate expiryDate;
    private boolean active;
}
