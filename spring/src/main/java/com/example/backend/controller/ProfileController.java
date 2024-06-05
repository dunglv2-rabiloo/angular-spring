package com.example.backend.controller;

import com.example.backend.dto.ProfileDTO;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/me/profile")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class ProfileController {
    private final UserService userService;

    @GetMapping
    public ProfileDTO getProfileInfo() {
        return userService.getProfileInfo();
    }

    @PostMapping("/avatar/upload")
    public void uploadAvatar(@RequestParam("avatar") MultipartFile file) {
        userService.changeAvatar(file);
    }
}
