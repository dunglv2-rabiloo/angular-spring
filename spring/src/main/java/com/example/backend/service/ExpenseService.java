package com.example.backend.service;

import com.example.backend.dto.DetailExpenseDTO;
import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.dto.UpdateExpenseDTO;
import com.example.backend.model.ExpenseFilter;
import com.example.backend.model.Page;
import com.example.backend.model.Pagination;
import jakarta.validation.Valid;

public interface ExpenseService {
    void addExpense(@Valid NewExpenseDTO newExpense);
    Page<ExpenseDTO> getAllMyExpenses(ExpenseFilter filter, Pagination pagination);
    void deleteMyExpense(Long id);
    DetailExpenseDTO getExpense(Long id);
    void updateExpense(@Valid UpdateExpenseDTO updateExpenseDTO);
}
