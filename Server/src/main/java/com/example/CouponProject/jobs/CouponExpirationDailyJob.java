package com.example.CouponProject.jobs;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.example.CouponProject.coupon.CouponDTO;
import com.example.CouponProject.coupon.CouponService;
import com.example.CouponProject.customersCoupons.CustomerCouponService;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CouponException;
import com.example.CouponProject.exception.CustomerCouponException;

@Slf4j
@NoArgsConstructor
@Component
@EnableScheduling
@Transactional
public class CouponExpirationDailyJob implements Runnable {
    @Autowired
    private CouponService couponService;

    @Autowired
    private CustomerCouponService customerCouponService;

    /*
       The daily job runs at midnight (00:00) every day and:
       1. Finds all expired coupons (end date has passed)
       2. Deletes their purchase history from customers_coupons table
       3. Deletes the expired coupons from coupons table
    */

    // Run at midnight (00:00) every day
    @Scheduled(cron = "0 0 0 * * ?")
    @Override
    public void run() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        log.info("Starting expired coupons cleanup job at: {}", now.format(formatter));
        
        try {
            int deletedCount = 0;
            if (this.couponService.getAllCouponsExpired() != null) {
                for (CouponDTO coupon : this.couponService.getAllCouponsExpired()) {
                    try {
                        // First delete all purchase history for this coupon
                        this.customerCouponService.deletePurchase(coupon.getId());
                        
                        // Then delete the coupon itself
                        this.couponService.deleteCoupon(coupon.getId());
                        
                        deletedCount++;
                        log.debug("Deleted expired coupon ID: {} and its purchase history", coupon.getId());
                    } catch (CustomerCouponException e) {
                        log.warn("Failed to delete purchase history for coupon ID: {}. Error: {}", 
                                coupon.getId(), e.getMessage());
                    }
                }
            }
            log.info("Expired coupons cleanup completed. {} coupons and their purchase histories were deleted.", deletedCount);
            
        } catch (CouponException | AuthorizationException e) {
            log.error("Error during expired coupons cleanup: {}", e.getMessage());
        }
    }
}
