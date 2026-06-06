import { Command } from "cmdk";
import { Search, BookOpen, User, Hash } from "lucide-react";
import { useNavigate } from "react-router";
import { MY_COURSES_DATA } from "../shared/mockData";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const instructors = Array.from(new Set(MY_COURSES_DATA.map(c => c.instructor)));
  const topics = Array.from(new Set(MY_COURSES_DATA.flatMap(c => c.topics)));

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search courses"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm"
      contentClassName="w-full max-w-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border-light)]">
        <Search size={18} className="text-[var(--color-text-tertiary)] shrink-0" />
        <Command.Input
          placeholder="Search courses, instructors, topics..."
          className="flex-1 bg-transparent text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary/0.5)] text-sm"
        />
      </div>
      <Command.List className="max-h-72 overflow-y-auto p-2">
        <Command.Empty className="py-8 text-center text-sm text-[var(--color-text-tertiary)]">
          No results found
        </Command.Empty>
        <Command.Group heading="Courses" className="text-xs font-semibold text-[var(--color-text-tertiary)] px-3 pt-3 pb-1">
          {MY_COURSES_DATA.map(course => (
            <Command.Item
              key={course.id}
              value={`${course.title} ${course.instructor}`}
              onSelect={() => {
                onOpenChange(false);
                navigate(`/playground/course/${course.id}`);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-[var(--color-text-primary)] aria-selected:bg-[var(--color-accent)] aria-selected:text-[var(--color-text-inverse)] data-[disabled]:opacity-50 transition-colors"
            >
              <BookOpen size={14} className="shrink-0 opacity-60" />
              <div className="flex-1 min-w-0">
                <span className="font-medium truncate block">{course.title}</span>
                <span className="text-xs opacity-60 truncate block">{course.instructor} · {course.level}</span>
              </div>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Instructors" className="text-xs font-semibold text-[var(--color-text-tertiary)] px-3 pt-3 pb-1">
          {instructors.map(name => (
            <Command.Item
              key={name}
              value={name}
              onSelect={() => onOpenChange(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm text-[var(--color-text-primary)] aria-selected:bg-[var(--color-accent)] aria-selected:text-[var(--color-text-inverse)] transition-colors"
            >
              <User size={14} className="shrink-0 opacity-60" />
              {name}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Topics" className="text-xs font-semibold text-[var(--color-text-tertiary)] px-3 pt-3 pb-1">
          {topics.map(topic => (
            <Command.Item
              key={topic}
              value={topic}
              onSelect={() => onOpenChange(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm text-[var(--color-text-primary)] aria-selected:bg-[var(--color-accent)] aria-selected:text-[var(--color-text-inverse)] transition-colors"
            >
              <Hash size={14} className="shrink-0 opacity-60" />
              {topic}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      <div className="flex items-center gap-4 px-5 py-3 border-t border-[var(--color-border-light)] text-xs text-[var(--color-text-tertiary)]">
        <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] font-mono">↑↓</kbd> navigate</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] font-mono">↵</kbd> select</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] font-mono">Esc</kbd> close</span>
      </div>
    </Command.Dialog>
  );
}
