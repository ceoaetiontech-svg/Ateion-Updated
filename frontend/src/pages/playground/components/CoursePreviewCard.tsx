import { Star, Clock, BarChart2, PlayCircle, Users } from "lucide-react";
import type { Course } from "../shared/types";
import { getTopicColor } from "../shared/topicColors";

interface CoursePreviewCardProps {
  course: Course;
}

const LEARN_LIST: Record<number, string[]> = {
  1: ["Advanced React hooks and custom hooks", "TypeScript generics and utility types", "State management with Zustand"],
  2: ["Statistical analysis with Python", "Data visualization with Matplotlib", "Machine learning fundamentals"],
  3: ["Full-stack architecture patterns", "RESTful API design", "Database modeling with MongoDB"],
  4: ["Design thinking methodology", "Figma prototyping and collaboration", "User research and testing"],
  5: ["Supervised and unsupervised learning", "Neural networks with TensorFlow", "Model deployment strategies"],
  6: ["Cross-platform development", "Native device APIs", "App store deployment"],
};

export default function CoursePreviewCard({ course }: CoursePreviewCardProps) {
  const learnItems = LEARN_LIST[course.id] || ["Core concepts and best practices", "Hands-on projects and exercises", "Real-world applications"];

  return (
    <div className="w-72 p-4" style={{ borderTop: `3px solid ${getTopicColor(course.topics)}` }}>
      <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{course.title}</h4>
      <div className="flex items-center gap-2 mb-2">
        <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover" />
        <span className="text-xs text-[var(--color-text-secondary)]">{course.instructor}</span>
      </div>
      <div className="flex items-center gap-1 mb-3">
        <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating.toFixed(1)}</span>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={11} className="text-[var(--color-warning)]" fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"} />
        ))}
        <span className="text-xs text-[var(--color-text-tertiary)]">({course.enrollments.toLocaleString()})</span>
      </div>
      <p className="text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-2">{course.level} · {course.duration} · {course.lessons} lessons</p>
      <div className="mb-3">
        <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">What you'll learn:</p>
        <ul className="space-y-1">
          {learnItems.slice(0, 3).map((item, i) => (
            <li key={i} className="text-xs text-[var(--color-text-secondary)] flex items-start gap-1.5">
              <span className="text-[var(--color-success)] mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all">
        Enroll Now
      </button>
    </div>
  );
}
