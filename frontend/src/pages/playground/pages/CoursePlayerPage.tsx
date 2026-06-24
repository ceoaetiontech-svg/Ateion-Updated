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
  Play,
  Download,
  FileText,
  FileCode,
  BookMarked,
  Search,
  X,
  Check,
  Edit2,
  HelpCircle
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
    deleteNote,
    updateNote
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
  const playerRef = useRef<any>(null);

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

  // Metadata tabs below video player: "overview" | "resources" | "concepts"
  const [detailTab, setDetailTab] = useState<"overview" | "resources" | "concepts">("overview");

  // Notes Search and Input State
  const [noteInput, setNoteInput] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

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

  // Filter notes by course ID and search query
  const filteredNotes = useMemo(() => {
    const courseNotes = notes.filter(n => n.courseId === courseId);
    if (!noteSearch.trim()) return courseNotes;
    const query = noteSearch.toLowerCase();
    return courseNotes.filter(n => n.text.toLowerCase().includes(query));
  }, [notes, courseId, noteSearch]);

  // Handle adding note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !currentVideo || noteInput.length > 500) return;

    let noteTimestamp: number | undefined = undefined;
    if (playerRef.current && typeof playerRef.current.currentTime === "number") {
      noteTimestamp = Math.floor(playerRef.current.currentTime);
    }

    addNote({
      courseId: courseId,
      lessonId: currentVideo.id,
      text: noteInput.trim(),
      timestamp: noteTimestamp
    });

    setNoteInput("");
  };

  // Handle inline note edit start
  const startEditingNote = (noteId: number, currentText: string) => {
    setEditingNoteId(noteId);
    setEditingNoteText(currentText);
  };

  // Save edited note text inline
  const saveNoteEdit = (noteId: number) => {
    if (!editingNoteText.trim()) return;
    updateNote(noteId, editingNoteText.trim());
    setEditingNoteId(null);
    setEditingNoteText("");
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

  const formatNoteTimestamp = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleSeekTo = (timestamp: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = timestamp;
      if (typeof playerRef.current.play === "function") {
        playerRef.current.play();
      }
    }
  };

  // Get resources based on the course metadata
  const getResources = () => {
    if (!course) return [];
    return [
      { name: `${course.title} Syllabus & Schedule.pdf`, size: "1.2 MB", icon: FileText },
      { name: `${course.title} Quick Reference Cheatsheet.pdf`, size: "840 KB", icon: FileText },
      { name: "Project Exercises Code Reference.zip", size: "4.5 MB", icon: FileCode }
    ];
  };

  // Get key concepts covered in the course
  const getConcepts = () => {
    if (!course) return [];
    return [
      "Fundamental design architecture and structural composition.",
      "Competency mapping and progress checkpoints alignment.",
      "State caching and context hooks communication.",
      "Optimized assets delivery and interactive visual feedback."
    ];
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
      <style>{`
        @keyframes equalizer {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
      <Helmet>
        <title>{course.title} | Player</title>
        <meta name="description" content={`Learn ${course.title} on Ateion`} />
      </Helmet>

      <div
        className="min-h-screen flex flex-col bg-[var(--color-background-primary)] text-[var(--color-text-primary)]"
        style={{ fontFamily: "var(--font-family-body)" }}
      >
        {/* Navigation Header */}
        <header className="flex items-center gap-4 px-4 md:px-8 py-4 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/80 backdrop-blur-md sticky top-0 z-40">
          <motion.button
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/playground/mycourses")}
            className="flex items-center gap-1.5 text-base font-bold text-[var(--color-accent)] transition-all hover:opacity-90 cursor-pointer bg-transparent border-none outline-none"
          >
            <ChevronLeft size={18} /> My Courses
          </motion.button>
          <div className="h-4 w-px bg-[var(--color-border-light)]" />
          <h1 className="text-base md:text-lg font-extrabold truncate text-[var(--color-text-primary)]">
            {course.title}
          </h1>
        </header>

        {/* Main Workspace Layout */}
        <main className="flex-1 flex flex-col lg:flex-row min-h-0 w-full">
          {/* LEFT SIDE: Video Player & Metadata Tabs */}
          <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {/* Player Wrapper with Ambient Glow Backdrop */}
            <div className="relative w-full aspect-video rounded-3xl mb-6">
              {/* Pulsing Ambient Light Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-accent)]/20 via-indigo-500/10 to-transparent rounded-[36px] opacity-70 blur-2xl pointer-events-none -z-10 animate-[pulse_6s_infinite_alternate]" />
              
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] relative z-10">
                <div className="w-full h-full rounded-[16px] overflow-hidden relative bg-black">
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
                          playerRef={playerRef}
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
            </div>

            {/* Video Control Buttons */}
            {currentVideo && (
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-light)] pb-5 mb-6">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent_light)]/35 px-2.5 py-1 rounded-full">
                    Lesson {currentFlatIndex + 1} of {flatVideos.length}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black mt-3 text-[var(--color-text-primary)] leading-tight tracking-tight">
                    {currentVideo.title}
                  </h2>
                </div>

                {/* Prev / Next buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={hasPrev ? { scale: 1.03 } : {}}
                    whileTap={hasPrev ? { scale: 0.97 } : {}}
                    onClick={playPrevious}
                    disabled={!hasPrev}
                    className={`h-10 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-sm font-bold border ${
                      hasPrev
                        ? "bg-[var(--color-background-secondary)] border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                        : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft size={14} /> Prev
                  </motion.button>

                  <motion.button
                    whileHover={hasNext ? { scale: 1.03 } : {}}
                    whileTap={hasNext ? { scale: 0.97 } : {}}
                    onClick={playNext}
                    disabled={!hasNext}
                    className={`h-10 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-sm font-bold border ${
                      hasNext
                        ? "bg-[var(--color-background-secondary)] border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                        : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                    }`}
                  >
                    Next <ChevronLeft size={14} className="rotate-180" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* TABBED DETAILS PANEL */}
            {currentVideo && (
              <div className="flex flex-col bg-[var(--color-background-secondary)]/50 border border-[var(--color-border-light)] rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm">
                {/* Tab Switcher Headers */}
                <div className="flex border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/35 p-1 gap-1.5">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "resources", label: "Resources", icon: Download },
                    { id: "concepts", label: "Key Concepts", icon: Sparkles }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDetailTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-none outline-none cursor-pointer ${
                          detailTab === tab.id
                            ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-primary)]/45"
                        }`}
                      >
                        <TabIcon size={14} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Panels */}
                <div className="p-5 min-h-[140px]">
                  <AnimatePresence mode="wait">
                    {detailTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center gap-2 text-sm font-extrabold uppercase text-[var(--color-accent)] tracking-wider">
                          <HelpCircle size={14} />
                          <span>Lesson Insights</span>
                        </div>
                        <p className="text-base leading-relaxed text-[var(--color-text-secondary)] font-medium">
                          This module provides comprehensive instruction for {course.title}. Take dynamic notes using our timestamp bookmarks to jump back to key moments at any point. Completed video checkboxes are preserved in local storage and synchronize automatically with your capability scorecard.
                        </p>
                      </motion.div>
                    )}

                    {detailTab === "resources" && (
                      <motion.div
                        key="resources"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      >
                        {getResources().map((res, i) => {
                          const Icon = res.icon;
                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)]/40 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-background-primary)]/70 transition-all group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 rounded-lg bg-[var(--color-accent_light)]/35 text-[var(--color-accent)] shrink-0">
                                  <Icon size={16} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold truncate text-[var(--color-text-primary)] leading-tight">
                                    {res.name}
                                  </p>
                                  <span className="text-xs font-semibold text-[var(--color-text-tertiary)] block mt-1">
                                    {res.size}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="p-2 rounded-xl text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-background-secondary)] transition-all cursor-pointer border-none outline-none bg-transparent"
                                title="Download"
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {detailTab === "concepts" && (
                      <motion.div
                        key="concepts"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2.5"
                      >
                        {getConcepts().map((concept, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-4 h-4 rounded-full bg-[var(--color-accent_light)]/50 text-[var(--color-accent)] flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <p className="text-sm font-bold text-[var(--color-text-secondary)] leading-relaxed">
                              {concept}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Modules playlist / Notes side panel */}
          <div className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/30 backdrop-blur-md flex flex-col">
            {/* Panel Tabs */}
            <div className="p-3 bg-[var(--color-background-secondary)]/40 border-b border-[var(--color-border-light)]">
              <div className="relative flex bg-[var(--color-background-secondary)]/80 p-1 rounded-xl border border-[var(--color-border-light)]/85 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] z-10">
                <button
                  type="button"
                  onClick={() => setActiveTab("playlist")}
                  className={`relative flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 outline-none border-none cursor-pointer z-20 ${
                    activeTab === "playlist"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <ListVideo size={14} />
                  <span>Playlist</span>
                  {activeTab === "playlist" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-lg shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("notes")}
                  className={`relative flex-1 py-2.5 px-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 outline-none border-none cursor-pointer z-20 ${
                    activeTab === "notes"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <PenLine size={14} />
                  <span>Notes ({filteredNotes.length})</span>
                  {activeTab === "notes" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-lg shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* TAB PANELS */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* PLAYLIST TAB */}
              {activeTab === "playlist" && (
                <div className="space-y-4">
                  {/* Overall progress indicator */}
                  <div className="bg-gradient-to-br from-[var(--color-background-primary)]/90 to-[var(--color-background-primary)]/40 border border-[var(--color-border-light)] p-4.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group">
                    {/* Corner glow */}
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-[var(--color-accent)]/5 rounded-full blur-xl pointer-events-none transition-opacity group-hover:opacity-100" />
                    
                    <div className="flex items-center justify-between mb-2.5 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                        </span>
                        <span className="text-sm font-extrabold text-[var(--color-text-secondary)] uppercase tracking-wider">
                          Course Progression
                        </span>
                      </div>
                      <span className="text-base font-black text-[var(--color-accent)] tracking-tight">
                        {progressPercent}%
                      </span>
                    </div>
                    
                    <div className="w-full h-2.5 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]/60 rounded-full overflow-hidden relative p-[1px]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)] to-[#ff9b82] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Modules Accordion */}
                  <div className="space-y-3">
                    {course.modules.map((mod, modIdx) => {
                      const isExpanded = !!expandedModules[mod.id];
                      return (
                        <div
                          key={mod.id}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isExpanded
                              ? "border-[var(--color-border-medium)] bg-[var(--color-background-primary)]/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                              : "border-[var(--color-border-light)] bg-[var(--color-background-primary)]/40 hover:border-[var(--color-border-medium)] hover:bg-[var(--color-background-primary)]/60"
                          }`}
                        >
                          {/* Module Header Bar */}
                          <button
                            type="button"
                            onClick={() => toggleModule(mod.id)}
                            className="w-full flex items-center justify-between px-4.5 py-3.5 text-left transition-colors border-none outline-none bg-transparent cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                                isExpanded
                                  ? "bg-[var(--color-accent_light)]/45 text-[var(--color-accent)]"
                                  : "bg-[var(--color-background-secondary)] text-[var(--color-text-tertiary)]"
                              }`}>
                                <BookOpen size={15} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-accent_light)]/20 px-2 py-0.5 rounded-md">
                                  Module {modIdx + 1}
                                </span>
                                <h4 className="text-sm font-black text-[var(--color-text-primary)] mt-1 truncate leading-snug">
                                  {mod.title}
                                </h4>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          </button>

                          {/* Module Lessons List */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden border-t border-[var(--color-border-light)]/50 bg-[var(--color-background-secondary)]/10"
                              >
                                <div className="divide-y divide-[var(--color-border-light)]/30">
                                  {mod.videos.length === 0 ? (
                                    <div className="p-4 text-sm font-semibold text-[var(--color-text-tertiary)] text-center">
                                      No lessons available
                                    </div>
                                  ) : (
                                    mod.videos.map((vid, vidIdx) => {
                                      const isActive = currentVideo?.id === vid.id;
                                      const isCompleted = completedVideos.includes(vid.id);

                                      return (
                                        <div
                                          key={vid.id}
                                          onClick={() => {
                                            setVideoKey(k => k + 1);
                                            setCurrentVideo(vid);
                                          }}
                                          className={`flex items-start gap-3 p-3.5 transition-all duration-200 cursor-pointer relative group ${
                                            isActive
                                              ? "bg-gradient-to-r from-[var(--color-accent_light)]/30 to-[var(--color-background-primary)]/10 text-[var(--color-accent)] border-l-4 border-[var(--color-accent)] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-primary)]/60 hover:text-[var(--color-text-primary)]"
                                          }`}
                                        >
                                          {/* Status checkbox indicator */}
                                          <button
                                            type="button"
                                            onClick={(e) => toggleVideoComplete(vid.id, e)}
                                            className="mt-0.5 text-[var(--color-text-tertiary)] hover:scale-110 transition-transform bg-transparent border-none outline-none cursor-pointer shrink-0"
                                          >
                                            {isCompleted ? (
                                              <CheckCircle2 size={15} className="text-[var(--color-accent)] fill-[var(--color-accent_light)]/50" />
                                            ) : (
                                              <Circle size={15} className="text-[var(--color-border-medium)] hover:border-[var(--color-accent)]" />
                                            )}
                                          </button>

                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3">
                                              <div className="flex gap-2">
                                                <span className={`text-xs font-mono font-bold select-none mt-0.5 shrink-0 ${
                                                  isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"
                                                }`}>
                                                  {String(vidIdx + 1).padStart(2, "0")}
                                                </span>
                                                <p className={`text-sm font-black leading-snug break-words transition-colors ${
                                                  isActive
                                                    ? "text-[var(--color-accent)]"
                                                    : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]"
                                                }`}>
                                                  {vid.title}
                                                </p>
                                              </div>
                                              
                                              {isActive && (
                                                <span className="flex items-end gap-[2px] h-3.5 shrink-0 mt-0.5" aria-hidden="true">
                                                  <span className="w-[2px] h-full bg-[var(--color-accent)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate]" />
                                                  <span className="w-[2px] h-[65%] bg-[var(--color-accent)] rounded-full animate-[equalizer_0.6s_ease-in-out_infinite_alternate_0.15s]" />
                                                  <span className="w-[2px] h-[85%] bg-[var(--color-accent)] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate_0.3s]" />
                                                </span>
                                              )}
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mt-2">
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--color-background-secondary)]/80 border border-[var(--color-border-light)]/80 text-[11px] font-black text-[var(--color-text-tertiary)]">
                                                <Clock size={9} />
                                                <span>{formatDuration(vid.durationSeconds)}</span>
                                              </span>
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
                <div className="space-y-4">
                  {/* Note Creator Input Form */}
                  <form
                    onSubmit={handleSaveNote}
                    className="bg-gradient-to-br from-[var(--color-background-primary)]/90 to-[var(--color-background-primary)]/40 border border-[var(--color-border-light)] p-4.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3 relative overflow-hidden group"
                  >
                    {/* Corner glow */}
                    <div className="absolute -right-10 -top-10 w-20 h-20 bg-[var(--color-accent)]/5 rounded-full blur-lg pointer-events-none" />
                    
                    <div className="flex items-center justify-between text-sm font-extrabold text-[var(--color-text-secondary)] uppercase relative z-10">
                      <div className="flex items-center gap-2">
                        <PenLine size={13} className="text-[var(--color-accent)]" />
                        <span className="tracking-wider">Take a Quick Note</span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${noteInput.length > 450 ? "text-red-500 font-extrabold" : "text-[var(--color-text-tertiary)]"}`}>
                        {noteInput.length} / 500
                      </span>
                    </div>

                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value.slice(0, 500))}
                      placeholder={
                        currentVideo
                          ? `Write a timestamped note for "${currentVideo.title}"...`
                          : "Select a lesson to begin writing notes..."
                      }
                      disabled={!currentVideo}
                      className="w-full min-h-[90px] p-3 rounded-xl border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)]/40 text-sm font-semibold text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 resize-none transition-all"
                    />

                    <div className="flex justify-end relative z-10">
                      <motion.button
                        whileHover={noteInput.trim() && currentVideo ? { scale: 1.02 } : {}}
                        whileTap={noteInput.trim() && currentVideo ? { scale: 0.98 } : {}}
                        disabled={!noteInput.trim() || !currentVideo}
                        type="submit"
                        className={`h-9 px-4 rounded-xl text-sm font-black flex items-center gap-1.5 shadow-sm transition-all border-none ${
                          noteInput.trim() && currentVideo
                            ? "bg-[var(--color-accent)] text-white hover:brightness-105 cursor-pointer"
                            : "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)]/50 cursor-not-allowed"
                        }`}
                      >
                        <Plus size={14} /> Save Note
                      </motion.button>
                    </div>
                  </form>

                  {/* Notes Search Filter Bar */}
                  <div className="relative w-full">
                    <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                    <input
                      type="text"
                      value={noteSearch}
                      onChange={(e) => setNoteSearch(e.target.value)}
                      placeholder="Search notes..."
                      className="w-full pl-9 pr-8 py-2.5 text-sm font-semibold rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)]/80 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all"
                    />
                    {noteSearch && (
                      <button
                        type="button"
                        onClick={() => setNoteSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] bg-transparent border-none outline-none cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3">
                    {filteredNotes.length === 0 ? (
                      <div className="py-8 text-center text-sm font-semibold text-[var(--color-text-tertiary)] border border-dashed border-[var(--color-border-light)] rounded-2xl">
                        {noteSearch ? "No notes matches your query." : "No notes saved yet. Add one above!"}
                      </div>
                    ) : (
                      <AnimatePresence initial={false}>
                        {filteredNotes.map((note) => {
                          const lesson = flatVideos.find(v => v.id === note.lessonId);
                          const isEditing = editingNoteId === note.id;

                          return (
                            <motion.div
                              key={note.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gradient-to-br from-[var(--color-background-primary)]/90 to-[var(--color-background-primary)]/50 border border-[var(--color-border-light)] rounded-2xl p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-3 group relative hover:border-[var(--color-border-medium)] transition-all"
                            >
                              {/* Inline Note Editor Mode */}
                              {isEditing ? (
                                <div className="flex flex-col gap-2.5">
                                  <textarea
                                    value={editingNoteText}
                                    onChange={(e) => setEditingNoteText(e.target.value.slice(0, 500))}
                                    className="w-full p-3 rounded-xl border border-[var(--color-accent)] bg-[var(--color-background-secondary)]/40 text-sm font-semibold text-[var(--color-text-primary)] outline-none focus:ring-1 focus:ring-[var(--color-accent)]/20 resize-none min-h-[70px]"
                                  />
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)]">
                                      {editingNoteText.length} / 500
                                    </span>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => setEditingNoteId(null)}
                                        className="h-8 px-3 rounded-lg border border-[var(--color-border-medium)] text-[var(--color-text-secondary)] text-xs font-black hover:bg-[var(--color-background-secondary)] cursor-pointer transition-colors bg-transparent"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => saveNoteEdit(note.id)}
                                        className="h-8 px-3 rounded-lg bg-[var(--color-accent)] text-white text-xs font-black hover:brightness-105 cursor-pointer border-none transition-all"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* Normal Read View Mode */
                                <>
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
                                        {lesson && (
                                          <span className="text-[11px] font-black text-[var(--color-accent)] bg-[var(--color-accent_light)]/20 px-2 py-0.5 rounded uppercase block truncate max-w-[160px]">
                                            {lesson.title}
                                          </span>
                                        )}
                                        {note.timestamp !== undefined && (
                                          <button
                                            type="button"
                                            onClick={() => handleSeekTo(note.timestamp!)}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--color-accent_light)]/50 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white border border-[var(--color-accent)]/10 transition-all text-[11px] font-black cursor-pointer"
                                          >
                                            <PlayCircle size={10} className="shrink-0" />
                                            <span>{formatNoteTimestamp(note.timestamp)}</span>
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-sm font-semibold leading-relaxed text-[var(--color-text-primary)] break-words whitespace-pre-wrap">
                                        {note.text}
                                      </p>
                                    </div>

                                    {/* Action buttons (Edit & Trash) */}
                                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => startEditingNote(note.id, note.text)}
                                        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-background-secondary)] p-1.5 rounded-lg transition-colors bg-transparent border-none outline-none cursor-pointer"
                                        title="Edit note"
                                      >
                                        <Edit2 size={12} />
                                      </button>
                                      <button
                                        onClick={() => deleteNote(note.id)}
                                        className="text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-[var(--color-background-secondary)] p-1.5 rounded-lg transition-colors bg-transparent border-none outline-none cursor-pointer"
                                        title="Delete note"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="text-[10px] font-bold text-[var(--color-text-tertiary)] leading-none mt-1">
                                    {new Date(note.createdAt).toLocaleDateString(undefined, {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </div>
                                </>
                              )}
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
