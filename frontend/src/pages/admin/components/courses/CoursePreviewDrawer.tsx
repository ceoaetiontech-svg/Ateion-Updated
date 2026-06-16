import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Users, DollarSign, Layers, Book, FileText } from "lucide-react";
import Badge from "../ui/Badge";
import type { ICourseItem } from "../../types/types";

interface Props {
  course: ICourseItem | null;
  onClose: () => void;
}

export default function CoursePreviewDrawer({ course, onClose }: Props) {
  return (
    <AnimatePresence>
      {course && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[480px] z-[600] bg-[var(--color-background-primary)] border-l border-[var(--color-border-light)] shadow-xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]">
              <h2 className="text-lg font-bold font-['OV_Soge']">Course Preview</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-background-tertiary)] transition-colors cursor-pointer text-[var(--color-text-secondary)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-border-medium)]">
                {course.thumbnailUrl ? (
                  <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <BookOpen size={48} className="text-[var(--color-accent)]/40" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="status" value={course.status} />
                  <span className="text-xs text-[var(--color-text-tertiary)]">ID: #{course.id}</span>
                </div>
                <h3 className="text-2xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)] mb-1">{course.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{course.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs mb-1">
                    <Users size={14} />
                    Instructor
                  </div>
                  <p className="font-semibold text-sm">{course.instructor}</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs mb-1">
                    <BookOpen size={14} />
                    Category
                  </div>
                  <p className="font-semibold text-sm capitalize">{course.category}</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs mb-1">
                    <Users size={14} />
                    Enrollments
                  </div>
                  <p className="font-semibold text-sm">{course.enrollments}</p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs mb-1">
                    <DollarSign size={14} />
                    Price
                  </div>
                  <p className="font-semibold text-sm">{course.price === 0 ? "Free" : `$${course.price}`}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={16} className="text-[var(--color-accent)]" />
                  <h4 className="font-bold text-sm">Modules ({course.modules.length})</h4>
                </div>
                <div className="space-y-2">
                  {course.modules.map((mod, i) => (
                    <div
                      key={mod.id}
                      className="p-3 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--color-accent)]">
                          {i + 1}
                        </div>
                        <p className="font-semibold text-sm">{mod.title}</p>
                      </div>
                      <ul className="ml-8 space-y-0.5">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1.5">
                            <Book size={10} />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
