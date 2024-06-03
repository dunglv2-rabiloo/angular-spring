package com.example.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ExpenseDayTotal {
    LocalDate getDate();
    BigDecimal getTotalAmount();
}
