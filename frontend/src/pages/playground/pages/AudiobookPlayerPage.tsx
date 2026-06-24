import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Headphones, Play, Pause, List, FileText,
  Plus, BookMarked, Loader2, Download, Trash2, Edit2,
  SkipBack, SkipForward, Volume2, VolumeX, Music2
} from "lucide-react";
import { fadeUpItem, staggerContainer } from "../shared/types";
import { useToast } from "../../admin/utils/toast";
import bunnyListeningMusic from "../../../assets/bunny_listening_music.png";

interface ApiChapter {
  id: number;
  title: string;
  youtubeVideoId: string;
  durationSeconds: number;
  sortOrder: number;
}

interface ApiAudiobook {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl: string;
  chapters: ApiChapter[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const COVER_GRADIENTS = [
  "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
  "linear-gradient(135deg, #d97706 0%, #dc2626 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
  "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function formatDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ── YouTube IFrame API types ─────────────────────────────────────────────────
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function AudiobookPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // ── Data ──────────────────────────────────────────────────────────────────
  const [ab, setAb] = useState<ApiAudiobook | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ── Player state ──────────────────────────────────────────────────────────
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(1);          // playback rate
  const [progress, setProgress] = useState(0);        // 0-100
  const [currentTime, setCurrentTime] = useState(0);  // seconds
  const [duration, setDuration] = useState(0);        // seconds
  const [activeTab, setActiveTab] = useState<"chapters" | "notes">("chapters");
  const [ytReady, setYtReady] = useState(false);

  const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const nextSpeed = () => {
    setSpeed((s) => {
      const idx = SPEEDS.indexOf(s);
      const next = SPEEDS[(idx + 1) % SPEEDS.length];
      try { ytPlayerRef.current?.setPlaybackRate(next); } catch { /* ignore */ }
      return next;
    });
  };

  // ── Notes state ───────────────────────────────────────────────────────────
  const [notes, setNotes] = useState<{ id: string; timestamp: number; text: string }[]>([]);
  const [noteInput, setNoteInput] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  // ── YouTube Player ref ────────────────────────────────────────────────────
  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<number | null>(null);

  // ── Load audiobook ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchAb = async () => {
      try {
        const res = await fetch(`${API_BASE}/content/audiobooks/${id}`);
        if (!res.ok) {
          const res2 = await fetch(`${API_BASE}/content/audiobooks`);
          if (!res2.ok) throw new Error();
          const list: ApiAudiobook[] = await res2.json();
          const found = list.find((a) => String(a.id) === String(id));
          if (!found) { setNotFound(true); return; }
          setAb(found);
          const saved = localStorage.getItem(`ateion-ab-notes-${found.id}`);
          if (saved) setNotes(JSON.parse(saved));
        } else {
          const found: ApiAudiobook = await res.json();
          setAb(found);
          const saved = localStorage.getItem(`ateion-ab-notes-${found.id}`);
          if (saved) setNotes(JSON.parse(saved));
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAb();
  }, [id]);

  // ── Save notes ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (ab) localStorage.setItem(`ateion-ab-notes-${ab.id}`, JSON.stringify(notes));
  }, [notes, ab]);

  // ── Load YouTube IFrame API once ──────────────────────────────────────────
  useEffect(() => {
    if (window.YT && window.YT.Player) { setYtReady(true); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => setYtReady(true);
    return () => { /* intentionally kept */ };
  }, []);

  // ── Create / recreate player when chapter changes ─────────────────────────
  const createPlayer = useCallback((videoId: string, autoplay: boolean) => {
    if (!ytContainerRef.current || !window.YT) return;
    if (ytPlayerRef.current) {
      try { ytPlayerRef.current.destroy(); } catch { /* ignore */ }
      ytPlayerRef.current = null;
    }
    // Re-create a fresh <div> for the player
    const div = document.createElement("div");
    div.id = "yt-audio-player-inner";
    ytContainerRef.current.innerHTML = "";
    ytContainerRef.current.appendChild(div);

    ytPlayerRef.current = new window.YT.Player("yt-audio-player-inner", {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        disablekb: 1,
      },
      events: {
        onReady: (e: any) => {
          e.target.setVolume(volume);
          e.target.setPlaybackRate(speed);
          if (isMuted) e.target.mute();
          const dur = e.target.getDuration();
          if (dur) setDuration(dur);
          if (autoplay) e.target.playVideo();
        },
        onStateChange: (e: any) => {
          // 1 = playing, 2 = paused, 0 = ended
          if (e.data === 1) {
            setIsPlaying(true);
            const dur = e.target.getDuration();
            if (dur) setDuration(dur);
          } else if (e.data === 2) {
            setIsPlaying(false);
          } else if (e.data === 0) {
            // Auto-advance to next chapter
            setIsPlaying(false);
            setAb((prev) => {
              if (!prev) return prev;
              setCurrentChapterIdx((ci) => {
                const next = ci + 1 < prev.chapters.length ? ci + 1 : ci;
                return next;
              });
              return prev;
            });
          }
        },
      },
    });
  }, [volume, isMuted]);

  useEffect(() => {
    if (!ytReady || !ab) return;
    const chapter = ab.chapters[currentChapterIdx];
    if (!chapter?.youtubeVideoId) return;
    createPlayer(chapter.youtubeVideoId, isPlaying);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ytReady, ab, currentChapterIdx]);

  // ── Progress polling ──────────────────────────────────────────────────────
  useEffect(() => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (isPlaying) {
      progressTimerRef.current = window.setInterval(() => {
        try {
          const player = ytPlayerRef.current;
          if (!player) return;
          const ct: number = player.getCurrentTime?.() ?? 0;
          const dur: number = player.getDuration?.() ?? 0;
          setCurrentTime(ct);
          if (dur > 0) { setDuration(dur); setProgress((ct / dur) * 100); }
        } catch { /* ignore */ }
      }, 500);
    }
    return () => { if (progressTimerRef.current) clearInterval(progressTimerRef.current); };
  }, [isPlaying]);

  // ── Controls ──────────────────────────────────────────────────────────────
  const handlePlayPause = () => {
    const player = ytPlayerRef.current;
    if (!player) return;
    if (isPlaying) { player.pauseVideo(); setIsPlaying(false); }
    else { player.playVideo(); setIsPlaying(true); }
  };

  const handleSelectChapter = (idx: number) => {
    setCurrentChapterIdx(idx);
    setProgress(0); setCurrentTime(0); setDuration(0);
    setIsPlaying(true);
    if (ytReady && ab) {
      setTimeout(() => createPlayer(ab.chapters[idx].youtubeVideoId, true), 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const seekTo = pct * duration;
    try { ytPlayerRef.current?.seekTo(seekTo, true); } catch { /* ignore */ }
    setProgress(pct * 100); setCurrentTime(seekTo);
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    try { ytPlayerRef.current?.setVolume(val); } catch { /* ignore */ }
    if (val > 0 && isMuted) { setIsMuted(false); ytPlayerRef.current?.unMute(); }
  };

  const handleMuteToggle = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    try {
      if (muted) ytPlayerRef.current?.mute();
      else ytPlayerRef.current?.unMute();
    } catch { /* ignore */ }
  };

  const handleSkipBack = () => {
    const to = Math.max(0, currentTime - 5);
    try { ytPlayerRef.current?.seekTo(to, true); } catch { /* ignore */ }
    setCurrentTime(to); setProgress(duration > 0 ? (to / duration) * 100 : 0);
  };

  const handleSkipForward = () => {
    const to = Math.min(duration, currentTime + 5);
    try { ytPlayerRef.current?.seekTo(to, true); } catch { /* ignore */ }
    setCurrentTime(to); setProgress(duration > 0 ? (to / duration) * 100 : 0);
  };

  // ── Notes ─────────────────────────────────────────────────────────────────
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const newNote = { id: `note-${Date.now()}`, timestamp: currentTime, text: noteInput.trim() };
    setNotes((prev) => [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp));
    setNoteInput("");
  };

  const handleDeleteNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (editingNoteId === noteId) setEditingNoteId(null);
  };

  const handleStartEditNote = (noteId: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation(); setEditingNoteId(noteId); setEditingNoteText(text);
  };

  const handleSaveEditNote = (noteId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteText.trim()) return;
    setNotes((prev) => prev.map((n) => n.id === noteId ? { ...n, text: editingNoteText.trim() } : n));
    setEditingNoteId(null);
  };

  const handleExportNotes = () => {
    if (!ab || notes.length === 0) return;
    const md = `# Study Notes: ${ab.title}\nBy ${ab.author}\n\n` +
      notes.map((n) => `- **[${formatTime(n.timestamp)}]** ${n.text}`).join("\n");
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${ab.title.replace(/\s+/g, "_")}_Notes.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Notes exported!", "success");
  };

  // ── Cover style ───────────────────────────────────────────────────────────
  const coverStyle = (url: string): React.CSSProperties => {
    if (url && url.startsWith("http"))
      return { backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center" };
    return { background: COVER_GRADIENTS[0] };
  };

  // ── Guards ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-[var(--color-text-tertiary)]">
        <Loader2 size={36} className="animate-spin mb-3 text-[var(--color-accent)]" />
        <p className="text-sm">Loading audiobook...</p>
      </div>
    );
  }

  if (notFound || !ab || ab.chapters.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <Headphones size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold">Audiobook Not Found</h3>
        <button
          onClick={() => navigate("/playground/audiobooks")}
          className="mt-4 px-5 py-2 bg-[var(--color-accent)] text-white rounded-xl cursor-pointer"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const currentChapter = ab.chapters[currentChapterIdx];

  return (
    <motion.div
      className="space-y-6 max-w-5xl mx-auto pb-12"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <Helmet><title>{ab.title} | Audio Player</title></Helmet>

      {/* ── Hidden YouTube player (audio only) ─────────────────────────────── */}
      <div
        ref={ytContainerRef}
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden", pointerEvents: "none" }}
      />

      {/* Back */}
      <motion.div variants={fadeUpItem}>
        <button
          onClick={() => navigate("/playground/audiobooks")}
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Audio Library
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ══════════════════════════════════════════════════════════════════
            LEFT — Album art + Audio Player card
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUpItem}
          className="lg:col-span-1 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/80 backdrop-blur-xl p-6 shadow-[var(--shadow-lg)] relative overflow-hidden flex flex-col items-center gap-5"
        >
          {/* Animated glow behind cover */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full blur-[90px] opacity-30 pointer-events-none"
            style={coverStyle(ab.coverUrl)}
          />

          {/* Cover Art */}
          <div
            className="w-44 h-44 rounded-2xl shadow-xl relative z-10 overflow-hidden flex items-center justify-center"
            style={coverStyle(ab.coverUrl)}
          >
            {ab.id === "ab-system-design" ? (
              <motion.img
                src={bunnyListeningMusic}
                alt="Listening Bunny"
                className="w-full h-full object-contain p-2.5 relative z-20"
                animate={isPlaying && !isBuffering ? {
                  y: [0, -8, 0],
                  scale: [1, 1.03, 1],
                  rotate: [0, -1.5, 1.5, 0],
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "easeInOut"
                }}
              />
            ) : (
              !ab.coverUrl.startsWith("http") && !ab.coverUrl.startsWith("data:") && <Headphones size={64} className="text-white/25" />
            )}
            
            {/* Play overlay */}
            <div className="absolute inset-0 rounded-2xl border-4 border-white/20 flex items-center justify-center bg-black/10">
              <div className={`w-8 h-8 rounded-full border border-dashed border-white/30 ${isPlaying && !isBuffering ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
            </div>
          </div>

          {/* Title & author */}
          <div className="text-center w-full relative z-10">
            <h3 className="text-lg font-extrabold line-clamp-2 text-[var(--color-text-primary)] leading-tight">{ab.title}</h3>
            <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-1">By {ab.author}</p>
            <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1 rounded-full max-w-full truncate">
              {currentChapter.title}
            </span>
          </div>

          {/* Waveform visualiser */}
          <div className="w-full h-10 relative overflow-hidden rounded-xl bg-black/5 border border-[var(--color-border-light)]/40 z-10 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full text-[var(--color-accent)] pointer-events-none"
              viewBox="0 0 400 40"
              preserveAspectRatio="none"
            >
              <path
                d="M0 20 C 50 6, 100 34, 150 20 C 200 6, 250 34, 300 20 C 350 6, 400 34, 450 20 L 450 40 L 0 40 Z"
                fill="currentColor"
                className={`opacity-20 ${isPlaying ? "origin-center" : ""}`}
                style={isPlaying ? { animation: "waveScroll 4s linear infinite" } : {}}
              />
              <path
                d="M0 22 C 60 34, 120 8, 180 22 C 240 36, 300 8, 360 22 C 400 32, 430 14, 450 22 L 450 40 L 0 40 Z"
                fill="currentColor"
                className="opacity-30"
                style={isPlaying ? { animation: "waveScroll 2.5s linear infinite reverse" } : {}}
              />
            </svg>
            <Music2
              size={13}
              className="relative z-10 text-[var(--color-accent)] mr-1.5 shrink-0"
            />
            <span className="text-[9px] font-extrabold tracking-widest uppercase relative z-10 text-[var(--color-text-secondary)]">
              {isPlaying ? "Now Playing" : "Paused"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full relative z-10 space-y-1">
            <div
              className="w-full h-2 rounded-full bg-[var(--color-background-tertiary)] cursor-pointer group relative overflow-hidden"
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)]/70 transition-all"
                style={{ width: `${progress}%` }}
              />
              {/* Thumb dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 border-[var(--color-accent)] transition-all"
                style={{ left: `calc(${progress}% - 7px)` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[var(--color-text-tertiary)] font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : formatDuration(currentChapter.durationSeconds)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-5 z-10">
            <button
              onClick={handleSkipBack}
              title="-5s"
              className="w-9 h-9 flex flex-col items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer"
            >
              <SkipBack size={18} />
              <span className="text-[8px] font-bold -mt-0.5 opacity-70">5s</span>
            </button>

            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              {isPlaying
                ? <Pause size={26} fill="currentColor" />
                : <Play size={26} fill="currentColor" className="ml-1" />}
            </button>

            <button
              onClick={handleSkipForward}
              title="+5s"
              className="w-9 h-9 flex flex-col items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer"
            >
              <SkipForward size={18} />
              <span className="text-[8px] font-bold -mt-0.5 opacity-70">5s</span>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-full z-10">
            <button
              onClick={handleMuteToggle}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer shrink-0"
            >
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="flex-1 h-1.5 rounded-full accent-[var(--color-accent)] cursor-pointer"
            />
          </div>

          {/* Speed control */}
          <div className="flex items-center justify-between w-full z-10">
            <button
              onClick={nextSpeed}
              className="px-3 py-1.5 rounded-xl bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] text-xs font-bold text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all cursor-pointer"
              title="Click to change speed"
            >
              {speed === 1 ? "1x" : `${speed}x`} Speed
            </button>
            <span className="text-[10px] text-[var(--color-text-tertiary)]">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSpeed(s); try { ytPlayerRef.current?.setPlaybackRate(s); } catch { /* ignore */ } }}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition-all text-[10px] font-semibold ${
                    speed === s ? "text-[var(--color-accent)] font-bold" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </span>
          </div>

          {/* Chapter info */}
          <p className="text-[10px] text-[var(--color-text-tertiary)] text-center z-10 leading-relaxed">
            Chapter {currentChapterIdx + 1} of {ab.chapters.length}
          </p>

          <style>{`
            @keyframes waveScroll { from { transform: translateX(0); } to { transform: translateX(-40%); } }
          `}</style>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT — Chapters / Notes tabs
        ══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-2 space-y-5">

          {/* Tabs header */}
          <motion.div variants={fadeUpItem}>
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
                  <List size={16} /> Chapters ({ab.chapters.length})
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "notes"
                      ? "border-[var(--color-accent)] text-[var(--color-text-primary)]"
                      : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                  }`}
                >
                  <FileText size={16} /> Notes ({notes.length})
                </button>
              </div>
              {activeTab === "notes" && notes.length > 0 && (
                <button
                  onClick={handleExportNotes}
                  className="pb-3 px-3 text-xs font-bold text-[var(--color-accent)] flex items-center gap-1 hover:opacity-80 cursor-pointer"
                >
                  <Download size={14} /> Export (.md)
                </button>
              )}
            </div>
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "chapters" ? (
              <motion.div
                key="chapters"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {ab.chapters.map((chap, idx) => {
                  const isCurrent = currentChapterIdx === idx;
                  return (
                    <motion.div
                      key={chap.id}
                      variants={fadeUpItem}
                      onClick={() => handleSelectChapter(idx)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? "bg-[var(--color-accent)]/6 border-[var(--color-accent)]/40 shadow-sm"
                          : "bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)]/50 border-[var(--color-border-light)]"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)]"
                        }`}>
                          {isCurrent && isPlaying ? (
                            <span className="flex items-end gap-0.5 h-4">
                              <span className="w-0.5 bg-white rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate]" style={{ height: "100%" }} />
                              <span className="w-0.5 bg-white rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate_0.15s]" style={{ height: "50%" }} />
                              <span className="w-0.5 bg-white rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_alternate_0.3s]" style={{ height: "80%" }} />
                            </span>
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold leading-snug truncate ${isCurrent ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                            {chap.title}
                          </p>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{formatDuration(chap.durationSeconds)}</p>
                        </div>
                      </div>
                      {isCurrent && !isPlaying && (
                        <Headphones size={16} className="text-[var(--color-accent)] shrink-0 ml-2" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="notes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Add a note at ${formatTime(currentTime)}...`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] outline-none text-sm focus:border-[var(--color-accent)]"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[var(--color-accent)] text-white font-bold rounded-xl text-sm flex items-center gap-1 cursor-pointer shrink-0 shadow-md"
                  >
                    <Plus size={16} /> Add
                  </button>
                </form>

                {notes.length > 0 ? (
                  notes.map((note) => (
                    <div key={note.id} className="group p-4 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 transition-all flex items-start justify-between gap-4">
                      {editingNoteId === note.id ? (
                        <form onSubmit={(e) => handleSaveEditNote(note.id, e)} className="flex-1 flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
                          <span className="text-[10px] font-bold text-white bg-[var(--color-accent)] px-2 py-0.5 rounded-md shrink-0">{formatTime(note.timestamp)}</span>
                          <input
                            type="text"
                            value={editingNoteText}
                            onChange={(e) => setEditingNoteText(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs bg-[var(--color-background-primary)] border border-[var(--color-accent)] rounded-lg text-[var(--color-text-primary)] outline-none"
                            autoFocus
                          />
                          <button type="submit" className="px-2.5 py-1.5 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-lg cursor-pointer">Save</button>
                          <button type="button" onClick={() => setEditingNoteId(null)} className="px-2.5 py-1.5 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-[10px] font-bold rounded-lg cursor-pointer">Cancel</button>
                        </form>
                      ) : (
                        <>
                          <div className="flex gap-3 items-start">
                            <span className="text-[10px] font-bold text-white bg-[var(--color-accent)] px-2 py-0.5 rounded-md mt-0.5 shrink-0">{formatTime(note.timestamp)}</span>
                            <p className="text-sm text-[var(--color-text-primary)] font-medium leading-relaxed">{note.text}</p>
                          </div>
                          <div className="flex gap-1 shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => handleStartEditNote(note.id, note.text, e)} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] p-1.5 hover:bg-[var(--color-accent)]/10 rounded-lg cursor-pointer"><Edit2 size={14} /></button>
                            <button onClick={(e) => handleDeleteNote(note.id, e)} className="text-[var(--color-text-tertiary)] hover:text-red-500 p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-14 flex flex-col items-center text-center text-[var(--color-text-tertiary)] bg-[var(--color-background-secondary)]/30 rounded-3xl border border-dashed border-[var(--color-border-light)]">
                    <BookMarked size={24} className="opacity-50 mb-2" />
                    <p className="text-sm font-semibold">No notes yet</p>
                    <p className="text-xs mt-0.5 max-w-xs leading-relaxed">Add notes while listening to keep track of key ideas.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
