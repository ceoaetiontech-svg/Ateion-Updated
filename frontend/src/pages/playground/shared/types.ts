export interface UserProfile {
  fullName: string;
  firstName: string;
  segmentText: string;
  isPremium: boolean;
}

export type AgeGroupId = "Sproutlings (5-7 age)" | "Saplings (7-14 age)" | "Pathfinders (14-18 age)" | "Dreamers (18+ age)";

export interface Task {
  id: number;
  title: string;
  date: string;
  priority: string;
  completed: boolean;
}

export interface NewTask {
  title: string;
  date: string;
  priority: string;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  image: string;
  progress: number;
  completed: number;
  total: number;
  students: number;
  level: string;
  duration: string;
  lessons: number;
  lastAccessedAt: number;
  currentLesson: number;
  rating: number;
  language: string;
  isFree: boolean;
  price?: string;
  originalPrice?: string;
  ageGroups?: AgeGroupId[];
  topics: string[];
  enrollments: number;
  createdAt: number;
  previewModuleId: number | null;
  isEnrolled?: boolean;
}

export interface Note {
  id: number;
  courseId: number;
  lessonId: number;
  text: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime: string;
  type: "mentoring" | "meeting" | "focus" | "deadline";
  description?: string;
  link?: string;
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const slideInItem = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
};

export interface IAudioChapter {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  startTimestamp?: number;
}

export interface IAudiobook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  category: string;
  duration: number;
  isSingleFile: boolean;
  chapters: IAudioChapter[];
  createdAt: string;
}
