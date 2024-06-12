package com.ditod.acme.domain.customer.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public interface CustomerSummaryResponse {
    @NotNull
    UUID getId();

    String getName();
}
