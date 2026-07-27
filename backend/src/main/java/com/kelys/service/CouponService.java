package com.kelys.service;

import com.kelys.dto.request.CouponRequest;
import com.kelys.dto.response.CouponResponse;
import com.kelys.dto.response.CouponValidateResponse;
import com.kelys.entity.Coupon;
import com.kelys.entity.DiscountType;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponValidateResponse validateCoupon(String code, BigDecimal orderAmount) {
        Optional<Coupon> opt = couponRepository.findByCodeIgnoreCaseAndActiveTrue(code);
        if (opt.isEmpty()) {
            return invalid("Coupon not found or inactive");
        }
        
        Coupon coupon = opt.get();
        
        if (coupon.getExpiryDate() != null && coupon.getExpiryDate().isBefore(LocalDate.now())) {
            return invalid("Coupon has expired");
        }
        int used = coupon.getUsedCount() != null ? coupon.getUsedCount() : 0;
        if (coupon.getUsageLimit() != null && used >= coupon.getUsageLimit()) {
            return invalid("Coupon usage limit reached");
        }
        if (coupon.getMinOrderAmount() != null && orderAmount.compareTo(coupon.getMinOrderAmount()) < 0) {
            return invalid("Minimum order amount is " + coupon.getMinOrderAmount());
        }
        
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (coupon.getDiscountType() == DiscountType.PERCENTAGE) {
            discountAmount = orderAmount.multiply(coupon.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            if (coupon.getMaxDiscountAmount() != null && discountAmount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
                discountAmount = coupon.getMaxDiscountAmount();
            }
        } else {
            discountAmount = coupon.getDiscountValue();
        }

        return CouponValidateResponse.builder()
                .valid(true)
                .discountAmount(discountAmount)
                .message("Coupon applied! You save " + discountAmount)
                .build();
    }

    public List<CouponResponse> getAllCoupons() {
        return couponRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CouponResponse createCoupon(CouponRequest req) {
        Coupon coupon = Coupon.builder()
                .code(req.getCode())
                .discountType(req.getDiscountType())
                .discountValue(req.getDiscountValue())
                .minOrderAmount(req.getMinOrderAmount())
                .maxDiscountAmount(req.getMaxDiscountAmount())
                .usageLimit(req.getUsageLimit())
                .expiryDate(req.getExpiryDate())
                .active(req.isActive())
                .usedCount(0)
                .build();
        return mapToResponse(couponRepository.save(coupon));
    }

    public void deleteCoupon(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found"));
        couponRepository.delete(coupon);
    }

    private CouponValidateResponse invalid(String msg) {
        return CouponValidateResponse.builder()
                .valid(false)
                .discountAmount(BigDecimal.ZERO)
                .message(msg)
                .build();
    }

    private CouponResponse mapToResponse(Coupon c) {
        return CouponResponse.builder()
                .id(c.getId())
                .code(c.getCode())
                .discountType(c.getDiscountType())
                .discountValue(c.getDiscountValue())
                .minOrderAmount(c.getMinOrderAmount())
                .maxDiscountAmount(c.getMaxDiscountAmount())
                .usageLimit(c.getUsageLimit())
                .usedCount(c.getUsedCount())
                .expiryDate(c.getExpiryDate())
                .active(c.getActive())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
