package com.example.backend.exception;

public class AuthenticationException extends ClientVisibleException {
    public AuthenticationException(String code, String msg) {
        super(code, msg);
    }
}
