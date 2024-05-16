package com.ditod.acme;

import com.ditod.acme.config.ProtectorProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties({ProtectorProperties.class})
public class AcmeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcmeApplication.class, args);
    }

}
