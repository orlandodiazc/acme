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
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        return invoiceService.findFilteredInvoices(query, page);
    }

    @GetMapping("/invoices/latest")
    List<InvoiceSummaryResponse> latestInvoices() {
        return invoiceService.findLatestInvoices();
    }

    @GetMapping("/invoices/{id}")
    Invoice oneInvoice(@PathVariable UUID id) {
        return invoiceService.findById(id);

    }

    @PostMapping("/invoices")
    Invoice newInvoice(@RequestBody InvoiceRequest newInvoice,
            @RequestParam UUID customerId) {
        return invoiceService.saveInvoice(newInvoice, customerId);
    }

    @PutMapping("/invoices/{id}")
    Invoice putInvoice(@RequestBody InvoiceRequest newInvoice,
            @PathVariable UUID ownerId, @PathVariable UUID invoiceId) {
        return invoiceService.updateInvoice(newInvoice, invoiceId, ownerId);
    }

    @DeleteMapping("/invoices/{id}")
    void deleteInvoice(@PathVariable UUID id) {
        invoiceService.deleteById(id);
    }

}
