package com.zidio.enterprise_expense_management_system.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zidio.enterprise_expense_management_system.dto.Manager;

public interface ManagerRepo extends JpaRepository<Manager, Integer> {
	Manager findByManagerEmail(String email);

}
