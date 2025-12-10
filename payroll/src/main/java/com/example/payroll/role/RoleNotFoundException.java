package com.example.payroll.role;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RoleNotFoundException extends RuntimeException { 
    
    public RoleNotFoundException(Long id) {
        super("Could not find role " + id);
    }
}