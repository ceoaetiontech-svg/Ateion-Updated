import { motion } from "framer-motion";
import { Compass, ChevronRight, Heart, Star, Play, Share2, Sprout, Sparkles, Clock, Signal, ArrowUpDown, X, BarChart2, PlayCircle, Filter } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";
import { useState, useMemo } from "react";
import FilterSidebar from "../components/FilterSidebar";
import CoursePreviewPopover from "../components/CoursePreviewPopover";

type SortOption = "popular" | "rating" | "newest" | "duration";

export default function DiscoverCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave } = usePlayground();
  const { allCourses } = useCourses(courseQuery);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

  const allTopics = useMemo(() => [...new Set(allCourses.flatMap(c => c.topics))], [allCourses]);

  let displayCourses = allCourses.filter(c => {
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
    case "popular": displayCourses = [...displayCourses].sort((a, b) => b.students - a.students); break;
    case "rating": displayCourses = [...displayCourses].sort((a, b) => b.rating - a.rating); break;
    case "newest": displayCourses = [...displayCourses].sort((a, b) => b.createdAt - a.createdAt); break;
    case "duration": displayCourses = [...displayCourses].sort((a, b) => a.duration.localeCompare(b.duration)); break;
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Compass size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Discover Courses</span>
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative max-w-xl group focus-within:scale-[1.01] transition-transform duration-300 flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-tertiary)] group-focus-within:text-[var(--color-accent)] transition-colors group-focus-within:scale-110 group-focus-within:rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for new courses, skills, or instructors..."
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
            className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
          />
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-3.5 rounded-2xl border-2 transition-all ${
            sidebarOpen
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
          }`}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Age Group + Sort */}
      <div className="flex items-center justify-between">
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
              className={`relative flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-500 group overflow-hidden ${
                activeAgeGroup === segment.id
                  ? "text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] scale-105 border-transparent ring-4 ring-[var(--color-accent)]/10"
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
        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-[var(--color-text-tertiary)]" />
          {[
            { id: "popular" as SortOption, label: "Most popular" },
            { id: "rating" as SortOption, label: "Highest rated" },
            { id: "newest" as SortOption, label: "Newest" },
            { id: "duration" as SortOption, label: "Duration" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sortBy === opt.id
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-background-secondary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Chips */}
      {(() => {
        const chips: { label: string; onRemove: () => void }[] = [
          ...selectedLevels.map(l => ({ label: l, onRemove: () => setSelectedLevels(selectedLevels.filter(v => v !== l)) })),
          ...selectedDurations.map(d => ({ label: d, onRemove: () => setSelectedDurations(selectedDurations.filter(v => v !== d)) })),
          ...selectedRatings.map(r => ({ label: `${r} stars`, onRemove: () => setSelectedRatings(selectedRatings.filter(v => v !== r)) })),
          ...selectedTopics.map(t => ({ label: t, onRemove: () => setSelectedTopics(selectedTopics.filter(v => v !== t)) })),
          ...(showFreeOnly ? [{ label: "Free only", onRemove: () => setShowFreeOnly(false) }] : []),
        ];
        return chips.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 px-1">
            <span className="text-xs text-[var(--color-text-tertiary)] font-medium">Active filters:</span>
            {chips.map((chip) => (
              <span
                key={chip.label}
                className="flex items-center gap-1 text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-3 py-1.5 rounded-full font-semibold"
              >
                {chip.label}
                <X
                  size={12}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={chip.onRemove}
                />
              </span>
            ))}
            <button
              onClick={() => { setSelectedLevels([]); setSelectedDurations([]); setSelectedRatings([]); setSelectedTopics([]); setShowFreeOnly(false); }}
              className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] font-medium ml-1"
            >
              Clear all
            </button>
          </div>
        ) : null;
      })()}

      {/* Main Content: Sidebar + Grid */}
      <div className="flex gap-6">
        {sidebarOpen && (
          <div className="w-[220px] shrink-0">
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
              onClear={() => { setSelectedLevels([]); setSelectedDurations([]); setSelectedRatings([]); setSelectedTopics([]); setShowFreeOnly(false); }}
            />
          </div>
        )}

        {/* Discovery Course Grid */}
        <div className="flex-1 min-w-0">
          {displayCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Compass size={48} className="text-[var(--color-text-tertiary)] mb-4 opacity-40" />
              <p className="text-lg font-bold text-[var(--color-text-secondary)]">No courses match your filters</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Try adjusting your search or clearing filters</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {displayCourses.map((course) => (
                <motion.div
                  variants={fadeUpItem}
                  key={course.id}
                  className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] border-t-[3px] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
                  style={{ borderTopColor: getTopicColor(course.topics) }}
                  onClick={() => navigate(`/playground/course/${course.id}`)}
                >
                  <CoursePreviewPopover course={course} onEnroll={() => navigate(`/playground/course/${course.id}`)}>
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                        className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg"
                        title="Preview"
                      >
                        <Play size={18} className="fill-[#ffffff]" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                        className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg"
                        title="Save"
                      >
                        <Heart size={18} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : ""} />
                      </button>
                      <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Share">
                        <Share2 size={18} />
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                      <div className="bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                        <Signal size={12} /> {course.level}
                      </div>
                      {course.isFree && (
                        <div className="bg-[var(--color-success)]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider shadow-lg">
                          FREE
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                      className="absolute top-4 right-4 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Heart size={16} className={savedIds.includes(course.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                    <div className="absolute bottom-4 left-4 z-20 right-4">
                      <h4 className="text-[18px] font-bold text-[#ffffff] mb-1 line-clamp-2 leading-tight drop-shadow-md">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover border border-white/30" />
                        <span className="text-[12px] text-[#ffffff]/90 font-medium truncate">{course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating}</span>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="text-[var(--color-warning)]" fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"} />
                        ))}
                        <span className="text-xs text-[var(--color-text-tertiary)]">
                          ({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3 flex-wrap">
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

                    <p className="text-[13px] text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed flex-1">
                      Master {course.topics.slice(0, 2).join(" and ")} with hands-on projects and real-world applications in this {course.level.toLowerCase()} course.
                    </p>

                    <div className="mt-auto">
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                        className="w-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                      >
                        View Details
                        <ChevronRight size={16} className="transition-all" />
                      </button>
                    </div>
                  </div>
                </CoursePreviewPopover>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
