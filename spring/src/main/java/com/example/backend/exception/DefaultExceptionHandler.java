package com.example.backend.exception;

import com.example.backend.dto.ApiError;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.Objects;

@RestControllerAdvice
@Slf4j
public class DefaultExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError<?> handleInvalidData(MethodArgumentNotValidException e) {
        String message = Objects.requireNonNull(e.getDetailMessageArguments())[0].toString();
        return ApiError.withError(message);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError<?> handleConstrainViolation(ConstraintViolationException e) {
        return ApiError.withError(e.getConstraintViolations().stream().map(ConstraintViolation::getMessage).toList().get(0));
    }

    @ExceptionHandler({AccessDeniedException.class, AuthorizationDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiError<?> handleAccessDenied() {
        return ApiError.withError("{access.forbidden}");
    }

    @ExceptionHandler(ClientVisibleException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError<?> handleClientVisibleError(ClientVisibleException e) {
        return ApiError.withError(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiError<?> handleUnknownError(Exception e) {
        log.error("Unhandled Error: " + e.getMessage(), e);
        return ApiError.withError("{server.internal_error}");
    }
}
