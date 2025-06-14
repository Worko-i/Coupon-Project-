package com.example.CouponProject.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.CouponProject.enums.CategoryType;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public void initializeCategories() {
        // Check if categories already exist
        if (categoryRepository.count() > 0) {
            return; // Categories already initialized
        }

        // Add all enum categories to database
        for (CategoryType categoryType : CategoryType.values()) {
            Category category = Category.builder()
                .name(categoryType.getDisplayName())
                .build();
            categoryRepository.save(category);
        }
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
