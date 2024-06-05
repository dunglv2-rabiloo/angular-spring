package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Getter;

@Getter
public class ProfileDTO {
    private final String displayName;
    private final String avatar;

    public ProfileDTO(User user) {
        this.displayName = user.getDisplayName();
        this.avatar = user.getAvatar();
    }
}
