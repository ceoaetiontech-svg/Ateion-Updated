import { Star, Clock, PlayCircle } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface CoursePreviewCardProps {
    course: Course;
}

export default function CoursePreviewCard({ course }: CoursePreviewCardProps) {
    return (
        <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
            {/* Thumbnail with Topic Color Accent Bar */}
            <div className="w-full aspect-video relative overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div
                    className="absolute bottom-0 left-0 w-full h-1"
                    style={{ backgroundColor: getTopicColor(course.topics) }}
                />
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-1">
                {/* 1. Title - Reserved 2 lines of vertical space */}
                <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 leading-tight min-h-[44px]">
                    {course.title}
                </h4>

                {/* 2. Instructor Row - Fixed height */}
                <div className="flex items-center gap-2 mb-3 h-[24px] shrink-0 text-xs text-[var(--color-text-secondary)]">
                    <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full object-cover shrink-0" />
                    <span className="truncate font-medium">{course.instructor}</span>
                </div>

                {/* 3. Rating Row - Fixed height */}
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

                {/* 4. Metadata Row - Fixed height */}
                <div className="flex items-center gap-3 h-[16px] shrink-0 text-[11px] text-[var(--color-text-secondary)] font-medium">
                    <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><PlayCircle size={12} /> {course.lessons} lessons</span>
                </div>
            </div>

            {/* 5. Button Area - Always pinned to the very bottom */}
            <div className="px-4 pb-4 mt-auto shrink-0 w-full">
                <div className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-2.5 rounded-xl text-xs font-bold text-center group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] transition-all">
                    Read More
                </div>
            </div>
        </div>
    );
}
