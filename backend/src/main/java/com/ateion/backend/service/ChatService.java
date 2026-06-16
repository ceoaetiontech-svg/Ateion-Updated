package com.ateion.backend.service;

import com.ateion.backend.dto.ChatRequestDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String chat(ChatRequestDTO request) throws Exception {
        List<Map<String, Object>> messages = new ArrayList<>();

        // System message
        messages.add(Map.of(
            "role", "system",
            "content", "You are a helpful assistant for Ateion, an EdTech platform. Be concise and friendly."
        ));

        // Add history
        if (request.getHistory() != null) {
            for (ChatRequestDTO.MessageDTO msg : request.getHistory()) {
                messages.add(Map.of(
                    "role", msg.getRole().equals("assistant") ? "assistant" : "user",
                    "content", msg.getContent()
                ));
            }
        }

        // Add current message
        messages.add(Map.of(
            "role", "user",
            "content", request.getMessage()
        ));

        Map<String, Object> body = Map.of(
            "model", "llama-3.3-70b-versatile",
            "messages", messages,
            "max_tokens", 1000
        );

        String requestBody = objectMapper.writeValueAsString(body);

        HttpRequest httpRequest = HttpRequest.newBuilder()
            .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + groqApiKey)
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();

        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Groq API error: " + response.statusCode() + " - " + response.body());
        }

        JsonNode root = objectMapper.readTree(response.body());
        return root.path("choices").get(0)
                   .path("message").path("content").asText("Sorry, I couldn't get a response.");
    }
}