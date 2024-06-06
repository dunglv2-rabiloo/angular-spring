package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class Token {
    private String value;
    private LocalDateTime expiredAt;
}
