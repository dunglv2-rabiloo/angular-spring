package com.example.backend.controller;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
            .stream()
            .map(CategoryDTO::new)
            .toList();
    }
}
