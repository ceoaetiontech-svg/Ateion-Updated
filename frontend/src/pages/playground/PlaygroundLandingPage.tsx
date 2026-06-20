import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  School,
  TrendingUp,
  Bot,
  Heart,
  Brain,
  BarChart3,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Clipboard,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Compass,
} from "lucide-react";
import logo from "../../assets/logo.webp";
import playgroundHero from "../../assets/hero/playground_hero.png";
import playgroundBg from "../../assets/hero/playground_bg.png";
import studentsGrowImg from "../../assets/hero/students_grow_illustration.png";
import { useTheme } from "../../app/components/ThemeProvider";
function StatCounter({ value, duration = 1500 }: { value: string; duration?: number }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * numericValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [visible, numericValue, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function PlaygroundLandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const floatAnim1 = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };
  const floatAnim2 = {
    animate: {
      y: [0, 12, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
  };
  const floatAnim3 = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };
  const floatAnim4 = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5,
      },
    },
  };
  return (
    <div
      className="min-h-screen font-manrope overflow-x-hidden relative"
      style={{
        backgroundColor: "var(--color-background-primary)",
        backgroundImage: isDark
          ? "radial-gradient(circle at 50% 30%, rgba(112, 94, 242, 0.08) 0%, transparent 60%)"
          : `linear-gradient(rgba(248, 248, 244, 0.65), rgba(248, 248, 244, 0.65)), url(${playgroundBg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "var(--color-text-primary)",
      }}
    >
      {/* 1. Floating Header / Navbar */}
      <div className="sticky top-0 z-50 px-6 py-4 md:px-12 flex justify-center w-full">
        <header
          className="w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full border border-[var(--color-border-light)] shadow-sm backdrop-blur-xl transition-all duration-300"
          style={{
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.75)",
          }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Ateion Logo"
              className={`h-8 md:h-10 w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
            />
          </div>
          <nav className="hidden md:flex items-center gap-2 xl:gap-3">
            {["Home", "About Us"].map((label, i) => {
              const href = i === 0 ? "/" : "/contact";
              return (
                <a
                  key={label}
                  href={href}
                  className="clay-button rounded-full h-[36px] flex items-center justify-center px-4 xl:px-5 font-bold text-[13px] whitespace-nowrap cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-background-secondary)",
                    border: "1px solid var(--color-border-medium)",
                    color: "var(--color-text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border-medium)";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                >
                  {label}
                </a>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-2 xl:gap-3">
            <button
              onClick={toggleTheme}
              className="clay-button rounded-full w-[36px] h-[36px] flex items-center justify-center cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: "var(--color-background-secondary)",
                border: "1px solid var(--color-border-medium)",
                color: "var(--color-text-primary)",
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate("/playground/dashboard")}
              className="clay-button rounded-full h-[36px] flex items-center justify-center px-5 xl:px-7 font-bold text-[13px] whitespace-nowrap cursor-pointer transition-all duration-200 text-white"
              style={{
                backgroundColor: "var(--color-accent)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }}
            >
              PlayGround
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors cursor-pointer"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="absolute top-[88px] left-6 right-6 z-45 md:hidden flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg px-6 py-6 flex flex-col gap-4 text-left rounded-3xl border border-[var(--color-border-light)] shadow-lg backdrop-blur-xl"
              style={{
                backgroundColor: "var(--color-background-secondary)",
              }}
            >
              {["Home", "About Us"].map((label, i) => {
                const href = i === 0 ? "/" : "/contact";
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="clay-button rounded-full h-10 flex items-center justify-center px-4 font-bold text-sm w-full cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: "var(--color-background-primary)",
                      border: "1px solid var(--color-border-medium)",
                      color: "var(--color-text-primary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-accent)";
                      e.currentTarget.style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-border-medium)";
                      e.currentTarget.style.color = "var(--color-text-primary)";
                    }}
                  >
                    {label}
                  </a>
                );
              })}
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleTheme();
                  }}
                  className="clay-button rounded-full h-10 w-12 flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: "var(--color-background-primary)",
                    border: "1px solid var(--color-border-medium)",
                    color: "var(--color-text-primary)",
                  }}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/playground/dashboard");
                  }}
                  className="clay-button rounded-full h-10 flex-1 flex items-center justify-center px-4 font-bold text-sm cursor-pointer transition-all duration-200 text-white"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  }}
                >
                  PlayGround
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <section className="relative px-6 py-8 md:px-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] md:leading-[1.1]"
              style={{ color: "var(--color-text-primary)" }}
            >
              Everything You Need To Grow  <br />
              <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">
                One Platform
              </span>
            </h1>

            <p
              className="mt-4 text-base sm:text-lg md:text-xl font-bold tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
            
            </p>
            <p
              className="mt-4 text-sm sm:text-base leading-relaxed max-w-xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Skills, mindset, habits, wellness, productivity and more - all in one place. For students, parents, teachers and institutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/playground/dashboard")}
                data-tour="explore-playground-cta"
                className="w-full sm:w-auto justify-center text-white font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                style={{
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 4px 14px rgba(232,133,106,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
              >
                Explore Playground <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto justify-center font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                style={{
                  backgroundColor: isDark ? "#1E293B" : "#0d0c22",
                  color: "#fff",
                  boxShadow: isDark ? "0 4px 14px rgba(0,0,0,0.3)" : "0 4px 14px rgba(13,12,34,0.1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#334155" : "#1f1e3c")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#1E293B" : "#0d0c22")}
              >
                For Institutions <ArrowRight size={18} />
              </button>
            </div>
            <div
              className="mt-12 md:mt-16 grid grid-cols-2 gap-4 md:gap-5 pt-8 w-full"
              style={{ borderTop: "1px solid var(--color-border-light)" }}
            >
              {[
                { icon: GraduationCap, value: "200+", label: "Skills & Courses", color: "#705ef2" },
                { icon: Users, value: "50K+", label: "Students", color: "var(--color-accent)" },
                { icon: School, value: "250+", label: "Institutions", color: "#705ef2" },
                { icon: TrendingUp, value: "98%", label: "Satisfaction Rate", color: "var(--color-accent)" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start p-5 sm:p-6 rounded-[24px] border border-[var(--color-border-light)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group cursor-default"
                  style={{
                    backgroundColor: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.55)",
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${stat.color}15`, 
                      color: stat.color,
                      border: `1px solid ${stat.color}25`
                    }}
                  >
                    <stat.icon size={20} className="stroke-[2.5]" />
                  </div>
                  <span
                    className="text-3xl md:text-4xl font-black tracking-tight leading-none"
                    style={{ 
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-display)"
                    }}
                  >
                    <StatCounter value={stat.value} />
                  </span>
                  <span 
                    className="text-[10px] sm:text-xs font-bold mt-2.5 uppercase tracking-wider text-left" 
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="hidden lg:col-span-7 relative lg:flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-full h-[600px] flex items-center justify-center p-0 lg:translate-x-12"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl -z-10"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(112,94,242,0.35) 0%, transparent 70%)"
                  : "linear-gradient(135deg, rgba(240,242,254,0.75) 0%, rgba(253,240,237,0.8) 100%)",
              }}
            />
            <svg
              className="absolute w-[110%] h-[110%] -z-10"
              style={{ color: isDark ? "rgba(232,133,106,0.45)" : "rgba(244,114,101,0.35)" }}
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50,250 C50,100 200,50 350,120 C450,180 470,300 400,380 C320,470 120,450 70,350"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray="6 6"
              />
            </svg>
            <div
              className="w-full h-full relative"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <img
                src={playgroundHero}
                alt="Student studying on laptop with headphones"
                className="w-full h-full object-contain"
              />
            </div>
            {[
              { anim: floatAnim1, icon: Bot, bg: "#f0f2fe", color: "#705ef2", title: "AI Tutor", desc: "Always here to help", pos: "absolute -top-4 -left-12" },
              { anim: floatAnim2, icon: Heart, bg: "#fdf0ed", color: "#f47265", title: "Mental Wellness", desc: "Your well-being matters", pos: "absolute bottom-16 -left-14" },
              { anim: floatAnim3, icon: Brain, bg: "#fdf0ed", color: "#f47265", title: "Growth Mindset", desc: "Build confidence and resilience", pos: "absolute top-12 -right-12" },
              { anim: floatAnim4, icon: BarChart3, bg: "#f0f2fe", color: "#705ef2", title: "Track Progress", desc: "Measure. Improve. Succeed.", pos: "absolute bottom-28 -right-14" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                variants={badge.anim}
                animate="animate"
                className={`${badge.pos} backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] z-10`}
                style={{
                  backgroundColor: isDark ? "rgba(30,41,59,0.92)" : "rgba(255,255,255,0.9)",
                  border: "1px solid var(--color-border-light)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: badge.bg, color: badge.color }}
                >
                  <badge.icon size={22} className="stroke-[2]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-extrabold" style={{ color: "var(--color-text-primary)" }}>
                    {badge.title}
                  </h4>
                  <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="features" className="px-6 py-12 md:px-12 max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div
          className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-[28px] border border-[var(--color-border-light)] shadow-[var(--shadow-card)] backdrop-blur-xl max-w-5xl w-full text-left relative overflow-hidden group hover:shadow-[var(--shadow-lg)] transition-all duration-300 mb-20"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 248, 244, 0.9) 100%)",
          }}
        >
          <div
            className="absolute top-12 left-12 w-24 h-24 rounded-full blur-2xl -z-10 group-hover:scale-125 transition-transform duration-500"
            style={{
              background: isDark ? "rgba(112, 94, 242, 0.12)" : "rgba(112, 94, 242, 0.08)",
            }}
          />
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[var(--color-border-light)] group-hover:animate-pulse"
            style={{
              backgroundColor: isDark ? "rgba(112, 94, 242, 0.15)" : "#f0f2fe",
              color: "#705ef2",
            }}
          >
            <Compass size={28} className="stroke-[2]" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-lg sm:text-xl md:text-2xl leading-snug tracking-tight" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
              We bring together the world's best resources for <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">growth</span> like a <span className="text-[#705ef2] dark:text-[#8b7df5]">passport</span> that gives students access to the finest <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">ideas, skills, and perspectives</span> from every corner of the world.
            </p>
          </div>
        </div>
        <div className="w-full text-center flex flex-col items-center gap-4 mt-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
            Everything Students Need to{" "}
            <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">
              Grow
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mt-8 items-center">
          {/* Cards Grid on Left */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              { icon: BookOpen, title: "Future-Ready Skills", desc: "AI, Coding, Finance, Design, Languages and more. Stay ahead of the future." },
              { icon: Brain, title: "Growth Mindset", desc: "Develop leadership, habits and a growth mindset that lasts a lifetime." },
              { icon: Heart, title: "Mental Wellness", desc: "Guided support, meditations and AI chat to support every step." },
              { icon: CheckSquare, title: "Productivity Tools", desc: "Digital journal, task tracker and goal planner to stay organized and focused." },
              { icon: Clipboard, title: "AI Psychometric Tests", desc: "Monthly AI-powered tests to discover strengths, personality and learning style." },
              { icon: BarChart3, title: "Smart Dashboards", desc: "Real-time insights for students, parents, teachers and institutions." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="flex flex-col gap-4 p-6 rounded-3xl border border-[var(--color-border-light)] shadow-[var(--shadow-card)] backdrop-blur-md transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-accent)]/30 group cursor-default text-left"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.6) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(248, 248, 244, 0.75) 100%)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-[var(--color-border-light)] shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "var(--color-background-primary)",
                    color: "var(--color-accent)",
                  }}
                >
                  <item.icon size={22} className="stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Image Illustration on Right */}
          <div className="lg:col-span-5 flex justify-center items-center relative w-full h-[400px] md:h-[500px] lg:h-[550px] p-2">
            {/* Glowing background blur circle */}
            <div
              className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(112,94,242,0.18) 0%, transparent 75%)"
                  : "radial-gradient(circle, rgba(244,114,101,0.15) 0%, transparent 75%)",
              }}
            />
            {/* Decorative dashed path element */}
            <svg
              className="absolute w-[110%] h-[110%] -z-10 opacity-60"
              style={{ color: isDark ? "rgba(112,94,242,0.2)" : "rgba(244,114,101,0.15)" }}
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="250" cy="250" r="190" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full flex justify-center items-center"
            >
              <img
                src={studentsGrowImg}
                alt="Everything Students Need to Grow"
                className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(112,94,242,0.12)] hover:drop-shadow-[0_12px_28px_rgba(112,94,242,0.22)] transition-all duration-300 select-none pointer-events-none"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section
        id="schools"
        className="px-6 py-12 md:py-20 md:px-12 max-w-7xl mx-auto text-center w-full"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
          style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}
        >
          Built for the Entire <br className="sm:hidden" /> Education Ecosystem
        </h2>
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              id: "students",
              icon: User,
              color: "#705ef2",
              title: "For Students",
              desc: "Learn skills, build habits, improve mindset and become future ready.",
              action: () => navigate("/playground/dashboard"),
            },
            {
              id: "parents",
              icon: Users,
              color: "var(--color-accent)",
              title: "For Parents",
              desc: "Track your child's growth, progress, wellbeing and future readiness.",
              action: () => navigate("/contact"),
            },
            {
              icon: Users,
              color: "#705ef2",
              title: "For Teachers",
              desc: "Monitor students, identify strengths, and support them better.",
              action: () => navigate("/contact"),
            },
            {
              icon: School,
              color: "var(--color-accent)",
              title: "For Institutions",
              desc: "Data-driven insights to measure outcomes and transform education.",
              action: () => navigate("/contact"),
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              id={card.id || undefined}
              whileHover={{ y: -6, shadow: "var(--shadow-lg)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-3xl p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-card)] backdrop-blur-md group transition-all duration-300"
              style={{
                backgroundColor: isDark ? "rgba(30, 41, 59, 0.45)" : "rgba(255, 255, 255, 0.75)",
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[4px]"
                style={{
                  background: `linear-gradient(180deg, ${card.color}, transparent)`,
                }}
              />

              <div className="w-full">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[var(--color-border-light)] group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "var(--color-background-primary)",
                    color: card.color,
                  }}
                >
                  <card.icon size={22} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
                  {card.title}
                </h3>
                <p className="mt-3 text-xs md:text-sm leading-relaxed font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                  {card.desc}
                </p>
              </div>
              <div className="mt-8 md:mt-10 w-full flex justify-end">
                <button
                  onClick={card.action}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-[var(--color-border-light)] transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "var(--color-background-primary)",
                    color: card.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = card.color;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.05)" : "var(--color-background-primary)";
                    e.currentTarget.style.color = card.color;
                  }}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* 5. Footer */}
      <footer
        className="rounded-t-[36px] px-6 py-12 md:px-16 md:py-16 text-center"
        style={{
          backgroundColor: isDark ? "#0B1120" : "#0b0a1a",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div
            className="flex flex-col md:flex-row items-center justify-between w-full pb-8 gap-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="Ateion Logo"
                className="h-9 md:h-12 w-auto object-contain brightness-0 invert"
              />
            </div>

            <p className="text-sm font-semibold max-w-md text-center md:text-right leading-relaxed"
              style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }}>
              Trusted by forward-thinking schools, colleges and universities
              worldwide.
            </p>
          </div>

          <div
            className="w-full pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between text-xs gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "var(--color-text-muted)" }}
          >
            <p>© {new Date().getFullYear()} Ateion Technologies. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <a
                  key={link}
                  href="/policies"
                  className="transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? "#E2E8F0" : "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
