import { Lock } from "lucide-react";
import { useLocation } from "react-router";
import { getActiveView } from "../shared/navigationData";

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

export default function FallbackPage() {
  const location = useLocation();
  const activeView = getActiveView(location.pathname);
  const isSproutlings = activeView === "Sproutlings (5-7)";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isSproutlings && (
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
          isSproutlings
            ? "min-h-[520px] border-[#184b82]/20 bg-[#0c4279] py-16 text-[#ffffff]"
            : "bg-[var(--color-background-secondary)] border-[var(--color-border-light)] py-20"
        }`}
      >
        {isSproutlings ? (
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
              className="absolute left-[7%] top-[15%] h-28 w-28 rounded-full bg-[#f8fbff] shadow-[0_0_44px_22px_rgba(215,235,255,0.38)] sm:h-36 sm:w-36"
              style={{ animation: "sproutlingMoonFloat 6s ease-in-out infinite" }}
            >
              <div className="absolute left-[24%] top-[22%] h-6 w-8 rounded-full bg-[#dbeeff] opacity-70 blur-[1px]" />
              <div className="absolute right-[18%] top-[38%] h-5 w-5 rounded-full bg-[#dbeeff] opacity-60 blur-[1px]" />
              <div className="absolute bottom-[24%] left-[34%] h-4 w-7 rounded-full bg-[#dbeeff] opacity-50 blur-[1px]" />
            </div>

            <div
              className="absolute -bottom-10 left-[-12%] h-36 w-[124%] opacity-95"
              style={{
                animation: "sproutlingCloudDrift 14s ease-in-out infinite alternate",
                background:
                  "radial-gradient(circle at 4% 68%, #ffffff 0 44px, transparent 45px), radial-gradient(circle at 11% 48%, #dcecf8 0 54px, transparent 55px), radial-gradient(circle at 18% 64%, #ffffff 0 64px, transparent 65px), radial-gradient(circle at 28% 50%, #c7ddec 0 58px, transparent 59px), radial-gradient(circle at 38% 64%, #ffffff 0 72px, transparent 73px), radial-gradient(circle at 49% 44%, #d6e8f5 0 62px, transparent 63px), radial-gradient(circle at 60% 66%, #ffffff 0 70px, transparent 71px), radial-gradient(circle at 72% 52%, #c7ddec 0 58px, transparent 59px), radial-gradient(circle at 84% 66%, #ffffff 0 76px, transparent 77px), radial-gradient(circle at 95% 48%, #d6e8f5 0 62px, transparent 63px)",
              }}
            />
            <div
              className="absolute -bottom-20 left-[-18%] h-44 w-[136%]"
              style={{
                animation: "sproutlingCloudDrift 18s ease-in-out infinite alternate-reverse",
                background:
                  "radial-gradient(circle at 7% 58%, #ffffff 0 64px, transparent 65px), radial-gradient(circle at 18% 70%, #ffffff 0 76px, transparent 77px), radial-gradient(circle at 31% 56%, #ffffff 0 74px, transparent 75px), radial-gradient(circle at 43% 70%, #ffffff 0 82px, transparent 83px), radial-gradient(circle at 58% 58%, #ffffff 0 70px, transparent 71px), radial-gradient(circle at 70% 72%, #ffffff 0 84px, transparent 85px), radial-gradient(circle at 83% 58%, #ffffff 0 72px, transparent 73px), radial-gradient(circle at 94% 72%, #ffffff 0 82px, transparent 83px)",
              }}
            />
          </div>
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
        
        <h4 className={`relative z-10 text-2xl font-bold mb-3 ${isSproutlings ? "text-[#ffffff]" : "text-[var(--color-text-primary)]"}`}>
          Something exciting is brewing
        </h4>
        <p className={`relative z-10 max-w-md mx-auto mb-8 leading-relaxed ${isSproutlings ? "text-[#e8f5ff]" : "text-[var(--color-text-secondary)]"}`}>
          We're currently crafting the{" "}
          <span className={`font-bold ${isSproutlings ? "text-[#ffffff]" : "text-[var(--color-accent)]"}`}>
            {activeView}
          </span>{" "}
          experience. Check back soon to explore new tools and resources tailored just for you.
        </p>
        
        <button className={`relative z-10 px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
          isSproutlings
            ? "bg-[#ffffff] text-[#0d467d] hover:bg-[#eaf6ff]"
            : "bg-[var(--color-text-primary)] text-[var(--color-background-primary)] hover:bg-[var(--color-accent)] hover:text-[#ffffff]"
        }`}>
          Notify Me When It's Ready
        </button>
      </div>
    </div>
  );
}
