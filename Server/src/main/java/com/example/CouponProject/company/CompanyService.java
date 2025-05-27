package com.example.CouponProject.company;

import org.springframework.security.core.userdetails.UserDetails;

import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CompanyException;

import java.util.List;
import java.util.Map;

public interface CompanyService {

    CompanyDTO addCompany(CompanyDTO companyDTO) throws CompanyException, CompanyException, AuthorizationException;
    List<CompanyDTO> getCompanies() throws AuthorizationException;
    CompanyDTO getCompany(int id) throws CompanyException, AuthorizationException;
    Company getCompanyFromDB(int id) throws CompanyException;
    void updateCompany(int id, CompanyDTO companyDTO) throws CompanyException, AuthorizationException;
    void deleteCompany(int id) throws CompanyException, AuthorizationException;
    boolean isEmailAndPasswordExist(String email, String password);
    UserDetails findByEmail(String username) throws CompanyException;
    Map<String, Object> buildClaims(CompanyDTO companyDTO);
}
