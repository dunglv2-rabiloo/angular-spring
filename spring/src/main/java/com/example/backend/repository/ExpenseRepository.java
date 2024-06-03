package com.example.backend.repository;

import com.example.backend.entity.Expense;
import com.example.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Page<Expense> findAllByUser(User user, Pageable pageable);
    Optional<Expense> findByIdAndUser(Long id, User user);
}
