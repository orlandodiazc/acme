package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.invoice.dto.InvoiceFilteredResponse;
import com.ditod.acme.domain.invoice.dto.InvoiceRequest;
import com.ditod.acme.domain.invoice.dto.InvoiceSummaryResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers/{customerId}")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/invoices")
    InvoiceFilteredResponse filteredInvoices(
            @RequestParam(required = false, defaultValue = "") String q,
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        return invoiceService.findFilteredInvoices(q, page);
    }

    @GetMapping("/invoices/latest")
    List<InvoiceSummaryResponse> latestInvoices() {
        return invoiceService.findLatestInvoices();
    }

    @GetMapping("/invoices/{invoiceId}")
    Invoice oneInvoice(@PathVariable UUID invoiceId) {
        return invoiceService.findById(invoiceId);

    }

    @PostMapping("/invoices")
    Invoice newInvoice(@RequestBody InvoiceRequest newInvoice,
            @PathVariable UUID customerId) {
        return invoiceService.saveInvoice(newInvoice, customerId);
    }

    @PutMapping("/invoices/{invoiceId}")
    Invoice putInvoice(@RequestBody InvoiceRequest newInvoice,
            @PathVariable UUID customerId, @PathVariable UUID invoiceId) {
        return invoiceService.updateInvoice(newInvoice, invoiceId, customerId);
    }

    @DeleteMapping("/invoices/{invoiceId}")
    void deleteInvoice(@PathVariable UUID invoiceId) {
        invoiceService.deleteById(invoiceId);
    }

}
