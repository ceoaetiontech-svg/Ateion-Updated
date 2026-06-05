import {
  BookOpen,
  BookMarked,
  Compass,
  Map,
  Award,
  Rocket,
  ListVideo,
  TrendingUp,
  Zap,
  Sparkles,
  Sprout,
  Heart,
  Brain,
  Lightbulb,
  Smile,
  Wind,
  StickyNote,
  FolderKanban,
  CheckSquare,
  Calendar,
  FileText,
  Target,
  FolderOpen,
  Milestone,
} from "lucide-react";

export interface NavItem {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

export interface NavSection {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "Courses",
    icon: BookOpen,
    items: [
      { title: "My Courses", icon: BookMarked },
      { title: "Discover Courses", icon: Compass },
      { title: "Learning Paths", icon: Map },
      { title: "Completed Courses", icon: Award },
    ],
  },
  {
    title: "Upskill",
    icon: Rocket,
    items: [
      { title: "Skill Playlists", icon: ListVideo },
      { title: "Trending Skills", icon: TrendingUp },
      { title: "Certifications", icon: Award },
      { title: "Quick Learning", icon: Zap },
      { title: "AI Skills", icon: Sparkles },
    ],
  },
  {
    title: "Evolve",
    icon: Sprout,
    items: [
      { title: "Wellness Hub", icon: Heart },
      { title: "Mental Health", icon: Brain },
      { title: "Growth Mindset", icon: Lightbulb },
      { title: "Confidence Building", icon: Smile },
      { title: "Stress Management", icon: Wind },
      { title: "Daily Reflection", icon: StickyNote },
    ],
  },
  {
    title: "Organise",
    icon: FolderKanban,
    items: [
      { title: "Tasks", icon: CheckSquare },
      { title: "Calendar", icon: Calendar },
      { title: "Notes", icon: FileText },
      { title: "Goal Planning", icon: Target },
      { title: "Resources", icon: FolderOpen },
    ],
  },
  {
    title: "Pillar",
    icon: Milestone,
    items: [
      { title: "Sproutlings (5–7)", icon: Sprout },
      { title: "Saplings (7–14)", icon: Sprout },
      { title: "Pathfinders (14–18)", icon: Compass },
      { title: "Dreamers (18+)", icon: Sparkles },
    ],
  },
];
