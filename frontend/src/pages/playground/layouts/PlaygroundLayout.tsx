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
import playgroundBg from "../../../assets/hero/playground_bg.png";

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
                backgroundImage: theme === "dark"
                  ? "radial-gradient(circle at 50% 30%, rgba(112, 94, 242, 0.08) 0%, transparent 60%)"
                  : `linear-gradient(rgba(248, 248, 244, 0.88), rgba(248, 248, 244, 0.88)), url(${playgroundBg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
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
              <div className="flex h-full flex-col bg-white text-gray-800 shadow-[4px_0_32px_rgba(0,0,0,0.05)]">
                {/* ─── Logo Area ─── */}
                <SidebarHeader
                    className="px-5 py-7 cursor-pointer hover:opacity-85 transition-all duration-200"
                    onClick={() => navigate("/playground/dashboard")}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A0A0] to-[#A86E6E] text-white shadow-[0_4px_16px_rgba(212,160,160,0.35)]">
                      <Rocket size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
                        Ateion
                      </span>
                      <span className="text-[10px] text-[#D4A0A0]/70 tracking-[0.18em] font-semibold uppercase leading-tight">
                        Playground
                      </span>
                    </div>
                  </div>
                </SidebarHeader>

                {/* ─── Navigation ─── */}
                <SidebarContent className="px-3">
                  {navigationSections.map((section, si) => (
                      <div key={section.title}>
                        <SidebarGroup className="mb-3">
                          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 flex items-center mb-2 px-2">
                            <section.icon className="mr-2 h-3.5 w-3.5 opacity-50" />
                            {section.title}
                          </SidebarGroupLabel>
                          <SidebarGroupContent>
                            <SidebarMenu className="space-y-0.5">
                              {section.items.map((item, ii) => {
                                const isActive = location.pathname === item.path;
                                return (
                                  <motion.div
                                      key={item.title}
                                      variants={slideInItem}
                                      initial="hidden"
                                      animate="show"
                                      transition={{ delay: si * 0.04 + ii * 0.04, type: "spring", stiffness: 300, damping: 26 }}
                                  >
                                    <SidebarMenuItem>
                                      <SidebarMenuButton
                                          className={`group/btn relative overflow-hidden transition-all duration-200 ease-in-out py-[10px] px-[14px] rounded-full ${
                                            isActive
                                              ? "bg-gradient-to-r from-[#C49AA5] via-[#B78D9A] to-[#A97F8C] text-white font-bold shadow-[0_4px_10px_rgba(183,141,154,0.35)]"
                                              : "text-[#4B5563] hover:bg-[rgba(183,141,154,0.15)]"
                                          }`}
                                          onClick={() => navigate(item.path)}
                                          data-tour={item.path === "/playground/discover" ? "sidebar-discover-courses" : undefined}
                                          aria-current={isActive ? "page" : undefined}
                                      >
                                        <item.icon className={`h-4.5 w-4.5 mr-[10px] transition-all duration-200 ease-in-out ${
                                          isActive
                                            ? "scale-110 text-white"
                                            : "group-hover/btn:scale-110"
                                        }`} />
                                        <span className="text-sm font-medium">{item.title}</span>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  </motion.div>
                                );
                              })}
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      </div>
                  ))}
                </SidebarContent>

                {/* ─── Footer: User Card + Actions ─── */}
                <SidebarFooter className="px-3 pb-5">
                  {/* User Card */}
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-3.5 mb-3 hover:bg-gray-100 transition-all duration-200">
                    <a href="/dashboard" className="flex items-center gap-3 w-full">
                      <UserAvatar name={userProfile.fullName} />
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">{userProfile.fullName}</span>
                        <span className="text-[11px] text-gray-500 truncate">{userProfile.segmentText}</span>
                      </div>
                    </a>
                  </div>

                  {/* Settings */}
                  <button
                      onClick={() => setSettingsOpen(true)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>

                  {/* Logout / Login */}
                  {isAuthenticated ? (
                      <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            setIsAuthenticated(false);
                            window.dispatchEvent(new CustomEvent("ateion:auth-changed"));
                            navigate("/playground/discover");
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                  ) : (
                      <button
                          onClick={() => window.dispatchEvent(new CustomEvent("open-login"))}
                          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-[#D4A0A0] hover:bg-[#D4A0A0]/10 transition-all duration-200"
                      >
                        <LogIn size={16} />
                        <span>Login</span>
                      </button>
                  )}
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
                            className="text-[#D4A0A0] font-semibold hidden xl:inline cursor-default"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1rem, 2vw, 1.4rem)",
                              letterSpacing: "-0.02em",
                            }}
                        >
                          {activeView}
                        </span>
                      </div>

                      {/* Left-aligned larger motivational quote pill */}
                      <div className="hidden xl:flex items-center ml-4 shrink-0">
                        <div 
                          className="px-6 py-2.5 rounded-full border border-[var(--color-border-light)] bg-[var(--color-background-primary)]/50 backdrop-blur-sm shadow-sm flex items-center gap-2.5 transition-all duration-300 hover:border-[var(--color-accent)]/20"
                        >
                          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
                          <p 
                            className="text-xs sm:text-[13px] text-[var(--color-text-primary)] font-bold tracking-tight leading-none"
                            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
                          >
                            Everything worth learning....Curated for the person you're becoming.
                          </p>
                        </div>
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
