import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sprout, Sparkles, Search, Bot, Code, Languages, Cat, DollarSign, Palette, Award, Heart, RefreshCw, Play, Info, ArrowRight, Star, User } from "lucide-react";
import type { AgeGroupId } from "../shared/types";
import { slideInItem } from "../shared/types";
import { courseMatchesAgeGroup, normalizeAgeGroupId } from "../shared/courseAgeGroups";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { useState, useMemo, useCallback } from "react";
import FilterBar from "../components/FilterBar";
import NetflixHoverCard from "../components/NetflixHoverCard";

type SortOption = "popular" | "rating" | "newest" | "free";
type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUPS: { id: AgeGroupFilterId; label: string; icon: JSX.Element }[] = [
  { id: "All", label: "All Ages", icon: <Compass size={16} /> },
  { id: "Sproutlings (5-7 age)", label: "Sproutlings (5-7)", icon: <Sprout size={16} /> },
  { id: "Saplings (7-14 age)", label: "Saplings (7-14)", icon: <Sprout size={16} /> },
  { id: "Pathfinders (14-18 age)", label: "Pathfinders (14-18)", icon: <Compass size={16} /> },
  { id: "Dreamers (18+ age)", label: "Dreamers (18+)", icon: <Sparkles size={16} /> },
];

const AGE_GROUP_THEMES: Record<AgeGroupFilterId, {
  kicker: string; title: string; description: string; accent: string; activePill: string; wallpaper: string;
}> = {
  All: {
    kicker: "Universal course library",
    title: "All learning paths",
    description: "Browse every course across age groups, goals and skill levels.",
    accent: "var(--color-accent)",
    activePill: "var(--color-accent)",
    wallpaper: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(232, 133, 106, 0.05) 50%, var(--color-background-secondary) 100%)",
  },
  "Sproutlings (5-7 age)": {
    kicker: "Playful quest path",
    title: "Tiny quests, bright wins",
    description: "Short playful lessons, cheerful progress cues and simple cards for early learners.",
    accent: "#58cc02",
    activePill: "linear-gradient(135deg, #1e5f18 0%, #58cc02 58%, #a8ef38 100%)",
    wallpaper: "linear-gradient(135deg, rgba(88, 204, 2, 0.1) 0%, rgba(255, 199, 44, 0.05) 60%, var(--color-background-secondary) 100%)",
  },
  "Saplings (7-14 age)": {
    kicker: "Build and explore",
    title: "Creative skill labs",
    description: "Hands-on beginner projects for curious learners moving from play into creation.",
    accent: "#14b8a6",
    activePill: "linear-gradient(135deg, #0f3f47 0%, #14b8a6 58%, #22d3ee 100%)",
    wallpaper: "linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(34, 211, 238, 0.05) 60%, var(--color-background-secondary) 100%)",
  },
  "Pathfinders (14-18 age)": {
    kicker: "Portfolio-ready growth",
    title: "Skill tracks for teen builders",
    description: "Focused courses with clearer career signals, project depth and measurable progress.",
    accent: "#6366f1",
    activePill: "linear-gradient(135deg, #27316f 0%, #6366f1 58%, #8b5cf6 100%)",
    wallpaper: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 60%, var(--color-background-secondary) 100%)",
  },
  "Dreamers (18+ age)": {
    kicker: "Professional momentum",
    title: "Career-grade mastery",
    description: "Longer, deeper tracks for advanced upskilling and applied workplace readiness.",
    accent: "#f59e0b",
    activePill: "linear-gradient(135deg, #111827 0%, #7c3aed 100%)",
    wallpaper: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(124, 58, 237, 0.05) 60%, var(--color-background-secondary) 100%)",
  },
};

const AGE_GROUP_GLOWS: Record<AgeGroupFilterId, string> = {
  All: "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.08), transparent 70%)",
  "Sproutlings (5-7 age)": "radial-gradient(circle at 50% -20%, rgba(88, 204, 2, 0.08), transparent 70%)",
  "Saplings (7-14 age)": "radial-gradient(circle at 50% -20%, rgba(20, 184, 166, 0.08), transparent 70%)",
  "Pathfinders (14-18 age)": "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.08), transparent 70%)",
  "Dreamers (18+ age)": "radial-gradient(circle at 50% -20%, rgba(245, 158, 11, 0.08), transparent 70%)",
};

const CATEGORIES = [
  { name: "AI", icon: Bot, desc: "Build agentic flows and master deep learning models." },
  { name: "Coding", icon: Code, desc: "Learn to build, deploy, and scale robust applications." },
  { name: "Languages", icon: Languages, desc: "Unlock cross-border communication and multilingual mastery." },
  { name: "Curious Kitty", icon: Cat, desc: "Stimulate curiosity and learn fun new topics." },
  { name: "Finance", icon: DollarSign, desc: "Understand investing, budgets, and microeconomics." },
  { name: "Art", icon: Palette, desc: "Express visual ideas, learn UI/UX design, and color theory." },
  { name: "Advanced Skills", icon: Award, desc: "Accelerate your path with production-ready certifications." },
  { name: "Mental Health", icon: Heart, desc: "Focus on mindset shifts, mindfulness, and growth psychology." },
];

const SORTS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "free", label: "Free first" },
];

export default function DiscoverCoursesPage() {
  const { courseQuery, setCourseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, courseAccess, setToastMessage } = usePlayground();
  const guestEnrolledIds = localStorage.getItem("token") ? enrolledIds : [];
  const { allCourses, discoverCourses, isLoading, isWaking, error, refreshCourses } = useCourses(courseQuery, guestEnrolledIds, courseAccess);
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const normalizedAgeGroup = normalizeAgeGroupId(activeAgeGroup) as AgeGroupFilterId;
  const activeTheme = AGE_GROUP_THEMES[normalizedAgeGroup] ?? AGE_GROUP_THEMES.All;

  const toggleArray = useCallback((setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }, []);

  const allTopics = useMemo(() => [...new Set(allCourses.flatMap(c => c.topics))], [allCourses]);

  const displayCourses = useMemo(() => {
    let list = discoverCourses.filter(c => {
      const queryMatch = !courseQuery || c.title.toLowerCase().includes(courseQuery.toLowerCase()) || c.instructor.toLowerCase().includes(courseQuery.toLowerCase());
      const ageMatch = courseMatchesAgeGroup(c, activeAgeGroup);
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

    if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => b.id - a.id);
    } else if (sortBy === "free") {
      list = [...list].sort((a, b) => (a.isFree === b.isFree ? 0 : a.isFree ? -1 : 1));
    }

    return list;
  }, [discoverCourses, courseQuery, activeAgeGroup, selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter, sortBy]);

  const clearFilters = useCallback(() => {
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedRatings([]);
    setSelectedTopics([]);
    setPriceFilter("all");
  }, []);

  const hasFilters = selectedLevels.length > 0 || selectedDurations.length > 0 || selectedRatings.length > 0 || selectedTopics.length > 0 || priceFilter !== "all";

  const isSearchingOrFiltering = courseQuery.trim() !== "" || hasFilters;

  // Extract dynamic instructors list from discoverCourses to populate Unacademy-style educators lane
  const dynamicInstructors = useMemo(() => {
    const map = new Map<string, { name: string; avatar: string; coursesCount: number; maxRating: number }>();
    for (const c of discoverCourses) {
      const existing = map.get(c.instructor) || { name: c.instructor, avatar: c.instructorAvatar, coursesCount: 0, maxRating: 0 };
      existing.coursesCount += 1;
      existing.maxRating = Math.max(existing.maxRating, c.rating);
      map.set(c.instructor, existing);
    }
    return [...map.values()].slice(0, 5); // limit to top 5
  }, [discoverCourses]);

  const openProtectedCourse = useCallback((courseId: number, previewModuleId?: number | null) => {
    if (previewModuleId) {
      navigate(`/course-preview/${previewModuleId}`);
      return;
    }
    if (!localStorage.getItem("token")) {
      window.dispatchEvent(new CustomEvent("open-login"));
      return;
    }
    navigate(`/playground/course/${courseId}`);
  }, [navigate]);

  const openPublicPreview = useCallback((previewModuleId: number | null) => {
    if (previewModuleId) {
      navigate(`/course-preview/${previewModuleId}`);
      return;
    }

    setToastMessage("A preview is not available for this course yet.");
    window.setTimeout(() => setToastMessage(null), 3000);
  }, [navigate, setToastMessage]);

  return (
      <div className="flex flex-col gap-8 relative text-[var(--color-text-primary)]">
        {/* Immersive ambient glow backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" style={{ minHeight: '1200px' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeAgeGroup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] blur-[140px]"
              style={{ background: AGE_GROUP_GLOWS[normalizedAgeGroup] ?? AGE_GROUP_GLOWS.All }}
            />
          </AnimatePresence>
        </div>

        {/* 1. Standalone Elevated Welcome Banner */}
        <div className="p-8 md:p-12 rounded-[24px] border border-[var(--color-border-light)] relative overflow-hidden shadow-lg z-10 text-left flex flex-col justify-center gap-2">
          {/* Wallpaper Crossfade Background */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeAgeGroup}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{ background: activeTheme.wallpaper }}
              />
            </AnimatePresence>
          </div>

          {/* Decorative floating blur mesh circles */}
          <div className="absolute top-[-10%] left-[-5%] w-[250px] h-[250px] rounded-full bg-white/10 dark:bg-white/5 blur-[70px] animate-pulse pointer-events-none duration-[10s] z-10" />
          <div className="absolute bottom-[-20%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[var(--color-accent)]/10 blur-[80px] animate-pulse pointer-events-none duration-[7s] z-10" />
          
          {/* Subtle pattern grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none z-10" 
            style={{ 
              backgroundImage: `radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)`, 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-20 flex flex-col gap-3 max-w-2xl w-full">
            <span 
              className="text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-full w-fit shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white/20" 
              style={{ color: activeTheme.accent }}
            >
              {activeTheme.kicker}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--color-text-primary)] font-['OV_Soge'] leading-none">
              {activeTheme.title}
            </h1>
            <p className="text-sm md:text-base font-medium text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
              {activeTheme.description}
            </p>
          </div>
        </div>

        {/* 2. Apple-Style Centered Search */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="relative max-w-xl w-full group">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-accent)] transition-colors" />
            <input
              type="text"
              value={courseQuery}
              onChange={(e) => setCourseQuery(e.target.value)}
              placeholder="Search by title, instructor or topic..."
              className="w-full pl-12 pr-16 py-4 rounded-full border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/80 text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:bg-[var(--color-background-secondary)] focus:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.1)] backdrop-blur-xl"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50 text-[9px] text-[var(--color-text-tertiary)] font-bold pointer-events-none uppercase tracking-wider hidden sm:block">
              Ctrl K
            </div>
          </div>
        </div>

        {/* 3. Glassmorphic Age Group Filters with Accent Border Glow */}
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] text-left">
            Age Segments
          </h3>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map((group) => {
              const isActive = activeAgeGroup === group.id;
              const themeForGroup = AGE_GROUP_THEMES[group.id] ?? AGE_GROUP_THEMES.All;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveAgeGroup(group.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer group bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)]`}
                  style={isActive ? { 
                    borderColor: themeForGroup.accent,
                    boxShadow: `0 0 12px ${themeForGroup.accent}30`,
                    background: `${themeForGroup.accent}15`,
                    color: "var(--color-text-primary)"
                  } : {}}
                >
                  <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:rotate-12"}`} style={{ color: themeForGroup.accent }}>
                    {group.icon}
                  </span>
                  <span className="text-xs font-bold tracking-wide">{group.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Glassmorphic Category Filter Capsules */}
        <div className="relative z-10 flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] text-left">
            Quick Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedTopics.includes(cat.name);
              return (
                  <button
                      key={cat.name}
                      onClick={() => toggleArray(setSelectedTopics, cat.name)}
                      className={`px-4 py-2 rounded-full border text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-[1.04] active:scale-[0.96] group ${
                          isSelected
                              ? "bg-[var(--color-accent)]/15 text-[var(--color-text-primary)] border-[var(--color-accent)] shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.2)]"
                              : "bg-[var(--color-background-secondary)]/65 text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
                      }`}
                  >
                    <Icon size={14} className="transition-transform duration-300 group-hover:scale-110 text-[var(--color-accent)]" />
                    {cat.name}
                  </button>
              );
            })}
          </div>
        </div>

        {/* 5. Sticky Filter Bar Dropdowns */}
        <div className="relative z-20">
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
              setSortBy={(v) => setSortBy(v as SortOption)}
              sortOptions={SORTS}
              totalCount={displayCourses.length}
              onClear={clearFilters}
              hasFilters={hasFilters}
          />
        </div>

        {/* 6. Main Content Area */}
        <div className="relative z-10">
          {isLoading && (
              <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-6 py-10 text-center">
                <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
                <p className="font-bold text-[var(--color-text-primary)]">
                  {isWaking ? "The course server is waking up…" : "Loading courses…"}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {isWaking
                      ? "The first request can take longer on Render's free tier."
                      : "Fetching the latest courses from the database."}
                </p>
              </div>
          )}

          {!isLoading && error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center text-red-500">
                <p className="font-bold">{error}</p>
                <button
                    onClick={() => void refreshCourses()}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white cursor-pointer"
                >
                  <RefreshCw size={16} /> Retry
                </button>
              </div>
          )}

          {!isLoading && !error && (
              <div className="space-y-12">
                <AnimatePresence mode="popLayout">
                  {isSearchingOrFiltering ? (
                    // SEARCH RESULT GRID VIEW (Udemy search behavior)
                    <motion.div
                      key="grid-results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-left flex items-center gap-2">
                        <Compass size={20} className="text-[var(--color-accent)]" /> 
                        Search Results ({displayCourses.length})
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch auto-rows-fr">
                        {displayCourses.map((course) => (
                          <motion.div
                            key={course.id}
                            layout
                            className="h-full flex w-full"
                          >
                            <NetflixHoverCard
                              course={course}
                              onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                              onPreview={() => openPublicPreview(course.previewModuleId)}
                              onSave={() => toggleSave(course.id)}
                              isSaved={savedIds.includes(course.id)}
                              cardClass="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md overflow-hidden"
                            />
                          </motion.div>
                        ))}
                      </div>

                      {displayCourses.length === 0 && (
                        <div className="py-12 text-center text-[var(--color-text-tertiary)] flex flex-col items-center">
                          <Search size={48} className="mb-4 opacity-20" />
                          <p className="text-lg font-medium">No courses found</p>
                          <p className="text-sm">Try adjusting your filters or search query</p>
                          <button
                            onClick={clearFilters}
                            className="mt-4 text-[var(--color-accent)] font-bold hover:underline cursor-pointer"
                          >
                            Clear all filters
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    // CATEGORY LANES VIEW (Udemy default home shelf logic)
                    <motion.div
                      key="lanes-browse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-12"
                    >
                      {/* Lane 1: Technology & Coding */}
                      {displayCourses.filter(c => c.topics.includes("Coding")).length > 0 && (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-display flex items-center gap-2">
                                <Code size={20} className="text-[#14b8a6]" />
                                Coding & Logic Quests
                              </h3>
                              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Learn to build, deploy, and scale robust applications.</p>
                            </div>
                            <button
                              onClick={() => setSelectedTopics(["Coding"])}
                              className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              See all <ArrowRight size={14} />
                            </button>
                          </div>
                          
                          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
                            {displayCourses.filter(c => c.topics.includes("Coding")).slice(0, 4).map((course) => (
                              <div key={course.id} className="w-72 shrink-0 snap-start h-full">
                                <NetflixHoverCard
                                  course={course}
                                  onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                                  onPreview={() => openPublicPreview(course.previewModuleId)}
                                  onSave={() => toggleSave(course.id)}
                                  isSaved={savedIds.includes(course.id)}
                                  cardClass="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md overflow-hidden"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lane 2: AI & Future Skills */}
                      {displayCourses.filter(c => c.topics.includes("AI")).length > 0 && (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-display flex items-center gap-2">
                                <Bot size={20} className="text-[#e8856a]" />
                                Trending in Artificial Intelligence
                              </h3>
                              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Build agentic workflows and master deep learning models.</p>
                            </div>
                            <button
                              onClick={() => setSelectedTopics(["AI"])}
                              className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              See all <ArrowRight size={14} />
                            </button>
                          </div>
                          
                          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
                            {displayCourses.filter(c => c.topics.includes("AI")).slice(0, 4).map((course) => (
                              <div key={course.id} className="w-72 shrink-0 snap-start h-full">
                                <NetflixHoverCard
                                  course={course}
                                  onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                                  onPreview={() => openPublicPreview(course.previewModuleId)}
                                  onSave={() => toggleSave(course.id)}
                                  isSaved={savedIds.includes(course.id)}
                                  cardClass="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md overflow-hidden"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Unacademy-Style Top Educators Shelf */}
                      {dynamicInstructors.length > 0 && (
                        <div className="p-6 md:p-8 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50 backdrop-blur-md relative overflow-hidden flex flex-col gap-6">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-accent)]/5 rounded-bl-full blur-xl pointer-events-none" />
                          
                          <div>
                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-display flex items-center gap-2">
                              <Sparkles size={20} className="text-amber-500" />
                              Learn from Top Educators
                            </h3>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Highly rated specialists pushing the boundaries of technology, business and creative design.</p>
                          </div>

                          <div className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar snap-x">
                            {dynamicInstructors.map((edu) => (
                              <div 
                                key={edu.name} 
                                className="w-64 shrink-0 snap-start p-5 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:border-[var(--color-accent)]/40 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-3 group"
                              >
                                <div className="relative">
                                  <img 
                                    src={edu.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
                                    alt={edu.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--color-border-medium)] group-hover:border-[var(--color-accent)] transition-colors duration-300"
                                  />
                                  <span className="absolute -bottom-1.5 -right-1 px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-extrabold rounded-md flex items-center gap-0.5 shadow-sm">
                                    <Star size={8} fill="currentColor" /> {edu.maxRating.toFixed(1)}
                                  </span>
                                </div>
                                <div className="min-w-0 w-full mt-1">
                                  <h4 className="text-sm font-bold text-[var(--color-text-primary)] truncate">{edu.name}</h4>
                                  <p className="text-[10px] text-[var(--color-text-tertiary)] font-semibold uppercase mt-0.5 tracking-wider">Ateion Instructor</p>
                                </div>
                                <div className="mt-2 w-full pt-3 border-t border-[var(--color-border-light)]/60 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                                  <span>{edu.coursesCount} Courses</span>
                                  <span className="text-[var(--color-accent)] font-bold group-hover:underline flex items-center gap-0.5 cursor-pointer">
                                    Profile <ArrowRight size={10} />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lane 3: Languages & Arts */}
                      {(displayCourses.filter(c => c.topics.includes("Languages")).length > 0 || displayCourses.filter(c => c.topics.includes("Art")).length > 0) && (
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-display flex items-center gap-2">
                                <Languages size={20} className="text-[#58cc02]" />
                                Languages & Global Arts
                              </h3>
                              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Explore creative aesthetics, languages, and cross-cultural communication.</p>
                            </div>
                            <button
                              onClick={() => setSelectedTopics(["Languages", "Art"])}
                              className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              See all <ArrowRight size={14} />
                            </button>
                          </div>
                          
                          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
                            {displayCourses.filter(c => c.topics.includes("Languages") || c.topics.includes("Art")).slice(0, 4).map((course) => (
                              <div key={course.id} className="w-72 shrink-0 snap-start h-full">
                                <NetflixHoverCard
                                  course={course}
                                  onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                                  onPreview={() => openPublicPreview(course.previewModuleId)}
                                  onSave={() => toggleSave(course.id)}
                                  isSaved={savedIds.includes(course.id)}
                                  cardClass="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md overflow-hidden"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          )}
        </div>
      </div>
  );
}
