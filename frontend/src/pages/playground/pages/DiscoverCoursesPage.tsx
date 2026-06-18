import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sprout, Sparkles, Search, Bot, Code, Languages, Cat, DollarSign, Palette, Award, Heart, RefreshCw } from "lucide-react";
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
type ViewMode = "grid" | "list";
type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUPS: { id: AgeGroupFilterId; label: string; icon: JSX.Element }[] = [
  { id: "All", label: "All", icon: <Compass size={18} /> },
  { id: "Sproutlings (5-7 age)", label: "Sproutlings (5-7 age)", icon: <Sprout size={18} /> },
  { id: "Saplings (7-14 age)", label: "Saplings (7-14 age)", icon: <Sprout size={18} /> },
  { id: "Pathfinders (14-18 age)", label: "Pathfinders (14-18 age)", icon: <Compass size={18} /> },
  { id: "Dreamers (18+ age)", label: "Dreamers (18+ age)", icon: <Sparkles size={18} /> },
];

const AGE_GROUP_THEMES: Record<AgeGroupFilterId, {
  kicker: string; title: string; description: string; accent: string; activePill: string; wallpaper: string; panelClass: string; cardClass: string; imageOverlayClass: string; badgeClass: string; buttonClass: string; listClass: string;
}> = {
  All: {
    kicker: "Universal course library",
    title: "All learning paths",
    description: "Browse every course across age groups, goals and skill levels.",
    accent: "var(--color-accent)",
    activePill: "var(--color-accent)",
    wallpaper: "linear-gradient(135deg, rgba(232, 133, 106, 0.12) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(26, 24, 51, 0.02) 100%)",
    panelClass: "border-[var(--color-border-light)] bg-[var(--color-background-secondary)]",
    cardClass: "rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-md overflow-hidden",
    imageOverlayClass: "bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent opacity-60 group-hover:opacity-80",
    badgeClass: "rounded-lg border border-[#ffffff]/20 bg-[#ffffff]/10 text-[#ffffff]",
    buttonClass: "border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#fff] group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)]",
    listClass: "rounded-xl border border-l-[3px] border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
  "Sproutlings (5-7 age)": {
    kicker: "Playful quest path",
    title: "Tiny quests, bright wins",
    description: "Short playful lessons, cheerful progress cues and simple cards for early learners.",
    accent: "#58cc02",
    activePill: "linear-gradient(135deg, #1e5f18 0%, #58cc02 58%, #a8ef38 100%)",
    wallpaper: "linear-gradient(135deg, rgba(88, 204, 2, 0.18) 0%, rgba(255, 199, 44, 0.12) 60%, rgba(247, 255, 240, 0.9) 100%)",
    panelClass: "border-[#d7efc8] bg-[#f7fff0] text-[#27391c] shadow-[0_5px_0_#d7efc8]",
    cardClass: "rounded-[22px] border-2 border-[#d7efc8] bg-[#ffffff] shadow-[0_4px_0_#d7efc8] overflow-hidden",
    imageOverlayClass: "bg-gradient-to-t from-[#22480f]/85 via-[#22480f]/25 to-transparent opacity-75 group-hover:opacity-90",
    badgeClass: "rounded-xl border border-[#c8edb0] bg-[#f1ffe9] text-[#276900]",
    buttonClass: "border border-[#46a302] bg-[#58cc02] text-[#ffffff] shadow-[0_4px_0_#46a302] hover:bg-[#62df05] active:translate-y-0.5 active:shadow-[0_2px_0_#46a302]",
    listClass: "rounded-[20px] border-2 border-l-[6px] border-[#d7efc8] bg-[#ffffff] shadow-[0_4px_0_#d7efc8]",
  },
  "Saplings (7-14 age)": {
    kicker: "Build and explore",
    title: "Creative skill labs",
    description: "Hands-on beginner projects for curious learners moving from play into creation.",
    accent: "#14b8a6",
    activePill: "linear-gradient(135deg, #0f3f47 0%, #14b8a6 58%, #22d3ee 100%)",
    wallpaper: "linear-gradient(135deg, rgba(20, 184, 166, 0.18) 0%, rgba(34, 211, 238, 0.12) 60%, rgba(240, 253, 250, 0.9) 100%)",
    panelClass: "border-[#bdebe5] bg-[#f0fdfa] text-[#123f3c] shadow-[0_5px_0_#bdebe5]",
    cardClass: "rounded-[20px] border-2 border-[#bdebe5] bg-[#ffffff] shadow-[0_4px_0_#bdebe5] overflow-hidden",
    imageOverlayClass: "bg-gradient-to-t from-[#0f4f4b]/85 via-[#0f4f4b]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-xl border border-[#a7ece4] bg-[#ecfeff] text-[#0f766e]",
    buttonClass: "border border-[#0f766e] bg-[#14b8a6] text-[#ffffff] shadow-[0_4px_0_#0f766e] hover:bg-[#16cfc0] active:translate-y-0.5 active:shadow-[0_2px_0_#0f766e]",
    listClass: "rounded-[18px] border-2 border-l-[6px] border-[#bdebe5] bg-[#ffffff] shadow-[0_4px_0_#bdebe5]",
  },
  "Pathfinders (14-18 age)": {
    kicker: "Portfolio-ready growth",
    title: "Skill tracks for teen builders",
    description: "Focused courses with clearer career signals, project depth and measurable progress.",
    accent: "#6366f1",
    activePill: "linear-gradient(135deg, #27316f 0%, #6366f1 58%, #8b5cf6 100%)",
    wallpaper: "linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.12) 60%, rgba(245, 245, 255, 0.9) 100%)",
    panelClass: "border-[#d7d8ff] bg-[#f5f5ff] text-[#25265f] shadow-[0_5px_0_#d7d8ff]",
    cardClass: "rounded-[18px] border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-sm overflow-hidden",
    imageOverlayClass: "bg-gradient-to-t from-[#161840]/85 via-[#161840]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-lg border border-[#c9cbff] bg-[#eef0ff] text-[#4f46e5]",
    buttonClass: "border border-[#5558e8] bg-[#6366f1] text-[#ffffff] shadow-sm hover:bg-[#5558e8]",
    listClass: "rounded-[16px] border border-l-[5px] border-[#d7d8ff] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
  "Dreamers (18+ age)": {
    kicker: "Professional momentum",
    title: "Career-grade mastery",
    description: "Longer, deeper tracks for advanced upskilling and applied workplace readiness.",
    accent: "#f59e0b",
    activePill: "linear-gradient(135deg, #111827, #7c3aed)",
    wallpaper: "linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(124, 58, 237, 0.12) 60%, rgba(255, 248, 232, 0.9) 100%)",
    panelClass: "border-[#f5d99b] bg-[#fff8e8] text-[#4a3310] shadow-[0_5px_0_#f5d99b]",
    cardClass: "rounded-[16px] border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-sm overflow-hidden",
    imageOverlayClass: "bg-gradient-to-t from-[#2b1b06]/85 via-[#2b1b06]/20 to-transparent opacity-70 group-hover:opacity-90",
    badgeClass: "rounded-lg border border-[#f5d99b] bg-[#fff7ed] text-[#b45309]",
    buttonClass: "border border-[#d97706] bg-[#f59e0b] text-[#111827] shadow-sm hover:bg-[#fbbf24]",
    listClass: "rounded-[14px] border border-l-[5px] border-[#f5d99b] bg-[var(--color-background-secondary)] hover:shadow-md",
  },
};

const AGE_GROUP_GLOWS: Record<AgeGroupFilterId, string> = {
  All: "radial-gradient(circle at 50% -20%, rgba(232, 133, 106, 0.12), transparent 70%)",
  "Sproutlings (5-7 age)": "radial-gradient(circle at 50% -20%, rgba(88, 204, 2, 0.16), transparent 70%)",
  "Saplings (7-14 age)": "radial-gradient(circle at 50% -20%, rgba(20, 184, 166, 0.16), transparent 70%)",
  "Pathfinders (14-18 age)": "radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.16), transparent 70%)",
  "Dreamers (18+ age)": "radial-gradient(circle at 50% -20%, rgba(245, 158, 11, 0.16), transparent 70%)",
};

const CATEGORIES = [
  { name: "AI", icon: Bot },
  { name: "Coding", icon: Code },
  { name: "Languages", icon: Languages },
  { name: "Curious Kitty", icon: Cat },
  { name: "Finance", icon: DollarSign },
  { name: "Art", icon: Palette },
  { name: "Advanced Skills", icon: Award },
  { name: "Mental Health", icon: Heart },
];

const SORTS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "Most popular" },
  { id: "rating", label: "Highest rated" },
  { id: "newest", label: "Newest" },
  { id: "free", label: "Free first" },
];

export default function DiscoverCoursesPage() {
  const { courseQuery, activeAgeGroup, setActiveAgeGroup, savedIds, toggleSave, enrolledIds, courseAccess, setToastMessage } = usePlayground();
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
    return discoverCourses.filter(c => {
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
  }, [discoverCourses, courseQuery, activeAgeGroup, selectedLevels, selectedDurations, selectedRatings, selectedTopics, priceFilter]);

  const clearFilters = useCallback(() => {
    setSelectedLevels([]);
    setSelectedDurations([]);
    setSelectedRatings([]);
    setSelectedTopics([]);
    setPriceFilter("all");
  }, []);

  const hasFilters = selectedLevels.length > 0 || selectedDurations.length > 0 || selectedRatings.length > 0 || selectedTopics.length > 0 || priceFilter !== "all";

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
      <div className="flex flex-col gap-6 relative">
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

        {/* 1. Elevated Header Banner */}
        <div className="p-10 rounded-[24px] border border-[var(--color-border-light)] relative overflow-hidden shadow-lg z-10">
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
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
            style={{ 
              backgroundImage: `radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)`, 
              backgroundSize: '24px 24px' 
            }} 
          />

          <div className="relative z-20 flex flex-col gap-3 max-w-2xl">
            <span 
              className="text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1 bg-white/40 dark:bg-black/20 backdrop-blur-sm rounded-full w-fit shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-white/20" 
              style={{ color: activeTheme.accent }}
            >
              {activeTheme.kicker}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--color-text-primary)] drop-shadow-sm font-['OV_Soge'] leading-none">
              {activeTheme.title}
            </h1>
            <p className="text-sm md:text-base font-medium text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
              {activeTheme.description}
            </p>
          </div>
        </div>

        {/* 2. Category Quick Filters */}
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
                            ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/15"
                            : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                    }`}
                >
                  <Icon size={14} className="transition-transform duration-300 group-hover:scale-110" />
                  {cat.name}
                </button>
            );
          })}
        </div>

        {/* 3. Age Group Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((group) => {
            const isActive = activeAgeGroup === group.id;
            return (
              <button
                  key={group.id}
                  onClick={() => setActiveAgeGroup(group.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer group ${
                      isActive
                          ? "text-white shadow-md border-transparent"
                          : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  }`}
                  style={isActive ? { background: activeTheme.activePill } : {}}
              >
                <span className={`transition-transform duration-300 ${isActive ? "" : "group-hover:rotate-12"}`}>
                  {group.icon}
                </span>
                <span className="text-xs font-bold tracking-wide">{group.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Filter Bar */}
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

        {/* 5. Course Grid with Popovers */}
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
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
              <p className="font-bold text-[var(--color-text-primary)]">{error}</p>
              <button
                  onClick={() => void refreshCourses()}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white"
              >
                <RefreshCw size={16} /> Retry
              </button>
            </div>
        )}

        {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch auto-rows-fr">
              <AnimatePresence mode="popLayout">
                {displayCourses.map((course) => (
                    <motion.div
                        key={course.id}
                        layout
                        variants={slideInItem}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="h-full flex w-full"
                    >
                      <NetflixHoverCard
                        course={course}
                        onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                        onPreview={() => openPublicPreview(course.previewModuleId)}
                        onSave={() => toggleSave(course.id)}
                        isSaved={savedIds.includes(course.id)}
                        cardClass={activeTheme.cardClass}
                      />
                    </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {displayCourses.length === 0 && (
                  <div className="col-span-full py-12 text-center text-[var(--color-text-tertiary)] flex flex-col items-center">
                    <Search size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">No courses found</p>
                    <p className="text-sm">Try adjusting your filters or search query</p>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-[var(--color-accent)] font-bold hover:underline"
                        >
                          Clear all filters
                        </button>
                    )}
                  </div>
              )}
            </div>
        )}

      </div>
  );
}
