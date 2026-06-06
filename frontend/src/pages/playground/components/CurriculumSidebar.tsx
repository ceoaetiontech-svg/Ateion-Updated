import { useState } from "react";
import { CheckCircle, Lock, Play, Download, FileText, ChevronDown } from "lucide-react";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  isLocked: boolean;
  isCurrent: boolean;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export const SECTIONS: Section[] = [
  {
    title: "Getting Started",
    lessons: [
      { id: 1, title: "Introduction & Setup", duration: "12:34", completed: true, isLocked: false, isCurrent: false },
      { id: 2, title: "Core Concepts Overview", duration: "15:20", completed: true, isLocked: false, isCurrent: false },
      { id: 3, title: "Your First Project", duration: "18:45", completed: false, isLocked: false, isCurrent: true },
    ],
  },
  {
    title: "Intermediate Topics",
    lessons: [
      { id: 4, title: "State Management Deep Dive", duration: "22:10", completed: false, isLocked: false, isCurrent: false },
      { id: 5, title: "Advanced Patterns", duration: "20:30", completed: false, isLocked: true, isCurrent: false },
      { id: 6, title: "Performance Optimization", duration: "25:00", completed: false, isLocked: true, isCurrent: false },
    ],
  },
  {
    title: "Advanced Modules",
    lessons: [
      { id: 7, title: "Testing Strategies", duration: "28:15", completed: false, isLocked: true, isCurrent: false },
      { id: 8, title: "Deployment & CI/CD", duration: "19:40", completed: false, isLocked: true, isCurrent: false },
    ],
  },
];

interface CurriculumSidebarProps {
  currentLessonId: number;
  completedIds: Set<number>;
  onLessonSelect: (lesson: Lesson) => void;
}

export default function CurriculumSidebar({ currentLessonId, completedIds, onLessonSelect }: CurriculumSidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const s of SECTIONS) {
      if (s.lessons.some(l => !completedIds.has(l.id) && !l.isLocked)) {
        initial[s.title] = true;
      } else {
        initial[s.title] = false;
      }
    }
    return initial;
  });

  const toggle = (title: string) => setExpanded(p => ({ ...p, [title]: !p[title] }));

  return (
    <div className="p-4">
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <FileText size={16} className="text-[var(--color-accent)]" />
        Course Content
      </h3>
      <div className="space-y-1">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full py-2 px-1 cursor-pointer hover:bg-[var(--color-background-tertiary)] rounded-lg transition-colors text-left"
            >
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">{section.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--color-text-tertiary)]">{section.lessons.filter(l => completedIds.has(l.id)).length}/{section.lessons.length}</span>
                <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${expanded[section.title] ? "rotate-0" : "-rotate-90"}`} />
              </div>
            </button>
            {expanded[section.title] && (
              <div className="ml-2 border-l border-[var(--color-border-light)] pl-2 space-y-0.5">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    disabled={lesson.isLocked}
                    onClick={() => onLessonSelect(lesson)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-sm transition-all w-full text-left ${
                      currentLessonId === lesson.id
                        ? "bg-[var(--color-accent)]/10 font-bold text-[var(--color-accent)]"
                        : lesson.isLocked
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {completedIds.has(lesson.id) ? (
                      <CheckCircle size={15} className="text-[var(--color-success)] shrink-0" />
                    ) : lesson.isLocked ? (
                      <Lock size={15} className="text-[var(--color-text-tertiary)] shrink-0" />
                    ) : (
                      <Play size={15} className="text-[var(--color-accent)] shrink-0" fill={currentLessonId === lesson.id ? "currentColor" : "none"} />
                    )}
                    <span className="flex-1 truncate text-xs">{lesson.title}</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] shrink-0">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-[var(--color-border-light)]">
        <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
          <Download size={14} className="text-[var(--color-accent)]" />
          Resources
        </h4>
        <div className="space-y-2">
          {["Lesson Slides.pdf", "Exercise Files.zip", "Cheat Sheet.pdf"].map((name) => (
            <div key={name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-background-tertiary)] cursor-pointer transition-colors text-xs text-[var(--color-text-secondary)]">
              <FileText size={13} className="text-[var(--color-text-tertiary)] shrink-0" />
              <span className="truncate">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
