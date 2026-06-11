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
import logo from "../../assets/logo.png";
import playgroundHero from "../../assets/hero/playground_hero.png";
export default function PlaygroundLandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Soft floating animation for card badges in hero
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
    <div className="min-h-screen bg-[#fafbfc] text-[#0d0c22] font-manrope overflow-x-hidden relative">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 md:px-12 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Ateion Logo"
            className="h-9 md:h-12 w-auto object-contain"
          />
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            Features
          </a>
          <a
            href="#schools"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            For Schools
          </a>
          <a
            href="#parents"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            For Parents
          </a>
          <a
            href="#students"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            For Students
          </a>
          <a
            href="/contact"
            className="text-sm font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors"
          >
            About Us
          </a>
        </nav>
        {/* Book a Demo - Desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => navigate("/contact")}
            className="bg-[#f47265] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#ff8576] transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#f47265]/20 cursor-pointer"
          >
            Book a Demo
          </button>
        </div>
        {/* Hamburger Menu - Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-[#0d0c22] transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[68px] left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg px-6 py-6 md:hidden flex flex-col gap-4 text-left"
          >
            <a
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              Features
            </a>
            <a
              href="#schools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              For Schools
            </a>
            <a
              href="#parents"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              For Parents
            </a>
            <a
              href="#students"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              For Students
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-gray-600 hover:text-[#0d0c22] transition-colors py-2 border-b border-gray-50"
            >
              About Us
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/contact");
              }}
              className="w-full bg-[#f47265] text-white font-bold text-base py-3 rounded-full hover:bg-[#ff8576] transition-all text-center mt-2 shadow-md shadow-[#f47265]/20 cursor-pointer"
            >
              Book a Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 2. Hero Section */}
      <section className="relative px-6 py-8 md:px-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0d0c22] leading-[1.15] md:leading-[1.1]">
              Ateion <br />
              <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">
                Playground
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg md:text-xl font-bold text-[#110a24] tracking-tight">
              One Platform. Every Skill. Every Mind. Every Future.
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
              A complete student development ecosystem that brings future-ready
              skills, mental wellness, productivity tools, AI-powered
              assessments and real growth together - all in one place.
            </p>
            {/* Buttons: Column on mobile, row on desktop */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/playground/dashboard")}
                className="w-full sm:w-auto justify-center bg-[#f47265] text-white font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#ff8576] transition-all hover:scale-102 active:scale-98 shadow-lg shadow-[#f47265]/20 cursor-pointer"
              >
                Explore Playground <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto justify-center bg-[#0d0c22] text-white font-bold text-base px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#1f1e3c] transition-all hover:scale-102 active:scale-98 shadow-lg shadow-[#0d0c22]/10 cursor-pointer"
              >
                For Institutions <ArrowRight size={18} />
              </button>
            </div>
            {/* Statistics row: 2x2 grid on mobile, 4 in a row on desktop */}
            <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-gray-100 pt-8">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-[#705ef2]">
                  <GraduationCap size={20} className="stroke-[2.5]" />
                  <span className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                    200+
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">
                  Skills & Courses
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-[#705ef2]">
                  <Users size={20} className="stroke-[2.5]" />
                  <span className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                    50K+
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">
                  Students
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-[#705ef2]">
                  <School size={20} className="stroke-[2.5]" />
                  <span className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                    250+
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">
                  Institutions
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-[#705ef2]">
                  <TrendingUp size={20} className="stroke-[2.5]" />
                  <span className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                    98%
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">
                  Satisfaction Rate
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Right Side Image & Floating Badges - Hidden on Mobile */}
        <div className="hidden lg:col-span-6 relative lg:flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-full max-w-[460px] aspect-square rounded-[40px] flex items-center justify-center p-4"
          >
            {/* Soft decorative background circles and path */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f2fe]/40 to-[#fdf0ed]/50 rounded-full blur-2xl -z-10" />
            <svg
              className="absolute w-[110%] h-[110%] text-[#f47265]/10 -z-10"
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
            {/* Main Student Image */}
            <div className="w-full h-full rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-white relative">
              <img
                src={playgroundHero}
                alt="Student studying on laptop with headphones"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge 1: AI Tutor */}
            <motion.div
              variants={floatAnim1}
              animate="animate"
              className="absolute -top-4 -left-12 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f0f2fe] flex items-center justify-center text-[#705ef2] shrink-0">
                <Bot size={22} className="stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#0d0c22]">
                  AI Tutor
                </h4>
                <p className="text-[10px] font-medium text-gray-400">
                  Always here to help
                </p>
              </div>
            </motion.div>
            {/* Floating Badge 2: Mental Wellness */}
            <motion.div
              variants={floatAnim2}
              animate="animate"
              className="absolute bottom-16 -left-14 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fdf0ed] flex items-center justify-center text-[#f47265] shrink-0">
                <Heart size={22} className="fill-current stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#0d0c22]">
                  Mental Wellness
                </h4>
                <p className="text-[10px] font-medium text-gray-400">
                  Your well-being matters
                </p>
              </div>
            </motion.div>
            {/* Floating Badge 3: Growth Mindset */}
            <motion.div
              variants={floatAnim3}
              animate="animate"
              className="absolute top-12 -right-12 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-[#fdf0ed] flex items-center justify-center text-[#f47265] shrink-0">
                <Brain size={22} className="stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#0d0c22]">
                  Growth Mindset
                </h4>
                <p className="text-[10px] font-medium text-gray-400">
                  Build confidence and resilience
                </p>
              </div>
            </motion.div>
            {/* Floating Badge 4: Track Progress */}
            <motion.div
              variants={floatAnim4}
              animate="animate"
              className="absolute bottom-28 -right-14 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] z-10"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f0f2fe] flex items-center justify-center text-[#705ef2] shrink-0">
                <BarChart3 size={22} className="stroke-[2]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#0d0c22]">
                  Track Progress
                </h4>
                <p className="text-[10px] font-medium text-gray-400">
                  Measure. Improve. Succeed.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* 3. Everything Students Need to Grow Section (Dark Navy rounded block) */}
      <section id="features" className="px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-[#0d0c22] rounded-[36px] px-6 py-12 md:px-16 md:py-20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#705ef2]/10 rounded-full blur-3xl -z-10" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Everything Students <br className="sm:hidden" /> Need to{" "}
            <span className="bg-gradient-to-r from-[#ff8576] to-[#f47265] bg-clip-text text-transparent">
              Grow
            </span>
          </h2>
          {/* Grid of 6 feature cards: 2 columns on mobile, 6 columns on desktop */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-8 text-left relative z-10">
            {/* Item 1 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <BookOpen size={20} className="md:size-[24px] stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Future-Ready Skills
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  AI, Coding, Finance, Design, Languages and more. Stay ahead of
                  the future.
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <Brain size={20} className="md:size-[24px] stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Growth Mindset
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  Develop leadership, habits and a growth mindset that lasts a
                  lifetime.
                </p>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <Heart
                  size={20}
                  className="md:size-[24px] stroke-[2] fill-transparent"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Mental Wellness
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  Guided support, meditations and AI chat to support every step.
                </p>
              </div>
            </div>
            {/* Item 4 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <CheckSquare size={20} className="md:size-[24px] stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Productivity Tools
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  Digital journal, task tracker and goal planner to stay
                  organized and focused.
                </p>
              </div>
            </div>
            {/* Item 5 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <Clipboard size={20} className="md:size-[24px] stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  AI Psychometric Tests
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  Monthly AI-powered tests to discover strengths, personality
                  and learning style.
                </p>
              </div>
            </div>
            {/* Item 6 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#f47265]">
                <BarChart3 size={20} className="md:size-[24px] stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-white">
                  Smart Dashboards
                </h3>
                <p className="mt-1 md:mt-2 text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium">
                  Real-time insights for students, parents, teachers and
                  institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 4. Built for the Entire Education Ecosystem Section */}
      <section
        id="schools"
        className="px-6 py-12 md:py-20 md:px-12 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d0c22] leading-tight">
          Built for the Entire <br className="sm:hidden" /> Education Ecosystem
        </h2>
        {/* 4 Ecosystem Card Columns: Stacked on mobile, 4 columns on desktop */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Card 1: Students */}
          <div
            id="students"
            className="bg-[#f0f2fe] rounded-[28px] p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#705ef2] mb-6 shadow-sm">
                <User size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                For Students
              </h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                Learn skills, build habits, improve mindset and become future
                ready.
              </p>
            </div>

            <div className="mt-8 md:mt-10 w-full flex justify-end">
              <button
                onClick={() => navigate("/playground/dashboard")}
                className="w-10 h-10 rounded-full bg-white text-[#705ef2] flex items-center justify-center shadow-sm group-hover:bg-[#705ef2] group-hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          {/* Card 2: Parents */}
          <div
            id="parents"
            className="bg-[#fdf0ed] rounded-[28px] p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#f47265] mb-6 shadow-sm">
                <Users size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                For Parents
              </h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                Track your child's growth, progress, wellbeing and future
                readiness.
              </p>
            </div>
            <div className="mt-8 md:mt-10 w-full flex justify-end">
              <button
                onClick={() => navigate("/contact")}
                className="w-10 h-10 rounded-full bg-white text-[#f47265] flex items-center justify-center shadow-sm group-hover:bg-[#f47265] group-hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          {/* Card 3: Teachers */}
          <div className="bg-[#f0f2fe] rounded-[28px] p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#705ef2] mb-6 shadow-sm">
                <Users size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                For Teachers
              </h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                Monitor students, identify strengths, and support them better.
              </p>
            </div>
            <div className="mt-8 md:mt-10 w-full flex justify-end">
              <button
                onClick={() => navigate("/contact")}
                className="w-10 h-10 rounded-full bg-white text-[#705ef2] flex items-center justify-center shadow-sm group-hover:bg-[#705ef2] group-hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          {/* Card 4: Institutions */}
          <div className="bg-[#fdf0ed] rounded-[28px] p-6 md:p-8 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#f47265] mb-6 shadow-sm">
                <School size={24} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0d0c22]">
                For Institutions
              </h3>
              <p className="mt-2 md:mt-3 text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                Data-driven insights to measure outcomes and transform
                education.
              </p>
            </div>
            <div className="mt-8 md:mt-10 w-full flex justify-end">
              <button
                onClick={() => navigate("/contact")}
                className="w-10 h-10 rounded-full bg-white text-[#f47265] flex items-center justify-center shadow-sm group-hover:bg-[#f47265] group-hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* 5. Footer Row with Partner Logos (Dark Navy background block) */}
      <footer className="bg-[#0b0a1a] rounded-t-[36px] px-6 py-12 md:px-16 md:py-16 text-center text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-white/5 pb-8 gap-6">
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

            <p className="text-sm font-semibold max-w-md text-center md:text-right text-gray-400 leading-relaxed">
              Trusted by forward-thinking schools, colleges and universities
              worldwide.
            </p>
          </div>
          {/* School partner logos */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center opacity-70">
            {/* DPS */}
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white shrink-0"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div className="text-left font-manrope">
                <span className="text-[10px] tracking-widest uppercase text-white font-extrabold block leading-none">
                  Delhi
                </span>
                <span className="text-xs font-black text-white tracking-tight leading-none">
                  Public School
                </span>
              </div>
            </div>
            {/* KREA */}
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white tracking-widest font-display">
                KREA
              </span>
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mt-1">
                university
              </span>
            </div>
            {/* CHRIST */}
            <div className="flex items-center gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white shrink-0"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div className="text-left leading-none">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  CHRIST
                </span>
                <span className="text-[9px] text-gray-400 font-semibold block uppercase tracking-widest mt-0.5">
                  deemed to be university
                </span>
              </div>
            </div>
            {/* AMITY */}
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-white tracking-wider">
                AMITY
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                UNIVERSITY
              </span>
            </div>
            {/* PODAR */}
            <div className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              <div className="text-left leading-none">
                <span className="text-sm font-black text-white tracking-tight">
                  PODAR
                </span>
                <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-widest mt-0.5">
                  EDUCATION NETWORK
                </span>
              </div>
            </div>
            {/* EuroSchool */}
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-white tracking-tight">
                EuroSchool
              </span>
              <span className="text-[14px] text-[#f47265] font-black leading-none">
                ❤
              </span>
            </div>
          </div>
          <div className="w-full border-t border-white/5 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>
              © {new Date().getFullYear()} Ateion Technologies. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/policies"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/policies"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
