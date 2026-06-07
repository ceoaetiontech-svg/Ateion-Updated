import { useState, useMemo } from "react";
import { MY_COURSES_DATA } from "../shared/mockData";
import type { Course } from "../shared/types";

export function useCourses(query: string = "", enrolledIds?: number[]) {
  const [courses] = useState(MY_COURSES_DATA);

  const allCourses = useMemo(() => {
    if (!enrolledIds) return courses;
    return courses.map(c => ({
      ...c,
      isEnrolled: enrolledIds.includes(c.id),
    }));
  }, [courses, enrolledIds]);

  const filtered = allCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase()),
  );

  const myCourses = allCourses.filter(c => c.isEnrolled || c.progress > 0);
  const discoverCourses = allCourses.filter(c => !c.isEnrolled && c.progress === 0);

  const lastResume = myCourses
    .filter((c) => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)[0];

  return { courses: filtered, allCourses, lastResume, enrolledCourses: myCourses, myCourses, discoverCourses };
}
