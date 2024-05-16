package com.ditod.acme.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class ProjectConfig {

    private final ProtectorProperties protectorProperties;

    public ProjectConfig(ProtectorProperties protectorProperties) {
        this.protectorProperties = protectorProperties;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors(c -> {
            c.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of(protectorProperties.corsAllowedOrigin()));
                config.setAllowedMethods(List.of("*"));
                config.setAllowedHeaders(List.of("*"));
                return config;
            });
        });
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.authorizeHttpRequests(c -> c.anyRequest().permitAll());
        return httpSecurity.build();
    }
}
