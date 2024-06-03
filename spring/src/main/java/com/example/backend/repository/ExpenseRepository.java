package com.example.backend.repository;

import com.example.backend.model.ExpenseCategoryDistribution;
import com.example.backend.entity.Expense;
import com.example.backend.entity.User;
import com.example.backend.model.ExpenseDayTotal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findAllByUser(User user, Pageable pageable);
    Optional<Expense> findByIdAndUser(Long id, User user);

    @Query("""
        SELECT e.category.code AS code, e.category.label AS label, SUM(e.amount) AS totalAmount
        FROM Expense e
        WHERE e.user = :user
        AND (:from IS NULL OR DATE(e.date) >= :from)
        AND (:to IS NULL OR DATE(e.date) <= :to)
        GROUP BY e.category
    """)
    List<ExpenseCategoryDistribution> getCategoryExpenseDistribution(
        @Param("user") User user,
        @Param("from") LocalDate from,
        @Param("to") LocalDate to
    );

    @Query("""
        SELECT DATE(e.date) AS date, SUM(e.amount) AS totalAmount
        FROM Expense e
        WHERE e.user = :user
        AND (:from IS NULL OR DATE(e.date) >= :from)
        AND (:to IS NULL OR DATE(e.date) <= :to)
        GROUP BY DATE(e.date)
        ORDER BY DATE(e.date) ASC
    """)
    List<ExpenseDayTotal> getExpenseDayTotals(
        @Param("user") User user,
        @Param("from") LocalDate from,
        @Param("to") LocalDate to
    );
}
