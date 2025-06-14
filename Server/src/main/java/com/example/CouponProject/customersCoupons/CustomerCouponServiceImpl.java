package com.example.CouponProject.customersCoupons;


import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.CouponProject.coupon.Coupon;
import com.example.CouponProject.coupon.CouponDTO;
import com.example.CouponProject.coupon.CouponRepository;
import com.example.CouponProject.coupon.CouponService;
import com.example.CouponProject.customer.Customer;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.customer.CustomerService;
import com.example.CouponProject.enums.CategoryType;
import com.example.CouponProject.enums.ErrorMessage;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CouponException;
import com.example.CouponProject.exception.CustomerCouponException;
import com.example.CouponProject.validations.ValidateClient;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerCouponServiceImpl implements CustomerCouponService{

    private final CustomerCouponRepository customerCouponRepository;
    private final CustomerService customerService;
    private final CouponService couponService;
    private final CouponRepository couponRepository;
    private final ModelMapper modelMapper;
    private final ValidateClient validateClient;


    /*
        The function receives a coupon and a customer, and adds the purchase with their id
        record in the table: customers_coupons
    */
    public CustomerCoupon addPurchase(CouponDTO couponDTO, CustomerDTO customerDTO) throws CustomerCouponException, CouponException, AuthorizationException {

        // Validate that the logged-in customer matches the CustomerDTO being used for the purchase
        this.validateClient.validateUserIsCustomer(customerDTO.getId());

        Coupon coupon = this.modelMapper.map(couponDTO, Coupon.class);
        Customer customer = this.modelMapper.map(customerDTO, Customer.class);

        if (!this.couponService.isExist(coupon) || !this.customerService.isExist(customer)) {
            throw new CustomerCouponException(ErrorMessage.ID_NOT_FOUND);
        }

        if (coupon.getAmount() < 1) {
            throw new CouponException(ErrorMessage.COUPON_AMOUNT_ZERO);
        }

        if (coupon.getEndDate().isBefore(LocalDate.now())) {
            throw new CouponException(ErrorMessage.COUPON_DATE_EXPIRED);
        }

        if (this.customerCouponRepository.existsByCouponIdAndCustomerId(coupon.getId(), customer.getId())) {
            throw new CustomerCouponException(ErrorMessage.CANT_BUY_COUPON_TWICE);
        }

        CustomerCoupon customerCoupon = CustomerCoupon.builder()
                .coupon(coupon)
                .customer(customer)
                .build();
        this.customerCouponRepository.save(customerCoupon);

        coupon.setAmount(coupon.getAmount() - 1);
        this.couponRepository.save(coupon);

        return customerCoupon;
    }

    // the function receives an id and returns the purchase by the id from the database.

    public CustomerCoupon getSinglePurchase(int id) throws CustomerCouponException {
        return this.customerCouponRepository.findById(id).orElseThrow(() -> new CustomerCouponException(ErrorMessage.ID_NOT_FOUND));
    }

    // the function receives an id and delete the purchase by the id from the database.
    public void deletePurchase(int id) throws CustomerCouponException {
        if (!this.customerCouponRepository.existsById(id)) {
            throw new CustomerCouponException(ErrorMessage.ID_NOT_FOUND);
        }
        this.customerCouponRepository.deleteById(id);
    }

    // the function receives an id of a customer and returns all the customer's coupons from the database.
    public List<Coupon> getAllCouponsPurchasedByCustomerId(int customerId) throws AuthorizationException {
        this.validateClient.validateUserIsCustomer(customerId);
        return this.customerCouponRepository.findByCustomerId(customerId).stream().map(CustomerCoupon::getCoupon).collect(Collectors.toList());
    }

    // the function receives an id of a customer and a category and returns all the customer's coupons with the category from the database.
    public List<Coupon> getAllCouponsByCustomerIdAndCategory(int customerId, CategoryType category) throws AuthorizationException {
        this.validateClient.validateUserIsCustomer(customerId);
        return this.customerCouponRepository.findByCustomerId(customerId).stream()
                .map(CustomerCoupon::getCoupon)
                .filter(coupon -> coupon.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    // the function receives an id of a customer and max price and returns all the customer's coupons with the price equal or lower from the database.
    public List<Coupon> getAllCouponsByCustomerIdAndMaxPrice(int customerId, double maxPrice) throws AuthorizationException {
        this.validateClient.validateUserIsCustomer(customerId);
        return this.customerCouponRepository.findAllByCustomerIdAndMaxPrice(customerId, maxPrice).stream().map(CustomerCoupon::getCoupon).collect(Collectors.toList());
    }
}
