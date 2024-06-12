package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.invoice.Status;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.UUID;

public interface InvoiceFilteredPageable {
    @NotNull
    UUID getId();

    @NotNull
    Integer getAmount();

    @NotNull
    Instant getCreatedAt();

    @NotNull
    Status getStatus();

    String getName();
    UUID getImageId();

    @NotNull
    String getEmail();

}
