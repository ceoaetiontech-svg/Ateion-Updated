import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RefreshCw, ChevronLeft, Play, ListVideo, Lock, Sparkles, Monitor, BookOpen } from "lucide-react";
import VideoPlayer from "./playground/components/VideoPlayer";
import { fetchPublicVideosByModule, type BackendVideo } from "../lib/videoApi";

const MODULE_COLORS = [
    "#E8856A", // Coral
    "#14b8a6", // Teal
    "#6366f1", // Indigo
    "#f59e0b", // Amber
    "#58cc02", // Green
];

const getModuleColor = (moduleId?: number | string) => {
    const id = Number(moduleId) || 0;
    return MODULE_COLORS[id % MODULE_COLORS.length];
};

export default function CoursePreviewPage() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const navigate = useNavigate();
    const accentColor = getModuleColor(moduleId);

    const [videos, setVideos] = useState<BackendVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<BackendVideo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isWaking, setIsWaking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);

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

    return (
        <div className="min-h-screen flex flex-col bg-[#0B0A14] text-slate-100 relative overflow-hidden">
            {/* Ambient page-level background glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] blur-[150px] opacity-20 pointer-events-none z-0" 
              style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }} 
            />

            {/* Header */}
            <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b sticky top-0 z-50 backdrop-blur-md bg-[#0B0A14]/75 border-white/10">
                <button
                    onClick={() => navigate("/playground/discover")}
                    className="flex items-center gap-1.5 text-sm font-bold transition-all hover:opacity-85 cursor-pointer"
                    style={{ color: accentColor }}
                >
                    <ChevronLeft size={16} /> Browse courses
                </button>
                
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-white/10 bg-white/5 shadow-sm">
                    <Monitor size={16} style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Free Preview
                    </span>
                </div>
                
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                    className="text-xs font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 58%, #ff9b82 100%)` }}
                >
                    Sign up free
                </button>
            </header>

            <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 md:py-10 z-10 relative">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div
                            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                            style={{
                                borderColor: accentColor,
                                borderTopColor: "transparent",
                            }}
                        />
                        <p className="mt-5 text-sm font-semibold text-slate-400">
                            {isWaking
                                ? "The learning server is waking up. This can take a little longer on the free tier…"
                                : "Loading preview…"}
                        </p>
                        {isWaking && (
                            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                                <span className="text-xs font-medium text-amber-500">Waking server</span>
                            </div>
                        )}
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-32">
                        <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center bg-white/5 border border-white/10">
                            <BookOpen size={28} style={{ color: "rgba(255,255,255,0.4)" }} />
                        </div>
                        <p className="text-lg font-bold mb-2 text-white">
                            {error}
                        </p>
                        <p className="text-sm mb-6 text-slate-400">
                            This preview may not be available yet or the link may be incorrect.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => setRetryKey((value) => value + 1)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                                style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 58%, #ff9b82 100%)` }}
                            >
                                <RefreshCw size={14} /> Retry
                            </button>
                            <button
                                onClick={() => navigate("/playground/discover")}
                                className="px-6 py-3 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                            >
                                Browse courses
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && currentVideo && (
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                        {/* Video + Info */}
                        <div className="flex-1 min-w-0">
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.5)] relative bg-black">
                                {/* Video ambient glow container */}
                                <div 
                                    className="absolute inset-0 -z-10 opacity-20 blur-[50px] pointer-events-none scale-105" 
                                    style={{ background: `radial-gradient(circle, ${accentColor}, transparent 80%)` }} 
                                />
                                
                                <VideoPlayer
                                    videoId={currentVideo.videoId}
                                    title={currentVideo.title}
                                    loading={false}
                                    error={null}
                                />
                            </div>

                            <div className="mt-5">
                                <h1
                                    className="text-2xl md:text-3xl font-black leading-tight text-white tracking-tight"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    {currentVideo.title}
                                </h1>
                                <div className="flex items-center gap-3 mt-3 flex-wrap">
                                    <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg border border-white/10 bg-white/5"
                                        style={{ color: accentColor }}>
                                        <Monitor size={12} /> Preview
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {videos.length} video{videos.length > 1 ? "s" : ""} in this preview
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Lesson List - before CTA, hidden on desktop */}
                            {videos.length > 1 && (
                                <div className="mt-8 lg:hidden">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden">
                                        <div className="p-4 border-b border-white/10 bg-white/5">
                                            <div className="flex items-center gap-2">
                                                <ListVideo size={16} style={{ color: accentColor }} />
                                                <span className="text-sm font-bold text-white">
                                                    Preview Lessons
                                                </span>
                                                <span className="ml-auto text-xs font-extrabold px-2 py-0.5 rounded-md text-white bg-white/10">
                                                    {videos.length}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-2 flex flex-col gap-1">
                                            {videos.map((video, index) => {
                                                const isActive = currentVideo.id === video.id;
                                                return (
                                                    <button
                                                        key={video.id}
                                                        onClick={() => setCurrentVideo(video)}
                                                        className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/5 cursor-pointer"
                                                        style={{
                                                            background: isActive ? `${accentColor}15` : "transparent",
                                                            border: isActive ? `1px solid ${accentColor}30` : "1px solid transparent",
                                                        }}
                                                    >
                                                        <div
                                                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                                                            style={{
                                                                background: isActive ? accentColor : "rgba(255,255,255,0.05)",
                                                                color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                                                            }}
                                                        >
                                                            {isActive ? <Play size={11} className="fill-white text-white" /> : index + 1}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span
                                                                className="text-sm leading-snug line-clamp-2 font-semibold"
                                                                style={{
                                                                    color: isActive ? accentColor : "#fff",
                                                                }}
                                                            >
                                                                {video.title}
                                                            </span>
                                                            <span className="text-[10px] font-semibold mt-1 flex items-center gap-1 text-slate-400">
                                                                <Monitor size={10} /> Preview
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="p-4 border-t border-white/10 bg-white/5">
                                            <div className="flex flex-col gap-3 px-4 py-4 rounded-xl bg-black/20">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                                                        <Lock size={14} style={{ color: accentColor }} />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold text-white">
                                                            Full course
                                                        </span>
                                                        <span className="text-[11px] block text-slate-400">
                                                            Sign up to unlock all lessons
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                                                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 58%, #ff9b82 100%)` }}
                                                >
                                                    Create an account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div
                                className="mt-8 p-8 rounded-2xl border border-white/10 text-center relative overflow-hidden shadow-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(26,24,51,0.6) 0%, rgba(18,17,31,0.6) 100%)",
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[120%] rounded-full bg-[var(--accent-glow)] opacity-10 blur-[80px] pointer-events-none" style={{ '--accent-glow': accentColor } as any} />
                                
                                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10"
                                    style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 100%)` }}>
                                    <Sparkles size={24} className="text-white" />
                                </div>
                                <p className="text-xl font-bold mb-1 text-white relative z-10">
                                    Enjoying the preview?
                                </p>
                                <p className="text-sm mb-5 text-slate-400 max-w-md mx-auto relative z-10">
                                    Sign up to access the full course, track progress, and earn certificates.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                        className="px-8 py-3 rounded-xl text-white font-bold text-xs transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg cursor-pointer"
                                        style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 58%, #ff9b82 100%)` }}
                                    >
                                        Create an account
                                    </button>
                                    <button
                                        onClick={() => navigate("/playground/discover")}
                                        className="px-6 py-3 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
                                    >
                                        Browse all courses
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Sidebar - Lesson List, hidden on mobile */}
                        {videos.length > 1 && (
                            <div className="hidden lg:block lg:w-80 shrink-0">
                                <div className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden">
                                    <div className="p-4 border-b border-white/10 bg-white/5">
                                        <div className="flex items-center gap-2">
                                            <ListVideo size={16} style={{ color: accentColor }} />
                                            <span className="text-sm font-bold text-white">
                                                Preview Lessons
                                            </span>
                                            <span className="ml-auto text-xs font-extrabold px-2 py-0.5 rounded-md text-white bg-white/10">
                                                {videos.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2 flex flex-col gap-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                                        {videos.map((video, index) => {
                                            const isActive = currentVideo.id === video.id;
                                            return (
                                                <button
                                                    key={video.id}
                                                    onClick={() => setCurrentVideo(video)}
                                                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-white/5 cursor-pointer"
                                                    style={{
                                                        background: isActive ? `${accentColor}15` : "transparent",
                                                        border: isActive ? `1px solid ${accentColor}30` : "1px solid transparent",
                                                    }}
                                                >
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                                                        style={{
                                                            background: isActive ? accentColor : "rgba(255,255,255,0.05)",
                                                            color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                                                        }}
                                                    >
                                                        {isActive ? <Play size={11} className="fill-white text-white" /> : index + 1}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span
                                                            className="text-sm leading-snug line-clamp-2 font-semibold"
                                                            style={{
                                                                color: isActive ? accentColor : "#fff",
                                                            }}
                                                        >
                                                            {video.title}
                                                        </span>
                                                        <span className="text-[10px] font-semibold mt-1 flex items-center gap-1 text-slate-400">
                                                            <Monitor size={10} /> Preview
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="p-4 border-t border-white/10 bg-white/5">
                                        <div className="flex flex-col gap-3 px-4 py-4 rounded-xl bg-black/20">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                                                    <Lock size={14} style={{ color: accentColor }} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold text-white">
                                                        Full course
                                                    </span>
                                                    <span className="text-[11px] block text-slate-400">
                                                        Sign up to unlock all lessons
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                                                style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #d66f55 58%, #ff9b82 100%)` }}
                                            >
                                                Create an account
                                            </button>
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
