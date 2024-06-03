package com.example.backend.service.impl;

import com.example.backend.entity.User;
import com.example.backend.helper.AuthHelper;
import com.example.backend.model.BlankExpenseDayTotal;
import com.example.backend.model.ExpenseCategoryDistribution;
import com.example.backend.model.ExpenseDayTotal;
import com.example.backend.model.Period;
import com.example.backend.repository.ExpenseRepository;
import com.example.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
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

    @Override
    public List<ExpenseDayTotal> getExpenseTotalByDay(Period period) {
        User user = authHelper.getSignedUser();
        List<ExpenseDayTotal> aggregatedTotals = expenseRepository.getExpenseDayTotals(
            user,
            period.getFrom(),
            period.getTo()
        );
        List<ExpenseDayTotal> totals = new ArrayList<>();

        LocalDate cur = period.getFrom();
        int i = 0;
        do {
            if (i < aggregatedTotals.size() && cur.equals(aggregatedTotals.get(i).getDate())) {
                totals.add(aggregatedTotals.get(i));
                i++;
            } else {
                totals.add(new BlankExpenseDayTotal(cur));
            }

            cur = cur.plusDays(1);
        } while (!cur.isAfter(period.getTo()));

        return totals;
    }
}
