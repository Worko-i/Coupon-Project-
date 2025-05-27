package com.example.CouponProject.user;

import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.CouponProject.auth.TokenResponseDTO;
import com.example.CouponProject.company.Company;
import com.example.CouponProject.company.CompanyDTO;
import com.example.CouponProject.company.CompanyService;
import com.example.CouponProject.customer.Customer;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.customer.CustomerService;
import com.example.CouponProject.enums.ErrorMessage;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.token.TokenService;

import java.util.ArrayList;
import java.util.Collections;

import jakarta.annotation.PostConstruct;

@Service
public class UserService implements UserDetailsService {

    private final CompanyService companyService;
    private final CustomerService customerService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    // Store the admin password hash
    private String adminPasswordHash;

    public UserService(CompanyService companyService,
                       TokenService tokenService,
                       @Lazy PasswordEncoder passwordEncoder,
                       CustomerService customerService, UserRepository userRepository, ModelMapper modelMapper) {
        this.companyService = companyService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.customerService = customerService;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }
    
    @PostConstruct
    public void init() {
        // Generate the admin password hash once when the application starts
        this.adminPasswordHash = this.passwordEncoder.encode("admin");
        System.out.println("Admin password hash initialized");
    }

    @SneakyThrows
    @Override
    // the function's parameter is an email
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            // Check for admin user first
            if (username.equals("admin@admin.com")) {
                // Use the stored hash instead of generating a new one each time
                return new User("admin@admin.com", adminPasswordHash, 
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
            }
            
            // Try to find the user as a company
            try {
                UserDetails companyDetails = this.companyService.findByEmail(username);
                if (companyDetails != null) {
                    if (companyDetails instanceof Company) {
                        return this.modelMapper.map((Company) companyDetails, CompanyDTO.class);
                    }
                    return companyDetails;
                }
            } catch (Exception e) {
                // Log but continue to try other user types
                System.err.println("Error finding company user: " + e.getMessage());
            }
            
            // Try to find the user as a customer
            Customer customer = this.customerService.findByEmail(username);
            if (customer != null) {
                return this.modelMapper.map(customer, CustomerDTO.class);
            }
            
            // If we get here, no valid user was found
            throw new AuthorizationException(ErrorMessage.EMAIL_NOT_FOUND);
        } catch (AuthorizationException e) {
            // Rethrow authorization exceptions
            throw e;
        } catch (Exception e) {
            // Log unexpected errors and convert to authorization exception
            System.err.println("Unexpected error in loadUserByUsername: " + e.toString());
            e.printStackTrace();
            throw new AuthorizationException(ErrorMessage.AUTHENTICATION_ERROR);
        }
    }
}
