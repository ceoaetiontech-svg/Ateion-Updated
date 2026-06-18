import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, BookOpen } from "lucide-react";
import type { ICourseItem } from "../../types/types";

interface Props {
  course: ICourseItem | null;
  onClose: () => void;
  onSave: (id: string, updates: Partial<ICourseItem>) => void;
}

export default function CourseEditDrawer({ course, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("technology");
  const [price, setPrice] = useState("0");
  const [status, setStatus] = useState<"Published" | "Draft" | "Archived">("Draft");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setSubtitle(course.subtitle || "");
      setCategory(course.category || "technology");
      setPrice(course.price?.toString() || "0");
      setStatus(course.status || "Draft");
      setThumbnailUrl(course.thumbnailUrl || "");
    }
  }, [course]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    onSave(course.id, {
      title,
      subtitle,
      category,
      price: parseFloat(price) || 0,
      status,
      thumbnailUrl: thumbnailUrl || undefined,
    });
    onClose();
  };

  const categories = [
    { id: "technology", name: "Technology & Engineering" },
    { id: "business", name: "Business & Management" },
    { id: "design", name: "Design & Arts" },
    { id: "science", name: "Applied Sciences" },
    { id: "university", name: "University Students" },
  ];

  const statuses: ("Published" | "Draft" | "Archived")[] = ["Published", "Draft", "Archived"];

  return (
    <AnimatePresence>
      {course && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-over Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[480px] z-[600] bg-[var(--color-background-primary)] border-l border-[var(--color-border-light)] shadow-[var(--shadow-xl)] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shrink-0">
              <div>
                <h2 className="text-lg font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">Edit Course</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">ID: #{course.id}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-background-tertiary)]/50 transition-colors cursor-pointer text-[var(--color-text-secondary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Scrollable Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Course Image Preview */}
              <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center border border-[var(--color-accent)]/20 shadow-sm overflow-hidden group relative">
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <BookOpen size={48} className="text-[var(--color-accent)]/40" />
                )}
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                  Preview
                </div>
              </div>

              {/* Course Title */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Course Title</label>
                  <span className={`text-[10px] font-medium transition-colors ${title.length >= 80 ? "text-amber-500" : "text-[var(--color-text-tertiary)]"}`}>
                    {title.length}/80 characters
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={80}
                  className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] font-medium text-sm"
                  placeholder="e.g. Advanced System Design"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Subtitle / Description</label>
                <textarea
                  className="w-full p-3 h-24 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] text-sm resize-none"
                  placeholder="Provide a brief subtitle or description..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Published" | "Draft" | "Archived")}
                  className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Price (INR)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] font-bold text-sm">₹</span>
                  <input
                    type="number"
                    min="0"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] text-sm font-semibold"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(Math.max(0, parseFloat(e.target.value) || 0).toString())}
                  />
                  {parseFloat(price) === 0 && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-wide">
                      Free
                    </span>
                  )}
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Thumbnail / Cover Image URL</label>
                <input
                  type="url"
                  className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] text-sm"
                  placeholder="https://images.unsplash.com/..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
              </div>
            </form>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 transition-colors text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
