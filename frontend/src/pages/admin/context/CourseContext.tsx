import { createContext, useContext } from "react";
import type { ICourseItem } from "../types/types";

interface ICourseContext {
  courses: ICourseItem[];
  addCourse: (course: Omit<ICourseItem, "id" | "createdAt" | "enrollments">) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (id: string, updates: Partial<ICourseItem>) => void;
}

const CourseContext = createContext<ICourseContext>({
  courses: [],
  addCourse: () => {},
  deleteCourse: () => {},
  updateCourse: () => {},
});

// Not wrapped anywhere — consumers get default empty context (mock data handled in pages directly)
export function useCourses() {
  return useContext(CourseContext);
}
