package com.ditod.acme.domain.invoice.dto;

import com.ditod.acme.domain.invoice.Status;

public record InvoiceRequest(int amount, Status status) {
}
