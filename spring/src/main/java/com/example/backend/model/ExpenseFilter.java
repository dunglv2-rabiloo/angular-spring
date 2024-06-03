package com.example.backend.model;

import com.example.backend.entity.Category_;
import com.example.backend.entity.Expense;
import com.example.backend.entity.Expense_;
import com.example.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
public class ExpenseFilter {
    private String keyword;
    private List<String> categories;
    private LocalDate from;
    private LocalDate to;
    @JsonIgnore
    private User user;

    public ExpenseFilter ofUser(User user) {
        this.user = user;
        return this;
    }

    public Specification<Expense> toSpecification() {
        return ofUser().and(from()).and(to()).and(containsKeyword()).and(inCategories());
    }

    private Specification<Expense> ofUser() {
        if (user == null) return Specification.where(null);
        return (root, query, cb) -> cb.equal(root.get(Expense_.USER), user);
    }

    private Specification<Expense> containsKeyword() {
        if (keyword == null || keyword.isBlank()) return Specification.where(null);
        return (root, query, cb) -> cb.like(root.get(Expense_.SUBJECT), "%" + keyword + "%");
    }

    private Specification<Expense> inCategories() {
        if (categories == null || categories.isEmpty()) return null;
        return (root, query, cb) -> root.get(Expense_.CATEGORY).get(Category_.CODE).in(categories);
    }

    private Specification<Expense> from() {
        if (from == null) return Specification.where(null);
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get(Expense_.DATE).as(LocalDate.class), from);
    }

    private Specification<Expense> to() {
        if (from == null) return Specification.where(null);
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get(Expense_.DATE).as(LocalDate.class), to);
    }
}
