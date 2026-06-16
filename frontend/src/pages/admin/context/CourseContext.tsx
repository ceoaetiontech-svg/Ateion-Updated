import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { ICourseItem } from "../types/types";
import { MOCK_COURSES } from "../mock/courses";

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

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<ICourseItem[]>(MOCK_COURSES);

  const addCourse = useCallback((course: Omit<ICourseItem, "id" | "createdAt" | "enrollments">) => {
    const newCourse: ICourseItem = {
      ...course,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString(),
      enrollments: 0,
    };
    setCourses((prev) => [newCourse, ...prev]);
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCourse = useCallback((id: string, updates: Partial<ICourseItem>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  return (
    <CourseContext.Provider value={{ courses, addCourse, deleteCourse, updateCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
