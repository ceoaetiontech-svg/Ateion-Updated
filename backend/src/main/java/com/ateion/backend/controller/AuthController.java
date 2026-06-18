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
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isEmpty()
                || !passwordEncoder.matches(loginRequest.getPassword(), optionalUser.get().getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Error: Invalid email or password!");
        }

        User user = optionalUser.get();
        String token = jwtUtil.generateToken(user);

        Map<String, Object> userData = new LinkedHashMap<>();
        userData.put("fullName", user.getFullName());
        userData.put("email", user.getEmail());
        userData.put("ageSegment", user.getAgeSegment());
        userData.put("isPremium", Boolean.TRUE.equals(user.getIsPremium()));
        userData.put("token", token);

        return ResponseEntity.ok(userData);
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
