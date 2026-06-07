export interface UserProfile {
  fullName: string;
  firstName: string;
  segmentText: string;
  isPremium: boolean;
}

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
  topics: string[];
  enrollments: number;
  createdAt: number;
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
