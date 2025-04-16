package com.zidio.enterprise_expense_management_system.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.zidio.enterprise_expense_management_system.dao.ExpenseDao;
import com.zidio.enterprise_expense_management_system.dto.Expense;
import com.zidio.enterprise_expense_management_system.dto.ExpenseRequestDTO;
import com.zidio.enterprise_expense_management_system.exception.DataNotFoundException;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

@Service
public class ExpenseService {

	@Autowired
	private ExpenseDao expenseDao;

	public ResponseEntity<ResponseStructure<Expense>> submitExpense(ExpenseRequestDTO expenseRequestDTO) {
		ResponseStructure<Expense> structure = new ResponseStructure<Expense>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String employeeName = authentication.getName();
		Expense expense=new Expense();
		expense.setDescription(expenseRequestDTO.getDescription());
        expense.setAmount(expenseRequestDTO.getAmount());
        expense.setCategory(expenseRequestDTO.getCategory());
		expense.setSubmittedBy(employeeName);
		expense.setDate(LocalDate.now());
		expense.setStatus("PENDING");
		structure.setMessage("Expense submitted successfully");
		structure.setStatus(HttpStatus.CREATED.value());
		structure.setData(expenseDao.submitExpense(expense));
		return new ResponseEntity<ResponseStructure<Expense>>(structure, HttpStatus.CREATED);

	}

	public ResponseEntity<ResponseStructure<List<Expense>>> viewPendingExpenses() {
		List<Expense> list = expenseDao.viewPendingExpenses();
		ResponseStructure<List<Expense>> responseStructure = new ResponseStructure<List<Expense>>();
		if (!list.isEmpty()) {
			responseStructure.setMessage("Pending Expenses Found");
			responseStructure.setStatus(HttpStatus.FOUND.value());
			responseStructure.setData(list);
			return new ResponseEntity<ResponseStructure<List<Expense>>>(responseStructure, HttpStatus.FOUND);

		} else {
			throw new DataNotFoundException("No Pending Expenses Found");
		}
	}

	public ResponseEntity<ResponseStructure<Expense>> approveExpense(int id) {
		Expense expense = expenseDao.findExpenseById(id);
		ResponseStructure<Expense> structure = new ResponseStructure<Expense>();
		if (expense != null) {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String managerName = authentication.getName();
			expense.setStatus("APPROVED");
			expense.setApprovedBy(managerName);
			structure.setMessage("Expense Approved");
			structure.setStatus(HttpStatus.OK.value());
			structure.setData(expenseDao.submitExpense(expense));
			return new ResponseEntity<ResponseStructure<Expense>>(structure, HttpStatus.OK);
		} else {
			throw new DataNotFoundException("Expense Not Found");
		}
	}

	public ResponseEntity<ResponseStructure<Expense>> rejectExpense(int id) {
		Expense expense = expenseDao.findExpenseById(id);
		ResponseStructure<Expense> structure = new ResponseStructure<Expense>();
		if (expense != null) {
			expense.setStatus("REJECTED");
			structure.setMessage("Expense Rejected");
			structure.setStatus(HttpStatus.OK.value());
			structure.setData(expenseDao.submitExpense(expense));
			return new ResponseEntity<ResponseStructure<Expense>>(structure, HttpStatus.OK);
		} else {
			throw new DataNotFoundException("Expense Not Found");
		}
	}

	public ResponseEntity<ResponseStructure<List<Expense>>> getAllExpenses() {
		ResponseStructure<List<Expense>> structure = new ResponseStructure<List<Expense>>();
		structure.setMessage("All expenses retrieved successfully");
		structure.setStatus(HttpStatus.OK.value());
		structure.setData(expenseDao.getAllExpenses());
		return new ResponseEntity<ResponseStructure<List<Expense>>>(structure, HttpStatus.OK);
	}

	public ResponseEntity<ResponseStructure<Expense>> deleteExpense(int id) {
		Expense expense = expenseDao.findExpenseById(id);
		ResponseStructure<Expense> structure = new ResponseStructure<Expense>();
		if (expense != null) {
			structure.setMessage("Expense Delete Successfully");
			structure.setStatus(HttpStatus.OK.value());
			structure.setData(expenseDao.deleteExpense(expense));
			return new ResponseEntity<ResponseStructure<Expense>>(structure, HttpStatus.OK);
		} else {
			throw new DataNotFoundException("Expense Not Found");
		}

	}

	public ResponseEntity<ResponseStructure<List<Expense>>> getExpensesAboveOneLakh() {
		List<Expense> list = expenseDao.getExpensesAboveOneLakh();
		ResponseStructure<List<Expense>> structure = new ResponseStructure<List<Expense>>();
		if (!list.isEmpty()) {
			structure.setMessage(" expenses retrieved successfully");
			structure.setStatus(HttpStatus.OK.value());
			structure.setData(list);
			return new ResponseEntity<ResponseStructure<List<Expense>>>(structure, HttpStatus.OK);
		} else {
			throw new DataNotFoundException("Expenses not found");
		}
	}
}
