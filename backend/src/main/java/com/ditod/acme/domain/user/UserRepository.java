package com.ditod.acme.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    <T> Optional<T> findByEmail(String email, Class<T> type);
}

