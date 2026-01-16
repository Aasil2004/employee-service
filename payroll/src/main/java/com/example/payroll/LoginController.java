package com.example.payroll;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.payroll.security.EmployeeUserDetails;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate using AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            // Set authentication in SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get authenticated user details
            EmployeeUserDetails userDetails = (EmployeeUserDetails) authentication.getPrincipal();
            Employee employee = userDetails.getEmployee();

            return ResponseEntity.ok(new LoginResponse(true, "Login successful", employee));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(false, "Invalid username or password", null));
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser() {
        try {
            // Get current authentication from SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication != null && authentication.isAuthenticated()) {
                EmployeeUserDetails userDetails = (EmployeeUserDetails) authentication.getPrincipal();
                Employee employee = userDetails.getEmployee();
                
                CurrentUserResponse response = new CurrentUserResponse(
                    employee.getId(),
                    employee.getUsername(),
                    employee.getName(),
                    employee.getRole() != null ? employee.getRole().getName() : "UNKNOWN",
                    authentication.getAuthorities().stream()
                        .map(auth -> auth.getAuthority())
                        .toList()
                );
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "No user logged in", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new LoginResponse(false, "Error retrieving user: " + e.getMessage(), null));
        }
    }

    // DTO classes
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class LoginResponse {
        private boolean success;
        private String message;
        private Employee employee;

        public LoginResponse() {}

        public LoginResponse(boolean success, String message, Employee employee) {
            this.success = success;
            this.message = message;
            this.employee = employee;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Employee getEmployee() {
            return employee;
        }

        public void setEmployee(Employee employee) {
            this.employee = employee;
        }
    }

    public static class CurrentUserResponse {
        private Long id;
        private String username;
        private String name;
        private String role;
        private java.util.List<String> authorities;

        public CurrentUserResponse() {}

        public CurrentUserResponse(Long id, String username, String name, String role, java.util.List<String> authorities) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.role = role;
            this.authorities = authorities;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        
        public java.util.List<String> getAuthorities() { return authorities; }
        public void setAuthorities(java.util.List<String> authorities) { this.authorities = authorities; }
    }
}