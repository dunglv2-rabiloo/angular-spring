package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateExpenseDTO extends NewExpenseDTO {
    private Long id;
}
