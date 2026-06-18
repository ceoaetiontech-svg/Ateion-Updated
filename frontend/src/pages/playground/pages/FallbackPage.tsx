import { Lock } from "lucide-react";
import { useLocation } from "react-router";
import { getActiveView } from "../shared/navigationData";

const MOON_IMAGE_URL = "https://static.typingclub.com/m/tpmedia/img/moon.png";

const cloudLayers = [
  {
    src: "https://static.typingclub.com/m/tpmedia/img/clouds3.png",
    left: "-7%",
    bottom: "7%",
    width: "114%",
    opacity: 0.96,
    animation: "sproutlingCloudDrift 22s ease-in-out -5s infinite alternate-reverse",
  },
  {
    src: "https://static.typingclub.com/m/tpmedia/img/clouds2.png",
    left: "-8%",
    bottom: "1%",
    width: "116%",
    opacity: 0.92,
    animation: "sproutlingCloudDrift 18s ease-in-out -2s infinite alternate",
  },
  {
    src: "https://static.typingclub.com/m/tpmedia/img/clouds1.png",
    left: "-9%",
    bottom: "-5%",
    width: "118%",
    opacity: 1,
    animation: "sproutlingCloudDrift 15s ease-in-out infinite alternate-reverse",
  },
];

const stars = [
  { left: "6%", top: "12%", size: 2, delay: "0s", duration: "3.8s" },
  { left: "14%", top: "26%", size: 1, delay: "1.1s", duration: "4.2s" },
  { left: "21%", top: "9%", size: 2, delay: "0.4s", duration: "3.4s" },
  { left: "28%", top: "36%", size: 1, delay: "1.8s", duration: "4.6s" },
  { left: "35%", top: "18%", size: 3, delay: "0.8s", duration: "3.6s" },
  { left: "44%", top: "8%", size: 1, delay: "2s", duration: "5s" },
  { left: "51%", top: "32%", size: 2, delay: "1.4s", duration: "4.1s" },
  { left: "58%", top: "14%", size: 1, delay: "0.2s", duration: "3.2s" },
  { left: "66%", top: "25%", size: 3, delay: "1.6s", duration: "4.8s" },
  { left: "73%", top: "7%", size: 1, delay: "0.6s", duration: "3.9s" },
  { left: "80%", top: "34%", size: 2, delay: "1.2s", duration: "4.4s" },
  { left: "89%", top: "16%", size: 1, delay: "2.2s", duration: "5.2s" },
  { left: "94%", top: "29%", size: 2, delay: "0.9s", duration: "3.7s" },
  { left: "10%", top: "44%", size: 1, delay: "1.5s", duration: "4.9s" },
  { left: "39%", top: "47%", size: 2, delay: "0.5s", duration: "3.5s" },
  { left: "62%", top: "43%", size: 1, delay: "1.9s", duration: "4.7s" },
  { left: "85%", top: "48%", size: 2, delay: "0.1s", duration: "3.3s" },
];

function WaveBackdrop({ isDreamers }: { isDreamers: boolean }) {
  const gradient = isDreamers
    ? "linear-gradient(60deg, #171027 0%, #4c1d95 52%, #f59e0b 100%)"
    : "linear-gradient(60deg, #543ab7 0%, #00acc1 100%)";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.22),transparent_20%),radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,rgba(10,16,34,0.05)_0%,rgba(10,16,34,0.22)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#ffffff]/10 to-transparent" />

      <svg
        className="playground-waves absolute bottom-[-1px] left-0 h-[120px] min-h-[80px] w-full sm:h-[150px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        aria-hidden="true"
      >
        <defs>
          <path
            id="playground-gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>
        <g className="playground-wave-parallax">
          <use href="#playground-gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.70)" />
          <use href="#playground-gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.50)" />
          <use href="#playground-gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.30)" />
          <use href="#playground-gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.92)" />
        </g>
      </svg>
    </div>
  );
}

export default function FallbackPage() {
  const location = useLocation();
  const activeView = getActiveView(location.pathname);
  const hasSkyTheme =
    activeView === "Sproutlings (5-7 age)" || activeView === "Saplings (7-14 age)";
  const hasWaveTheme =
    activeView === "Pathfinders (14-18 age)" || activeView === "Dreamers (18+ age)";
  const hasIllustratedTheme = hasSkyTheme || hasWaveTheme;
  const isDreamers = activeView === "Dreamers (18+ age)";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {hasIllustratedTheme && (
        <style>{`
          @keyframes sproutlingTwinkle {
            0%, 100% { opacity: 0.35; transform: scale(0.75); }
            50% { opacity: 1; transform: scale(1.15); }
          }

          @keyframes sproutlingCloudDrift {
            from { transform: translateX(-6%); }
            to { transform: translateX(6%); }
          }

          @keyframes sproutlingMoonFloat {
            0%, 100% { transform: translateY(0) rotate(-4deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }

          .playground-wave-parallax > use {
            animation: playgroundWaveMove 25s cubic-bezier(.55,.5,.45,.5) infinite;
          }

          .playground-wave-parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 7s;
          }

          .playground-wave-parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 10s;
          }

          .playground-wave-parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 13s;
          }

          .playground-wave-parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 20s;
          }

          @keyframes playgroundWaveMove {
            0% { transform: translate3d(-90px, 0, 0); }
            100% { transform: translate3d(85px, 0, 0); }
          }
        `}</style>
      )}

      <div className="flex items-center justify-between mb-2">
        <h3
          className="font-bold text-[var(--color-text-primary)]"
          style={{ 
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.1"
          }}
        >
          {activeView}
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-background-primary)] border border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-wider">
          <Lock size={14} /> Available Soon
        </div>
      </div>
      
      <div
        className={`flex flex-col items-center justify-center px-4 text-center rounded-3xl border shadow-sm mt-8 relative overflow-hidden ${
          hasSkyTheme
            ? "min-h-[520px] border-[#184b82]/20 bg-[#0c4279] py-16 text-[#ffffff]"
            : hasWaveTheme
              ? "min-h-[520px] border-[#ffffff]/15 bg-[#543ab7] py-16 text-[#ffffff]"
            : "bg-[var(--color-background-secondary)] border-[var(--color-border-light)] py-20"
        }`}
      >
        {hasSkyTheme ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b376a_0%,#0e4f86_56%,#77add5_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.18),transparent_16%),radial-gradient(circle_at_76%_10%,rgba(255,255,255,0.08),transparent_22%)]" />
            {stars.map((star) => (
              <span
                key={`${star.left}-${star.top}`}
                className="absolute rounded-full bg-[#ffffff] shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.size,
                  height: star.size,
                  animation: `sproutlingTwinkle ${star.duration} ease-in-out ${star.delay} infinite`,
                }}
              />
            ))}

            <div
              className="absolute left-[7%] top-[15%] h-32 w-32 sm:h-44 sm:w-44"
              style={{ animation: "sproutlingMoonFloat 6s ease-in-out infinite" }}
            >
              <div className="absolute -inset-10 rounded-full bg-[#d9efff]/35 blur-2xl" />
              <img
                src={MOON_IMAGE_URL}
                alt=""
                className="relative h-full w-full object-contain drop-shadow-[0_0_32px_rgba(221,240,255,0.85)]"
              />
            </div>

            {cloudLayers.map((cloud) => (
              <img
                key={cloud.src}
                src={cloud.src}
                alt=""
                className="absolute max-w-none select-none"
                style={{
                  left: cloud.left,
                  bottom: cloud.bottom,
                  width: cloud.width,
                  opacity: cloud.opacity,
                  animation: cloud.animation,
                }}
              />
            ))}
          </div>
        ) : hasWaveTheme ? (
          <WaveBackdrop isDreamers={isDreamers} />
        ) : (
          <>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 rounded-bl-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-info)] opacity-5 rounded-tr-full blur-3xl pointer-events-none"></div>
          </>
        )}
        
        <div className="relative w-32 h-32 mb-6 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-info)] rounded-3xl rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-500 blur-md"></div>
          <div className="absolute inset-0 bg-[var(--color-background-primary)] backdrop-blur-xl border border-[var(--color-border-medium)] rounded-3xl -rotate-3 flex flex-col items-center justify-center shadow-xl group-hover:-rotate-6 transition-transform duration-500">
            <Lock size={40} className="text-[var(--color-text-secondary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300" />
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-text-tertiary)] animate-pulse" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
        
        <h4 className={`relative z-10 text-2xl font-bold mb-3 ${hasIllustratedTheme ? "text-[#ffffff]" : "text-[var(--color-text-primary)]"}`}>
          Something exciting is brewing
        </h4>
        <p className={`relative z-10 max-w-md mx-auto mb-8 leading-relaxed ${hasIllustratedTheme ? "text-[#e8f5ff]" : "text-[var(--color-text-secondary)]"}`}>
          We're currently crafting the{" "}
          <span className={`font-bold ${hasIllustratedTheme ? "text-[#ffffff]" : "text-[var(--color-accent)]"}`}>
            {activeView}
          </span>{" "}
          experience. Check back soon to explore new tools and resources tailored just for you.
        </p>
        
        <button className={`relative z-10 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
          hasIllustratedTheme
            ? "bg-[#ffffff] text-[#0d467d] hover:bg-[#eaf6ff]"
            : "bg-[var(--color-text-primary)] text-[var(--color-background-primary)] hover:bg-[var(--color-accent)] hover:text-[#ffffff]"
        }`}>
          Notify Me When It's Ready
        </button>
      </div>
    </div>
  );
}
