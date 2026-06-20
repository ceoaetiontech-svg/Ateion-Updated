package com.ateion.backend.service;

import com.ateion.backend.dto.VideoDTO;
import com.ateion.backend.entity.Module;
import com.ateion.backend.entity.Videos;
import com.ateion.backend.repository.ModuleRepository;
import com.ateion.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final ModuleRepository moduleRepository;

    @Transactional(readOnly = true)
    public List<VideoDTO> getAllVideos() {
        return videoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public VideoDTO getVideoById(Long id) {
        Videos video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id));
        return toDTO(video);
    }

    @Transactional(readOnly = true)
    public List<VideoDTO> getVideosByModule(Long moduleId) {
        if (!moduleRepository.existsById(moduleId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Module not found: " + moduleId);
        }

        return videoRepository.findByModuleIdOrderByVideoOrderAsc(moduleId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public VideoDTO createVideo(VideoDTO dto) {
        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Module not found: " + dto.getModuleId()
                ));

        Videos video = Videos.builder()
                .title(dto.getTitle())
                .videoId(dto.getVideoId())
                .durationSeconds(dto.getDurationSeconds() != null ? dto.getDurationSeconds().longValue() : 0L)
                .module(module)
                .build();

        return toDTO(videoRepository.save(video));
    }

    @Transactional
    public VideoDTO updateVideo(Long id, VideoDTO dto) {
        Videos video = videoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id));

        video.setTitle(dto.getTitle());
        video.setVideoId(dto.getVideoId());
        video.setDurationSeconds(dto.getDurationSeconds() != null ? dto.getDurationSeconds().longValue() : 0L);

        if (dto.getModuleId() != null) {
            Module module = moduleRepository.findById(dto.getModuleId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Module not found: " + dto.getModuleId()
                    ));
            video.setModule(module);
        }

        return toDTO(videoRepository.save(video));
    }

    @Transactional
    public void deleteVideo(Long id) {
        if (!videoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video not found: " + id);
        }
        videoRepository.deleteById(id);
    }

    private VideoDTO toDTO(Videos video) {
        return VideoDTO.builder()
                .id(video.getId())
                .title(video.getTitle())
                .videoId(video.getVideoId())
                .durationSeconds(video.getDurationSeconds() != null ? video.getDurationSeconds().intValue() : 0)
                .moduleId(video.getModule() != null ? video.getModule().getId() : null)
                .build();
    }
}
