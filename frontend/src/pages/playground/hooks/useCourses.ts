import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiRequestError, fetchJsonWithRetry } from "../../../lib/apiClient";
import type { AgeGroupId, Course } from "../shared/types";

interface BackendCourse {
  id: number | string;
  title?: string | null;
  category?: string | null;
  ageSegment?: string | null;
  isFree?: boolean | null;
  price?: string | number | null;
  image?: string | null;
  rating?: number | string | null;
  enrollments?: number | string | null;
  videoCount?: number | string | null;
  createdAt?: string | number | null;
  previewModuleId?: number | string | null;
}

const COURSE_REQUEST_ATTEMPTS = 8;
const VALID_AGE_GROUPS = new Set<AgeGroupId>([
  "Sproutlings (5-7)",
  "Saplings (7-14)",
  "Pathfinders (14-18)",
  "Dreamers (18+)",
]);

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toNullablePositiveInteger(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function toAgeGroups(value: unknown): AgeGroupId[] | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim().replace(/[–—]/g, "-") as AgeGroupId;
  return VALID_AGE_GROUPS.has(normalized) ? [normalized] : undefined;
}

function mapBackendCourse(course: BackendCourse): Course {
  const createdAt = course.createdAt
      ? new Date(course.createdAt).getTime()
      : 0;

  const videoCount = toNumber(course.videoCount);
  const enrollments = toNumber(course.enrollments);

  return {
    id: toNumber(course.id),
    title: course.title?.trim() || "Untitled Course",
    instructor: "Ateion Instructor",
    instructorAvatar: "https://i.pravatar.cc/150?u=ateion",
    image: course.image?.trim() || "",
    progress: 0,
    completed: 0,
    total: videoCount,
    students: enrollments,
    enrollments,
    level: "All Levels",
    duration: "Self-paced",
    lessons: videoCount,
    lastAccessedAt: 0,
    currentLesson: 1,
    rating: toNumber(course.rating, 5),
    language: "English",
    isFree: course.isFree !== false,
    price: course.price != null ? String(course.price) : "0",
    ageGroups: toAgeGroups(course.ageSegment),
    topics: course.category?.trim()
        ? [course.category.trim()]
        : ["General"],
    createdAt: Number.isFinite(createdAt) ? createdAt : 0,
    previewModuleId: toNullablePositiveInteger(course.previewModuleId),
    isEnrolled: false,
  };
}

export function useCourses(
    query = "",
    enrolledIds?: number[],
    courseAccess?: Record<number, number>,
    enabled = true,
) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [isWaking, setIsWaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDbCourses = useCallback(async (signal?: AbortSignal) => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsWaking(false);
    setError(null);

    const wakingTimer = window.setTimeout(() => {
      setIsWaking(true);
    }, 1800);

    try {
      const dbCourses = await fetchJsonWithRetry<BackendCourse[]>(
          "/content/courses",
          {
            method: "GET",
            signal,
          },
          COURSE_REQUEST_ATTEMPTS,
      );

      if (!Array.isArray(dbCourses)) {
        throw new Error("The backend returned an invalid courses response.");
      }

      setCourses(dbCourses.map(mapBackendCourse));
    } catch (fetchError) {
      if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
        return;
      }

      console.error("Failed to fetch database courses:", fetchError);
      setCourses([]);

      if (fetchError instanceof ApiRequestError && fetchError.status) {
        setError(`Could not load courses (HTTP ${fetchError.status}).`);
      } else {
        setError("Could not load courses. Please try again.");
      }
    } finally {
      window.clearTimeout(wakingTimer);

      if (!signal?.aborted) {
        setIsLoading(false);
        setIsWaking(false);
      }
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setCourses([]);
      setError(null);
      setIsLoading(false);
      setIsWaking(false);
      return;
    }

    const controller = new AbortController();
    void fetchDbCourses(controller.signal);

    const handleCoursesChanged = () => {
      void fetchDbCourses();
    };

    window.addEventListener("ateion:courses-changed", handleCoursesChanged);

    return () => {
      controller.abort();
      window.removeEventListener("ateion:courses-changed", handleCoursesChanged);
    };
  }, [enabled, fetchDbCourses]);

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
    isLoading,
    isWaking,
    error,
    refreshCourses: fetchDbCourses,
  };
}
