package com.zidio.enterprise_expense_management_system.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zidio.enterprise_expense_management_system.dto.Manager;
import com.zidio.enterprise_expense_management_system.repo.ManagerRepo;

@Repository
public class ManagerDao {
	@Autowired
	private ManagerRepo repo;
	
	public Manager saveManager(Manager manager) {
		return repo.save(manager);
	}
	
	public Manager findByManagerEmail(String email) {
		return repo.findByManagerEmail(email);
	}

}
