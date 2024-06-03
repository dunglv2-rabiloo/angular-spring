package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class Pagination {
    private int page;
    private final int size = 5;

    public Pageable toPageable() {
        return Pageable.ofSize(this.size).withPage(this.page);
    }
}
