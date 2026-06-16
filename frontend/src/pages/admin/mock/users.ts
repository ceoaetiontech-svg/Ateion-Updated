import type { IUser } from "../types/types";

export const MOCK_USERS: IUser[] = [
  { id: "u1", name: "Alice Chen", email: "alice.c@university.edu", role: "Student", status: "Active", joinedAt: "2025-11-12T00:00:00.000Z" },
  { id: "u2", name: "Marcus Johnson", email: "mjohnson@ateion.com", role: "Admin", status: "Active", joinedAt: "2023-01-05T00:00:00.000Z" },
  { id: "u3", name: "Sarah Williams", email: "swilliams@corporate.org", role: "Partner", status: "Active", joinedAt: "2024-06-22T00:00:00.000Z" },
  { id: "u4", name: "David Lee", email: "david.lee@student.org", role: "Student", status: "Suspended", joinedAt: "2026-02-14T00:00:00.000Z" },
  { id: "u5", name: "Elena Rodriguez", email: "erodriguez@ateion.com", role: "Instructor", status: "Active", joinedAt: "2024-11-30T00:00:00.000Z" },
  { id: "u6", name: "James Smith", email: "jsmith99@gmail.com", role: "Student", status: "Active", joinedAt: "2026-04-01T00:00:00.000Z" },
];
