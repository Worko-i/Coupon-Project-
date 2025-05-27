package com.example.CouponProject.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.CouponProject.user.UserService;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    private final SecurityFilter securityFilter;

    // Constructor using field injection instead of @RequiredArgsConstructor
    public SecurityConfig(UserService userService, SecurityFilter securityFilter) {
        this.userService = userService;
        this.securityFilter = securityFilter;
    }

    // function that filters the requests
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .authorizeHttpRequests(requests -> requests
                        // requestMatchers permit those URLS to enter the controller without a token!
                        .requestMatchers("/api/auth/**", "/api/category/**", "/error", "/swagger-ui/**", "/v3/api-docs/**")
                        .permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(csrf -> csrf
                        .disable())
                .cors(withDefaults())
                // addFilterBefore allow a URL that not permit to enter the filter, but have to validate the token before moving to the controller
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        AuthenticationManagerBuilder builder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(userService)
               .passwordEncoder(passwordEncoder());
        return builder.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
