package com.example.backend.dto;

import com.example.backend.entity.Expense;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class ExpenseDTO {
    private final Long id;

    private final String subject;

    private final BigDecimal amount;

    private final LocalDateTime date;

    private final String category;

    public ExpenseDTO(Expense expense) {
        this.id = expense.getId();
        this.subject = expense.getSubject();
        this.amount = expense.getAmount();
        this.date = expense.getDate();
        this.category = expense.getCategory().getLabel();
    }
}
