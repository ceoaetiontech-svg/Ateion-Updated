package com.ateion.backend.controller;

import com.ateion.backend.dto.ForgotPasswordRequestDTO;
import com.ateion.backend.dto.ResetPasswordRequestDTO;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.service.EmailService;
import com.ateion.backend.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;
    private final UserRepository userRepository;
    private final Optional<EmailService> emailService;

    @Autowired
    public PasswordResetController(
            PasswordResetService passwordResetService,
            UserRepository userRepository,
            @Lazy Optional<EmailService> emailService
    ) {
        this.passwordResetService = passwordResetService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDTO request
    ) {
        if (!userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.ok(Map.of("message",
                    "If this email exists, a reset link has been sent"));
        }

        try {
            String resetLink = passwordResetService.generateResetToken(request.getEmail());
            emailService.ifPresent(es -> es.sendPasswordResetEmail(request.getEmail(), resetLink));
        } catch (Exception e) {
            // Log but don't reveal whether the email exists
        }

        return ResponseEntity.ok(Map.of("message",
                "If this email exists, a reset link has been sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDTO request
    ) {
        try {
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
