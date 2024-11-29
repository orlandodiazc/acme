package com.ditod.acme.security;

import com.ditod.acme.exception.EntityDoesNotExistException;
import com.ditod.acme.domain.user.AuthUser;
import com.ditod.acme.domain.user.User;
import com.ditod.acme.domain.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email, User.class)
                             .map(AuthUser::new)
                             .orElseThrow(() -> new EntityDoesNotExistException("email", email));
    }
}