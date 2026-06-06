import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { UserProfile, Task, NewTask, CalendarEvent } from "./types";

interface PlaygroundContextValue {
  courseQuery: string;
  setCourseQuery: (val: string) => void;
  userProfile: UserProfile;
  setUserProfile: (val: UserProfile) => void;
  activeAgeGroup: string;
  setActiveAgeGroup: (val: string) => void;
  tasks: Task[];
  toggleTask: (id: number) => void;
  selectedMood: string;
  setSelectedMood: (val: string) => void;
  showAddTask: boolean;
  setShowAddTask: (val: boolean) => void;
  newTask: NewTask;
  setNewTask: (val: NewTask) => void;
  handleAddTask: () => void;
  savedIds: number[];
  toggleSave: (id: number) => void;
  streak: number;
  xp: number;
  events: CalendarEvent[];
  addEvent: (e: CalendarEvent) => void;
  removeEvent: (id: number) => void;
  selectedDate: string;
  setSelectedDate: (d: string) => void;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

function loadInitialTasks(): Task[] {
  const saved = localStorage.getItem("ateion_tasks");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.error("Failed to parse tasks from localStorage");
    }
  }
  return [
    { id: 1, title: "Complete React Hooks Assignment", date: "Tomorrow", priority: "high", completed: false },
    { id: 2, title: "Watch Data Visualization Lecture", date: "May 29, 2026", priority: "medium", completed: false },
    { id: 3, title: "Submit Project Proposal", date: "May 30, 2026", priority: "high", completed: true },
  ];
}

const STREAK_KEY = "ateion_streak";

function loadSavedIds(): number[] {
  try {
    return JSON.parse(localStorage.getItem("ateion_saved") || "[]");
  } catch {
    return [];
  }
}

function loadStreak(): number {
  const saved = localStorage.getItem(STREAK_KEY);
  if (saved) {
    try {
      const { count, date } = JSON.parse(saved);
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (date === today) return count;
      if (date === yesterday) return count;
    } catch { /* ignore */ }
  }
  return 7;
}

function saveStreak(count: number) {
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count, date: new Date().toDateString() }));
}

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [courseQuery, setCourseQuery] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "Guest Explorer",
    firstName: "Student",
    segmentText: "Universal Access",
    isPremium: false,
  });
  const [activeAgeGroup, setActiveAgeGroup] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks);
  const [selectedMood, setSelectedMood] = useState("Good");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<NewTask>({ title: "", date: "", priority: "medium" });
  const [savedIds, setSavedIds] = useState<number[]>(loadSavedIds);
  const [streak, setStreak] = useState(loadStreak);
  const [xp] = useState(2840);
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem("ateion_events");
    if (saved) try { return JSON.parse(saved); } catch {}
    return [
      { id: 1, title: "Team Standup & Sync", date: "2026-05-27", time: "10:00", endTime: "11:30", type: "meeting" as const, description: "Weekly team sync" },
      { id: 2, title: "1:1 Mentoring Session", date: "2026-05-27", time: "13:00", endTime: "14:00", type: "mentoring" as const, link: "Google Meet" },
      { id: 3, title: "Focus Work: React Course", date: "2026-05-27", time: "16:00", endTime: "17:30", type: "focus" as const, description: "Chapter 4: Advanced State" },
      { id: 4, title: "Project Proposal Deadline", date: "2026-05-30", time: "23:59", endTime: "23:59", type: "deadline" as const },
      { id: 5, title: "Data Science Lecture", date: "2026-05-29", time: "14:00", endTime: "15:30", type: "focus" as const },
      { id: 6, title: "Design Review", date: "2026-06-02", time: "11:00", endTime: "12:00", type: "meeting" as const },
      { id: 7, title: "Mindfulness Session", date: "2026-06-04", time: "09:00", endTime: "09:30", type: "focus" as const },
    ];
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });

  useEffect(() => {
    localStorage.setItem("ateion_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("ateion_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    saveStreak(streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("ateion_events", JSON.stringify(events));
  }, [events]);

  const addEvent = useCallback((e: CalendarEvent) => {
    setEvents(prev => [...prev, e]);
  }, []);

  const removeEvent = useCallback((id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const toggleSave = useCallback((id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const handleAddTask = useCallback(() => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date || "Today",
      priority: newTask.priority,
      completed: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask({ title: "", date: "", priority: "medium" });
    setShowAddTask(false);
  }, [newTask]);

  return (
    <PlaygroundContext.Provider
      value={{
        courseQuery, setCourseQuery,
        userProfile, setUserProfile,
        activeAgeGroup, setActiveAgeGroup,
        tasks, toggleTask,
        selectedMood, setSelectedMood,
        showAddTask, setShowAddTask,
        newTask, setNewTask,
        handleAddTask,
        savedIds, toggleSave,
        streak, xp,
        events, addEvent, removeEvent,
        selectedDate, setSelectedDate,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}
