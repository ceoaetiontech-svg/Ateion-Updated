import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  ShieldCheck,
  Zap,
  Upload,
  Settings,
} from "lucide-react";
import { Link } from "react-router";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const statCards = [
  {
    label: "Total Courses",
    value: "24",
    icon: BookOpen,
    gradient: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-blue-500/10 text-blue-600",
    border: "border-blue-500/20",
  },
  {
    label: "Active Students",
    value: "1,402",
    icon: Users,
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/10 text-emerald-600",
    border: "border-emerald-500/20",
  },
  {
    label: "Platform Revenue",
    value: "$12,450",
    icon: DollarSign,
    gradient: "from-amber-500/20 to-amber-600/10",
    iconBg: "bg-amber-500/10 text-amber-600",
    border: "border-amber-500/20",
  },
  {
    label: "Completion Rate",
    value: "87%",
    icon: TrendingUp,
    gradient: "from-purple-500/20 to-purple-600/10",
    iconBg: "bg-purple-500/10 text-purple-600",
    border: "border-purple-500/20",
  },
];

const recentActivity = [
  {
    action: "New course published",
    detail: "Introduction to AI",
    time: "2 hours ago",
    type: "course",
  },
  {
    action: "Student enrolled",
    detail: "Alice Chen joined Advanced UX Design",
    time: "4 hours ago",
    type: "user",
  },
  {
    action: "Payment received",
    detail: "$49 from Marcus Johnson",
    time: "6 hours ago",
    type: "payment",
  },
  {
    action: "Course updated",
    detail: "Data Science Fundamentals — Module 3 revised",
    time: "1 day ago",
    type: "course",
  },
  {
    action: "New user registered",
    detail: "Sarah Williams created a student account",
    time: "1 day ago",
    type: "user",
  },
];

const quickActions = [
  { label: "Upload Course", icon: Upload, path: "/admin/upload" },
  { label: "Manage Users", icon: Users, path: "/admin/users" },
  { label: "View Analytics", icon: TrendingUp, path: "/admin/dashboard" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

function AccentBar() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
      style={{ transformOrigin: "left" }}
    />
  );
}

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Ateion</title>
        <meta name="description" content="Ateion admin portal for managing courses, users, and platform settings." />
      </Helmet>
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <AccentBar />
        <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
          Welcome to the Admin Portal
        </h2>
        <p className="text-[var(--color-text-secondary)] max-w-xl">
          This is a fully functional frontend dashboard simulation. Select
          "Upload Course" to try the new course builder.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        variants={containerVariants}
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)] relative overflow-hidden group cursor-default"
              variants={itemVariants}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <div
                  className={`w-11 h-11 rounded-xl ${card.iconBg} border ${card.border} flex items-center justify-center mb-3`}
                >
                  <Icon size={20} />
                </div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {card.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-2 clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-5 border-b border-[var(--color-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Recent Activity</h3>
            </div>
            <button className="text-sm font-medium text-[var(--color-accent)] hover:underline cursor-pointer">
              View All
            </button>
          </div>
          <div className="divide-y divide-[var(--color-border-light)]">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-4 hover:bg-[var(--color-background-tertiary)] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === "course"
                      ? "bg-blue-500/10 text-blue-500"
                      : item.type === "user"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {item.type === "course" ? (
                    <BookOpen size={16} />
                  ) : item.type === "user" ? (
                    <Users size={16} />
                  ) : (
                    <DollarSign size={16} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--color-text-primary)] text-sm">
                    {item.action}
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                    {item.detail}
                  </p>
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)]"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    to={action.path}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:shadow-[0_0_16px_rgba(232,133,106,0.1)] transition-all duration-200 group"
                  >
                    <Icon
                      size={20}
                      className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors"
                    />
                    <span className="text-xs font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)]"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={18} className="text-emerald-500" />
              <h3 className="font-bold text-lg">System Status</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  API Server
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Database
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  AI Service
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Degraded
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Storage
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  64% Used
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-light)]">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  Overall
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <CheckCircle size={14} />
                  All Systems
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
