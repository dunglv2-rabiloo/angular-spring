package com.example.backend.controller;

import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.model.Pagination;
import com.example.backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/me/expenses")
@RequiredArgsConstructor
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping
    public void addNewExpense(@RequestBody NewExpenseDTO newExpense) {
        expenseService.addExpense(newExpense);
    }

    @GetMapping
    public List<ExpenseDTO> getAllMyExpenses(Pagination pagination) {
        return expenseService.getAllMyExpenses(pagination);
    }
}
