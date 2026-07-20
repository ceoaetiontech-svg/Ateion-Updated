package com.ateion.backend.controller;

import com.ateion.backend.dto.LoginRequestDTO;
import com.ateion.backend.dto.SignUpRequestDTO;
import com.ateion.backend.entity.User;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.BadCredentialsException;

import java.time.LocalDateTime;


import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email is already registered!");
        }

        User newUser = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .ageSegment(signUpRequest.getAgeSegment())
                .build();

        userRepository.save(newUser);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully!");
    }

   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 1. Google OAuth Users Check
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "error", "OAuth User",
                    "message", "This account was created using Google. Please click 'Sign in with Google' to continue."
                ));
            }

            // 2. Check If Account is Locked
            if (user.getLockTime() != null) {
                if (user.getLockTime().isAfter(LocalDateTime.now())) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "error", "Account Locked",
                        "message", "Too many failed attempts. Please try again in 15 minutes."
                    ));
                } else {
                    // Lock time expired, unlock account
                    user.setFailedLoginAttempts(0);
                    user.setLockTime(null);
                    userRepository.save(user);
                }
            }

            // 3. Directly verify password bypassing the Spring AOP loop!
            try {
                if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                    throw new BadCredentialsException("Invalid password");
                }

                // ✅ Login Success! (Reset attempts)
                user.setFailedLoginAttempts(0);
                user.setLockTime(null);
                userRepository.save(user);

                // Generate JWT
                String token = jwtUtil.generateToken(user);
                return ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "token", token,
                        "user", user
                ));

            } catch (BadCredentialsException e) {
                // ❌ Login Failed (Wrong Password!)
                int newAttempts = user.getFailedLoginAttempts() + 1;
                user.setFailedLoginAttempts(newAttempts);

                // Lock for 15 mins if 4 or more attempts
                if (newAttempts >= 4) {
                    user.setLockTime(LocalDateTime.now().plusMinutes(15));
                    userRepository.save(user);
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "error", "Account Locked",
                        "message", "You have entered the wrong password 4 times. Account locked for 15 minutes."
                    ));
                }

                userRepository.save(user);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", "Unauthorized",
                    "message", "Invalid email or password. Attempts remaining: " + (4 - newAttempts)
                ));
            }
        }

        // Email not found in database
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
            "error", "Unauthorized",
            "message", "Invalid email or password"
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }

        User user = userRepository.findByEmail(authentication.getName())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in database");
        }

        Map<String, Object> userData = new LinkedHashMap<>();
        userData.put("id", user.getId());
        userData.put("fullName", user.getFullName());
        userData.put("email", user.getEmail());
        userData.put("ageSegment", user.getAgeSegment());
        userData.put("isPremium", Boolean.TRUE.equals(user.getIsPremium()));
        userData.put("role", user.getRole());

        return ResponseEntity.ok(userData);
    }
}
