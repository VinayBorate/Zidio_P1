package com.zidio.enterprise_expense_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zidio.enterprise_expense_management_system.dao.AdminDao;
import com.zidio.enterprise_expense_management_system.dto.Admin;
import com.zidio.enterprise_expense_management_system.exception.EmailNotFoundException;
import com.zidio.enterprise_expense_management_system.exception.IncorrectPasswordException;
import com.zidio.enterprise_expense_management_system.util.JwtUtil;
import com.zidio.enterprise_expense_management_system.util.ResponseStructure;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public ResponseEntity<ResponseStructure<Admin>> saveAdmin(Admin admin) {
		ResponseStructure<Admin> structure = new ResponseStructure<Admin>();
		admin.setAdminPassword(passwordEncoder.encode(admin.getAdminPassword()));
		structure.setMessage("Signup Success");
		structure.setStatus(HttpStatus.CREATED.value());
		structure.setData(adminDao.saveAdmin(admin));
		return new ResponseEntity<ResponseStructure<Admin>>(structure, HttpStatus.CREATED);

	}

	public ResponseEntity<ResponseStructure<Admin>> loginAdmin(String email, String password) {
		Admin admin = adminDao.findByAdminEmail(email);
		ResponseStructure<Admin> responseStructure = new ResponseStructure<>();
		if (admin != null) {
			if (passwordEncoder.matches(password, admin.getAdminPassword())) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(email);
				String jwtToken = jwtUtil.generateToken(userDetails);
				responseStructure.setMessage("Login Successfully. Use the token for authentication.");
				responseStructure.setStatus(HttpStatus.OK.value());
				responseStructure.setData(admin);
				responseStructure.setToken(jwtToken);
				return ResponseEntity.ok().header("Authorization", "Bearer " + jwtToken).body(responseStructure);
			} else {
				throw new IncorrectPasswordException("Incorrect password");
			}
		} else {
			throw new EmailNotFoundException("Given admin email is incorrect");
		}
	}
}
