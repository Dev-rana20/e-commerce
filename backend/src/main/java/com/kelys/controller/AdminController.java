package com.kelys.controller;

import com.kelys.dto.response.DashboardStats;
import com.kelys.dto.response.UserResponse;
import com.kelys.repository.UserRepository;
import com.kelys.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(u -> UserResponse.builder()
                        .id(u.getId())
                        .firstName(u.getFirstName())
                        .lastName(u.getLastName())
                        .email(u.getEmail())
                        .role(u.getRole().name())
                        .createdAt(u.getCreatedAt())
                        .build())
                .toList();
        return ResponseEntity.ok(users);
    }
}
