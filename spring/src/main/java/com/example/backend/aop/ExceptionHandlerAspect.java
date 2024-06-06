package com.example.backend.aop;

import com.example.backend.dto.ApiError;
import com.example.backend.helper.MessageProvider;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class ExceptionHandlerAspect {
    private final MessageProvider messageProvider;

    @Pointcut("execution(* com.example.backend.controller.DefaultExceptionHandler.handle*(..))")
    private void exceptionHandlerMethod() {}

    @AfterReturning(pointcut = "exceptionHandlerMethod()", returning = "error")
    public void resolveClientMessage(ApiError<?> error) {
        String rawMessage = error.getError();
        error.setError(messageProvider.getLocalizedMessage(rawMessage));
    }
}
