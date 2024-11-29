package com.ditod.acme.web.customer.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public interface CustomerFilteredResponse {
    @NotNull UUID getId();

    String getName();

    @NotNull String getEmail();

    UUID getImageId();

    @NotNull Integer getInvoicesCount();

    @NotNull Integer getPendingTotal();

    @NotNull Integer getPaidTotal();
}
