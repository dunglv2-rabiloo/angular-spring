package com.example.backend.service.impl;

import com.example.backend.dto.CredentialDTO;
import com.example.backend.exception.AuthenticationException;
import com.example.backend.helper.JwtProvider;
import com.example.backend.model.AppUser;
import com.example.backend.model.AuthResult;
import com.example.backend.model.Token;
import com.example.backend.service.AuthService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.example.backend.config.SecurityConfig.*;
import static com.example.backend.constant.ApiCode.BAD_CREDENTIALS;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Override
    public AuthResult login(CredentialDTO credential) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    credential.getUsername(),
                    credential.getPassword()
                )
            );
            AppUser user = (AppUser) authentication.getPrincipal();
            Token accessToken = generateAccessToken(user.getUsername());
            Token refreshToken = generateRefreshToken(user.getUsername());

            return AuthResult.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        } catch (BadCredentialsException e) {
            throw new AuthenticationException(BAD_CREDENTIALS, "{auth.credentials.incorrect}");
        }
    }

    @Override
    public AuthResult refresh(String refreshToken) {
        Claims claims = jwtProvider.verifyToken(refreshToken);

        if (!JWT_TOKEN_TYPE_REFRESH.equals(claims.get(JWT_TOKEN_TYPE_KEY))) {
            throw new RuntimeException("{jwt.bad_malformed}");
        }

        return AuthResult.builder()
            .accessToken(generateAccessToken(claims.getSubject()))
            .refreshToken(generateRefreshToken(claims.getSubject()))
            .build();
    }

    private Token generateAccessToken(String subject) {
        return jwtProvider.generateToken(
            subject,
            ACCESS_TOKEN_LIFETIME,
            Map.of()
        );
    }

    private Token generateRefreshToken(String subject) {
        return jwtProvider.generateToken(
            subject,
            REFRESH_TOKEN_LIFETIME,
            Map.of(JWT_TOKEN_TYPE_KEY, JWT_TOKEN_TYPE_REFRESH)
        );
    }
}
