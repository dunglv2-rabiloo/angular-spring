package com.example.backend.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResult {
    private Token accessToken;
    private Token refreshToken;
}
