package com.zidio.enterprise_expense_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zidio.enterprise_expense_management_system.dto.Admin;
import com.zidio.enterprise_expense_management_system.service.AdminService;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Operation(summary = "Save Admin", description = "This API saves Admin details into the database.")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Admin data saved successfully") })
	@PostMapping("/signup")
	public ResponseEntity<ResponseStructure<Admin>> saveAdmin(@RequestBody Admin admin) {
		return adminService.saveAdmin(admin);
	}

	@Operation(summary = "Admin Login", description = "This API is used to login an Admin.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Login successful"),
			@ApiResponse(responseCode = "401", description = "Invalid credentials") })
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<Admin>> loginAdmin(@RequestBody Admin admin) {
		String email=admin.getAdminEmail();
		String password=admin.getAdminPassword();
		return adminService.loginAdmin(email, password);
	}
}
