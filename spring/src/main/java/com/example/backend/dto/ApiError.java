package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class ApiError<P> {
    private String code;
    private String error;
    private P payload;

    private ApiError() {}

    public static <P> ApiError<P> withError(String message) {
        return new ApiError<>(null, message, null);
    }

    public static <P> ApiError<P> withCode(String code) {
        return new ApiError<>(code, null, null);
    }

    public ApiError<P> error(String message) {
        this.error = message;
        return this;
    }

    public ApiError<P> payload(P payload) {
        this.payload = payload;
        return this;
    }
}
