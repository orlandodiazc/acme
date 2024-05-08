package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.invoice.Status;

import java.time.LocalDate;
import java.util.UUID;

public interface InvoiceFilteredDTO {
    UUID getId();

    Integer getAmount();

    LocalDate getProcessingDate();

    Status getStatus();

    String getName();

    String getEmail();

    String getImageUrl();
}
