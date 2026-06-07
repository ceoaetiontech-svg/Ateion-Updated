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
      <motion.div 
        variants={fadeUpItem}
        initial="hidden"
        animate="show"
        className="relative w-full rounded-[32px] bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] p-8 sm:p-12 text-[var(--color-text-primary)] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden group border border-[var(--color-border-light)]"
      >
        {/* Abstract Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[var(--color-accent)]/20 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[var(--color-info)]/20 to-transparent rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTUwLDE1MCwxNTAsMC4xNSkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-[var(--color-text-primary)] mb-4 font-bold bg-[var(--color-background-primary)]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--color-border-medium)] shadow-sm text-sm">
              <Sparkles size={16} className="text-[var(--color-warning)]" />
              <span>Welcome back, {userProfile.firstName}!</span>
            </div>
            <h2
              className="font-bold mb-4 text-[var(--color-text-primary)] drop-shadow-sm leading-tight"
              style={{ 
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Continue Your Journey
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mb-8 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif] font-medium">
              Curated learning experiences specifically designed for
              your age segment and growth path. You're making great
              progress this week!
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(lastResume ? `/playground/course/${lastResume.id}` : "/playground/discover")}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-[#ffffff] px-8 py-3.5 rounded-2xl font-bold shadow-[0_0_20px_rgba(232,133,106,0.3)] hover:shadow-[0_0_30px_rgba(232,133,106,0.5)] hover:-translate-y-1 transition-[transform,box-shadow,background-color] duration-200 ease-out flex items-center gap-2 border border-transparent"
              >
                {lastResume ? <><Play size={18} /> Resume Learning</> : <><Compass size={18} /> Discover Courses</>} <ChevronRight size={18} />
              </button>
              <button className="bg-[var(--color-background-primary)]/80 backdrop-blur-md text-[var(--color-text-primary)] border border-[var(--color-border-medium)] px-6 py-3.5 rounded-2xl font-bold hover:bg-[var(--color-background-tertiary)] transition-all flex items-center gap-2 shadow-sm">
                <span className="text-xl animate-[bounce_2s_ease-in-out_infinite]">🔥</span> {streak} Day Streak!
              </button>
            </div>
          </div>

          {/* Right side illustration/graphic (hidden on small screens) */}
          <div className="hidden lg:flex relative w-48 h-48 group-hover:-translate-y-2 transition-transform duration-700 flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-warning)] rounded-[2rem] rotate-6 opacity-40 blur-sm"></div>
            <div className="absolute inset-0 bg-[var(--color-background-primary)]/60 backdrop-blur-xl border border-[var(--color-border-medium)] rounded-[2rem] -rotate-3 flex flex-col items-center justify-center shadow-lg">
              <div className="relative w-28 h-28 flex items-center justify-center mt-2">
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                  <circle cx="56" cy="56" r="48" stroke="var(--color-border-medium)" strokeWidth="6" fill="none" />
                  <circle cx="56" cy="56" r="48" stroke="var(--color-warning)" strokeWidth="6" fill="none" strokeDasharray="301.59" strokeDashoffset="80" className="transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center justify-center text-center z-10">
                  <span className="text-3xl font-bold text-[var(--color-text-primary)] leading-none drop-shadow-sm">12</span>
                  <span className="text-[9px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mt-1">Level</span>
                </div>
              </div>
              <p className="text-[11px] font-bold text-[var(--color-text-primary)] mt-3 bg-[var(--color-background-secondary)]/80 px-3 py-1.5 rounded-full border border-[var(--color-border-medium)] shadow-sm backdrop-blur-md">
                {xp.toLocaleString()} / 3,000 XP
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
          <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-info),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-info)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--color-info)]/10 text-[var(--color-info)] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                <BookOpen size={24} />
              </div>
              <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +2
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                  {countActiveCourses}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
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
          <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-accent),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[var(--color-warning)]/10 text-[var(--color-warning)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <Clock size={24} />
              </div>
              <span className="bg-[var(--color-success)]/10 text-[var(--color-success)] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 group-hover:scale-110 transition-transform origin-right">
                <TrendingUp size={10} className="group-hover:-translate-y-0.5 transition-transform" /> +15%
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                  {countHours}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
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
          <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_#8b5cf6,0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b5cf6] opacity-5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award size={24} />
              </div>
              <span className="bg-[#8b5cf6]/10 text-[#8b5cf6] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Sparkles size={10} /> +5
              </span>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight">
                  {countCompleted}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
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
          <motion.div variants={fadeUpItem} className="clay-card flex flex-col justify-between bg-[var(--color-background-primary)] border-2 border-[var(--color-border-light)] shadow-[0_4px_0_0_var(--color-border-light)] hover:shadow-[0_6px_0_0_var(--color-warning),0_15px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out group overflow-hidden relative">
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
                <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-1 font-['Inter',sans-serif] tracking-tight flex items-baseline gap-1">
                  {streak} <span className="text-sm font-bold text-[var(--color-text-tertiary)]">Days</span>
                </p>
                <p className="text-[var(--color-text-tertiary)] text-sm font-bold">
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
