package com.ateion.backend.service;

import com.ateion.backend.dto.VideoDTO;
import com.ateion.backend.entity.Module;
import com.ateion.backend.entity.Videos;
import com.ateion.backend.repository.ModuleRepository;
import com.ateion.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final ModuleRepository moduleRepository;

    public List<VideoDTO> getAllVideos() {
        return videoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public VideoDTO getVideoById(Long id) {
        Videos video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id));
        return toDTO(video);
    }

    public VideoDTO createVideo(VideoDTO dto) {
        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found: " + dto.getModuleId()));

        Videos video = Videos.builder()
                .title(dto.getTitle())
                .videoId(dto.getVideoId())
                .durationSeconds(dto.getDurationSeconds())
                .module(module)
                .build();

        return toDTO(videoRepository.save(video));
    }

    public VideoDTO updateVideo(Long id, VideoDTO dto) {
        Videos video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id));

        video.setTitle(dto.getTitle());
        video.setVideoId(dto.getVideoId());
        video.setDurationSeconds(dto.getDurationSeconds());

        if (dto.getModuleId() != null) {
            Module module = moduleRepository.findById(dto.getModuleId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found: " + dto.getModuleId()));
            video.setModule(module);
        }

        return toDTO(videoRepository.save(video));
    }

    public void deleteVideo(Long id) {
        if (!videoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id);
        }
        videoRepository.deleteById(id);
    }

    // ---- mapping ----

    private VideoDTO toDTO(Videos video) {
        return VideoDTO.builder()
                .id(video.getId())
                .title(video.getTitle())
                .videoId(video.getVideoId())
                .durationSeconds(video.getDurationSeconds())
                .moduleId(video.getModule() != null ? video.getModule().getId() : null)
                .build();
    }
}
