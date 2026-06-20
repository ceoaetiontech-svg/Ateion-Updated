package com.ateion.backend.service;

import com.ateion.backend.dto.YoutubeImportDTOs.*;
import com.ateion.backend.entity.Course;
import com.ateion.backend.entity.Module;
import com.ateion.backend.entity.Videos;
import com.ateion.backend.repository.CourseRepository;
import com.ateion.backend.repository.ModuleRepository;
import com.ateion.backend.repository.VideoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class YoutubeImportService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final VideoRepository videoRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public PreviewResponse previewPlaylist(String playlistUrl) {
        String playlistId = extractPlaylistId(playlistUrl);
        if (playlistId == null) throw new IllegalArgumentException("Invalid Playlist URL");

        String itemsUrl = String.format(
                "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=%s&key=%s",
                playlistId, apiKey);

        JsonNode itemsResponse = restTemplate.getForObject(itemsUrl, JsonNode.class);
        List<VideoItem> videoItems = new ArrayList<>();
        List<String> videoIds = new ArrayList<>();

        int order = 1;
        JsonNode itemsNode = itemsResponse != null ? itemsResponse.path("items") : null;

        if (itemsNode != null && !itemsNode.isMissingNode() && itemsNode.isArray()) {
            for (JsonNode item : itemsNode) {
                String vidId = item.path("contentDetails").path("videoId").asText();
                videoIds.add(vidId);

                VideoItem vi = new VideoItem();
                vi.setVideoId(vidId);
                vi.setTitle(item.path("snippet").path("title").asText());
                vi.setThumbnailUrl(getBestThumbnail(item.path("snippet").path("thumbnails")));
                vi.setPlaylistOrder(order++);
                videoItems.add(vi);
            }
        }

        if (!videoIds.isEmpty()) {
            String idsParam = String.join(",", videoIds);
            String videosUrl = String.format(
                    "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=%s&key=%s",
                    idsParam, apiKey);

            JsonNode videosResponse = restTemplate.getForObject(videosUrl, JsonNode.class);
            JsonNode vItemsNode = videosResponse != null ? videosResponse.path("items") : null;

            if (vItemsNode != null && !vItemsNode.isMissingNode() && vItemsNode.isArray()) {
                for (JsonNode vNode : vItemsNode) {
                    String vidId = vNode.path("id").asText();
                    String isoDuration = vNode.path("contentDetails").path("duration").asText();
                    long seconds = Duration.parse(isoDuration).getSeconds();

                    videoItems.stream().filter(v -> v.getVideoId().equals(vidId))
                            .findFirst().ifPresent(v -> v.setDurationSeconds((int) seconds));
                }
            }
        }

        PreviewResponse response = new PreviewResponse();
        response.setVideos(videoItems);
        response.setTotalVideos(videoItems.size());
        if (!videoItems.isEmpty()) {
            response.setThumbnailUrl(videoItems.get(0).getThumbnailUrl());
            response.setPlaylistTitle("Imported Playlist");
        }
        return response;
    }

    @Transactional
    public Course publishCourse(PublishRequest request) {
        // Anti-Duplicate Protection
        if (request.getPreviewData() != null && !request.getPreviewData().getVideos().isEmpty()) {
            String firstVidId = request.getPreviewData().getVideos().get(0).getVideoId();
            if (videoRepository.existsByVideoId(firstVidId)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Duplicate Course: This playlist has already been imported.");
            }
        }

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setAgeSegment(request.getAgeSegment());
        course.setCategory(request.getCategory());
        course.setIsFree(request.getPrice() == null || request.getPrice().equals("0"));
        course.setPrice(request.getPrice());
        course.setImage(request.getPreviewData().getThumbnailUrl());
        course.setProgress(0);
        course.setRating(5.0);
        course.setEnrollments(0);

        Course savedCourse = courseRepository.save(course);

        Module module = new Module();
        module.setTitle("Course Content");
        module.setCourse(savedCourse);
        Module savedModule = moduleRepository.save(module);

        List<Videos> videosToSave = request.getPreviewData().getVideos().stream().map(v -> {
            Videos video = new Videos();
            video.setTitle(v.getTitle());
            video.setVideoId(v.getVideoId());
            video.setThumbnailUrl(v.getThumbnailUrl());
            // Map strictly to Long
            video.setDurationSeconds(v.getDurationSeconds() != null ? v.getDurationSeconds().longValue() : 0L);
            video.setVideoOrder(v.getPlaylistOrder());
            video.setModule(savedModule);
            return video;
        }).collect(Collectors.toList());

        videoRepository.saveAll(videosToSave);
        return savedCourse;
    }

    private String extractPlaylistId(String url) {
        Matcher matcher = Pattern.compile("list=([a-zA-Z0-9_-]+)").matcher(url);
        return matcher.find() ? matcher.group(1) : null;
    }

    private String getBestThumbnail(JsonNode thumbnails) {
        if (!thumbnails.path("maxres").path("url").isMissingNode()) return thumbnails.path("maxres").path("url").asText();
        if (!thumbnails.path("high").path("url").isMissingNode()) return thumbnails.path("high").path("url").asText();
        if (!thumbnails.path("medium").path("url").isMissingNode()) return thumbnails.path("medium").path("url").asText();
        if (!thumbnails.path("default").path("url").isMissingNode()) return thumbnails.path("default").path("url").asText();
        return "";
    }
}