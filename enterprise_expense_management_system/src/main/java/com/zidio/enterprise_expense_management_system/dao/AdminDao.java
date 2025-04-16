package com.zidio.enterprise_expense_management_system.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zidio.enterprise_expense_management_system.dto.Admin;
import com.zidio.enterprise_expense_management_system.repo.AdminRepo;

@Repository
public class AdminDao {
	@Autowired
	private AdminRepo adminRepo;

	public Admin saveAdmin(Admin admin) {
		return adminRepo.save(admin);

	}

	public Admin findByAdminEmail(String email) {
		return adminRepo.findByAdminEmail(email);
	}
}
