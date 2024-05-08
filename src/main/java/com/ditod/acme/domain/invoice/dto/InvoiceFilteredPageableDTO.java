package com.ditod.acme.domain.invoice.dto;

import java.util.List;

public record InvoiceFilteredPageableDTO(List<InvoiceFilteredDTO> invoices,
                                         Integer totalPages) {
}
