package com.ditod.acme.web.auth;

import com.ditod.acme.domain.user.UserRepository;
import com.ditod.acme.domain.user.UserService;
import com.ditod.acme.domain.user.dto.AuthUserDto;
import com.ditod.acme.web.auth.dto.AuthUserResponse;
import com.ditod.acme.web.auth.dto.LoginRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@Tag(name = "authentication", description = "Operations about authenticating")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final UserRepository userRepository;


    public AuthController(AuthService authService, UserService userService,
            UserRepository userRepository) {
        this.authService = authService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/user")
    ResponseEntity<AuthUserResponse> getAuthUser(Authentication auth,
            HttpServletResponse response) {
        if (auth == null || !auth.isAuthenticated())
            return ResponseEntity.ok(new AuthUserResponse(null));
        Optional<AuthUserDto> user = userRepository.findByEmail(auth.getName(), AuthUserDto.class);
        return user.map(authUserDto -> ResponseEntity.ok(new AuthUserResponse(authUserDto)))
                .orElseGet(() -> ResponseEntity.ok(new AuthUserResponse(null)));
    }

    @PostMapping("/login")
    private ResponseEntity<AuthUserResponse> login(
            @ModelAttribute LoginRequest userRequest,
            HttpServletRequest request,
            HttpServletResponse response) {
        authService.authenticate(userRequest, request, response);
        return ResponseEntity.ok(new AuthUserResponse(userService.findByEmail(userRequest.email(), AuthUserDto.class)));
    }

    @PostMapping("/logout")
    private ResponseEntity<Void> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseEntity.ok().build();
    }
}