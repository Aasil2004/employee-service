package com.example.payroll.role;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    private final RoleRepository repository;

    public RoleController(RoleRepository repository) {
        this.repository = repository;
    }

    // GET /roles
    @GetMapping
    List<Role> all() {
        return repository.findAll();
    }

    // POST /roles
    @PostMapping
    Role newRole(@RequestBody Role newRole) {
        return repository.save(newRole);
    }

    // GET /roles/{id}
    @GetMapping("/{id}")
    Role one(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RoleNotFoundException(id));
    }

    // PUT /roles/{id}
    @PutMapping("/{id}")
    Role replaceRole(@RequestBody Role newRole, @PathVariable Long id) {
        return repository.findById(id)
            .map(role -> {
                role.setName(newRole.getName());
                return repository.save(role);
            })
            .orElseGet(() -> {
                newRole.setId(id);
                return repository.save(newRole);
            });
    }

    // DELETE /roles/{id}
    @DeleteMapping("/{id}")
    void deleteRole(@PathVariable Long id) {
        repository.deleteById(id);
    }
}