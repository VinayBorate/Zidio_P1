package com.zidio.enterprise_expense_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zidio.enterprise_expense_management_system.dao.EmployeeDao;
import com.zidio.enterprise_expense_management_system.dto.Employee;
import com.zidio.enterprise_expense_management_system.exception.EmailNotFoundException;
import com.zidio.enterprise_expense_management_system.exception.IncorrectPasswordException;
import com.zidio.enterprise_expense_management_system.util.JwtUtil;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeDao employeeDao;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public ResponseEntity<ResponseStructure<Employee>> saveEmployee(Employee employee) {
		ResponseStructure<Employee> structure = new ResponseStructure<Employee>();
		employee.setEmployeePassword(passwordEncoder.encode(employee.getEmployeePassword()));
		;
		structure.setMessage("Signup Success");
		structure.setStatus(HttpStatus.CREATED.value());
		structure.setData(employeeDao.saveEmployee(employee));
		return new ResponseEntity<ResponseStructure<Employee>>(structure, HttpStatus.CREATED);
	}

	public ResponseEntity<ResponseStructure<Employee>> loginEmployee(String email, String password) {
		Employee employee = employeeDao.findByEmployeeEmail(email);
		ResponseStructure<Employee> responseStructure = new ResponseStructure<>();
		if (employee != null) {
			if (passwordEncoder.matches(password, employee.getEmployeePassword())) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				String jwtToken = jwtUtil.generateToken(userDetails);
				responseStructure.setMessage("Login Successfully. Use the token for authentication.");
				responseStructure.setStatus(HttpStatus.OK.value());
				responseStructure.setData(employee);
				responseStructure.setToken(jwtToken);
				return ResponseEntity.ok().header("Authorization", "Bearer " + jwtToken).body(responseStructure);
			} else {
				throw new IncorrectPasswordException("Incorrect password");
			}
		} else {
			throw new EmailNotFoundException("Given Employee email is incorrect");
		}

	}
}
