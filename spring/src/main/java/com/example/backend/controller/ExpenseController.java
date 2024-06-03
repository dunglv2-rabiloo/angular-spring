package com.example.backend.controller;

import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.model.Page;
import com.example.backend.model.Pagination;
import com.example.backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/me/expenses")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public void addNewExpense(@RequestBody NewExpenseDTO newExpense) {
        expenseService.addExpense(newExpense);
    }

    @GetMapping
    public Page<ExpenseDTO> getAllMyExpenses(Pagination pagination) {
        return expenseService.getAllMyExpenses(pagination);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteMyExpense(id);
    }
}
