import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
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
  LayoutDashboard,
  Flame,
  CheckCircle,
  ChevronRight,
  Trophy,
  FileText,
  Gamepad2,
  Settings,
  Lock,
  AlertCircle,
  Palette,
  Home,
} from "lucide-react";

import { useTheme } from "../../app/components/ThemeProvider";
import SharedNavbar from "../../app/components/SharedNavbar";
import NavbarSpacer from "../../app/components/NavbarSpacer";

// Animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ActivityDay {
  date: string;
  level: number;
}

interface AchievementItem {
  label: string;
  desc: string;
  icon: string;
  color: string;
  unlocked: boolean;
  requirement?: string;
}

const bannerPresets = {
  sunset: "linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)",
  cyberpunk: "linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)",
  mint: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  nebula: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
};

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Banner theme dropdown settings
  const [bannerTheme, setBannerTheme] = useState<"sunset" | "cyberpunk" | "mint" | "nebula">(() => {
    try {
      const saved = localStorage.getItem("ateion_profile_banner");
      if (saved === "sunset" || saved === "cyberpunk" || saved === "mint" || saved === "nebula") {
        return saved;
      }
    } catch {}
    return "sunset";
  });
  const [showBannerMenu, setShowBannerMenu] = useState(false);

  // Avatar picture state
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  // User Profile state synced with localStorage
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("ateion_user");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      bio: "Learning math and computer science basics.",
      careerPath: "Student Learner",
    };
  });

  // Local inputs states
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [careerPath, setCareerPath] = useState(profile.careerPath);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Validation States
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [bioError, setBioError] = useState("");

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(val)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateName = (val: string) => {
    if (!val.trim()) {
      setNameError("Name is required");
      return false;
    } else if (val.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateBio = (val: string) => {
    if (val && val.length > 120) {
      setBioError("Bio must be under 120 characters");
      return false;
    }
    setBioError("");
    return true;
  };

  // Run validators when inputs change
  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    validateName(fullName);
  }, [fullName]);

  useEffect(() => {
    validateBio(bio);
  }, [bio]);

  // Sync profile pic from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("profile-pic");
    if (saved) setProfilePic(saved);
  }, []);

  // Sync state if localStorage changes externally
  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setBio(profile.bio);
    setCareerPath(profile.careerPath);
  }, [profile]);

  // Handle cover banner change
  const handleBannerChange = (themeName: "sunset" | "cyberpunk" | "mint" | "nebula") => {
    setBannerTheme(themeName);
    try {
      localStorage.setItem("ateion_profile_banner", themeName);
    } catch {}
  };

  // Handle avatar image file input change
  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfilePic(dataUrl);
      localStorage.setItem("profile-pic", dataUrl);
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  // Save changes to localStorage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || nameError || bioError) return;

    const updated = {
      fullName,
      email,
      bio,
      careerPath,
    };
    setProfile(updated);
    localStorage.setItem("ateion_user", JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  // Get Initials for Avatar Fallback
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : "JD";
  };

  // Live progress metrics
  const [streak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("ateion_streak");
      if (saved) {
        const { count } = JSON.parse(saved);
        return Number(count) || 0;
      }
    } catch {}
    return 3;
  });

  const [xp] = useState<number>(() => {
    try {
      return Number(localStorage.getItem("ateion_xp")) || 2840;
    } catch {
      return 2840;
    }
  });

  const [enrolledCount] = useState<number>(() => {
    try {
      return JSON.parse(localStorage.getItem("ateion_enrolled") || "[]").length || 3;
    } catch {
      return 3;
    }
  });

  const [completedLessons] = useState<number>(() => {
    let count = 0;
    try {
      const enrolledIds = JSON.parse(localStorage.getItem("ateion_enrolled") || "[]");
      if (enrolledIds.length > 0) {
        enrolledIds.forEach((id: number) => {
          const saved = localStorage.getItem(`ateion_progress_${id}`);
          if (saved) count += JSON.parse(saved).length;
        });
      } else {
        count = 12;
      }
    } catch {
      count = 12;
    }
    return count;
  });

  // Generate 84 days of learning activity details (12 weeks)
  const [activityData] = useState<ActivityDay[]>(() => {
    const data: ActivityDay[] = [];
    const today = new Date();
    const seed = xp + streak;
    for (let i = 83; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dayOfWeek = date.getDay();
      let level = 0;
      const factor = Math.sin(i * 0.15) + Math.cos(dayOfWeek * 0.5) + (seed % 10) / 10;
      if (factor > 0.6) {
        level = 4;
      } else if (factor > 0.1) {
        level = 3;
      } else if (factor > -0.3) {
        level = 2;
      } else if (factor > -0.7) {
        level = 1;
      }
      
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        level,
      });
    }
    return data;
  });

  // State to track hovered heatmap cell
  const [hoveredCell, setHoveredCell] = useState<ActivityDay | null>(null);

  const sidebarLinks = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { label: "My Courses", icon: BookOpen, path: "/playground/mycourses" },
    { label: "Olympiad", icon: Award, path: "/gco" },
    { label: "Playground", icon: Gamepad2, path: "/PlayGround" },
    { label: "Certificates", icon: FileText, path: "/certificate" },
    { label: "Profile", icon: User, path: "/profile", active: true },
  ];

  const achievements: AchievementItem[] = [
    { label: "Active Learner", desc: "Commit lessons consecutively", icon: "📚", color: "#E8856A", unlocked: true },
    { label: "Assessment Explorer", desc: "Acquire core capability scores", icon: "🎯", color: "#6B8EE8", unlocked: true },
    { label: "First Certificate", desc: "Unlock verified credential", icon: "🏆", color: "#27AE60", unlocked: true },
    { label: "Premium Member", desc: "Access high-end study materials", icon: "⭐", color: "#F2C94C", unlocked: true },
    { label: "Olympiad Champion", desc: "Rank top 1% in GCO Olympiad", icon: "🥇", color: "#9B51E0", unlocked: false, requirement: "Score 95%+ in GCO Test" },
    { label: "DSA Wizard", desc: "Solve 20 algorithms correctly", icon: "🧙‍♂️", color: "#3B82F6", unlocked: false, requirement: "Complete DSA Curriculum" },
    { label: "Certified Scholar", desc: "Obtain 3 verified credentials", icon: "📜", color: "#EC4899", unlocked: false, requirement: "Earn 3 verified certificates" },
  ];

  const isFormInvalid = Boolean(emailError || nameError || bioError);

  return (
    <>
      <Helmet>
        <title>Profile | Ateion</title>
        <meta name="description" content="Manage your Ateion profile, track learning progress, and explore achievements." />
      </Helmet>

      {/* Mobile Top Navbar Spacer */}
      <div className="md:hidden">
        <SharedNavbar />
        <NavbarSpacer />
      </div>

      <div
        className="flex flex-col md:flex-row min-h-screen bg-[var(--color-background-primary)] text-[var(--color-text-primary)] relative pb-20 md:pb-0"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col border-r border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50 backdrop-blur-md p-6 sticky top-0 h-screen z-20">
          {/* Student profile snippet */}
          <div className="flex items-center gap-3 pb-5 border-b border-[var(--color-border-light)] mb-5">
            <div className="w-10.5 h-10.5 rounded-full bg-[var(--color-accent_light)] text-[var(--color-accent)] flex items-center justify-center font-bold text-base overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                getInitials(profile.fullName)
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none">{profile.fullName}</span>
              <span className="text-xs text-[var(--color-text-tertiary)] mt-1.5 font-semibold">{profile.careerPath || "Student Learner"}</span>
            </div>
          </div>

          {/* Quick learning status block */}
          <div className="grid grid-cols-3 gap-1.5 pb-5 border-b border-[var(--color-border-light)] mb-5">
            {[
              { value: enrolledCount > 0 ? String(enrolledCount) : "3", label: "Active" },
              { value: "87", label: "Score" },
              { value: "4", label: "Badges" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-2 rounded-xl bg-[var(--color-nav-button)]/40 border border-slate-200/20">
                <span className="font-bold text-base leading-none">{s.value}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-tertiary)] mt-1">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Sidebar Menu */}
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200 text-left w-full group ${
                    link.active
                      ? "bg-[var(--color-accent_light)] text-[var(--color-accent)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-nav-button-hover)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <Icon size={16} className={`transition-transform duration-200 group-hover:scale-110 ${link.active ? "text-[var(--color-accent)]" : ""}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Capability score card footer */}
          <div className="pt-4 border-t border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent_light)] to-coral-50/10 border border-[var(--color-accent)]/20 text-sm text-[var(--color-text-secondary)]">
              <Zap size={15} className="text-[var(--color-accent)] animate-pulse" />
              <span className="font-bold">Total Capability</span>
              <strong className="ml-auto text-base font-extrabold text-[var(--color-accent)]">87</strong>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT CONTAINER ─── */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-8 lg:p-10 max-w-[1240px] mx-auto w-full">
          
          {/* HERO BANNER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="clay-card rounded-3xl overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50 backdrop-blur-md mb-8 relative"
          >
            {/* cover gradient banner preset */}
            <div
              className="h-32 sm:h-44 relative transition-all duration-500"
              style={{ background: bannerPresets[bannerTheme] }}
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                
                {/* Banner Customization Dropdown Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowBannerMenu(!showBannerMenu)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-black/20 text-slate-800 dark:text-slate-100 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm"
                    title="Change Cover Banner Theme"
                  >
                    <Palette size={18} className="animate-pulse" />
                  </button>
                  
                  <AnimatePresence>
                    {showBannerMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] p-3 shadow-xl z-30 flex flex-col gap-2"
                      >
                        <span className="text-[10px] font-bold uppercase text-[var(--color-text-tertiary)] tracking-wider px-2">Cover Theme</span>
                        {(Object.keys(bannerPresets) as Array<keyof typeof bannerPresets>).map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              handleBannerChange(t);
                              setShowBannerMenu(false);
                            }}
                            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-left transition-colors border-none ${
                              bannerTheme === t
                                ? "bg-[var(--color-accent_light)] text-[var(--color-accent)]"
                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-nav-button-hover)]"
                            }`}
                          >
                            <div
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm shrink-0"
                              style={{ background: bannerPresets[t] }}
                            />
                            <span className="capitalize">{t} Preset</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Switcher Button */}
                <button
                  onClick={toggleTheme}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-black/20 text-slate-800 dark:text-slate-100 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm border-none"
                  title="Toggle Light/Dark Theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-xs hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-sm border-none"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Profile Avatar & Details Overlay */}
            <div className="px-6 pb-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-10 sm:-mt-14 text-center sm:text-left">
                
                {/* Editable Avatar */}
                <div className="relative group shrink-0">
                  <div className="rounded-full p-1 bg-[var(--color-background-primary)] shadow-lg">
                    <div className="rounded-full p-0.5 bg-gradient-to-tr from-[var(--color-accent)] to-slate-200/40">
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[var(--color-background-primary)] bg-[var(--color-background-secondary)]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-1 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 cursor-pointer border-none"
                  >
                    <Camera size={20} className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePicChange}
                  />
                </div>

                {/* Info titles */}
                <div className="flex-1 pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 
                      className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)] m-0"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {profile.fullName}
                    </h2>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent_light)] text-[var(--color-accent)] font-semibold text-xs self-center sm:self-auto">
                      <Crown size={12} className="animate-pulse" />
                      <span>Premium Learner</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                    <Mail size={13} className="text-[var(--color-accent)]" />
                    <span>{profile.email}</span>
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-3 justify-center sm:justify-start">
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-200/50 dark:bg-slate-800 text-[var(--color-text-secondary)]">
                      <Calendar size={11} />
                      Member since June 2026
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                      <Zap size={11} />
                      {profile.careerPath || "Student Learner"}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* TWO-COLUMN BENTO GRID */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            
            {/* ─── LEFT COLUMN (8 Cols) ─── */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Account Settings Form Card */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 
                      className="text-lg font-bold m-0 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Settings size={16} className="text-[var(--color-accent)]" />
                      Account Settings
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Configure your personal learning profile details</p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={15} />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white/20 dark:bg-black/10 text-sm focus:outline-none focus:border-[var(--color-accent)] font-semibold transition-colors text-[var(--color-text-primary)] ${
                            nameError ? "border-red-500/50" : "border-[var(--color-border-light)]"
                          }`}
                        />
                        {fullName.trim().length >= 2 ? (
                          <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" size={15} />
                        ) : (
                          fullName.trim().length > 0 && <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500" size={15} />
                        )}
                      </div>
                      {nameError && <span className="text-[10px] text-red-500 font-bold">{nameError}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={15} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white/20 dark:bg-black/10 text-sm focus:outline-none focus:border-[var(--color-accent)] font-semibold transition-colors text-[var(--color-text-primary)] ${
                            emailError ? "border-red-500/50" : "border-[var(--color-border-light)]"
                          }`}
                        />
                        {!emailError && email.length > 0 ? (
                          <CheckCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" size={15} />
                        ) : (
                          email.length > 0 && <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500" size={15} />
                        )}
                      </div>
                      {emailError && <span className="text-[10px] text-red-500 font-bold">{emailError}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Bio / Goal */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Bio / Goal</label>
                        <span className={`text-[9px] font-bold ${bio.length > 120 ? "text-red-500" : "text-[var(--color-text-tertiary)]"}`}>
                          {bio.length}/120
                        </span>
                      </div>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={15} />
                        <input
                          type="text"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white/20 dark:bg-black/10 text-sm focus:outline-none focus:border-[var(--color-accent)] font-semibold transition-colors text-[var(--color-text-primary)] ${
                            bioError ? "border-red-500/50" : "border-[var(--color-border-light)]"
                          }`}
                          placeholder="e.g. Learn data structures and math."
                        />
                      </div>
                      {bioError && <span className="text-[10px] text-red-500 font-bold">{bioError}</span>}
                    </div>

                    {/* Target Career Path */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Target Career Path</label>
                      <div className="relative">
                        <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={15} />
                        <input
                          type="text"
                          value={careerPath}
                          onChange={(e) => setCareerPath(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-white/20 dark:bg-black/10 text-sm focus:outline-none focus:border-[var(--color-accent)] font-semibold transition-colors text-[var(--color-text-primary)]"
                          placeholder="e.g. Software Engineer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3">
                    <button
                      type="submit"
                      disabled={isFormInvalid}
                      className={`px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-colors shadow-md flex items-center gap-2 border-none ${
                        isFormInvalid
                          ? "bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-50"
                          : "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] cursor-pointer"
                      }`}
                    >
                      <ClipboardCheck size={16} />
                      <span>Save Changes</span>
                    </button>

                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-bold"
                        >
                          <CheckCircle size={14} />
                          <span>Profile updated successfully!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </motion.div>

              {/* GitHub-Style Contribution Heatmap Card */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 
                      className="text-lg font-bold m-0 flex items-center gap-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <Calendar size={16} className="text-[var(--color-accent)]" />
                      Ateion Learning Activity
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Daily completed milestones and active practice logs</p>
                  </div>

                  {/* Intensity Legend */}
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-text-tertiary)] self-start sm:self-center">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-slate-200/20 dark:bg-white/5" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]/20" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]/40" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]/70" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[var(--color-accent)]" />
                    <span>More</span>
                  </div>
                </div>

                {/* Hover day description */}
                <div className="text-xs font-bold text-[var(--color-text-tertiary)] min-h-[18px] mb-3 flex items-center gap-1.5 select-none">
                  <Sparkles size={11} className="text-[var(--color-accent)]" />
                  {hoveredCell ? (
                    <span className="text-[var(--color-text-secondary)]">{hoveredCell.date} • Learning Intensity: <strong className="text-[var(--color-accent)]">{["None", "Low", "Moderate", "High", "Exceptional"][hoveredCell.level]}</strong></span>
                  ) : (
                    <span>Hover over cells to examine daily progress metrics</span>
                  )}
                </div>

                {/* Monthly indicators above grid */}
                <div className="flex gap-[33px] text-[10px] font-bold text-[var(--color-text-tertiary)] mb-1.5 pl-6 select-none uppercase tracking-wider">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>

                {/* Weekday labels + Heatmap Grid */}
                <div className="flex gap-2 w-full overflow-x-auto pb-2">
                  {/* Weekday labels aligned to the 7 rows */}
                  <div className="grid grid-rows-7 text-[10px] font-bold text-[var(--color-text-tertiary)] pr-1 select-none h-[102px] items-center justify-items-end leading-none">
                    <div className="h-3 flex items-center"></div>
                    <div className="h-3 flex items-center">Mon</div>
                    <div className="h-3 flex items-center"></div>
                    <div className="h-3 flex items-center">Wed</div>
                    <div className="h-3 flex items-center"></div>
                    <div className="h-3 flex items-center">Fri</div>
                    <div className="h-3 flex items-center"></div>
                  </div>

                  {/* Heatmap Grid Wrapper (12 columns, 7 rows for days) */}
                  <div className="grid grid-flow-col grid-rows-7 gap-[3px] auto-cols-max">
                    {activityData.map((day, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredCell(day)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-3 h-3 rounded-sm transition-all duration-150 cursor-pointer ${
                          day.level === 0
                            ? "bg-slate-200/20 dark:bg-white/5 hover:bg-slate-200/40 dark:hover:bg-white/10"
                            : day.level === 1
                            ? "bg-[var(--color-accent)]/20 hover:scale-115"
                            : day.level === 2
                            ? "bg-[var(--color-accent)]/40 hover:scale-115"
                            : day.level === 3
                            ? "bg-[var(--color-accent)]/70 hover:scale-115"
                            : "bg-[var(--color-accent)] hover:scale-115 hover:shadow-[0_0_8px_var(--color-accent)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ─── RIGHT COLUMN (4 Cols) ─── */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Learning stats summary card */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-4"
              >
                <h3 
                  className="text-base sm:text-lg font-bold m-0 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <TrendingUp size={16} className="text-[var(--color-accent)]" />
                  Overall Metrics
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Day Streak", value: String(streak), sub: "Days active", icon: Flame, color: "#E8856A" },
                    { label: "Olympiad XP", value: String(xp), sub: "Total points", icon: Zap, color: "#F2C94C" },
                    { label: "Active Courses", value: String(enrolledCount), sub: "Enrolled", icon: BookOpen, color: "#6B8EE8" },
                    { label: "Completed", value: String(completedLessons), sub: "Lessons", icon: CheckCircle, color: "#27AE60" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="p-3.5 rounded-2xl border border-slate-200/20 bg-white/20 dark:bg-black/10 flex flex-col gap-1.5"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                            color: s.color,
                          }}
                        >
                          <Icon size={14} />
                        </div>
                        <div className="flex flex-col leading-none mt-1">
                          <span className="font-extrabold text-base text-[var(--color-text-primary)]">{s.value}</span>
                          <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold mt-1 uppercase tracking-wider">{s.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar widget */}
                <div className="border-t border-slate-100 dark:border-white/5 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-secondary)]">
                    <span>Syllabus Completion</span>
                    <span className="text-[var(--color-accent)]">68%</span>
                  </div>
                  <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full bg-[var(--color-accent)]"
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Achievements & Badges List */}
              <motion.div
                variants={cardVariants}
                className="clay-card bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] dark:border-white/10 p-6 rounded-3xl flex flex-col gap-4"
              >
                <div>
                  <h3 
                    className="text-base sm:text-lg font-bold m-0 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <Trophy size={16} className="text-[var(--color-accent)]" />
                    Achievements
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] font-bold m-0 mt-1">Unlocked credentials and skill achievements</p>
                </div>

                {/* Unlocked Badges */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-green-500">Unlocked ({achievements.filter(a => a.unlocked).length})</span>
                  <div className="flex flex-col gap-2.5">
                    {achievements.filter((a) => a.unlocked).map((ach) => (
                      <div
                        key={ach.label}
                        className="group p-3 rounded-2xl border border-slate-200/20 bg-white/20 dark:bg-black/10 flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] cursor-default hover:border-[var(--color-accent)]/30 hover:shadow-[0_4px_20px_rgba(232,133,106,0.06)]"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: `color-mix(in srgb, ${ach.color} 15%, transparent)`,
                            color: ach.color,
                          }}
                        >
                          <span className="text-lg leading-none">{ach.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{ach.label}</span>
                          <span className="text-[10px] sm:text-xs text-[var(--color-text-tertiary)] mt-0.5 truncate font-semibold">{ach.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locked Badges */}
                <div className="flex flex-col gap-2.5 border-t border-slate-200/10 pt-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">Locked ({achievements.filter(a => !a.unlocked).length})</span>
                  <div className="flex flex-col gap-2.5">
                    {achievements.filter((a) => !a.unlocked).map((ach) => (
                      <div
                        key={ach.label}
                        className="group p-3 rounded-2xl border border-slate-200/20 bg-white/10 dark:bg-black/5 opacity-60 flex items-center gap-3 transition-all duration-300 hover:scale-[1.01] cursor-default hover:opacity-80"
                        title={`Requirement: ${ach.requirement}`}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-slate-300/10 text-slate-400"
                        >
                          <Lock size={15} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <span className="text-xs sm:text-sm font-bold text-[var(--color-text-secondary)]">{ach.label}</span>
                          <span className="text-[9px] sm:text-[10px] text-red-500/70 dark:text-red-400/70 mt-0.5 font-bold truncate">Req: {ach.requirement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Action buttons list */}
              <motion.div
                variants={cardVariants}
                className="flex flex-col gap-2.5"
              >
                {[
                  { label: "Continue Learning", path: "/dashboard", primary: true },
                  { label: "View Saved Certificates", path: "/certificate" },
                  { label: "Take Assessment Mock", path: "/assessment-demo" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => navigate(btn.path)}
                    className={`w-full py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 flex items-center justify-between px-4 group cursor-pointer border-none ${
                      btn.primary
                        ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(232,133,106,0.25)]"
                        : "bg-[var(--color-background-secondary)]/50 backdrop-blur-md border border-[var(--color-border-light)] text-[var(--color-text-primary)] hover:bg-[var(--color-nav-button-hover)]"
                    }`}
                  >
                    <span>{btn.label}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </motion.div>

            </div>

          </motion.div>
        </main>

        {/* ─── MOBILE BOTTOM NAV BAR ─── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-background-secondary)]/85 backdrop-blur-md border-t border-[var(--color-border-light)] flex items-center justify-around z-30 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
          {sidebarLinks.slice(0, 5).map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 border-none ${
                  link.active ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
                }`}
              >
                <Icon size={18} className={link.active ? "scale-110" : ""} />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{link.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
