import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BookMarked,
  ChevronRight,
  Compass,
  Zap,
  Rocket,
  Heart,
  Play,
  Bookmark,
  Star,
  Sprout,
  Sparkles,
  Award,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle,
  GraduationCap,
  Users,
  Signal,
  Languages,
  BarChart2,
  PlayCircle,
} from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import CoursePreviewPopover from "../components/CoursePreviewPopover";

export default function MyCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, courseAccess } = usePlayground();
  const { allCourses, lastResume, myCourses } = useCourses(courseQuery, enrolledIds, courseAccess);
  const navigate = useNavigate();

  const filtered = allCourses.filter(c =>
    (c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(courseQuery.toLowerCase())) &&
    (activeAgeGroup === "All" || c.level.includes(activeAgeGroup))
  );

  const inProgress = myCourses.filter(c => c.progress < 100);
  const savedCourses = filtered.filter(c => savedIds.includes(c.id));
  const completedCourses = myCourses.filter(c => c.progress === 100);
  const [tab, setTab] = useState<"in-progress" | "saved" | "completed">("in-progress");

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Banner */}
      <div
        className="relative overflow-hidden rounded-3xl min-h-[200px] md:min-h-[220px] cursor-pointer group bg-black"
        onClick={() => lastResume && navigate(`/playground/course/${lastResume.id}`)}
        style={lastResume ? { borderTop: `3px solid ${getTopicColor(lastResume.topics)}` } : undefined}
      >
        {lastResume ? (
          <>
            <img src={lastResume.image} alt={lastResume.title} onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/60 to-[#000000]/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] via-[#e07a5f] to-[var(--color-accent)]" />
        )}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 md:p-12 min-h-[200px] md:min-h-[220px]">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#ffffffcc] text-sm font-bold mb-2">
              <Rocket size={16} /> {lastResume ? "Continue where you left off" : "Welcome back, Explorer"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#fff] mb-3" style={{ fontFamily: "var(--font-display)" }}>
              {lastResume ? lastResume.title : "Continue Your Journey"}
            </h2>
            {lastResume ? (
              <div className="max-w-xs">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#ffffffb3] text-xs font-medium">Lesson {lastResume.currentLesson} · {lastResume.progress}% complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--color-accent)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${lastResume.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-[#ffffffcc] text-sm max-w-md">Start a new course and build your skills today</p>
            )}
          </div>
          <div className="flex gap-3">
            {lastResume && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${lastResume.id}`); }}
                className="flex items-center gap-2 bg-[#fff] text-[var(--color-accent)] px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform duration-300"
              >
                <PlayCircle size={18} /> Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: myCourses.length, icon: BookMarked, color: "var(--color-info)" },
          { label: "In Progress", value: inProgress.length, icon: Clock, color: "var(--color-warning)" },
          { label: "Completed", value: completedCourses.length, icon: CheckCircle, color: "var(--color-success)" },
          { label: "Saved", value: savedCourses.length, icon: Bookmark, color: "var(--color-accent)" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--color-background-secondary)] rounded-2xl p-4 border border-[var(--color-border-light)] flex items-center gap-4 hover:border-[var(--color-accent)]/20 transition-colors">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + "15", color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
              <p className="text-xs text-[var(--color-text-tertiary)] font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <BookMarked size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Courses</span>
          </h3>
        </div>

        <div className="mb-2 relative max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for courses, skills, or instructors..."
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
            className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "in-progress" as const, label: "In Progress", icon: Play },
            { id: "saved" as const, label: "Saved", icon: Bookmark },
            { id: "completed" as const, label: "Completed", icon: CheckCircle },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                tab === t.id
                  ? "bg-[var(--color-accent)] text-[#fff] shadow-md"
                  : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Age Segment Filter Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 mb-4 mt-2 px-1">
          {[
            { id: "All", icon: <Compass size={18} /> },
            { id: "Sproutlings (5–7)", icon: <Sprout size={18} /> },
            { id: "Saplings (7–14)", icon: <Sprout size={18} /> },
            { id: "Pathfinders (14–18)", icon: <Compass size={18} /> },
            { id: "Dreamers (18+)", icon: <Sparkles size={18} /> },
          ].map((segment) => (
            <button
              key={segment.id}
              onClick={() => setActiveAgeGroup(segment.id)}
              className={`relative flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-2xl text-[15px] font-bold transition-colors duration-500 group overflow-hidden ${
                activeAgeGroup === segment.id
                  ? "text-[#fff] shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
                  : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {activeAgeGroup === segment.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#d97a60] via-[var(--color-accent)] to-[#ff9e88] z-0 opacity-90"></div>
              )}
              <div className={`relative z-10 flex items-center gap-2 ${activeAgeGroup === segment.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
                {segment.icon}
                {segment.id}
              </div>
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
        >
          {(() => {
            const courses = tab === "saved" ? savedCourses : tab === "completed" ? completedCourses : inProgress;
            return courses.length > 0 ? courses.map((course) => (
              <motion.div
                variants={fadeUpItem}
                key={course.id}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] border-t-[3px] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out"
                    style={{ borderTopColor: getTopicColor(course.topics) }}
                onClick={() => navigate(`/playground/course/${course.id}`)}
              >
                <CoursePreviewPopover course={course} onEnroll={() => navigate(`/playground/course/${course.id}`)}>
                <div className="relative h-[180px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <img
                    src={course.image}
                    alt={course.title}
                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <div className="bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Signal size={12} /> {course.level}
                    </div>
                    <div className="bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Clock size={12} /> {course.duration}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                    className="absolute top-4 right-4 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart size={16} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-[#fff]"} />
                  </button>
                    <div className="absolute bottom-4 left-4 z-20 right-4">
                    <h4 className="text-[16px] font-bold text-[#ffffff] mb-1 line-clamp-2 leading-tight drop-shadow-md">
                      {course.title}
                    </h4>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>

                  <div className="flex items-center gap-2 mt-3">
                    <img src={course.instructorAvatar} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs text-[var(--color-text-secondary)]">{course.instructor}</span>
                  </div>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-[var(--color-warning)]" fill="currentColor" />
                    ))}
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      ({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {course.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                        style={{ backgroundColor: getTopicColor(course.topics) + "20", color: getTopicColor(course.topics) }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]">
                      <BarChart2 size={11} /> {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]">
                      <Clock size={11} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]">
                      <PlayCircle size={11} /> {course.lessons} lessons
                    </span>
                  </div>

                  {tab !== "saved" && (
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[14px] font-bold text-[var(--color-text-primary)]">
                          {course.progress}% complete
                        </span>
                        <span className="text-[12px] text-[var(--color-text-tertiary)] font-medium">
                          {course.completed}/{course.total} lessons
                        </span>
                      </div>
                      <div className="w-full h-[10px] rounded-full bg-[var(--color-border-light)] overflow-hidden shadow-inner">
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
                    <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
                      <Award size={16} className="text-[var(--color-success)] shrink-0" />
                      <span className="text-xs font-bold text-[var(--color-success)]">Course complete</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); alert(`Certificate for: ${course.title}`); }}
                        className="ml-auto text-xs font-bold text-[var(--color-success)] hover:underline"
                      >
                        View certificate
                      </button>
                    </div>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                      className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[#fff] text-[var(--color-text-primary)] py-3 rounded-xl text-[14px] font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)] active:scale-95"
                    >
                      {course.progress === 100 ? "View Certificate" : course.progress > 0 ? "Continue Learning" : "Start Course"}
                      <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-[opacity,transform]" />
                    </button>
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
    </div>
  );
}
