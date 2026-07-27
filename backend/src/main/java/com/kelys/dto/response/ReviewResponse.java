package com.kelys.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long productId;
    private Integer rating;
    private String title;
    private String comment;
    private Boolean verified;
    private LocalDateTime createdAt;
}
