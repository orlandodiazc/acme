package com.ditod.acme.domain.invoice;

import com.ditod.acme.domain.DateTimeAudit;
import com.ditod.acme.domain.customer.Customer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Entity
public class Invoice extends DateTimeAudit {
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @NotNull
    private long amount;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "ownerId")
    @JsonBackReference
    private Customer customer;

    public Invoice() {
    }

    public Invoice(long amount, Status status, Customer customer) {
        this.amount = amount;
        this.status = status;
        this.customer = customer;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
