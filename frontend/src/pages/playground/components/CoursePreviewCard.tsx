import { useState, useEffect } from "react";
import { Star, Clock, PlayCircle, ArrowRight, Monitor } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface CoursePreviewCardProps {
    course: Course;
    onReadMore?: () => void;
    onPreview?: () => void;
    accentColor?: string;
    tourId?: string;
}

const FALLBACK_COURSE_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";

export default function CoursePreviewCard({ course, onReadMore, onPreview, accentColor, tourId }: CoursePreviewCardProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1023px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const cardAccent = accentColor || "var(--color-accent)";

    return (
        <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
            {/* Thumbnail with Dynamic Badges & Hover Overlay */}
            <div className="w-full aspect-video relative overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
                {/* Level Badge (Top-Left) */}
                <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md backdrop-blur-md border text-[9px] font-extrabold uppercase tracking-wider ${
                    course.isFree
                        ? "bg-black/50 border-white/10 text-white"
                        : "bg-gradient-to-r from-yellow-600/90 to-amber-500/90 border-yellow-400/40 text-white shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                }`}>
                    {course.isFree ? "Free" : "Premium"}
                </div>

                {/* Duration Badge (Bottom-Right) */}
                <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-extrabold text-white flex items-center gap-1">
                    <Clock size={10} />
                    <span>{course.duration}</span>
                </div>

                <img 
                    src={course.image || FALLBACK_COURSE_IMAGE} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                        e.currentTarget.src = FALLBACK_COURSE_IMAGE;
                    }}
                />
                
                {/* Glowing Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 z-10" />
                
                {/* Animated Play button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <PlayCircle size={24} style={{ color: cardAccent }} />
                    </div>
                </div>

                <div
                    className="absolute bottom-0 left-0 w-full h-1"
                    style={{ backgroundColor: getTopicColor(course.topics) }}
                />
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1">
                {/* Topic Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.topics.slice(0, 2).map((topic) => {
                        const topicColor = getTopicColor([topic]);
                        return (
                            <span 
                                key={topic} 
                                className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1.5"
                                style={{ 
                                    color: topicColor,
                                    backgroundColor: `${topicColor}10`
                                }}
                            >
                                <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: topicColor }} />
                                {topic}
                            </span>
                        );
                    })}
                </div>

                {/* Title */}
                <h4 className="text-[15px] font-extrabold text-[var(--color-text-primary)] mb-4 line-clamp-2 leading-snug min-h-[40px] group-hover:text-[var(--color-accent)] transition-colors">
                    {course.title}
                </h4>

                {/* Instructor & Rating Row (Horizontal, aligned to center) */}
                <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mt-auto mb-4">
                    <div className="flex items-center gap-2 min-w-0">
                        <img 
                            src={course.instructorAvatar} 
                            alt={course.instructor} 
                            className="w-6 h-6 rounded-full object-cover shrink-0 border border-[var(--color-border-light)]" 
                        />
                        <span className="truncate font-semibold text-[var(--color-text-primary)]">{course.instructor}</span>
                    </div>
                    
                    {/* Compact Rating Badge */}
                    <div className="flex items-center gap-1 shrink-0 font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-2 py-0.5 rounded-md text-[11px]">
                        <Star size={11} fill="var(--color-warning)" className="text-[var(--color-warning)] shrink-0" />
                        <span>{course.rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Secondary Meta Row */}
                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-tertiary)] font-bold pt-3.5 border-t border-[var(--color-border-light)]/40 shrink-0">
                    <span className="uppercase tracking-wider flex items-center gap-1">
                        <Monitor size={11} />
                        {course.lessons} lessons
                    </span>
                    <span className="uppercase tracking-wider">
                        {course.enrollments.toLocaleString()} students
                    </span>
                </div>
            </div>

            {/* Button Area */}
            <div className="px-5 pb-5 shrink-0 w-full flex flex-col gap-2">
                {isMobile && onReadMore ? (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); if (onReadMore) onReadMore(); }}
                            style={{ backgroundColor: cardAccent }}
                            className="w-full text-white py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-all text-center shadow-md cursor-pointer"
                        >
                            Read More
                        </button>
                        {onPreview && (
                            <button
                                onClick={(e) => { e.stopPropagation(); if (onPreview) onPreview(); }}
                                data-tour={tourId}
                                className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-3 rounded-xl text-sm font-bold hover:border-[var(--color-accent)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PlayCircle size={16} /> Preview Course
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); if (onPreview) onPreview(); }}
                        data-tour={tourId}
                        style={{
                            "--hover-bg": cardAccent,
                            "--hover-border": cardAccent
                        } as React.CSSProperties}
                        className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-2.5 rounded-xl text-xs font-bold text-center group-hover:bg-[var(--hover-bg)] group-hover:text-white group-hover:border-[var(--hover-bg)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)] transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                    >
                        <span>Preview Course</span>
                        <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                )}
            </div>
        </div>
    );
}
