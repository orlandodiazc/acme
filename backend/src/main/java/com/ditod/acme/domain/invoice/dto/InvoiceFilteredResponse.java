package com.ditod.acme.domain.invoice.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record InvoiceFilteredResponse(
        @NotNull List<InvoiceFilteredPageable> invoices,
        @NotNull Integer totalPages) {
}
