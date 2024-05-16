package com.ditod.acme.web.overview.dto;

import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;
import com.ditod.acme.domain.revenue.Revenue;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OverviewResponse(@NotNull Long invoiceCount,
                               @NotNull Long customerCount,
                               @NotNull Integer totalPaidInvoices,
                               @NotNull Integer totalPendingInvoices,
                               @NotNull List<Revenue> revenues,
                               @NotNull List<InvoiceSummaryResponse> latestInvoices) {
}