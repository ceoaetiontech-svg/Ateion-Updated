import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  BookOpen,
  Award,
  Gamepad2,
  BarChart3,
  User,
  Clock,
  CheckCircle,
  Zap,
  Target,
  ChevronRight,
  Sparkles,
  Trophy,
  FileText,
  Compass,
  ArrowRight,
  Calendar,
  Flame,
  LayoutDashboard,
  Home,
  Sun,
  Moon,
} from "lucide-react";

import SharedNavbar from "../app/components/SharedNavbar";
import NavbarSpacer from "../app/components/NavbarSpacer";
import { useTheme } from "../app/components/ThemeProvider";

// Animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
  points: number;
}

interface ActiveCourse {
  id: number;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  category: string;
  color: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // User Profile state synced with localStorage
  const [profile] = useState(() => {
    try {
      const saved = localStorage.getItem("ateion_user");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      bio: "Learning math and computer science basics.",
      careerPath: "Student Learner",
    };
  });

  const [profilePic] = useState<string>(() => {
    try {
      return localStorage.getItem("profile-pic") || "";
    } catch {}
    return "";
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : "JD";
  };

  // 1. Fetch Streak & XP metrics directly from localStorage keys
  const [streak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("ateion_streak");
      if (saved) {
        const { count } = JSON.parse(saved);
        return Number(count) || 0;
      }
    } catch {}
    return 3; // Fallback
  });

  const [xp] = useState<number>(() => {
    try {
      return Number(localStorage.getItem("ateion_xp")) || 2840;
    } catch {
      return 2840; // Fallback
    }
  });

  const [enrolledIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("ateion_enrolled") || "[]");
    } catch {
      return [];
    }
  });

  // 2. Load and synchronize Daily Tasks checklist
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem("ateion_tasks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((t: any, idx: number) => ({
            id: Number(t.id) || idx + 1,
            text: t.title || t.text || "Untitled Task",
            completed: Boolean(t.completed),
            points: t.points || (t.priority === "high" ? 50 : t.priority === "medium" ? 30 : 20)
          }));
        }
      }
    } catch {}
    
    // Default fallback mock tasks
    return [
      { id: 1, text: "Complete 2 lessons in Advanced Math", completed: false, points: 50 },
      { id: 2, text: "Solve Python daily challenge", completed: true, points: 30 },
      { id: 3, text: "Read GCO Syllabus guide", completed: false, points: 20 },
      { id: 4, text: "Check your capability scorecard", completed: true, points: 10 },
    ];
  });

  // 3. Fetch courses list and match with enrolled IDs
  const [courses, setCourses] = useState<ActiveCourse[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    let active = true;
    const loadCourses = async () => {
      try {
        const res = await fetch("/content/courses");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        
        if (active && Array.isArray(data)) {
          const mapped: ActiveCourse[] = data.map((c: any) => {
            const courseId = Number(c.id);
            const total = Number(c.videoCount) || Number(c.lessons) || 10;
            
            let completed = 0;
            try {
              const progressSaved = localStorage.getItem(`ateion_progress_${courseId}`);
              if (progressSaved) {
                completed = JSON.parse(progressSaved).length;
              }
            } catch {}
            
            const progressVal = total > 0 ? Math.round((completed / total) * 100) : 0;
            const categoryText = c.category || (c.topics && c.topics[0]) || "Skill";
            const colors = ["var(--color-accent)", "#6B8EE8", "#F2C94C", "#27AE60", "#9B51E0"];
            const color = colors[courseId % colors.length];

            return {
              id: courseId,
              title: c.title || "Untitled Course",
              progress: progressVal,
              completedLessons: completed,
              totalLessons: total,
              category: categoryText,
              color: color
            };
          });
          setCourses(mapped);
          setIsLoadingCourses(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to fetch backend courses, falling back to mock course calculations:", err);
      }

      if (active) {
        const mockCourses: ActiveCourse[] = [
          { id: 1, title: "Advanced Mathematics", progress: getSavedProgress(1, 18), completedLessons: getSavedCompleted(1), totalLessons: 18, category: "Math", color: "var(--color-accent)" },
          { id: 2, title: "Python Programming", progress: getSavedProgress(2, 20), completedLessons: getSavedCompleted(2), totalLessons: 20, category: "Coding", color: "#6B8EE8" },
          { id: 3, title: "Data Structures & Algorithms", progress: getSavedProgress(3, 20), completedLessons: getSavedCompleted(3), totalLessons: 20, category: "CS Science", color: "#F2C94C" },
        ];
        setCourses(mockCourses);
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
    return () => {
      active = false;
    };
  }, [enrolledIds]);

  function getSavedCompleted(courseId: number): number {
    try {
      const saved = localStorage.getItem(`ateion_progress_${courseId}`);
      if (saved) return JSON.parse(saved).length;
    } catch {}
    if (courseId === 1) return 12;
    if (courseId === 2) return 8;
    if (courseId === 3) return 3;
    return 0;
  }

  function getSavedProgress(courseId: number, total: number): number {
    const completed = getSavedCompleted(courseId);
    return Math.round((completed / total) * 100);
  }

  // filter only enrolled courses or fallback mock list if enrolled list has items
  const enrolledCourses = enrolledIds.length > 0
    ? courses.filter((c) => enrolledIds.includes(c.id))
    : courses;

  // Dynamic capability scoring based on actual course progress
  const mathProgress = courses.find((c) => c.id === 1)?.progress || 65;
  const codingProgress = courses.find((c) => c.id === 2)?.progress || 40;
  const dsaProgress = courses.find((c) => c.id === 3)?.progress || 15;

  const capabilityData = [
    { subject: "Problem Solving", value: Math.min(100, 75 + Math.round(mathProgress * 0.2)) },
    { subject: "Adaptability", value: 90 },
    { subject: "Logical Reasoning", value: Math.min(100, 70 + Math.round(dsaProgress * 0.3)) },
    { subject: "Coding", value: Math.min(100, 60 + Math.round(codingProgress * 0.4)) },
    { subject: "Critical Thinking", value: 82 },
  ];

  const sidebarLinks = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard", active: true },
    { label: "My Courses", icon: BookOpen, path: "/playground/mycourses" },
    { label: "Olympiad", icon: Award, path: "/gco" },
    { label: "Playground", icon: Gamepad2, path: "/PlayGround" },
    { label: "Certificates", icon: FileText, path: "/certificate" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  const badges = [
    { name: "Math Maven", description: "5 algebra steps completed", color: "#E8856A" },
    { name: "First Code", description: "Compiled first script", color: "#6B8EE8" },
    { name: "Streak Master", description: "Logged in 3 days in a row", color: "#F2C94C" },
    { name: "Olympiad Ready", description: "Registered in Global Olympiad", color: "#27AE60" },
  ];

  // Goals completion calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleToggleTask = (id: number) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);

    // Sync back to localStorage for the Playground tasks view
    try {
      const savedRaw = localStorage.getItem("ateion_tasks");
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        const synced = parsed.map((t: any) => {
          if (Number(t.id) === id) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });
        localStorage.setItem("ateion_tasks", JSON.stringify(synced));
      } else {
        const formatted = updated.map((t) => ({
          id: t.id,
          title: t.text,
          date: "Today",
          priority: t.points >= 50 ? "high" : t.points >= 30 ? "medium" : "low",
          completed: t.completed
        }));
        localStorage.setItem("ateion_tasks", JSON.stringify(formatted));
      }
    } catch {}
  };

  // SVG circular progress offsets
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (taskProgress / 100) * circumference;

  return (
    <>
      <Helmet>
        <title>Dashboard | Ateion</title>
        <meta name="description" content="Track your learning journey and capability development." />
      </Helmet>

      {/* Mobile Top Navbar Spacer */}
      <div className="md:hidden">
        <SharedNavbar />
        <NavbarSpacer />
      </div>

      <div 
        className="flex flex-col md:flex-row min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] relative pb-20 md:pb-0"
        style={{ fontFamily: "var(--font-body)" }}
      >
        
        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50 backdrop-blur-md p-6 sticky top-0 h-screen z-20">
          {/* Student profile snippet */}
          <div className="flex items-center gap-3 pb-5 border-b border-[var(--color-border-light)] mb-5">
            <div className="w-10.5 h-10.5 rounded-full bg-[#D4A0A0]/15 text-[#D4A0A0] flex items-center justify-center font-bold text-base overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials(profile.fullName)
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none">{profile.fullName}</span>
              <span className="text-xs text-[var(--color-text-tertiary)] mt-1.5 font-semibold">{profile.careerPath || "Student Learner"}</span>
            </div>
          </div>

          {/* Quick learning status block */}
          <div className="grid grid-cols-3 gap-1.5 pb-5 border-b border-[var(--color-border-light)] mb-5">
            {[
              { value: enrolledIds.length > 0 ? String(enrolledIds.length) : "3", label: "Active" },
              { value: "87", label: "Score" },
              { value: "4", label: "Badges" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-2 rounded-xl bg-[var(--color-nav-button)]/40 border border-slate-200/20">
                <span className="font-bold text-base leading-none">{s.value}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-tertiary)] mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Sidebar Menu */}
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-[10px] px-[14px] py-[10px] rounded-full text-[15px] font-semibold transition-all duration-200 ease-in-out text-left w-full group ${
                    link.active
                      ? "bg-gradient-to-r from-[#C49AA5] via-[#B78D9A] to-[#A97F8C] text-white shadow-[0_4px_10px_rgba(183,141,154,0.35)]"
                      : "text-[#4B5563] hover:bg-[rgba(183,141,154,0.15)]"
                  }`}
                >
                  <Icon size={16} className={`transition-all duration-200 ease-in-out group-hover:scale-110 ${link.active ? "text-white scale-110" : ""}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Capability score card footer */}
          <div className="pt-4 border-t border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#D4A0A0]/15 border border-[#D4A0A0]/20 text-sm text-[var(--color-text-secondary)]">
              <Zap size={15} className="text-[#D4A0A0] animate-pulse" />
              <span className="font-bold">Total Capability</span>
              <strong className="ml-auto text-base font-extrabold text-[#D4A0A0]">87</strong>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT CONTAINER ─── */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-8 lg:p-10 max-w-[1240px] mx-auto w-full">
          
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <div className="flex items-center gap-2">
                <h1 
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] m-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Welcome back, {profile.fullName.trim().split(" ")[0]}
                </h1>
                <Sparkles size={20} className="text-[var(--color-accent)] animate-spin-slow" />
              </div>
              <p className="text-sm sm:text-base text-[var(--color-text-tertiary)] m-0 mt-1.5 font-semibold">Here's your learning progress and capability mapping for today.</p>
            </div>
            
            <div className="flex items-center gap-3 self-start sm:self-center">
              {/* Theme Switcher Button */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-background-secondary)]/60 border border-[var(--color-border-light)] text-slate-800 dark:text-slate-100 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm border-none"
                title="Toggle Light/Dark Theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => navigate("/playground/mycourses")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-bold hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(232,133,106,0.35)] transition-all duration-300 whitespace-nowrap border-none"
              >
                <Target size={16} />
                <span>Resume Active Lesson</span>
              </button>
            </div>
          </motion.div>

          {/* TWO-COLUMN BENTO GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            
            {/* ─── LEFT COLUMN (8 Cols) ─── */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Active", value: enrolledIds.length > 0 ? String(enrolledIds.length) : "3", sub: "Courses in progress", color: "var(--color-accent)", icon: BookOpen },
                  { label: "Done", value: "12", sub: "Lessons completed", color: "#6B8EE8", icon: CheckCircle },
                  { label: "Certificates", value: "3", sub: "Unlocked verified", color: "#27AE60", icon: Award },
                  { label: "Olympiad XP", value: String(xp), sub: "Top 12% percentile", color: "#F2C94C", icon: Zap },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={s.label}
                      variants={cardVariants}
                      className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-5 rounded-2xl flex flex-col gap-2 transition-all hover:translate-y-[-2px] hover:border-[var(--color-border-medium)] hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="font-extrabold text-2xl sm:text-3xl leading-none"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {s.value}
                        </span>
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{
                            background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                            color: s.color,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[var(--color-text-secondary)]">{s.label}</span>
                        <span className="text-xs text-[var(--color-text-tertiary)] font-bold mt-1">{s.sub}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Capability Radar Blueprint */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-4 relative overflow-hidden"
              >
                <div>
                  <h3 
                    className="text-lg font-bold m-0 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <BarChart3 size={16} className="text-[var(--color-accent)]" />
                    Capability Blueprint
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Assessment-driven competence scores across core topics</p>
                </div>

                <div className="w-full h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={capabilityData}>
                      <PolarGrid stroke="var(--color-border-light)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "var(--color-text-secondary)", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-body)" }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "var(--color-text-tertiary)", fontSize: 10, fontFamily: "var(--font-body)" }}
                      />
                      <Radar
                        name="Student"
                        dataKey="value"
                        stroke="var(--color-accent)"
                        fill="var(--color-accent)"
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Active Courses Progress */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 
                      className="text-lg font-bold m-0 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <BookOpen size={16} className="text-[var(--color-accent)]" />
                      Active Progression
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Resume your enrolled courses and exercises</p>
                  </div>
                  <button 
                    onClick={() => navigate("/playground/mycourses")} 
                    className="text-sm font-bold text-[var(--color-accent)] flex items-center gap-1 hover:underline"
                  >
                    <span>All Courses</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {enrolledIds.length === 0 ? (
                    /* 4. Empty state Course Catalog CTA */
                    <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-white/10 dark:bg-black/10 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 gap-3">
                      <Compass className="w-10 h-10 text-[var(--color-accent)] opacity-60 animate-pulse" />
                      <span className="text-base font-bold text-[var(--color-text-primary)]">Ready to expand your capabilities?</span>
                      <span className="text-sm text-[var(--color-text-secondary)] font-semibold max-w-md">You aren't active in any courses right now. Enroll in a playground course to track progress.</span>
                      <button 
                        onClick={() => navigate("/playground/mycourses")} 
                        className="mt-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-extrabold hover:bg-[var(--color-accent-hover)] transition-all duration-200"
                      >
                        Browse Course Catalog
                      </button>
                    </div>
                  ) : (
                    enrolledCourses.map((c) => (
                      <div
                        key={c.id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200/20 bg-white/20 dark:bg-black/10 hover:bg-white/40 dark:hover:bg-black/20 transition-all duration-300 gap-4"
                      >
                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                              style={{
                                background: `color-mix(in srgb, ${c.color} 15%, transparent)`,
                                color: c.color,
                              }}
                            >
                              {c.category}
                            </span>
                            <span className="text-sm text-[var(--color-text-tertiary)] font-bold">
                              {c.completedLessons}/{c.totalLessons} lessons
                            </span>
                          </div>
                          <h4 
                            className="text-sm sm:text-base font-extrabold text-[var(--color-text-primary)] m-0 truncate"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {c.title}
                          </h4>
                          
                          {/* Progress Bar container */}
                          <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden mt-2 relative">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${c.progress}%`,
                                background: c.color,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                          <span className="text-sm sm:text-base font-bold text-[var(--color-text-secondary)]">{c.progress}%</span>
                          <button
                            onClick={() => navigate(`/playground`)}
                            className="flex items-center justify-center w-8.5 h-8.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 text-slate-700 dark:text-slate-300 opacity-80 group-hover:opacity-100 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-transparent transition-all duration-200"
                          >
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            {/* ─── RIGHT COLUMN (4 Cols) ─── */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Profile Overview Card */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-5 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D4A0A0]/15 text-[#D4A0A0]">
                    <Flame size={12} className="animate-bounce" />
                    <strong className="text-xs font-bold">{streak} Day Streak</strong>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 mt-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[#C8C5DC] text-white flex items-center justify-center text-xl font-extrabold shadow-md overflow-hidden">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(profile.fullName)
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold m-0" style={{ fontFamily: "var(--font-display)" }}>{profile.fullName}</h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Capability Level: 4 ({profile.careerPath || "Student Learner"})</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-white/5 pt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>{xp.toLocaleString()}</span>
                    <span className="text-[10px] sm:text-[11px] uppercase text-[var(--color-text-tertiary)] font-bold mt-1">Total XP</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>87%</span>
                    <span className="text-[10px] sm:text-[11px] uppercase text-[var(--color-text-tertiary)] font-bold mt-1">Avg Accuracy</span>
                  </div>
                </div>
              </motion.div>

              {/* Interactive Daily Goals & Circular Progress */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-5"
              >
                <div className="flex items-center gap-4">
                  {/* Circular progress chart indicator */}
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Track */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke="var(--color-border-light)"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      {/* Bar progress */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke="var(--color-accent)"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <span className="absolute text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                      {taskProgress}%
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold m-0" style={{ fontFamily: "var(--font-display)" }}>Daily Goals</h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Complete goals to earn extra capability points</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {/* 5. Celebratory goals completion banner */}
                  <AnimatePresence>
                    {taskProgress === 100 && totalTasks > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3.5 rounded-xl border border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-300 flex items-center gap-2.5"
                      >
                        <CheckCircle size={18} className="shrink-0 text-green-500" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold leading-none">All Goals Completed!</span>
                          <span className="text-[10px] font-bold opacity-80 mt-1">
                            +{tasks.reduce((sum, t) => sum + t.points, 0)} XP earned today
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {tasks.map((task) => (
                    <label
                      key={task.id}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/10 bg-white/10 dark:bg-black/10 cursor-pointer hover:bg-white/20 dark:hover:bg-black/15 transition-all duration-200 select-none group"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        className="mt-1 h-4 w-4 accent-[var(--color-accent)] cursor-pointer shrink-0"
                      />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className={`text-xs sm:text-sm text-[var(--color-text-primary)] font-bold transition-all leading-snug ${task.completed ? "line-through opacity-50" : ""}`}>
                          {task.text}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-[var(--color-accent)] mt-0.5">+{task.points} XP</span>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Unlocked Badges */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-5"
              >
                <div>
                  <h3 
                    className="text-lg font-bold m-0 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Trophy size={16} className="text-[var(--color-accent)]" />
                    Unlocked Badges
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Your recently earned learning achievements</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, idx) => (
                    <div
                      key={badge.name}
                      className="flex flex-col items-center text-center p-3.5 rounded-2xl border border-slate-200/20 bg-white/20 dark:bg-black/10 hover:scale-[1.03] transition-all duration-200 cursor-default"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm"
                        style={{
                          background: `color-mix(in srgb, ${badge.color} 15%, transparent)`,
                          color: badge.color,
                        }}
                      >
                        <Award size={18} />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">{badge.name}</span>
                      <span className="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] font-bold mt-1 leading-snug">{badge.description}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* ─── MOBILE BOTTOM NAV BAR ─── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-background-secondary)]/85 backdrop-blur-md border-t border-[var(--color-border-light)] flex items-center justify-around z-30 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
          {sidebarLinks.slice(0, 5).map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 ${
                  link.active ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
                }`}
              >
                <Icon size={18} className={link.active ? "scale-110" : ""} />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{link.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default DashboardPage;
