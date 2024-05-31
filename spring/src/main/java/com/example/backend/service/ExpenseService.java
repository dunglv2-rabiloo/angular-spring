package com.example.backend.service;

import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.model.Pagination;
import jakarta.validation.Valid;

import java.util.List;

public interface ExpenseService {
    void addExpense(@Valid NewExpenseDTO newExpense);
    List<ExpenseDTO> getAllMyExpenses(Pagination pagination);
}
