package com.kelys.service;

import com.kelys.dto.request.OrderItemRequest;
import com.kelys.dto.request.OrderRequest;
import com.kelys.dto.response.AddressResponse;
import com.kelys.dto.response.OrderItemResponse;
import com.kelys.dto.response.OrderResponse;
import com.kelys.dto.response.PagedResponse;
import com.kelys.entity.*;
import com.kelys.exception.BadRequestException;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.exception.UnauthorizedException;
import com.kelys.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AddressRepository addressRepository;
    private final InventoryRepository inventoryRepository;
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse createOrder(OrderRequest req, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Address address = addressRepository.findById(req.getAddressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        List<OrderItem> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : req.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            Inventory inv = inventoryRepository.findByProductId(product.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
            if (inv.getQuantity() < itemReq.getQuantity()) {
                throw new BadRequestException("Insufficient stock for " + product.getName());
            }

            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            totalAmount = totalAmount.add(subtotal);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(product.getPrice())
                    .selectedSize(itemReq.getSelectedSize())
                    .subtotal(subtotal)
                    .build();
            items.add(orderItem);
        }

        BigDecimal discountAmount = BigDecimal.ZERO;
        String couponCode = null;

        if (req.getCouponCode() != null && !req.getCouponCode().isBlank()) {
            Coupon coupon = couponRepository.findByCodeIgnoreCaseAndActiveTrue(req.getCouponCode())
                    .orElseThrow(() -> new BadRequestException("Invalid coupon"));
            if (coupon.getExpiryDate() != null && coupon.getExpiryDate().isBefore(LocalDate.now())) {
                throw new BadRequestException("Coupon expired");
            }
            int usedCount = coupon.getUsedCount() != null ? coupon.getUsedCount() : 0;
            if (coupon.getUsageLimit() != null && usedCount >= coupon.getUsageLimit()) {
                throw new BadRequestException("Coupon usage limit reached");
            }
            if (coupon.getMinOrderAmount() != null && totalAmount.compareTo(coupon.getMinOrderAmount()) < 0) {
                throw new BadRequestException("Min order amount not met");
            }
            if (coupon.getDiscountType() == DiscountType.PERCENTAGE) {
                discountAmount = totalAmount.multiply(coupon.getDiscountValue())
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                    discountAmount = coupon.getMaxDiscountAmount();
                }
            } else {
                discountAmount = coupon.getDiscountValue();
            }
            couponCode = coupon.getCode();
            coupon.setUsedCount(usedCount + 1);
            couponRepository.save(coupon);
        }

        BigDecimal finalAmount = totalAmount.subtract(discountAmount);
        String orderNumber = "KELYS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .shippingAddress(address)
                .totalAmount(totalAmount)
                .discountAmount(discountAmount)
                .finalAmount(finalAmount)
                .status(OrderStatus.PENDING)
                .couponCode(couponCode)
                .notes(req.getNotes())
                .build();
        
        Order savedOrder = orderRepository.save(order);

        for (OrderItem item : items) {
            item.setOrder(savedOrder);
            Inventory inv = inventoryRepository.findByProductId(item.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
            inv.setQuantity(inv.getQuantity() - item.getQuantity());
            inventoryRepository.save(inv);
        }
        
        savedOrder.setItems(items);
        savedOrder = orderRepository.save(savedOrder);

        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByOrderDateDesc(user.getId()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public OrderResponse getOrderById(Long id, String email) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (!order.getUser().getId().equals(user.getId()) && !user.getRole().equals(Role.ADMIN)) {
            throw new UnauthorizedException("Not authorized to view this order");
        }
        return mapToResponse(order);
    }

    public OrderResponse updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(status);
        return mapToResponse(orderRepository.save(order));
    }

    public PagedResponse<OrderResponse> getAllOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> ordersPage = orderRepository.findAllByOrderByOrderDateDesc(pageable);
        List<OrderResponse> content = ordersPage.getContent().stream().map(this::mapToResponse).toList();
        return PagedResponse.<OrderResponse>builder()
                .content(content)
                .page(ordersPage.getNumber())
                .size(ordersPage.getSize())
                .totalElements(ordersPage.getTotalElements())
                .totalPages(ordersPage.getTotalPages())
                .last(ordersPage.isLast())
                .build();
    }

    private OrderResponse mapToResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser().getId())
                .userEmail(order.getUser().getEmail())
                .totalAmount(order.getTotalAmount())
                .discountAmount(order.getDiscountAmount())
                .finalAmount(order.getFinalAmount())
                .status(order.getStatus().name())
                .couponCode(order.getCouponCode())
                .orderDate(order.getOrderDate())
                .items(order.getItems().stream().map(this::mapToOrderItemResponse).toList())
                .shippingAddress(mapToAddressResponse(order.getShippingAddress()))
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem item) {
        return OrderItemResponse.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProduct().getName())
                .productImageUrl(item.getProduct().getImageUrl())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .selectedSize(item.getSelectedSize())
                .subtotal(item.getSubtotal())
                .build();
    }

    private AddressResponse mapToAddressResponse(Address a) {
        if (a == null) return null;
        return AddressResponse.builder()
                .id(a.getId())
                .streetAddress(a.getStreetAddress())
                .city(a.getCity())
                .state(a.getState())
                .zipCode(a.getZipCode())
                .country(a.getCountry())
                .isDefault(a.getIsDefault())
                .build();
    }
}
