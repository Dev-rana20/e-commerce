package com.kelys.controller;

import com.kelys.dto.request.OrderRequest;
import com.kelys.dto.response.OrderResponse;
import com.kelys.dto.response.PagedResponse;
import com.kelys.entity.OrderStatus;
import com.kelys.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping({"", "/"})
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest req, Authentication auth) {
        return new ResponseEntity<>(orderService.createOrder(req, auth.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(Authentication auth) {
        return ResponseEntity.ok(orderService.getOrdersByUser(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(orderService.getOrderById(id, auth.getName()));
    }

    @GetMapping({"", "/"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(orderService.getAllOrders(page, size));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        OrderStatus status = OrderStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
