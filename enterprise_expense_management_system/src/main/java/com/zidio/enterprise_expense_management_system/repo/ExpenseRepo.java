package com.zidio.enterprise_expense_management_system.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.zidio.enterprise_expense_management_system.dto.Expense;

public interface ExpenseRepo extends JpaRepository<Expense, Integer> {

	@Query("SELECT e FROM Expense e WHERE e.amount>=?1")
	List<Expense> findByAmountGreaterThan(double amount);

	List<Expense> findBySubmittedBy(String submittedBy); 

}
