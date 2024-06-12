package com.ditod.acme.domain.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public interface InvoiceSummaryResponse {
    @NotNull
    UUID getId();

    @NotNull
    Integer getAmount();

    @JsonProperty("name")
    String getCustomerName();

    @NotNull
    @JsonProperty("email")
    String getCustomerEmail();

    @JsonProperty("imageId")
    UUID getCustomerImageId();
}
