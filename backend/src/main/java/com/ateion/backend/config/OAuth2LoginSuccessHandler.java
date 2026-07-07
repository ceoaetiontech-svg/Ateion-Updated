package com.ateion.backend.config;

import com.ateion.backend.entity.User;
import com.ateion.backend.repository.UserRepository;
import com.ateion.backend.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Value("${app.frontend.url:https://www.ateion.com}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        // Grab the user's details from Google
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        String assignedAgeSegment = "Universal Access"; // Default fallback
        if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("pending_age_segment".equals(cookie.getName())) {
                    assignedAgeSegment = java.net.URLDecoder.decode(cookie.getValue(), java.nio.charset.StandardCharsets.UTF_8);
                    break;
                }
            }
        }

        // 2. ADD THIS: Create a locked 'final' copy for the lambda to use
        final String finalAgeSegment = assignedAgeSegment;
        // Find the user in the database, or register them instantly if they are new
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .fullName(name != null ? name : "Google User")
                    .password("") // OAuth users don't need a password!
                    .role("ROLE_STUDENT")
                    .ageSegment(finalAgeSegment) // Default segment
                    .isPremium(false)
                    .build();
            return userRepository.save(newUser);
        });

        // Generate your custom Ateion JWT
        String token = jwtUtil.generateToken(user);

        // Redirect back to React with the token attached to the URL safely
        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}