package com.example.CouponProject.customersCoupons;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.CouponProject.coupon.Coupon;
import com.example.CouponProject.coupon.CouponService;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CouponException;
import com.example.CouponProject.exception.CustomerCouponException;
import com.example.CouponProject.exception.CustomerException;
import com.example.CouponProject.token.TokenService;
import com.example.CouponProject.validations.ValidateClient;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CustomerCouponController {

    private final CustomerCouponService customerCouponService;
    private final CouponService couponService;
    private final ValidateClient validateClient;
    private final TokenService tokenService;

    @PostMapping("/company/customer_coupon/{customerId}/{couponId}")
    public CustomerCoupon addPurchase(@PathVariable int customerId, @PathVariable int couponId, HttpServletRequest request) throws CustomerException, CouponException, CustomerCouponException, AuthorizationException {
        // Validate that the logged-in customer matches the customerId in the URL
        this.validateClient.validateUserIsCustomer(customerId);
        
        // Extract customer information from JWT token instead of calling getSingleCustomer (which requires admin privileges)
        String token = extractTokenFromRequest(request);
        CustomerDTO customerDTO = createCustomerDTOFromToken(token);
        
        return this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(couponId), customerDTO);
    }
    
    private String extractTokenFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    
    private CustomerDTO createCustomerDTOFromToken(String token) {
        if (token == null) {
            throw new RuntimeException("Token is required");
        }
        
        int customerId = this.tokenService.getIdFromToken(token);
        String email = this.tokenService.getEmailFromToken(token);
        
        // Extract first name and last name from token claims
        String firstName = extractClaimFromToken(token, "firstName");
        String lastName = extractClaimFromToken(token, "lastName");
        
        return CustomerDTO.builder()
                .id(customerId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .build();
    }
    
    private String extractClaimFromToken(String token, String claimName) {
        try {
            Object claim = io.jsonwebtoken.Jwts.parser()
                    .setSigningKey("jwtCouponSystemSecretKey2025!@#$") // Using the same secret key as TokenService
                    .parseClaimsJws(token)
                    .getBody()
                    .get(claimName);
            return claim != null ? claim.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    @DeleteMapping("/company/customer_coupon/{id}")
    public void deletePurchase(@PathVariable int id) throws CustomerCouponException {
        this.customerCouponService.deletePurchase(id);
    }
    @GetMapping("/company/customer_coupon/{id}")
    public CustomerCoupon getSinglePurchase(@PathVariable int id) throws CustomerCouponException {
        return this.customerCouponService.getSinglePurchase(id);
    }

    @GetMapping("/company/customer_coupon/byCustomer/{customerId}")
    public List<Coupon> getAllCouponsPurchasedByCustomerId(@PathVariable int customerId) throws AuthorizationException {
        return this.customerCouponService.getAllCouponsPurchasedByCustomerId(customerId);
    }
    @GetMapping("/company/customer_coupon/byCustomerAndCategory/{customerId}/{categoryId}")
    public List<Coupon> getAllCouponsByCustomerIdAndCategoryId(@PathVariable int customerId, @PathVariable int categoryId) throws AuthorizationException {
        return this.customerCouponService.getAllCouponsByCustomerIdAndCategoryId(customerId, categoryId);
    }
    @GetMapping("/company/customer_coupon/byCustomerAndMaxPrice/{customerId}/{maxPrice}")
    public List<Coupon> getAllCouponsByCustomerIdAndMaxPrice(@PathVariable int customerId, @PathVariable double maxPrice) throws AuthorizationException {
        return this.customerCouponService.getAllCouponsByCustomerIdAndMaxPrice(customerId, maxPrice);
    }

}
