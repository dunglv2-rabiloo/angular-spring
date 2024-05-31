package com.example.backend.service;

import com.example.backend.dto.AuthRespDTO;
import com.example.backend.dto.CredentialDTO;

public interface AuthService {
    AuthRespDTO login(CredentialDTO credential);
}
