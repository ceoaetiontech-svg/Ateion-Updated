import { motion } from "framer-motion";
import { Rocket, User, Settings, LogOut, Sun, Moon, Compass, BookMarked, Search, Flame, Home } from "lucide-react";
import { useState, useEffect, lazy, Suspense, type LazyExoticComponent, type ComponentType } from "react";
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
import { useNavigate, useLocation, Routes, Route } from "react-router";
import { useTheme } from "../../../app/components/ThemeProvider";
import { navigationSections, getActiveView } from "../shared/navigationData";
import UserAvatar from "../shared/UserAvatar";
import { PlaygroundProvider, usePlayground } from "../shared/PlaygroundContext";
import GlobalSearch from "../components/GlobalSearch";
import NotificationDropdown from "../components/NotificationDropdown";
import Toast from "../components/Toast";
import { slideInItem } from "../shared/types";
import SkeletonCourseCard from "../components/SkeletonCourseCard";

const CoursePlayerPage = lazy(() => import("../pages/CoursePlayerPage"));
const FallbackPage = lazy(() => import("../pages/FallbackPage"));

const viewMap: Record<string, LazyExoticComponent<ComponentType<any>>> = {
  "Dashboard": lazy(() => import("../pages/DashboardPage")),
  "My Courses": lazy(() => import("../pages/MyCoursesPage")),
  "Saved Courses": lazy(() => import("../pages/SavedCoursesPage")),
  "Discover Courses": lazy(() => import("../pages/DiscoverCoursesPage")),
  "Tasks": lazy(() => import("../pages/TasksPage")),
  "Calendar": lazy(() => import("../pages/CalendarPage")),
  "Notes": lazy(() => import("../pages/NotesPage")),
  "Wellness Hub": lazy(() => import("../pages/WellnessHubPage")),
  "Mental Health": lazy(() => import("../pages/MentalHealthPage")),
};

function PlaygroundInner() {
  const { userProfile, setUserProfile, streak, xp, courseQuery, setCourseQuery, toastMessage, setToastMessage } = usePlayground();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const activeView = getActiveView(location.pathname);

  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    const update = () => setNavbarHeight(nav.offsetHeight);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(nav);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const fetchUserDataFromDB = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await fetch(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (response.ok) {
          const dbUser = await response.json();
          setUserProfile({
            fullName: dbUser.fullName || "Student",
            firstName: dbUser.fullName ? dbUser.fullName.split(" ")[0] : "Student",
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
  }, [navigate, setUserProfile]);

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
            className="border-r border-r-[var(--color-border-medium)]"
            style={{
              top: navbarHeight,
              height: `calc(100svh - ${navbarHeight}px)`,
            }}
          >
            <div className="flex h-full flex-col bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] shadow-[inset_-2px_0_6px_-2px_rgba(0,0,0,0.08)]">
              <SidebarHeader
                className="px-4 py-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate("/playground")}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white">
                    <Rocket size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-[var(--color-text-primary)] tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                      Ateion
                    </span>
                    <span className="text-[10px] text-[var(--color-accent)]/80 tracking-widest font-bold uppercase">
                      Playground
                    </span>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent className="px-2">
                {navigationSections.map((section, si) => (
                  <div key={section.title}>
                    <SidebarGroup className="mb-2">
                      <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] flex items-center mb-1">
                        <section.icon className="mr-2 h-3.5 w-3.5" />
                        {section.title}
                      </SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {section.items.map((item, ii) => (
                            <motion.div
                              key={item.title}
                              variants={slideInItem}
                              initial="hidden"
                              animate="show"
                              transition={{ delay: si * 0.04 + ii * 0.04, type: "spring", stiffness: 300, damping: 26 }}
                            >
                              <SidebarMenuItem>
                                <SidebarMenuButton
                                  className={`group/btn relative overflow-hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)] transition-all duration-300 py-2.5 ${location.pathname === item.path ? "bg-[var(--color-accent_light)] text-[var(--color-accent)] font-bold shadow-sm border-l-[3px] border-[var(--color-accent)] rounded-r-xl rounded-l-none pl-3" : "rounded-xl pl-3 hover:translate-x-1"}`}
                                  onClick={() => navigate(item.path)}
                                  aria-current={location.pathname === item.path ? "page" : undefined}
                                >
                                  <item.icon className="h-4 w-4 mr-2 group-hover/btn:scale-110 group-hover/btn:-rotate-6 transition-transform duration-300" />
                                  <span>{item.title}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </motion.div>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </div>
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
                      <a href="/dashboard" className="flex items-center gap-3 w-full rounded-lg">
                        <UserAvatar name={userProfile.fullName} />
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-semibold text-[var(--color-text-primary)]">{userProfile.fullName}</span>
                          <span className="text-xs text-[var(--color-text-secondary)]">{userProfile.segmentText}</span>
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
            {!location.pathname.startsWith("/playground/course/") && (
            <header className="flex h-16 sm:h-20 items-center justify-between px-6 lg:px-10 bg-[var(--color-background-secondary)]/60 backdrop-blur-md border-b border-[var(--color-border-light)] shrink-0">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="flex md:hidden items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-lg text-sm font-bold shadow-sm hover:brightness-110 transition-all" />
                <div className="flex items-center gap-2">
                  <h1
                    className="font-bold text-[var(--color-text-primary)] cursor-pointer hover:text-[var(--color-accent)] hover:scale-105 origin-left transition-all duration-300 active:scale-95"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: "1.1"
                    }}
                    onClick={() => navigate("/playground")}
                  >
                    Playground
                  </h1>
                  <span className="text-[var(--color-text-tertiary)] text-sm hidden sm:inline">→</span>
                  <span
                    className="text-[var(--color-accent)] font-semibold hidden sm:inline cursor-default"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1rem, 2vw, 1.4rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {activeView}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={() => navigate("/")}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-xs text-[var(--color-text-tertiary)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-text-primary)] transition-colors mr-1"
                  title="Home"
                >
                  <Home size={16} />
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-xs text-[var(--color-text-tertiary)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-text-primary)] transition-colors w-36"
                >
                  <Search size={14} />
                  <span className="hidden lg:inline">Search</span>
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-background-primary)] border border-[var(--color-border-light)] font-mono text-[10px]">⌘K</kbd>
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex sm:hidden p-2 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors"
                >
                  <Search size={18} className="text-[var(--color-text-primary)]" />
                </button>

                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group/streak">
                  <Flame size={14} className={`text-orange-500 ${streak > 0 ? "animate-[bounce_2s_ease-in-out_infinite]" : ""}`} />
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">{streak}</span>
                  <span className="text-xs text-[var(--color-text-tertiary)] hidden sm:inline">day streak</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-text-primary)]">
                  <span className="text-[var(--color-accent)]">{xp.toLocaleString()}</span>
                  <span className="text-[var(--color-text-tertiary)] hidden sm:inline">XP</span>
                </div>

                <NotificationDropdown />

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
                  <UserAvatar name={userProfile.firstName} className="group-hover:scale-110 group-hover:shadow-md transition-all duration-300 group-hover:border-[var(--color-accent)]/50" />
                </div>
              </div>
            </header>
            )}

            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
            <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />

            <main className={`flex-1 ${location.pathname.startsWith("/playground/course/") ? "p-0 overflow-hidden" : "overflow-y-auto p-6 lg:p-10"}`}>
              <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <SkeletonCourseCard key={i} />
                    </motion.div>
                  ))}
                </div>
              }>
                {location.pathname.startsWith("/playground/course/") ? (
                  <Routes>
                    <Route path="course/:id" element={<CoursePlayerPage />} />
                  </Routes>
                ) : (
                  <motion.div
                    className="max-w-6xl mx-auto flex flex-col gap-8"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {(() => {
                      const ViewComponent = viewMap[activeView] ?? FallbackPage;
                      return <ViewComponent />;
                    })()}
                  </motion.div>
                )}
              </Suspense>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}

export default function PlaygroundLayout() {
  return (
    <PlaygroundProvider>
      <PlaygroundInner />
    </PlaygroundProvider>
  );
}
