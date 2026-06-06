import { useState } from "react";
import { MY_COURSES_DATA } from "../shared/mockData";
import type { Course } from "../shared/types";

export function useCourses(query: string = "") {
  const [courses] = useState(MY_COURSES_DATA);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase()),
  );

  const lastResume = courses
    .filter((c) => c.progress > 0 && c.progress < 100)
    .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)[0];

  return { courses: filtered, allCourses: courses, lastResume };
}
