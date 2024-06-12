package com.ditod.acme.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "protector")
public record ProtectorProperties(String corsAllowedOrigin,
                                  String csrfCookieDomain) {

}