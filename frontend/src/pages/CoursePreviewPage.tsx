import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ChevronLeft, Play, ListVideo, Lock, Sparkles, Monitor, BookOpen } from "lucide-react";
import VideoPlayer from "./playground/components/VideoPlayer";
import { fetchPublicVideosByModule, type BackendVideo } from "../lib/videoApi";

export default function CoursePreviewPage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();

    const [videos, setVideos] = useState<BackendVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<BackendVideo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isWaking, setIsWaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [videoKey, setVideoKey] = useState(0);

    useEffect(() => {
        const parsedModuleId = Number(moduleId);

        if (!Number.isInteger(parsedModuleId) || parsedModuleId <= 0) {
            setError("This preview link contains an invalid module ID.");
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        const wakingTimer = window.setTimeout(() => setIsWaking(true), 1800);

        const load = async () => {
            setLoading(true);
            setIsWaking(false);
            setError(null);
            setVideos([]);
            setCurrentVideo(null);

            try {
                const data = await fetchPublicVideosByModule(
                    parsedModuleId,
                    controller.signal,
                );

                if (data.length === 0) {
                    setError("No preview videos are available for this module yet.");
                    return;
                }

                setVideos(data);
                setCurrentVideo(data[0]);
            } catch (loadError) {
                if (loadError instanceof DOMException && loadError.name === "AbortError") {
                    return;
                }

                console.error("Failed to load public course preview:", loadError);
                setError(
                    loadError instanceof Error
                        ? loadError.message
                        : "Failed to load this preview.",
                );
            } finally {
                window.clearTimeout(wakingTimer);
                if (!controller.signal.aborted) {
                    setLoading(false);
                    setIsWaking(false);
                }
            }
        };

        void load();

        return () => {
            window.clearTimeout(wakingTimer);
            controller.abort();
        };
    }, [moduleId, retryKey]);

    const playNext = useCallback(() => {
        if (!currentVideo || videos.length < 2) return;
        const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
        if (currentIndex < videos.length - 1) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentVideo(videos[currentIndex + 1]);
                setVideoKey(k => k + 1);
                setTransitioning(false);
            }, 300);
        }
    }, [currentVideo, videos]);

    const playPrevious = useCallback(() => {
        if (!currentVideo || videos.length < 2) return;
        const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
        if (currentIndex > 0) {
            setTransitioning(true);
            setTimeout(() => {
                setCurrentVideo(videos[currentIndex - 1]);
                setVideoKey(k => k + 1);
                setTransitioning(false);
            }, 300);
        }
    }, [currentVideo, videos]);

    const currentIndex = currentVideo ? videos.findIndex(v => v.id === currentVideo.id) : -1;
    const hasNext = currentIndex < videos.length - 1 && currentIndex < 0;
    const hasPrev = currentIndex > 0;

    return (
        <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background-primary)" }}>
            {/* Header */}
            <header
                className="flex items-center justify-between px-4 md:px-8 py-4 border-b sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-background-secondary)]/80 shadow-sm transition-all"
                style={{
                    borderColor: "var(--color-border-light)",
                }}
            >
                <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/playground/discover")}
                    className="flex items-center gap-1.5 text-sm font-bold transition-all hover:opacity-90 cursor-pointer"
                    style={{ color: "var(--color-accent)" }}
                >
                    <ChevronLeft size={16} /> Browse courses
                </motion.button>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 backdrop-blur-md shadow-sm">
                    <Monitor size={16} style={{ color: "var(--color-accent)" }} />
                    <span className="text-sm font-extrabold uppercase tracking-wide" style={{ color: "var(--color-accent)" }}>
                        Free Preview
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03, y: -0.5 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                    className="text-sm font-extrabold px-5 py-2.5 rounded-xl text-white transition-all hover:brightness-110 shadow-[0_4px_12px_rgba(214,111,85,0.25)] hover:shadow-[0_6px_20px_rgba(214,111,85,0.35)] cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                >
                    Sign up free
                </motion.button>
            </header>

            <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 md:py-10">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div
                            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                            style={{
                                borderColor: "var(--color-accent)",
                                borderTopColor: "transparent",
                            }}
                        />
                        <p className="mt-5 text-sm font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                            {isWaking
                                ? "The learning server is waking up. This can take a little longer on the free tier…"
                                : "Loading preview…"}
                        </p>
                        {isWaking && (
                            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-secondary)" }}>
                                <Sparkles size={14} className="text-amber-500" />
                                <span className="text-xs font-medium text-amber-600">Waking server</span>
                            </div>
                        )}
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-32">
                        <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "var(--color-background-secondary)" }}>
                            <BookOpen size={28} style={{ color: "var(--color-text-tertiary)" }} />
                        </div>
                        <p className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
                            {error}
                        </p>
                        <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
                            This preview may not be available yet or the link may be incorrect.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setRetryKey((value) => value + 1)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[15px] font-bold transition-all hover:brightness-110 shadow-[0_4px_12px_rgba(214,111,85,0.2)] cursor-pointer"
                                style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                            >
                                <RefreshCw size={16} /> Retry
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/playground/discover")}
                                className="px-6 py-3 rounded-xl text-[15px] font-bold border transition-all shadow-sm cursor-pointer bg-[var(--color-background-secondary)]/85 backdrop-blur-sm border-[var(--color-border-medium)] text-[var(--color-text-primary)]"
                            >
                                Browse courses
                            </motion.button>
                        </div>
                    </div>
                )}

                {!loading && !error && currentVideo && (
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                        {/* Video + Info */}
                        <div className="flex-1 min-w-0">
                            <div className="rounded-3xl overflow-hidden border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)]/50 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.2)] p-2 transition-all">
                                <div className="rounded-[18px] overflow-hidden relative">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={videoKey}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <VideoPlayer
                                                videoId={currentVideo.videoId}
                                                title={currentVideo.title}
                                                loading={false}
                                                error={null}
                                                onComplete={hasNext ? playNext : undefined}
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    {transitioning && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-[18px]">
                                            <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {videos.length > 1 && (
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={playPrevious}
                                                disabled={!hasPrev}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs font-extrabold ${
                                                    hasPrev
                                                        ? "bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                                                        : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                                                }`}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                                            </motion.button>
                                            <span className="text-xs font-extrabold text-[var(--color-text-tertiary)] min-w-[36px] text-center tabular-nums">
                                                {currentIndex + 1}/{videos.length}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={playNext}
                                                disabled={!hasNext}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs font-extrabold ${
                                                    hasNext
                                                        ? "bg-[var(--color-background-secondary)] border border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
                                                        : "bg-[var(--color-background-tertiary)]/50 border border-[var(--color-border-light)] text-[var(--color-text-tertiary)]/40 cursor-not-allowed"
                                                }`}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                                            </motion.button>
                                        </div>
                                    )}
                                </div>
                                <div 
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border-medium)]/60 text-xs font-bold bg-[var(--color-background-secondary)]/80 backdrop-blur-md shadow-sm"
                                >
                                    <span className="text-[var(--color-text-tertiary)]">
                                        Powered by
                                    </span>
                                    <span className="flex items-center gap-1 font-extrabold text-[var(--color-text-secondary)]">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.498 6.163c-.272-.98-1.04-1.748-2.02-2.02C19.716 3.745 12 3.745 12 3.745s-7.715 0-9.478.398c-.98.272-1.748 1.04-2.02 2.02C.104 7.928.104 12 .104 12s0 4.072.398 5.837c.272.98 1.04 1.748 2.02 2.02 1.763.398 9.478.398 9.478.398s7.715 0 9.478-.398c.98-.272 1.748-1.04 2.02-2.02.398-1.765.398-5.837.398-5.837s0-4.07-.398-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                        YouTube
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h1
                                    className="text-2xl md:text-[32px] font-black leading-tight tracking-tight text-[var(--color-text-primary)]"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {currentVideo.title}
                                </h1>
                                <div className="flex items-center gap-3 mt-4.5 flex-wrap">
                                    <span className="flex items-center gap-1.5 text-sm font-extrabold px-4 py-2 rounded-xl border border-[var(--color-accent)]/30 text-[var(--color-accent)] bg-[var(--color-accent)]/10 backdrop-blur-md shadow-sm">
                                        <Monitor size={14} /> Preview
                                    </span>
                                    <span className="text-sm font-bold text-[var(--color-text-secondary)]">
                                        {videos.length} video{videos.length > 1 ? "s" : ""} in this preview
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Lesson List - before CTA, hidden on desktop */}
                            {videos.length > 1 && (
                                <div className="mt-8 lg:hidden">
                                    <div className="rounded-[24px] border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)]/80 backdrop-blur-xl shadow-lg overflow-hidden">
                                        <div className="p-4 border-b border-[var(--color-border-light)]/60">
                                            <div className="flex items-center gap-2">
                                                <ListVideo size={18} style={{ color: "var(--color-accent)" }} />
                                                <span className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                    Preview Lessons
                                                </span>
                                                <span className="ml-auto text-sm font-bold px-2.5 py-0.5 rounded-lg" style={{ background: "var(--color-accent) / 12", color: "var(--color-accent)" }}>
                                                    {videos.length}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-2 flex flex-col gap-1.5 max-h-[600px] overflow-y-auto custom-scrollbar">
                                            {videos.map((video, index) => {
                                                const isActive = currentVideo.id === video.id;
                                                const isLocked = index > 0;
                                                return (
                                                    <motion.button
                                                        key={video.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                                                        whileHover={isLocked ? { scale: 1.01 } : { scale: 1.02, x: 2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => {
                                                            if (isLocked) {
                                                                window.dispatchEvent(new CustomEvent("open-register"));
                                                                return;
                                                            }
                                                            if (video.id !== currentVideo.id) {
                                                                setTransitioning(true);
                                                                setTimeout(() => {
                                                                    setCurrentVideo(video);
                                                                    setVideoKey(k => k + 1);
                                                                    setTransitioning(false);
                                                                }, 200);
                                                            }
                                                        }}
                                                        className={`w-full text-left flex items-start gap-3.5 p-3 rounded-2xl transition-all cursor-pointer ${
                                                             isActive 
                                                                 ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/35 text-[var(--color-accent)] shadow-[0_4px_20px_rgba(232,133,106,0.12)]" 
                                                                 : "border border-transparent hover:bg-[var(--color-background-tertiary)]/20 hover:border-[var(--color-border-light)]/40 text-[var(--color-text-primary)]"
                                                         } ${isLocked ? "opacity-70 hover:opacity-90" : ""}`}
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-sm font-extrabold transition-all ${
                                                                isActive 
                                                                    ? "bg-[var(--color-accent)] text-white shadow-[0_2px_8px_rgba(232,133,106,0.4)]" 
                                                                    : "bg-[var(--color-background-primary)] text-[var(--color-text-tertiary)]"
                                                            }`}
                                                        >
                                                            {isActive ? (
                                                                <Play size={12} className="fill-white stroke-[2.5]" />
                                                            ) : isLocked ? (
                                                                <Lock size={12} className="text-[var(--color-text-tertiary)]/80" />
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <span
                                                                className={`text-sm leading-snug line-clamp-2 font-bold ${
                                                                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"
                                                                }`}
                                                            >
                                                                {video.title}
                                                            </span>
                                                            <span className="text-[11px] font-bold mt-1.5 flex items-center gap-1 text-[var(--color-text-tertiary)]">
                                                                {isLocked ? (
                                                                    <>
                                                                        <Lock size={11} className="text-[var(--color-text-tertiary)]/70" /> Locked Lesson
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Monitor size={11} /> Preview Lesson
                                                                    </>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                        <div className="p-4 border-t border-[var(--color-border-light)]/60">
                                            <div className="flex flex-col gap-3.5 px-4.5 py-4.5 rounded-2xl bg-[var(--color-background-primary)]/50 backdrop-blur-md border border-[var(--color-border-light)]/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--color-accent)]/12 shrink-0 shadow-sm">
                                                        <Lock size={15} style={{ color: "var(--color-accent)" }} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className="text-sm font-extrabold text-[var(--color-text-primary)] block leading-tight">
                                                            Full course
                                                        </span>
                                                        <span className="text-xs text-[var(--color-text-tertiary)] block mt-0.5 font-medium leading-none">
                                                            Unlock all lessons
                                                        </span>
                                                    </div>
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                    className="w-full py-2.5 rounded-xl text-white text-[13px] font-black transition-all hover:brightness-110 shadow-[0_4px_12px_rgba(214,111,85,0.2)] cursor-pointer"
                                                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                                                >
                                                    Create an account
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div
                                className="mt-8 p-6 md:p-8 rounded-[24px] border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)]/70 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center"
                            >
                                {/* Animated backlight glow mesh */}
                                <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-accent)]/12 to-indigo-500/12 blur-3xl pointer-events-none" />
                                <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/8 to-[var(--color-accent)]/8 blur-3xl pointer-events-none" />

                                <div className="relative z-10 w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-[0_8px_20px_rgba(214,111,85,0.25)] animate-pulse"
                                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}>
                                    <Sparkles size={26} className="text-white" />
                                </div>
                                <h2 className="relative z-10 text-2xl font-black mb-1.5 text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                                    Enjoying the preview?
                                </h2>
                                <p className="relative z-10 text-[14px] text-[var(--color-text-secondary)] font-medium max-w-md mx-auto mb-6 leading-relaxed">
                                    Sign up to access the full course, track your learning insights, and earn your capability certificate.
                                </p>
                                <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.03, y: -0.5 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                        className="px-8 py-3 rounded-xl text-white font-extrabold text-[15px] transition-all hover:brightness-110 shadow-[0_4px_15px_rgba(214,111,85,0.25)] hover:shadow-[0_6px_20px_rgba(214,111,85,0.35)] cursor-pointer"
                                        style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                                    >
                                        Create an account
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.03, y: -0.5 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        onClick={() => navigate("/playground/discover")}
                                        className="px-6 py-3 rounded-xl text-[15px] font-bold border transition-all cursor-pointer bg-[var(--color-background-secondary)]/50 backdrop-blur-sm border-[var(--color-border-medium)] hover:bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]"
                                    >
                                        Browse all courses
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Sidebar - Lesson List, hidden on mobile */}
                        {videos.length > 1 && (
                            <div className="hidden lg:block lg:w-80 shrink-0">
                                <div className="lg:sticky lg:top-24 rounded-[24px] border border-[var(--color-border-medium)]/80 bg-[var(--color-background-secondary)]/80 backdrop-blur-xl shadow-lg overflow-hidden">
                                    <div className="p-4 border-b border-[var(--color-border-light)]/60">
                                        <div className="flex items-center gap-2">
                                            <ListVideo size={18} style={{ color: "var(--color-accent)" }} />
                                            <span className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                Preview Lessons
                                            </span>
                                            <span className="ml-auto text-sm font-bold px-2.5 py-0.5 rounded-lg" style={{ background: "var(--color-accent) / 12", color: "var(--color-accent)" }}>
                                                {videos.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2 flex flex-col gap-1.5 max-h-[600px] overflow-y-auto custom-scrollbar">
                                        {videos.map((video, index) => {
                                            const isActive = currentVideo.id === video.id;
                                            const isLocked = index > 0;
                                            return (
                                                <motion.button
                                                    key={video.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                                                    whileHover={isLocked ? { scale: 1.01 } : { scale: 1.02, x: 2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        if (isLocked) {
                                                            window.dispatchEvent(new CustomEvent("open-register"));
                                                            return;
                                                        }
                                                        if (video.id !== currentVideo.id) {
                                                            setTransitioning(true);
                                                            setTimeout(() => {
                                                                setCurrentVideo(video);
                                                                setVideoKey(k => k + 1);
                                                                setTransitioning(false);
                                                            }, 200);
                                                        }
                                                    }}
                                                    className={`w-full text-left flex items-start gap-3.5 p-3 rounded-2xl transition-all cursor-pointer ${
                                                        isActive 
                                                            ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/35 text-[var(--color-accent)] shadow-[0_4px_20px_rgba(232,133,106,0.12)]" 
                                                            : "border border-transparent hover:bg-[var(--color-background-tertiary)]/20 hover:border-[var(--color-border-light)]/40 text-[var(--color-text-primary)]"
                                                    } ${isLocked ? "opacity-70 hover:opacity-90" : ""}`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-sm font-extrabold transition-all ${
                                                            isActive 
                                                                ? "bg-[var(--color-accent)] text-white shadow-[0_2px_8px_rgba(232,133,106,0.4)]" 
                                                                : "bg-[var(--color-background-primary)] text-[var(--color-text-tertiary)]"
                                                        }`}
                                                    >
                                                        {isActive ? (
                                                            <Play size={12} className="fill-white stroke-[2.5]" />
                                                        ) : isLocked ? (
                                                            <Lock size={12} className="text-[var(--color-text-tertiary)]/80" />
                                                        ) : (
                                                            index + 1
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <span
                                                            className={`text-sm leading-snug line-clamp-2 font-bold ${
                                                                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"
                                                            }`}
                                                        >
                                                            {video.title}
                                                        </span>
                                                        <span className="text-[11px] font-bold mt-1.5 flex items-center gap-1 text-[var(--color-text-tertiary)]">
                                                            {isLocked ? (
                                                                <>
                                                                    <Lock size={11} className="text-[var(--color-text-tertiary)]/70" /> Locked Lesson
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Monitor size={11} /> Preview Lesson
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                    <div className="p-4 border-t border-[var(--color-border-light)]/60">
                                        <div className="flex flex-col gap-3.5 px-4.5 py-4.5 rounded-2xl bg-[var(--color-background-primary)]/50 backdrop-blur-md border border-[var(--color-border-light)]/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--color-accent)]/12 shrink-0 shadow-sm">
                                                    <Lock size={15} style={{ color: "var(--color-accent)" }} />
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="text-sm font-extrabold text-[var(--color-text-primary)] block leading-tight">
                                                        Full course
                                                    </span>
                                                    <span className="text-xs text-[var(--color-text-tertiary)] block mt-0.5 font-medium leading-none">
                                                        Unlock all lessons
                                                    </span>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                className="w-full py-2.5 rounded-xl text-white text-[13px] font-black transition-all hover:brightness-110 shadow-[0_4px_12px_rgba(214,111,85,0.2)] cursor-pointer"
                                                style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                                            >
                                                Create an account
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
