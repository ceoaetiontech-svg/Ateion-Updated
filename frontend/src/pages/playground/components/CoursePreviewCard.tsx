import { useMemo } from "react";
import { Play, ArrowRight, Code, Palette, Heart, Globe, Brain, Bot, Sparkles, BookOpen, Trophy, Users, Unlock } from "lucide-react";
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

// Returns currency symbol from currency code
function getCurrencySymbol(currency?: string): string {
    switch ((currency || "INR").toUpperCase()) {
        case "USD": return "$";
        case "EUR": return "€";
        default:    return "₹";
    }
}

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
    const currencySymbol = getCurrencySymbol(course.currency);

    // Resolve pricing display values
    const hasPricing = !course.isFree && (course.sellingPrice || course.price);
    const selling = parseFloat(course.sellingPrice || course.price || "0");
    const original = parseFloat(course.originalPrice || "0");
    const hasDiscount = original > 0 && original > selling;
    const discount = course.discountPercentage ??
        (hasDiscount ? Math.round(((original - selling) / original) * 100) : 0);
    const unlockLabel = course.buttonText || "Unlock Course";

    return (
        <div className="w-full h-full flex flex-col group">
            {/* Cover Art Box */}
            <div className="h-48 w-full relative flex items-center justify-center overflow-hidden shrink-0">
                {/* Dynamic zooming background image container */}
                <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ background: course.image ? `url(${course.image}) center/cover` : coverGradient }}
                />

                {course.image && (
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)` }} />
                )}

                {/* Decorative Icon */}
                <DecorativeIcon size={80} className="text-white/10 absolute -right-4 -bottom-4 rotate-12 transition-transform duration-500 group-hover:scale-110" />

                {/* Free / Paid Badge (top-left overlay) */}
                {course.isFree ? (
                    <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-md backdrop-blur-md text-[11px] font-black uppercase tracking-wider border bg-emerald-500/85 border-emerald-400/40 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        Free
                    </div>
                ) : (
                    <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-md backdrop-blur-md text-[11px] font-black uppercase tracking-wider border bg-gradient-to-r from-orange-600/95 to-amber-500/95 border-amber-400/40 text-white shadow-[0_0_10px_rgba(234,88,12,0.35)]">
                        {hasDiscount ? `${discount}% OFF` : "Premium"}
                    </div>
                )}

                {/* Glowing Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Animated Play button Overlay */}
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[var(--color-accent)] shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Play size={20} fill="currentColor" className="ml-1" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                    {/* Topic Badge + Enrollment count */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                            className="text-[12px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md"
                            style={{
                                color: topicColor,
                                backgroundColor: `${topicColor}15`
                            }}
                        >
                            {course.topics[0] || "General"}
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-[var(--color-text-tertiary)]">
                            <Users size={13} className="shrink-0" />
                            {course.enrollments.toLocaleString()}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[22px] font-black text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug tracking-tight line-clamp-1">
                        {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2.5">
                        <img
                            src={course.instructorAvatar}
                            alt={course.instructor}
                            className="w-6 h-6 rounded-full object-cover shrink-0 border border-[var(--color-border-light)]"
                        />
                        <span className="text-sm text-[var(--color-text-tertiary)] font-semibold">
                            By {course.instructor}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed pt-0.5">
                        {course.description || `A comprehensive deep dive into ${course.topics.slice(0, 2).join(" and ")}.`}
                    </p>
                </div>

                {/* ── Pricing + CTA block ─────────────────────────────────────── */}
                <div className="pt-4 mt-4 border-t border-[var(--color-border-light)]/60 space-y-3">
                    {/* Lesson + Level meta */}
                    <div className="flex items-center gap-3 text-[13px] text-[var(--color-text-tertiary)] font-semibold">
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={15} />
                            {course.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]/40" />
                            {course.level}
                        </span>
                    </div>

                    {/* Price row */}
                    {course.isFree ? (
                        /* ── FREE badge ─────────────────────────────────────── */
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/12 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[15px] font-black tracking-wide">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                    <path d="m9 12 2 2 4-4"/>
                                </svg>
                                FREE
                            </span>
                            <div className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 text-sm font-extrabold">
                                <span>Explore</span>
                                <ArrowRight size={15} />
                            </div>
                        </div>
                    ) : (
                        /* ── PAID pricing block ──────────────────────────────── */
                        <div className="space-y-3">
                            {/* Price figures */}
                            <div className="flex items-center gap-2.5 flex-wrap">
                                {hasDiscount && (
                                    <span className="text-[18px] text-[var(--color-text-tertiary)] font-semibold line-through">
                                        {currencySymbol}{original.toLocaleString("en-IN")}
                                    </span>
                                )}
                                <span className="text-3xl font-black text-[var(--color-text-primary)]">
                                    {currencySymbol}{selling.toLocaleString("en-IN")}
                                </span>
                                {hasDiscount && discount > 0 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-orange-500/12 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-[12px] font-black tracking-wide">
                                        {discount}% OFF
                                    </span>
                                )}
                            </div>
                            {/* Unlock CTA */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-[15px] font-bold transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
                                style={{ background: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)" }}
                            >
                                <Unlock size={15} />
                                {unlockLabel}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
