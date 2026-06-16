import type { IActivityEntry } from "../types/types";

export const RECENT_ACTIVITY: IActivityEntry[] = [
  { id: "a1", action: "New course published", detail: "Introduction to AI", time: "2 hours ago", type: "course" },
  { id: "a2", action: "Student enrolled", detail: "Alice Chen joined Advanced UX Design", time: "4 hours ago", type: "user" },
  { id: "a3", action: "Payment received", detail: "$49 from Marcus Johnson", time: "6 hours ago", type: "payment" },
  { id: "a4", action: "Course updated", detail: "Data Science Fundamentals — Module 3 revised", time: "1 day ago", type: "course" },
  { id: "a5", action: "New user registered", detail: "Sarah Williams created a student account", time: "1 day ago", type: "user" },
];
