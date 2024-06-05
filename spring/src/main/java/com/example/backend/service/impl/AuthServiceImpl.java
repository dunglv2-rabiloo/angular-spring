package com.example.backend.service.impl;

import com.example.backend.config.SecurityConfig;
import com.example.backend.dto.AuthRespDTO;
import com.example.backend.dto.CredentialDTO;
import com.example.backend.entity.User;
import com.example.backend.exception.UnauthenticatedException;
import com.example.backend.helper.JwtProvider;
import com.example.backend.model.AppUser;
import com.example.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Override
    public AuthRespDTO login(CredentialDTO credential) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    credential.getUsername(),
                    credential.getPassword()
                )
            );
            String accessToken = generateAccessToken(authentication);
            User user = ((AppUser) authentication.getPrincipal()).getUser();

            return AuthRespDTO.builder()
                .accessToken(accessToken)
                .displayName(user.getDisplayName())
                .avatar(user.getAvatar())
                .build();
        } catch (BadCredentialsException e) {
            throw new UnauthenticatedException("Bad Credentials", e);
        }
    }

    private String generateAccessToken(Authentication authentication) {
        AppUser user = (AppUser) authentication.getPrincipal();

        return jwtProvider.generateToken(
            user.getUsername(),
            SecurityConfig.ACCESS_TOKEN_LIFETIME,
            Map.of()
        );
    }
}
