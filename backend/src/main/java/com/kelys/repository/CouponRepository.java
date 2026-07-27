package com.kelys.repository;

import com.kelys.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCodeIgnoreCaseAndActiveTrue(String code);
    boolean existsByCode(String code);
}
