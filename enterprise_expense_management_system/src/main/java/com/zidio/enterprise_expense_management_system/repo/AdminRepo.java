package com.zidio.enterprise_expense_management_system.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zidio.enterprise_expense_management_system.dto.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
	Admin findByAdminEmail(String email);

}
