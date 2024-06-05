package com.example.backend.dto;

import com.example.backend.entity.Expense;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class NewExpenseDTO {
    @NotBlank(message = "{expense.subject.required}")
    private String subject;

    private String description;

    @Positive(message = "{expense.amount.require_positive}")
    private BigDecimal amount;

    @PastOrPresent(message = "{expense.date.require_past}")
    private LocalDateTime date;

    @NotBlank(message = "{expense.category.required}")
    private String category;

    public Expense toEntity() {
        return Expense.builder()
            .subject(this.subject)
            .amount(this.amount)
            .date(this.date)
            .description(this.description)
            .build();
    }
}
