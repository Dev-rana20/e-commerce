package com.kelys.service;

import com.kelys.dto.request.ProductRequest;
import com.kelys.dto.response.PagedResponse;
import com.kelys.dto.response.ProductResponse;
import com.kelys.entity.Category;
import com.kelys.entity.Inventory;
import com.kelys.entity.Product;
import com.kelys.entity.ProductNote;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.repository.CategoryRepository;
import com.kelys.repository.InventoryRepository;
import com.kelys.repository.ProductNoteRepository;
import com.kelys.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;
    private final ProductNoteRepository productNoteRepository;

    public PagedResponse<ProductResponse> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findByActiveTrueOrderByCreatedAtDesc(pageable);
        return toPagedResponse(products);
    }

    public PagedResponse<ProductResponse> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findByNameContainingIgnoreCaseAndActiveTrueOrDescriptionContainingIgnoreCaseAndActiveTrue(query, query, pageable);
        return toPagedResponse(products);
    }

    public PagedResponse<ProductResponse> getProductsByCategory(Long categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Product> products = productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable);
        return toPagedResponse(products);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest req) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(req.getName())
                .description(req.getDescription())
                .price(req.getPrice())
                .originalPrice(req.getOriginalPrice())
                .stockQuantity(req.getStockQuantity())
                .imageUrl(req.getImageUrl())
                .secondaryImageUrl(req.getSecondaryImageUrl())
                .concentration(req.getConcentration())
                .volume(req.getVolume())
                .category(category)
                .featured(req.isFeatured())
                .active(true)
                .rating(0.0)
                .reviewCount(0)
                .build();
        
        Product saved = productRepository.save(product);

        Inventory inventory = Inventory.builder()
                .product(saved)
                .quantity(req.getStockQuantity())
                .lowStockThreshold(req.getLowStockThreshold() > 0 ? req.getLowStockThreshold() : 5)
                .reservedQuantity(0)
                .build();
        inventoryRepository.save(inventory);

        if (req.getTopNotes() != null || req.getHeartNotes() != null || req.getBaseNotes() != null) {
            ProductNote note = ProductNote.builder()
                    .product(saved)
                    .topNotes(req.getTopNotes())
                    .heartNotes(req.getHeartNotes())
                    .baseNotes(req.getBaseNotes())
                    .build();
            // Save via owning side (ProductNote.product is the FK owner)
            productNoteRepository.save(note);
            // Reload to get the saved notes populated via the bidirectional relationship
            saved = productRepository.findById(saved.getId()).orElse(saved);
        }
        
        return mapToResponse(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setName(req.getName());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setOriginalPrice(req.getOriginalPrice());
        product.setStockQuantity(req.getStockQuantity());
        product.setImageUrl(req.getImageUrl());
        product.setSecondaryImageUrl(req.getSecondaryImageUrl());
        product.setConcentration(req.getConcentration());
        product.setVolume(req.getVolume());
        product.setFeatured(req.isFeatured());

        // Update or create product notes
        if (req.getTopNotes() != null || req.getHeartNotes() != null || req.getBaseNotes() != null) {
            ProductNote note = productNoteRepository.findByProductId(id)
                    .orElse(ProductNote.builder().product(product).build());
            note.setTopNotes(req.getTopNotes());
            note.setHeartNotes(req.getHeartNotes());
            note.setBaseNotes(req.getBaseNotes());
            productNoteRepository.save(note);
        }

        return mapToResponse(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setActive(false);
        productRepository.save(product);
    }

    public List<ProductResponse> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueAndActiveTrueOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ProductResponse mapToResponse(Product p) {
        ProductResponse.ProductResponseBuilder builder = ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .originalPrice(p.getOriginalPrice())
                .stockQuantity(p.getStockQuantity())
                .imageUrl(p.getImageUrl())
                .secondaryImageUrl(p.getSecondaryImageUrl())
                .concentration(p.getConcentration())
                .volume(p.getVolume())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .featured(p.getFeatured())
                .active(p.getActive())
                .rating(p.getRating())
                .reviewCount(p.getReviewCount());

        if (p.getNotes() != null) {
            builder.topNotes(p.getNotes().getTopNotes())
                   .heartNotes(p.getNotes().getHeartNotes())
                   .baseNotes(p.getNotes().getBaseNotes());
        }

        if (p.getInventory() != null) {
            builder.inventoryQuantity(p.getInventory().getQuantity());
        }

        return builder.build();
    }

    private PagedResponse<ProductResponse> toPagedResponse(Page<Product> page) {
        List<ProductResponse> content = page.getContent().stream().map(this::mapToResponse).toList();
        return PagedResponse.<ProductResponse>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}
