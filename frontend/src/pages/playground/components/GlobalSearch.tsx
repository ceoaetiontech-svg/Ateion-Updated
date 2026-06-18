import { useMemo } from "react";
import { Command } from "cmdk";
import { Search, BookOpen, User, Hash, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useCourses } from "../hooks/useCourses";
import type { Course } from "../shared/types";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const itemClassName =
    "flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3.5 py-3.5 text-sm text-[var(--color-text-primary)] outline-none transition-colors data-[disabled=true]:opacity-50 data-[selected=true]:border-[var(--color-accent)]/30 data-[selected=true]:bg-[var(--color-accent_light)]";

const groupClassName =
    "space-y-1.5 px-1 py-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-[var(--color-text-secondary)]";

export default function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const { allCourses, isLoading, error } = useCourses("", undefined, undefined, open);

  const instructors = useMemo(
      () => Array.from(new Set(allCourses.map((course) => course.instructor))),
      [allCourses],
  );

  const topics = useMemo(
      () => Array.from(new Set(allCourses.flatMap((course) => course.topics))),
      [allCourses],
  );

  const openCourse = (course: Course) => {
    onOpenChange(false);

    if (localStorage.getItem("token")) {
      navigate(`/playground/course/${course.id}`);
      return;
    }

    if (course.previewModuleId) {
      navigate(`/course-preview/${course.previewModuleId}`);
      return;
    }

    window.dispatchEvent(new CustomEvent("open-login"));
  };

  return (
      <Command.Dialog
          open={open}
          onOpenChange={onOpenChange}
          label="Search courses"
          className="flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
          overlayClassName="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
          contentClassName="fixed left-1/2 top-3 z-[101] w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-3xl outline-none sm:top-[10vh] sm:w-[min(92vw,42rem)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-primary)]/70 px-4 py-3 sm:px-5 sm:py-4">
          <Search size={18} className="shrink-0 text-[var(--color-text-tertiary)]" />
          <Command.Input
              placeholder="Search courses, instructors, topics..."
              className="min-w-0 flex-1 bg-transparent text-[16px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-tertiary)] sm:text-sm"
          />
          <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"
              aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>

        <Command.List className="max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain p-3 sm:max-h-[28rem]">
          {isLoading && (
              <div className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
                Loading courses…
              </div>
          )}

          {!isLoading && error && (
              <div className="py-10 text-center text-sm text-[var(--color-error)]">
                {error}
              </div>
          )}

          {!isLoading && !error && (
              <>
                <Command.Empty className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
                  No results found
                </Command.Empty>

                <Command.Group heading="Courses" className={groupClassName}>
                  {allCourses.map((course) => (
                      <Command.Item
                          key={course.id}
                          value={`${course.title} ${course.instructor} ${course.topics.join(" ")}`}
                          onSelect={() => openCourse(course)}
                          className={itemClassName}
                      >
                        <BookOpen size={15} className="shrink-0 text-[var(--color-text-tertiary)]" />
                        <div className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-[var(--color-text-primary)]">
                      {course.title}
                    </span>
                          <span className="block truncate text-xs font-medium text-[var(--color-text-secondary)]">
                      {course.instructor} - {course.level}
                    </span>
                        </div>
                      </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Instructors" className={groupClassName}>
                  {instructors.map((name) => (
                      <Command.Item
                          key={name}
                          value={name}
                          onSelect={() => onOpenChange(false)}
                          className={itemClassName}
                      >
                        <User size={15} className="shrink-0 text-[var(--color-text-tertiary)]" />
                        <span className="min-w-0 truncate font-medium text-[var(--color-text-primary)]">
                    {name}
                  </span>
                      </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Topics" className={groupClassName}>
                  {topics.map((topic) => (
                      <Command.Item
                          key={topic}
                          value={topic}
                          onSelect={() => onOpenChange(false)}
                          className={itemClassName}
                      >
                        <Hash size={15} className="shrink-0 text-[var(--color-text-tertiary)]" />
                        <span className="min-w-0 truncate font-medium text-[var(--color-text-primary)]">
                    {topic}
                  </span>
                      </Command.Item>
                  ))}
                </Command.Group>
              </>
          )}
        </Command.List>

        <div className="hidden items-center gap-4 border-t border-[var(--color-border-light)] bg-[var(--color-background-primary)]/70 px-5 py-3 text-xs text-[var(--color-text-secondary)] sm:flex">
        <span>
          <kbd className="rounded bg-[var(--color-background-tertiary)] px-1.5 py-0.5 font-mono text-[var(--color-text-primary)]">Up/Down</kbd> navigate
        </span>
          <span>
          <kbd className="rounded bg-[var(--color-background-tertiary)] px-1.5 py-0.5 font-mono text-[var(--color-text-primary)]">Enter</kbd> select
        </span>
          <span>
          <kbd className="rounded bg-[var(--color-background-tertiary)] px-1.5 py-0.5 font-mono text-[var(--color-text-primary)]">Esc</kbd> close
        </span>
        </div>
      </Command.Dialog>
  );
}
