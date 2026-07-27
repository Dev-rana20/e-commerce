package com.kelys.controller;

import com.kelys.dto.request.ReviewRequest;
import com.kelys.dto.response.ReviewResponse;
import com.kelys.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @PostMapping({"", "/"})
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewResponse> addReview(@Valid @RequestBody ReviewRequest req, Authentication auth) {
        return new ResponseEntity<>(reviewService.addReview(req, auth.getName()), HttpStatus.CREATED);
    }
}
