import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, X, Search, LayoutGrid, List, BookOpen, Compass, Sprout, Sparkles, Clock, Signal, BarChart2, PlayCircle, GraduationCap } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { useState, useMemo } from "react";
import FilterSidebar from "../components/FilterSidebar";
import CoursePreviewPopover from "../components/CoursePreviewPopover";

type SortOption = "popular" | "rating" | "newest" | "free";
type ViewMode = "grid" | "list";

const AGE_GROUPS = [
  { id: "All", label: "All", icon: <Compass size={18} /> },
  { id: "Sproutlings (5–7)", label: "Sproutlings (5–7)", icon: <Sprout size={18} /> },
  { id: "Saplings (7–14)", label: "Saplings (7–14)", icon: <Sprout size={18} /> },
  { id: "Pathfinders (14–18)", label: "Pathfinders (14–18)", icon: <Compass size={18} /> },
  { id: "Dreamers (18+)", label: "Dreamers (18+)", icon: <Sparkles size={18} /> },
];

const SORTS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "free", label: "Free first" },
];

export default function DiscoverCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, enrollCourse } = usePlayground();
  const { allCourses, discoverCourses } = useCourses(courseQuery, enrolledIds);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const allTopics = useMemo(() => [...new Set(allCourses.flatMap(c => c.topics))], [allCourses]);
  const freeCount = allCourses.filter(c => c.isFree).length;

  let displayCourses = discoverCourses.filter(c => {
    const queryMatch = c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(courseQuery.toLowerCase());
    const ageMatch = activeAgeGroup === "All" || c.level.includes(activeAgeGroup);
    const levelMatch = !selectedLevels.length || selectedLevels.some(l => c.level.includes(l));
    const durationMatch = !selectedDurations.length || selectedDurations.some(d => {
      const hours = parseInt(c.duration);
      if (isNaN(hours)) return true;
      if (d === "Under 1h") return hours < 1;
      if (d === "1–3h") return hours >= 1 && hours <= 3;
      if (d === "3–10h") return hours >= 3 && hours <= 10;
      if (d === "10h+") return hours >= 10;
      return true;
    });
    const ratingMatch = !selectedRatings.length || selectedRatings.some(r => {
      const threshold = parseFloat(r);
      return c.rating >= threshold;
    });
    const topicMatch = !selectedTopics.length || c.topics.some(t => selectedTopics.includes(t));
    const freeMatch = !showFreeOnly || c.isFree;
    return queryMatch && ageMatch && levelMatch && durationMatch && ratingMatch && topicMatch && freeMatch;
  });

  switch (sortBy) {
    case "popular": displayCourses = [...displayCourses].sort((a, b) => b.enrollments - a.enrollments); break;
    case "rating": displayCourses = [...displayCourses].sort((a, b) => b.rating - a.rating); break;
    case "newest": displayCourses = [...displayCourses].sort((a, b) => b.createdAt - a.createdAt); break;
    case "free": displayCourses = [...displayCourses].sort((a, b) => Number(b.isFree) - Number(a.isFree)); break;
  }

  const chips: { label: string; onRemove: () => void }[] = [
    ...selectedLevels.map(l => ({ label: l, onRemove: () => setSelectedLevels(selectedLevels.filter(v => v !== l)) })),
    ...selectedDurations.map(d => ({ label: d, onRemove: () => setSelectedDurations(selectedDurations.filter(v => v !== d)) })),
    ...selectedRatings.map(r => ({ label: `${r} stars`, onRemove: () => setSelectedRatings(selectedRatings.filter(v => v !== r)) })),
    ...selectedTopics.map(t => ({ label: t, onRemove: () => setSelectedTopics(selectedTopics.filter(v => v !== t)) })),
    ...(showFreeOnly ? [{ label: "Free only", onRemove: () => setShowFreeOnly(false) }] : []),
  ];

  const clearFilters = () => {
    setSelectedLevels([]); setSelectedDurations([]); setSelectedRatings([]);
    setSelectedTopics([]); setShowFreeOnly(false);
  };

  const renderStars = (rating: number, size = 12) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className="text-[var(--color-warning)]" fill={i < Math.round(rating) ? "var(--color-warning)" : "none"} />
      ))}
    </div>
  );

  const renderGridCard = (course: typeof allCourses[number]) => (
    <motion.div
      variants={fadeUpItem}
      key={course.id}
    >
    <CoursePreviewPopover course={course} onEnroll={() => { enrollCourse(course.id, course.title); navigate(`/playground/my-courses`); }}>
    <div
      className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] border-t-[3px] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out"
      style={{ borderTopColor: getTopicColor(course.topics) }}
      onClick={() => navigate(`/playground/course/${course.id}`)}
    >
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
          <h4 className="text-[16px] font-bold text-[#ffffff] line-clamp-2 leading-tight drop-shadow-md">
            {course.title}
          </h4>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
        <div className="flex items-center gap-2 mt-1">
          <img src={course.instructorAvatar} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs text-[var(--color-text-secondary)]">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating}</span>
          {renderStars(course.rating, 11)}
          <span className="text-xs text-[var(--color-text-tertiary)]">
            ({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap text-[11px] text-[var(--color-text-tertiary)]">
          <span className="flex items-center gap-1"><BarChart2 size={12} /> {course.level}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
          <span className="flex items-center gap-1"><PlayCircle size={12} /> {course.lessons} lessons</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
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

        {!course.isFree && course.price && (
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-[var(--color-text-primary)]">{course.price}</span>
            {course.originalPrice && <span className="text-[11px] text-[var(--color-text-tertiary)] line-through">{course.originalPrice}</span>}
          </div>
        )}
        <div className="mt-auto pt-4">
          <button
            onClick={(e) => { e.stopPropagation(); enrollCourse(course.id, course.title); navigate(`/playground/my-courses`); }}
            className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[#fff] text-[var(--color-text-primary)] py-3 rounded-xl text-[14px] font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)] active:scale-95"
          >
            {course.isEnrolled ? "Continue Learning" : "Enroll now"} <GraduationCap size={16} />
          </button>
        </div>
      </div>
    </div>
    </CoursePreviewPopover>
    </motion.div>
  );

  const renderListCard = (course: typeof allCourses[number]) => (
    <motion.div
      variants={fadeUpItem}
      key={course.id}
      className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] border-l-[3px] rounded-2xl flex gap-4 p-4 items-start hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 ease-out cursor-pointer"
      style={{ borderLeftColor: getTopicColor(course.topics) }}
      onClick={() => navigate(`/playground/course/${course.id}`)}
    >
      <div className="w-[100px] h-[72px] rounded-xl shrink-0 overflow-hidden bg-[var(--color-background-primary)]">
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight truncate">{course.title}</h4>
        <p className="text-[12px] text-[var(--color-text-tertiary)] truncate mt-0.5">
          {course.instructor} · {course.level} · {course.duration} · {course.lessons} lessons
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[11px] font-bold text-[var(--color-warning)]">{course.rating}</span>
          {renderStars(course.rating, 10)}
          <span className="text-[10px] text-[var(--color-text-tertiary)]">
            ({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        {course.isFree ? (
          <span className="text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-0.5 rounded-full">Free</span>
        ) : course.price && (
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-[var(--color-text-primary)]">{course.price}</span>
            {course.originalPrice && <span className="text-[10px] text-[var(--color-text-tertiary)] line-through">{course.originalPrice}</span>}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); enrollCourse(course.id, course.title); navigate(`/playground/my-courses`); }}
          className="px-4 py-2 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] text-[12px] font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-[#fff] hover:border-[var(--color-accent)] transition-colors whitespace-nowrap"
        >
          {course.isEnrolled ? "Continue" : "Enroll now"}
        </button>
      </div>
    </motion.div>
  );

  const statCounts = [
    { value: discoverCourses.length, label: "Available" },
    { value: allTopics.length, label: "Topics" },
    { value: freeCount, label: "Free" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
            <Compass size={28} className="text-[var(--color-accent)]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)]">
              Discover courses
            </span>
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1 ml-10">Expand your skills at your own pace</p>
        </div>
        <div className="flex items-center gap-6">
          {statCounts.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-bold text-[var(--color-text-primary)]">{s.value}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search + view toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-lg group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search courses, skills, instructors..."
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
            className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
          />
        </div>
        <div className="flex items-center gap-1 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[var(--color-background-primary)] text-[var(--color-accent)] shadow-sm" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Age group pills */}
      <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-1 px-0.5">
        {AGE_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveAgeGroup(g.id)}
            className={`relative flex items-center gap-2.5 whitespace-nowrap px-6 py-3 rounded-2xl text-[14px] font-bold transition-colors duration-500 group overflow-hidden ${
              activeAgeGroup === g.id
                ? "text-[#fff] shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-lg hover:-translate-y-1"
            }`}
          >
            {activeAgeGroup === g.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#d97a60] via-[var(--color-accent)] to-[#ff9e88] z-0 opacity-90"></div>
            )}
            <div className={`relative z-10 flex items-center gap-2 ${activeAgeGroup === g.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
              <span className="shrink-0">{g.icon}</span>
              {g.label}
            </div>
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="text-xs text-[var(--color-text-tertiary)] font-bold">Sort by</span>
        {SORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSortBy(s.id)}
            className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-colors ${
              sortBy === s.id
                ? "bg-[var(--color-accent)] text-[#fff] shadow-md"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-[var(--color-text-tertiary)]">{displayCourses.length} courses</span>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="flex items-center gap-1 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1.5 rounded-full font-bold"
            >
              {chip.label}
              <X size={12} className="cursor-pointer hover:scale-110 transition-transform" onClick={chip.onRemove} />
            </span>
          ))}
          <button onClick={clearFilters} className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] font-bold ml-1">Clear all</button>
        </div>
      )}

      {/* Main content: sidebar + grid/list */}
      <div className="flex gap-6">
        <div className="hidden lg:block w-[220px] shrink-0">
          <FilterSidebar
            selectedLevels={selectedLevels}
            toggleLevel={(v) => setSelectedLevels(toggleArray(selectedLevels, v))}
            selectedDurations={selectedDurations}
            toggleDuration={(v) => setSelectedDurations(toggleArray(selectedDurations, v))}
            selectedRatings={selectedRatings}
            toggleRating={(v) => setSelectedRatings(toggleArray(selectedRatings, v))}
            showFreeOnly={showFreeOnly}
            setShowFreeOnly={setShowFreeOnly}
            selectedTopics={selectedTopics}
            toggleTopic={(v) => setSelectedTopics(toggleArray(selectedTopics, v))}
            allTopics={allTopics}
            onClear={clearFilters}
          />
        </div>

        <div className="flex-1 min-w-0">
          {displayCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                <BookOpen size={32} />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">No courses match your filters</p>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">Try adjusting your search or clearing filters</p>
              {courseQuery && (
                <button onClick={() => setCourseQuery("")} className="mt-4 text-sm font-bold text-[var(--color-accent)] hover:underline">Clear search</button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              >
                {displayCourses.map(renderGridCard)}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                className="flex flex-col gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              >
                {displayCourses.map(renderListCard)}
              </motion.div>
            )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
