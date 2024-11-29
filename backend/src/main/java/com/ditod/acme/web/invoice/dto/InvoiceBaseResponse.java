package com.ditod.acme.web.invoice.dto;

import com.ditod.acme.domain.invoice.Status;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public interface InvoiceBaseResponse {
    @NotNull UUID getCustomerId();

    @NotNull Integer getAmount();

    @NotNull Status getStatus();
}
