package com.ditod.acme.domain.customer_image;

import com.ditod.acme.domain.DateTimeAudit;
import com.ditod.acme.domain.customer.Customer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Entity
public class CustomerImage extends DateTimeAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String contentType;
    @NotNull
    private byte[] blob;
    @NotNull
    @OneToOne
    @JoinColumn(name = "customerId")
    @JsonBackReference
    private Customer customer;

    public CustomerImage() {
    }

    public CustomerImage(String altText, String contentType, byte[] blob,
            Customer customer) {
        this.contentType = contentType;
        this.blob = blob;
        this.customer = customer;
    }

    public UUID getId() {
        return id;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getBlob() {
        return blob;
    }

    public void setBlob(byte[] blob) {
        this.blob = blob;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}