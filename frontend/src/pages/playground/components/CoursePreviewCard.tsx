import { useMemo } from "react";
import { Play, ArrowRight, Code, Palette, Heart, Globe, Brain, Bot, Sparkles, BookOpen, Trophy, Users } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface CoursePreviewCardProps {
    course: Course;
    onReadMore?: () => void;
    onPreview?: () => void;
    accentColor?: string;
    tourId?: string;
}

const TOPIC_ICONS: Record<string, typeof Brain> = {
    "AI": Bot,
    "Coding": Code,
    "Languages": Globe,
    "Art": Palette,
    "Mental Health": Heart,
    "Curious Kitty": Brain,
    "Finance": Trophy,
    "Advanced Skills": Sparkles,
};

export default function CoursePreviewCard({ course }: CoursePreviewCardProps) {
    const coverGradient = useMemo(() => {
        const color = getTopicColor(course.topics);
        return `linear-gradient(135deg, ${color}dd 0%, ${color}55 100%)`;
    }, [course.topics]);

    const DecorativeIcon = useMemo(() => {
        const matched = course.topics.find(t => TOPIC_ICONS[t]);
        return matched ? TOPIC_ICONS[matched] : BookOpen;
    }, [course.topics]);

    const topicColor = getTopicColor(course.topics);

    return (
        <div className="w-full h-full flex flex-col group">
            {/* Cover Art Box */}
            <div
                className="h-44 w-full relative flex items-center justify-center overflow-hidden shrink-0"
                style={{ background: course.image ? `url(${course.image}) center/cover` : coverGradient }}
            >
                {course.image && (
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)` }} />
                )}

                {/* Decorative Icon */}
                <DecorativeIcon size={80} className="text-white/10 absolute -right-4 -bottom-4 rotate-12 transition-transform duration-500 group-hover:scale-110" />

                {/* Free/Premium Badge */}
                <div className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-md backdrop-blur-md text-[9px] font-extrabold uppercase tracking-wider border ${course.isFree ? "bg-black/50 border-white/10 text-white" : "bg-gradient-to-r from-yellow-600/90 to-amber-500/90 border-yellow-400/40 text-white shadow-[0_0_10px_rgba(234,179,8,0.3)]"}`}>
                    {course.isFree ? "Free" : "Premium"}
                </div>

                {/* Glowing Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Animated Play button Overlay */}
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[var(--color-accent)] shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Play size={20} fill="currentColor" className="ml-1" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                    {/* Topic Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                            style={{
                                color: topicColor,
                                backgroundColor: `${topicColor}15`
                            }}
                        >
                            {course.topics[0] || "General"}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-text-tertiary)]">
                            <Users size={11} />
                            {course.enrollments.toLocaleString()}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-1">
                        {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2">
                        <img
                            src={course.instructorAvatar}
                            alt={course.instructor}
                            className="w-5 h-5 rounded-full object-cover shrink-0 border border-[var(--color-border-light)]"
                        />
                        <span className="text-xs text-[var(--color-text-tertiary)] font-medium">
                            By {course.instructor}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed pt-0.5">
                        {course.description || `A comprehensive deep dive into ${course.topics.slice(0, 2).join(" and ")}.`}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--color-border-light)]/60 text-[var(--color-text-tertiary)]">
                    <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                            <BookOpen size={13} />
                            {course.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]/40" />
                            {course.level}
                        </span>
                    </div>
                    <div className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1 text-xs font-bold">
                        <span>Explore</span>
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}
