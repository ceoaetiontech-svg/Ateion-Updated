import {
  BookOpen,
  BookMarked,
  Compass,
  Award,
  Sparkles,
  Sprout,
  Heart,
  Lightbulb,
  StickyNote,
  FolderKanban,
  CheckSquare,
  Calendar,
  FileText,
  Milestone,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

export interface NavSection {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", icon: BookMarked, path: "/playground/my-courses" },
      { title: "Saved Courses", icon: Heart, path: "/playground/saved" },
      { title: "Discover Courses", icon: Compass, path: "/playground/discover" },
      { title: "Completed Courses", icon: Award, path: "/playground/completed" },
    ],
  },
  {
    title: "Evolve",
    icon: Sprout,
    items: [
      { title: "Wellness Hub", icon: Heart, path: "/playground/wellness" },
      { title: "Growth Mindset", icon: Lightbulb, path: "/playground/growth-mindset" },
      { title: "Daily Reflection", icon: StickyNote, path: "/playground/reflection" },
    ],
  },
  {
    title: "Organise",
    icon: FolderKanban,
    items: [
      { title: "Tasks", icon: CheckSquare, path: "/playground/tasks" },
      { title: "Calendar", icon: Calendar, path: "/playground/calendar" },
      { title: "Notes", icon: FileText, path: "/playground/notes" },
    ],
  },
  {
    title: "Age Groups",
    icon: Milestone,
    items: [
      { title: "Sproutlings (5-7 age)", icon: Sprout, path: "/playground/sproutlings" },
      { title: "Saplings (7-14 age)", icon: Sprout, path: "/playground/saplings" },
      { title: "Pathfinders (14-18 age)", icon: Compass, path: "/playground/pathfinders" },
      { title: "Dreamers (18+ age)", icon: Sparkles, path: "/playground/dreamers" },
    ],
  },
];

const pathToTitle: Record<string, string> = {};
for (const section of navigationSections) {
  for (const item of section.items) {
    pathToTitle[item.path] = item.title;
  }
}

export function getActiveView(pathname: string): string {
  return pathToTitle[pathname] ?? "Dashboard";
}
