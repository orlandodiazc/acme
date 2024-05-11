package com.ditod.acme.web.overview.dto;

import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;
import com.ditod.acme.domain.revenue.Revenue;

import java.util.List;

public record OverviewResponse(Long invoiceCount, Long customerCount,
                               Integer totalPaidInvoices,
                               Integer totalPendingInvoices,
                               List<Revenue> revenues,
                               List<InvoiceSummaryResponse> latestInvoices) {
}