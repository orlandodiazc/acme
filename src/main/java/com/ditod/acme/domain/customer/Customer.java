package com.ditod.acme.domain.customer;

import com.ditod.acme.domain.DateTimeAudit;
import com.ditod.acme.domain.customer_image.CustomerImage;
import com.ditod.acme.domain.invoice.Invoice;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Customer extends DateTimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    @JsonManagedReference
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private CustomerImage image;

    public Customer() {
    }

    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }

    public CustomerImage getImage() {
        return image;
    }

    public void setImage(CustomerImage image) {
        this.image = image;
    }
}
