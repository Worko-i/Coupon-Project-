package com.example.CouponProject.customersCoupons;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.CouponProject.coupon.Coupon;
import com.example.CouponProject.coupon.CouponService;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.enums.CategoryType;
import com.example.CouponProject.enums.ErrorMessage;
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
    public ResponseEntity<?> addPurchase(
            @PathVariable int customerId, 
            @PathVariable int couponId, 
            HttpServletRequest request
    ) throws CustomerException, CouponException, CustomerCouponException, AuthorizationException {
        try {
            // Validate that the logged-in customer matches the customerId in the URL
            this.validateClient.validateUserIsCustomer(customerId);
            
            String token = extractTokenFromRequest(request);
            CustomerDTO customerDTO = createCustomerDTOFromToken(token);
            
            // Verify the token customer ID matches the path parameter
            if (customerDTO.getId() != customerId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }

            CustomerCoupon purchase = this.customerCouponService.addPurchase(
                this.couponService.getSingleCoupon(couponId), 
                customerDTO
            );
            
            return ResponseEntity.ok(purchase);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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
    public ResponseEntity<?> getAllCouponsPurchasedByCustomerId(
            @PathVariable int customerId,
            HttpServletRequest request
    ) throws AuthorizationException {
        try {
            // Validate that the logged-in customer matches the customerId
            this.validateClient.validateUserIsCustomer(customerId);
            
            String token = extractTokenFromRequest(request);
            CustomerDTO customerDTO = createCustomerDTOFromToken(token);
            
            // Verify the token customer ID matches the path parameter
            if (customerDTO.getId() != customerId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }

            List<Coupon> coupons = this.customerCouponService.getAllCouponsPurchasedByCustomerId(customerId);
            return ResponseEntity.ok(coupons);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/company/customer_coupon/byCustomerAndCategory/{customerId}/{category}")
    public List<Coupon> getAllCouponsByCustomerIdAndCategory(@PathVariable int customerId, @PathVariable CategoryType category) throws AuthorizationException {
        return this.customerCouponService.getAllCouponsByCustomerIdAndCategory(customerId, category);
    }
    @GetMapping("/company/customer_coupon/byCustomerAndMaxPrice/{customerId}/{maxPrice}")
    public List<Coupon> getAllCouponsByCustomerIdAndMaxPrice(@PathVariable int customerId, @PathVariable double maxPrice) throws AuthorizationException {
        return this.customerCouponService.getAllCouponsByCustomerIdAndMaxPrice(customerId, maxPrice);
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

}
