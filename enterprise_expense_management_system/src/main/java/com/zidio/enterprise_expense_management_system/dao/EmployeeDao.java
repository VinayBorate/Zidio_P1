package com.zidio.enterprise_expense_management_system.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zidio.enterprise_expense_management_system.dto.Employee;
import com.zidio.enterprise_expense_management_system.repo.EmployeeRepo;

@Repository
public class EmployeeDao {
	@Autowired
	private EmployeeRepo employeeRepo;

	public Employee saveEmployee(Employee employee) {
		return employeeRepo.save(employee);
	}

	public Employee findByEmployeeEmail(String email) {
		return employeeRepo.findByEmployeeEmail(email);
	}

}
