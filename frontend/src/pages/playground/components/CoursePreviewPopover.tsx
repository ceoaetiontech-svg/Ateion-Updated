import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BarChart2, PlayCircle, Check, Heart, Play } from "lucide-react";
import { getTopicColor } from "../shared/topicColors";
import type { Course } from "../shared/types";

interface CoursePreviewPopoverProps {
  course: Course;
  children: React.ReactNode;
  onReadMore?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export default function CoursePreviewPopover({
                                               course, children, onReadMore, onPreview, onSave, isSaved
                                             }: CoursePreviewPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState<"right" | "left">("right");
  const containerRef = useRef<HTMLDivElement>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    clearTimeout(leaveTimeoutRef.current);

    enterTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.right + 380 > window.innerWidth) {
          setPosition("left");
        } else {
          setPosition("right");
        }
      }
      setIsOpen(true);
    }, 350);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const topicColor = getTopicColor(course.topics);
  const isBestseller = course.rating >= 4.7;

  return (
      <div
          ref={containerRef}
          className={`relative flex w-full h-full ${isOpen ? "z-50" : "z-10"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        {children}

        <AnimatePresence>
          {isOpen && !isMobile && (
              <motion.div
                  initial={{ opacity: 0, x: position === "right" ? -10 : 10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`absolute top-1/2 -translate-y-1/2 w-[360px] bg-[var(--color-background-secondary)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.22)] border border-[var(--color-border-medium)] ${
                      position === "right" ? "left-full ml-4" : "right-full mr-4"
                  } z- cursor-default`}
              >
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-background-secondary)] transform rotate-45 ${
                        position === "right"
                            ? "-left-2 border-b border-l border-[var(--color-border-medium)]"
                            : "-right-2 border-t border-r border-[var(--color-border-medium)]"
                    }`}
                />

                <div className="relative z-10 bg-[var(--color-background-secondary)] rounded-2xl overflow-hidden flex flex-col">
                  <div className="h-1.5 w-full" style={{ backgroundColor: topicColor }} />

                  <div className="p-6">
                    <h3 className="text-[17px] font-bold text-[var(--color-text-primary)] leading-tight mb-3">
                      {course.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {isBestseller && (
                          <span className="px-2 py-0.5 bg-[#eceb98] text-[#3d3c0a] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      Bestseller
                    </span>
                      )}
                      <span className="text-xs text-[var(--color-success)] font-bold">
                    Updated {new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric"})}
                  </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] font-medium mb-5">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BarChart2 size={14} /> {course.level}</span>
                      <span className="flex items-center gap-1"><PlayCircle size={14} /> {course.lessons} lessons</span>
                    </div>

                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-5 line-clamp-3">
                      A comprehensive deep dive into {course.topics.slice(0, 2).join(" and ")}. Master the core principles, build scalable solutions, and elevate your real-world capability index.
                    </p>

                    <div className="mb-6">
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                          <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                          <span>Build real-world {course.topics || "projects"} from scratch</span>
                        </li>
                        <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                          <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                          <span>Master {course.level.toLowerCase()} concepts & best practices</span>
                        </li>
                        <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                          <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                          <span>Increase your capability score through hands-on labs</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onReadMore) onReadMore();
                            }}
                            className="flex-1 bg-[var(--color-accent)] text-white py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-all text-center shadow-md cursor-pointer"
                        >
                          Read More
                        </button>
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSave) onSave();
                            }}
                            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                                isSaved
                                    ? "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error)]/10"
                                    : "border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]"
                            }`}
                            aria-label="Save course"
                        >
                          <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onPreview) onPreview();
                          }}
                          className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-3 rounded-xl text-sm font-bold hover:border-[var(--color-accent)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play size={16} fill="currentColor" /> Preview Course
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
