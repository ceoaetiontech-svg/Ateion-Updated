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
  image: string;
  progress: number;
  completed: number;
  total: number;
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export const MY_COURSES_DATA: Course[] = [
  {
    id: 1,
    title: "Advanced React & TypeScript",
    instructor: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    progress: 67,
    completed: 16,
    total: 24,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    instructor: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    progress: 45,
    completed: 14,
    total: 32,
  },
  {
    id: 3,
    title: "Full Stack Web Development",
    instructor: "Alex Martinez",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    progress: 0,
    completed: 0,
    total: 28,
  }
];
