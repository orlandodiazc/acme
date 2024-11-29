package com.ditod.acme.exception;

import java.util.UUID;

public class InvoiceNotFoundException extends RuntimeException {
    public InvoiceNotFoundException(UUID id) {
        super("Could not find employee " + id);
    }
}
