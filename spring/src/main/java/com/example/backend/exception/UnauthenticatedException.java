package com.example.backend.exception;

public class UnauthenticatedException extends ClientVisibleException {
    public UnauthenticatedException(String msg) {
        super(msg);
    }
}
