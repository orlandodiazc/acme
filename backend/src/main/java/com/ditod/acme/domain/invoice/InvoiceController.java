package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.invoice.dto.InvoiceBaseResponse;
import com.ditod.acme.domain.invoice.dto.InvoiceFilteredResponse;
import com.ditod.acme.domain.invoice.dto.InvoiceRequest;
import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/invoices")
@Tag(name = "invoice", description = "Access to customer invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping()
    InvoiceFilteredResponse filteredInvoices(
            @RequestParam(required = false, defaultValue = "") String searchQuery,
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        return invoiceService.findFilteredInvoices(searchQuery, page);
    }

    @GetMapping("/latest")
    List<InvoiceSummaryResponse> latestInvoices() {
        return invoiceService.findLatestInvoices();
    }

    @GetMapping("/{invoiceId}")
    InvoiceBaseResponse oneInvoice(@PathVariable UUID invoiceId) {
        return invoiceService.findById(invoiceId);
    }

    @PostMapping()
    Invoice newInvoice(@ModelAttribute InvoiceRequest newInvoice) {
        return invoiceService.saveInvoice(newInvoice);
    }

    @PutMapping("/{invoiceId}")
    Invoice putInvoice(@ModelAttribute InvoiceRequest newInvoice,
            @PathVariable UUID invoiceId) {
        return invoiceService.updateInvoice(newInvoice, invoiceId);
    }

    @DeleteMapping("/{invoiceId}")
    void deleteInvoice(@PathVariable UUID invoiceId) {
        invoiceService.deleteById(invoiceId);
    }

}
