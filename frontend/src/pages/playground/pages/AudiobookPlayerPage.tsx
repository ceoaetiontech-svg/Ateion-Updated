import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, Headphones, Play, Pause, RotateCcw, RotateCw, 
  Volume2, Volume1, VolumeX, Clock, List, FileText, Plus, BookMarked, Settings, 
  Sparkles, Check, Hourglass, Trash2, Edit2, Download, Loader2 
} from "lucide-react";
import { mockAudiobooks } from "../shared/audiobooksData";
import { fadeUpItem, staggerContainer } from "../shared/types";
import { useToast } from "../../admin/utils/toast";

export default function AudiobookPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ab = mockAudiobooks.find((book) => book.id === id);

  if (!ab) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <Headphones size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold">Audiobook Not Found</h3>
        <button onClick={() => navigate("/playground/audiobooks")} className="mt-4 px-5 py-2 bg-[var(--color-accent)] text-white rounded-xl">
          Back to Library
        </button>
      </div>
    );
  }

  // Audio References & State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { showToast } = useToast();

  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); // in seconds
  const [activeTab, setActiveTab] = useState<"chapters" | "notes">("chapters");
  
  // Volume state
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem("ateion-ab-volume");
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  // Buffering & Error tracking
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Bookmarks/Notes State
  const [notes, setNotes] = useState<{ id: string; timestamp: number; text: string }[]>(() => {
    const saved = localStorage.getItem(`ateion-ab-notes-${ab.id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [noteInput, setNoteInput] = useState("");
  const [autoPauseOnType, setAutoPauseOnType] = useState(() => {
    const saved = localStorage.getItem("ateion-ab-autopause");
    return saved ? JSON.parse(saved) : true;
  });
  const [wasPlayingBeforeFocus, setWasPlayingBeforeFocus] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  
  // Resume State Prompt
  const [hasResumeState, setHasResumeState] = useState(false);
  const [resumeData, setResumeData] = useState<{ chapterIdx: number; time: number } | null>(null);

  const currentChapter = ab.chapters[currentChapterIdx];

  // 1. Initial Load & LocalStorage Check
  useEffect(() => {
    const savedProgress = localStorage.getItem(`ateion-ab-progress-${ab.id}`);
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setResumeData(data);
      setHasResumeState(true);
    }
  }, [ab.id]);

  // 2. Playback speed adjustment
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, currentChapterIdx]);

  // 3. Sleep Timer Countdown
  useEffect(() => {
    if (sleepTimer !== null) {
      if (sleepTimer <= 0) {
        handlePause();
        setSleepTimer(null);
        return;
      }
      const interval = setInterval(() => {
        setSleepTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sleepTimer]);

  // 4. Save Notes to LocalStorage
  useEffect(() => {
    localStorage.setItem(`ateion-ab-notes-${ab.id}`, JSON.stringify(notes));
  }, [notes, ab.id]);

  // 5. Periodic Playback Position Saving
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (audioRef.current) {
          localStorage.setItem(
            `ateion-ab-progress-${ab.id}`,
            JSON.stringify({ chapterIdx: currentChapterIdx, time: audioRef.current.currentTime })
          );
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentChapterIdx, ab.id]);

  // 6. Volume Control Effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 7. Save Volume settings
  useEffect(() => {
    localStorage.setItem("ateion-ab-volume", volume.toString());
  }, [volume]);

  // 8. Save AutoPause Settings
  useEffect(() => {
    localStorage.setItem("ateion-ab-autopause", JSON.stringify(autoPauseOnType));
  }, [autoPauseOnType]);

  // 9. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === "INPUT" || 
         activeEl.tagName === "TEXTAREA" || 
         (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleSkip(-15);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleSkip(15);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentChapterIdx, trackDuration, currentTime, autoPauseOnType]);

  const onWaiting = () => setIsBuffering(true);
  const onPlaying = () => setIsBuffering(false);
  const onCanPlay = () => {
    setIsBuffering(false);
    setHasError(false);
  };
  const onError = () => {
    setIsBuffering(false);
    setHasError(true);
    showToast("Failed to load audio track. Please check your internet connection.", "error");
  };

  // Playback Control Handlers
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Playback error:", e));
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) handlePause();
    else handlePlay();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTrackDuration(audioRef.current.duration);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      let nextTime = audioRef.current.currentTime + seconds;
      if (nextTime < 0) nextTime = 0;
      if (nextTime > trackDuration) nextTime = trackDuration;
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleSelectChapter = (idx: number, seekToTime = 0) => {
    setCurrentChapterIdx(idx);
    setCurrentTime(seekToTime);
    setIsPlaying(false);
    
    // Quick load audio chapter
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = seekToTime;
        handlePlay();
      }
    }, 100);
  };

  const handleAudioEnded = () => {
    if (currentChapterIdx < ab.chapters.length - 1) {
      handleSelectChapter(currentChapterIdx + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      localStorage.removeItem(`ateion-ab-progress-${ab.id}`);
    }
  };

  const handleResume = () => {
    if (resumeData) {
      handleSelectChapter(resumeData.chapterIdx, resumeData.time);
    }
    setHasResumeState(false);
  };

  // Sleep Timer Selection
  const selectSleepTimer = (minutes: number | "chapter") => {
    if (minutes === "chapter") {
      const remainingChapterTime = trackDuration - currentTime;
      setSleepTimer(Math.round(remainingChapterTime));
    } else {
      setSleepTimer(minutes * 60);
    }
    setShowSleepMenu(false);
  };

  // Bookmarks/Notes Handlers
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      timestamp: currentTime,
      text: noteInput.trim(),
    };

    setNotes((prev) => [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp));
    setNoteInput("");

    if (autoPauseOnType && wasPlayingBeforeFocus) {
      handlePlay();
      setWasPlayingBeforeFocus(false);
    }
  };

  const handleNoteInputFocus = () => {
    if (autoPauseOnType && isPlaying) {
      handlePause();
      setWasPlayingBeforeFocus(true);
    }
  };

  const handleStartEditNote = (noteId: string, currentText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteId(noteId);
    setEditingNoteText(currentText);
  };

  const handleSaveEditNote = (noteId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteText.trim()) return;

    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, text: editingNoteText.trim() } : n))
    );
    setEditingNoteId(null);
  };

  const handleCancelEditNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNoteId(null);
  };

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (editingNoteId === noteId) {
      setEditingNoteId(null);
    }
  };

  const handleJumpToNote = (timestamp: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timestamp;
      setCurrentTime(timestamp);
      handlePlay();
    }
  };

  const handleVolumeToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) {
      setIsMuted(false);
    }
  };

  const handleExportNotes = () => {
    if (notes.length === 0) return;

    const markdownContent = `# Study Notes: ${ab.title}\nBy ${ab.author}\n\n` + 
      notes.map(note => `- **[${formatTime(note.timestamp)}]** ${note.text}`).join("\n");

    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${ab.title.replace(/\s+/g, "_")}_Notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Notes exported successfully!", "success");
  };

  // Formatting Helpers
  const formatTime = (timeInSecs: number) => {
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatSleepTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}m ${s}s`;
  };

  return (
    <motion.div
      className="space-y-6 max-w-5xl mx-auto pb-10"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <Helmet>
        <title>{ab.title} | Audio Player</title>
      </Helmet>

      {/* Back Button */}
      <motion.div variants={fadeUpItem}>
        <button
          onClick={() => navigate("/playground/audiobooks")}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Audio Library
        </button>
      </motion.div>

      {/* Resume Progress Dialog */}
      <AnimatePresence>
        {hasResumeState && resumeData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-accent)]/30 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <BookMarked size={18} />
              </div>
              <div>
                <p className="text-sm font-bold">Resume Listening?</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  We saved your progress at {ab.chapters[resumeData.chapterIdx]?.title.split(":")[0]} ({formatTime(resumeData.time)}).
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => setHasResumeState(false)}
                className="px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Start Over
              </button>
              <button
                onClick={handleResume}
                className="px-4 py-2 text-xs font-bold bg-[var(--color-accent)] text-white rounded-xl shadow-md cursor-pointer"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HTML Audio element */}
      <audio
        ref={audioRef}
        src={currentChapter.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onWaiting={onWaiting}
        onPlaying={onPlaying}
        onCanPlay={onCanPlay}
        onError={onError}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Immersive Player Controls */}
        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-1 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/60 backdrop-blur-xl p-6 shadow-[var(--shadow-lg)] relative overflow-hidden flex flex-col items-center"
        >
          <style>{`
            @keyframes wave-flow-1 {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes wave-flow-2 {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-wave-1 {
              animation: wave-flow-1 6s linear infinite;
            }
            .animate-wave-2 {
              animation: wave-flow-2 4s linear infinite;
            }
          `}</style>

          {/* Cover Art Glowing Aura */}
          <div
            className="absolute -top-20 w-44 h-44 rounded-full blur-[80px] opacity-40 transition-all"
            style={{ background: ab.coverUrl.startsWith("http") || ab.coverUrl.startsWith("data:") ? `url(${ab.coverUrl}) center/cover` : ab.coverUrl }}
          />

          {/* Cover Art Container */}
          <div 
            className="w-48 h-48 rounded-2xl flex items-center justify-center shadow-lg relative z-10 transition-transform duration-300 hover:scale-[1.03] overflow-hidden"
            style={{ background: ab.coverUrl.startsWith("http") || ab.coverUrl.startsWith("data:") ? `url(${ab.coverUrl}) center/cover` : ab.coverUrl }}
          >
            {!ab.coverUrl.startsWith("http") && !ab.coverUrl.startsWith("data:") && <Headphones size={64} className="text-white/25" />}
            
            {/* Play overlay */}
            <div className="absolute inset-0 rounded-2xl border-4 border-white/20 flex items-center justify-center bg-black/10">
              <div className={`w-8 h-8 rounded-full border border-dashed border-white/30 ${isPlaying && !isBuffering ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            </div>
          </div>

          {/* Title and Author */}
          <div className="text-center mt-6 w-full relative z-10">
            <h3 className="text-xl font-bold font-display line-clamp-1 text-[var(--color-text-primary)] leading-tight">{ab.title}</h3>
            <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-1">By {ab.author}</p>
            <p className="text-xs text-[var(--color-accent)] font-semibold mt-3 bg-[var(--color-accent)]/10 px-3 py-1 rounded-md inline-block max-w-full truncate">
              {currentChapter.title}
            </p>
          </div>

          {/* Wave Visualizer Box */}
          <div className="w-full h-12 relative overflow-hidden mt-4 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center z-10 border border-[var(--color-border-light)]/40">
            <div className="absolute inset-0 flex items-end">
              <svg className="w-[200%] h-10 text-[var(--color-accent)] pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ minWidth: '200%' }}>
                <path
                  d="M0 10 C 30 2, 70 18, 100 10 C 130 2, 170 18, 200 10 L 200 20 L 0 20 Z"
                  fill="currentColor"
                  className={`opacity-25 ${isPlaying && !isBuffering ? "animate-wave-1" : "transition-transform duration-1000"}`}
                  style={{ transform: isPlaying && !isBuffering ? undefined : 'translateY(4px)' }}
                />
                <path
                  d="M0 12 C 40 18, 60 2, 100 12 C 140 18, 160 2, 200 12 L 200 20 L 0 20 Z"
                  fill="currentColor"
                  className={`opacity-40 ${isPlaying && !isBuffering ? "animate-wave-2" : "transition-transform duration-1000"}`}
                  style={{ transform: isPlaying && !isBuffering ? undefined : 'translateY(4px)' }}
                />
              </svg>
            </div>
            <span className="text-[9px] font-extrabold tracking-widest uppercase opacity-60 relative z-10 select-none text-[var(--color-text-primary)]">
              {hasError ? "Load Error" : isBuffering ? "Buffering..." : isPlaying ? "Audio Live" : "Playback Paused"}
            </span>
          </div>

          {/* Seek progress Slider */}
          <div className="w-full mt-6 relative z-10">
            <input
              type="range"
              min={0}
              max={trackDuration || 100}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full accent-[var(--color-accent)] h-1.5 rounded-lg bg-[var(--color-background-tertiary)] cursor-pointer outline-none focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-tertiary)] font-semibold mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(trackDuration)}</span>
            </div>
          </div>

          {/* Audio controls row */}
          <div className="flex items-center gap-6 mt-3 relative z-10">
            <button
              onClick={() => handleSkip(-15)}
              className="p-2 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 hover:text-[var(--color-text-primary)] transition-all cursor-pointer"
              title="Rewind 15s"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/95 hover:scale-[1.05] active:scale-[0.95] text-white flex items-center justify-center shadow-md shadow-[var(--color-accent_light)] transition-all cursor-pointer disabled:opacity-50"
              disabled={hasError}
            >
              {isBuffering ? (
                <Loader2 size={24} className="animate-spin" />
              ) : isPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="p-2 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 hover:text-[var(--color-text-primary)] transition-all cursor-pointer"
              title="Fast Forward 15s"
            >
              <RotateCw size={20} />
            </button>
          </div>

          {/* Volume Control slider */}
          <div className="flex items-center gap-2.5 w-full mt-4 border-t border-[var(--color-border-light)]/40 pt-4 relative z-10 justify-center">
            <button
              onClick={handleVolumeToggleMute}
              className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={16} />
              ) : volume < 0.5 ? (
                <Volume1 size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-32 accent-[var(--color-accent)] h-1 rounded-lg bg-[var(--color-background-tertiary)] cursor-pointer outline-none"
            />
          </div>

          {/* Secondary Control Panels */}
          <div className="grid grid-cols-2 gap-3 w-full mt-8 border-t border-[var(--color-border-light)]/60 pt-6 relative z-10">
            
            {/* Speed Controller */}
            <div className="relative">
              <button
                onClick={() => { setShowSpeedMenu(!showSpeedMenu); setShowSleepMenu(false); }}
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--color-background-tertiary)]/40 hover:bg-[var(--color-background-tertiary)]/80 text-xs font-semibold flex items-center justify-between text-[var(--color-text-secondary)] border border-[var(--color-border-light)]/60 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Volume2 size={14} />
                  {playbackSpeed}x
                </span>
                <Settings size={12} className="opacity-60" />
              </button>

              <AnimatePresence>
                {showSpeedMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-2 w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setPlaybackSpeed(s); setShowSpeedMenu(false); }}
                        className={`w-full py-2 text-center text-xs font-semibold hover:bg-[var(--color-background-tertiary)] block cursor-pointer ${
                          playbackSpeed === s ? "text-[var(--color-accent)] bg-[var(--color-accent)]/5 font-bold" : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sleep Timer */}
            <div className="relative">
              <button
                onClick={() => { setShowSleepMenu(!showSleepMenu); setShowSpeedMenu(false); }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                  sleepTimer !== null 
                    ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30" 
                    : "bg-[var(--color-background-tertiary)]/40 hover:bg-[var(--color-background-tertiary)]/80 text-[var(--color-text-secondary)] border-[var(--color-border-light)]/60"
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Clock size={14} />
                  {sleepTimer !== null ? formatSleepTimer(sleepTimer) : "Sleep"}
                </span>
                <Hourglass size={12} className="opacity-60" />
              </button>

              <AnimatePresence>
                {showSleepMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 w-36 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    {sleepTimer !== null && (
                      <button
                        onClick={() => { setSleepTimer(null); setShowSleepMenu(false); }}
                        className="w-full py-2 px-3 text-left text-xs font-bold text-red-500 hover:bg-red-500/5 cursor-pointer border-b border-[var(--color-border-light)]"
                      >
                        Cancel Timer
                      </button>
                    )}
                    {[15, 30, 45, 60].map((t) => (
                      <button
                        key={t}
                        onClick={() => selectSleepTimer(t)}
                        className="w-full py-2 px-3 text-left text-xs font-semibold hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] cursor-pointer"
                      >
                        {t} Minutes
                      </button>
                    ))}
                    <button
                      onClick={() => selectSleepTimer("chapter")}
                      className="w-full py-2 px-3 text-left text-xs font-semibold hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] cursor-pointer"
                    >
                      End of Chapter
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

        {/* Right Side: Chapter Selection & Bookmarks Tab Panels */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tab Switcher Headers */}
          <div className="flex border-b border-[var(--color-border-light)] pb-px justify-between items-center">
            <div className="flex">
              <button
                onClick={() => setActiveTab("chapters")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "chapters"
                    ? "border-[var(--color-accent)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                <List size={16} />
                Chapters ({ab.chapters.length})
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "notes"
                    ? "border-[var(--color-accent)] text-[var(--color-text-primary)]"
                    : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                <FileText size={16} />
                Notes & Bookmarks ({notes.length})
              </button>
            </div>
            {activeTab === "notes" && notes.length > 0 && (
              <button
                onClick={handleExportNotes}
                className="pb-3 px-3 text-xs font-bold text-[var(--color-accent)] flex items-center gap-1 hover:opacity-85 transition-opacity cursor-pointer"
                title="Export notes to Markdown"
              >
                <Download size={14} /> Export (.md)
              </button>
            )}
          </div>

          {/* Tab Contents */}
          <div>
            {activeTab === "chapters" ? (
              <div className="space-y-3">
                {ab.chapters.map((chap, idx) => {
                  const isCurrent = currentChapterIdx === idx;
                  return (
                    <div
                      key={chap.id}
                      onClick={() => handleSelectChapter(idx)}
                      className={`p-4.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? "bg-[var(--color-accent)]/5 border-[var(--color-accent)]/40 shadow-sm"
                          : "bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)]/50 border-[var(--color-border-light)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent 
                            ? "bg-[var(--color-accent)] text-white" 
                            : "bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)]"
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className={`text-sm font-bold leading-snug ${isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                            {chap.title.split(":").slice(1).join(":").trim() || chap.title}
                          </p>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">
                            {formatTime(chap.duration)}
                          </p>
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="flex items-center gap-1 shrink-0">
                          {isPlaying && !isBuffering ? (
                            <span className="flex items-end gap-0.5 h-3">
                              <span className="w-0.75 bg-[var(--color-accent)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate]" style={{ height: "100%" }} />
                              <span className="w-0.75 bg-[var(--color-accent)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate_0.15s]" style={{ height: "40%" }} />
                              <span className="w-0.75 bg-[var(--color-accent)] rounded-full animate-[equalizer_0.8s_ease-in-out_infinite_alternate_0.3s]" style={{ height: "70%" }} />
                            </span>
                          ) : (
                            <Headphones size={14} className="text-[var(--color-accent)]" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Notes Creator Form */}
                <div className="space-y-3">
                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Save a note at ${formatTime(currentTime)}...`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] outline-none text-sm focus:border-[var(--color-accent)]"
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      onFocus={handleNoteInputFocus}
                    />
                    <button
                      type="submit"
                      className="px-4.5 bg-[var(--color-accent)] text-white font-bold rounded-xl text-sm flex items-center gap-1 cursor-pointer shrink-0 shadow-md shadow-[var(--color-accent_light)]"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </form>
                  
                  {/* Auto-pause toggle option */}
                  <label className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={autoPauseOnType}
                      onChange={(e) => setAutoPauseOnType(e.target.checked)}
                      className="rounded border-[var(--color-border-light)] text-[var(--color-accent)] focus:ring-[var(--color-accent)] w-3.5 h-3.5 accent-[var(--color-accent)]"
                    />
                    Auto-pause playback while writing note
                  </label>
                </div>

                {/* Saved Bookmarks Timeline */}
                <div className="space-y-3">
                  {notes.length > 0 ? (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => handleJumpToNote(note.timestamp)}
                        className="group p-4 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-background-tertiary)]/20 transition-all cursor-pointer flex items-start justify-between gap-4"
                      >
                        {editingNoteId === note.id ? (
                          <form
                            onSubmit={(e) => handleSaveEditNote(note.id, e)}
                            className="flex-1 flex gap-2 items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-[10px] font-bold tracking-wide text-white bg-[var(--color-accent)] px-2 py-0.75 rounded-md shrink-0">
                              {formatTime(note.timestamp)}
                            </span>
                            <input
                              type="text"
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value)}
                              className="flex-1 px-3 py-1.5 text-xs bg-[var(--color-background-primary)] border border-[var(--color-accent)] rounded-lg text-[var(--color-text-primary)] outline-none"
                              autoFocus
                            />
                            <button
                              type="submit"
                              className="px-2.5 py-1.5 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-lg cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEditNote}
                              className="px-2.5 py-1.5 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-[10px] font-bold rounded-lg cursor-pointer border border-[var(--color-border-light)]"
                            >
                              Cancel
                            </button>
                          </form>
                        ) : (
                          <>
                            <div className="flex gap-3 items-start">
                              <span className="text-[10px] font-bold tracking-wide text-white bg-[var(--color-accent)] px-2 py-0.75 rounded-md mt-0.5 shrink-0">
                                {formatTime(note.timestamp)}
                              </span>
                              <p className="text-sm text-[var(--color-text-primary)] font-medium leading-relaxed">
                                {note.text}
                              </p>
                            </div>
                            <div className="flex gap-1 shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleStartEditNote(note.id, note.text, e)}
                                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] p-1.5 hover:bg-[var(--color-accent)]/10 rounded-lg transition-colors cursor-pointer"
                                title="Edit Note"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={(e) => handleDeleteNote(note.id, e)}
                                className="text-[var(--color-text-tertiary)] hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Delete Note"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center text-[var(--color-text-tertiary)] bg-[var(--color-background-secondary)]/30 rounded-3xl border border-dashed border-[var(--color-border-light)]">
                      <BookMarked size={24} className="opacity-50 mb-2" />
                      <p className="text-sm font-semibold">No notes yet</p>
                      <p className="text-xs max-w-xs mt-0.5 leading-relaxed">Type a note above to bookmark key highlights. Clicking a note jumps audio playback back to that timestamp.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
