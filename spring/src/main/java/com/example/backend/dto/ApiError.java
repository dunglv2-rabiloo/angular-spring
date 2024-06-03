package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiError<P> {
    private String error;
    private P payload;

    private ApiError() {}

    public static <P> ApiError<P> error(String message) {
        return new ApiError<>(message, null);
    }

    public ApiError<P> payload(P payload) {
        this.payload = payload;
        return this;
    }
}
