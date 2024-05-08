package com.ditod.acme.domain.invoice.dto;

import java.util.UUID;

public interface InvoiceDetailsDTO {
    UUID getId();

    Integer getAmount();

    String getName();

    String getImageUrl();

    String getEmail();
}
