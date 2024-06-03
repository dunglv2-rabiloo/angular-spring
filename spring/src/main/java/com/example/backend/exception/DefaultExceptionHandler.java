package com.example.backend.exception;

import com.example.backend.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class DefaultExceptionHandler {
    @ExceptionHandler(ClientVisibleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError<?> handleClientVisibleError(ClientVisibleException e) {
        return ApiError.error(e.getMessage());
    }
}
