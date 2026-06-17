import { motion } from "framer-motion";
import { Rocket, User, Settings, LogOut, LogIn, Sun, Moon, Home, Bell, Keyboard, ShieldCheck, Search } from "lucide-react";
import { useState, useEffect, lazy, Suspense, type LazyExoticComponent, type ComponentType, type ReactNode } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../app/components/ui/sheet";
import { Switch } from "../../../app/components/ui/switch";
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
import { ApiRequestError, fetchJsonWithRetry } from "../../../lib/apiClient";

const CoursePlayerPage = lazy(() => import("../pages/CoursePlayerPage"));
const FallbackPage = lazy(() => import("../pages/FallbackPage"));
const AudiobooksLibraryPage = lazy(() => import("../pages/AudiobooksLibraryPage"));
const AudiobookPlayerPage = lazy(() => import("../pages/AudiobookPlayerPage"));

const viewMap: Record<string, LazyExoticComponent<ComponentType<any>>> = {
  "Dashboard": lazy(() => import("../pages/DashboardPage")),
  "My Courses": lazy(() => import("../pages/MyCoursesPage")),
  "Saved Courses": lazy(() => import("../pages/SavedCoursesPage")),
  "Discover Courses": lazy(() => import("../pages/DiscoverCoursesPage")),
  "Completed Courses": lazy(() => import("../pages/CompletedCoursesPage")),
  "Tasks": lazy(() => import("../pages/TasksPage")),
  "Calendar": lazy(() => import("../pages/CalendarPage")),
  "Notes": lazy(() => import("../pages/NotesPage")),
  "Wellness Hub": lazy(() => import("../pages/WellnessHubPage")),
  "Growth Mindset": lazy(() => import("../pages/GrowthMindsetPage")),
  "Daily Reflection": lazy(() => import("../pages/ReflectionPage")),
  "Audiobooks": lazy(() => import("../pages/AudiobooksLibraryPage")),
};

const PLAYGROUND_PREF_KEYS = {
  reminders: "ateion_playground_course_reminders",
  autoResume: "ateion_playground_auto_resume",
};

function loadPreference(key: string, fallback: boolean) {
  if (typeof window === "undefined") return fallback;
  const saved = window.localStorage.getItem(key);
  return saved === null ? fallback : saved === "true";
}

function savePreference(key: string, value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, String(value));
}

function SettingsRow({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 py-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)]">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--color-text-primary)]">{title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
          </div>
        </div>
        {children}
      </div>
  );
}

function PlaygroundInner() {
  const { userProfile, setUserProfile, streak, xp, courseQuery, setCourseQuery, toastMessage, setToastMessage } = usePlayground();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [courseReminders, setCourseReminders] = useState(() => loadPreference(PLAYGROUND_PREF_KEYS.reminders, false));
  const [autoResume, setAutoResume] = useState(() => loadPreference(PLAYGROUND_PREF_KEYS.autoResume, true));
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));

  const normalizedPath = location.pathname.replace(/\/+$/, "");

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

  const updatePreference = (
      key: string,
      value: boolean,
      setter: (next: boolean) => void,
      message: string,
  ) => {
    setter(value);
    savePreference(key, value);
    setToastMessage(message);
  };

  useEffect(() => {
    const syncAuthentication = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("ateion:auth-changed", syncAuthentication);
    window.addEventListener("storage", syncAuthentication);

    return () => {
      window.removeEventListener("ateion:auth-changed", syncAuthentication);
      window.removeEventListener("storage", syncAuthentication);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const controller = new AbortController();

    const fetchUserDataFromDB = async () => {
      try {
        const dbUser = await fetchJsonWithRetry<{
          fullName?: string;
          ageSegment?: string;
          isPremium?: boolean;
        }>(
            "/auth/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            },
            3,
        );

        setUserProfile({
          fullName: dbUser.fullName || "Student",
          firstName: dbUser.fullName ? dbUser.fullName.split(" ")[0] : "Student",
          segmentText: dbUser.ageSegment || "Universal Access",
          isPremium: Boolean(dbUser.isPremium),
        });
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (
            error instanceof ApiRequestError &&
            (error.status === 401 || error.status === 403)
        ) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
          window.dispatchEvent(new CustomEvent("open-login"));
          return;
        }

        // A temporary Render/Supabase failure must not delete a valid token.
        console.error("Could not refresh the user profile:", error);
      }
    };

    void fetchUserDataFromDB();
    return () => controller.abort();
  }, [isAuthenticated, navigate, setUserProfile]);

  return (
      <>
        <Helmet>
          <title>Playground | Ateion</title>
          <meta name="description" content="Explore Ateion's interactive learning resources, tools, and activities designed to build real-world capabilities." />
        </Helmet>
        <SidebarProvider>
          <div
              className="ateion-metallic-bg flex w-full min-w-0 overflow-hidden"
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
                    onClick={() => navigate("/playground/dashboard")}
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
                      <SidebarMenuButton
                          className="text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/30 cursor-pointer hover:translate-x-1 transition-all duration-300"
                          onClick={() => setSettingsOpen(true)}
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      {isAuthenticated ? (
                          <SidebarMenuButton
                              className="group/logout text-[var(--color-text-primary)] hover:text-red-500 hover:bg-red-500/10 cursor-pointer hover:translate-x-1 transition-all duration-300"
                              onClick={() => {
                                localStorage.removeItem("token");
                                setIsAuthenticated(false);
                                window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
                                navigate("/playground/discover");
                              }}
                          >
                            <LogOut size={16} className="group-hover/logout:scale-110 group-hover/logout:-translate-x-1 transition-transform duration-300" />
                            <span>Logout</span>
                          </SidebarMenuButton>
                      ) : (
                          <SidebarMenuButton
                              className="group/login text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 cursor-pointer hover:translate-x-1 transition-all duration-300"
                              onClick={() => window.dispatchEvent(new CustomEvent("open-login"))}
                          >
                            <LogIn size={16} className="group-hover/login:scale-110 transition-transform duration-300" />
                            <span>Login</span>
                          </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </div>
            </Sidebar>

            <SidebarInset className="flex min-w-0 flex-1 flex-col overflow-x-hidden bg-transparent w-full">
              {!location.pathname.startsWith("/playground/course/") && (
                  <header className="flex h-16 sm:h-20 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-10 bg-[var(--color-background-secondary)]/60 backdrop-blur-md border-b border-[var(--color-border-light)] shrink-0 overflow-visible relative z-30">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <SidebarTrigger className="playground-icon-shine flex lg:hidden items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-lg text-sm font-bold shadow-sm hover:brightness-110 transition-all" />
                      <div className="flex min-w-0 items-center gap-2">
                        <h1
                            className="min-w-0 truncate font-bold text-[var(--color-text-primary)] cursor-pointer hover:text-[var(--color-accent)] hover:scale-105 origin-left transition-all duration-300 active:scale-95"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                              letterSpacing: "-0.03em",
                              lineHeight: "1.1"
                            }}
                            onClick={() => navigate("/playground/dashboard")}
                        >
                          Playground
                        </h1>
                        <span className="text-[var(--color-text-tertiary)] text-sm hidden xl:inline">→</span>
                        <span
                            className="text-[var(--color-accent)] font-semibold hidden xl:inline cursor-default"
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

                    <div className="flex shrink-0 items-center gap-2 sm:gap-5">
                      <button
                          onClick={() => navigate("/")}
                          className="hidden xl:flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-transparent bg-[var(--color-accent)] text-xs text-[var(--color-text-inverse)] shadow-[0_2px_10px_var(--color-accent-light)] hover:shadow-[0_4px_15px_var(--color-accent)] hover:-translate-y-0.5 transition-all duration-300 mr-1"
                          title="Home"
                      >
                        <Home size={16} />
                      </button>



                      <NotificationDropdown />

                      <div className="hidden xl:flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-text-inverse)] px-4 py-1.5 rounded-full text-xs font-bold shadow-[0_2px_10px_var(--color-accent-light)] hover:shadow-[0_4px_15px_var(--color-accent)] hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
                        <User size={14} className="group-hover:animate-bounce" />
                        <span>{userProfile.segmentText}</span>
                      </div>

                      <div className="flex items-center gap-3 cursor-pointer group hover:opacity-100">
                        <div className="text-right hidden xl:block">
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

              <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
                <SheetContent
                    side="right"
                    className="w-[92vw] max-w-[420px] overflow-y-auto border-l border-[var(--color-border-light)] bg-[var(--color-background-primary)] p-0 text-[var(--color-text-primary)] shadow-2xl"
                >
                  <SheetHeader className="border-b border-[var(--color-border-light)] px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_8px_22px_var(--color-accent-light)]">
                        <Settings size={20} />
                      </div>
                      <div>
                        <SheetTitle className="text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                          Playground Settings
                        </SheetTitle>
                        <SheetDescription className="text-sm text-[var(--color-text-secondary)]">
                          Personalize your learning space
                        </SheetDescription>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col gap-5 px-5 pb-6">
                    <div className="rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={userProfile.fullName} />
                        <div className="min-w-0">
                          <p className="truncate text-base font-bold text-[var(--color-text-primary)]">{userProfile.fullName}</p>
                          <p className="text-sm text-[var(--color-text-secondary)]">{userProfile.segmentText}</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="flex min-h-[88px] flex-col items-center justify-center rounded-2xl bg-[var(--color-background-primary)] p-3 text-center">
                          <p className="text-xs font-semibold text-[var(--color-text-tertiary)]">XP</p>
                          <p className="mt-1 text-lg font-bold text-[var(--color-accent)]">{xp.toLocaleString()}</p>
                        </div>
                        <div className="flex min-h-[88px] flex-col items-center justify-center rounded-2xl bg-[var(--color-background-primary)] p-3 text-center">
                          <p className="text-xs font-semibold text-[var(--color-text-tertiary)]">Streak</p>
                          <p className="mt-1 text-lg font-bold text-[var(--color-text-primary)]">{streak} days</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">Preferences</p>

                      <SettingsRow
                          icon={theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
                          title="Dark mode"
                          description="Switch the Playground theme."
                      >
                        <Switch
                            checked={theme === "dark"}
                            onCheckedChange={(checked) => {
                              if ((checked && theme !== "dark") || (!checked && theme === "dark")) {
                                toggleTheme();
                              }
                            }}
                            className="data-[state=checked]:bg-[var(--color-accent)] data-[state=unchecked]:bg-[var(--color-background-tertiary)]"
                            aria-label="Toggle dark mode"
                        />
                      </SettingsRow>

                      <SettingsRow
                          icon={<Bell size={17} />}
                          title="Course reminders"
                          description="Keep reminders enabled for learning sessions."
                      >
                        <Switch
                            checked={courseReminders}
                            onCheckedChange={(checked) => updatePreference(
                                PLAYGROUND_PREF_KEYS.reminders,
                                checked,
                                setCourseReminders,
                                checked ? "Course reminders enabled" : "Course reminders disabled",
                            )}
                            className="data-[state=checked]:bg-[var(--color-accent)] data-[state=unchecked]:bg-[var(--color-background-tertiary)]"
                            aria-label="Toggle course reminders"
                        />
                      </SettingsRow>

                      <SettingsRow
                          icon={<ShieldCheck size={17} />}
                          title="Auto resume"
                          description="Remember your last active course."
                      >
                        <Switch
                            checked={autoResume}
                            onCheckedChange={(checked) => updatePreference(
                                PLAYGROUND_PREF_KEYS.autoResume,
                                checked,
                                setAutoResume,
                                checked ? "Auto resume enabled" : "Auto resume disabled",
                            )}
                            className="data-[state=checked]:bg-[var(--color-accent)] data-[state=unchecked]:bg-[var(--color-background-tertiary)]"
                            aria-label="Toggle auto resume"
                        />
                      </SettingsRow>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">Quick Actions</p>

                      <button
                          type="button"
                          onClick={() => {
                            setSettingsOpen(false);
                            setSearchOpen(true);
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 py-3 text-left text-sm font-bold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      >
                        <span className="flex items-center gap-3">
                          <Keyboard size={17} />
                          Open global search
                        </span>
                        <Search size={16} />
                      </button>

                      <button
                          type="button"
                          onClick={() => {
                            setSettingsOpen(false);
                            navigate("/dashboard");
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-4 py-3 text-left text-sm font-bold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      >
                        <span className="flex items-center gap-3">
                          <User size={17} />
                          Account dashboard
                        </span>
                        <Home size={16} />
                      </button>

                      <button
                          type="button"
                          onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                            window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
                            setSettingsOpen(false);
                            navigate("/");
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <span className="flex items-center gap-3">
                          <LogOut size={17} />
                          Logout
                        </span>
                      </button>
                      </div>
                  </div>
                </SheetContent>
              </Sheet>

              <main className={`min-w-0 flex-1 overflow-x-hidden ${location.pathname.startsWith("/playground/course/") ? "p-0 overflow-y-auto" : "overflow-y-auto p-4 sm:p-6 lg:p-10"}`}>
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
                  ) : location.pathname.startsWith("/playground/audiobook/") ? (
                      <Routes>
                        <Route path="audiobook/:id" element={<AudiobookPlayerPage />} />
                      </Routes>
                  ) : (
                      <motion.div
                          className="w-full max-w-6xl min-w-0 mx-auto flex flex-col gap-8"
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
