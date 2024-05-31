package com.example.backend.exception;

import org.springframework.security.core.AuthenticationException;

public class UnauthenticatedException extends AuthenticationException {
    public UnauthenticatedException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
