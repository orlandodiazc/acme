package com.ditod.acme.domain.invoice.dto;


public interface InvoiceTotalByStatus {
    Integer getPaidInvoicesTotal();

    Integer getPendingInvoicesTotal();
}