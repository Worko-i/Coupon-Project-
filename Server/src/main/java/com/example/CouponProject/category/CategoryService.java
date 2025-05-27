package com.example.CouponProject.category;

import java.util.List;

import com.example.CouponProject.exception.CategoryException;

public interface CategoryService {
    Category addCategory(Category category) throws CategoryException;
    Category getCategory(int id) throws CategoryException;
    List<Category> getCategories();
    void updateCategory(int id, Category category) throws CategoryException;
    void deleteCategory(int id) throws CategoryException;
    boolean isCategoryExist(int categoryId);
}
