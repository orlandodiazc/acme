package com.ditod.acme.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException() {
        super("Entity does not exist");
    }

    public EntityAlreadyExistsException(String entity, String field) {
        super("A " + entity + " already exists with this " + field);
    }

}
