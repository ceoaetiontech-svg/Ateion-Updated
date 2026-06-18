import { useState, useEffect } from "react";
import { Star, Clock, PlayCircle, ArrowRight } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface CoursePreviewCardProps {
    course: Course;
    onReadMore?: () => void;
    onPreview?: () => void;
    accentColor?: string;
}

const FALLBACK_COURSE_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";

export default function CoursePreviewCard({ course, onReadMore, onPreview, accentColor }: CoursePreviewCardProps) {
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
            {/* Thumbnail with Dynamic Hover Overlay */}
            <div className="w-full aspect-video relative overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
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
                {/* Topic Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.topics.slice(0, 2).map((topic) => {
                        const topicColor = getTopicColor([topic]);
                        return (
                            <span 
                                key={topic} 
                                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                                style={{ 
                                    color: topicColor,
                                    backgroundColor: `${topicColor}15`
                                }}
                            >
                                {topic}
                            </span>
                        );
                    })}
                </div>

                <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-2.5 line-clamp-2 leading-tight min-h-[40px] group-hover:text-[var(--color-accent)] transition-colors">
                    {course.title}
                </h4>

                <div className="flex items-center gap-2 mb-3 h-[24px] shrink-0 text-xs text-[var(--color-text-secondary)]">
                    <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full object-cover shrink-0" />
                    <span className="truncate font-medium">{course.instructor}</span>
                </div>

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

                <div className="flex items-center gap-3 h-[16px] shrink-0 text-[11px] text-[var(--color-text-secondary)] font-medium mt-auto">
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><PlayCircle size={12} /> {course.lessons} lessons</span>
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
                                className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-3 rounded-xl text-sm font-bold hover:border-[var(--color-accent)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <PlayCircle size={16} /> Preview Course
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); if (onPreview) onPreview(); }}
                        style={{
                            "--hover-bg": cardAccent,
                            "--hover-border": cardAccent
                        } as React.CSSProperties}
                        className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-2.5 rounded-xl text-xs font-bold text-center group-hover:bg-[var(--hover-bg)] group-hover:text-white group-hover:border-[var(--hover-border)] transition-all flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                    >
                        <span>Preview Course</span>
                        <ArrowRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                )}
            </div>
        </div>
    );
}
