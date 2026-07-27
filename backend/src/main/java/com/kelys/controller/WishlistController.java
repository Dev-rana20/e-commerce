package com.kelys.controller;

import com.kelys.dto.response.ProductResponse;
import com.kelys.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping({"", "/"})
    public ResponseEntity<Set<ProductResponse>> getWishlist(Authentication auth) {
        return ResponseEntity.ok(wishlistService.getWishlist(auth.getName()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Set<ProductResponse>> addToWishlist(@PathVariable Long productId, Authentication auth) {
        return ResponseEntity.ok(wishlistService.addToWishlist(auth.getName(), productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Set<ProductResponse>> removeFromWishlist(@PathVariable Long productId, Authentication auth) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(auth.getName(), productId));
    }

    @GetMapping("/{productId}/check")
    public ResponseEntity<Map<String, Boolean>> isInWishlist(@PathVariable Long productId, Authentication auth) {
        return ResponseEntity.ok(Map.of("inWishlist", wishlistService.isInWishlist(auth.getName(), productId)));
    }
}
