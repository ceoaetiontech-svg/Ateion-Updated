import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  ListVideo,
  PenLine,
  Loader2,
  Play
} from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import { usePlayground } from "../shared/PlaygroundContext";
import { ApiRequestError, fetchJsonWithRetry } from "../../../lib/apiClient";

interface VideoDTO {
  id: number;
  title: string;
  durationSeconds: number;
  videoOrder: number;
}

interface ModuleDTO {
  id: number;
  title: string;
  videos: VideoDTO[];
}

interface CourseFullDTO {
  id: number;
  title: string;
  modules: ModuleDTO[];
}

export default function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const courseId = Number(id);

  const {
    enrolledIds,
    enrollCourse,
    touchCourse,
    notes,
    addNote,
    deleteNote
  } = usePlayground();

  // Course loading state
  const [course, setCourse] = useState<CourseFullDTO | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [courseError, setCourseError] = useState<string | null>(null);

  // Video state
  const [currentVideo, setCurrentVideo] = useState<VideoDTO | null>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState(0);

  // Expanded modules state (accordion)
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});

  // Completed videos for this course
  const [completedVideos, setCompletedVideos] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`ateion_progress_${courseId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active side panel tab: "playlist" | "notes"
  const [activeTab, setActiveTab] = useState<"playlist" | "notes">("playlist");
  const [noteInput, setNoteInput] = useState("");

  // Cache mapping backend video IDs to YouTube IDs
  const videoAccessCacheRef = useRef<Record<number, string>>({});

  // 1. Fetch full course details on load
  useEffect(() => {
    if (!courseId || isNaN(courseId)) {
      setCourseError("Invalid course ID.");
      setLoadingCourse(false);
      return;
    }

    const controller = new AbortController();
    const token = localStorage.getItem("token");

    const loadCourseData = async () => {
      setLoadingCourse(true);
      setCourseError(null);
      try {
        const data = await fetchJsonWithRetry<CourseFullDTO>(
          `/content/courses/${courseId}/full`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : ""
            },
            signal: controller.signal
          },
          3
        );

        if (!data || !data.modules) {
          throw new Error("Invalid course structure returned by the server.");
        }

        setCourse(data);

        // Auto-expand the first module by default
        if (data.modules.length > 0) {
          setExpandedModules({ [data.modules[0].id]: true });
        }

        // Handle auto-enrollment
        if (!enrolledIds.includes(courseId)) {
          enrollCourse(courseId, data.title || "New Course");
        }

        // Touch course to update last-accessed time
        touchCourse(courseId);

        // Determine starting video (either resumed or first available)
        const savedResumeId = localStorage.getItem(`ateion_resume_video_${courseId}`);
        let startingVideo: VideoDTO | null = null;

        const allVideos = data.modules.flatMap(m => m.videos);
        if (savedResumeId) {
          const match = allVideos.find(v => v.id === Number(savedResumeId));
          if (match) startingVideo = match;
        }

        if (!startingVideo && allVideos.length > 0) {
          startingVideo = allVideos[0];
        }

        if (startingVideo) {
          setCurrentVideo(startingVideo);
          // Auto-expand module containing starting video
          const parentModule = data.modules.find(m =>
            m.videos.some(v => v.id === startingVideo?.id)
          );
          if (parentModule) {
            setExpandedModules(prev => ({ ...prev, [parentModule.id]: true }));
          }
        }

      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error fetching course details:", err);
        setCourseError(
          err instanceof Error ? err.message : "Failed to load course details."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCourse(false);
        }
      }
    };

    void loadCourseData();

    return () => {
      controller.abort();
    };
  }, [courseId, enrollCourse, touchCourse, enrolledIds]);

  // 2. Fetch YouTube Video ID when currentVideo changes
  useEffect(() => {
    if (!currentVideo) return;

    // Reset youtubeVideoId to null immediately when changing videos to force player remount
    setYoutubeVideoId(null);

    // Check cache first
    if (videoAccessCacheRef.current[currentVideo.id]) {
      setYoutubeVideoId(videoAccessCacheRef.current[currentVideo.id]);
      setVideoError(null);
      return;
    }

    const controller = new AbortController();
    const token = localStorage.getItem("token");

    const fetchVideoId = async () => {
      setLoadingVideo(true);
      setVideoError(null);
      try {
        const data = await fetchJsonWithRetry<{ youtubeVideoId: string }>(
          `/content/videos/${currentVideo.id}/access`,
          {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : ""
            },
            signal: controller.signal
          },
          3
        );

        if (data && data.youtubeVideoId) {
          setYoutubeVideoId(data.youtubeVideoId);
          // Save to cache
          videoAccessCacheRef.current[currentVideo.id] = data.youtubeVideoId;
        } else {
          throw new Error("No YouTube ID found for this video.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error accessing video:", err);
        setVideoError(
          err instanceof Error ? err.message : "Failed to load video player."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingVideo(false);
        }
      }
    };

    void fetchVideoId();

    // Save resume state
    localStorage.setItem(`ateion_resume_video_${courseId}`, String(currentVideo.id));

    return () => {
      controller.abort();
    };
  }, [currentVideo, courseId]);

  // Flattened video list helper for navigation
  const flatVideos = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap(m => m.videos);
  }, [course]);

  const currentFlatIndex = useMemo(() => {
    if (!currentVideo || flatVideos.length === 0) return -1;
    return flatVideos.findIndex(v => v.id === currentVideo.id);
  }, [currentVideo, flatVideos]);

  const hasNext = currentFlatIndex !== -1 && currentFlatIndex < flatVideos.length - 1;
  const hasPrev = currentFlatIndex > 0;

  // Toggle expanded state of a module
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Toggle completion of a video manually
  const toggleVideoComplete = (videoId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCompletedVideos(prev => {
      let next: number[];
      if (prev.includes(videoId)) {
        next = prev.filter(id => id !== videoId);
      } else {
        next = [...prev, videoId];
      }
      localStorage.setItem(`ateion_progress_${courseId}`, JSON.stringify(next));
      return next;
    });
  };

  // Move to next video
  const playNext = useCallback(() => {
    if (hasNext) {
      setVideoKey(k => k + 1);
      setCurrentVideo(flatVideos[currentFlatIndex + 1]);

      // Expand next video's module parent
      const nextVid = flatVideos[currentFlatIndex + 1];
      if (course) {
        const nextModule = course.modules.find(m =>
          m.videos.some(v => v.id === nextVid.id)
        );
        if (nextModule) {
          setExpandedModules(prev => ({ ...prev, [nextModule.id]: true }));
        }
      }
    }
  }, [hasNext, currentFlatIndex, flatVideos, course]);

  // Move to previous video
  const playPrevious = useCallback(() => {
    if (hasPrev) {
      setVideoKey(k => k + 1);
      setCurrentVideo(flatVideos[currentFlatIndex - 1]);

      // Expand previous video's module parent
      const prevVid = flatVideos[currentFlatIndex - 1];
      if (course) {
        const prevModule = course.modules.find(m =>
          m.videos.some(v => v.id === prevVid.id)
        );
        if (prevModule) {
          setExpandedModules(prev => ({ ...prev, [prevModule.id]: true }));
        }
      }
    }
  }, [hasPrev, currentFlatIndex, flatVideos, course]);

  // Handle video complete event from player (auto-progression)
  const handleVideoComplete = useCallback(() => {
    if (currentVideo) {
      // Mark current completed if not already
      if (!completedVideos.includes(currentVideo.id)) {
        toggleVideoComplete(currentVideo.id);
      }

      // Autoplay next if available
      if (hasNext) {
        setTimeout(() => {
          playNext();
        }, 1000);
      }
    }
  }, [currentVideo, completedVideos, hasNext, playNext]);

  // Filter notes for this course/lesson
  const courseNotes = useMemo(() => {
    return notes.filter(n => n.courseId === courseId);
  }, [notes, courseId]);

  // Handle adding note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !currentVideo) return;

    addNote({
      courseId: courseId,
      lessonId: currentVideo.id,
      text: noteInput.trim()
    });

    setNoteInput("");
  };

  // Progress percentage calculations
  const progressPercent = useMemo(() => {
    if (flatVideos.length === 0) return 0;
    const currentCourseCompleted = completedVideos.filter(id =>
      flatVideos.some(v => v.id === id)
    );
    return Math.round((currentCourseCompleted.length / flatVideos.length) * 100);
  }, [completedVideos, flatVideos]);

  // Format Duration seconds -> mm:ss or hh:mm:ss
  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedSecs = String(secs).padStart(2, "0");
    const formattedMins = String(mins).padStart(2, "0");

    if (hrs > 0) {
      return `${hrs}:${formattedMins}:${formattedSecs}`;
    }
    return `${mins}:${formattedSecs}`;
  };

  if (loadingCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-primary)] py-20">
        <Loader2 className="w-12 h-12 text-[var(--color-accent)] animate-spin" />
        <p className="mt-4 text-sm font-semibold text-[var(--color-text-secondary)]">
          Loading course content...
        </p>
      </div>
    );
  }

  if (courseError || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background-primary)] px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-6">
          <BookOpen size={28} className="text-[var(--color-text-tertiary)]" />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
          Unable to Load Course
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-md mb-6">
          {courseError || "The course could not be loaded. It might have been deleted or the access link is incorrect."}
        </p>
        <button
          onClick={() => navigate("/playground/discover")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-md transition-all hover:brightness-105"
        >
          <ArrowLeft size={16} /> Back to Discover
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} | Player</title>
        <meta name="description" content={`Learn ${course.title} on Ateion`} />
      </Helmet>

      <div
        className="min-h-screen flex flex-col bg-[var(--color-background-primary)] text-[var(--color-text-primary)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Navigation Header */}
        <header className="flex items-center gap-4 px-4 md:px-8 py-4 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/80 backdrop-blur-md sticky top-0 z-40">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/playground/mycourses")}
            className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-accent)] transition-all hover:opacity-90 cursor-pointer bg-transparent border-none outline-none"
          >
            <ChevronLeft size={18} /> My Courses
          </motion.button>
          <div className="h-4 w-px bg-[var(--color-border-light)]" />
          <h1 className="text-sm md:text-base font-extrabold truncate text-[var(--color-text-primary)]">
            {course.title}
          </h1>
        </header>

        {/* Main Workspace Layout */}
        <main className="flex-1 flex flex-col lg:flex-row min-h-0 w-full">
          {/* LEFT SIDE: Video Player & Metadata */}
          <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {/* Player Wrapper */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <div className="w-full h-full rounded-[18px] overflow-hidden relative bg-black">
                {currentVideo ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentVideo.id}-${videoKey}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full"
                    >
                      <VideoPlayer
                        key={youtubeVideoId || `loading-${currentVideo.id}`}
                        videoId={youtubeVideoId}
                        title={currentVideo.title}
                        loading={loadingVideo}
                        error={videoError}
                        onComplete={handleVideoComplete}
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-[var(--color-text-tertiary)]">
                    <PlayCircle size={48} className="mb-3 animate-pulse" />
                    <p className="font-semibold text-sm">Select a video from the playlist to begin learning</p>
                  </div>
                )}
              </div>
            </div>

            {/* Video Control Buttons & Metadata */}
            {currentVideo && (
              <div className="mt-6 flex flex-col">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-light)] pb-5 mb-5">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent_light)]/35 px-2.5 py-1 rounded-full">
                      Lesson {currentFlatIndex + 1} of {flatVideos.length}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black mt-3 text-[var(--color-text-primary)] leading-tight tracking-tight">
                      {currentVideo.title}
                    </h2>
                  </div>

                  {/* Previous / Next buttons */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={hasPrev ? { scale: 1.05 } : {}}
                      whileTap={hasPrev ? { scale: 0.95 } : {}}
                      onClick={playPrevious}
                      disabled={!hasPrev}
                      className={`h-11 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-sm font-bold border ${
                        hasPrev
                          ? "bg-[var(--color-background-secondary)] border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                          : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                      }`}
                    >
                      <ChevronLeft size={16} /> Prev
                    </motion.button>

                    <motion.button
                      whileHover={hasNext ? { scale: 1.05 } : {}}
                      whileTap={hasNext ? { scale: 0.95 } : {}}
                      onClick={playNext}
                      disabled={!hasNext}
                      className={`h-11 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all text-sm font-bold border ${
                        hasNext
                          ? "bg-[var(--color-background-secondary)] border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                          : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                      }`}
                    >
                      Next <ChevronLeft size={16} className="rotate-180" />
                    </motion.button>
                  </div>
                </div>

                {/* Lesson Description (Mock Details) */}
                <div className="bg-[var(--color-background-secondary)]/50 border border-[var(--color-border-light)] rounded-2xl p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-amber-500" />
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-[var(--color-text-primary)]">
                      Lesson Insights
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] font-medium">
                    This module is tailored to expand key competencies in {course.title}. Apply notes and visual prompts to retain critical concepts. Toggling lesson items in the playlist updates progress in your scorecard dashboard.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Modules playlist / Notes side panel */}
          <div className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/30 backdrop-blur-md flex flex-col">
            {/* Panel Tabs */}
            <div className="flex border-b border-[var(--color-border-light)] p-2 gap-2 bg-[var(--color-background-secondary)]/50">
              <button
                onClick={() => setActiveTab("playlist")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-none ${
                  activeTab === "playlist"
                    ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-primary)]/40"
                }`}
              >
                <ListVideo size={16} /> Playlist
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 outline-none border-none ${
                  activeTab === "notes"
                    ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-primary)]/40"
                }`}
              >
                <PenLine size={16} /> Notes ({courseNotes.length})
              </button>
            </div>

            {/* TAB PANELS */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* PLAYLIST TAB */}
              {activeTab === "playlist" && (
                <div className="space-y-4">
                  {/* Overall progress indicator */}
                  <div className="bg-[var(--color-background-primary)]/80 border border-[var(--color-border-light)] p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[var(--color-text-secondary)] uppercase">
                        Course Progression
                      </span>
                      <span className="text-sm font-black text-[var(--color-accent)]">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9b82] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Modules Accordion */}
                  <div className="space-y-2">
                    {course.modules.map((mod, modIdx) => {
                      const isExpanded = !!expandedModules[mod.id];
                      return (
                        <div
                          key={mod.id}
                          className="rounded-2xl border border-[var(--color-border-medium)]/80 bg-[var(--color-background-primary)]/50 overflow-hidden shadow-sm transition-all"
                        >
                          {/* Module Header Bar */}
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="w-full flex items-center justify-between px-4.5 py-4 text-left hover:bg-[var(--color-background-secondary)]/40 transition-colors border-none outline-none bg-transparent cursor-pointer"
                          >
                            <div className="min-w-0 pr-2">
                              <span className="text-[10px] font-black uppercase text-[var(--color-text-tertiary)] tracking-widest">
                                Module {modIdx + 1}
                              </span>
                              <h4 className="text-sm font-black text-[var(--color-text-primary)] mt-0.5 truncate leading-snug">
                                {mod.title}
                              </h4>
                            </div>
                            {isExpanded ? (
                              <ChevronUp size={16} className="text-[var(--color-text-tertiary)]" />
                            ) : (
                              <ChevronDown size={16} className="text-[var(--color-text-tertiary)]" />
                            )}
                          </button>

                          {/* Module Lessons List */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden border-t border-[var(--color-border-light)]/50 bg-[var(--color-background-secondary)]/20"
                              >
                                <div className="divide-y divide-[var(--color-border-light)]/40">
                                  {mod.videos.length === 0 ? (
                                    <div className="p-4 text-xs font-semibold text-[var(--color-text-tertiary)] text-center">
                                      No lessons available
                                    </div>
                                  ) : (
                                    mod.videos.map((vid) => {
                                      const isActive = currentVideo?.id === vid.id;
                                      const isCompleted = completedVideos.includes(vid.id);

                                      return (
                                        <div
                                          key={vid.id}
                                          onClick={() => {
                                            setVideoKey(k => k + 1);
                                            setCurrentVideo(vid);
                                          }}
                                          className={`flex items-start gap-3 p-3.5 hover:bg-[var(--color-background-primary)]/40 transition-colors cursor-pointer group ${
                                            isActive
                                              ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]"
                                              : "text-[var(--color-text-secondary)]"
                                          }`}
                                        >
                                          {/* Status checkbox indicator */}
                                          <button
                                            onClick={(e) => toggleVideoComplete(vid.id, e)}
                                            className="mt-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors bg-transparent border-none outline-none"
                                          >
                                            {isCompleted ? (
                                              <CheckCircle2 size={16} className="text-[var(--color-accent)] fill-[var(--color-accent_light)]/20" />
                                            ) : (
                                              <Circle size={16} className="text-[var(--color-border-medium)] hover:border-[var(--color-accent)]" />
                                            )}
                                          </button>

                                          <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-extrabold leading-snug break-words transition-colors ${
                                              isActive
                                                ? "text-[var(--color-accent)]"
                                                : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                                            }`}>
                                              {vid.title}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-bold text-[var(--color-text-tertiary)]">
                                              <Clock size={11} />
                                              <span>{formatDuration(vid.durationSeconds)}</span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NOTES TAB */}
              {activeTab === "notes" && (
                <div className="space-y-5">
                  {/* Note Creator Input Form */}
                  <form
                    onSubmit={handleSaveNote}
                    className="bg-[var(--color-background-primary)]/80 border border-[var(--color-border-light)] p-4 rounded-2xl shadow-sm flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--color-text-secondary)] uppercase">
                      <PenLine size={13} className="text-[var(--color-accent)]" />
                      <span>Take a Quick Note</span>
                    </div>

                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder={
                        currentVideo
                          ? `Add note for "${currentVideo.title}"...`
                          : "Select a lesson to begin writing notes..."
                      }
                      disabled={!currentVideo}
                      className="w-full min-h-[90px] p-3 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)]/50 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent)] resize-none transition-all"
                    />

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={noteInput.trim() && currentVideo ? { scale: 1.02 } : {}}
                        whileTap={noteInput.trim() && currentVideo ? { scale: 0.98 } : {}}
                        disabled={!noteInput.trim() || !currentVideo}
                        type="submit"
                        className={`h-9 px-4 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all border-none ${
                          noteInput.trim() && currentVideo
                            ? "bg-[var(--color-accent)] text-white hover:brightness-105 cursor-pointer"
                            : "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)]/50 cursor-not-allowed"
                        }`}
                      >
                        <Plus size={14} /> Save Note
                      </motion.button>
                    </div>
                  </form>

                  {/* Notes List */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-black uppercase text-[var(--color-text-tertiary)] tracking-widest mb-1">
                      Saved Notes ({courseNotes.length})
                    </h5>

                    {courseNotes.length === 0 ? (
                      <div className="py-8 text-center text-xs font-semibold text-[var(--color-text-tertiary)] border border-dashed border-[var(--color-border-light)] rounded-2xl">
                        No notes saved yet. Type a note above to record key concepts.
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {courseNotes.map((note) => {
                          // Find corresponding lesson title if possible
                          const lesson = flatVideos.find(v => v.id === note.lessonId);
                          return (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="bg-[var(--color-background-primary)]/50 border border-[var(--color-border-light)] rounded-2xl p-4 shadow-sm flex items-start gap-3 group"
                            >
                              <div className="flex-1 min-w-0">
                                {lesson && (
                                  <span className="text-[10px] font-bold text-[var(--color-accent)] uppercase block mb-1">
                                    {lesson.title}
                                  </span>
                                )}
                                <p className="text-sm font-medium leading-relaxed text-[var(--color-text-primary)] break-words whitespace-pre-wrap">
                                  {note.text}
                                </p>
                                <span className="text-[10px] font-bold text-[var(--color-text-tertiary)] block mt-2">
                                  {new Date(note.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </span>
                              </div>

                              <button
                                onClick={() => deleteNote(note.id)}
                                className="text-[var(--color-text-tertiary)] hover:text-red-500 transition-colors p-1 bg-transparent border-none outline-none opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
