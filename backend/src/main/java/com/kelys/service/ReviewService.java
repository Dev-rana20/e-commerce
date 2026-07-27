package com.kelys.service;

import com.kelys.dto.request.ReviewRequest;
import com.kelys.dto.response.ReviewResponse;
import com.kelys.entity.Product;
import com.kelys.entity.Review;
import com.kelys.entity.User;
import com.kelys.exception.BadRequestException;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.repository.ProductRepository;
import com.kelys.repository.ReviewRepository;
import com.kelys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<ReviewResponse> getProductReviews(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public ReviewResponse addReview(ReviewRequest req, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(req.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), req.getProductId())) {
            throw new BadRequestException("Already reviewed");
        }

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(req.getRating())
                .title(req.getTitle())
                .comment(req.getComment())
                .verified(false)
                .build();
        review = reviewRepository.save(review);

        Double avg = reviewRepository.findAvgRatingByProductId(product.getId());
        Long count = reviewRepository.countByProductId(product.getId());
        
        product.setRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0);
        product.setReviewCount(count != null ? count.intValue() : 0);
        productRepository.save(product);

        return mapToResponse(review);
    }

    private ReviewResponse mapToResponse(Review r) {
        String userName = (r.getUser() != null) 
                ? (r.getUser().getFirstName() + (r.getUser().getLastName() != null ? " " + r.getUser().getLastName() : ""))
                : "Anonymous";
        return ReviewResponse.builder()
                .id(r.getId())
                .userId(r.getUser() != null ? r.getUser().getId() : null)
                .userName(userName)
                .productId(r.getProduct() != null ? r.getProduct().getId() : null)
                .rating(r.getRating())
                .title(r.getTitle())
                .comment(r.getComment())
                .verified(r.getVerified())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
