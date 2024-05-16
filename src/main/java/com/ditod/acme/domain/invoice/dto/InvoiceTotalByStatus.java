package com.ditod.acme.domain.invoice.dto;


import jakarta.validation.constraints.NotNull;

public interface InvoiceTotalByStatus {
    @NotNull
    Integer getPaidInvoicesTotal();

    @NotNull
    Integer getPendingInvoicesTotal();
}