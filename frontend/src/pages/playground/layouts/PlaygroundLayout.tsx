import { Rocket, User, Settings, LogOut, Sun, Moon, Search, Bell, Plus, Compass, BookMarked } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
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
} from "../../../app/components/ui/sidebar";
import { useNavigate } from "react-router";
import { useTheme } from "../../../app/components/ThemeProvider";
import { motion } from "framer-motion";
import { navigationSections } from "../shared/navigationData";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const MyCoursesPage = lazy(() => import("../pages/MyCoursesPage"));
const DiscoverCoursesPage = lazy(() => import("../pages/DiscoverCoursesPage"));
const TasksPage = lazy(() => import("../pages/TasksPage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const NotesPage = lazy(() => import("../pages/NotesPage"));
const WellnessHubPage = lazy(() => import("../pages/WellnessHubPage"));
const MentalHealthPage = lazy(() => import("../pages/MentalHealthPage"));
const FallbackPage = lazy(() => import("../pages/FallbackPage"));

export default function PlaygroundLayout() {
  const [courseQuery, setCourseQuery] = useState("");
  const [userProfile, setUserProfile] = useState({ 
    fullName: "Guest Explorer", 
    firstName: "Student", 
    segmentText: "Universal Access", 
    isPremium: false 
  });
  const [navbarHeight, setNavbarHeight] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState("Dashboard");
  const [activeAgeGroup, setActiveAgeGroup] = useState("All");
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    setIsLoadingCourses(true);
    const timer = setTimeout(() => {
      setIsLoadingCourses(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeView, courseQuery, activeAgeGroup]);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("ateion_tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
    return [
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
    ];
  });

  useEffect(() => {
    localStorage.setItem("ateion_tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    setNewTask({ title: "", date: "", priority: "medium" });
    setShowAddTask(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    const update = () => setNavbarHeight(nav.offsetHeight);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(nav);
    return () => obs.disconnect();
  }, []);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

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
          const dbUser = await response.json();
          setUserProfile({
            fullName: dbUser.fullName || "Student",
            firstName: dbUser.fullName
              ? dbUser.fullName.split(" ")[0]
              : "Student",
            segmentText: dbUser.ageSegment || "Universal Access",
            isPremium: dbUser.isPremium || false,
          });
        } else {
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

  const builtInViews = new Set([
    "Dashboard", "My Courses", "Discover Courses",
    "Tasks", "Calendar", "Notes",
    "Wellness Hub", "Mental Health",
  ]);

  return (
    <>
      <Helmet>
        <title>Playground | Ateion</title>
        <meta name="description" content="Explore Ateion's interactive learning resources, tools, and activities designed to build real-world capabilities." />
      </Helmet>
    <SidebarProvider>
      <div
        className="flex w-full bg-[var(--color-background-primary)]"
        style={{
          height: `calc(100dvh - ${navbarHeight}px)`,
          marginTop: navbarHeight,
        }}
      >
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r-0"
          style={{
            top: navbarHeight,
            height: `calc(100svh - ${navbarHeight}px)`,
          }}
        >
          <div className="flex h-full flex-col bg-[var(--color-background-secondary)] text-[var(--color-text-primary)]">
            <SidebarHeader
              className="px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setActiveView("Dashboard")}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white">
                  <Rocket size={24} />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xl font-bold text-[var(--color-text-primary)] tracking-wide"
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

            <SidebarContent className="px-2">
              {navigationSections.map((section) => (
                <SidebarGroup key={section.title} className="mb-2">
                  <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] flex items-center mb-1">
                    <section.icon className="mr-2 h-3.5 w-3.5" />
                    {section.title}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            className={`group/btn relative overflow-hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 py-2.5 ${activeView === item.title ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold shadow-sm border-l-4 border-[var(--color-accent)] rounded-r-xl rounded-l-none pl-3" : "rounded-xl pl-3 hover:translate-x-1"}`}
                            onClick={() => setActiveView(item.title)}
                          >
                            <item.icon className="h-4 w-4 mr-2 group-hover/btn:scale-110 group-hover/btn:-rotate-6 transition-transform duration-300" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    className="group/avatar hover:bg-[var(--color-background-tertiary)]/30 text-[var(--color-text-primary)] cursor-pointer p-1 h-auto mt-2 transition-all duration-300 hover:scale-[1.02]"
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
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {userProfile.fullName}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {userProfile.segmentText}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarSeparator className="bg-[var(--color-border-light)] mx-4 my-2" />

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/30">
                    <Settings size={16} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="group/theme text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/30 cursor-pointer hover:translate-x-1 transition-all duration-300"
                    onClick={toggleTheme}
                  >
                    <div className="group-hover/theme:rotate-180 transition-transform duration-500">
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </div>
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="group/logout text-[var(--color-text-primary)] hover:text-red-500 hover:bg-red-500/10 cursor-pointer hover:translate-x-1 transition-all duration-300"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    <LogOut size={16} className="group-hover/logout:scale-110 group-hover/logout:-translate-x-1 transition-transform duration-300" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </div>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-transparent w-full">
          <header className="flex h-16 sm:h-20 items-center justify-between px-6 lg:px-10 bg-[var(--color-background-secondary)]/60 backdrop-blur-md border-b border-[var(--color-border-light)] shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <h1
                className="font-bold text-[var(--color-text-primary)] cursor-pointer hover:text-[var(--color-accent)] hover:scale-105 origin-left transition-all duration-300 active:scale-95"
                style={{ 
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.1"
                }}
                onClick={() => setActiveView("Dashboard")}
              >
                Playground
              </h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_var(--color-accent-light)] hover:shadow-[0_4px_15px_var(--color-accent)] hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
                <User size={14} className="group-hover:animate-bounce" />
                <span>{userProfile.segmentText}</span>
              </div>

              <div className="flex items-center gap-3 cursor-pointer group hover:opacity-100">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {userProfile.fullName}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {userProfile.isPremium ? "Premium Member" : "Free Member"}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#d97a60] to-[var(--color-accent)] border-2 border-[var(--color-border-light)] shadow-sm overflow-hidden flex items-center justify-center text-[#ffffff] font-bold text-lg group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-[var(--color-accent)]/50">
                  {userProfile.firstName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <Suspense fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-[var(--color-accent)] border-t-transparent" />
              </div>
            }>
              <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {activeView === "Dashboard" && (
                  <DashboardPage userProfile={userProfile} />
                )}

                {activeView === "My Courses" && (
                  <MyCoursesPage
                    courseQuery={courseQuery}
                    setCourseQuery={setCourseQuery}
                    activeAgeGroup={activeAgeGroup}
                    setActiveAgeGroup={setActiveAgeGroup}
                    isLoadingCourses={isLoadingCourses}
                    userProfile={userProfile}
                  />
                )}

                {activeView === "Discover Courses" && (
                  <DiscoverCoursesPage
                    courseQuery={courseQuery}
                    setCourseQuery={setCourseQuery}
                    activeAgeGroup={activeAgeGroup}
                    setActiveAgeGroup={setActiveAgeGroup}
                    isLoadingCourses={isLoadingCourses}
                  />
                )}

                {activeView === "Tasks" && (
                  <TasksPage
                    tasks={tasks}
                    setTasks={setTasks}
                    toggleTask={toggleTask}
                    showAddTask={showAddTask}
                    setShowAddTask={setShowAddTask}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    handleAddTask={handleAddTask}
                    userProfile={userProfile}
                  />
                )}

                {activeView === "Calendar" && (
                  <CalendarPage />
                )}

                {activeView === "Notes" && (
                  <NotesPage userProfile={userProfile} />
                )}

                {activeView === "Wellness Hub" && (
                  <WellnessHubPage />
                )}

                {activeView === "Mental Health" && (
                  <MentalHealthPage
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                  />
                )}

                {!builtInViews.has(activeView) && (
                  <FallbackPage activeView={activeView} />
                )}

              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-[var(--color-background-secondary)]/90 backdrop-blur-xl border border-[var(--color-border-medium)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-full px-4 py-2.5 flex items-center gap-2 pointer-events-auto transition-transform hover:-translate-y-1 duration-300">
                  <button 
                    onClick={() => setActiveView("Dashboard")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${activeView === "Dashboard" ? "bg-[var(--color-accent)] text-[#ffffff] shadow-md scale-105" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"}`}
                    title="Home"
                  >
                    <Compass size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveView("My Courses")}
                    className={`p-2.5 rounded-full transition-all duration-300 ${activeView === "My Courses" ? "bg-[var(--color-info)] text-[#ffffff] shadow-md scale-105" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"}`}
                    title="My Courses"
                  >
                    <BookMarked size={20} />
                  </button>
                  <div className="w-px h-6 bg-[var(--color-border-medium)] mx-1"></div>
                  <button 
                    className="p-2.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105"
                    title="Search"
                  >
                    <Search size={20} />
                  </button>
                  <button 
                    className="p-2.5 rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105"
                    title="Notifications"
                  >
                    <div className="relative">
                      <Bell size={20} />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-warning)] rounded-full border-2 border-[var(--color-background-secondary)] shadow-sm animate-pulse"></span>
                    </div>
                  </button>
                  <button 
                    className="p-2.5 rounded-full bg-[var(--color-success)] text-[#ffffff] hover:bg-[var(--color-success)]/90 hover:scale-110 transition-all duration-300 ml-1 shadow-lg active:scale-95"
                    title="New Action"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </Suspense>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
    </>
  );
}
