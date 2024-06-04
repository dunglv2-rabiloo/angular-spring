package com.example.backend.service.impl;

import com.example.backend.dto.DetailExpenseDTO;
import com.example.backend.dto.ExpenseDTO;
import com.example.backend.dto.NewExpenseDTO;
import com.example.backend.dto.UpdateExpenseDTO;
import com.example.backend.entity.Category;
import com.example.backend.entity.Expense;
import com.example.backend.entity.Expense_;
import com.example.backend.entity.User;
import com.example.backend.exception.ClientVisibleException;
import com.example.backend.helper.AuthHelper;
import com.example.backend.model.ExpenseFilter;
import com.example.backend.model.Page;
import com.example.backend.model.Pagination;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ExpenseRepository;
import com.example.backend.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@Validated
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
    private final AuthHelper authHelper;
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void addExpense(@Valid NewExpenseDTO newExpense) {
        User user = authHelper.getSignedUser();
        Category category = categoryRepository.findByCode(newExpense.getCategory())
            .orElseThrow(RuntimeException::new);

        Expense expense = newExpense.toEntity();
        expense.setCategory(category);
        expense.setUser(user);

        expenseRepository.save(expense);
    }

    @Override
    public Page<ExpenseDTO> getAllMyExpenses(ExpenseFilter filter, Pagination pagination) {
        User user = authHelper.getSignedUser();
        Sort sort = Sort.by(Sort.Direction.DESC, Expense_.DATE);
        Pageable pageable = PageRequest.ofSize(pagination.getSize())
            .withPage(pagination.getPage())
            .withSort(sort);

        var page = expenseRepository.findAll(filter.ofUser(user).toSpecification(), pageable);

        return Page.items(page.stream().map(ExpenseDTO::new).toList())
            .totalPages(page.getTotalPages());
    }

    @Override
    public void deleteMyExpense(Long id) {
        User user = authHelper.getSignedUser();
        Expense expense = expenseRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new ClientVisibleException("{expense.not_exist}"));

        expenseRepository.delete(expense);
    }

    @Override
    public DetailExpenseDTO getExpense(Long id) {
        User user = authHelper.getSignedUser();
        Expense expense = expenseRepository.findByIdAndUser(id, user).orElseThrow();

        return new DetailExpenseDTO(expense);
    }

    @Override
    public void updateExpense(@Valid UpdateExpenseDTO updateExpenseDTO) {
        Expense expense = expenseRepository.findByIdAndUser(updateExpenseDTO.getId(), authHelper.getSignedUser())
            .orElseThrow();
        expenseRepository.save(merge(expense, updateExpenseDTO));
    }

    private Expense merge(Expense expense, UpdateExpenseDTO updateExpenseDTO) {
        Category category = categoryRepository.findByCode(updateExpenseDTO.getCategory())
            .orElseThrow();
        expense.setSubject(updateExpenseDTO.getSubject());
        expense.setDate(updateExpenseDTO.getDate());
        expense.setAmount(updateExpenseDTO.getAmount());
        expense.setDescription(updateExpenseDTO.getDescription());
        expense.setCategory(category);
        return expense;
    }
}
