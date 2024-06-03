package com.example.backend.controller;

import com.example.backend.config.SecurityConfig;
import com.example.backend.dto.AuthRespDTO;
import com.example.backend.dto.CredentialDTO;
import com.example.backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @PreAuthorize("isAnonymous()")
    public AuthRespDTO login(@RequestBody CredentialDTO credential, HttpServletResponse response) {
        AuthRespDTO authRespDTO = authService.login(credential);
        Cookie cookie = makeAuthCookie(
            authRespDTO.getAccessToken(),
            (int) SecurityConfig.ACCESS_TOKEN_LIFETIME.toSeconds()
        );
        response.addCookie(cookie);

        return authRespDTO;
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public void logout(HttpServletResponse response) {
        response.addCookie(makeAuthCookie(null, 0));
    }

    private Cookie makeAuthCookie(String value, int age) {
        Cookie cookie = new Cookie(SecurityConfig.ACCESS_TOKEN_COOKIE, value);
        cookie.setPath("/");
        cookie.setMaxAge(age);
        cookie.setHttpOnly(true);

        return cookie;
    }
}
