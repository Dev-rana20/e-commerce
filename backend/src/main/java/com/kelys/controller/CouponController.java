package com.kelys.controller;

import com.kelys.dto.request.CouponRequest;
import com.kelys.dto.response.CouponResponse;
import com.kelys.dto.response.CouponValidateResponse;
import com.kelys.service.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    @PostMapping("/validate")
    public ResponseEntity<CouponValidateResponse> validateCoupon(
            @RequestParam String code,
            @RequestParam BigDecimal orderAmount) {
        return ResponseEntity.ok(couponService.validateCoupon(code, orderAmount));
    }

    @GetMapping({"", "/"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CouponResponse>> getAllCoupons() {
        return ResponseEntity.ok(couponService.getAllCoupons());
    }

    @PostMapping({"", "/"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CouponResponse> createCoupon(@Valid @RequestBody CouponRequest req) {
        return new ResponseEntity<>(couponService.createCoupon(req), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ResponseEntity.noContent().build();
    }
}
