package com.example.CouponProject.exceptionAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.CouponProject.exception.CategoryException;
import com.example.CouponProject.exception.ErrorResponse;

@RestControllerAdvice
public class CategoryExceptionAdvice {

    @ExceptionHandler(value = {CategoryException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorResponse handleError(CategoryException e) {
        return new ErrorResponse(e.getCode(), e.getMessage());
    }
}