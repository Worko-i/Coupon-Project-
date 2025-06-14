package com.example.CouponProject.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.CouponProject.company.Company;
import com.example.CouponProject.company.CompanyDTO;
import com.example.CouponProject.company.CompanyService;
import com.example.CouponProject.customer.Customer;
import com.example.CouponProject.customer.CustomerDTO;
import com.example.CouponProject.customer.CustomerService;
import com.example.CouponProject.enums.ClientType;
import com.example.CouponProject.enums.ErrorMessage;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.login.ClientTypeLoggedIn;
import com.example.CouponProject.token.TokenService;
import com.example.CouponProject.user.UserService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthService {

    private final TokenService tokenService;
    private final UserService userService;
    private final CompanyService companyService;
    private final CustomerService customerService;
    private final ModelMapper modelMapper;
    private final ClientTypeLoggedIn clientTypeLoggedIn;
    
    private final AuthenticationManager authenticationManager;

    // Constructor with @Lazy for authenticationManager to break the circular dependency
    @Autowired
    public AuthService(TokenService tokenService,
                      @Lazy UserService userService,
                      CompanyService companyService,
                      CustomerService customerService,
                      ModelMapper modelMapper,
                      ClientTypeLoggedIn clientTypeLoggedIn,
                      @Lazy AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.companyService = companyService;
        this.customerService = customerService;
        this.modelMapper = modelMapper;
        this.clientTypeLoggedIn = clientTypeLoggedIn;
        this.authenticationManager = authenticationManager;
    }

    public TokenResponseDTO createTokenFromLoginDetails(LoginRequestDTO loginRequestDTO) throws AuthorizationException {
        try {
            System.out.println("Processing login request for: " + loginRequestDTO.getEmail() + " with client type: " + loginRequestDTO.getClientType());
            
            // Early validation for admin - must use correct client type
            if (loginRequestDTO.getEmail().equals("admin@admin.com")) {
                if (loginRequestDTO.getClientType() != ClientType.ADMIN) {
                    System.out.println("Attempted to login as admin with incorrect client type: " + loginRequestDTO.getClientType());
                    throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
                }
                
                try {
                    // Direct password validation for admin
                    if (loginRequestDTO.getPassword().equals("admin")) {
                        // Create admin claims directly
                        Map<String, Object> adminClaims = new HashMap<>();
                        adminClaims.put("email", "admin@admin.com");
                        adminClaims.put("role", "ADMIN");
                        adminClaims.put("clientType", loginRequestDTO.getClientType());
                        
                        // Set the client type in the shared object
                        this.clientTypeLoggedIn.setClientType(ClientType.ADMIN);
                        
                        // Generate token for admin
                        String token = this.tokenService.generateToken(adminClaims);
                        Date expirationDate = this.tokenService.getExpirationFromToken(token);
                        return TokenResponseDTO.builder()
                            .token(token)
                            .expiration(expirationDate.getTime())
                            .build();
                    } else {
                        System.out.println("Admin login failed: incorrect password");
                        throw new AuthorizationException(ErrorMessage.PASSWORD_NOT_FOUND);
                    }
                } catch (AuthorizationException e) {
                    throw e;
                } catch (Exception e) {
                    System.err.println("Unexpected error during admin authentication: " + e.toString());
                    e.printStackTrace();
                    throw new AuthorizationException(ErrorMessage.AUTHENTICATION_ERROR);
                }
            }
            
            // Early validation for non-admin users trying to use admin email
            if (loginRequestDTO.getEmail().equals("admin@admin.com")) {
                throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
            }
            
            // Validate user type matches client type before standard authentication
            UserDetails userDetails = this.userService.loadUserByUsername(loginRequestDTO.getEmail());
            if (userDetails == null) {
                throw new AuthorizationException(ErrorMessage.EMAIL_NOT_FOUND);
            }

            // Check if trying to log in as COMPANY
            if (loginRequestDTO.getClientType() == ClientType.COMPANY) {
                if (!(userDetails instanceof CompanyDTO) && !(userDetails instanceof Company)) {
                    throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
                }
            }

            // Check if trying to log in as CUSTOMER
            if (loginRequestDTO.getClientType() == ClientType.CUSTOMER) {
                if (!(userDetails instanceof CustomerDTO) && !(userDetails instanceof Customer)) {
                    throw new AuthorizationException(ErrorMessage.NOT_AUTHORIZED);
                }
            }
            
            // Standard authentication for non-admin users
            boolean isLoginDetailsValid = this.isLoginDetailsValid(loginRequestDTO);
            
            if (isLoginDetailsValid) {
                Map<String, Object> claims;
                
                switch (loginRequestDTO.getClientType()) {
                    case COMPANY -> {
                        System.out.println("Processing COMPANY login for: " + loginRequestDTO.getEmail());
                        try {
                            if (userDetails instanceof CompanyDTO) {
                                claims = this.companyService.buildClaims((CompanyDTO) userDetails);
                            } else if (userDetails instanceof Company) {
                                Company company = (Company) userDetails;
                                CompanyDTO companyDTO = this.modelMapper.map(company, CompanyDTO.class);
                                claims = this.companyService.buildClaims(companyDTO);
                            } else {
                                UserDetails companyDetails;
                                try {
                                    companyDetails = this.companyService.findByEmail(loginRequestDTO.getEmail());
                                } catch (Exception e) {
                                    companyDetails = null;
                                }
                                
                                if (companyDetails != null && companyDetails instanceof Company) {
                                    Company company = (Company) companyDetails;
                                    CompanyDTO companyDTO = this.modelMapper.map(company, CompanyDTO.class);
                                    claims = this.companyService.buildClaims(companyDTO);
                                } else {
                                    claims = new HashMap<>();
                                    claims.put("email", userDetails.getUsername());
                                }
                            }
                            
                            // Set the client type in the shared object
                            this.clientTypeLoggedIn.setClientType(ClientType.COMPANY);
                            
                        } catch (Exception e) {
                            System.err.println("Error processing company login: " + e.toString());
                            e.printStackTrace();
                            claims = new HashMap<>();
                            claims.put("email", userDetails.getUsername());
                        }
                    }
                    case CUSTOMER -> {
                        System.out.println("Processing CUSTOMER login for: " + loginRequestDTO.getEmail());
                        try {
                            if (userDetails instanceof CustomerDTO) {
                                claims = this.customerService.buildClaims((CustomerDTO) userDetails);
                            } else if (userDetails instanceof Customer) {
                                Customer customer = (Customer) userDetails;
                                CustomerDTO customerDTO = this.modelMapper.map(customer, CustomerDTO.class);
                                claims = this.customerService.buildClaims(customerDTO);
                            } else {
                                Customer customer = this.customerService.findByEmail(loginRequestDTO.getEmail());
                                if (customer == null) {
                                    claims = new HashMap<>();
                                    claims.put("email", userDetails.getUsername());
                                } else {
                                    CustomerDTO customerDTO = this.modelMapper.map(customer, CustomerDTO.class);
                                    claims = this.customerService.buildClaims(customerDTO);
                                }
                            }
                            
                            // Set the client type in the shared object
                            this.clientTypeLoggedIn.setClientType(ClientType.CUSTOMER);
                            
                        } catch (Exception e) {
                            System.err.println("Error processing customer login: " + e.toString());
                            e.printStackTrace();
                            claims = new HashMap<>();
                            claims.put("email", userDetails.getUsername());
                        }
                    }
                    default -> {
                        System.err.println("Unknown client type: " + loginRequestDTO.getClientType());
                        throw new AuthorizationException(ErrorMessage.CLIENT_TYPE_ERROR);
                    }
                }

                claims.put("clientType", loginRequestDTO.getClientType());
                String token = this.tokenService.generateToken(claims);
                Date expirationDate = this.tokenService.getExpirationFromToken(token);
                return TokenResponseDTO.builder()
                    .token(token)
                    .expiration(expirationDate.getTime())
                    .build();
            }
            else {
                if (this.userService.loadUserByUsername(loginRequestDTO.getEmail()) == null){
                    throw new AuthorizationException(ErrorMessage.EMAIL_NOT_FOUND);
                }
                else {
                    throw new AuthorizationException(ErrorMessage.PASSWORD_NOT_FOUND);
                }
            }
        } catch (AuthorizationException e) {
            throw e;
        } catch (Exception e) {
            System.err.println("Exception during authentication process: " + e.toString());
            e.printStackTrace();
            throw new AuthorizationException(ErrorMessage.AUTHENTICATION_ERROR);
        }
    }

    private boolean isLoginDetailsValid(LoginRequestDTO loginRequestDTO) {
        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getEmail(),
                            loginRequestDTO.getPassword()
                    )
            );
            return true;
        } catch (Exception e) {
            System.err.println("Authentication failed: " + e.getMessage());
            return false;
        }
    }
}
