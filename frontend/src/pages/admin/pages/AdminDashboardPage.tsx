import { useState, useEffect } from "react";
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
  RefreshCw,
  Loader2,
  Sparkles,
  FileVideo,
  PlusCircle
} from "lucide-react";
import { Link } from "react-router";
import { containerVariants, itemVariants } from "../utils/variants";
import StatCard from "../components/ui/StatCard";
import { useToast } from "../utils/toast";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid 
} from "recharts";

const studentGrowthData = [
  { month: "Jan", students: 200 },
  { month: "Feb", students: 450 },
  { month: "Mar", students: 720 },
  { month: "Apr", students: 950 },
  { month: "May", students: 1120 },
  { month: "Jun", students: 1240 },
];

const recentActivities = [
  { id: 1, description: "Audiobook published: ab-system-design", time: "5 minutes ago", type: "Publish", icon: Sparkles, iconBg: "bg-amber-500/10 text-amber-500", badgeBg: "bg-amber-500/15", badgeText: "text-amber-600 dark:text-amber-400" },
  { id: 2, description: "Ecosystem cache cleared by administrator", time: "1 hour ago", type: "System", icon: ShieldCheck, iconBg: "bg-blue-500/10 text-blue-500", badgeBg: "bg-blue-500/15", badgeText: "text-blue-600 dark:text-blue-400" },
  { id: 3, description: "New course uploaded: Mastering React Hooks", time: "3 hours ago", type: "Upload", icon: PlusCircle, iconBg: "bg-emerald-500/10 text-emerald-500", badgeBg: "bg-emerald-500/15", badgeText: "text-emerald-600 dark:text-emerald-400" },
  { id: 4, description: "Video chapter uploaded to course modules", time: "1 day ago", type: "Media", icon: FileVideo, iconBg: "bg-purple-500/10 text-purple-500", badgeBg: "bg-purple-500/15", badgeText: "text-purple-600 dark:text-purple-400" },
];

const quickActions = [
  { label: "Upload Course", icon: Upload, path: "/admin/upload" },
  { label: "Manage Users", icon: Users, path: "/admin/users" },
  { label: "View Analytics", icon: TrendingUp, path: "/admin/dashboard" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purging, setPurging] = useState(false);
  const { showToast } = useToast();

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE}/admin/courses`, { headers });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (e) {
      console.error("Failed to load courses for dashboard", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handlePurgeCache = () => {
    setPurging(true);
    setTimeout(() => {
      setPurging(false);
      showToast("Platform cache purged successfully!", "success");
    }, 1000);
  };

  // Compute category counts dynamically
  const categoryCounts = courses.reduce((acc: any, c: any) => {
    const cat = c.category ? c.category.charAt(0).toUpperCase() + c.category.slice(1).toLowerCase() : "Technology";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryCounts).length > 0 
    ? Object.keys(categoryCounts).map(cat => ({
        name: cat,
        courses: categoryCounts[cat]
      }))
    : [
        { name: "Technology", courses: 4 },
        { name: "Philosophy", courses: 2 },
        { name: "Science", courses: 1 },
        { name: "Business", courses: 1 }
      ];

  const dynamicStatCards = [
    { 
      label: "Total Courses", 
      value: loading ? "..." : String(courses.length || 8), 
      icon: BookOpen, 
      gradient: "from-blue-500/20 to-blue-600/10", 
      iconBg: "bg-blue-500/10 text-blue-600", 
      border: "border-blue-500/20",
      sparklineData: [{ value: 2 }, { value: 3 }, { value: 5 }, { value: Math.max(courses.length || 8, 5) }]
    },
    { 
      label: "Active Students", 
      value: "1,240", 
      icon: Users, 
      gradient: "from-emerald-500/20 to-emerald-600/10", 
      iconBg: "bg-emerald-500/10 text-emerald-600", 
      border: "border-emerald-500/20",
      sparklineData: [{ value: 200 }, { value: 450 }, { value: 720 }, { value: 950 }, { value: 1240 }]
    },
    { 
      label: "Platform Revenue", 
      value: "₹48,250", 
      icon: DollarSign, 
      gradient: "from-amber-500/20 to-amber-600/10", 
      iconBg: "bg-amber-500/10 text-amber-600", 
      border: "border-amber-500/20",
      sparklineData: [{ value: 5000 }, { value: 12000 }, { value: 24000 }, { value: 35000 }, { value: 48250 }]
    },
    { 
      label: "Completion Rate", 
      value: "84%", 
      icon: TrendingUp, 
      gradient: "from-purple-500/20 to-purple-600/10", 
      iconBg: "bg-purple-500/10 text-purple-600", 
      border: "border-purple-500/20",
      sparklineData: [{ value: 75 }, { value: 78 }, { value: 80 }, { value: 82 }, { value: 84 }]
    },
  ];

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
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">
            Welcome to the Admin Portal
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
            This is a fully functional frontend dashboard simulation. Select
            "Upload Course" to try the new course builder.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          variants={containerVariants}
        >
          {dynamicStatCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="lg:col-span-1 clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden flex flex-col"
            variants={itemVariants}
          >
            <div className="p-5 border-b border-[var(--color-border-light)] flex items-center gap-3">
              <BarChart3 size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Courses by Category</h3>
            </div>
            <div className="p-6 flex-1 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="var(--color-text-tertiary)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--color-text-tertiary)" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--color-background-secondary)", 
                      borderColor: "var(--color-border-light)",
                      borderRadius: "12px",
                      color: "var(--color-text-primary)"
                    }}
                  />
                  <Bar dataKey="courses" fill="var(--color-accent)" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden flex flex-col"
            variants={itemVariants}
          >
            <div className="p-5 border-b border-[var(--color-border-light)] flex items-center gap-3">
              <TrendingUp size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-lg">Active Student Growth</h3>
            </div>
            <div className="p-6 flex-1 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentGrowthData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" opacity={0.3} />
                  <XAxis dataKey="month" stroke="var(--color-text-tertiary)" fontSize={11} tickLine={false} />
                  <YAxis stroke="var(--color-text-tertiary)" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--color-background-secondary)", 
                      borderColor: "var(--color-border-light)",
                      borderRadius: "12px",
                      color: "var(--color-text-primary)"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="var(--color-accent)" 
                    strokeWidth={2.5} 
                    dot={{ fill: "var(--color-accent)", strokeWidth: 2 }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <motion.div
              className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-5 border-b border-[var(--color-border-light)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity size={18} className="text-[var(--color-accent)]" />
                  <h3 className="font-bold text-lg">Recent Activity</h3>
                </div>
              </div>
              <div className="p-6 divide-y divide-[var(--color-border-light)]/40">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">{act.description}</p>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{act.time}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.75 rounded-md ${act.badgeBg} ${act.badgeText} shrink-0 uppercase tracking-wider`}>
                        {act.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

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
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/60 hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
                    >
                      <Icon
                        size={20}
                        className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
                      />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
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
              <div className="flex items-center gap-3 mb-4 justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <h3 className="font-bold text-lg">System Status</h3>
                </div>
                <button
                  onClick={handlePurgeCache}
                  disabled={purging}
                  className="px-2.5 py-1.5 rounded-lg bg-[var(--color-background-tertiary)] hover:bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-border-light)] text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                >
                  {purging ? <Loader2 size={10} className="animate-spin" /> : <RefreshCw size={10} />}
                  {purging ? "Purging..." : "Purge Cache"}
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: "API Server", status: "Operational", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                  { label: "Database", status: "Connected", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                  { label: "AI Service", status: "Degraded", textColor: "text-amber-600 dark:text-amber-400", dotBg: "bg-amber-500" },
                  { label: "Storage", status: "64% Used", textColor: "text-emerald-600 dark:text-emerald-400", dotBg: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                      {item.label}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${item.textColor}`}>
                      <span className={`w-2 h-2 rounded-full ${item.dotBg}`} />
                      {item.status}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    Overall
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
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
