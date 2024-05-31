package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Page<T> {
    private int totalPages;
    private List<T> items;

    public static <T> Page<T> items(List<T> items) {
        return new Page<>(1, items);
    }

    public Page<T> totalPages(int totalPages) {
        this.totalPages = totalPages;
        return this;
    }
}
