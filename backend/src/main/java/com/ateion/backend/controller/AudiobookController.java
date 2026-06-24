package com.ateion.backend.controller;

import com.ateion.backend.entity.Audiobook;
import com.ateion.backend.entity.AudiobookChapter;
import com.ateion.backend.repository.AudiobookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/content/audiobooks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AudiobookController {

    private final AudiobookRepository audiobookRepository;

    // ── GET all ──────────────────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllAudiobooks() {
        List<Audiobook> books = audiobookRepository.findAllByOrderByCreatedAtDesc();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Audiobook ab : books) {
            result.add(toMap(ab));
        }
        return ResponseEntity.ok(result);
    }

    // ── GET single ───────────────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAudiobook(@PathVariable Long id) {
        return audiobookRepository.findById(id)
                .map(ab -> ResponseEntity.ok(toMap(ab)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ── CREATE ───────────────────────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<Map<String, Object>> createAudiobook(@RequestBody Map<String, Object> body) {
        Audiobook ab = new Audiobook();
        applyFields(ab, body);
        ab = audiobookRepository.save(ab);

        // persist chapters
        if (body.containsKey("chapters")) {
            saveChapters(ab, body);
            ab = audiobookRepository.findById(ab.getId()).orElse(ab);
        }
        return ResponseEntity.ok(toMap(ab));
    }

    // ── UPDATE ───────────────────────────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateAudiobook(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        return audiobookRepository.findById(id).map(ab -> {
            applyFields(ab, body);
            // Replace chapters completely
            if (ab.getChapters() != null) ab.getChapters().clear();
            audiobookRepository.save(ab);
            saveChapters(ab, body);
            Audiobook updated = audiobookRepository.findById(id).orElse(ab);
            return ResponseEntity.ok(toMap(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ── DELETE ───────────────────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAudiobook(@PathVariable Long id) {
        audiobookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private void applyFields(Audiobook ab, Map<String, Object> body) {
        if (body.containsKey("title"))       ab.setTitle((String) body.get("title"));
        if (body.containsKey("author"))      ab.setAuthor((String) body.get("author"));
        if (body.containsKey("description")) ab.setDescription((String) body.get("description"));
        if (body.containsKey("category"))    ab.setCategory((String) body.get("category"));
        if (body.containsKey("coverUrl"))    ab.setCoverUrl((String) body.get("coverUrl"));
    }

    @SuppressWarnings("unchecked")
    private void saveChapters(Audiobook ab, Map<String, Object> body) {
        Object rawChapters = body.get("chapters");
        if (!(rawChapters instanceof List)) return;
        List<Map<String, Object>> chapterList = (List<Map<String, Object>>) rawChapters;
        if (ab.getChapters() == null) ab.setChapters(new ArrayList<>());
        for (int i = 0; i < chapterList.size(); i++) {
            Map<String, Object> cm = chapterList.get(i);
            AudiobookChapter ch = new AudiobookChapter();
            ch.setAudiobook(ab);
            ch.setTitle((String) cm.getOrDefault("title", "Chapter " + (i + 1)));
            ch.setYoutubeVideoId((String) cm.getOrDefault("youtubeVideoId", ""));
            Object dur = cm.get("durationSeconds");
            ch.setDurationSeconds(dur instanceof Number ? ((Number) dur).intValue() : 0);
            ch.setSortOrder(i);
            ab.getChapters().add(ch);
        }
        audiobookRepository.save(ab);
    }

    private Map<String, Object> toMap(Audiobook ab) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id",          ab.getId());
        m.put("title",       ab.getTitle());
        m.put("author",      ab.getAuthor() != null ? ab.getAuthor() : "");
        m.put("description", ab.getDescription() != null ? ab.getDescription() : "");
        m.put("category",    ab.getCategory() != null ? ab.getCategory() : "");
        m.put("coverUrl",    ab.getCoverUrl() != null ? ab.getCoverUrl() : "");
        m.put("createdAt",   ab.getCreatedAt());

        List<Map<String, Object>> chapters = new ArrayList<>();
        if (ab.getChapters() != null) {
            for (AudiobookChapter ch : ab.getChapters()) {
                Map<String, Object> cm = new LinkedHashMap<>();
                cm.put("id",              ch.getId());
                cm.put("title",           ch.getTitle());
                cm.put("youtubeVideoId",  ch.getYoutubeVideoId() != null ? ch.getYoutubeVideoId() : "");
                cm.put("durationSeconds", ch.getDurationSeconds() != null ? ch.getDurationSeconds() : 0);
                cm.put("sortOrder",       ch.getSortOrder() != null ? ch.getSortOrder() : 0);
                chapters.add(cm);
            }
        }
        m.put("chapters", chapters);
        return m;
    }
}
