package com.kelys.repository;

import com.kelys.entity.Order;
import com.kelys.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByOrderDateDesc(Long userId);
    Optional<Order> findByOrderNumber(String orderNumber);
    Page<Order> findAllByOrderByOrderDateDesc(Pageable pageable);
    Long countByStatus(OrderStatus status);
}
