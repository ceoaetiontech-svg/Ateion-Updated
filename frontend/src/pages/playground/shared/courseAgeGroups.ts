import type { AgeGroupId, Course } from "./types";

export const AGE_GROUP_IDS: AgeGroupId[] = [
  "Sproutlings (5-7 age)",
  "Saplings (7-14 age)",
  "Pathfinders (14-18 age)",
  "Dreamers (18+ age)",
];

export function getCourseAgeGroups(course: Course): AgeGroupId[] {
  if (course.ageGroups?.length) return course.ageGroups;

  if (course.level.includes("All Levels")) {
    return ["Saplings (7-14 age)", "Pathfinders (14-18 age)", "Dreamers (18+ age)"];
  }

  if (course.level.includes("Beginner")) {
    return ["Saplings (7-14 age)", "Pathfinders (14-18 age)"];
  }

  if (course.level.includes("Intermediate")) {
    return ["Pathfinders (14-18 age)"];
  }

  return ["Dreamers (18+ age)"];
}

export function normalizeAgeGroupId(value: string): string {
  return value.replace(/[–—]/g, "-");
}

export function courseMatchesAgeGroup(course: Course, activeAgeGroup: string): boolean {
  const normalized = normalizeAgeGroupId(activeAgeGroup);
  return normalized === "All" || getCourseAgeGroups(course).includes(normalized as AgeGroupId);
}
