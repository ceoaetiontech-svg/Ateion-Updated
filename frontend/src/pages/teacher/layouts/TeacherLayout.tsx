import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Users,
  Settings,
  LogOut,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { useTheme } from "../../../app/components/ThemeProvider";
import "../../../styles/Dashboard.css";

export default function TeacherLayout() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL path
  const currentPath = location.pathname;
  let activeTab = "overview";
  if (currentPath.includes("/teacher/courses")) activeTab = "courses";
  if (currentPath.includes("/teacher/upload")) activeTab = "upload";
  if (currentPath.includes("/teacher/students")) activeTab = "students";
  if (currentPath.includes("/teacher/settings")) activeTab = "settings";

  useEffect(() => {
    const teacherData = localStorage.getItem("teacher");
    if (!teacherData) {
      navigate("/teacher");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher");
  };

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      path: "/teacher/dashboard",
    },
    {
      id: "courses",
      label: "My Courses",
      icon: BookOpen,
      path: "/teacher/courses",
    },
    {
      id: "upload",
      label: "Upload Course",
      icon: Upload,
      path: "/teacher/upload",
    },
    {
      id: "students",
      label: "My Students",
      icon: Users,
      path: "/teacher/students",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/teacher/settings",
    },
  ];

  const currentMenuLabel =
    menuItems.find((m) => m.id === activeTab)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] font-['SF_Pro_Display'] flex">
      {/* SIDEBAR */}
      <aside className="w-[280px] h-screen sticky top-0 border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex flex-col z-20">
        <div className="p-6 border-b border-[var(--color-border-light)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500">
            <GraduationCap size={20} className="text-blue-500" />
          </div>
          <div>
            <h2 className="font-bold text-lg font-['OV_Soge'] leading-tight">
              Ateion Portal
            </h2>
            <p className="text-xs text-[var(--color-text-tertiary)] font-medium">
              Instructor Dashboard
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                to={item.path}
                key={item.id}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${
                  isActive
                    ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-button)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--color-border-light)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium text-red-500 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* HEADER */}
        <header className="h-[72px] px-8 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)] backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold font-['OV_Soge']">
            {currentMenuLabel}
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors bg-[var(--color-background-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-secondary)]"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 border-2 border-[var(--color-background-primary)] shadow-sm"></div>
          </div>
        </header>

        {/* DYNAMIC CONTENT (Pages are injected here) */}
        <div className="p-8 max-w-[var(--max-width)] mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
