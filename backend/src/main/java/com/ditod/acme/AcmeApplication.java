package com.ditod.acme;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@OpenAPIDefinition(info = @Info(title = "Acme Dashboard", description = "REST like web application to keep track of customer invoices.", contact = @Contact(name = "Orlando Diaz", email = "orlandodiazconde@gmail.com"), version = "1"))
public class AcmeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcmeApplication.class, args);
    }

}
