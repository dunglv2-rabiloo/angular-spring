package com.example.backend.helper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Map;

@Component
public class JwtProvider {
    private final SecretKey secretKey;

    public JwtProvider(@Value("${auth.jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String subject, Duration lifetime, Map<String, Object> extras) {
        JwtBuilder builder =  Jwts.builder()
            .subject(subject)
            .issuedAt(getDateInstanceFor(LocalDateTime.now()))
            .expiration(getDateInstanceFor(LocalDateTime.now().plus(lifetime)))
            .claims(extras)
            .signWith(secretKey);

        return builder.compact();
    }

    public Claims verifyToken(String token) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private Date getDateInstanceFor(LocalDateTime localDateTime) {
        return Date.from(localDateTime.toInstant(ZoneOffset.UTC));
    }
}
