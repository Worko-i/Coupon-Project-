package com.example.CouponProject.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.CouponProject.enums.CategoryType;

import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryType> getCategories(){
        return Arrays.asList(CategoryType.values());
    }

    @GetMapping("/db")
    public List<Category> getDatabaseCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("{name}")
    public CategoryType getCategory(@PathVariable String name) {
        return CategoryType.valueOf(name.toUpperCase());
    }
}
