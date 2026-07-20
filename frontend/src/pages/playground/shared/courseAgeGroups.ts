import type { AgeGroupId, Course } from "./types";

export const AGE_GROUP_IDS: AgeGroupId[] = [
  "Sproutlings (5-7 age)",
  "Saplings (7-14 age)",
  "Pathfinders (14-18 age)",
  "Dreamers (18+ age)",
];

/**
 * Returns the explicit age groups for a course.
 * If no age groups are set, returns an empty array —
 * the course will only appear under the "All" tab.
 */
export function getCourseAgeGroups(course: Course): AgeGroupId[] {
  if (course.ageGroups?.length) return course.ageGroups;
  return [];
}

export function normalizeAgeGroupId(value: string): string {
  return value.replace(/[–—]/g, "-");
}

export function courseMatchesAgeGroup(course: Course, activeAgeGroup: string): boolean {
  const normalized = normalizeAgeGroupId(activeAgeGroup);
  // "All" always shows every course
  if (normalized === "All") return true;
  // Specific age group tab — only show courses explicitly tagged with it
  return getCourseAgeGroups(course).includes(normalized as AgeGroupId);
}
