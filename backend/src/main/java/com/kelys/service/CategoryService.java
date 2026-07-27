package com.kelys.service;

import com.kelys.dto.request.CategoryRequest;
import com.kelys.dto.response.CategoryResponse;
import com.kelys.entity.Category;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return mapToResponse(category);
    }

    public CategoryResponse createCategory(CategoryRequest req) {
        String slug = req.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        Category cat = Category.builder()
                .name(req.getName())
                .description(req.getDescription())
                .imageUrl(req.getImageUrl())
                .slug(slug)
                .build();
        return mapToResponse(categoryRepository.save(cat));
    }

    public CategoryResponse updateCategory(Long id, CategoryRequest req) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(req.getName());
        category.setDescription(req.getDescription());
        category.setImageUrl(req.getImageUrl());
        return mapToResponse(categoryRepository.save(category));
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        categoryRepository.delete(category);
    }

    private CategoryResponse mapToResponse(Category c) {
        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .slug(c.getSlug())
                .imageUrl(c.getImageUrl())
                .build();
    }
}
