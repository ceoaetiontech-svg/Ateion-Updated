import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Award,
  ChevronRight,
  Compass,
  Clock,
  CheckCircle,
  Star,
  BarChart2,
  PlayCircle,
  Heart,
  Play,
  Trophy,
  Sparkles,
  GraduationCap,
  Share2,
  Download,
  BookOpen,
  Sprout,
  Medal,
  PartyPopper,
  Zap,
} from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { courseMatchesAgeGroup, normalizeAgeGroupId } from "../shared/courseAgeGroups";
import type { AgeGroupId } from "../shared/types";

type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUPS: { id: AgeGroupFilterId; label: string; icon: JSX.Element }[] = [
  { id: "All", label: "All", icon: <Trophy size={18} /> },
  { id: "Sproutlings (5-7 age)", label: "Sproutlings", icon: <Sprout size={18} /> },
  { id: "Saplings (7-14 age)", label: "Saplings", icon: <Sprout size={18} /> },
  { id: "Pathfinders (14-18 age)", label: "Pathfinders", icon: <Compass size={18} /> },
  { id: "Dreamers (18+ age)", label: "Dreamers", icon: <Sparkles size={18} /> },
];

const ACCENT_PILL = "linear-gradient(135deg, #2b244f 0%, #d66f55 58%, #ff9b82 100%)";
const WALLPAPER = "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)";

export default function CompletedCoursesPage() {
  const { savedIds, toggleSave, enrolledIds, courseAccess } = usePlayground();
  const { myCourses } = useCourses("", enrolledIds, courseAccess);
  const navigate = useNavigate();
  const [ageFilter, setAgeFilter] = useState<AgeGroupFilterId>("All");
  const [shareAlert, setShareAlert] = useState(false);

  const completed = myCourses.filter(c => c.progress === 100);

  const filtered = ageFilter === "All"
    ? completed
    : completed.filter(c => courseMatchesAgeGroup(c, normalizeAgeGroupId(ageFilter)));

  const stats = useMemo(() => [
    { label: "Completed", value: completed.length, icon: CheckCircle, color: "var(--color-success)" },
    { label: "Certificates", value: completed.length, icon: Award, color: "var(--color-accent)" },
    { label: "Hours Learned", value: completed.reduce((a, c) => a + parseInt(c.duration?.split(" ")[0] || "0"), 0), icon: Clock, color: "var(--color-info)" },
    { label: "Saved", value: completed.filter(c => savedIds.includes(c.id)).length, icon: Heart, color: "var(--color-danger)" },
  ], [completed, savedIds]);

  const totalHours = completed.reduce((a, c) => a + parseInt(c.duration?.split(" ")[0] || "0"), 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Themed Header Banner */}
      <div className="relative overflow-hidden rounded-[32px] p-8 md:p-10 border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]"
        style={{ background: `${WALLPAPER}, var(--color-background-secondary)` }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PartyPopper size={20} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                Congratulations!
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
            >
              Completed Courses
            </h2>
            <p className="text-sm max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
              Celebrate your achievements — every completed course is a milestone worth owning.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background)] shadow-sm">
              <GraduationCap size={18} style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{completed.length} Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={slideInItem}
            initial="hidden"
            animate="show"
            custom={i}
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: stat.color + "18" }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>{stat.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--color-text-tertiary)" }}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Age Group Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {AGE_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => setAgeFilter(group.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
            style={ageFilter === group.id
              ? { background: ACCENT_PILL, color: "#fff", boxShadow: "0 4px 14px rgba(214,111,85,0.35)" }
              : { background: "var(--color-background-secondary)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border-light)" }
            }
          >
            {group.icon}
            {group.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex items-center justify-center mb-5 shadow-inner">
            {ageFilter === "All"
              ? <Award size={40} style={{ color: "var(--color-text-tertiary)" }} />
              : <Compass size={40} style={{ color: "var(--color-text-tertiary)" }} />
            }
          </div>
          <p className="text-xl font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
            {ageFilter === "All" ? "No completed courses yet" : "No completed courses in this age group"}
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
            {ageFilter === "All"
              ? "Complete a course to see it here and earn your certificate."
              : "Try completing a course in this age group or browse all."
            }
          </p>
          <button
            onClick={() => navigate("/playground/discover")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg"
            style={{ background: ACCENT_PILL }}
          >
            <Compass size={16} /> Discover Courses
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="show"
        >
          {filtered.map((course, idx) => (
            <motion.div
              variants={slideInItem}
              custom={idx}
              key={course.id}
              className="rounded-2xl flex flex-col group cursor-pointer overflow-hidden border border-t-[3px] border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{ borderTopColor: getTopicColor(course.topics) }}
              onClick={() => navigate(`/playground/course/${course.id}`)}
            >
              {/* Image Area */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <img
                  src={course.image}
                  alt={course.title}
                  onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                    className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg"
                  >
                    <Play size={18} className="fill-[#ffffff]" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                    <CheckCircle size={12} /> Completed
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                  className="absolute top-4 right-4 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart size={15} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-[#fff]"} />
                </button>
                <div className="absolute bottom-4 left-4 z-20 right-4">
                  <h4 className="text-[18px] font-bold text-[#ffffff] mb-1.5 line-clamp-2 leading-tight drop-shadow-md">{course.title}</h4>
                  <div className="flex items-center gap-2">
                    <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover border border-white/40" />
                    <span className="text-[12px] text-[#ffffff]/90 font-medium truncate">{course.instructor}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold" style={{ color: "var(--color-warning)" }}>{course.rating}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} style={{ color: "var(--color-warning)" }} fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"} />
                  ))}
                  <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                    ({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                    <BarChart2 size={11} /> {course.level}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                    <Clock size={11} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--color-text-tertiary)" }}>
                    <PlayCircle size={11} /> {course.lessons} lessons
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {course.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                      style={{ backgroundColor: getTopicColor(course.topics) + "18", color: getTopicColor(course.topics) }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/20">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/12 flex items-center justify-center shrink-0">
                    <Medal size={16} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: "var(--color-success)" }}>Certificate earned</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareAlert(true);
                      setTimeout(() => setShareAlert(false), 2000);
                    }}
                    className="ml-auto p-1.5 rounded-lg hover:bg-[var(--color-accent)]/10 transition-colors"
                    title="Share achievement"
                  >
                    <Share2 size={14} style={{ color: "var(--color-accent)" }} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Certificate for: ${course.title}\n\nCongratulations on completing this course!`);
                    }}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-accent)]/10 transition-colors"
                    title="Download certificate"
                  >
                    <Download size={14} style={{ color: "var(--color-accent)" }} />
                  </button>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                  className="w-full mt-auto border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#fff] py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)]"
                >
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Total Achievement Banner */}
      {completed.length > 0 && (
        <motion.div
          variants={slideInItem}
          initial="hidden"
          animate="show"
          custom={5}
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={{ background: ACCENT_PILL }}>
              <Trophy size={28} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                You've completed {completed.length} course{completed.length > 1 ? "s" : ""}!
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {totalHours > 0
                  ? `That's approximately ${totalHours} hours of learning. Keep it up!`
                  : "Each course is a step forward. Keep building!"
                }
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/playground/discover")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-all hover:brightness-110 shadow-lg shrink-0"
            style={{ background: ACCENT_PILL }}
          >
            <BookOpen size={16} /> Find Next Course
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {shareAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl backdrop-blur-md text-white text-sm font-bold shadow-2xl flex items-center gap-2 border"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <Zap size={16} className="text-white/80" />
            Achievement shared! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
