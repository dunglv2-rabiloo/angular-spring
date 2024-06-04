package com.example.backend.dto;

import com.example.backend.entity.Expense;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class ExpenseDTO {
    protected Long id;

    protected String subject;

    protected BigDecimal amount;

    protected LocalDateTime date;

    protected String category;

    public ExpenseDTO(Expense expense) {
        this.id = expense.getId();
        this.subject = expense.getSubject();
        this.amount = expense.getAmount();
        this.date = expense.getDate();
        this.category = expense.getCategory().getLabel();
    }
}
