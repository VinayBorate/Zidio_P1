package com.zidio.enterprise_expense_management_system.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ExpenseRequestDTO {

	private String description;
    private BigDecimal amount;
    private String category;
}
