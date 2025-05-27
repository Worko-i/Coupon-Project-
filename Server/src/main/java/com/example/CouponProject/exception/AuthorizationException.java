package com.example.CouponProject.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.CouponProject.enums.ErrorMessage;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
@NoArgsConstructor
@Getter
public class AuthorizationException extends Exception {
    private int code;

    public AuthorizationException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
