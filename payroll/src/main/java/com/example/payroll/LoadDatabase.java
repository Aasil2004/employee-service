package com.example.payroll;

import com.example.payroll.role.Role;               
import com.example.payroll.role.RoleRepository;     

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(EmployeeRepository employeeRepository, RoleRepository roleRepository) { 
        
        return args -> {
            
            Role developerRole = roleRepository.save(new Role("developer")); 
            Role testerRole = roleRepository.save(new Role("tester"));
            roleRepository.save(new Role("manager"));
            roleRepository.save(new Role("admin"));
            
            log.info("Preloaded Roles.");

            log.info("Preloading " + employeeRepository.save(new Employee("Bilbo Baggins", "bilbo", "password123", developerRole)));
            log.info("Preloading " + employeeRepository.save(new Employee("Frodo Baggins", "frodo", "password123", testerRole)));
        };
    }
}