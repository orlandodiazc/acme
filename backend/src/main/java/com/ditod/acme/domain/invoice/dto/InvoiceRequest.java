package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.invoice.Status;

import java.util.UUID;

public record InvoiceRequest(UUID customerId, int amount, Status status) {
}
