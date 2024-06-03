package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
public class Period {
    private LocalDate from;
    private LocalDate to;

    public static Period from(LocalDate from) {
        return new Period(from, null);
    }

    public Period to(LocalDate to) {
        this.to = to;
        return this;
    }
}
