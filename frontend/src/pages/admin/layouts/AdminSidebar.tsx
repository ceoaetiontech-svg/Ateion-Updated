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
  PanelRightOpen,
  PanelRightClose,
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
      className={`h-screen border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex flex-col transition-all duration-300
                  fixed inset-y-0 left-0 z-50 translate-x-[-100%] peer-checked/sidebar:translate-x-0 
                  lg:translate-x-0 lg:sticky lg:top-0 lg:z-20
                  w-[var(--sidebar-width)] 
                  ${collapsed ? "lg:w-[var(--sidebar-collapsed-width)]" : "lg:w-[var(--sidebar-width)]"}`}
    >
      <div className={`p-6 border-b border-[var(--color-border-light)] flex items-center gap-3 ${collapsed ? "justify-start lg:justify-center" : ""}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center border border-[var(--color-accent)]/20 shrink-0">
          <ShieldCheck size={20} className="text-[var(--color-accent)]" />
        </div>
        <div className={`overflow-hidden ${collapsed ? "block lg:hidden" : "block"}`}>
          <h2 className="font-bold text-lg font-['OV_Soge'] leading-tight whitespace-nowrap">
            Ateion Admin
          </h2>
          <p className="text-xs text-[var(--color-text-tertiary)] font-medium whitespace-nowrap">
            Ecosystem Control
          </p>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Link
              to={item.path}
              key={item.id}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${
                isActive
                  ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)]"
              } ${collapsed ? "justify-start px-4 lg:justify-center lg:px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <label 
                htmlFor="mobile-sidebar-toggle" 
                className="absolute inset-0 cursor-pointer lg:pointer-events-none" 
              />
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[var(--color-accent)]" />
              )}
              <Icon size={18} className="shrink-0" />
              <span className={collapsed ? "block lg:hidden" : "block"}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[var(--color-border-light)] flex flex-col gap-1">
        {!collapsed && (
          <div className="hidden lg:flex flex-wrap items-center gap-2 px-3 py-2 mb-1 text-[10px] text-[var(--color-text-tertiary)] bg-[var(--color-background-tertiary)]/15 border border-[var(--color-border-light)]/50 rounded-xl">
            <Keyboard size={12} className="shrink-0 opacity-75" />
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)]/80 text-[var(--color-text-secondary)] border border-[var(--color-border-light)] font-mono text-[9px]">N</kbd> New</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)]/80 text-[var(--color-text-secondary)] border border-[var(--color-border-light)] font-mono text-[9px]">/</kbd> Search</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-[var(--color-background-secondary)]/80 text-[var(--color-text-secondary)] border border-[var(--color-border-light)] font-mono text-[9px]">?</kbd> Help</span>
          </div>
        )}
        <button
          onClick={logout}
          className={`relative flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer ${collapsed ? "justify-start px-4 lg:justify-center lg:px-0" : ""}`}
          title="Sign Out"
        >
          <label 
            htmlFor="mobile-sidebar-toggle" 
            className="absolute inset-0 cursor-pointer lg:pointer-events-none" 
          />
          <LogOut size={17} className="shrink-0" />
          <span className={collapsed ? "block lg:hidden" : "block"}>Sign Out</span>
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-full py-2 rounded-xl text-[var(--color-text-tertiary)] hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-secondary)] transition-all duration-200 cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelRightOpen size={17} /> : <PanelRightClose size={17} />}
        </button>
      </div>
    </aside>
  );
}
