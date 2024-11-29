package com.ditod.acme.web;

import com.ditod.acme.domain.customer_image.CustomerImage;
import com.ditod.acme.domain.customer_image.CustomerImageRepository;
import com.ditod.acme.exception.EntityDoesNotExistException;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.UUID;

@RestController
@RequestMapping("/customer-image")
@Tag(name = "customer image", description = "Access customer avatar images")
public class CustomerImageController {
    private final CustomerImageRepository userImageRepository;

    public CustomerImageController(
            CustomerImageRepository userImageRepository) {
        this.userImageRepository = userImageRepository;
    }

    @GetMapping("/{imageId}")
    ResponseEntity<?> oneCustomerImage(@PathVariable UUID imageId) {
        CustomerImage customerImage = userImageRepository.findById(imageId)
                                                         .orElseThrow(
                                                                 () -> new EntityDoesNotExistException(
                                                                         "customer image",
                                                                         imageId));
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.parseMediaType(customerImage.getContentType()));
        responseHeaders.setContentLength(customerImage.getBlob().length);
        responseHeaders.setContentDisposition(ContentDisposition.builder("inline")
                                                                .filename(imageId.toString())
                                                                .build());
        responseHeaders.setCacheControl(CacheControl.maxAge(Duration.ofDays(365))
                                                    .cachePublic()
                                                    .immutable());

        return ResponseEntity.ok()
                             .headers(responseHeaders)
                             .body(customerImage.getBlob());
    }
}



