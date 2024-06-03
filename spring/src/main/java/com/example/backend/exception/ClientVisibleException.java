package com.example.backend.exception;

public class ClientVisibleException extends RuntimeException {
    public ClientVisibleException(String message) {
        super(message);
    }
}
