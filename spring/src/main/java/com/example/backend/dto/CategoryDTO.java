package com.example.backend.dto;

import com.example.backend.entity.Category;
import lombok.Getter;

@Getter
public class CategoryDTO {
    private final String code;
    private final String label;

    public CategoryDTO(Category category) {
        this.code = category.getCode();
        this.label = category.getLabel();
    }
}
