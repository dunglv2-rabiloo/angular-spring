package com.example.backend.service.impl;

import com.example.backend.dto.ProfileDTO;
import com.example.backend.entity.User;
import com.example.backend.helper.AuthHelper;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.StorageService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthHelper authHelper;
    private final StorageService storageService;

    @Override
    public void changeAvatar(MultipartFile file) {
        User user = userRepository.findById(authHelper.getSignedUser().getId())
            .orElseThrow();
        String url = storageService.storeFile(file);
        user.setAvatar(url);
        userRepository.save(user);
    }

    @Override
    public ProfileDTO getProfileInfo() {
        User user = userRepository.findById(authHelper.getSignedUser().getId())
            .orElseThrow();
        return new ProfileDTO(user);
    }
}
