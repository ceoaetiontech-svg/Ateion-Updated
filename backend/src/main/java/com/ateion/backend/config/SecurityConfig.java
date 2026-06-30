package com.ateion.backend.config;

import com.ateion.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                
                .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2LoginSuccessHandler)
            )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, exception) -> {
                            response.setContentType("application/json");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"error\":\"Unauthorized\",\"message\":\"Authentication is required\"}");
                        })
                        .accessDeniedHandler((request, response, exception) -> {
                            response.setContentType("application/json");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write("{\"error\":\"Forbidden\",\"message\":\"Insufficient permissions\"}");
                        })
                )
                .authorizeHttpRequests(auth -> auth
                        // OPTIONS preflight - always open
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        
                        // Auth endpoints (open for registration/login)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Health check
                        .requestMatchers(HttpMethod.GET, "/api/ping").permitAll()
                        // Public course listing and content reading
                        .requestMatchers(HttpMethod.GET, "/api/content/courses").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/content/courses/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/content/videos/**").permitAll()
                        // Public video reading
                        .requestMatchers(HttpMethod.GET, "/api/videos/public/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/videos/**").permitAll()
                        // Public audiobook reading
                        .requestMatchers(HttpMethod.GET, "/api/content/audiobooks").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/content/audiobooks/**").permitAll()

                        // Contact form submission (open, anyone can send a message)
                        .requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
                        // Reading contact messages requires admin role
                        .requestMatchers(HttpMethod.GET, "/api/contact").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/contact/**").hasRole("ADMIN")
                        // Admin endpoints: only users with ROLE_ADMIN
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // Video/audiobook mutations require authentication (admin checked separately)
                        .requestMatchers(HttpMethod.POST, "/api/videos/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/videos/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/videos/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/content/audiobooks/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/content/audiobooks/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/content/audiobooks/**").authenticated()
                        // Module mutations require auth
                        .requestMatchers(HttpMethod.POST, "/api/modules/**").authenticated()
                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
                frontendUrl != null && !frontendUrl.isBlank() ? frontendUrl : "http://localhost:3000",
                "http://localhost:3000",
                "http://localhost:5173",
                "https://*.vercel.app",
                "https://ateion.com",
                "https://www.ateion.com"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public OncePerRequestFilter jwtAuthFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(
                    HttpServletRequest request,
                    HttpServletResponse response,
                    FilterChain filterChain
            ) throws ServletException, IOException {
                String authHeader = request.getHeader("Authorization");

                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7).trim();

                    if (!token.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
                        try {
                            if (jwtUtil.validateToken(token)) {
                                String email = jwtUtil.extractEmail(token);
                                String role = jwtUtil.extractRole(token);
                                UsernamePasswordAuthenticationToken authentication =
                                        new UsernamePasswordAuthenticationToken(
                                                email,
                                                null,
                                                List.of(new SimpleGrantedAuthority(role))
                                        );
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                            }
                        } catch (Exception e) {
                            SecurityContextHolder.clearContext();
                        }
                    }
                }

                filterChain.doFilter(request, response);
            }
        };
    }
}
