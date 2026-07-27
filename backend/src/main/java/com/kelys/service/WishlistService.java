package com.kelys.service;

import com.kelys.dto.response.ProductResponse;
import com.kelys.entity.Product;
import com.kelys.entity.User;
import com.kelys.entity.Wishlist;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.repository.ProductRepository;
import com.kelys.repository.UserRepository;
import com.kelys.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private Wishlist getOrCreateWishlist(User user) {
        return wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> wishlistRepository.save(Wishlist.builder()
                        .user(user)
                        .products(new HashSet<>())
                        .build()));
    }

    public Set<ProductResponse> getWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Wishlist w = getOrCreateWishlist(user);
        return w.getProducts().stream().map(this::mapProductToResponse).collect(Collectors.toSet());
    }

    public Set<ProductResponse> addToWishlist(String email, Long productId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        Wishlist w = getOrCreateWishlist(user);
        w.getProducts().add(product);
        wishlistRepository.save(w);
        return w.getProducts().stream().map(this::mapProductToResponse).collect(Collectors.toSet());
    }

    public Set<ProductResponse> removeFromWishlist(String email, Long productId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Wishlist w = getOrCreateWishlist(user);
        w.getProducts().removeIf(p -> p.getId().equals(productId));
        wishlistRepository.save(w);
        return w.getProducts().stream().map(this::mapProductToResponse).collect(Collectors.toSet());
    }

    public boolean isInWishlist(String email, Long productId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Wishlist w = getOrCreateWishlist(user);
        return w.getProducts().stream().anyMatch(p -> p.getId().equals(productId));
    }

    private ProductResponse mapProductToResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .imageUrl(p.getImageUrl())
                .concentration(p.getConcentration())
                .volume(p.getVolume())
                .rating(p.getRating())
                .build();
    }
}
