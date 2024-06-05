package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthRespDTO {
    @JsonIgnore
    private String accessToken;

    private String displayName;

    private String avatar;
}
