package com.example.CouponProject.coupon;


import java.util.List;

import com.example.CouponProject.category.Category;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CompanyException;
import com.example.CouponProject.exception.CouponException;

public interface CouponService {
    CouponDTO addCoupon(CouponDTO couponDTO, int companyId) throws CouponException, CompanyException, AuthorizationException;
    CouponDTO getSingleCoupon(int id) throws CouponException;
    void updateCoupon(int id, CouponDTO couponDTO) throws CouponException, AuthorizationException;
    void deleteCoupon(int id) throws CouponException, AuthorizationException;
    List<CouponDTO> getCouponsByCategory(Category category) throws AuthorizationException;
    List<CouponDTO> getCouponsByMaxPrice(double maxPrice) throws AuthorizationException;
    boolean isExist(Coupon coupon);
    List<CouponDTO> getAllCouponsByCompanyId(int companyId) throws AuthorizationException;
    List<CouponDTO> getAllCouponsByCompanyIdAndCategoryId(int companyId, int categoryId) throws AuthorizationException;
    List<CouponDTO> getAllCouponsByCompanyIdAndMaxPrice(int companyId, double maxPrice) throws AuthorizationException;
    List<CouponDTO> getAllCoupons() throws AuthorizationException;
    List<CouponDTO> getAllCouponsExpired();
}
