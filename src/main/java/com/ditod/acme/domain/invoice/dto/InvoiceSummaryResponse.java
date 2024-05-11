package com.ditod.acme.domain.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public interface InvoiceSummaryResponse {
    UUID getId();

    Integer getAmount();

    @JsonProperty("name")
    String getCustomerName();

    @JsonProperty("email")
    String getCustomerEmail();

    @JsonProperty("imageId")
    UUID getCustomerImageId();
}
