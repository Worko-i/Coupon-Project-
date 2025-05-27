package com.example.CouponProject.customersCoupons;

import java.util.List;

import com.example.CouponProject.coupon.Coupon;
import com.example.CouponProject.coupon.CouponDTO;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CouponException;
import com.example.CouponProject.exception.CustomerCouponException;

public interface CustomerCouponService {

    CustomerCoupon addPurchase(CouponDTO couponDTO, CustomerDTO customerDTO) throws CustomerCouponException, CouponException, AuthorizationException;
    CustomerCoupon getSinglePurchase(int id) throws CustomerCouponException;
    void deletePurchase(int id) throws CustomerCouponException;
    List<Coupon> getAllCouponsPurchasedByCustomerId(int customerId) throws AuthorizationException;
    List<Coupon> getAllCouponsByCustomerIdAndCategoryId(int customerId, int categoryId) throws AuthorizationException;
    List<Coupon> getAllCouponsByCustomerIdAndMaxPrice(int customerId, double maxPrice) throws AuthorizationException;

}
