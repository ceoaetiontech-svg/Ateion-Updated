import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, PlayCircle, Heart, ChevronRight, BarChart2 } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface NetflixHoverCardProps {
  course: Course;
  onReadMore: () => void;
  onPreview: () => void;
  onSave: () => void;
  isSaved: boolean;
  cardClass?: string;
}

const FALLBACK_COURSE_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";

export default function NetflixHoverCard({
  course,
  onReadMore,
  onPreview,
  onSave,
  isSaved,
  cardClass = "",
}: NetflixHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"center" | "left" | "right">("center");
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Determine card placement in the viewport to prevent screen edge clipping
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const cardWidth = rect.width;
        
        // If card is too close to left or right screen edges, adjust transform origin
        if (rect.left < cardWidth * 0.2) {
          setPosition("left");
        } else if (screenWidth - rect.right < cardWidth * 0.2) {
          setPosition("right");
        } else {
          setPosition("center");
        }
      }
      setIsHovered(true);
    }, 200); // 200ms delay to prevent accidental hovers while scrolling
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const topicColor = getTopicColor(course.topics);
  const isBestseller = course.rating >= 4.7;

  // CSS origin classes mapping
  const originClass = 
    position === "left" 
      ? "origin-left" 
      : position === "right" 
      ? "origin-right" 
      : "origin-center";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[350px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Card Placeholder (maintains layout integrity when hovered card scales up/floats) */}
      <div className={`w-full h-full flex flex-col opacity-100 ${isHovered ? "invisible" : "visible"} ${cardClass}`}>
        {/* Thumbnail */}
        <div className="w-full aspect-video relative overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
          <img
            src={course.image || FALLBACK_COURSE_IMAGE}
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: topicColor }} />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 leading-tight min-h-[44px]">
            {course.title}
          </h4>
          <div className="flex items-center gap-2 mb-3 h-[24px] shrink-0 text-xs text-[var(--color-text-secondary)]">
            <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full object-cover shrink-0" />
            <span className="truncate font-semibold">{course.instructor}</span>
          </div>
          {course.progress > 0 ? (
            <div className="mb-4 mt-auto w-full">
              <div className="flex justify-between items-center mb-1 text-[10px] font-bold">
                <span className="text-[var(--color-text-primary)]">{course.progress}% complete</span>
                <span className="text-[var(--color-text-tertiary)]">{course.completed}/{course.total} lessons</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--color-border-light)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88]" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mb-4 h-[16px] shrink-0">
              <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className="text-[var(--color-warning)]"
                    fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                ({course.enrollments.toLocaleString()})
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 mt-auto h-[16px] shrink-0 text-[11px] text-[var(--color-text-secondary)] font-medium">
            <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
            <span className="flex items-center gap-1"><BarChart2 size={12} /> {course.level}</span>
          </div>
        </div>
      </div>

      {/* Hover Card Container (Absolute Overlay) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 0 }}
            animate={{ scale: 1.06, opacity: 1, y: -8 }}
            exit={{ scale: 0.95, opacity: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`absolute top-0 left-0 w-full z-50 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-deep)] rounded-[20px] overflow-hidden cursor-pointer border border-[var(--color-border-medium)] transition-all ${originClass}`}
            onClick={onReadMore}
          >
            {/* Aspect Video Banner */}
            <div className="w-full aspect-video relative overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
              <img
                src={course.image || FALLBACK_COURSE_IMAGE}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: topicColor }} />
              
              {/* Badge Overlay */}
              {isBestseller && (
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#e8856a] text-white text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                  Bestseller
                </span>
              )}
            </div>

            {/* Content & Hidden Expanding Area */}
            <div className="p-4 flex flex-col gap-3">
              <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight">
                {course.title}
              </h4>

              {/* Quick Info & Topics */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[var(--color-warning)] flex items-center gap-0.5">
                  <Star size={12} className="fill-[var(--color-warning)]" />
                  {course.rating.toFixed(1)}
                </span>
                <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold">•</span>
                <span className="text-[11px] font-semibold text-[var(--color-success)]">{course.level}</span>
                <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold">•</span>
                <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">{course.duration}</span>
              </div>

              {/* Mini Description or Progress */}
              {course.progress > 0 ? (
                <div className="w-full bg-black/5 dark:bg-black/25 p-3 rounded-xl border border-[var(--color-border-light)]">
                  <div className="flex justify-between items-center mb-1 text-[10px] font-bold">
                    <span className="text-[var(--color-text-primary)]">{course.progress}% complete</span>
                    <span className="text-[var(--color-text-tertiary)]">{course.completed}/{course.total} lessons</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--color-border-light)] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88]" style={{ width: `${course.progress}%` }} />
                  </div>
                  {course.progress === 100 && (
                    <span className="text-[10px] font-bold text-[var(--color-success)] mt-1.5 flex items-center gap-1">
                      🏆 Course complete!
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-[12px] text-[var(--color-text-secondary)] leading-normal line-clamp-2">
                  Build real-world projects, master {course.level.toLowerCase()} concepts, and elevate your capability index in {course.topics.join(" & ")}.
                </p>
              )}

              {/* Topics Pills */}
              <div className="flex flex-wrap gap-1 mt-1">
                {course.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border bg-[var(--color-background-primary)]"
                    style={{ borderColor: `${topicColor}25`, color: topicColor }}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[var(--color-border-light)]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReadMore();
                    }}
                    className="flex-1 bg-[var(--color-accent)] hover:brightness-105 active:scale-[0.98] text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    {course.progress === 100 ? "View Certificate" : course.progress > 0 ? "Continue Learning" : "Start Course"}
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave();
                    }}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isSaved
                        ? "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error)]/10"
                        : "border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]"
                    }`}
                    aria-label="Save course"
                  >
                    <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                  }}
                  className="w-full bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlayCircle size={14} />
                  Preview Course
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
