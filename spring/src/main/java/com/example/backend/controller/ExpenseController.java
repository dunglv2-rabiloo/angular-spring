package com.example.backend.controller;

import com.example.backend.dto.DetailExpenseDTO;
import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.dto.UpdateExpenseDTO;
import com.example.backend.model.ExpenseFilter;
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
    public Page<ExpenseDTO> getAllMyExpenses(ExpenseFilter filter, Pagination pagination) {
        return expenseService.getAllMyExpenses(filter, pagination);
    }

    @GetMapping("/{id}")
    public DetailExpenseDTO getExpense(@PathVariable Long id) {
        return expenseService.getExpense(id);
    }

    @PutMapping("/{id}")
    public void updateExpense(@PathVariable Long id, @RequestBody UpdateExpenseDTO updateExpenseDTO) {
        updateExpenseDTO.setId(id);
        expenseService.updateExpense(updateExpenseDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteMyExpense(id);
    }
}
