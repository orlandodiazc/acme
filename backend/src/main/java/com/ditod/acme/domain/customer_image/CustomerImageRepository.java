package com.ditod.acme.domain.customer_image;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerImageRepository extends JpaRepository<CustomerImage, UUID> {
}
