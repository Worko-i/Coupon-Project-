package com.example.CouponProject.coupon;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.CouponProject.enums.CategoryType;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CompanyException;
import com.example.CouponProject.exception.CouponException;

import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CouponController {

    private final CouponService couponService;

    @PostMapping("/company/coupon/{companyId}")
    public CouponDTO addCoupon(@RequestBody CouponDTO couponDTO,@PathVariable int companyId) throws CouponException, CompanyException, AuthorizationException {
        return this.couponService.addCoupon(couponDTO, companyId);
    }

    @PutMapping("/company/coupon/{id}")
    public void updateCoupon(@PathVariable int id,@RequestBody CouponDTO couponDTO) throws CouponException, AuthorizationException {
        this.couponService.updateCoupon(id, couponDTO);
    }

    @DeleteMapping("/company/coupon/{id}")
    public void deleteCoupon(@PathVariable int id) throws CouponException, AuthorizationException {
        this.couponService.deleteCoupon(id);
    }

    @GetMapping("/company/coupon/{id}")
    public CouponDTO getSingleCoupon(@PathVariable int id) throws CouponException {
        return this.couponService.getSingleCoupon(id);
    }

    @GetMapping("/company/coupon")
    public List<CouponDTO> getAllCoupons() throws AuthorizationException {
        return this.couponService.getAllCoupons();
    }

    @GetMapping("/company/coupon/byCategory/{category}")
    public List<CouponDTO> getCouponsByCategory(@PathVariable CategoryType category) throws AuthorizationException {
        return this.couponService.getCouponsByCategory(category);
    }

    @GetMapping("/company/coupon/byMaxPrice/{maxPrice}")
    public List<CouponDTO> getCouponsByMaxPrice(@PathVariable double maxPrice) throws AuthorizationException {
        return this.couponService.getCouponsByMaxPrice(maxPrice);
    }

    @GetMapping("/company/coupon/byCompany/{companyId}")
    public List<CouponDTO> getCouponsByCompanyId(@PathVariable int companyId) throws AuthorizationException {
        return this.couponService.getAllCouponsByCompanyId(companyId);
    }

    @GetMapping("/company/coupon/byCompanyAndCategory/{companyId}/{category}")
    public List<CouponDTO> getCouponsByCompanyIdAndCategory(@PathVariable int companyId, @PathVariable CategoryType category) throws AuthorizationException {
        return this.couponService.getAllCouponsByCompanyIdAndCategory(companyId, category);
    }
}
