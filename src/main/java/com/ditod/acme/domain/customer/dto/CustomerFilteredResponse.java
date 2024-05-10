package com.ditod.acme.domain.customer.dto;

import java.util.UUID;

public interface CustomerFilteredResponse {
    UUID getId();

    String getName();

    String getEmail();

    UUID getImageId();

    Integer getInvoicesCount();

    Long getPendingTotal();

    Long getPaidTotal();

}
