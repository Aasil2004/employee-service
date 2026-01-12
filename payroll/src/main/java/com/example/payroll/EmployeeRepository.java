package com.example.payroll;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUsernameAndPassword(String username, String password);
}