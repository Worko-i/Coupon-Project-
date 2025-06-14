package com.example.CouponProject.clr;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.CouponProject.enums.CategoryType;
import com.example.CouponProject.category.CategoryService;
import com.example.CouponProject.company.Company;
import com.example.CouponProject.company.CompanyDTO;
import com.example.CouponProject.company.CompanyService;
import com.example.CouponProject.coupon.Coupon;
import com.example.CouponProject.coupon.CouponDTO;
import com.example.CouponProject.coupon.CouponService;
import com.example.CouponProject.customer.Customer;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.customer.CustomerService;
import com.example.CouponProject.customersCoupons.CustomerCouponService;

import java.time.LocalDate;
import java.util.Random;

@Component
@Transactional
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CouponService couponService;

    @Autowired
    private CustomerCouponService customerCouponService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private Random random;

    @Override
    public void run(String... args) throws Exception {
        // Always initialize categories (they have their own check for duplicates)
        categoryService.initializeCategories();
        System.out.println("Categories initialized in database.");

        // Check if data already exists to prevent duplicate entry errors
        try {
            // Check if there are any companies - if the first company exists, assume data is initialized
            companyService.getCompany(1);
            System.out.println("Database already initialized, skipping data creation.");
            return; // Skip initialization if data exists
        } catch (Exception e) {
            System.out.println("Initializing database with sample data...");
            // Continue with data initialization
        }

        //defining categories for the project - these are now handled by the CategoryType enum
        // No need to add categories to database since we're using enum

        // adding companies to the database
        for (int i = 1; i <= 10; i++) {
            try {
                Company company = Company.builder().name("company" + i).email("email" + i +"@gmail.com").password("password" + i).build();
                CompanyDTO companyDTO = this.modelMapper.map(company, CompanyDTO.class);
                this.companyService.addCompany(companyDTO);
            } catch (Exception e) {
                System.out.println("Error adding company " + i + ": " + e.getMessage());
                // Continue with the next company
            }
        }

        for (int i = 1; i <= 10; i++) {
            try {
                Customer customer = Customer.builder().firstName("first" + i).lastName("last" + i).email("customer" + i + "@gmail.com").password("password" + i).build();
                CustomerDTO customerDTO = this.modelMapper.map(customer, CustomerDTO.class);
                this.customerService.addCustomer(customerDTO);
            } catch (Exception e) {
                System.out.println("Error adding customer " + i + ": " + e.getMessage());
                // Continue with the next customer
            }
        }

        for (int i = 1; i <= 10; i++) {
            try {
                // Use enum categories instead of database categories
                CategoryType[] categories = CategoryType.values();
                CategoryType randomCategory = categories[random.nextInt(categories.length)];
                
                Coupon coupon = Coupon.builder()
                    .title("coupon" + i)
                    .description("description" + i)
                    .category(randomCategory)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now().plusDays(100 + i))
                    .amount(i*5)
                    .price(20 * i)
                    .image("image" + i)
                    .build();
                CouponDTO couponDTO = this.modelMapper.map(coupon, CouponDTO.class);
                this.couponService.addCoupon(couponDTO, random.nextInt(1,11));
            } catch (Exception e) {
                System.out.println("Error adding coupon " + i + ": " + e.getMessage());
                // Continue with the next coupon
            }
        }

        try {
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(1), this.customerService.getSingleCustomer(1));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(2), this.customerService.getSingleCustomer(1));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(5), this.customerService.getSingleCustomer(1));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(1), this.customerService.getSingleCustomer(3));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(9), this.customerService.getSingleCustomer(3));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(7), this.customerService.getSingleCustomer(7));
            this.customerCouponService.addPurchase(this.couponService.getSingleCoupon(6), this.customerService.getSingleCustomer(1));

            System.out.println(this.customerCouponService.getAllCouponsPurchasedByCustomerId(1));
        } catch (Exception e) {
            System.out.println("Error adding purchases: " + e.getMessage());
        }
        
        System.out.println("Database initialization completed successfully.");
    }
}
