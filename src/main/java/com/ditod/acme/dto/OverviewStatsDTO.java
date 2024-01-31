package com.ditod.acme.dto;

import com.ditod.acme.model.Revenue;

import java.util.List;

public record OverviewStatsDTO(
        Long invoiceCount,
        Long customerCount,
        Integer totalPaidInvoices,
        Integer totalPendingInvoices,
        List<Revenue> revenues,
        List<InvoiceDetailsDTO> latestInvoices) {
}