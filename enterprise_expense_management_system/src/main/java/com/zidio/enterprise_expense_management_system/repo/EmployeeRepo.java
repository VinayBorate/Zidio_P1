package com.zidio.enterprise_expense_management_system.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zidio.enterprise_expense_management_system.dto.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

	Employee findByEmployeeEmail(String email);
}
