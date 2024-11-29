package com.ditod.acme.domain.permission;

import com.ditod.acme.domain.DateTimeAudit;
import com.ditod.acme.domain.role.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
public class Permission extends DateTimeAudit implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NotNull
    private String name;

    @ManyToMany(mappedBy = "permissions")
    private List<Role> roles;

    public Permission() {
    }

    public Permission(String name) {
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String getAuthority() {
        return name;
    }
}