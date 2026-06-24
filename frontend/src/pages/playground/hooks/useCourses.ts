import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiRequestError, fetchJsonWithRetry } from "../../../lib/apiClient";
import type { AgeGroupId, Course } from "../shared/types";

interface BackendCourse {
  id: number | string;
  title?: string | null;
  description?: string | null;
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
  // ── Pricing v2 ────────────────────────────────────────────────────────────
  originalPrice?: number | string | null;
  sellingPrice?: number | string | null;
  discountPercentage?: number | string | null;
  currency?: string | null;
  buttonText?: string | null;
  // ── Age Group v2 ────────────────────────────────────────────────────
  ageGroup?: string | null;
  // ── Course Highlights ───────────────────────────────────────────────────
  highlights?: string | null;
}

const COURSE_REQUEST_ATTEMPTS = 8;
const VALID_AGE_GROUPS = new Set<AgeGroupId>([
  "Sproutlings (5-7 age)",
  "Saplings (7-14 age)",
  "Pathfinders (14-18 age)",
  "Dreamers (18+ age)",
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

  // Support comma-separated multiple age groups (e.g. "Sproutlings (5-7 age), Saplings (7-14 age)")
  const parts = value.split(",").map((s) => s.trim().replace(/[–—]/g, "-") as AgeGroupId).filter(Boolean);
  const valid = parts.filter((p) => VALID_AGE_GROUPS.has(p));
  return valid.length > 0 ? valid : undefined;
}

// ── Category normalizer ─────────────────────────────────────────────────────
// Maps legacy DB values (old CourseUploadView IDs) to the pill names
// used on DiscoverCoursesPage. Case-insensitive.
const CATEGORY_ALIASES: Record<string, string> = {
  "technology":              "AI",
  "technology & engineering":"AI",
  "business":                "Finance",
  "business & management":   "Finance",
  "design":                  "Art",
  "design & arts":           "Art",
  "science":                 "Advanced Skills",
  "applied sciences":        "Advanced Skills",
  "university":              "Advanced Skills",
  "university students":     "Advanced Skills",
  "advance skills":          "Advanced Skills",
  "general":                 "",
};

function normalizeCategoryName(raw: string): string {
  return CATEGORY_ALIASES[raw.toLowerCase()] ?? raw;
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
    description: course.description?.trim() || "",
    instructor: "Ateion Instructor",
    instructorAvatar: "https://i.pravatar.cc/150?u=ateion",
    image: course.image?.trim() || "",
    progress: 0,
    completed: 0,
    total: videoCount,
    students: enrollments,
    enrollments,
    level: course.ageSegment?.trim() || "All Levels",
    duration: "Self-paced",
    lessons: videoCount,
    lastAccessedAt: 0,
    currentLesson: 1,
    rating: toNumber(course.rating, 5),
    language: "English",
    isFree: course.isFree !== false,
    price: course.price != null ? String(course.price) : "0",
    // ── Pricing v2 ──────────────────────────────────────────────────────────
    originalPrice: course.originalPrice != null ? String(course.originalPrice) : undefined,
    sellingPrice: course.sellingPrice != null ? String(course.sellingPrice) : undefined,
    discountPercentage: course.discountPercentage != null ? toNumber(course.discountPercentage) : undefined,
    currency: course.currency?.trim() || "INR",
    buttonText: course.buttonText?.trim() || "Unlock Course",
    // ────────────────────────────────────────────────────────────────────────
    // Use ONLY the dedicated ageGroup column for age group filtering.
    // ageSegment is now for skill levels (Beginner/Intermediate/etc.)
    // If ageGroup is empty → course shows under "All" only.
    ageGroups: toAgeGroups(course.ageGroup),
    topics: course.category?.trim()
        ? course.category
            .split(",")
            .map((c) => normalizeCategoryName(c.trim()))
            .filter(Boolean)
        : [],
    // Parse pipe-separated highlights into an array (max 3)
    highlights: course.highlights?.trim()
        ? course.highlights.split("|").map((h) => h.trim()).filter(Boolean).slice(0, 3)
        : undefined,
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
