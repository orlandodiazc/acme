package com.ditod.acme.web.overview;

import com.ditod.acme.domain.customer.CustomerRepository;
import com.ditod.acme.domain.invoice.InvoiceService;
import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;
import com.ditod.acme.domain.invoice.dto.InvoiceTotalByStatus;
import com.ditod.acme.domain.revenue.Revenue;
import com.ditod.acme.domain.revenue.RevenueRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OverviewService {
    private final InvoiceService invoiceService;
    private final CustomerRepository customerRepository;
    private final RevenueRepository revenueRepository;

    public OverviewService(InvoiceService invoiceService,
            CustomerRepository customerRepository,
            RevenueRepository revenueRepository) {
        this.invoiceService = invoiceService;
        this.customerRepository = customerRepository;
        this.revenueRepository = revenueRepository;
    }

    public OverviewDTO findOverview() {
        Long invoiceCount = invoiceService.countInvoices();
        Long customerCount = customerRepository.count();
        InvoiceTotalByStatus invoiceTotalByStatus = invoiceService.findInvoiceTotalByStatus();
        List<InvoiceSummaryResponse> latestInvoices = invoiceService.findLatestInvoices();
        List<Revenue> revenues = revenueRepository.findAll();

        return new OverviewDTO(invoiceCount, customerCount, invoiceTotalByStatus.getPaidInvoicesTotal(), invoiceTotalByStatus.getPendingInvoicesTotal(), revenues, latestInvoices);
    }
}
