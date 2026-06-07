import { useState, useEffect } from "react";
import { CheckCircle, Lock, Play, Download, FileText, ChevronDown } from "lucide-react";

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  isLocked: boolean;
  isCurrent: boolean;
}

export interface Section {
  title: string;
  lessons: Lesson[];
}

export const SECTIONS: Section[] = [
  {
    title: "Getting Started",
    lessons: [
      { id: 1, title: "Introduction & Setup", duration: "12:34", completed: true, isLocked: false, isCurrent: false },
      { id: 2, title: "Core Concepts Overview", duration: "15:20", completed: true, isLocked: false, isCurrent: false },
      { id: 3, title: "Your First Project", duration: "18:45", completed: false, isLocked: false, isCurrent: true },
    ],
  },
  {
    title: "Intermediate Topics",
    lessons: [
      { id: 4, title: "State Management Deep Dive", duration: "22:10", completed: false, isLocked: false, isCurrent: false },
      { id: 5, title: "Advanced Patterns", duration: "20:30", completed: false, isLocked: true, isCurrent: false },
      { id: 6, title: "Performance Optimization", duration: "25:00", completed: false, isLocked: true, isCurrent: false },
    ],
  },
  {
    title: "Advanced Modules",
    lessons: [
      { id: 7, title: "Testing Strategies", duration: "28:15", completed: false, isLocked: true, isCurrent: false },
      { id: 8, title: "Deployment & CI/CD", duration: "19:40", completed: false, isLocked: true, isCurrent: false },
    ],
  },
];

export const COURSE_SECTIONS: Record<number, Section[]> = {
  1: [
    {
      title: "React Foundations",
      lessons: [
        { id: 1, title: "Introduction & Setup", duration: "12:34", completed: false, isLocked: false, isCurrent: false },
        { id: 2, title: "Core Concepts Overview", duration: "15:20", completed: false, isLocked: false, isCurrent: false },
        { id: 3, title: "Your First Project", duration: "18:45", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "TypeScript Integration",
      lessons: [
        { id: 4, title: "TypeScript with React", duration: "22:10", completed: false, isLocked: false, isCurrent: false },
        { id: 5, title: "Generics & Advanced Types", duration: "20:30", completed: false, isLocked: true, isCurrent: false },
        { id: 6, title: "State Management Deep Dive", duration: "25:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Advanced Patterns",
      lessons: [
        { id: 7, title: "Compound Components", duration: "28:15", completed: false, isLocked: true, isCurrent: false },
        { id: 8, title: "Render Props & HOCs", duration: "19:40", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
  2: [
    {
      title: "Data Foundations",
      lessons: [
        { id: 101, title: "What is Data Science?", duration: "10:00", completed: false, isLocked: false, isCurrent: false },
        { id: 102, title: "Python for Data Analysis", duration: "18:30", completed: false, isLocked: false, isCurrent: false },
        { id: 103, title: "Jupyter Notebooks", duration: "14:20", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "Statistics & Probability",
      lessons: [
        { id: 104, title: "Descriptive Statistics", duration: "20:15", completed: false, isLocked: false, isCurrent: false },
        { id: 105, title: "Probability Distributions", duration: "22:40", completed: false, isLocked: true, isCurrent: false },
        { id: 106, title: "Hypothesis Testing", duration: "25:10", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Machine Learning Basics",
      lessons: [
        { id: 107, title: "Linear Regression", duration: "28:00", completed: false, isLocked: true, isCurrent: false },
        { id: 108, title: "Classification Algorithms", duration: "30:20", completed: false, isLocked: true, isCurrent: false },
        { id: 109, title: "Model Evaluation", duration: "18:45", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Capstone Project",
      lessons: [
        { id: 110, title: "Data Cleaning & EDA", duration: "35:00", completed: false, isLocked: true, isCurrent: false },
        { id: 111, title: "Model Building", duration: "40:00", completed: false, isLocked: true, isCurrent: false },
        { id: 112, title: "Presentation & Insights", duration: "15:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
  3: [
    {
      title: "Frontend Foundations",
      lessons: [
        { id: 201, title: "HTML & CSS Review", duration: "15:00", completed: false, isLocked: false, isCurrent: false },
        { id: 202, title: "JavaScript Essentials", duration: "22:30", completed: false, isLocked: false, isCurrent: false },
        { id: 203, title: "Building Your First Page", duration: "20:00", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "React & Node.js",
      lessons: [
        { id: 204, title: "React Components & Hooks", duration: "28:15", completed: false, isLocked: false, isCurrent: false },
        { id: 205, title: "Node.js & Express API", duration: "32:00", completed: false, isLocked: true, isCurrent: false },
        { id: 206, title: "Connecting Frontend to Backend", duration: "26:30", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Database & Deployment",
      lessons: [
        { id: 207, title: "MongoDB Fundamentals", duration: "24:00", completed: false, isLocked: true, isCurrent: false },
        { id: 208, title: "Authentication & Security", duration: "30:00", completed: false, isLocked: true, isCurrent: false },
        { id: 209, title: "Deployment with Docker", duration: "22:15", completed: false, isLocked: true, isCurrent: false },
        { id: 210, title: "Final Project", duration: "45:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
  4: [
    {
      title: "Design Fundamentals",
      lessons: [
        { id: 301, title: "Color Theory & Typography", duration: "14:30", completed: false, isLocked: false, isCurrent: false },
        { id: 302, title: "Layout & Composition", duration: "18:00", completed: false, isLocked: false, isCurrent: false },
        { id: 303, title: "Design Thinking Process", duration: "21:15", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "Figma & Prototyping",
      lessons: [
        { id: 304, title: "Figma Basics", duration: "20:00", completed: false, isLocked: false, isCurrent: false },
        { id: 305, title: "Component Libraries", duration: "25:30", completed: false, isLocked: true, isCurrent: false },
        { id: 306, title: "Interactive Prototypes", duration: "28:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "User Research & Testing",
      lessons: [
        { id: 307, title: "User Interviews", duration: "18:45", completed: false, isLocked: true, isCurrent: false },
        { id: 308, title: "Usability Testing", duration: "22:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
  5: [
    {
      title: "Python for ML",
      lessons: [
        { id: 401, title: "Python Review for ML", duration: "16:00", completed: false, isLocked: false, isCurrent: false },
        { id: 402, title: "NumPy & Pandas", duration: "24:30", completed: false, isLocked: false, isCurrent: false },
        { id: 403, title: "Data Visualization", duration: "20:00", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "Supervised Learning",
      lessons: [
        { id: 404, title: "Linear & Logistic Regression", duration: "30:00", completed: false, isLocked: false, isCurrent: false },
        { id: 405, title: "Decision Trees & Random Forests", duration: "28:15", completed: false, isLocked: true, isCurrent: false },
        { id: 406, title: "Support Vector Machines", duration: "26:30", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Unsupervised & Deep Learning",
      lessons: [
        { id: 407, title: "Clustering Algorithms", duration: "24:00", completed: false, isLocked: true, isCurrent: false },
        { id: 408, title: "Neural Networks Intro", duration: "35:00", completed: false, isLocked: true, isCurrent: false },
        { id: 409, title: "TensorFlow Basics", duration: "32:00", completed: false, isLocked: true, isCurrent: false },
        { id: 410, title: "Capstone Project", duration: "50:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
  6: [
    {
      title: "React Native Basics",
      lessons: [
        { id: 501, title: "Environment Setup", duration: "15:00", completed: false, isLocked: false, isCurrent: false },
        { id: 502, title: "Core Components", duration: "22:00", completed: false, isLocked: false, isCurrent: false },
        { id: 503, title: "Navigation & Routing", duration: "25:00", completed: false, isLocked: false, isCurrent: true },
      ],
    },
    {
      title: "Building Mobile UI",
      lessons: [
        { id: 504, title: "Styling & Theming", duration: "20:30", completed: false, isLocked: false, isCurrent: false },
        { id: 505, title: "Forms & User Input", duration: "24:00", completed: false, isLocked: true, isCurrent: false },
        { id: 506, title: "Animations & Gestures", duration: "28:15", completed: false, isLocked: true, isCurrent: false },
      ],
    },
    {
      title: "Native Features & Deployment",
      lessons: [
        { id: 507, title: "Camera & Permissions", duration: "22:30", completed: false, isLocked: true, isCurrent: false },
        { id: 508, title: "Push Notifications", duration: "20:00", completed: false, isLocked: true, isCurrent: false },
        { id: 509, title: "App Store Deployment", duration: "35:00", completed: false, isLocked: true, isCurrent: false },
      ],
    },
  ],
};

interface CurriculumSidebarProps {
  sections: Section[];
  currentLessonId: number;
  completedIds: Set<number>;
  onLessonSelect: (lesson: Lesson) => void;
}

export default function CurriculumSidebar({ sections, currentLessonId, completedIds, onLessonSelect }: CurriculumSidebarProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const s of sections) {
      if (s.lessons.some(l => !completedIds.has(l.id) && !l.isLocked)) {
        initial[s.title] = true;
      } else {
        initial[s.title] = false;
      }
    }
    return initial;
  });

  useEffect(() => {
    setExpanded(prev => {
      const next = { ...prev };
      for (const s of sections) {
        const hasIncomplete = s.lessons.some(l => !completedIds.has(l.id) && !l.isLocked);
        if (hasIncomplete && !next[s.title]) next[s.title] = true;
      }
      return next;
    });
  }, [completedIds, sections]);

  const toggle = (title: string) => setExpanded(p => ({ ...p, [title]: !p[title] }));

  return (
    <div className="p-4">
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
        <FileText size={16} className="text-[var(--color-accent)]" />
        Course Content
      </h3>
      <div className="space-y-1">
        {sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full py-2 px-1 cursor-pointer hover:bg-[var(--color-background-tertiary)] rounded-lg transition-colors text-left"
            >
              <span className="text-xs font-semibold text-[var(--color-text-primary)]">{section.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--color-text-tertiary)]">{section.lessons.filter(l => completedIds.has(l.id)).length}/{section.lessons.length}</span>
                <ChevronDown size={14} className={`text-[var(--color-text-tertiary)] transition-transform duration-200 ${expanded[section.title] ? "rotate-0" : "-rotate-90"}`} />
              </div>
            </button>
            {expanded[section.title] && (
              <div className="ml-2 border-l border-[var(--color-border-light)] pl-2 space-y-0.5">
                {section.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    disabled={lesson.isLocked}
                    onClick={() => onLessonSelect(lesson)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-sm transition-all w-full text-left ${
                      currentLessonId === lesson.id
                        ? "bg-[var(--color-accent)]/10 font-bold text-[var(--color-accent)]"
                        : lesson.isLocked
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {completedIds.has(lesson.id) ? (
                      <CheckCircle size={15} className="text-[var(--color-success)] shrink-0" />
                    ) : lesson.isLocked ? (
                      <Lock size={15} className="text-[var(--color-text-tertiary)] shrink-0" />
                    ) : (
                      <Play size={15} className="text-[var(--color-accent)] shrink-0" fill={currentLessonId === lesson.id ? "currentColor" : "none"} />
                    )}
                    <span className="flex-1 truncate text-xs">{lesson.title}</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] shrink-0">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-[var(--color-border-light)]">
        <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
          <Download size={14} className="text-[var(--color-accent)]" />
          Resources
        </h4>
        <div className="space-y-2">
          {["Lesson Slides.pdf", "Exercise Files.zip", "Cheat Sheet.pdf"].map((name) => (
            <div key={name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-background-tertiary)] cursor-pointer transition-colors text-xs text-[var(--color-text-secondary)]">
              <FileText size={13} className="text-[var(--color-text-tertiary)] shrink-0" />
              <span className="truncate">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
