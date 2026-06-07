import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, X, Search, LayoutGrid, List, BookOpen, Compass, Sprout, Sparkles, Clock, Signal, BarChart2, PlayCircle, GraduationCap } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { useState, useMemo, useCallback } from "react";
import FilterBar from "../components/FilterBar";
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

const TOPIC_QUICK_FILTERS = ["Programming", "Data", "Design", "Video", "Excel", "Python", "Animation", "Languages"];

function formatStudents(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function DiscoverCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, enrollCourse, courseAccess } = usePlayground();
  const { allCourses, discoverCourses } = useCourses(courseQuery, enrolledIds, courseAccess);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const toggleArray = useCallback((setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }, []);

  const allTopics = useMemo(() => [...new Set(allCourses.flatMap(c => c.topics))], [allCourses]);
  const freeCount = useMemo(() => allCourses.filter(c => c.isFree).length, [allCourses]);

  const displayCourses = useMemo(() => {
    let filtered = discoverCourses.filter(c => {
      const queryMatch = !courseQuery ||
        c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
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
      const ratingMatch = !selectedRatings.length || selectedRatings.some(r => c.rating >= parseFloat(r));
      const topicMatch = !selectedTopics.length || c.topics.some(t => selectedTopics.includes(t));
      const freeMatch = priceFilter === "all" || (priceFilter === "free" ? c.isFree : !c.isFree);
      return queryMatch && ageMatch && levelMatch && durationMatch && ratingMatch && topicMatch && freeMatch;
    });

    switch (sortBy) {
      case "popular": filtered.sort((a, b) => b.enrollments - a.enrollments); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "newest": filtered.sort((a, b) => b.createdAt - a.createdAt); break;
      case "free": filtered.sort((a, b) => Number(b.isFree) - Number(a.isFree)); break;
    }
    return filtered;
  }, [discoverCourses, courseQuery, activeAgeGroup, selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter, sortBy]);

  const chips = useMemo(() => [
    ...selectedLevels.map(l => ({ label: l, onRemove: () => setSelectedLevels(selectedLevels.filter(v => v !== l)) })),
    ...selectedDurations.map(d => ({ label: d, onRemove: () => setSelectedDurations(selectedDurations.filter(v => v !== d)) })),
    ...selectedRatings.map(r => ({ label: `${r}+ stars`, onRemove: () => setSelectedRatings(selectedRatings.filter(v => v !== r)) })),
    ...selectedTopics.map(t => ({ label: t, onRemove: () => setSelectedTopics(selectedTopics.filter(v => v !== t)) })),
    ...(priceFilter !== "all" ? [{ label: priceFilter === "free" ? "Free" : "Paid", onRemove: () => setPriceFilter("all") }] : []),
  ], [selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter]);

  const clearFilters = useCallback(() => {
    setSelectedLevels([]); setSelectedDurations([]); setSelectedRatings([]);
    setSelectedTopics([]); setPriceFilter("all");
  }, []);

  const hasFilters = chips.length > 0;

  const renderStars = useCallback((rating: number, size = 12) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} className="text-[var(--color-warning)]" fill={i < Math.round(rating) ? "var(--color-warning)" : "none"} />
      ))}
    </div>
  ), []);

  const handleEnroll = useCallback((id: number, title: string) => {
    enrollCourse(id, title);
    navigate("/playground/my-courses");
  }, [enrollCourse, navigate]);

  const handleQuickTopic = useCallback((topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  }, []);

  return (
    <div className="flex flex-col gap-6">

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-background-secondary)] to-[var(--color-background-primary)] p-8 border border-[var(--color-border-light)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-info)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-accent)] font-bold mb-2">
              <Compass size={18} /> Discover
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Explore {allCourses.length} courses
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Find the perfect course for your goals — from programming and design to data science and languages.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{discoverCourses.length}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Available</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{allTopics.length}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Topics</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">{freeCount}</span>
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick topic pills */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
        {TOPIC_QUICK_FILTERS.map(topic => (
          <button
            key={topic}
            onClick={() => handleQuickTopic(topic)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedTopics.includes(topic)
                ? "bg-[var(--color-accent)] text-[#fff] shadow-md"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Search + controls row */}
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#d97a60] via-[var(--color-accent)] to-[#ff9e88] z-0 opacity-90" />
            )}
            <div className={`relative z-10 flex items-center gap-2 ${activeAgeGroup === g.id ? "" : "group-hover:text-[var(--color-accent)] transition-colors duration-300"}`}>
              <span className="shrink-0">{g.icon}</span>
              {g.label}
            </div>
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="relative z-50 isolation-isolate">
      <FilterBar
        selectedDurations={selectedDurations}
        toggleDuration={(v) => toggleArray(setSelectedDurations, v)}
        selectedLevels={selectedLevels}
        toggleLevel={(v) => toggleArray(setSelectedLevels, v)}
        selectedRatings={selectedRatings}
        toggleRating={(v) => toggleArray(setSelectedRatings, v)}
        selectedTopics={selectedTopics}
        toggleTopic={(v) => toggleArray(setSelectedTopics, v)}
        allTopics={allTopics}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={SORTS}
        totalCount={displayCourses.length}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />
      </div>

      {/* Active filter chips */}
      {hasFilters && (
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
        </div>
      )}

      {/* Course grid */}
          {displayCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                <BookOpen size={32} />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">No courses match your filters</p>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">Try adjusting your search or clearing filters</p>
              {(courseQuery || hasFilters) && (
                <button
                  onClick={() => { setCourseQuery(""); clearFilters(); }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[#fff] text-sm font-bold hover:brightness-110 transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                >
                  {displayCourses.map(course => (
                    <motion.div variants={fadeUpItem} key={course.id}>
                      <CoursePreviewPopover course={course} onEnroll={() => handleEnroll(course.id, course.title)}>
                        <div
                          className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] border-t-[3px] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-out"
                          style={{ borderTopColor: getTopicColor(course.topics) }}
                          onClick={() => navigate(`/playground/course/${course.id}`)}
                        >
                          <div className="relative h-[180px] w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <img
                              src={course.image}
                              alt={course.title}
                              loading="lazy"
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
                              {course.isFree && (
                                <div className="bg-[#22c55e]/80 backdrop-blur-md text-[#fff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider shadow-lg">FREE</div>
                              )}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                              className="absolute top-4 right-4 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            >
                              <Heart size={16} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-[#fff]"} />
                            </button>
                            <div className="absolute bottom-4 left-4 z-20 right-4">
                              <h4 className="text-[16px] font-bold text-[#ffffff] line-clamp-2 leading-tight drop-shadow-md">{course.title}</h4>
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
                              <span className="text-xs text-[var(--color-text-tertiary)]">({formatStudents(course.students)})</span>
                            </div>

                            <div className="flex items-center gap-3 mt-2 flex-wrap text-[11px] text-[var(--color-text-tertiary)]">
                              <span className="flex items-center gap-1"><BarChart2 size={12} /> {course.level}</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                              <span className="flex items-center gap-1"><PlayCircle size={12} /> {course.lessons} lessons</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {course.topics.slice(0, 3).map(topic => (
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
                              <div className="mt-3 flex items-baseline gap-2">
                                <span className="text-base font-bold text-[var(--color-text-primary)]">{course.price}</span>
                                {course.originalPrice && <span className="text-xs text-[var(--color-text-tertiary)] line-through">{course.originalPrice}</span>}
                                {course.originalPrice && (
                                  <span className="text-[10px] font-bold text-[var(--color-success)] bg-[var(--color-success)]/10 px-1.5 py-0.5 rounded">
                                    {Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, "")) / parseInt(course.originalPrice.replace(/[^0-9]/g, ""))) * 100)}% off
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="mt-auto pt-4">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleEnroll(course.id, course.title); }}
                                className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-[#fff] text-[var(--color-text-primary)] py-3 rounded-xl text-[14px] font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)] active:scale-95"
                              >
                                {course.isEnrolled ? "Continue Learning" : "Enroll now"} <GraduationCap size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CoursePreviewPopover>
                    </motion.div>
                  ))}
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
                  {displayCourses.map(course => (
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
                          loading="lazy"
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
                          <span className="text-[10px] text-[var(--color-text-tertiary)]">({formatStudents(course.students)})</span>
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
                          onClick={(e) => { e.stopPropagation(); handleEnroll(course.id, course.title); }}
                          className="px-4 py-2 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] text-[12px] font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-[#fff] hover:border-[var(--color-accent)] transition-colors whitespace-nowrap"
                        >
                          {course.isEnrolled ? "Continue" : "Enroll now"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
    </div>
  );
}
