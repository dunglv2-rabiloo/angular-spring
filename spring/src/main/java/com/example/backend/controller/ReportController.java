package com.example.backend.controller;

import com.example.backend.model.ExpenseCategoryDistribution;
import com.example.backend.model.Period;
import com.example.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/me/reports")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/expenses/distribution")
    public List<ExpenseCategoryDistribution> getExpenseDistributionByCategory(Period period) {
        return reportService.getExpenseDistributionByCategory(period);
    }
}
