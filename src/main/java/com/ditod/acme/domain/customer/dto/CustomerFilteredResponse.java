package com.ditod.acme.domain.customer.dto;

import com.ditod.acme.domain.customer_image.dto.ImageSummary;

import java.util.UUID;

public interface CustomerFilteredResponse {
    UUID getId();

    String getName();

    String getEmail();

    ImageSummary getImage();

    Integer getInvoicesCount();

    Integer getPaidInvoicesTotal();

    Integer getPendingInvoicesTotal();
}
