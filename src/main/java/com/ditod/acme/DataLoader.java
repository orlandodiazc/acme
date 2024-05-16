package com.ditod.acme;

import com.ditod.acme.domain.customer.Customer;
import com.ditod.acme.domain.customer.CustomerRepository;
import com.ditod.acme.domain.customer_image.CustomerImageRepository;
import com.ditod.acme.domain.invoice.Invoice;
import com.ditod.acme.domain.invoice.InvoiceRepository;
import com.ditod.acme.domain.invoice.Status;
import com.ditod.acme.domain.revenue.Revenue;
import com.ditod.acme.domain.revenue.RevenueRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;

    private final CustomerImageRepository customerImageRepository;

    private final RevenueRepository revenueRepository;

    public DataLoader(CustomerRepository customerRepository,
            InvoiceRepository invoiceRepository,
            CustomerImageRepository customerImageRepository,
            RevenueRepository revenueRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.customerImageRepository = customerImageRepository;
        this.revenueRepository = revenueRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Customer orlando = new Customer("Orlando Diaz", "orlando@example.com");
        Customer ejemplo = new Customer("Ejemplo Diaz", "ejemplo@example.com");
        Invoice orlandoInvoice = new Invoice(1000, Status.pending, orlando);
        Invoice orlandoInvoice2 = new Invoice(200, Status.paid, orlando);
        Invoice ejemploInvoice = new Invoice(900, Status.pending, ejemplo);
        Invoice ejemploInvoice2 = new Invoice(50, Status.paid, ejemplo);

        revenueRepository.saveAll(List.of(new Revenue("Jan", 2000), new Revenue("Feb", 1800), new Revenue("Mar", 2200), new Revenue("Apr", 2500), new Revenue("May", 2300), new Revenue("Jun", 3200), new Revenue("Jul", 3500), new Revenue("Aug", 3700), new Revenue("Sep", 2500), new Revenue("Oct", 2800), new Revenue("Nov", 3000), new Revenue("Dec", 4800)));
        customerRepository.saveAll(List.of(orlando, ejemplo));
        invoiceRepository.saveAll(List.of(orlandoInvoice, orlandoInvoice2, ejemploInvoice, ejemploInvoice2));
    }
}
