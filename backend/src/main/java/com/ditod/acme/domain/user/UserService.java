package com.ditod.acme.domain.user;

import com.ditod.acme.exception.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public <T> T findByEmail(String email, Class<T> type) {
        return userRepository.findByEmail(email, type)
                .orElseThrow(() -> new EntityNotFoundException("email", email));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email, User.class)
                .orElseThrow(() -> new EntityNotFoundException("email", email));
    }
}