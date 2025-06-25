package com.example.CouponProject.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.token.TokenService;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;

    @PostMapping("/login")
    public TokenResponseDTO login(@RequestBody LoginRequestDTO loginRequestDTO) throws AuthorizationException {
        System.out.println("Login request: " + loginRequestDTO);
        return this.authService.createTokenFromLoginDetails(loginRequestDTO);
    }
}
