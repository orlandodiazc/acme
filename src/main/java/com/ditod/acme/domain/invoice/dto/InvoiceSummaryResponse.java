package com.ditod.acme.domain.invoice.dto;

import java.util.UUID;

public interface InvoiceSummaryResponse {
    UUID getId();

    Integer getAmount();

    InvoiceFilteredPageable.CustomerSummary getCustomer();
}
