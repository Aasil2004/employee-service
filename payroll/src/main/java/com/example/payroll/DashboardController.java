package com.example.payroll;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import com.example.payroll.security.EmployeeUserDetails;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    /**
     * Get current user's info from SecurityContextHolder
     */
    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.isAuthenticated()) {
            EmployeeUserDetails userDetails = (EmployeeUserDetails) authentication.getPrincipal();
            Employee employee = userDetails.getEmployee();
            
            return ResponseEntity.ok(new UserInfoResponse(
                employee.getUsername(),
                employee.getName(),
                employee.getRole().getName(),
                authentication.getAuthorities().stream()
                    .map(auth -> auth.getAuthority())
                    .toList()
            ));
        }
        
        return ResponseEntity.status(401).body("Not authenticated");
    }

    /**
     * Get complete user profile
     */
    @GetMapping("/complete-profile")
    public ResponseEntity<?> getCompleteProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null && authentication.isAuthenticated()) {
            EmployeeUserDetails userDetails = (EmployeeUserDetails) authentication.getPrincipal();
            Employee employee = userDetails.getEmployee();
            
            return ResponseEntity.ok(new CompleteProfileResponse(
                employee.getId(),
                employee.getUsername(),
                employee.getName(),
                employee.getRole() != null ? employee.getRole().getId() : null,
                employee.getRole() != null ? employee.getRole().getName() : "UNKNOWN"
            ));
        }
        
        return ResponseEntity.status(401).body("Not authenticated");
    }

    public static class UserInfoResponse {
        private String username;
        private String name;
        private String role;
        private java.util.List<String> authorities;

        public UserInfoResponse(String username, String name, String role, java.util.List<String> authorities) {
            this.username = username;
            this.name = name;
            this.role = role;
            this.authorities = authorities;
        }

        public String getUsername() { return username; }
        public String getName() { return name; }
        public String getRole() { return role; }
        public java.util.List<String> getAuthorities() { return authorities; }
    }

    public static class CompleteProfileResponse {
        private Long id;
        private String username;
        private String name;
        private Long roleId;
        private String roleName;

        public CompleteProfileResponse(Long id, String username, String name, Long roleId, String roleName) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.roleId = roleId;
            this.roleName = roleName;
        }

        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getName() { return name; }
        public Long getRoleId() { return roleId; }
        public String getRoleName() { return roleName; }
    }
}
