import { Lock, Compass, TrendingUp } from "lucide-react";

interface FallbackViewProps {
  activeView: string;
}

export default function FallbackPage({ activeView }: FallbackViewProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
      
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] shadow-sm mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 rounded-bl-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-info)] opacity-5 rounded-tr-full blur-3xl pointer-events-none"></div>
        
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
        
        <h4 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">Something exciting is brewing</h4>
        <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8 leading-relaxed">
          We're currently crafting the <span className="font-bold text-[var(--color-accent)]">{activeView}</span> experience. Check back soon to explore new tools and resources tailored just for you.
        </p>
        
        <button className="bg-[var(--color-text-primary)] text-[var(--color-background-primary)] hover:bg-[var(--color-accent)] hover:text-[#ffffff] px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
          Notify Me When It's Ready
        </button>
      </div>
    </div>
  );
}
