import { memo, useMemo, useRef, useState, useEffect } from "react";
import { Plyr, type PlyrOptions, type PlyrSource } from "plyr-react";
import { motion, AnimatePresence } from "framer-motion";
import "plyr/dist/plyr.css";
import { Play } from "lucide-react";

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
    const plyrRef = useRef<any>(null);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        let player: any = null;
        let timeoutId: any = null;

        const handlePlay = () => setIsPaused(false);
        const handlePlaying = () => setIsPaused(false);
        const handlePause = () => setIsPaused(true);
        const handleEnded = () => {
            setIsPaused(true);
            if (onComplete) onComplete();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const activeEl = document.activeElement;
            if (activeEl) {
                const tagName = activeEl.tagName.toUpperCase();
                if (
                    tagName === "INPUT" ||
                    tagName === "TEXTAREA" ||
                    tagName === "SELECT" ||
                    activeEl.hasAttribute("contenteditable") ||
                    activeEl.getAttribute("contenteditable") === "true"
                ) {
                    return;
                }
            }

            if (e.key === "ArrowLeft") {
                if (player && typeof player.currentTime === "number") {
                    e.preventDefault();
                    player.currentTime = Math.max(0, player.currentTime - 5);
                }
                return;
            }
            if (e.key === "ArrowRight") {
                if (player && typeof player.currentTime === "number") {
                    e.preventDefault();
                    player.currentTime = Math.min(
                        player.duration || Infinity,
                        player.currentTime + 5,
                    );
                }
                return;
            }

            if (e.code === "Space" || e.key === " ") {
                if (player) {
                    e.preventDefault();
                    const isCurrentlyPlaying = player.playing === true;
                    if (isCurrentlyPlaying) {
                        if (typeof player.pause === "function") {
                            player.pause();
                            setIsPaused(true);
                        }
                    } else {
                        if (typeof player.play === "function") {
                            player.play();
                            setIsPaused(false);
                        }
                    }
                }
            }
        };

        const checkAndAttach = () => {
            const plyrRefObj = plyrRef.current;
            if (!plyrRefObj) {
                timeoutId = setTimeout(checkAndAttach, 50);
                return;
            }

            let plyrInstance: any = null;
            if (plyrRefObj.plyr) {
                if (plyrRefObj.plyr.current !== undefined) {
                    plyrInstance = plyrRefObj.plyr.current;
                } else {
                    plyrInstance = plyrRefObj.plyr;
                }
            }

            if (plyrInstance && typeof plyrInstance.on === "function") {
                player = plyrInstance;
                player.on("play", handlePlay);
                player.on("playing", handlePlaying);
                player.on("pause", handlePause);
                player.on("ended", handleEnded);
                
                const isCurrentlyPlaying = player.playing === true;
                setIsPaused(!isCurrentlyPlaying);
            } else {
                timeoutId = setTimeout(checkAndAttach, 50);
            }
        };

        checkAndAttach();
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("keydown", handleKeyDown);
            if (player && typeof player.off === "function") {
                player.off("play", handlePlay);
                player.off("playing", handlePlaying);
                player.off("pause", handlePause);
                player.off("ended", handleEnded);
            }
        };
    }, [videoId, onComplete]);

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

    const handleOverlayClick = () => {
        const plyrRefObj = plyrRef.current;
        if (!plyrRefObj) return;

        const playerInstance = plyrRefObj.plyr?.current !== undefined 
            ? plyrRefObj.plyr.current 
            : plyrRefObj.plyr;

        if (playerInstance && typeof playerInstance.play === "function") {
            playerInstance.play();
        }
    };

    return (
        <div
            className="relative w-full bg-black rounded-2xl overflow-hidden group"
            style={{ aspectRatio: "16 / 9" }}
        >
            <style>{`
                .plyr__video-embed {
                    transform: scale(1.18) !important;
                    transform-origin: center center !important;
                }
            `}</style>

            {/* Keep Plyr mounted. Unmounting its DOM while YouTube/Plyr is cleaning up
          can cause React's removeChild NotFoundError. */}
            <Plyr
                ref={plyrRef}
                source={source}
                options={PLYR_OPTIONS}
            />

            {/* Custom Overlay to mask YouTube paused state / details */}
            <AnimatePresence>
                {isPaused && videoId && !error && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleOverlayClick}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-16 h-16 rounded-full bg-white/95 text-[var(--color-accent)] flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.3)] mb-4"
                        >
                            <Play size={26} fill="currentColor" className="ml-1.5" />
                        </motion.div>
                        {title && (
                            <p className="text-white font-extrabold text-lg px-6 text-center leading-snug tracking-tight drop-shadow-md max-w-md">
                                {title}
                            </p>
                        )}
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mt-2.5 drop-shadow-sm">
                            Click anywhere to play
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

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
