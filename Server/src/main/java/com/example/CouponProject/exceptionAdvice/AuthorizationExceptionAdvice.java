package com.example.CouponProject.exceptionAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.CouponProject.exception.AuthorizationException;
import com.example.CouponProject.exception.ErrorResponse;

@RestControllerAdvice
public class AuthorizationExceptionAdvice {
    @ExceptionHandler(value = {AuthorizationException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorResponse handleError(AuthorizationException e) {
        return new ErrorResponse(e.getCode(), e.getMessage());
    }
}
