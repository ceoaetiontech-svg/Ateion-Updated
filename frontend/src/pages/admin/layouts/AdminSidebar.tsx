import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Keyboard,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

const SIDEBAR_STORAGE_KEY = "ateion-admin-sidebar-collapsed";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "courses", label: "Manage Courses", icon: BookOpen, path: "/admin/courses" },
  { id: "upload", label: "Upload Course", icon: Upload, path: "/admin/upload" },
  { id: "users", label: "Users", icon: Users, path: "/admin/users" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
  }, [collapsed]);
  const location = useLocation();
  const { logout } = useAdminAuth();

  const currentPath = location.pathname;
  const activeTab = menuItems.find((item) => currentPath.startsWith(item.path))?.id || "overview";

  return (
    <aside
      className="h-screen sticky top-0 border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex flex-col z-20 transition-all duration-300"
      style={{ width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)" }}
    >
      <div className={`p-6 border-b border-[var(--color-border-light)] flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary_light)] flex items-center justify-center border border-[var(--color-primary)] shrink-0">
          <ShieldCheck size={20} className="text-[var(--color-primary)]" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="font-bold text-lg font-['OV_Soge'] leading-tight whitespace-nowrap">
              Ateion Admin
            </h2>
            <p className="text-xs text-[var(--color-text-tertiary)] font-medium whitespace-nowrap">
              Ecosystem Control
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              to={item.path}
              key={item.id}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${
                isActive
                  ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-button)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] hover:text-[var(--color-text-primary)]"
              } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-border-light)] flex flex-col gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2 px-4 py-2 text-[10px] text-[var(--color-text-tertiary)]">
            <Keyboard size={12} />
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">N</kbd> New course</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">/</kbd> Search</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[var(--color-background-tertiary)] border border-[var(--color-border-light)] font-mono">?</kbd> Help</span>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium text-red-500 hover:bg-red-500/10 cursor-pointer ${collapsed ? "justify-center px-0" : ""}`}
          title="Sign Out"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center justify-center w-full py-2 rounded-xl text-[var(--color-text-tertiary)] hover:bg-[var(--color-background-tertiary)] transition-colors cursor-pointer`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
