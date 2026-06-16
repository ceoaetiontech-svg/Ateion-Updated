import { motion } from "framer-motion";
import { useState } from "react";
import { StickyNote, BookOpen, Trash2, Plus, X } from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";

export default function NotesPage() {
  const { notes, deleteNote, userProfile, addNote } = usePlayground();
  const { allCourses } = useCourses("");
  const [showAdd, setShowAdd] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteCourseId, setNewNoteCourseId] = useState(0);

  const getCourseTitle = (courseId: number): string =>
      courseId === 0 ? "General" : allCourses.find((course) => course.id === courseId)?.title ?? `Course #${courseId}`;

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    addNote({ courseId: newNoteCourseId, lessonId: 0, text: newNoteText.trim() });
    setNewNoteText("");
    setNewNoteCourseId(0);
    setShowAdd(false);
  };

  return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Themed Header */}
        <div className="p-8 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] relative overflow-hidden"
             style={{
               background: "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)"
             }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                Capture your thoughts
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">
                My Notes
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Notes you take while watching courses appear here for review.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                  onClick={() => setShowAdd(true)}
                  className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-4 py-2 rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-md"
              >
                <Plus size={16} /> Add Note
              </button>
              <span className="text-sm text-[var(--color-text-tertiary)] font-medium bg-[var(--color-background-primary)] px-4 py-2 rounded-xl border border-[var(--color-border-light)]">
                {notes.length} note{notes.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
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
                variants={slideInItem}
                initial="hidden"
                animate="show"
            >
              {notes.map(note => (
                  <motion.div
                      key={note.id}
                      variants={slideInItem}
                      initial="hidden"
                      animate="show"
                      layout
                      className="bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] p-5 flex flex-col group hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[var(--color-accent)] opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        <StickyNote size={20} />
                      </div>
                      <button
                          onClick={() => deleteNote(note.id)}
                          className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 bg-[var(--color-background-tertiary)] rounded-lg text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-accent)] mb-2">
                      <BookOpen size={12} />
                      <span>{getCourseTitle(note.courseId)}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 leading-relaxed flex-1">
                      {note.text}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border-light)]">
                      <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-[10px] flex items-center justify-center font-bold border-2 border-[var(--color-background-primary)]">
                        {userProfile.firstName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[11px] font-medium text-[var(--color-text-tertiary)]">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
        )}

        {/* Add Note Modal */}
        {showAdd && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-[var(--color-background-secondary)] p-6 rounded-2xl w-[400px] shadow-xl border border-[var(--color-border-light)]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Add Note</h3>
                  <button onClick={() => setShowAdd(false)} className="p-1 rounded-lg hover:bg-[var(--color-background-tertiary)] transition-colors">
                    <X size={18} className="text-[var(--color-text-tertiary)]" />
                  </button>
                </div>

                <textarea
                    placeholder="Write your note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    rows={5}
                    className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-3 rounded-xl mb-3 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] text-sm resize-none"
                />

                <select
                    value={newNoteCourseId}
                    onChange={(e) => setNewNoteCourseId(Number(e.target.value))}
                    className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-3 rounded-xl mb-5 outline-none focus:border-[var(--color-accent)] text-[var(--color-text-primary)] text-sm"
                >
                  <option value={0}>General</option>
                  {allCourses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>

                <div className="flex gap-3 justify-end">
                  <button
                      onClick={() => setShowAdd(false)}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-sm font-bold hover:bg-[var(--color-border-medium)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleAddNote}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-bold hover:brightness-110 transition-all"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
