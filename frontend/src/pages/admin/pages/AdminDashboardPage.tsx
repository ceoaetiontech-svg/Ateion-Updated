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
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { containerVariants, itemVariants } from "../utils/variants";
import StatCard from "../components/ui/StatCard";
import { RECENT_ACTIVITY } from "../mock/activity";
import { SPARKLINE_DATA, COURSES_BY_CATEGORY } from "../mock/chartData";

const statCards = [
  { label: "Total Courses", value: "24", icon: BookOpen, gradient: "from-blue-500/20 to-blue-600/10", iconBg: "bg-blue-500/10 text-blue-600", border: "border-blue-500/20" },
  { label: "Active Students", value: "1,402", icon: Users, gradient: "from-emerald-500/20 to-emerald-600/10", iconBg: "bg-emerald-500/10 text-emerald-600", border: "border-emerald-500/20" },
  { label: "Platform Revenue", value: "$12,450", icon: DollarSign, gradient: "from-amber-500/20 to-amber-600/10", iconBg: "bg-amber-500/10 text-amber-600", border: "border-amber-500/20" },
  { label: "Completion Rate", value: "87%", icon: TrendingUp, gradient: "from-purple-500/20 to-purple-600/10", iconBg: "bg-purple-500/10 text-purple-600", border: "border-purple-500/20" },
];

const quickActions = [
  { label: "Upload Course", icon: Upload, path: "/admin/upload" },
  { label: "Manage Users", icon: Users, path: "/admin/users" },
  { label: "View Analytics", icon: TrendingUp, path: "/admin/dashboard" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Ateion Admin — Dashboard</title>
        <meta name="description" content="Ateion admin portal for managing courses, users, and platform settings." />
      </Helmet>
      <motion.div
        className="pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            Welcome to the Admin Portal
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl">
            This is a fully functional frontend dashboard simulation. Select
            "Upload Course" to try the new course builder.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          variants={containerVariants}
        >
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} sparklineData={SPARKLINE_DATA[card.label]} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="lg:col-span-2 clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-5 border-b border-[var(--color-border-light)] flex items-center gap-3">
              <BarChart3 size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Courses by Category</h3>
            </div>
            <div className="p-5">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={COURSES_BY_CATEGORY} barCategoryGap="20%">
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-text-tertiary)", fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-background-secondary)",
                      border: "1px solid var(--color-border-light)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                    cursor={{ fill: "var(--color-background-tertiary)" }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    fill="var(--color-accent)"
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="space-y-6">
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
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-accent)] transition-all duration-200 group"
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

            <motion.div
              className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)]"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={18} className="text-emerald-500" />
                <h3 className="font-bold text-lg">System Status</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "API Server", status: "Operational", color: "text-emerald-500" },
                  { label: "Database", status: "Connected", color: "text-emerald-500" },
                  { label: "AI Service", status: "Degraded", color: "text-amber-500" },
                  { label: "Storage", status: "64% Used", color: "text-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${item.color}`}>
                      <span className={`w-2 h-2 rounded-full ${item.color.replace("text-", "bg-")}`} />
                      {item.status}
                    </span>
                  </div>
                ))}
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

        <motion.div
          className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
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
            {RECENT_ACTIVITY.map((item, i) => (
              <motion.div
                key={item.id}
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
      </motion.div>
    </>
  );
}
