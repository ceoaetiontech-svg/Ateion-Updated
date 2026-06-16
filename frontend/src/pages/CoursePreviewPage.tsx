import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
        <div className="min-h-screen flex flex-col" style={{ background: "var(--color-background-primary)" }}>
            {/* Header */}
            <header
                className="flex items-center justify-between px-4 md:px-8 py-4 border-b sticky top-0 z-50 backdrop-blur-md"
                style={{
                    background: "var(--color-background-secondary)",
                    borderColor: "var(--color-border-light)",
                }}
            >
                <button
                    onClick={() => navigate("/playground/discover")}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: "var(--color-accent)" }}
                >
                    <ChevronLeft size={16} /> Browse courses
                </button>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl border-2" style={{ borderColor: "var(--color-accent)", background: "var(--color-accent) / 8" }}>
                    <Monitor size={16} style={{ color: "var(--color-accent)" }} />
                    <span className="text-sm font-bold" style={{ color: "var(--color-accent)" }}>
                        Free Preview
                    </span>
                </div>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                    className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-all hover:brightness-110 shadow-md"
                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                >
                    Sign up free
                </button>
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
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => setRetryKey((value) => value + 1)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-md"
                                style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                            >
                                <RefreshCw size={16} /> Retry
                            </button>
                            <button
                                onClick={() => navigate("/playground/discover")}
                                className="px-6 py-3 rounded-xl text-sm font-bold border transition-all hover:shadow-md"
                                style={{
                                    color: "var(--color-text-primary)",
                                    borderColor: "var(--color-border-medium)",
                                }}
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
                            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--color-border-light)" }}>
                                <VideoPlayer
                                    videoId={currentVideo.videoId}
                                    title={currentVideo.title}
                                    loading={false}
                                    error={null}
                                />
                            </div>

                            <div className="mt-5">
                                <h1
                                    className="text-2xl md:text-3xl font-bold leading-tight"
                                    style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
                                >
                                    {currentVideo.title}
                                </h1>
                                <div className="flex items-center gap-3 mt-3 flex-wrap">
                                    <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg border"
                                        style={{ borderColor: "var(--color-border-light)", color: "var(--color-accent)" }}>
                                        <Monitor size={12} /> Preview
                                    </span>
                                    <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                                        {videos.length} video{videos.length > 1 ? "s" : ""} in this preview
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Lesson List - before CTA, hidden on desktop */}
                            {videos.length > 1 && (
                                <div className="mt-8 lg:hidden">
                                    <div className="rounded-2xl border" style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-secondary)" }}>
                                        <div className="p-4 border-b" style={{ borderColor: "var(--color-border-light)" }}>
                                            <div className="flex items-center gap-2">
                                                <ListVideo size={16} style={{ color: "var(--color-accent)" }} />
                                                <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                    Preview Lessons
                                                </span>
                                                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: "var(--color-accent) / 12", color: "var(--color-accent)" }}>
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
                                                        className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all"
                                                        style={{
                                                            background: isActive ? "var(--color-accent) / 10" : "transparent",
                                                            border: isActive ? "1px solid var(--color-accent) / 25" : "1px solid transparent",
                                                        }}
                                                    >
                                                        <div
                                                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                                                            style={{
                                                                background: isActive ? "var(--color-accent)" : "var(--color-background-primary)",
                                                                color: isActive ? "#fff" : "var(--color-text-tertiary)",
                                                            }}
                                                        >
                                                            {isActive ? <Play size={11} className="fill-white" /> : index + 1}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span
                                                                className="text-sm leading-snug line-clamp-2 font-medium"
                                                                style={{
                                                                    color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
                                                                }}
                                                            >
                                                                {video.title}
                                                            </span>
                                                            <span className="text-[10px] font-medium mt-1 flex items-center gap-1"
                                                                style={{ color: "var(--color-text-tertiary)" }}>
                                                                <Monitor size={10} /> Preview
                                                            </span>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="p-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                                            <div className="flex flex-col gap-3 px-4 py-4 rounded-xl" style={{ background: "var(--color-background-primary)" }}>
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-accent) / 12" }}>
                                                        <Lock size={14} style={{ color: "var(--color-accent)" }} />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                            Full course
                                                        </span>
                                                        <span className="text-xs block" style={{ color: "var(--color-text-tertiary)" }}>
                                                            Sign up to unlock all lessons
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                    className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-md"
                                                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
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
                                className="mt-8 p-6 md:p-8 rounded-2xl border text-center"
                                style={{
                                    background: "var(--color-background-secondary)",
                                    borderColor: "var(--color-border-light)",
                                }}
                            >
                                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                                    style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}>
                                    <Sparkles size={24} className="text-white" />
                                </div>
                                <p className="text-xl font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
                                    Enjoying the preview?
                                </p>
                                <p className="text-sm mb-5" style={{ color: "var(--color-text-secondary)" }}>
                                    Sign up to access the full course, track progress, and earn certificates.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                        className="px-8 py-3 rounded-xl text-white font-bold text-sm transition-all hover:brightness-110 shadow-md"
                                        style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                                    >
                                        Create an account
                                    </button>
                                    <button
                                        onClick={() => navigate("/playground/discover")}
                                        className="px-6 py-3 rounded-xl text-sm font-bold border transition-all"
                                        style={{
                                            color: "var(--color-text-primary)",
                                            borderColor: "var(--color-border-medium)",
                                        }}
                                    >
                                        Browse all courses
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Sidebar - Lesson List, hidden on mobile */}
                        {videos.length > 1 && (
                            <div className="hidden lg:block lg:w-80 shrink-0">
                                <div className="lg:sticky lg:top-24 rounded-2xl border" style={{ borderColor: "var(--color-border-light)", background: "var(--color-background-secondary)" }}>
                                    <div className="p-4 border-b" style={{ borderColor: "var(--color-border-light)" }}>
                                        <div className="flex items-center gap-2">
                                            <ListVideo size={16} style={{ color: "var(--color-accent)" }} />
                                            <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                Preview Lessons
                                            </span>
                                            <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: "var(--color-accent) / 12", color: "var(--color-accent)" }}>
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
                                                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all"
                                                    style={{
                                                        background: isActive ? "var(--color-accent) / 10" : "transparent",
                                                        border: isActive ? "1px solid var(--color-accent) / 25" : "1px solid transparent",
                                                    }}
                                                >
                                                    <div
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                                                        style={{
                                                            background: isActive ? "var(--color-accent)" : "var(--color-background-primary)",
                                                            color: isActive ? "#fff" : "var(--color-text-tertiary)",
                                                        }}
                                                    >
                                                        {isActive ? <Play size={11} className="fill-white" /> : index + 1}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span
                                                            className="text-sm leading-snug line-clamp-2 font-medium"
                                                            style={{
                                                                color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
                                                            }}
                                                        >
                                                            {video.title}
                                                        </span>
                                                        <span className="text-[10px] font-medium mt-1 flex items-center gap-1"
                                                            style={{ color: "var(--color-text-tertiary)" }}>
                                                            <Monitor size={10} /> Preview
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="p-4 border-t" style={{ borderColor: "var(--color-border-light)" }}>
                                        <div className="flex flex-col gap-3 px-4 py-4 rounded-xl" style={{ background: "var(--color-background-primary)" }}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-accent) / 12" }}>
                                                    <Lock size={14} style={{ color: "var(--color-accent)" }} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>
                                                        Full course
                                                    </span>
                                                    <span className="text-xs block" style={{ color: "var(--color-text-tertiary)" }}>
                                                        Sign up to unlock all lessons
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                                className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-md"
                                                style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
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
