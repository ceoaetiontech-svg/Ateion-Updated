package com.ateion.backend.dto;

import java.util.List;
import lombok.Data;

@Data
public class ChatRequestDTO {
    private String message;
    private List<MessageDTO> history;

    @Data
    public static class MessageDTO {
        private String role;
        private String content;
    }
}