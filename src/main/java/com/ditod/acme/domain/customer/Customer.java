package com.ditod.acme.domain.customer;

import com.ditod.acme.domain.invoice.Invoice;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String email;

    private String imageUrl;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    private List<Invoice> invoices;

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }
}
