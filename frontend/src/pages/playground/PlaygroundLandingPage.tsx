import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import logo from "../../assets/logo.webp";
import playgroundHero from "../../assets/hero/playground_hero.webp";
import { useTheme } from "../../app/components/ThemeProvider";
export default function PlaygroundLandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
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
        color: "var(--color-text-primary)",
      }}
    >
      {/* 1. Header / Navbar */}
      <header
        className="sticky top-0 z-50 px-6 py-4 md:px-12 flex items-center justify-between"
        style={{
          backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "rgba(248,248,244,0.8)",
          borderBottom: "1px solid var(--color-border-light)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Ateion Logo"
            className={`h-9 md:h-12 w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
          />
        </div>
        <nav className="hidden md:flex items-center gap-2 xl:gap-3">
          {["Home", "About Us"].map((label, i) => {
            const href = i === 0 ? "/" : "/contact";
            return (
              <a
                key={label}
                href={href}
                className="clay-button rounded-full h-[36px] flex items-center justify-center px-3 xl:px-5 font-bold text-[13px] whitespace-nowrap cursor-pointer transition-all duration-200"
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
            onClick={() => navigate("/contact")}
            className="clay-button rounded-full h-[36px] flex items-center justify-center px-4 xl:px-6 font-bold text-[13px] whitespace-nowrap cursor-pointer transition-all duration-200 text-white"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] left-0 right-0 z-40 px-6 py-6 md:hidden flex flex-col gap-4 text-left"
            style={{
              backgroundColor: "var(--color-background-secondary)",
              borderBottom: "1px solid var(--color-border-light)",
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/contact");
              }}
              className="clay-button rounded-full h-10 flex items-center justify-center px-4 font-bold text-sm w-full cursor-pointer transition-all duration-200 text-white"
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
          </motion.div>
        )}
      </AnimatePresence>
      {/* 2. Hero Section */}
      <section className="relative px-6 py-8 md:px-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
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
              style={{ color: "var(--color-text-tertiary)" }}
            >
             Skills, mindset, habits, wellness, productivity and more - all in one place. For students, parents, teachers and institutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/playground/dashboard")}
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
              className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8"
              style={{ borderTop: "1px solid var(--color-border-light)" }}
            >
              {[
                { icon: GraduationCap, value: "200+", label: "Skills & Courses" },
                { icon: Users, value: "50K+", label: "Students" },
                { icon: School, value: "250+", label: "Institutions" },
                { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2" style={{ color: "#705ef2" }}>
                    <stat.icon size={20} className="stroke-[2.5]" />
                    <span
                      className="text-lg md:text-xl font-extrabold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="hidden lg:col-span-6 relative lg:flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-full max-w-[460px] aspect-square rounded-[40px] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl -z-10"
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(112,94,242,0.15) 0%, transparent 70%)"
                  : "linear-gradient(135deg, rgba(240,242,254,0.4) 0%, rgba(253,240,237,0.5) 100%)",
              }}
            />
            <svg
              className="absolute w-[110%] h-[110%] -z-10"
              style={{ color: isDark ? "rgba(232,133,106,0.15)" : "rgba(244,114,101,0.1)" }}
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50,250 C50,100 200,50 350,120 C450,180 470,300 400,380 C320,470 120,450 70,350"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            <div
              className="w-full h-full rounded-[36px] overflow-hidden shadow-2xl border-4 relative"
              style={{
                borderColor: isDark ? "#1E293B" : "#fff",
                backgroundColor: isDark ? "#1E293B" : "#fff",
              }}
            >
              <img
                src={playgroundHero}
                alt="Student studying on laptop with headphones"
                className="w-full h-full object-cover"
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
      {/* 3. Everything Students Need to Grow Section */}
      <section id="features" className="px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div
          className="rounded-[36px] px-6 py-12 md:px-16 md:py-20 text-center relative overflow-hidden shadow-2xl"
          style={{
            backgroundColor: isDark ? "#0B1120" : "#0d0c22",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl -z-10"
            style={{ backgroundColor: "rgba(112,94,242,0.12)" }}
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: isDark ? "#F1F5F9" : "#FFFFFF" }}>
            Everything Students <br className="sm:hidden" /> Need to{" "}
            <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">
              Grow
            </span>
          </h2>
          <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-8 text-left relative z-10">
            {[
              { icon: BookOpen, title: "Future-Ready Skills", desc: "AI, Coding, Finance, Design, Languages and more. Stay ahead of the future." },
              { icon: Brain, title: "Growth Mindset", desc: "Develop leadership, habits and a growth mindset that lasts a lifetime." },
              { icon: Heart, title: "Mental Wellness", desc: "Guided support, meditations and AI chat to support every step." },
              { icon: CheckSquare, title: "Productivity Tools", desc: "Digital journal, task tracker and goal planner to stay organized and focused." },
              { icon: Clipboard, title: "AI Psychometric Tests", desc: "Monthly AI-powered tests to discover strengths, personality and learning style." },
              { icon: BarChart3, title: "Smart Dashboards", desc: "Real-time insights for students, parents, teachers and institutions." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "var(--color-accent)",
                  }}
                >
                  <item.icon size={20} className="md:size-[24px] stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-extrabold"
                    style={{ color: isDark ? "#E2E8F0" : "#FFFFFF" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm leading-relaxed font-medium"
                    style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 4. Built for the Entire Education Ecosystem Section */}
      <section
        id="schools"
        className="px-6 py-12 md:py-20 md:px-12 max-w-7xl mx-auto text-center"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Built for the Entire <br className="sm:hidden" /> Education Ecosystem
        </h2>
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              id: "students",
              icon: User,
              color: "#705ef2",
              bg: isDark ? "rgba(112,94,242,0.12)" : "#f0f2fe",
              title: "For Students",
              desc: "Learn skills, build habits, improve mindset and become future ready.",
              action: () => navigate("/playground/dashboard"),
            },
            {
              id: "parents",
              icon: Users,
              color: "var(--color-accent)",
              bg: isDark ? "rgba(232,133,106,0.12)" : "#fdf0ed",
              title: "For Parents",
              desc: "Track your child's growth, progress, wellbeing and future readiness.",
              action: () => navigate("/contact"),
            },
            {
              icon: Users,
              color: "#705ef2",
              bg: isDark ? "rgba(112,94,242,0.12)" : "#f0f2fe",
              title: "For Teachers",
              desc: "Monitor students, identify strengths, and support them better.",
              action: () => navigate("/contact"),
            },
            {
              icon: School,
              color: "var(--color-accent)",
              bg: isDark ? "rgba(232,133,106,0.12)" : "#fdf0ed",
              title: "For Institutions",
              desc: "Data-driven insights to measure outcomes and transform education.",
              action: () => navigate("/contact"),
            },
          ].map((card, i) => (
            <div
              key={i}
              id={card.id || undefined}
              className="rounded-[28px] p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group transition-all duration-300"
              style={{ backgroundColor: card.bg }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                  style={{
                    backgroundColor: "var(--color-background-secondary)",
                    color: card.color,
                  }}
                >
                  <card.icon size={24} className="stroke-[2.5]" />
                </div>
                <h3 className="text-lg md:text-xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
                  {card.title}
                </h3>
                <p className="mt-2 md:mt-3 text-xs md:text-sm leading-relaxed font-semibold" style={{ color: "var(--color-text-secondary)" }}>
                  {card.desc}
                </p>
              </div>
              <div className="mt-8 md:mt-10 w-full flex justify-end">
                <button
                  onClick={card.action}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 cursor-pointer"
                  style={{
                    backgroundColor: "var(--color-background-secondary)",
                    color: card.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = typeof card.color === "string" && card.color.startsWith("var(")
                      ? "var(--color-accent)"
                      : card.color;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-background-secondary)";
                    e.currentTarget.style.color = card.color;
                  }}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
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
