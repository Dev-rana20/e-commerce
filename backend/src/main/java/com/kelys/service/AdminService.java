package com.kelys.service;

import com.kelys.dto.response.DashboardStats;
import com.kelys.dto.response.OrderResponse;
import com.kelys.dto.response.ProductResponse;
import com.kelys.entity.Inventory;
import com.kelys.entity.Order;
import com.kelys.entity.Product;
import com.kelys.entity.Role;
import com.kelys.repository.InventoryRepository;
import com.kelys.repository.OrderRepository;
import com.kelys.repository.ProductRepository;
import com.kelys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final InventoryRepository inventoryRepository;

    public DashboardStats getDashboardStats() {
        long totalOrders = orderRepository.count();
        
        BigDecimal totalRevenue = orderRepository.findAll().stream()
                .map(o -> o.getFinalAmount() != null ? o.getFinalAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
        long totalProducts = productRepository.findAll().stream()
                .filter(Product::getActive)
                .count();
                
        long totalCustomers = userRepository.findByRoleOrderByCreatedAtDesc(Role.CUSTOMER).size();
        
        List<Order> recentOrdersList = orderRepository.findAll(PageRequest.of(0, 5, Sort.by("orderDate").descending())).getContent();
        List<OrderResponse> recentOrders = recentOrdersList.stream()
                .map(this::mapOrderToResponse)
                .toList();
                
        List<Inventory> lowStock = inventoryRepository.findByQuantityLessThanEqualAndProduct_ActiveTrue(5);
        List<ProductResponse> lowStockProducts = lowStock.stream()
                .map(Inventory::getProduct)
                .map(this::mapProductToResponse)
                .toList();

        return DashboardStats.builder()
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .totalProducts(totalProducts)
                .totalCustomers(totalCustomers)
                .recentOrders(recentOrders)
                .lowStockProducts(lowStockProducts)
                .build();
    }

    private OrderResponse mapOrderToResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .totalAmount(order.getTotalAmount())
                .discountAmount(order.getDiscountAmount())
                .finalAmount(order.getFinalAmount())
                .status(order.getStatus().name())
                .orderDate(order.getOrderDate())
                .build();
    }

    private ProductResponse mapProductToResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .stockQuantity(p.getStockQuantity())
                .imageUrl(p.getImageUrl())
                .build();
    }
}
