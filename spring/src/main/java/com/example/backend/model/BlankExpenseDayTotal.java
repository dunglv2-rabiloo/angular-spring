package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BlankExpenseDayTotal implements ExpenseDayTotal {
    public LocalDate date;

    public BlankExpenseDayTotal(LocalDate date) {
        this.date = date;
    }

    @Override
    public LocalDate getDate() {
        return this.date;
    }

    @Override
    public BigDecimal getTotalAmount() {
        return BigDecimal.ZERO;
    }
}
