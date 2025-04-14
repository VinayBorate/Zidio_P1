package com.zidio.enterprise_expense_management_system.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "expenses")
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String description;
	private BigDecimal amount;
	private LocalDate date;
	private String category;
	private String status; // PENDING, APPROVED, REJECTED
    private String submittedBy;
    private String approvedBy;

}
