package com.ditod.acme.domain.invoice;

public enum Status {
    pending("pending"),
    paid("paid");

    private final String text;

    Status(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
