package com.zidio.enterprise_expense_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zidio.enterprise_expense_management_system.dto.Employee;
import com.zidio.enterprise_expense_management_system.service.EmployeeService;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Operation(summary = "Save Employee", description = "This API saves employee details into the database.")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Employee data saved successfully") })
	@PostMapping("/signup")
	public ResponseEntity<ResponseStructure<Employee>> saveEmployee(@RequestBody Employee employee) {
		return employeeService.saveEmployee(employee);
	}

	@Operation(summary = "Employee Login", description = "This API is used to login an employee.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Login successful"),
			@ApiResponse(responseCode = "401", description = "Invalid credentials") })
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Employee>> loginEmployee(@RequestBody Employee employee) {
		String email=employee.getEmployeeEmail();
		String password=employee.getEmployeePassword();
		return employeeService.loginEmployee(email, password);
	}
}
