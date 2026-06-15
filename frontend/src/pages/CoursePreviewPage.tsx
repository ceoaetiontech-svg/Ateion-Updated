import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RefreshCw } from "lucide-react";
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
        <div
            className="min-h-screen"
            style={{ background: "var(--color-background-primary)" }}
        >
            <header
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{
                    background: "var(--color-background-secondary)",
                    borderColor: "var(--color-border-light)",
                }}
            >
                <button
                    onClick={() => navigate("/playground/discover")}
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-accent)" }}
                >
                    ← Browse courses
                </button>
                <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-text-tertiary)" }}
                >
          Free Preview
        </span>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                    className="text-sm font-bold px-4 py-1.5 rounded-lg text-white"
                    style={{ background: "var(--color-accent)" }}
                >
                    Sign up free
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div
                            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                            style={{
                                borderColor: "var(--color-accent)",
                                borderTopColor: "transparent",
                            }}
                        />
                        <p
                            className="mt-4 text-sm font-semibold"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            {isWaking
                                ? "The learning server is waking up. This can take a little longer on the free tier…"
                                : "Loading preview…"}
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-24">
                        <p
                            className="text-lg font-semibold"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            {error}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={() => setRetryKey((value) => value + 1)}
                                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white text-sm font-bold"
                                style={{ background: "var(--color-accent)" }}
                            >
                                <RefreshCw size={16} /> Retry
                            </button>
                            <button
                                onClick={() => navigate("/playground/discover")}
                                className="px-6 py-2 rounded-lg text-sm font-bold border"
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
                    <>
                        <VideoPlayer
                            videoId={currentVideo.videoId}
                            title={currentVideo.title}
                            loading={false}
                            error={null}
                        />

                        <h1
                            className="mt-6 text-2xl font-bold"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            {currentVideo.title}
                        </h1>

                        {videos.length > 1 && (
                            <div className="mt-8">
                                <h2
                                    className="text-sm font-bold uppercase tracking-wider mb-3"
                                    style={{ color: "var(--color-text-tertiary)" }}
                                >
                                    Preview lessons
                                </h2>
                                <ul className="flex flex-col gap-2">
                                    {videos.map((video, index) => (
                                        <li key={video.id}>
                                            <button
                                                onClick={() => setCurrentVideo(video)}
                                                className="w-full text-left px-4 py-3 rounded-xl border transition-all"
                                                style={{
                                                    background:
                                                        currentVideo.id === video.id
                                                            ? "rgba(232,133,106,0.1)"
                                                            : "var(--color-background-secondary)",
                                                    borderColor:
                                                        currentVideo.id === video.id
                                                            ? "var(--color-accent)"
                                                            : "var(--color-border-light)",
                                                    color: "var(--color-text-primary)",
                                                }}
                                            >
                        <span
                            className="text-xs font-bold mr-2"
                            style={{ color: "var(--color-accent)" }}
                        >
                          {index + 1}.
                        </span>
                                                {video.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div
                            className="mt-10 p-6 rounded-2xl border text-center"
                            style={{
                                background: "var(--color-background-secondary)",
                                borderColor: "var(--color-border-light)",
                            }}
                        >
                            <p
                                className="text-lg font-bold mb-2"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                Enjoying the preview?
                            </p>
                            <p
                                className="text-sm mb-4"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                Sign up to access protected course pages and learning features.
                            </p>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-register"))}
                                className="px-8 py-3 rounded-xl text-white font-bold text-sm"
                                style={{ background: "var(--color-accent)" }}
                            >
                                Create an account
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
