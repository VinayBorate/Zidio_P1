package com.zidio.enterprise_expense_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zidio.enterprise_expense_management_system.dto.Expense;
import com.zidio.enterprise_expense_management_system.dto.ExpenseRequestDTO;
import com.zidio.enterprise_expense_management_system.service.ExpenseService;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

	@Autowired
	private ExpenseService expenseService;

	@Operation(summary = "Submit Expense", description = "Allows employees to submit expenses for approval.")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Expense submitted successfully") })
	@PreAuthorize("hasAnyAuthority('EMPLOYEE')")
	@PostMapping("/submit")
	public ResponseEntity<ResponseStructure<Expense>> submitExpense(@RequestBody ExpenseRequestDTO expenseRequestDTO) {
		return expenseService.submitExpense(expenseRequestDTO);
	}

	@Operation(summary = "View Pending Expenses", description = "Allows managers to view all pending expenses.")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Pending expenses retrieved successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@GetMapping("/pending")
	public ResponseEntity<ResponseStructure<List<Expense>>> viewPendingExpenses() {
		return expenseService.viewPendingExpenses();
	}

	@Operation(summary = "Approve Expense", description = "Allows managers to approve an expense.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Expense approved successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@PutMapping("/approve/{id}")
	public ResponseEntity<ResponseStructure<Expense>> approveExpense(@PathVariable int id) {
		return expenseService.approveExpense(id);
	}

	@Operation(summary = "Reject Expense", description = "Allows managers to reject an expense.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Expense rejected successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@PutMapping("/reject/{id}")
	public ResponseEntity<ResponseStructure<Expense>> rejectExpense(@PathVariable int id) {
		return expenseService.rejectExpense(id);
	}

	@Operation(summary = "Get All Expenses", description = "Allows admins to view all expenses.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "All expenses retrieved successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@GetMapping("/all")
	public ResponseEntity<ResponseStructure<List<Expense>>> getAllExpenses() {
		return expenseService.getAllExpenses();
	}

	@Operation(summary = "Delete Expense", description = "Allows admins to delete an expense by ID.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Expense deleted successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseStructure<Expense>> deleteExpense(@PathVariable int id) {
		return expenseService.deleteExpense(id);
	}

	@Operation(summary = "Get Expenses Above One Lakh", description = "Allows admins to View only Expenses Above One Lakh.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Expenses retrieved successfully") })
	@PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER',)")
	@GetMapping("/aboveonelakh")
	public ResponseEntity<ResponseStructure<List<Expense>>> getExpensesAboveOneLakh() {
		return expenseService.getExpensesAboveOneLakh();

	}

	@Operation(summary = "Get Employee's Own Expenses", description = "Allows an employee to view their submitted expenses.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Expenses retrieved successfully") })
	@PreAuthorize("hasAuthority('EMPLOYEE')")
	@GetMapping("/employee/{submittedBy}")
	public ResponseEntity<ResponseStructure<List<Expense>>> getExpensesBySubmittedBy(@PathVariable String submittedBy) {
		return expenseService.getExpensesBySubmittedBy(submittedBy);
	}

}
