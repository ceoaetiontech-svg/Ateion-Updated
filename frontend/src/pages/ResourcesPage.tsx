import {
  BookOpen,
  Rocket,
  Sprout,
  FolderKanban,
  BookMarked,
  Award,
  Compass,
  Map,
  TrendingUp,
  Sparkles,
  ListVideo,
  Zap,
  Heart,
  Brain,
  Lightbulb,
  Smile,
  Wind,
  StickyNote,
  CheckSquare,
  Calendar,
  FileText,
  Target,
  FolderOpen,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Milestone
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
} from "../app/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../app/components/ui/collapsible";
import { useNavigate, Link } from "react-router";
const navigationSections = [
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

export default function ResourcesPage() {
  const [userProfile, setUserProfile] = useState({
    fullName: "Loading...",
    firstName: "Student",
    segmentText: "Universal Access",
    isPremium: false,
  });
  const [activeView, setActiveView] = useState("Dashboard");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Hooks Assignment",
      date: "Tomorrow",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Watch Data Visualization Lecture",
      date: "May 29, 2026",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Submit Project Proposal",
      date: "May 30, 2026",
      priority: "high",
      completed: true,
    },
  ]);

  const [selectedMood, setSelectedMood] = useState("Good");
  const [showAddTask, setShowAddTask] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    priority: "medium",
  });
  const handleAddTask = () => {
    if (!newTask.title) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date || "Today",
      priority: newTask.priority,
      completed: false,
    };

    setTasks([...tasks, task]);

    setNewTask({
      title: "",
      date: "",
      priority: "medium",
    });

    setShowAddTask(false);
  };
  const navigate = useNavigate();
  // Function to check/uncheck tasks
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // 2. Fetch user data on component mount
  useEffect(() => {
    // 1. Grab the secure token from the browser
    const token = localStorage.getItem("token");

    // 2. Kick them out if they have no token at all
    if (!token) {
      window.dispatchEvent(new CustomEvent("open-login"));
      navigate("/");
      return;
    }

    // 3. Call the database directly to verify the token and get the user
    const fetchUserDataFromDB = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

        const response = await fetch(`${apiUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Token is valid! Database returned the real user row.
          const dbUser = await response.json();
          setUserProfile({
            fullName: dbUser.fullName || "Student",
            // 👇 ADD  RIGHT HERE 👇
            firstName: dbUser.fullName
              ? dbUser.fullName.split(" ")[0]
              : "Student",
            segmentText: dbUser.ageSegment || "Universal Access",
            isPremium: dbUser.isPremium || false,
          });
        } else {
          // Token is fake, expired, or user was deleted from DB
          localStorage.removeItem("token");
          window.dispatchEvent(new CustomEvent("open-login"));
          navigate("/");
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      }
    };

    fetchUserDataFromDB();
  }, [navigate]);
  return (
    <>
      <Helmet>
        <title>Playground | Ateion</title>
        <meta name="description" content="Explore Ateion's interactive learning resources, tools, and activities designed to build real-world capabilities." />
      </Helmet>
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[var(--color-background-primary)]">
        {/* SIDEBAR */}
        <Sidebar variant="sidebar" collapsible="icon" className="border-r-0">
          <div className="flex h-screen flex-col bg-[#1E1632] text-[var(--color-text-inverse)]">
            {/* LOGO */}
            <SidebarHeader
              className="px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setActiveView("Dashboard")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-text-inverse)]">
                  <Rocket size={24} />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xl font-bold text-[var(--color-text-inverse)] tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ateion
                  </span>
                  <span className="text-[10px] text-[var(--color-accent)]/80 tracking-widest font-bold uppercase">
                    Playground
                  </span>
                </div>
              </div>
            </SidebarHeader>

            {/* MENU */}
            <SidebarContent className="px-2">
              {navigationSections.map((section) => (
                <Collapsible
                  key={section.title}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="flex w-full items-center text-[var(--color-text-inverse)]/70 hover:text-[var(--color-text-inverse)]">
                        <section.icon className="mr-2 h-4 w-4" />
                        {section.title}
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {section.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton
                                className={`text-[var(--color-text-inverse)]/70 hover:text-[var(--color-text-inverse)] hover:bg-[var(--color-background-secondary)]/10 transition-colors ${activeView === item.title ? "bg-[var(--color-background-secondary)]/20 text-[var(--color-text-inverse)] font-bold" : ""}`}
                                onClick={() => setActiveView(item.title)} // <--- ADD THIS ONCLICK
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              ))}
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
              {/* 1. DYNAMIC USER AVATAR BLOCK */}
              <SidebarMenu>
                <SidebarMenuItem>
                  {/* 🚨 Using asChild with a native <a> tag forces a guaranteed browser redirect 🚨 */}
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    className="hover:bg-[var(--color-background-secondary)]/10 text-[var(--color-text-inverse)] cursor-pointer p-1 h-auto mt-2"
                  >
                    <a
                      href="/dashboard"
                      className="flex items-center gap-3 w-full rounded-lg"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white font-bold text-lg shrink-0">
                        {userProfile.fullName
                          ? userProfile.fullName.charAt(0).toUpperCase()
                          : "A"}
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-[var(--color-text-inverse)]">
                          {userProfile.fullName}
                        </span>
                        <span className="text-xs text-[var(--color-text-inverse)]/60">
                          {userProfile.segmentText}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator className="bg-[var(--color-background-secondary)]/20 mx-4 my-2" />

              {/* 2. SYSTEM SETTINGS */}
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-[var(--color-text-inverse)] hover:bg-[var(--color-background-secondary)]/10">
                    <Settings size={16} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="text-[var(--color-text-inverse)] hover:bg-[var(--color-background-secondary)]/10 cursor-pointer"
                    onClick={() => {
                      // 1. Delete the secure token from memory
                      localStorage.removeItem("token");
                      // 2. Redirect back to the home page
                      navigate("/");
                    }}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </div>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-transparent w-full">
          {/* 1. TOP HEADER WITH DYNAMIC AGE BADGE */}
          <header className="flex h-16 sm:h-20 items-center justify-between px-6 lg:px-10 bg-[var(--color-background-secondary)]/60 backdrop-blur-md border-b border-[var(--color-border-light)] shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1
                className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] cursor-pointer hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setActiveView("Dashboard")}
              >
                Playground
              </h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {/* DYNAMIC GATEKEEPER BADGE */}
              <div className="hidden sm:flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_var(--color-accent-light)]">
                <User size={14} />
                <span>{userProfile.segmentText}</span>
              </div>

              {/* DYNAMIC USER PROFILE */}
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">
                    {userProfile.fullName}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {userProfile.isPremium ? "Premium Member" : "Free Member"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 border-2 border-[var(--color-border-light)] shadow-sm overflow-hidden flex items-center justify-center text-[var(--color-text-inverse)] font-bold text-lg">
                  {/* Fallback avatar using their first initial */}
                  {userProfile.firstName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          {/* 2. DASHBOARD SCROLL AREA */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {/* ========================================== */}
              {/* VIEW: DASHBOARD / OVERVIEW                 */}
              {/* ========================================== */}
              {activeView === "Dashboard" && (
                <>
                  {/* VIBRANT APP-LIKE WELCOME BANNER */}
                  <div className="relative w-full rounded-[24px] bg-gradient-to-r from-[#6b46c1] to-[#f472b6] p-8 sm:p-10 text-[var(--color-text-inverse)] shadow-lg overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-background-secondary)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 text-[var(--color-text-inverse)]/90 mb-2 font-medium">
                        <Sparkles size={18} />
                        {/* DYNAMIC WELCOME MESSAGE */}
                        <span>Welcome back, {userProfile.firstName}!</span>
                      </div>
                      <h2
                        className="text-3xl sm:text-4xl font-bold mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Continue Your Journey
                      </h2>
                      <p className="text-[var(--color-text-inverse)]/80 max-w-xl mb-8 text-sm sm:text-base leading-relaxed font-['Inter',sans-serif]">
                        Curated learning experiences specifically designed for
                        your age segment and growth path. You're making great
                        progress!
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <button className="bg-[var(--color-background-secondary)] text-[var(--color-accent)] px-6 py-2.5 rounded-full font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2">
                          Resume Learning <ChevronRight size={18} />
                        </button>
                        <button className="bg-[var(--color-background-secondary)]/20 text-[var(--color-text-inverse)] border border-[var(--color-border-light)]/30 px-6 py-2.5 rounded-full font-bold hover:bg-[var(--color-background-secondary)]/30 transition-colors flex items-center gap-2">
                          <span className="text-xl">🔥</span> 7 Day Streak!
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. GAMIFICATION OVERVIEW STATS */}
                  <div className="flex flex-col gap-4 mt-6">
                    <h3
                      className="text-xl font-bold text-[var(--color-text-primary)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Overview
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Stat Card 1: Courses */}
                      <div className="clay-card p-6 flex items-center justify-between">
                        <div>
                          <p className="text-[var(--color-text-tertiary)] text-sm font-medium mb-1">
                            Active Courses
                          </p>
                          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                            4
                          </p>
                          <p className="text-emerald-500 text-xs font-bold mt-2">
                            +2 this month
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <BookOpen size={24} />
                        </div>
                      </div>

                      {/* Stat Card 2: Hours */}
                      <div className="clay-card p-6 flex items-center justify-between">
                        <div>
                          <p className="text-[var(--color-text-tertiary)] text-sm font-medium mb-1">
                            Hours Learned
                          </p>
                          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                            127
                          </p>
                          <p className="text-emerald-500 text-xs font-bold mt-2">
                            +15% from last month
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                          <TrendingUp size={24} />
                        </div>
                      </div>

                      {/* Stat Card 3: Badges */}
                      <div className="clay-card p-6 flex items-center justify-between">
                        <div>
                          <p className="text-[var(--color-text-tertiary)] text-sm font-medium mb-1">
                            Achievements
                          </p>
                          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                            23
                          </p>
                          <p className="text-emerald-500 text-xs font-bold mt-2">
                            +5 new badges
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                          <Award size={24} />
                        </div>
                      </div>

                      {/* Stat Card 4: Streaks */}
                      <div className="clay-card p-6 flex items-center justify-between">
                        <div>
                          <p className="text-[var(--color-text-tertiary)] text-sm font-medium mb-1">
                            Streak
                          </p>
                          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                            7 Days
                          </p>
                          <p className="text-emerald-500 text-xs font-bold mt-2">
                            Personal best!
                          </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                          <span className="text-2xl">🔥</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ========================================== */}
              {/* VIEW: MY COURSES                           */}
              {/* ========================================== */}
              {activeView === "My Courses" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* 4. MY COURSES SECTION (3-FREE-VIDEOS PAYWALL) */}
                  <div className="flex flex-col gap-4 mt-6">
                    <div className="flex items-center justify-between">
                      <h3
                        className="text-xl font-bold text-[var(--color-text-primary)]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        My Courses
                      </h3>
                      <span className="text-sm font-bold text-[var(--color-text-tertiary)] cursor-pointer hover:text-[var(--color-accent)]">
                        View All
                      </span>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {/* Course Card 1 */}
                      <div className="clay-card p-6 overflow-hidden flex flex-col group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative h-[160px] w-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop"
                            alt="React Course"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                            <ListVideo size={12} />3 VIDEOS FREE
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-1 line-clamp-2">
                            Advanced React & TypeScript
                          </h4>
                          <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
                            Sarah Johnson
                          </p>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-[var(--color-text-tertiary)]">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                                67% Complete
                              </span>
                            </div>
                            <div className="w-full bg-[var(--color-border-light)] rounded-full h-1.5 mb-2 overflow-hidden">
                              <div
                                className="bg-[#1e1632] h-1.5 rounded-full"
                                style={{ width: "67%" }}
                              ></div>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-4">
                              16 of 24 lessons completed
                            </p>
                            <button className="w-full bg-[var(--color-accent)] hover:brightness-110 text-[var(--color-text-inverse)] py-2.5 rounded-xl text-sm font-bold transition-colors">
                              Continue Learning
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Course Card 2 */}
                      <div className="clay-card p-6 overflow-hidden flex flex-col group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative h-[160px] w-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                            alt="Data Science"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                            <ListVideo size={12} />3 VIDEOS FREE
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-1 line-clamp-2">
                            Data Science Fundamentals
                          </h4>
                          <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
                            Dr. Michael Chen
                          </p>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-[var(--color-text-tertiary)]">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                                45% Complete
                              </span>
                            </div>
                            <div className="w-full bg-[var(--color-border-light)] rounded-full h-1.5 mb-2 overflow-hidden">
                              <div
                                className="bg-[#1e1632] h-1.5 rounded-full"
                                style={{ width: "45%" }}
                              ></div>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-4">
                              14 of 32 lessons completed
                            </p>
                            <button className="w-full bg-[var(--color-accent)] hover:brightness-110 text-[var(--color-text-inverse)] py-2.5 rounded-xl text-sm font-bold transition-colors">
                              Continue Learning
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Course Card 3 */}
                      <div className="clay-card p-6 overflow-hidden flex flex-col group hover:shadow-md transition-all cursor-pointer">
                        <div className="relative h-[160px] w-full overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
                            alt="Web Development"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 shadow-md">
                            <ListVideo size={12} />3 VIDEOS FREE
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-1 line-clamp-2">
                            Full Stack Web Development
                          </h4>
                          <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
                            Alex Martinez
                          </p>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-[var(--color-text-tertiary)]">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                                0% Complete
                              </span>
                            </div>
                            <div className="w-full bg-[var(--color-border-light)] rounded-full h-1.5 mb-2 overflow-hidden">
                              <div
                                className="bg-[#1e1632] h-1.5 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-4">
                              0 of 28 lessons completed
                            </p>
                            <button className="w-full bg-[var(--color-accent)] hover:brightness-110 text-[var(--color-text-inverse)] py-2.5 rounded-xl text-sm font-bold transition-colors">
                              Start Course
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (TASKS)                     */}
              {/* ========================================== */}
              {activeView === "Tasks" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* HEADER WITH BUTTON */}
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-xl font-bold text-[var(--color-text-primary)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      My Tasks
                    </h3>

                    <button
                      onClick={() => setShowAddTask(true)}
                      className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm"
                    >
                      + Add Task
                    </button>
                  </div>

                  <div className="w-full max-w-2xl">
                    <div className="bg-[var(--color-background-secondary)] p-6 rounded-[20px] shadow-md border border-[var(--color-border-light)] flex flex-col h-full">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4">
                        Upcoming Tasks
                      </h4>

                      <div className="flex flex-col gap-3">
                        {/* DYNAMIC INTERACTIVE TASKS */}
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
                              task.completed
                                ? "border-[var(--color-border-light)] opacity-60 bg-gray-50/50"
                                : task.priority === "medium"
                                  ? "border-orange-200 bg-orange-50/30 hover:bg-orange-50"
                                  : "border-[var(--color-border-light)] hover:bg-gray-50 hover:shadow-sm"
                            }`}
                          >
                            {/* Checkbox */}
                            <div
                              className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-all ${
                                task.completed
                                  ? "bg-[var(--color-primary)] text-white scale-105"
                                  : task.priority === "medium"
                                    ? "border-2 border-orange-300 group-hover:border-orange-500"
                                    : "border-2 border-gray-300 group-hover:border-[var(--color-primary)]"
                              }`}
                            >
                              {task.completed && <CheckSquare size={14} />}
                            </div>

                            {/* Task Content */}
                            <div
                              className={`flex-1 transition-all ${
                                task.completed
                                  ? "line-through text-[var(--color-text-tertiary)]"
                                  : ""
                              }`}
                            >
                              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                                {task.title}
                              </p>

                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-[var(--color-text-tertiary)] flex items-center gap-1">
                                  <Calendar size={10} /> {task.date}
                                </span>

                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                    task.priority === "high"
                                      ? "text-[var(--color-accent)] bg-[var(--color-background-tertiary)]"
                                      : "text-orange-500 bg-orange-100"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ADD TASK MODAL */}
                  {showAddTask && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="bg-[var(--color-background-secondary)] p-6 rounded-xl w-[320px] shadow-xl">
                        <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)]">
                          Add New Task
                        </h3>

                        <input
                          type="text"
                          placeholder="Task title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />

                        <input
                          type="date"
                          value={newTask.date}
                          onChange={(e) =>
                            setNewTask({ ...newTask, date: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-3 outline-none"
                        />

                        <select
                          value={newTask.priority}
                          onChange={(e) =>
                            setNewTask({ ...newTask, priority: e.target.value })
                          }
                          className="w-full border p-2 rounded mb-4"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>

                        <div className="flex justify-between">
                          <button
                            onClick={() => setShowAddTask(false)}
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleAddTask}
                            className="px-3 py-1 bg-[var(--color-accent)] text-white rounded hover:brightness-110"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (CALENDAR)                  */}
              {/* ========================================== */}
              {activeView === "Calendar" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3
                    className="text-xl font-bold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    My Calendar
                  </h3>

                  <div className="w-full max-w-[350px]">
                    <div className="clay-card p-6 flex flex-col h-full items-center">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4 self-start">
                        May 2026
                      </h4>
                      <div className="w-full mt-2">
                        <div className="flex justify-between items-center mb-6">
                          <ChevronLeft
                            size={18}
                            className="text-[var(--color-text-tertiary)] cursor-pointer hover:text-[var(--color-text-primary)] transition-colors"
                          />
                          <span className="text-sm font-bold text-[var(--color-text-primary)]">
                            May 2026
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-[var(--color-text-tertiary)] cursor-pointer hover:text-[var(--color-text-primary)] transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-xs mb-3 text-[var(--color-text-tertiary)] font-medium">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-sm font-medium text-[var(--color-text-primary)]">
                          <div className="text-[var(--color-text-tertiary)]">
                            26
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            27
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            28
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            29
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            30
                          </div>
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                          <div>10</div>
                          <div>11</div>
                          <div>12</div>
                          <div>13</div>
                          <div>14</div>
                          <div>15</div>
                          <div>16</div>
                          <div>17</div>
                          <div>18</div>
                          <div>19</div>
                          <div>20</div>
                          <div>21</div>
                          <div>22</div>
                          <div>23</div>
                          <div>24</div>
                          <div>25</div>
                          <div>26</div>
                          <div className="bg-[var(--color-accent)] text-[var(--color-text-inverse)] rounded-full w-7 h-7 flex items-center justify-center mx-auto shadow-md font-bold">
                            27
                          </div>
                          <div>28</div>
                          <div>29</div>
                          <div>30</div>
                          <div>31</div>
                          <div className="text-[var(--color-text-tertiary)]">
                            1
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            2
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            3
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            4
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            5
                          </div>
                          <div className="text-[var(--color-text-tertiary)]">
                            6
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: ORGANISE (NOTES)                     */}
              {/* ========================================== */}
              {activeView === "Notes" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3
                    className="text-xl font-bold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    My Notes
                  </h3>

                  <div className="w-full max-w-2xl">
                    <div className="clay-card p-6 flex flex-col h-full">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4">
                        Quick Notes
                      </h4>
                      <div className="flex flex-col gap-3">
                        <div className="p-4 rounded-xl border border-[var(--color-border-light)] hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer bg-purple-50/30">
                          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
                            React Hooks Best Practices
                          </p>
                          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">
                            Updated 2 hours ago
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-[var(--color-border-light)] hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
                          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
                            Python Data Structures
                          </p>
                          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">
                            Updated yesterday
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-[var(--color-border-light)] hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
                          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">
                            SQL Query Optimization
                          </p>
                          <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">
                            Updated 3 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: EVOLVE (WELLNESS )    */}
              {/* ========================================== */}
              {activeView === "Wellness Hub" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3
                    className="text-xl font-bold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Evolve & Wellness
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* A. Learning Activity Chart Placeholder */}
                    <div className="clay-card p-6 flex flex-col h-full">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-8">
                        Learning Activity
                      </h4>
                      <div className="relative w-full h-[180px] flex items-end justify-between pb-6 border-b border-[var(--color-border-light)]">
                        {/* Grid Lines */}
                        <div className="absolute top-0 w-full border-t border-dashed border-gray-200"></div>
                        <div className="absolute top-1/3 w-full border-t border-dashed border-gray-200"></div>
                        <div className="absolute top-2/3 w-full border-t border-dashed border-gray-200"></div>

                        {/* SVG Line connecting dots */}
                        <svg
                          className="absolute inset-0 h-[calc(100%-24px)] w-full pointer-events-none"
                          preserveAspectRatio="none"
                          viewBox="0 0 500 150"
                        >
                          <path
                            d="M 35 110 L 105 80 L 175 120 L 250 60 L 320 70 L 395 50 L 465 100"
                            fill="none"
                            stroke="#a855f7"
                            strokeWidth="3"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.4"
                          />
                        </svg>

                        {/* Data Points */}
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[45px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Mon
                          </span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[75px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Tue
                          </span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[35px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Wed
                          </span>
                        </div>

                        {/* Active Highlighted Day */}
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] mb-[95px] scale-125 shadow-[0_0_10px_var(--color-accent-light)]"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-bold text-[var(--color-text-primary)]">
                            Thu
                          </span>
                          {/* Interactive Tooltip */}
                          <div className="absolute -top-[55px] bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-lg text-[10px] py-1.5 px-3 rounded-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap z-20">
                            Thu <br />
                            <span className="text-[var(--color-accent)]">
                              hours: 5.2
                            </span>
                          </div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[85px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Fri
                          </span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[105px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Sat
                          </span>
                        </div>
                        <div className="relative z-10 flex flex-col items-center w-full group cursor-pointer">
                          <div className="h-2 w-2 rounded-full bg-purple-500 mb-[55px] group-hover:scale-150 transition-transform"></div>
                          <span className="absolute bottom-[-24px] text-[10px] font-medium text-[var(--color-text-tertiary)]">
                            Sun
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[var(--color-text-tertiary)] mt-8">
                        Total: 23.1 hours this week
                      </p>
                    </div>

                    {/* B. Wellness Hub Timeline */}
                    <div className="clay-card p-6 flex flex-col h-full">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6">
                        Wellness Hub
                      </h4>
                      <div className="flex flex-col gap-6 border-l-2 border-[var(--color-border-light)] ml-2 pl-5 relative mt-2">
                        {/* Activity 1 */}
                        <div className="relative">
                          <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent)] border-[3px] border-[var(--color-border-light)] shadow-sm box-content"></div>
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            Daily Reflection
                          </p>
                          <p className="text-xs text-emerald-500 font-medium mt-0.5">
                            Completed Today
                          </p>
                        </div>

                        {/* Activity 2 */}
                        <div className="relative">
                          <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent)] border-[3px] border-[var(--color-border-light)] shadow-sm box-content"></div>
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            Mindfulness Practice
                          </p>
                          <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-0.5">
                            5 min session
                          </p>
                        </div>

                        {/* Activity 3 */}
                        <div className="relative">
                          <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[var(--color-accent)] border-[3px] border-[var(--color-border-light)] shadow-sm box-content"></div>
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            Stress Management
                          </p>
                          <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-0.5">
                            Scheduled
                          </p>
                        </div>

                        {/* Activity 4 */}
                        <div className="relative opacity-50">
                          <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-gray-300 border-[3px] border-[var(--color-border-light)] shadow-sm box-content"></div>
                          <p className="text-sm font-bold text-[var(--color-text-primary)]">
                            Growth Mindset
                          </p>
                          <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-0.5">
                            Coming Up
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* C. Achievements Grid */}
                    <div className="clay-card p-6 flex flex-col h-full lg:col-span-2">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4">
                        Achievements
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-[var(--color-border-light)] bg-gray-50/50 hover:bg-gray-50 hover:border-[var(--color-accent-light)] transition-colors cursor-pointer group">
                          <Award
                            className="text-[var(--color-accent)] mb-3 group-hover:scale-110 transition-transform"
                            size={32}
                          />
                          <p className="text-sm font-bold text-[var(--color-text-primary)] text-center">
                            Course Master
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-[var(--color-border-light)] bg-gray-50/50 hover:bg-gray-50 hover:border-orange-200 transition-colors cursor-pointer group">
                          <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                            🔥
                          </span>
                          <p className="text-sm font-bold text-[var(--color-text-primary)] text-center">
                            7 Day Streak
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-[var(--color-border-light)] bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-200 transition-colors cursor-pointer group">
                          <TrendingUp
                            className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform"
                            size={32}
                          />
                          <p className="text-sm font-bold text-[var(--color-text-primary)] text-center">
                            Rising Star
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-[var(--color-border-light)] bg-gray-50/50 hover:bg-gray-50 hover:border-blue-200 transition-colors cursor-pointer group">
                          <Target
                            className="text-blue-500 mb-3 group-hover:scale-110 transition-transform"
                            size={32}
                          />
                          <p className="text-sm font-bold text-[var(--color-text-primary)] text-center">
                            Goal Crusher
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: EVOLVE (MENTAL HEALTH) */}
              {/* ========================================== */}
              {activeView === "Mental Health" && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3
                    className="text-xl font-bold text-[var(--color-text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Mental Health & Support
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* A. Mood Check-in (Fully Interactive & Professionalized) */}
                    <div className="clay-card p-6 flex flex-col transition-all duration-300">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4">
                        How are you feeling today?
                      </h4>
                      <div className="flex justify-between items-center gap-2 mb-5">
                        {/* Stressed Button */}
                        <button
                          onClick={() => setSelectedMood("Stressed")}
                          className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-all duration-200 group ${
                            selectedMood === "Stressed"
                              ? "border-purple-400 bg-purple-50/70 shadow-md -translate-y-0.5"
                              : "border-[var(--color-border-light)] hover:bg-purple-50/40"
                          }`}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                            😫
                          </span>
                          <span
                            className={`text-xs mt-1 ${selectedMood === "Stressed" ? "font-bold text-purple-600" : "font-medium text-[var(--color-text-tertiary)]"}`}
                          >
                            Stressed
                          </span>
                        </button>

                        {/* Okay Button */}
                        <button
                          onClick={() => setSelectedMood("Okay")}
                          className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-all duration-200 group ${
                            selectedMood === "Okay"
                              ? "border-amber-400 bg-amber-50/70 shadow-md -translate-y-0.5"
                              : "border-[var(--color-border-light)] hover:bg-amber-50/40"
                          }`}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                            😐
                          </span>
                          <span
                            className={`text-xs mt-1 ${selectedMood === "Okay" ? "font-bold text-amber-600" : "font-medium text-[var(--color-text-tertiary)]"}`}
                          >
                            Okay
                          </span>
                        </button>

                        {/* Good Button (Fixed red border to a professional Indigo theme) */}
                        <button
                          onClick={() => setSelectedMood("Good")}
                          className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-all duration-200 group ${
                            selectedMood === "Good"
                              ? "border-indigo-400 bg-indigo-50/70 shadow-md -translate-y-0.5"
                              : "border-[var(--color-border-light)] hover:bg-indigo-50/40"
                          }`}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                            😊
                          </span>
                          <span
                            className={`text-xs mt-1 ${selectedMood === "Good" ? "font-bold text-indigo-600" : "font-medium text-[var(--color-text-tertiary)]"}`}
                          >
                            Good
                          </span>
                        </button>

                        {/* Great Button */}
                        <button
                          onClick={() => setSelectedMood("Great")}
                          className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-all duration-200 group ${
                            selectedMood === "Great"
                              ? "border-emerald-400 bg-emerald-50/70 shadow-md -translate-y-0.5"
                              : "border-[var(--color-border-light)] hover:bg-emerald-50/40"
                          }`}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                            🤩
                          </span>
                          <span
                            className={`text-xs mt-1 ${selectedMood === "Great" ? "font-bold text-emerald-600" : "font-medium text-[var(--color-text-tertiary)]"}`}
                          >
                            Great
                          </span>
                        </button>
                      </div>

                      {/* NEW FEATURE: Contextual Tags (Slides down when any mood is active) */}
                      {selectedMood && (
                        <div className="mb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
                            What's contributing to your mood?
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Studies",
                              "Health",
                              "Sleep",
                              "Social",
                              "Coding",
                              "Hobbies",
                            ].map((tag) => (
                              <button
                                key={tag}
                                className="px-2.5 py-1 text-xs rounded-full border border-[var(--color-border-light)] bg-[var(--color-background-primary)] text-[var(--color-text-secondary)] hover:border-gray-400 hover:text-[var(--color-text-primary)] transition-all"
                              >
                                +{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* DYNAMIC AI Insight Box */}
                      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 mt-auto transition-all duration-300">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
                          <Brain size={16} className="text-purple-500" /> AI
                          Insight
                        </p>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] leading-relaxed min-h-[32px]">
                          {selectedMood === "Stressed" &&
                            "Take a deep breath. It looks like you're feeling overwhelmed. Consider trying the Box Breathing exercise below to recenter yourself."}
                          {selectedMood === "Okay" &&
                            "You're doing alright! A quick Mindfulness Practice could help elevate your focus and energy for the rest of the day."}
                          {selectedMood === "Good" &&
                            'Your mood has been consistently "Good"! Keeping up with your daily reflections is having a positive impact on your stress levels.'}
                          {selectedMood === "Great" &&
                            "Fantastic! You're in a great headspace to tackle challenging new concepts today. Keep that momentum going!"}
                          {!selectedMood &&
                            "Select a mood above to generate a real-time mental well-being insight based on your day."}
                        </p>
                      </div>
                    </div>

                    {/* B. Recommended Exercises */}
                    <div className="clay-card p-6 flex flex-col">
                      <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-4">
                        Quick Relief Exercises
                      </h4>
                      <div className="flex flex-col gap-3">
                        {/* Exercise 1 */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-light)] hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer group hover:-translate-x-0.5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Wind size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                Box Breathing
                              </p>
                              <p className="text-xs text-[var(--color-text-tertiary)]">
                                Reduce anxiety • 3 mins
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-[var(--color-text-tertiary)] group-hover:text-blue-500 transition-colors"
                          />
                        </div>

                        {/* Exercise 2 */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-light)] hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-200 cursor-pointer group hover:-translate-x-0.5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Smile size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                Guided Meditation
                              </p>
                              <p className="text-xs text-[var(--color-text-tertiary)]">
                                Regain focus • 10 mins
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-[var(--color-text-tertiary)] group-hover:text-emerald-500 transition-colors"
                          />
                        </div>

                        {/* Exercise 3 */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border-light)] hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-200 cursor-pointer group hover:-translate-x-0.5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Heart size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                                Gratitude Journal
                              </p>
                              <p className="text-xs text-[var(--color-text-tertiary)]">
                                Evening reflection • 5 mins
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-[var(--color-text-tertiary)] group-hover:text-purple-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================== */}
              {/* VIEW: FALLBACK FOR UNUSED SIDEBAR BUTTONS  */}
              {/* ========================================== */}
              {![
                "Dashboard",
                "Overview",
                "My Courses",
                "Tasks",
                "Calendar",
                "Notes",
                "Wellness Hub",
                "Mental Health",
              ].includes(activeView) && (
                <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="h-20 w-20 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Sparkles size={36} />
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {activeView}
                  </h3>
                  <p className="text-[var(--color-text-tertiary)] max-w-md text-sm sm:text-base leading-relaxed">
                    We are currently curating and compiling the best
                    age-specific resources for this section. Check back soon for
                    new updates!
                  </p>
                </div>
              )}

              {/* new items to be added here */}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
    </>
  );
}

