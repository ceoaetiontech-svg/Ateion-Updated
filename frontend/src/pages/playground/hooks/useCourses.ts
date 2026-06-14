import { useCallback, useEffect, useMemo, useState } from "react";
import { MY_COURSES_DATA } from "../shared/mockData";
import type { AgeGroupId, Course } from "../shared/types";

export function useCourses(
    query: string = "",
    enrolledIds?: number[],
    courseAccess?: Record<number, number>,
) {
  const [courses, setCourses] = useState<Course[]>(MY_COURSES_DATA);

  const fetchDbCourses = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const headers: HeadersInit = token
          ? {
            Authorization: `Bearer ${token}`,
          }
          : {};

      const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/content/courses`,
          { headers },
      );

      if (!response.ok) {
        throw new Error(`Course request failed (${response.status})`);
      }

      const dbCourses = await response.json();

      if (!Array.isArray(dbCourses)) {
        throw new Error("Backend returned an invalid courses response");
      }

      const mappedCourses: Course[] = dbCourses.map((course: any) => ({
        id: Number(course.id),
        title: course.title ?? "Untitled Course",

        instructor: "Ateion Instructor",
        instructorAvatar: "https://i.pravatar.cc/150?u=ateion",

        image:
            course.image ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",

        progress: 0,
        completed: 0,
        total: 0,

        students: Number(course.enrollments ?? 0),
        enrollments: Number(course.enrollments ?? 0),

        level: "All Levels",
        duration: "Dynamic",
        lessons: Number(course.videoCount ?? 0),

        lastAccessedAt: 0,
        currentLesson: 1,

        rating: Number(course.rating ?? 5),
        language: "English",

        isFree: course.isFree ?? true,
        price: course.price ?? "0",

        ageGroups: course.ageSegment
            ? [course.ageSegment as AgeGroupId]
            : [],

        topics: course.category
            ? [course.category]
            : ["General"],

        createdAt: course.createdAt
            ? new Date(course.createdAt).getTime()
            : Date.now(),

        isEnrolled: false,
      }));

      // Once the backend responds, use real database courses.
      setCourses(mappedCourses);
    } catch (error) {
      console.error(
          "Failed to fetch database courses; using fallback data:",
          error,
      );

      setCourses(MY_COURSES_DATA);
    }
  }, []);

  useEffect(() => {
    void fetchDbCourses();

    const handleCoursesChanged = () => {
      void fetchDbCourses();
    };

    window.addEventListener(
        "ateion:courses-changed",
        handleCoursesChanged,
    );

    return () => {
      window.removeEventListener(
          "ateion:courses-changed",
          handleCoursesChanged,
      );
    };
  }, [fetchDbCourses]);

  const allCourses = useMemo(
      () =>
          courses.map((course) => ({
            ...course,

            isEnrolled:
                enrolledIds?.includes(course.id) ??
                course.isEnrolled ??
                false,

            lastAccessedAt:
                courseAccess?.[course.id] ??
                course.lastAccessedAt,
          })),
      [courses, enrolledIds, courseAccess],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return allCourses;
    }

    return allCourses.filter(
        (course) =>
            course.title.toLowerCase().includes(normalizedQuery) ||
            course.instructor.toLowerCase().includes(normalizedQuery),
    );
  }, [allCourses, query]);

  const myCourses = useMemo(
      () =>
          allCourses.filter(
              (course) =>
                  course.isEnrolled === true ||
                  course.progress > 0,
          ),
      [allCourses],
  );

  const discoverCourses = useMemo(
      () =>
          allCourses.filter(
              (course) =>
                  course.isEnrolled !== true &&
                  course.progress === 0,
          ),
      [allCourses],
  );

  // IMPORTANT:
  // [0] returns one Course instead of Course[].
  const lastResume = useMemo(
      () =>
          myCourses
              .filter(
                  (course) =>
                      course.progress > 0 &&
                      course.progress < 100,
              )
              .sort(
                  (a, b) =>
                      b.lastAccessedAt - a.lastAccessedAt,
              )[0],
      [myCourses],
  );

  return {
    courses: filtered,
    allCourses,
    lastResume,
    enrolledCourses: myCourses,
    myCourses,
    discoverCourses,
    refreshCourses: fetchDbCourses,
  };
}