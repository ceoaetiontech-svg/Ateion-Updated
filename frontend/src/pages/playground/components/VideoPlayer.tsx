import { useState } from "react";
import { Play, Volume2, Maximize } from "lucide-react";

interface VideoPlayerProps {
  title: string;
}

export default function VideoPlayer({ title }: VideoPlayerProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-full bg-black"
      style={{ aspectRatio: "16 / 9" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-white/20 transition-colors">
            <Play size={28} className="text-white ml-1" fill="white" />
          </div>
          <p className="text-white/60 text-sm">Lesson Preview</p>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${hover ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
          <div className="w-1/3 h-full bg-[var(--color-accent)] rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors">
              <Play size={16} fill="white" />
            </button>
            <span className="text-white/60 text-xs">12:34 / 45:20</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors">
              <Volume2 size={16} />
            </button>
            <button className="text-white/80 hover:text-white transition-colors">
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
