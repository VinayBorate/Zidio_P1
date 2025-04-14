package com.zidio.enterprise_expense_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zidio.enterprise_expense_management_system.dto.Manager;
import com.zidio.enterprise_expense_management_system.service.ManagerService;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/manager")
public class ManagerController {
	@Autowired
	private ManagerService managerService;

	@Operation(summary = "Save Manager", description = "This API saves manager details into the database.")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Manager data saved successfully") })
	@PostMapping("/signup")
	public ResponseEntity<ResponseStructure<Manager>> saveManager(@RequestBody Manager manager) {
		return managerService.saveManager(manager);
	}

	@Operation(summary = "Manager Login", description = "This API is used to login an manager.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Login successful"),
			@ApiResponse(responseCode = "401", description = "Invalid credentials") })
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Manager>> loginManager(@RequestBody Manager manager) {
		String email=manager.getManagerEmail();
		String password=manager.getManagerPassword();
		return managerService.loginManager(email, password);

	}

}
