package com.example.CouponProject.customer;

import java.util.List;
import java.util.Map;

import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CustomerException;

public interface CustomerService {

    CustomerDTO addCustomer(CustomerDTO customerDTO) throws CustomerException, AuthorizationException;
    List<CustomerDTO> getCustomerList() throws AuthorizationException;
    CustomerDTO getSingleCustomer(int id) throws CustomerException, AuthorizationException;
    void updateCustomer(int id, CustomerDTO customerDTO) throws CustomerException, AuthorizationException;
    void deleteCustomer(int id) throws CustomerException, AuthorizationException;
    Map<String, Object> buildClaims(CustomerDTO customerDTO);
    Customer findByEmail(String email) throws CustomerException;
    boolean existsByEmailAndPassword(String email, String password);
    boolean isExist(Customer customer);
}
