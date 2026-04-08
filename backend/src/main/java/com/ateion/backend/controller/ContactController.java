package com.ateion.backend.controller;

import com.ateion.backend.dto.ContactRequestDTO;
import com.ateion.backend.dto.ContactResponseDTO;
import com.ateion.backend.service.ContactService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponseDTO> saveContactMessage(@Valid @RequestBody ContactRequestDTO requestDTO) {
        ContactResponseDTO response = contactService.saveContactMessage(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ContactResponseDTO>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
