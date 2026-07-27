package com.kelys.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("razorpayOrderId", "pay_mock_" + UUID.randomUUID().toString().substring(0, 8));
        response.put("amount", body.get("amount"));
        response.put("currency", "INR");
        response.put("keyId", "test_key");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Payment verification bypassed for development");
        return ResponseEntity.ok(response);
    }
}
