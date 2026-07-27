package com.kelys.repository;

import com.kelys.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);
    Page<Product> findByCategoryIdAndActiveTrue(Long categoryId, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCaseAndActiveTrueOrDescriptionContainingIgnoreCaseAndActiveTrue(String name, String desc, Pageable pageable);
    List<Product> findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc();
    List<Product> findTop8ByActiveTrueOrderByCreatedAtDesc();
}
