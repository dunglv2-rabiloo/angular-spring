package com.example.backend.service.impl;

import com.example.backend.entity.User;
import com.example.backend.helper.AuthHelper;
import com.example.backend.model.ExpenseCategoryDistribution;
import com.example.backend.model.Period;
import com.example.backend.repository.ExpenseRepository;
import com.example.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
    private final AuthHelper authHelper;
    private final ExpenseRepository expenseRepository;

    @Override
    public List<ExpenseCategoryDistribution> getExpenseDistributionByCategory(Period period) {
        User user = authHelper.getSignedUser();

        return expenseRepository.getCategoryExpenseDistribution(user, period.getFrom(), period.getTo());
    }
}
