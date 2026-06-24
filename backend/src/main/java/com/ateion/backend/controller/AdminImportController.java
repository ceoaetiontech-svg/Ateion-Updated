package com.ateion.backend.controller;

import com.ateion.backend.dto.YoutubeImportDTOs.*;
import com.ateion.backend.service.YoutubeImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/import/youtube")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminImportController {

    private final YoutubeImportService youtubeImportService;

    @GetMapping("/preview")
    public ResponseEntity<PreviewResponse> previewPlaylist(@RequestParam String playlistUrl) {
        return ResponseEntity.ok(youtubeImportService.previewPlaylist(playlistUrl));
    }

    // ── Publish as COURSE (unchanged) ─────────────────────────────────────────
    @PostMapping("/publish")
    public ResponseEntity<Map<String, String>> publishImport(@RequestBody PublishRequest request) {
        youtubeImportService.publishCourse(request);
        Map<String, String> response = new LinkedHashMap<>();
        response.put("message", "Course published successfully");
        return ResponseEntity.ok(response);
    }

    // ── Publish as AUDIOBOOK (new) ────────────────────────────────────────────
    @PostMapping("/publish-audiobook")
    public ResponseEntity<Map<String, String>> publishAsAudiobook(@RequestBody PublishAsAudiobookRequest request) {
        youtubeImportService.publishAsAudiobook(request);
        Map<String, String> response = new LinkedHashMap<>();
        response.put("message", "Audiobook published successfully");
        return ResponseEntity.ok(response);
    }
}