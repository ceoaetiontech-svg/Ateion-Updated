package com.ateion.backend.util;

import com.ateion.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);
    private static final long EXPIRATION_TIME_MILLIS = 86_400_000L;

    @Value("${app.jwt.secret}")
    private String secretString;

    @PostConstruct
    public void init() {
        if (secretString == null || secretString.isBlank()) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable is not set. " +
                            "The application requires a strong JWT secret to run securely."
            );
        }
        if (secretString.length() < 32) {
            log.warn("JWT secret is shorter than 32 characters. " +
                    "Use a strong, randomly-generated secret of at least 256 bits for production.");
        }
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MILLIS))
                .signWith(getSigningKey())
                .compact();
    }

    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {
        return parseClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (Exception e) {
            log.debug("JWT validation failed: {}", e.getMessage());
            return false;
        }
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretString.getBytes(StandardCharsets.UTF_8));
    }
}
