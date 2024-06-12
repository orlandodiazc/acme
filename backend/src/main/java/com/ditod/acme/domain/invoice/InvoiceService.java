package com.ditod.acme.domain.invoice;


import com.ditod.acme.domain.customer.Customer;
import com.ditod.acme.domain.customer.CustomerService;
import com.ditod.acme.domain.exception.EntityNotFoundException;
import com.ditod.acme.domain.invoice.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    private final CustomerService customerService;

    public InvoiceService(InvoiceRepository invoiceRepository,
            CustomerService customerService) {
        this.invoiceRepository = invoiceRepository;
        this.customerService = customerService;
    }

    public List<InvoiceSummaryResponse> findLatestInvoices() {
        return invoiceRepository.findTop5ByOrderByCreatedAtDesc();
    }

    public InvoiceFilteredResponse findFilteredInvoices(String searchQuery,
            Integer currentPage) {
        Pageable pageable;
        if (currentPage < 1) {
            pageable = PageRequest.of(0, 6);
        } else {
            pageable = PageRequest.of(currentPage - 1, 6);
        }
        Page<InvoiceFilteredPageable> invoicePage = invoiceRepository.findFilteredInvoices(searchQuery, pageable);
        return new InvoiceFilteredResponse(invoicePage.getContent(), invoicePage.getTotalPages());
    }

    public InvoiceBaseResponse findById(UUID id) {
        return invoiceRepository.findById(id, InvoiceBaseResponse.class)
                .orElseThrow(() -> new EntityNotFoundException("invoice", id));
    }

    public InvoiceTotalByStatus findInvoiceTotalByStatus() {
        return invoiceRepository.findInvoiceTotalByStatus();
    }

    public Long countInvoices() {
        return invoiceRepository.count();
    }

    public Invoice saveInvoice(InvoiceRequest newInvoice) {
        Customer owner = customerService.findById(newInvoice.customerId());
        long amountInCents = (long) newInvoice.amount() * 100;
        return invoiceRepository.save(new Invoice(amountInCents, newInvoice.status(), owner));
    }

    public void deleteById(UUID id) {
        invoiceRepository.deleteById(id);
    }

    public Invoice updateInvoice(InvoiceRequest newInvoice, UUID invoiceId) {
        Customer owner = customerService.findById(newInvoice.customerId());
        long amountInCents = (long) newInvoice.amount() * 100;
        return invoiceRepository.findById(invoiceId)
                .map(invoice -> {
                    invoice.setAmount(amountInCents);
                    invoice.setStatus(newInvoice.status());
                    return invoiceRepository.save(invoice);
                })
                .orElseGet(() -> invoiceRepository.save(new Invoice(amountInCents, newInvoice.status(), owner)));
    }
}
