package com.ateion.backend.controller;

import com.ateion.backend.dto.ChatRequestDTO;
import com.ateion.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<?> chat(@RequestBody ChatRequestDTO request) {
        try {
            String reply = chatService.chat(request);
            return ResponseEntity.ok(Map.of("reply", reply));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(Map.of("status", "chat controller is working"));
    }
}