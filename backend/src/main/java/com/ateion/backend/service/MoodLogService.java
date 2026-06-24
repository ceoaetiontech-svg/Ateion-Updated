package com.ateion.backend.service;

import com.ateion.backend.dto.MoodLogRequestDTO;
import com.ateion.backend.dto.MoodLogResponseDTO;
import com.ateion.backend.entity.MoodLog;
import com.ateion.backend.repository.MoodLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MoodLogService {

    private final MoodLogRepository moodLogRepository;

    @Transactional
    public MoodLogResponseDTO createMoodLog(Long userId, MoodLogRequestDTO request) {
        MoodLog moodLog = MoodLog.builder()
                .userId(userId)
                .mood(request.getMood())
                .journalEntry(request.getJournalEntry())
                .build();
        MoodLog saved = moodLogRepository.save(moodLog);
        return toResponseDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<MoodLogResponseDTO> getOwnMoodLogs(Long userId) {
        return moodLogRepository.findByUserId(userId)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MoodLogResponseDTO> getOwnMoodLogsByDateRange(Long userId, LocalDate from, LocalDate to) {
        LocalDateTime fromDateTime = from != null ? from.atStartOfDay() : LocalDateTime.MIN;
        LocalDateTime toDateTime = to != null ? to.atTime(LocalTime.MAX) : LocalDateTime.MAX;
        return moodLogRepository.findByUserIdAndLoggedAtBetween(userId, fromDateTime, toDateTime)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional
    public void deleteMoodLog(Long userId, Long moodLogId) {
        MoodLog moodLog = moodLogRepository.findById(moodLogId)
                .orElseThrow(() -> new RuntimeException("Mood log not found"));
        if (!moodLog.getUserId().equals(userId)) {
            throw new RuntimeException("You can only delete your own mood logs");
        }
        moodLogRepository.delete(moodLog);
    }

    private MoodLogResponseDTO toResponseDTO(MoodLog moodLog) {
        return MoodLogResponseDTO.builder()
                .id(moodLog.getId())
                .userId(moodLog.getUserId())
                .mood(moodLog.getMood())
                .journalEntry(moodLog.getJournalEntry())
                .loggedAt(moodLog.getLoggedAt())
                .build();
    }
}
