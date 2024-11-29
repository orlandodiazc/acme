package com.ditod.acme.web.invoice.dto;

import com.ditod.acme.domain.invoice.Status;

import java.util.UUID;

public record InvoiceRequest(UUID customerId, double amount, Status status) {
}
