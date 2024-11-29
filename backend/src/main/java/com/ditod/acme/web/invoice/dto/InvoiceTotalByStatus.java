package com.ditod.acme.web.invoice.dto;


import jakarta.validation.constraints.NotNull;

public interface InvoiceTotalByStatus {
    @NotNull
    Integer getPaidInvoicesTotal();

    @NotNull
    Integer getPendingInvoicesTotal();
}