package com.example.backend.service;

import com.example.backend.dto.ProfileDTO;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void changeAvatar(MultipartFile file);
    ProfileDTO getProfileInfo();
}
