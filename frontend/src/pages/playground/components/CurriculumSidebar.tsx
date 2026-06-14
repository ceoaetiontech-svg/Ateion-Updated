import { useState, memo } from "react";
import { CheckCircle, Play, FileText, ChevronDown } from "lucide-react";

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

interface CurriculumSidebarProps {
  sections: Section[];
  currentLessonId: number | null;
  completedIds: Set<number>;
  onLessonSelect: (lesson: Lesson) => void;
}

function CurriculumSidebar({ sections, currentLessonId, completedIds, onLessonSelect }: CurriculumSidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const s of sections) initial[s.title] = true;
    return initial;
  });

  const toggle = (title: string) => setExpanded(p => ({ ...p, [title]: !p[title] }));

  return (
      <div className="p-4">
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
          <FileText size={16} className="text-[var(--color-accent)]" /> Course Content
        </h3>
        <div className="space-y-1">
          {sections.map((section) => (
              <div key={section.title}>
                <button onClick={() => toggle(section.title)} className="flex items-center justify-between w-full py-2 px-1 cursor-pointer hover:bg-[var(--color-background-tertiary)] rounded-lg transition-colors text-left">
                  <span className="text-xs font-semibold text-[var(--color-text-primary)]">{section.title}</span>
                  <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${expanded[section.title] ? "rotate-0" : "-rotate-90"}`} />
                </button>
                {expanded[section.title] && (
                    <div className="ml-2 border-l border-[var(--color-border-light)] pl-2 space-y-0.5">
                      {section.lessons.map((lesson) => (
                          <button key={lesson.id} disabled={lesson.isLocked} onClick={() => onLessonSelect(lesson)} className={`flex items-center gap-3 p-2.5 rounded-lg text-sm transition-all w-full text-left ${ currentLessonId === lesson.id ? "bg-[var(--color-accent)]/10 font-bold text-[var(--color-accent)]" : "hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)]"}`}>
                            {completedIds.has(lesson.id) ? (
                                <CheckCircle size={15} className="text-[var(--color-success)] shrink-0" />
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
      </div>
  );
}

export default memo(CurriculumSidebar);