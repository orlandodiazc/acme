package com.ditod.acme.domain.role;

import com.ditod.acme.domain.DateTimeAudit;
import com.ditod.acme.domain.permission.Permission;
import com.ditod.acme.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Role extends DateTimeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private List<User> users = new ArrayList<>();

    @NotNull
    @ManyToMany
    @JoinTable(name = "role_permission", joinColumns = @JoinColumn(name = "permission_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Permission> permissions;

    public Role() {
    }

    public Role(String name, List<Permission> permissions) {
        this.name = name;
        this.permissions = permissions;
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public @NotNull List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(
            @NotNull List<Permission> permissions) {
        this.permissions = permissions;
    }
}