package com.ditod.acme.domain.invoice.dto;


public interface InvoiceTotalByStatusDTO {
    Integer getPaidInvoicesTotal();

    Integer getPendingInvoicesTotal();
}