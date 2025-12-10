package com.example.payroll.role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Role {

    private @Id @GeneratedValue Long id;
    private String name; // e.g., "developer", "tester"

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    // --- Getters and Setters ---
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    // --- toString, equals, hashCode ---
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return Objects.equals(this.id, role.id) && Objects.equals(this.name, role.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name);
    }

    @Override
    public String toString() {
        return "Role{" + "id=" + this.id + ", name='" + this.name + '\'' + '}';
    }
}