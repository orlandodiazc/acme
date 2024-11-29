package com.ditod.acme.exception;

import java.util.UUID;

public class EntityDoesNotExistException extends RuntimeException {
    public EntityDoesNotExistException() {
        super("Not Found");
    }

    public EntityDoesNotExistException(String entity, String description) {
        super("No " + entity + " with the name " + description + " exists");
    }

    public EntityDoesNotExistException(String entity, UUID id) {
        super("No " + entity + " with the id " + id + " exists");
    }
}
