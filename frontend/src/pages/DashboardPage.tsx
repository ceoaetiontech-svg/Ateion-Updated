import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  Gamepad2,
  BarChart3,
  User,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  ChevronRight,
  Sparkles,
  Trophy,
  FileText,
  Compass,
} from "lucide-react";

import AIChatBot from  "../app/components/AIChatbot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const sidebarLinks = [
  { label: "Overview", icon: BarChart3, path: "/dashboard" },
  { label: "My Courses", icon: BookOpen, path: "/playground/mycourses" },
  { label: "Olympiad", icon: Award, path: "/gco" },
  { label: "Playground", icon: Gamepad2, path: "/PlayGround" },
  { label: "Certificates", icon: FileText, path: "/certificate" },
  { label: "Profile", icon: User, path: "/profile" },
];

const stats = [
  { label: "Active Courses", value: "6", icon: BookOpen, change: "+2 this month", color: "var(--color-info)" },
  { label: "Completed", value: "12", icon: CheckCircle, change: "68% avg score", color: "var(--color-success)" },
  { label: "Certificates", value: "3", icon: Award, change: "+1 this month", color: "var(--color-accent)" },
  { label: "Score", value: "87", icon: Zap, change: "Top 15%", color: "var(--color-warning)" },
];

const activities = [
  { action: "Completed", course: "Advanced Mathematics", time: "2 hours ago", icon: CheckCircle, color: "var(--color-success)" },
  { action: "Started", course: "Python Programming", time: "Yesterday", icon: BookOpen, color: "var(--color-accent)" },
  { action: "Earned Certificate", course: "Web Development Fundamentals", time: "3 days ago", icon: Award, color: "var(--color-warning)" },
  { action: "Achieved", course: "Top 10% in Global Olympiad", time: "1 week ago", icon: Trophy, color: "var(--color-info)" },
  { action: "Completed", course: "Data Structures", time: "2 weeks ago", icon: CheckCircle, color: "var(--color-success)" },
];

const quickLinks = [
  { label: "Browse Courses", icon: BookOpen, path: "/playground/mycourses" },
  { label: "Join Olympiad", icon: Award, path: "/gco" },
  { label: "Playground Challenges", icon: Gamepad2, path: "/PlayGround" },
  { label: "View Certificates", icon: FileText, path: "/certificate" },
  { label: "View Analytics", icon: TrendingUp, path: "/assessment-demo" },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dashboard | Ateion</title>
        <meta name="description" content="Track your learning journey and capability development." />
      </Helmet>

      <div className="flex min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] font-[var(--font-body)]">

        {/* ─── SIDEBAR ─── */}
        <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border-light)] mb-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent_light)] text-[var(--color-accent)] flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-[var(--color-text-primary)]">Student</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">Learner</span>
            </div>
          </div>

          <div className="flex gap-1 pb-4 border-b border-[var(--color-border-light)] mb-3">
            {[
              { value: "6", label: "Courses" },
              { value: "12", label: "Done" },
              { value: "3", label: "Cert" },
            ].map((s) => (
              <div key={s.label} className="flex-1 flex flex-col items-center py-2 rounded-lg bg-[var(--color-nav-button)]">
                <span className="font-bold text-sm text-[var(--color-text-primary)]">{s.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-tertiary)]">{s.label}</span>
              </div>
            ))}
          </div>

          <nav className="flex flex-col gap-0.5 flex-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.path === "/dashboard";
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left w-full ${
                    isActive
                      ? "bg-[var(--color-accent_light)] text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-nav-button-hover)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[var(--color-border-light)]">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--color-accent_light)] text-sm text-[var(--color-text-secondary)]">
              <Zap size={14} />
              <span>Capability Score</span>
              <strong className="ml-auto text-lg font-extrabold text-[var(--color-accent)]">87</strong>
            </div>
          </div>
        </aside>

        {/* ─── MAIN ─── */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 max-w-[1100px]">

          {/* Welcome */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold text-[var(--color-text-primary)] font-[var(--font-display)] flex items-center gap-2 m-0">
                Welcome back
                <Sparkles size={20} className="text-[var(--color-accent)]" />
              </h1>
              <p className="text-sm text-[var(--color-text-tertiary)] m-0 mt-1">Here's what's happening with your learning today.</p>
            </div>
            <button
              onClick={() => navigate("/playground/mycourses")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(232,133,106,0.3)] transition-all duration-200 whitespace-nowrap"
            >
              <Target size={16} />
              <span>Continue Learning</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="clay-card !p-5 !rounded-xl flex flex-col gap-1 hover:!border-[var(--color-border-medium)] hover:!shadow-[var(--shadow-sm)] hover:!translate-y-0 cursor-default"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[var(--color-text-primary)] font-[var(--font-display)] leading-none">
                      {stat.value}
                    </span>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, color: stat.color }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">{stat.label}</span>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">{stat.change}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

            {/* Recent Activity */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="clay-card !p-6 !rounded-xl">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)] font-[var(--font-display)] m-0 mb-5">
                <Clock size={18} />
                Recent Activity
              </h2>
              <div className="flex flex-col">
                {activities.map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} className={`flex items-start gap-3 py-3 ${i > 0 ? "border-t border-[var(--color-border-light)]" : ""}`}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: act.color }} />
                      <div style={{ color: act.color }} className="mt-0.5 flex-shrink-0">
                        <Icon size={14} strokeWidth={2} />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-sm text-[var(--color-text-primary)] leading-snug">
                          <strong className="font-semibold">{act.action}</strong> — {act.course}
                        </span>
                        <span className="text-xs text-[var(--color-text-tertiary)]">{act.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="clay-card !p-6 !rounded-xl">
              <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--color-text-primary)] font-[var(--font-display)] m-0 mb-5">
                <Compass size={18} />
                Quick Actions
              </h2>
              <div className="flex flex-col gap-1">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-nav-button-hover)] hover:text-[var(--color-text-primary)] transition-all duration-150 text-left w-full group"
                    >
                      <Icon size={16} strokeWidth={1.8} />
                      <span>{link.label}</span>
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity duration-150" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
