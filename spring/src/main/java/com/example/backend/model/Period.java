package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class Period {
    private LocalDate from;
    private LocalDate to;
}
