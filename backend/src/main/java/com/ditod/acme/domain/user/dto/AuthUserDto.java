package com.ditod.acme.domain.user.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public interface AuthUserDto {
    @NotNull UUID getId();

    @NotNull String getEmail();

    List<RoleSummary> getRoles();

    interface RoleSummary {
        String getName();

        List<PermissionSummary> getPermissions();

        interface PermissionSummary {
            String getAuthority();
        }
    }
}