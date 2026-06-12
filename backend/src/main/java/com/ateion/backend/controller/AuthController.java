package com.ateion.backend.controller;
import com.ateion.backend.dto.LoginRequestDTO;
import com.ateion.backend.dto.SignUpRequestDTO;
import com.ateion.backend.entity.User;
import com.ateion.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.ateion.backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // <--- INJECTED ENCODER
    private final JwtUtil jwtUtil;
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Email is already registered!");
        }

        // Create the new user and ENCRYPT the password
        User newUser = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword())) // <--- HASH THE PASSWORD
                .ageSegment(signUpRequest.getAgeSegment())
                .build();

        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {

        Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // VERIFY using BCrypt's .matches()
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                
                String token = jwtUtil.generateToken(user);

                Map<String, Object> userData = new HashMap<>();
                userData.put("fullName", user.getFullName());
                userData.put("email", user.getEmail());
                userData.put("ageSegment", user.getAgeSegment());
                userData.put("token", token);

                return ResponseEntity.ok(userData);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Incorrect password!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found!");
        }
    }

    @GetMapping("/me")
public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String bearerToken) {
    try {
        // 1. Remove the "Bearer " prefix from the token
        String token = bearerToken.substring(7);
        
        // 2. Extract the email from the token using your JwtUtil
        String email = jwtUtil.extractUsername(token); 
        
        // 3. Directly fetch the user from the database table
        Optional<User> user = userRepository.findByEmail(email);
        
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found in database");
        }
    } catch (Exception e) {
        // If the token is fake or expired, reject them!
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }
}
}