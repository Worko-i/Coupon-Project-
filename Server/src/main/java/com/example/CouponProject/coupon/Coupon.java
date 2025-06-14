package com.example.CouponProject.coupon;

import com.example.CouponProject.enums.CategoryType;
import com.example.CouponProject.company.Company;
import com.example.CouponProject.customersCoupons.CustomerCoupon;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "coupons")
@JsonIgnoreProperties(value= {"handler","hibernateLazyInitializer","FieldHandler"})
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "amount")
    private int amount;
    @Column(name = "price")
    private double price;
    @Column(name = "image")
    private String image;

    @ManyToOne()
    @JoinColumn(name = "company_id")
    @JsonIgnore
    @ToString.Exclude
    private Company company;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", length = 20)
    private CategoryType category;

    @OneToMany(mappedBy = "coupon", cascade = {CascadeType.REMOVE})
    @ToString.Exclude
    @JsonIgnore
    private List<CustomerCoupon> customerCouponList;
}