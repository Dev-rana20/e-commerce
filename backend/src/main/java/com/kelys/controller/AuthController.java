package com.kelys.controller;

import com.kelys.dto.request.LoginRequest;
import com.kelys.dto.request.RegisterRequest;
import com.kelys.dto.response.AuthResponse;
import com.kelys.entity.User;
import com.kelys.exception.ResourceNotFoundException;
import com.kelys.exception.UnauthorizedException;
import com.kelys.repository.UserRepository;
import com.kelys.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        return new ResponseEntity<>(authService.register(req), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User not authenticated");
        }
        User user;
        if (authentication.getPrincipal() instanceof User u) {
            user = u;
        } else {
            user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        }
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole() != null ? user.getRole().name() : "CUSTOMER");
        return ResponseEntity.ok(response);
    }
}
