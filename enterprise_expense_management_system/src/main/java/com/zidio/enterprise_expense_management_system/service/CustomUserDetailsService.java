package com.zidio.enterprise_expense_management_system.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zidio.enterprise_expense_management_system.dto.Admin;
import com.zidio.enterprise_expense_management_system.dto.Employee;
import com.zidio.enterprise_expense_management_system.dto.Manager;
import com.zidio.enterprise_expense_management_system.repo.AdminRepo;
import com.zidio.enterprise_expense_management_system.repo.EmployeeRepo;
import com.zidio.enterprise_expense_management_system.repo.ManagerRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepo adminRepo;
    private final ManagerRepo managerRepo;
    private final EmployeeRepo employeeRepo;

    public CustomUserDetailsService(AdminRepo adminRepo, ManagerRepo managerRepo, EmployeeRepo employeeRepo) {
        this.adminRepo = adminRepo;
        this.managerRepo = managerRepo;
        this.employeeRepo = employeeRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> admin = Optional.ofNullable(adminRepo.findByAdminEmail(username));
        if (admin.isPresent()) {
            return new User(admin.get().getAdminEmail(), admin.get().getAdminPassword(), getAuthorities("ADMIN"));
        }

        Optional<Manager> manager = Optional.ofNullable(managerRepo.findByManagerEmail(username));
        if (manager.isPresent()) {
            return new User(manager.get().getManagerEmail(), manager.get().getManagerPassword(), getAuthorities("MANAGER"));
        }

        Optional<Employee> employee = Optional.ofNullable(employeeRepo.findByEmployeeEmail(username));
        if (employee.isPresent()) {
            return new User(employee.get().getEmployeeEmail(), employee.get().getEmployeePassword(), getAuthorities("EMPLOYEE"));
        }

        throw new UsernameNotFoundException("User not found with email: " + username);
    }

    private Collection<SimpleGrantedAuthority> getAuthorities(String role) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
