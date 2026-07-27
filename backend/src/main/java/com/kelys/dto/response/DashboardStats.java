package com.kelys.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private long totalCustomers;
    private List<OrderResponse> recentOrders;
    private List<ProductResponse> lowStockProducts;
}
