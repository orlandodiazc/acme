package com.ditod.acme.web.invoice.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record InvoiceFilteredResponse(
        @NotNull List<InvoiceFilteredPageable> invoices,
        @NotNull Integer totalPages) {
}
