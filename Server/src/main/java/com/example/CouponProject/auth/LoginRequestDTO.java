package com.example.CouponProject.auth;

import com.example.CouponProject.enums.ClientType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    private String email;
    private String password;
    private ClientType clientType;

}
