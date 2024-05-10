package com.ditod.acme;

import com.ditod.acme.domain.customer.Customer;
import com.ditod.acme.domain.customer.CustomerRepository;
import com.ditod.acme.domain.customer_image.CustomerImage;
import com.ditod.acme.domain.customer_image.CustomerImageRepository;
import com.ditod.acme.domain.invoice.Invoice;
import com.ditod.acme.domain.invoice.InvoiceRepository;
import com.ditod.acme.domain.invoice.Status;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;

    private final CustomerImageRepository customerImageRepository;

    public DataLoader(CustomerRepository customerRepository,
            InvoiceRepository invoiceRepository,
            CustomerImageRepository customerImageRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.customerImageRepository = customerImageRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Customer orlando = new Customer("Orlando Diaz", "orlando@example.com");
        Customer ejemplo = new Customer("Ejemplo Diaz", "ejemplo@example.com");
        CustomerImage orlandoImage = new CustomerImage("test", "PNG", null, orlando);
        Invoice orlandoInvoice = new Invoice(1000, Status.pending, orlando);
        Invoice orlandoInvoice2 = new Invoice(200, Status.paid, orlando);
        Invoice ejemploInvoice = new Invoice(900, Status.pending, ejemplo);
        Invoice ejemploInvoice2 = new Invoice(50, Status.paid, ejemplo);
        customerRepository.saveAll(List.of(orlando, ejemplo));
        customerImageRepository.save(orlandoImage);
        invoiceRepository.saveAll(List.of(orlandoInvoice, orlandoInvoice2, ejemploInvoice, ejemploInvoice2));
    }
}
