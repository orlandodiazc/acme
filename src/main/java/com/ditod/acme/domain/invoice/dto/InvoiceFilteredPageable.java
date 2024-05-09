package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.customer_image.dto.ImageSummary;
import com.ditod.acme.domain.invoice.Status;

import java.time.Instant;
import java.util.UUID;

public interface InvoiceFilteredPageable {
    UUID getId();

    Integer getAmount();

    Instant getCreatedAt();

    Status getStatus();

    CustomerSummary getCustomer();

    interface CustomerSummary {
        String getName();

        ImageSummary getImage();

        String getEmail();
    }
}
