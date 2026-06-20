import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  BookMarked,
  ChevronRight,
  Compass,
  Rocket,
  Heart,
  Play,
  Bookmark,
  Star,
  Sprout,
  Sparkles,
  Award,
  Clock,
  CheckCircle,
  Signal,
  BarChart2,
  PlayCircle,
  Search,
} from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { courseMatchesAgeGroup, normalizeAgeGroupId } from "../shared/courseAgeGroups";
import CoursePreviewPopover from "../components/CoursePreviewPopover";
import type { AgeGroupId } from "../shared/types";

type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUPS: { id: AgeGroupFilterId; label: string; icon: JSX.Element }[] = [
  { id: "All", label: "All", icon: <Compass size={18} /> },
  { id: "Sproutlings (5-7 age)", label: "Sproutlings (5-7 age)", icon: <Sprout size={18} /> },
  { id: "Saplings (7-14 age)", label: "Saplings (7-14 age)", icon: <Sprout size={18} /> },
  { id: "Pathfinders (14-18 age)", label: "Pathfinders (14-18 age)", icon: <Compass size={18} /> },
  { id: "Dreamers (18+ age)", label: "Dreamers (18+ age)", icon: <Sparkles size={18} /> },
];

const AGE_GROUP_THEMES: Record<AgeGroupFilterId, {
  kicker: string; title: string; description: string; accent: string; activePill: string; wallpaper: string; panelClass: string;
}> = {
  All: {
    kicker: "Your learning journey",
    title: "My Courses",
    description: "Track your progress, pick up where you left off, and celebrate your completions.",
    accent: "var(--color-accent)",
    activePill: "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)",
    wallpaper: "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)",
    panelClass: "border-[var(--color-border-light)] bg-[var(--color-background-secondary)]",
  },
  "Sproutlings (5-7 age)": {
    kicker: "Playful quest path",
    title: "Tiny quests, bright wins",
    description: "Short playful lessons, cheerful progress cues and simple cards for early learners.",
    accent: "#58cc02",
    activePill: "linear-gradient(135deg, #1e5f18 0%, #58cc02 58%, #a8ef38 100%)",
    wallpaper: "radial-gradient(circle at 12% 22%, rgba(88,204,2,0.22), transparent 18%), radial-gradient(circle at 82% 24%, rgba(255,199,44,0.26), transparent 17%), radial-gradient(circle at 48% 95%, rgba(125,224,0,0.18), transparent 20%), linear-gradient(135deg, rgba(88,204,2,0.08) 0%, rgba(255,255,255,0) 55%)",
    panelClass: "border-[#d7efc8] bg-[#f7fff0] text-[#27391c] shadow-[0_5px_0_#d7efc8]",
  },
  "Saplings (7-14 age)": {
    kicker: "Build and explore",
    title: "Creative skill labs",
    description: "Hands-on beginner projects for curious learners moving from play into creation.",
    accent: "#14b8a6",
    activePill: "linear-gradient(135deg, #0f3f47 0%, #14b8a6 58%, #22d3ee 100%)",
    wallpaper: "radial-gradient(circle at 14% 18%, rgba(20,184,166,0.20), transparent 18%), radial-gradient(circle at 78% 16%, rgba(34,211,238,0.24), transparent 19%), radial-gradient(circle at 54% 100%, rgba(45,212,191,0.18), transparent 22%), linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(255,255,255,0) 60%)",
    panelClass: "border-[#bdebe5] bg-[#f0fdfa] text-[#123f3c] shadow-[0_5px_0_#bdebe5]",
  },
  "Pathfinders (14-18 age)": {
    kicker: "Portfolio-ready growth",
    title: "Skill tracks for teen builders",
    description: "Focused courses with clearer career signals, project depth and measurable progress.",
    accent: "#6366f1",
    activePill: "linear-gradient(135deg, #27316f 0%, #6366f1 58%, #8b5cf6 100%)",
    wallpaper: "radial-gradient(circle at 14% 18%, rgba(99,102,241,0.18), transparent 18%), radial-gradient(circle at 82% 18%, rgba(139,92,246,0.18), transparent 18%), linear-gradient(135deg, rgba(99,102,241,0.08), rgba(255,255,255,0) 60%)",
    panelClass: "border-[#d7d8ff] bg-[#f5f5ff] text-[#25265f] shadow-[0_5px_0_#d7d8ff]",
  },
  "Dreamers (18+ age)": {
    kicker: "Professional momentum",
    title: "Career-grade mastery",
    description: "Longer, deeper tracks for advanced upskilling and applied workplace readiness.",
    accent: "#f59e0b",
    activePill: "linear-gradient(135deg, #111827, #7c3aed)",
    wallpaper: "radial-gradient(circle at 15% 18%, rgba(245,158,11,0.18), transparent 18%), radial-gradient(circle at 84% 16%, rgba(124,58,237,0.14), transparent 19%), linear-gradient(135deg, rgba(245,158,11,0.08), rgba(255,255,255,0) 62%)",
    panelClass: "border-[#f5d99b] bg-[#fff8e8] text-[#4a3310] shadow-[0_5px_0_#f5d99b]",
  },
};

export default function MyCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, courseAccess } = usePlayground();
  const { allCourses, lastResume, myCourses } = useCourses(courseQuery, enrolledIds, courseAccess);
  const navigate = useNavigate();

  const normalizedAgeGroup = normalizeAgeGroupId(activeAgeGroup) as AgeGroupFilterId;
  const activeTheme = AGE_GROUP_THEMES[normalizedAgeGroup] ?? AGE_GROUP_THEMES.All;

  const filtered = allCourses.filter(c =>
      (c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(courseQuery.toLowerCase())) &&
      courseMatchesAgeGroup(c, activeAgeGroup)
  );

  const inProgress = myCourses.filter(c => c.progress < 100);
  const savedCourses = filtered.filter(c => savedIds.includes(c.id));
  const completedCourses = myCourses.filter(c => c.progress === 100);
  const [tab, setTab] = useState<"in-progress" | "saved" | "completed">("in-progress");

  const stats = useMemo(() => [
    { label: "Enrolled", value: myCourses.length, icon: BookMarked, color: "var(--color-info)" },
    { label: "In Progress", value: inProgress.length, icon: Clock, color: "var(--color-warning)" },
    { label: "Completed", value: completedCourses.length, icon: CheckCircle, color: "var(--color-success)" },
    { label: "Saved", value: savedCourses.length, icon: Bookmark, color: "var(--color-accent)" },
  ], [myCourses.length, inProgress.length, completedCourses.length, savedCourses.length]);

  return (
      <div className="flex flex-col gap-6">

        {/* 1. Themed Header Banner (like Discover) */}
        <div className={`p-8 rounded-3xl ${activeTheme.panelClass} relative overflow-hidden`} style={{ background: activeTheme.wallpaper }}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: activeTheme.accent }}>
                {activeTheme.kicker}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">
                {activeTheme.title}
              </h1>
              <p className="text-[var(--color-text-secondary)]">{activeTheme.description}</p>
            </div>
            {lastResume && (
                <button
                    onClick={() => navigate(`/playground/course/${lastResume.id}`)}
                    className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0"
                >
                  <PlayCircle size={18} /> Resume Learning
                </button>
            )}
          </div>
        </div>

        {/* 2. Stats Row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
              <div key={stat.label} className="bg-[var(--color-background-secondary)] rounded-2xl p-4 border border-[var(--color-border-light)] flex items-center justify-center gap-3 sm:justify-start sm:gap-4 hover:border-[var(--color-accent)]/20 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + "15", color: stat.color }}>
                  <stat.icon size={20} />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] font-medium">{stat.label}</p>
                </div>
              </div>
          ))}
        </div>

        {/* 3. Search */}
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
          <input
              type="text"
              placeholder="Search your courses..."
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
              className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-11 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)]"
          />
        </div>

        {/* 4. Tabs + Age Group Filters (like Discover) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            {[
              { id: "in-progress" as const, label: "In Progress", icon: Play },
              { id: "saved" as const, label: "Saved", icon: Bookmark },
              { id: "completed" as const, label: "Completed", icon: CheckCircle },
            ].map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        tab === t.id
                            ? "bg-[var(--color-accent)] text-white shadow-md"
                            : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
                    }`}
                >
                  <t.icon size={16} />
                  <span>{t.label}</span>
                </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {AGE_GROUPS.map((group) => (
                <button
                    key={group.id}
                    onClick={() => setActiveAgeGroup(group.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        activeAgeGroup === group.id
                            ? "text-white shadow-md border-transparent"
                            : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)]"
                    }`}
                    style={activeAgeGroup === group.id ? { background: activeTheme.activePill } : {}}
                >
                  {group.icon}
                  <span className="text-sm font-semibold">{group.label}</span>
                </button>
            ))}
          </div>
        </div>

        {/* 5. Course Grid */}
        <AnimatePresence mode="wait">
          <motion.div
              key={tab}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch auto-rows-fr"
              variants={slideInItem}
              initial="hidden"
              animate="show"
          >
            {(() => {
              const courses = tab === "saved" ? savedCourses : tab === "completed" ? completedCourses : inProgress;
              return courses.length > 0 ? courses.map((course) => (
                  <motion.div
                      key={course.id}
                      layout
                      variants={slideInItem}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="h-full flex w-full"
                  >
                    <CoursePreviewPopover
                        course={course}
                        onReadMore={() => navigate(`/playground/course/${course.id}`)}
                        onSave={() => toggleSave(course.id)}
                        isSaved={savedIds.includes(course.id)}
                    >
                      <div
                          onClick={() => navigate(`/playground/course/${course.id}`)}
                          className="w-full cursor-pointer h-full transition-transform hover:-translate-y-1 flex flex-col group bg-[var(--color-background-secondary)] rounded-2xl border border-t-[3px] border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl overflow-hidden"
                          style={{ borderTopColor: getTopicColor(course.topics) }}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-background-tertiary)] shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                          <img
                              src={course.image}
                              alt={course.title}
                              onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                            <div className="rounded-lg border border-[#ffffff]/20 bg-[#ffffff]/10 backdrop-blur-md text-[#ffffff] px-2.5 py-1 text-[10px] font-bold tracking-wider flex items-center gap-1 shadow-lg">
                              <Signal size={11} /> {course.level}
                            </div>
                          </div>
                          <button
                              onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                              className="absolute top-3 right-3 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                          >
                            <Heart size={14} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-[#fff]"} />
                          </button>
                          <div className="absolute bottom-3 left-3 z-20 right-3">
                            <h4 className="text-[15px] font-bold text-[#ffffff] line-clamp-2 leading-tight drop-shadow-md">
                              {course.title}
                            </h4>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-2 text-xs text-[var(--color-text-secondary)]">
                            <img src={course.instructorAvatar} alt={course.instructor} className="w-5 h-5 rounded-full object-cover shrink-0" />
                            <span className="truncate">{course.instructor}</span>
                          </div>

                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating.toFixed(1)}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={10} className="text-[var(--color-warning)]" fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"} />
                              ))}
                            </div>
                            <span className="text-[10px] text-[var(--color-text-tertiary)]">({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})</span>
                          </div>

                          <div className="flex items-center gap-3 mb-3 text-[10px] text-[var(--color-text-tertiary)] font-medium">
                            <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                            <span className="flex items-center gap-1"><PlayCircle size={11} /> {course.lessons} lessons</span>
                          </div>

                          {tab !== "saved" && (
                              <div className="mb-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-[var(--color-text-primary)]">{course.progress}% complete</span>
                                  <span className="text-[10px] text-[var(--color-text-tertiary)] font-medium">{course.completed}/{course.total} lessons</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-[var(--color-border-light)] overflow-hidden shadow-inner">
                                  <motion.div
                                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88]"
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${course.progress}%` }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                  />
                                </div>
                              </div>
                          )}

                          {course.progress === 100 && (
                              <div className="mb-3 flex items-center gap-2 p-2.5 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
                                <Award size={14} className="text-[var(--color-success)] shrink-0" />
                                <span className="text-[11px] font-bold text-[var(--color-success)]">Course complete</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); alert(`Certificate for: ${course.title}`); }}
                                    className="ml-auto text-[10px] font-bold text-[var(--color-success)] hover:underline"
                                >
                                  View certificate
                                </button>
                              </div>
                          )}

                          <div className="mt-auto">
                            <div className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-2.5 rounded-xl text-xs font-bold text-center group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] transition-all">
                              {course.progress === 100 ? "View Certificate" : course.progress > 0 ? "Continue Learning" : "Start Course"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CoursePreviewPopover>
                  </motion.div>
              )) : (
                  <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                      <BookMarked size={32} />
                    </div>
                    <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">
                      {tab === "saved" ? "No saved courses yet" : tab === "completed" ? "No completed courses yet" : "No courses in progress"}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
                      {tab === "saved"
                          ? "Click the heart icon on any course to save it for later."
                          : tab === "completed"
                              ? "Complete a course to see it here."
                              : courseQuery ? `No results for "${courseQuery}"` : "Enroll in a course to get started."}
                    </p>
                    {courseQuery && (
                        <button onClick={() => setCourseQuery("")} className="mt-6 text-sm font-bold text-[var(--color-accent)] hover:underline">
                          Clear search
                        </button>
                    )}
                  </motion.div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
  );
}
