import { motion } from "framer-motion";
import {
  Heart,
  Target,
  TrendingUp,
  Sprout,
  CheckSquare,
  Clock,
  Calendar,
  Lock,
  Award,
  Smile,
} from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";

const WellnessHubView = () => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Heart size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Evolve & Wellness</span>
        </h3>

        <button className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-background-tertiary)] transition shadow-sm flex items-center gap-2">
          <Target size={16} className="text-[var(--color-accent)]" /> 
          Set Wellness Goal
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* A. Learning Activity Chart Placeholder */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
            <TrendingUp size={20} className="text-[var(--color-accent)]" />
            Learning Activity
          </h4>
          <div className="relative w-full h-[180px] flex items-end justify-between pb-6 border-b border-[var(--color-border-light)] group">
            {/* Grid Lines */}
            <div className="absolute top-0 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>
            <div className="absolute top-1/3 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>
            <div className="absolute top-2/3 w-full border-t border-dashed border-[var(--color-border-medium)] opacity-50"></div>

            {/* SVG Line connecting dots */}
            <svg
              className="absolute inset-0 h-[calc(100%-24px)] w-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 500 150"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-info)" />
                  <stop offset="50%" stopColor="var(--color-accent)" />
                  <stop offset="100%" stopColor="var(--color-warning)" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100 L 465 150 L 35 150 Z"
                fill="url(#fillGrad)"
                className="transition-opacity duration-500 opacity-50 group-hover:opacity-100"
              />
              <path
                d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-opacity duration-500 opacity-80 group-hover:opacity-100 drop-shadow-md"
              />
            </svg>

            {/* Data Points */}
            {[
              { day: "Mon", mb: 45, color: "var(--color-info)" },
              { day: "Tue", mb: 75, color: "var(--color-info)" },
              { day: "Wed", mb: 35, color: "var(--color-accent)" },
              { day: "Thu", mb: 85, color: "var(--color-accent)" },
              { day: "Fri", mb: 105, color: "var(--color-warning)" },
              { day: "Sat", mb: 55, color: "var(--color-warning)" },
              { day: "Sun", mb: 95, color: "var(--color-warning)" },
            ].map((d, i) => (
              <motion.div variants={fadeUpItem} key={i} className="relative z-10 flex flex-col items-center group/dot cursor-pointer" style={{ width: "14%" }}>
                <div className="absolute -top-10 opacity-0 group-hover/dot:opacity-100 transition-opacity bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] text-[10px] font-bold px-2 py-1 rounded shadow-md border border-[var(--color-border-light)] pointer-events-none whitespace-nowrap z-20">
                  {Math.round(d.mb / 10)}h logged
                </div>
                <div 
                  className="h-3 w-3 rounded-full border-2 border-[var(--color-background-primary)] shadow-sm group-hover/dot:scale-150 transition-all duration-300"
                  style={{ marginBottom: `${d.mb}px`, backgroundColor: d.color }}
                ></div>
                <span className="absolute bottom-[-24px] text-[11px] font-bold text-[var(--color-text-tertiary)] group-hover/dot:text-[var(--color-text-primary)] transition-colors">
                  {d.day}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-0.5">This Week</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">23.1 Hours</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-0.5">Compared to last</p>
              <p className="text-sm font-bold text-[var(--color-success)] flex items-center gap-1 justify-end">
                <TrendingUp size={14} /> +12%
              </p>
            </div>
          </div>
        </motion.div>

        {/* B. Wellness Hub Timeline */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Sprout size={20} className="text-[var(--color-success)]" />
            Wellness Journey
          </h4>
          <motion.div 
            className="flex flex-col gap-6 border-l-2 border-[var(--color-border-light)] ml-2 pl-6 relative mt-2"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Activity 1 */}
            <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
              <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-success)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-success)]/30 hover:bg-[var(--color-success)]/5 transition-colors -mt-2">
                <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                  Daily Reflection
                </p>
                <p className="text-xs text-[var(--color-success)] font-bold mt-1 flex items-center gap-1">
                  <CheckSquare size={12} /> Completed Today
                </p>
              </div>
            </motion.div>

            {/* Activity 2 */}
            <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
              <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-colors -mt-2">
                <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                  Mindfulness Practice
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                  <Clock size={12} /> 5 min session
                </p>
              </div>
            </motion.div>

            {/* Activity 3 */}
            <motion.div variants={fadeUpItem} className="relative group cursor-pointer">
              <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-info)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-info)]/30 hover:bg-[var(--color-info)]/5 transition-colors -mt-2">
                <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                  Stress Management
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                  <Calendar size={12} /> Scheduled
                </p>
              </div>
            </motion.div>

            {/* Activity 4 */}
            <motion.div variants={fadeUpItem} className="relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
              <div className="absolute -left-[32px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-border-medium)] border-[4px] border-[var(--color-background-primary)] shadow-sm box-content group-hover:scale-125 transition-transform duration-300"></div>
              <div className="p-3 rounded-xl border border-dashed border-[var(--color-border-medium)] hover:border-[var(--color-text-secondary)] transition-colors -mt-2">
                <p className="text-[15px] font-bold text-[var(--color-text-primary)]">
                  Growth Mindset
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1 flex items-center gap-1">
                  <Lock size={12} /> Coming Up
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* C. Achievements Grid */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full lg:col-span-2 bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-warning)] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Award size={20} className="text-[var(--color-warning)]" />
            Achievements
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-accent)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Award
                className="text-[var(--color-accent)] mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 relative z-10"
                size={36}
              />
              <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                Course Master
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Unlocked</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-warning)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-warning)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-4xl mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300 relative z-10 drop-shadow-sm">
                🔥
              </span>
              <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                7 Day Streak
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">In Progress</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-success)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-success)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <TrendingUp
                className="text-[var(--color-success)] mb-4 group-hover:scale-125 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10"
                size={36}
              />
              <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                Rising Star
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Unlocked</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-info)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-info)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Target
                className="text-[var(--color-info)] mb-4 group-hover:scale-125 transition-transform duration-300 relative z-10"
                size={36}
              />
              <p className="text-[15px] font-bold text-[var(--color-text-primary)] text-center relative z-10">
                Goal Crusher
              </p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider mt-1 relative z-10">Locked</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WellnessHubView;
