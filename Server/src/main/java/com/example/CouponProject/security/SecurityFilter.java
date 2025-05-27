package com.example.CouponProject.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.CouponProject.enums.ClientType;
import com.example.CouponProject.enums.ErrorMessage;
import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.CustomerException;
import com.example.CouponProject.token.TokenService;
import com.example.CouponProject.user.UserService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private UserService userService;

    // Constructor with TokenService only - breaking the circular dependency
    @Autowired
    public SecurityFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    // Lazy injection of UserService to break the circular dependency
    @Autowired
    public void setUserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String tokenHeader = request.getHeader("Authorization");
            if (tokenHeader == null || !tokenHeader.startsWith("Bearer")) {
                filterChain.doFilter(request, response); //if the request don't have a token,can go to controller if authorized in securityConfig!
                return;
            }

            final String token = tokenHeader.substring(7); // header starts with: Bearer someToken, so the token start after index 7
            String email = this.tokenService.getEmailFromToken(token);
            String clientType = this.tokenService.getClientTypeFromToken(token);

            // Check for route protection based on client type
            if (clientType != null) {
                // Admin-specific route protection
                if (!clientType.equals(ClientType.ADMIN.name()) && request.getRequestURI().contains("/admin/")) {
                    log.warn("Unauthorized access attempt: Non-admin user trying to access admin route: {}", request.getRequestURI());
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "You do not have permission to access this resource");
                    return;
                }

                boolean isTokenExpirationValid = this.tokenService.isExpirationToken(token);
                if (isTokenExpirationValid && email != null) {
                    UserDetails userDetails = this.userService.loadUserByUsername(email);
                    if (userDetails != null) {
                        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                        // Add ROLE_ADMIN if clientType is ADMIN
                        if ("ADMIN".equals(clientType)) {
                            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                        }
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                authorities
                        );
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        log.debug("User authenticated: {} with authorities: {}", email, authorities);
                    }
                } else {
                    log.warn("Authentication failed: Token expired or invalid for user email: {}", email);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"message\":\"Session expired. Please login again.\"}");
                    response.setContentType("application/json");
                    return;
                }
            } else {
                log.warn("Invalid token: No client type found");
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("Error in security filter: {}", e.getMessage(), e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred processing your request");
        }
    }
}

