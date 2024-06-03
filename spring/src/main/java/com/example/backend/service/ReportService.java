package com.example.backend.service;

import com.example.backend.model.ExpenseCategoryDistribution;
import com.example.backend.model.Period;

import java.util.List;

public interface ReportService {
    List<ExpenseCategoryDistribution> getExpenseDistributionByCategory(Period period);
}
