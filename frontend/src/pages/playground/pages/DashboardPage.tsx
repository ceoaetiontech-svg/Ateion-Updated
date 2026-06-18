import { motion } from "framer-motion";
import { Compass, Sparkles, ChevronRight, BookOpen, TrendingUp, Clock, Award, Play } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { useCountUp } from "../shared/useCountUp";

function parseHours(duration: string): number {
  const h = parseInt(duration);
  return isNaN(h) ? 0 : h;
}

export default function DashboardPage() {
  const { userProfile, streak, xp, enrolledIds } = usePlayground();
  const { myCourses, lastResume } = useCourses("", enrolledIds);
  const navigate = useNavigate();

  const activeCourses = myCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completedCourses = myCourses.filter(c => c.progress === 100).length;
  const totalHours = myCourses.reduce(
    (sum, c) => sum + (c.progress / 100) * parseHours(c.duration),
    0,
  );

  const countActiveCourses = useCountUp(activeCourses);
  const countHours = useCountUp(totalHours);
  const countCompleted = useCountUp(completedCourses);

  return (
    <>
      {/* VIBRANT APP-LIKE WELCOME BANNER */}
      {/* VIBRANT APP-LIKE WELCOME BANNER */}
      <motion.div 
        variants={fadeUpItem}
        initial="hidden"
        animate="show"
        className="relative w-full rounded-[32px] p-8 sm:p-12 text-[var(--color-text-primary)] shadow-xl overflow-hidden group border border-[var(--color-border-light)]"
        style={{ background: "linear-gradient(135deg, rgba(232, 133, 106, 0.12) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(26, 24, 51, 0.02) 100%), var(--color-background-secondary)" }}
      >
        {/* Decorative floating blur mesh circles */}
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[var(--color-accent)]/12 blur-[90px] animate-pulse pointer-events-none duration-[10s]" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#6366f1]/8 blur-[80px] animate-pulse pointer-events-none duration-[7s]" />
        
        {/* Premium Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)`, 
            backgroundSize: '24px 24px' 
          }} 
        />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
          <div className="flex-grow">
            <div className="inline-flex items-center gap-2 text-[var(--color-accent)] mb-4 font-bold bg-white/40 dark:bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-xs uppercase tracking-wider">
              <Sparkles size={14} className="text-[var(--color-warning)]" />
              <span>Welcome back, {userProfile.firstName}!</span>
            </div>
            <h2
              className="font-black mb-4 text-[var(--color-text-primary)] drop-shadow-sm leading-none tracking-tight font-['OV_Soge']"
              style={{ 
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              Continue Your Journey
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mb-8 text-sm sm:text-base leading-relaxed font-semibold">
              Curated learning experiences specifically designed for
              your age segment and growth path. You're making great
              progress this week!
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(lastResume ? `/playground/course/${lastResume.id}` : "/playground/discover")}
                className="bg-[var(--color-accent)] hover:brightness-105 active:scale-[0.98] text-[#ffffff] px-8 py-3.5 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 border border-transparent cursor-pointer"
              >
                {lastResume ? <><Play size={18} /> Resume Learning</> : <><Compass size={18} /> Discover Courses</>} <ChevronRight size={18} />
              </button>
              <button className="bg-[var(--color-background-primary)]/80 backdrop-blur-md text-[var(--color-text-primary)] border border-[var(--color-border-light)] px-6 py-3.5 rounded-2xl font-bold hover:bg-[var(--color-background-tertiary)] transition-all flex items-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
                <span className="text-xl animate-[bounce_2s_ease-in-out_infinite]">🔥</span> {streak} Day Streak!
              </button>
            </div>
          </div>

          {/* Right side illustration/graphic (hidden on small screens) */}
          <div className="hidden lg:flex relative w-48 h-48 group-hover:-translate-y-2 transition-transform duration-700 flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-warning)] rounded-[2rem] rotate-6 opacity-30 blur-md"></div>
            <div className="absolute inset-0 bg-[var(--color-background-secondary)]/80 backdrop-blur-xl border border-white/20 rounded-[2rem] -rotate-3 flex flex-col items-center justify-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mt-2">
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                  <circle cx="56" cy="56" r="48" stroke="var(--color-border-light)" strokeWidth="6" fill="none" />
                  <circle cx="56" cy="56" r="48" stroke="var(--color-warning)" strokeWidth="6" fill="none" strokeDasharray="301.59" strokeDashoffset={301.59 - ((xp % 3000) / 3000) * 301.59} className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center justify-center text-center z-10">
                  <span className="text-3xl font-black text-[var(--color-text-primary)] leading-none drop-shadow-sm font-['OV_Soge']">{Math.floor(xp / 3000) + 1}</span>
                  <span className="text-[9px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mt-1">Level</span>
                </div>
              </div>
              <p className="text-[10px] font-extrabold text-[var(--color-text-primary)] mt-3 bg-[var(--color-background-primary)]/80 px-3 py-1.5 rounded-full border border-[var(--color-border-light)] shadow-sm backdrop-blur-md">
                {(xp % 3000).toLocaleString()} / 3,000 XP
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. GAMIFICATION OVERVIEW STATS */}
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Compass size={28} className="text-[var(--color-accent)] group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Overview</span>
          </h3>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Stat Card 1: Courses */}
          <motion.div variants={fadeUpItem} className="backdrop-blur-md bg-[var(--color-background-secondary)]/90 border border-[var(--color-border-light)] rounded-[20px] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative flex flex-col justify-between min-h-[160px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-info)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--color-info)]/10 text-[var(--color-info)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +2
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-black text-[var(--color-text-primary)] mb-0.5 tracking-tight font-['OV_Soge']">
                  {countActiveCourses}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-[11px] font-bold uppercase tracking-wider">
                  Active Courses
                </p>
              </div>
              {/* Sparkline */}
              <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                <svg className="w-16 h-8 text-[var(--color-info)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Stat Card 2: Hours */}
          <motion.div variants={fadeUpItem} className="backdrop-blur-md bg-[var(--color-background-secondary)]/90 border border-[var(--color-border-light)] rounded-[20px] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative flex flex-col justify-between min-h-[160px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/10 text-[var(--color-warning)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <Clock size={24} />
              </div>
              <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +15%
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-black text-[var(--color-text-primary)] mb-0.5 tracking-tight font-['OV_Soge']">
                  {countHours}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-[11px] font-bold uppercase tracking-wider">
                  Hours Learned
                </p>
              </div>
              {/* Sparkline */}
              <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                <svg className="w-16 h-8 text-[var(--color-warning)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 30 L20 25 L40 10 L60 15 L80 5 L100 0" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Stat Card 3: Badges */}
          <motion.div variants={fadeUpItem} className="backdrop-blur-md bg-[var(--color-background-secondary)]/90 border border-[var(--color-border-light)] rounded-[20px] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative flex flex-col justify-between min-h-[160px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award size={24} />
              </div>
              <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Sparkles size={10} /> +5
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-black text-[var(--color-text-primary)] mb-0.5 tracking-tight font-['OV_Soge']">
                  {countCompleted}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-[11px] font-bold uppercase tracking-wider">
                  Completed
                </p>
              </div>
              {/* Sparkline */}
              <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                <svg className="w-16 h-8 text-[#8b5cf6] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 20 L20 25 L40 15 L60 20 L80 5 L100 10" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Stat Card 4: Streaks */}
          <motion.div variants={fadeUpItem} className="backdrop-blur-md bg-[var(--color-background-secondary)]/90 border border-[var(--color-border-light)] rounded-[20px] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative flex flex-col justify-between min-h-[160px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-warning)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/10 text-[var(--color-warning)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <span className="text-2xl drop-shadow-sm group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 inline-block">🔥</span>
              </div>
              <span className="bg-[var(--color-warning)]/10 text-[var(--color-warning)] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                Best!
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-black text-[var(--color-text-primary)] mb-0.5 tracking-tight font-['OV_Soge'] flex items-baseline gap-1">
                  {streak} <span className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">Days</span>
                </p>
                <p className="text-[var(--color-text-tertiary)] text-[11px] font-bold uppercase tracking-wider">
                  Active Streak
                </p>
              </div>
              {/* Sparkline */}
              <div className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-2">
                <svg className="w-16 h-8 text-[var(--color-warning)] drop-shadow-sm" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 28 L20 28 L40 20 L60 20 L80 10 L100 0" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
