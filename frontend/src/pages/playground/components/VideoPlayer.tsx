import { memo, useMemo } from "react";
import { Plyr, type PlyrOptions, type PlyrSource } from "plyr-react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
    title?: string;
    videoId: string | null;
    error?: string | null;
    loading?: boolean;
    onComplete?: () => void;
    duration?: number;
}

const PLYR_OPTIONS: PlyrOptions = {
    controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
    ],
    youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        disablekb: 1,
    },
};

const VideoPlayer = memo(function VideoPlayer({
                                                  title,
                                                  videoId,
                                                  error,
                                                  loading = false,
                                                  onComplete,
                                              }: VideoPlayerProps) {
    const source = useMemo<PlyrSource | null>(
        () =>
            videoId
                ? {
                    type: "video",
                    sources: [{ src: videoId, provider: "youtube" }],
                }
                : null,
        [videoId],
    );

    return (
        <div
            className="relative w-full bg-black rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
        >
            {/* Keep Plyr mounted. Unmounting its DOM while YouTube/Plyr is cleaning up
          can cause React's removeChild NotFoundError. */}
            <Plyr source={source} options={PLYR_OPTIONS} onEnded={onComplete} />

            {!videoId && !error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
                    <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="text-white/60 text-sm font-medium">
                        Loading {title || "video"}...
                    </p>
                </div>
            )}

            {loading && videoId && !error && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 pointer-events-none">
                    <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {error && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black p-6">
                    <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-xl max-w-md w-full">
                        <p className="text-red-500 font-bold text-lg mb-2">Video Unavailable</p>
                        <p className="text-white/80 text-sm">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
});

export default VideoPlayer;
