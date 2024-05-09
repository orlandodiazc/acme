package com.ditod.acme.domain.invoice.dto;

import java.util.List;

public record InvoiceFilteredResponse(List<InvoiceFilteredPageable> invoices,
                                      Integer totalPages) {
}
