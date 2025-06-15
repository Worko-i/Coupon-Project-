package com.example.CouponProject.validations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.CouponProject.company.Company;
import com.example.CouponProject.company.CompanyDTO;
import com.example.CouponProject.customer.Customer;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.enums.ErrorMessage;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.user.UserService;
import org.modelmapper.ModelMapper;

@Component
public class ValidateClient {

    @Autowired
    private UserService userService;
    
    @Autowired
    private ModelMapper modelMapper;

    // function that validates if the user is a company
    public void validateUserIsCompany() throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDetails loadedUser = userService.loadUserByUsername(userDetails.getUsername());
            
            if (!(loadedUser instanceof CompanyDTO) && !(loadedUser instanceof Company)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
    
    // function that validates if the user is a company by company Id
    public void validateUserIsCompany(int companyId) throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDetails loadedUser = userService.loadUserByUsername(userDetails.getUsername());
            
            if (!(loadedUser instanceof CompanyDTO) && !(loadedUser instanceof Company)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
            
            int userId;
            if (loadedUser instanceof CompanyDTO) {
                userId = ((CompanyDTO) loadedUser).getId();
            } else {
                userId = ((Company) loadedUser).getId();
            }
            
            if (userId != companyId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }

    public String getAuthenticatedUserEmail() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return userDetails.getUsername();  // In Spring Security, username is typically the email
        }
        return null;
    }

    // function that validates if the user is a customer
    public void validateUserIsCustomer() throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDetails loadedUser = userService.loadUserByUsername(userDetails.getUsername());
            
            if (!(loadedUser instanceof CustomerDTO) && !(loadedUser instanceof Customer)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
    
    // function that validates if the user is a customer by customer Id
    public void validateUserIsCustomer(int customerId) throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDetails loadedUser = userService.loadUserByUsername(userDetails.getUsername());
            
            if (!(loadedUser instanceof CustomerDTO) && !(loadedUser instanceof Customer)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
            
            int userId;
            if (loadedUser instanceof CustomerDTO) {
                userId = ((CustomerDTO) loadedUser).getId();
            } else {
                userId = ((Customer) loadedUser).getId();
            }
            
            if (userId != customerId) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }

    public void validateUserIsAdmin() throws AuthorizationException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserDetails loadedUser = userService.loadUserByUsername(userDetails.getUsername());
            
            if ((loadedUser instanceof CustomerDTO) 
                || (loadedUser instanceof CompanyDTO)
                || (loadedUser instanceof Customer)
                || (loadedUser instanceof Company)) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
        }
    }
}
