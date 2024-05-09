package com.ditod.acme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AcmeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcmeApplication.class, args);
    }

}
