package com.example.backend.dto;

import com.example.backend.entity.Expense;
import lombok.Getter;

@Getter
public class DetailExpenseDTO extends ExpenseDTO {
    private String description;

    public DetailExpenseDTO(Expense expense) {
        super(expense);
        this.category = expense.getCategory().getCode();
        this.description = expense.getDescription();
    }
}
