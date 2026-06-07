import { motion } from "framer-motion";
import { StickyNote } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { MY_COURSES_DATA } from "../shared/mockData";

function getCourseTitle(courseId: number): string {
  return MY_COURSES_DATA.find(c => c.id === courseId)?.title ?? "Unknown Course";
}

export default function NotesPage() {
  const { notes, deleteNote, userProfile } = usePlayground();

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
        <span className="text-sm text-[var(--color-text-tertiary)] font-medium">{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-4">
            <StickyNote size={32} className="text-[var(--color-text-tertiary)]" />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No notes yet</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Take notes while watching a course — they show up here.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {notes.map(note => (
            <motion.div
              key={note.id}
              variants={fadeUpItem}
              className="clay-card flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-accent)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-[var(--color-accent_light)] text-[var(--color-accent)]">
                  <StickyNote size={20} />
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-[var(--color-background-tertiary)] rounded-md text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
              <span className="text-[11px] font-medium text-[var(--color-accent)] mb-1">{getCourseTitle(note.courseId)}</span>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
                {note.text}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                    {userProfile.firstName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
