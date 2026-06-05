import { motion } from "framer-motion";
import { StickyNote, FileText, BookMarked } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";

interface NotesViewProps {
  userProfile: { fullName: string; firstName: string; segmentText: string; isPremium: boolean };
}

export default function NotesPage({ userProfile }: NotesViewProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <StickyNote size={28} className="text-[var(--color-accent)] group-hover:rotate-6 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Notes</span>
        </h3>

        <button
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
        >
          <StickyNote size={16} /> New Note
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Note 1 */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-accent)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--color-accent_light)] text-[var(--color-accent)]">
              <StickyNote size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
              Draft
            </span>
          </div>
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
            React Hooks Best Practices
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
            Always use the dependency array carefully. Avoid infinite loops by ensuring all external variables are accounted for. Custom hooks should start with "use".
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                {userProfile.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
              Updated 2h ago
            </span>
          </div>
        </motion.div>

        {/* Note 2 */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-info)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--color-info_light)] text-[var(--color-info)]">
              <FileText size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
              Study
            </span>
          </div>
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
            Python Data Structures
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
            Lists are mutable arrays. Tuples are immutable. Dictionaries use hash maps for O(1) lookups. Sets are great for deduplication and fast membership tests.
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                {userProfile.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
              Updated yesterday
            </span>
          </div>
        </motion.div>

        {/* Note 3 */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-success)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--color-success_light)] text-[var(--color-success)]">
              <BookMarked size={20} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)]">
              Reference
            </span>
          </div>
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-2 line-clamp-1">
            SQL Query Optimization
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
            Avoid SELECT *. Always use indexes on columns you frequently filter or join on. Use EXPLAIN ANALYZE to understand the query execution plan.
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                {userProfile.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
            <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
              Updated 3d ago
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
