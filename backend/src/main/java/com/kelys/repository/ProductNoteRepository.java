package com.kelys.repository;

import com.kelys.entity.ProductNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductNoteRepository extends JpaRepository<ProductNote, Long> {
    Optional<ProductNote> findByProductId(Long productId);
    void deleteByProductId(Long productId);
}
