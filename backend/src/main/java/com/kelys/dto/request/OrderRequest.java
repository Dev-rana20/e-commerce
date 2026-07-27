package com.kelys.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    @NotNull
    private Long addressId;
    
    private String couponCode;
    private String notes;
    
    @NotEmpty
    private List<OrderItemRequest> items;
}
