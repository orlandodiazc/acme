package com.ditod.acme.web.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @NotBlank(message = "Email is required") @Email(message = "Email is invalid") @Size(min = 3, max = 100, message = "Email length must be between 3 and 100 characters") String email,

        @NotBlank(message = "Password is required") @Size(min = 6, max = 100, message = "Password length must be between 6 and 100 characters") String password) {
}