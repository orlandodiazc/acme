package com.ditod.acme.domain.customer.dto;

import java.util.UUID;

public interface CustomerFilteredDTO {
    UUID getId();

    String getName();

    String getEmail();

    String getImageUrl();

    Integer getInvoicesCount();

    Integer getPaidInvoicesTotal();

    Integer getPendingInvoicesTotal();
}
