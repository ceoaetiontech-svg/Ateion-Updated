import { memo } from "react";
import {Plyr} from "plyr-react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  title?: string;
  videoId: string | null;
  error?: string | null;
  onComplete?: () => void;
  duration?: number; 
}

const VideoPlayer = memo(function VideoPlayer({ title, videoId, error, onComplete }: VideoPlayerProps) {

  // Handle backend error state or empty video lists
  if (error) {
    return (
        <div className="relative w-full bg-black rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6" style={{ aspectRatio: "16 / 9", maxHeight: "55vh" }}>
          <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-xl max-w-md w-full">
            <p className="text-red-500 font-bold text-lg mb-2">Video Unavailable</p>
            <p className="text-white/80 text-sm">{error}</p>
          </div>
        </div>
    );
  }

  // Handle loading state while fetching from Spring Boot
  if (!videoId) {
    return (
        <div className="relative w-full bg-black rounded-2xl overflow-hidden flex flex-col items-center justify-center" style={{ aspectRatio: "16 / 9", maxHeight: "55vh" }}>
          <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-white/60 text-sm font-medium">Loading {title || "video"}...</p>
        </div>
    );
  }

  // Render the unlisted YouTube video via Plyr
  return (
      <div className="relative w-full bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: "16 / 9", maxHeight: "55vh" }}>
        <Plyr
            source={{
              type: "video",
              sources: [{ src: videoId, provider: "youtube" }],
            }}
            options={{
              controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
              youtube: {
                noCookie: true,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                disablekb: 1
              }
            }}
            // Trigger completion logic when Plyr finishes the video
            onEnded={onComplete}
        />
      </div>
  );
});

export default VideoPlayer;