package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.invoice.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvoiceService {
    private final InvoiceRepository repository;

    public InvoiceService(InvoiceRepository repository) {
        this.repository = repository;
    }

    public List<InvoiceDetailsDTO> findLatestInvoices() {
        Pageable pageable = PageRequest.of(0, 5);
        return repository.findLatestInvoices(pageable);
    }

    public InvoiceFilteredPageableDTO findFilteredInvoices(@RequestParam String query,
                                                           @RequestParam Integer currentPage) {
        Pageable pageable;
        if (currentPage < 1) {
            pageable = PageRequest.of(0, 6);
        } else {
            pageable = PageRequest.of(currentPage - 1, 6);
        }
        Page<InvoiceFilteredDTO> result = repository.findFilteredInvoices(query,
                pageable);
        return new InvoiceFilteredPageableDTO(result.getContent(),
                result.getTotalPages());
    }

    public Optional<Invoice> findInvoiceById(UUID id) {
        return repository.findById(id);
    }

    public InvoiceTotalByStatusDTO findInvoiceTotalByStatus() {
        return repository.findInvoiceTotalByStatus();
    }

    public Long countInvoices() {
        return repository.count();
    }

    public Invoice saveInvoice(RequestInvoiceDTO newInvoice) {
        Invoice invoice = new Invoice(newInvoice.customerId(), newInvoice.amount(),
                newInvoice.status());
        return repository.save(invoice);
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }

    public Invoice updateInvoice(RequestInvoiceDTO newInvoice, UUID id) {
        return repository.findById(id)
                         .map(invoice -> {
                             invoice.setCustomerId(newInvoice.customerId());
                             invoice.setAmount(newInvoice.amount());
                             invoice.setStatus(newInvoice.status());
                             return repository.save(invoice);
                         })
                         .orElseGet(() -> this.saveInvoice(newInvoice));
    }
}
