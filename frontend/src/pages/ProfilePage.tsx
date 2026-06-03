import {
  User,
  Crown,
  BookOpen,
  Award,
  ClipboardCheck,
  Mail,
  LogOut,
  Camera,
  Target,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../app/components/ThemeProvider";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.45, 0.32, 0.9] } },
};

const navLinks = [
  { label: "Profile", icon: User, path: "/profile", current: true },
  { label: "Certificates", icon: Award, path: "/certificate" },
  { label: "Dashboard", icon: TrendingUp, path: "/dashboard" },
];

const stats = [
  { value: "8", label: "Courses", icon: BookOpen },
  { value: "5", label: "Completed", icon: ClipboardCheck },
  { value: "3", label: "Certificates", icon: Award },
  { value: "12", label: "Assessments", icon: Target },
];

const achievements = [
  { label: "Active Learner", icon: "📚" },
  { label: "Assessment Explorer", icon: "🎯" },
  { label: "First Certificate", icon: "🏆" },
  { label: "Premium Member", icon: "⭐" },
];

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  useEffect(() => {
    const saved = localStorage.getItem("profile-pic");
    if (saved) setProfilePic(saved);
  }, []);

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfilePic(dataUrl);
      localStorage.setItem("profile-pic", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-background-primary)" }}>
      {/* ─── TOP NAV BAR ─── */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 h-16 border-b backdrop-blur-xl"
        style={{ backgroundColor: "var(--color-background-secondary)", borderColor: "var(--color-border-light)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-accent)" }}>
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold font-['OV_Soge'] text-base" style={{ color: "var(--color-text-primary)" }}>Ateion</span>
            <span className="text-xs ml-2 font-medium" style={{ color: "var(--color-text-tertiary)" }}>Profile</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: link.current ? "rgba(232,133,106,0.1)" : "transparent",
                  color: link.current ? "var(--color-accent)" : "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) => {
                  if (!link.current) {
                    e.currentTarget.style.backgroundColor = "rgba(232,133,106,0.06)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!link.current) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }
                }}
              >
                <Icon size={16} />
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{
              backgroundColor: "rgba(232,133,106,0.08)",
              border: "1px solid rgba(232,133,106,0.15)",
              color: "var(--color-accent)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "rgba(232,133,106,0.1)", color: "var(--color-accent)" }}
          >
            <Crown size={12} />
            Premium
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ color: "var(--color-error)" }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-error_light)"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cover */}
        <div
          className="h-48 lg:h-56 relative"
          style={{
            background: "linear-gradient(135deg, rgba(232,133,106,0.25) 0%, rgba(26,24,51,0.05) 50%, rgba(200,197,220,0.1) 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 50%, var(--color-accent) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(200,197,220,0.5) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Avatar + Info Overlay */}
        <div className="px-6 lg:px-10 -mt-16 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6">
            <motion.div
              className="relative group shrink-0"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="rounded-full p-1.5 bg-[var(--color-background-primary)] shadow-lg">
                <div
                  className="rounded-full p-0.5"
                  style={{ background: "linear-gradient(135deg, var(--color-accent), rgba(232,133,106,0.2))" }}
                >
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[var(--color-background-primary)]"
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-all duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePicChange} />
            </motion.div>

            <div className="text-center sm:text-left pb-2">
              <h1 className="text-3xl sm:text-4xl font-bold font-['OV_Soge']" style={{ color: "var(--color-text-primary)" }}>
                Test User
              </h1>
              <p className="mt-1 font-medium flex items-center gap-2 justify-center sm:justify-start" style={{ color: "var(--color-text-tertiary)" }}>
                <Mail size={14} />
                testuser@gmail.com
              </p>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(232,133,106,0.1)", color: "var(--color-accent)" }}>
                  <Calendar size={12} />
                  Member since June 2026
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "rgb(34,197,94)" }}>
                  <Zap size={12} />
                  Active Learner
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* ─── LEFT COLUMN ─── */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              className="rounded-2xl p-6 clay-card"
              style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)" }}
              variants={item}
            >
              <h3 className="text-sm font-bold font-['OV_Soge'] mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Zap size={14} style={{ color: "var(--color-accent)" }} />
                Quick Stats
              </h3>
              <div className="space-y-3">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                      style={{ backgroundColor: "rgba(232,133,106,0.04)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "rgba(232,133,106,0.1)" }}
                      >
                        <Icon size={16} style={{ color: "var(--color-accent)" }} />
                      </div>
                      <div>
                        <p className="text-lg font-bold font-['OV_Soge']" style={{ color: "var(--color-accent)" }}>{s.value}</p>
                        <p className="text-xs font-medium" style={{ color: "var(--color-text-tertiary)" }}>{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              className="rounded-2xl p-6 clay-card"
              style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)" }}
              variants={item}
            >
              <h3 className="text-sm font-bold font-['OV_Soge'] mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Sparkles size={14} style={{ color: "var(--color-accent)" }} />
                Achievements
              </h3>
              <div className="flex flex-wrap gap-2">
                {achievements.map((ach, i) => (
                  <span
                    key={ach.label}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-default"
                    style={{
                      backgroundColor: i % 2 === 0 ? "rgba(232,133,106,0.08)" : "rgba(200,197,220,0.1)",
                      color: i % 2 === 0 ? "var(--color-accent)" : "var(--color-text-primary)",
                      border: `1px solid ${i % 2 === 0 ? "rgba(232,133,106,0.15)" : "var(--color-border-light)"}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {ach.icon} {ach.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN (spans 2) ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <motion.div
              className="rounded-2xl p-6 lg:p-8 clay-card"
              style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)" }}
              variants={item}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-['OV_Soge']" style={{ color: "var(--color-text-primary)" }}>
                  Learning Progress
                </h2>
                <span className="text-2xl font-black font-['OV_Soge']" style={{ color: "var(--color-accent)" }}>68%</span>
              </div>

              <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border-light)" }}>
                <motion.div
                  className="h-full rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1.4, delay: 0.2, ease: [0.21, 0.45, 0.32, 0.9] }}
                  style={{ background: "linear-gradient(90deg, var(--color-accent), rgba(232,133,106,0.35))" }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/15 animate-pulse" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {[{ l: "Courses", v: "8/12" }, { l: "Hours Spent", v: "47h" }, { l: "Avg Score", v: "82%" }, { l: "Streak", v: "5 days" }].map((d) => (
                  <div
                    key={d.l}
                    className="text-center p-4 rounded-xl"
                    style={{ backgroundColor: "var(--color-background-primary)" }}
                  >
                    <p className="text-lg font-bold font-['OV_Soge']" style={{ color: "var(--color-text-primary)" }}>{d.v}</p>
                    <p className="text-xs font-medium mt-1" style={{ color: "var(--color-text-tertiary)" }}>{d.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Info & Actions */}
            <motion.div
              className="rounded-2xl p-6 lg:p-8 clay-card"
              style={{ backgroundColor: "var(--color-background-secondary)", border: "1px solid var(--color-border-light)" }}
              variants={item}
            >
              <h2 className="text-xl font-bold font-['OV_Soge'] mb-6" style={{ color: "var(--color-text-primary)" }}>
                Account & Actions
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Full Name", value: "Test User" },
                  { label: "Email", value: "testuser@gmail.com" },
                  { label: "Member Since", value: "June 2026" },
                  { label: "Account Type", value: "Premium Student" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "var(--color-background-primary)" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>
                      {d.label}
                    </p>
                    <p className="text-base font-bold mt-1" style={{ color: "var(--color-text-primary)" }}>
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Continue Learning", path: "/dashboard", primary: true },
                  { label: "View Certificates", path: "/certificate" },
                  { label: "Take Assessment", path: "/assessment-demo" },
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(btn.path)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2"
                    style={
                      btn.primary
                        ? { backgroundColor: "var(--color-accent)", color: "#fff", boxShadow: "0 4px 16px rgba(232,133,106,0.25)" }
                        : { backgroundColor: "var(--color-background-primary)", color: "var(--color-text-primary)", border: "1px solid var(--color-border-medium)" }
                    }
                  >
                    {btn.label}
                    {btn.primary && <ArrowRight size={14} />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
