package com.example.CouponProject.customersCoupons;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCouponRepository extends JpaRepository<CustomerCoupon, Integer> {
    boolean existsByCouponIdAndCustomerId(int couponId, int customerId);

    List<CustomerCoupon> findByCustomerId(int customerId);

    @Query(value = """
            SELECT c.id,coupon_id,customer_id\s
            FROM coupon_website3.coupons c JOIN coupon_website3.customers_coupons cvc\s
            ON c.id = cvc.coupon_id
            WHERE customer_id = ? AND category_id = ?;\
            """, nativeQuery = true)
    List<CustomerCoupon> findAllByCustomerIdAndCategoryId(int customerId, int categoryId);

    @Query(value = """
            SELECT c.id,coupon_id,customer_id\s
            FROM coupon_website3.coupons c JOIN coupon_website3.customers_coupons cvc\s
            ON c.id = cvc.coupon_id
            WHERE customer_id = ? AND price <= ?;\
            """, nativeQuery = true)
    List<CustomerCoupon> findAllByCustomerIdAndMaxPrice(int customerId, double maxPrice);

    @Query(value = """
            SELECT c.* FROM coupon_website3.coupons c 
            WHERE c.id NOT IN (
                SELECT cc.coupon_id 
                FROM coupon_website3.customers_coupons cc 
                WHERE cc.customer_id = ?
            )
            AND c.amount > 0 
            AND c.end_date > CURRENT_DATE
            """, nativeQuery = true)
    List<CustomerCoupon> findAllCouponsToPurchaseByCustomer(int customerId);
}
