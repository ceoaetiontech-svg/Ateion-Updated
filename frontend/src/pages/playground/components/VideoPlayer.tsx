import { useState, useRef, useCallback, useEffect, memo } from "react";
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react";

const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface VideoPlayerProps {
  title: string;
  duration: number;
  onComplete?: () => void;
}

const VideoPlayer = memo(function VideoPlayer({ title, duration, onComplete }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [hover, setHover] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrentTime(t => {
        const next = t + speed;
        if (next >= duration) {
          setPlaying(false);
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, speed, duration, onComplete]);

  useEffect(() => {
    completedRef.current = false;
  }, [duration]);

  const seek = useCallback((clientX: number) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setCurrentTime(pct * duration);
  }, [duration]);

  const handleProgressClick = (e: React.MouseEvent) => seek(e.clientX);

  const handleProgressDrag = (e: React.MouseEvent) => {
    const onMove = (ev: MouseEvent) => seek(ev.clientX);
    const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    seek(e.clientX);
  };

  const togglePlay = () => {
    if (currentTime >= duration) {
      setCurrentTime(0);
    }
    setPlaying(p => !p);
  };

  const skip = (delta: number) => {
    setCurrentTime(t => Math.max(0, Math.min(duration, t + delta)));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      style={{ aspectRatio: "16 / 9", maxHeight: "55vh" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setShowSpeedMenu(false); }}
    >
      {/* Video placeholder */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 cursor-pointer"
        onClick={togglePlay}
      >
        <div className="text-center">
          {!playing && (
            <>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition-colors">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-white/60 text-sm">Lesson Preview</p>
            </>
          )}
          {playing && (
            <p className="text-white/20 text-sm animate-pulse">Playing — {title}</p>
          )}
        </div>
      </div>

      {/* Controls overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 ${hover || !playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Center play button on pause */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-8 transition-opacity duration-300 ${hover || !playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* Seek bar */}
        <div
          ref={progressRef}
          className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer group/bar mb-3 hover:h-2 transition-all"
          onClick={handleProgressClick}
          onMouseDown={handleProgressDrag}
        >
          <div
            className="h-full bg-[var(--color-accent)] rounded-full relative transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 group-hover/bar:scale-125 transition-all shadow-md" />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" />}
            </button>
            <button
              onClick={() => skip(-10)}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="-10s"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={() => skip(10)}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="+10s"
            >
              <SkipForward size={16} />
            </button>
            <span className="text-white/60 text-xs font-medium tabular-nums ml-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(v => !v)}
                className="text-xs font-bold text-white/70 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                {speed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg border border-white/10 shadow-xl overflow-hidden">
                  {SPEEDS.map(s => (
                    <button
                      key={s}
                      onClick={() => { setSpeed(s); setShowSpeedMenu(false); }}
                      className={`block w-full text-xs px-4 py-1.5 text-left transition-colors ${
                        speed === s ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Fullscreen"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VideoPlayer;
