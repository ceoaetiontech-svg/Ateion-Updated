import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { useCourses } from "../context/CourseContext";

interface SearchResult {
  id: string;
  label: string;
  description: string;
  type: "course" | "user";
  path: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { courses } = useCourses();
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const results: SearchResult[] = [
    ...courses.map((c) => ({
      id: c.id,
      label: c.title,
      description: `${c.category} · ${c.status}`,
      type: "course" as const,
      path: "/admin/courses",
    })),
  ];

  const filtered = query.trim()
    ? results.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()),
      )
    : results;

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.path);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[900]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[560px] z-[950] px-4 sm:px-0"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border-light)]">
                <Search size={18} className="text-[var(--color-text-tertiary)] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search courses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] text-sm"
                />
                <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] text-[10px] font-mono text-[var(--color-text-tertiary)]">
                  ESC
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filtered.length > 0 ? (
                  filtered.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[var(--color-background-tertiary)] transition-all text-left group cursor-pointer border-b border-[var(--color-border-light)] last:border-0 active:scale-[0.995]"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                          result.type === "course"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-emerald-500/10 text-emerald-500"
                        }`}
                      >
                        <BookOpen size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">{result.label}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)] truncate">{result.description}</p>
                      </div>
                      <ArrowRight size={14} className="text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 shrink-0" />
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center mb-3 text-[var(--color-text-tertiary)]">
                      <Search size={20} className="opacity-80" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">No results found</p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Try a different search term</p>
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-[var(--color-border-light)] bg-[var(--color-background-primary)]/40 backdrop-blur-sm flex items-center gap-4 text-[10px] text-[var(--color-text-tertiary)]">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">↵</kbd>
                  Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">ESC</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
