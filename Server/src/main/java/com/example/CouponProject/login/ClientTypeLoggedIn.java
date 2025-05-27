package com.example.CouponProject.login;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.example.CouponProject.enums.ClientType;

@Data
@Component
@RequiredArgsConstructor
public class ClientTypeLoggedIn {
    private ClientType clientType;
}
