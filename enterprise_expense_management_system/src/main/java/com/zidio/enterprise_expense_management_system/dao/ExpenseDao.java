package com.zidio.enterprise_expense_management_system.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.zidio.enterprise_expense_management_system.dto.Expense;
import com.zidio.enterprise_expense_management_system.repo.ExpenseRepo;

@Repository
public class ExpenseDao {
	@Autowired
	private ExpenseRepo expenseRepo;

	public Expense submitExpense(Expense expense) {
		return expenseRepo.save(expense);
	}

	public List<Expense> viewPendingExpenses() {
		return expenseRepo.findAll().stream().filter(expense -> "PENDING".equals(expense.getStatus())).toList();
	}

	public Expense findExpenseById(int id) {
		Optional<Expense> optional = expenseRepo.findById(id);
		if (optional.isEmpty()) {
			return null;
		} else {
			return optional.get();
		}

	}

	public List<Expense> getAllExpenses() {
		return expenseRepo.findAll();
	}

	public Expense deleteExpense(Expense expense) {
		expenseRepo.delete(expense);
		return expense;
	}

	public List<Expense> getExpensesAboveOneLakh() {
		return expenseRepo.findByAmountGreaterThan(100000);
	}

	public List<Expense> findBySubmittedBy(String submittedBy) {
		return expenseRepo.findBySubmittedBy(submittedBy);
	}

	

}
