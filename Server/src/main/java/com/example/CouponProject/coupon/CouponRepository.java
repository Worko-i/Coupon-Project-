package com.example.CouponProject.coupon;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.CouponProject.enums.CategoryType;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    boolean existsByTitleAndCompanyId(String title, int companyId);

    boolean existsByCompanyId(int companyId);

    List<Coupon> findAllByCompanyId(int companyId);

    List<Coupon> findAllByCategory(CategoryType category);

    List<Coupon> findAllByCompanyIdAndCategory(int companyId, CategoryType category);

    @Query(value = "SELECT * FROM coupon_website3.coupons WHERE company_id = ? AND price <= ?;", nativeQuery = true)
    List<Coupon> findAllByCompanyIdAndMaxPrice(int companyId, double maxPrice);

    @Query(value = "SELECT * FROM coupon_website3.coupons WHERE price <= ?;", nativeQuery = true)
    List<Coupon> findAllByMaxPrice(double maxPrice);

    @Query(value = "SELECT * FROM coupon_website3.coupons WHERE end_date < CURRENT_TIMESTAMP;", nativeQuery = true)
    List<Coupon> findAllByEndDateExpired();

    @Query(value = "SELECT * FROM coupon_website3.coupons WHERE amount>0 AND end_date > current_timestamp();", nativeQuery = true)
    List<Coupon> findAllAvailableCoupons();
}
