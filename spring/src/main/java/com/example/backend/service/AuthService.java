package com.example.backend.service;

import com.example.backend.model.AuthResult;
import com.example.backend.dto.CredentialDTO;

public interface AuthService {
    AuthResult login(CredentialDTO credential);
    AuthResult refresh(String refreshToken);
}
