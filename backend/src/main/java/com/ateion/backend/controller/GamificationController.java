//This creates the API endpoint that the React frontend will call to display the leaderboard.
package com.ateion.backend.controller;

import com.ateion.backend.entity.GamificationStat;
import com.ateion.backend.repository.GamificationStatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final GamificationStatRepository statRepository;

    @GetMapping("/leaderboard")
    public ResponseEntity<List<GamificationStat>> getLeaderboard() {
        return ResponseEntity.ok(statRepository.findTop10ByOrderByTotalPointsDesc());
    }
}