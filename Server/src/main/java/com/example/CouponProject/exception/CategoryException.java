package com.example.CouponProject.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.CouponProject.enums.ErrorMessage;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
@NoArgsConstructor
@Getter
public class CategoryException extends Exception {
    private int code;

    public CategoryException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
