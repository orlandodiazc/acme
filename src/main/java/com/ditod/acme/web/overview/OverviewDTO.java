package com.ditod.acme.web.overview;

import com.ditod.acme.domain.invoice.dto.InvoiceDetailsDTO;
import com.ditod.acme.domain.revenue.Revenue;

import java.util.List;

public record OverviewDTO(Long invoiceCount, Long customerCount,
                          Integer totalPaidInvoices,
                          Integer totalPendingInvoices, List<Revenue> revenues,
                          List<InvoiceDetailsDTO> latestInvoices) {
}