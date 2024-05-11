package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.invoice.Status;

import java.time.Instant;
import java.util.UUID;

public interface InvoiceFilteredPageable {
    UUID getId();

    Integer getAmount();

    Instant getCreatedAt();

    Status getStatus();

    String getName();

    UUID getImageId();

    String getEmail();

}
