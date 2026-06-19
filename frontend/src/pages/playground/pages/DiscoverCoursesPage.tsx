import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sprout, Sparkles, Search, Bot, Code, Languages, Cat, DollarSign, Palette, Award, Heart, RefreshCw } from "lucide-react";
import type { AgeGroupId } from "../shared/types";
import { slideInItem, staggerContainer, fadeUpItem } from "../shared/types";
import { courseMatchesAgeGroup, normalizeAgeGroupId } from "../shared/courseAgeGroups";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { useState, useMemo, useCallback } from "react";
import FilterBar from "../components/FilterBar";
import CoursePreviewPopover from "../components/CoursePreviewPopover";
import CoursePreviewCard from "../components/CoursePreviewCard";

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

const ALL_THEME = {
  kicker: "Universal course library",
  title: "All learning paths",
  description: "Browse every course across age groups, goals and skill levels.",
  accent: "var(--color-accent)",
  activePill: "var(--color-accent)",
  wallpaper: "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)",
  panelClass: "border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] shadow-sm",
  cardClass: "rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:border-[var(--color-accent)]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 relative",
  imageOverlayClass: "bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent opacity-60 group-hover:opacity-80",
  badgeClass: "rounded-lg border border-[#ffffff]/20 bg-[#ffffff]/10 text-[#ffffff]",
  buttonClass: "border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#fff] group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)]",
  listClass: "rounded-xl border border-l-[3px] border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:shadow-md",
};

const AGE_GROUP_THEMES: Record<AgeGroupFilterId, typeof ALL_THEME> = {
  All: ALL_THEME,
  "Sproutlings (5-7 age)": ALL_THEME,
  "Saplings (7-14 age)": ALL_THEME,
  "Pathfinders (14-18 age)": ALL_THEME,
  "Dreamers (18+ age)": ALL_THEME,
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

const CATEGORY_THEMES: Record<string, { gradient: string; color: string; shadow: string }> = {
  "AI": { 
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(217, 70, 239, 0.08) 100%)", 
    color: "#a78bfa", 
    shadow: "rgba(139, 92, 246, 0.25)" 
  },
  "Coding": { 
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)", 
    color: "#60a5fa", 
    shadow: "rgba(59, 130, 246, 0.25)" 
  },
  "Languages": { 
    gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(239, 68, 68, 0.08) 100%)", 
    color: "#fb923c", 
    shadow: "rgba(249, 115, 22, 0.25)" 
  },
  "Curious Kitty": { 
    gradient: "linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)", 
    color: "#facc15", 
    shadow: "rgba(234, 179, 8, 0.25)" 
  },
  "Finance": { 
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.08) 100%)", 
    color: "#34d399", 
    shadow: "rgba(16, 185, 129, 0.25)" 
  },
  "Art": { 
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(244, 63, 94, 0.08) 100%)", 
    color: "#f472b6", 
    shadow: "rgba(236, 72, 153, 0.25)" 
  },
  "Advanced Skills": { 
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)", 
    color: "#818cf8", 
    shadow: "rgba(99, 102, 241, 0.25)" 
  },
  "Mental Health": { 
    gradient: "linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(34, 197, 94, 0.08) 100%)", 
    color: "#2dd4bf", 
    shadow: "rgba(13, 148, 136, 0.25)" 
  },
};

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

  const getCategoryCount = useCallback((catName: string) => {
    return allCourses.filter(c => 
      c.topics.some(t => t.toLowerCase() === catName.toLowerCase())
    ).length;
  }, [allCourses]);

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

  const openProtectedCourse = useCallback((courseId: number) => {
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
      <motion.div
        className="space-y-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* 1. Dynamic Header Banner */}
        <motion.div 
          variants={fadeUpItem}
          className={`p-8 rounded-3xl ${activeTheme.panelClass} relative overflow-hidden transition-all duration-300`} 
          style={{ background: activeTheme.wallpaper }}
        >
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: activeTheme.accent }}>
              {activeTheme.kicker}
            </span>
            <h1 
              className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight font-display" 
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeTheme.title}
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl leading-relaxed">
              {activeTheme.description}
            </p>
          </div>
        </motion.div>

        {/* 2. Visual Glassmorphic Category Pills */}
        <motion.div 
          variants={fadeUpItem} 
          className="flex md:flex-wrap gap-3 overflow-x-auto md:overflow-x-visible pb-2.5 md:pb-0 snap-x snap-mandatory scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedTopics.includes(cat.name);
            const count = getCategoryCount(cat.name);
            const theme = CATEGORY_THEMES[cat.name] || CATEGORY_THEMES.Coding;

            return (
              <motion.button
                key={cat.name}
                onClick={() => toggleArray(setSelectedTopics, cat.name)}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={isSelected ? {
                  boxShadow: [`0 0 8px ${theme.shadow}`, `0 0 16px ${theme.shadow}`, `0 0 8px ${theme.shadow}`],
                  borderColor: theme.color,
                  background: theme.gradient,
                } : {
                  boxShadow: "0 2px 4px rgba(0,0,0,0.01)",
                  borderColor: "var(--color-border-light)",
                  background: "var(--color-background-secondary)",
                }}
                transition={isSelected ? {
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  },
                  borderColor: { duration: 0.2 },
                  background: { duration: 0.2 }
                } : { duration: 0.2 }}
                className={`snap-start shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-full border cursor-pointer transition-colors duration-200 outline-none backdrop-blur-md`}
              >
                {/* Left: Icon */}
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
                  style={{
                    backgroundColor: isSelected ? `${theme.color}25` : "var(--color-background-tertiary)",
                    color: isSelected ? theme.color : "var(--color-text-secondary)",
                  }}
                >
                  <Icon size={14} className="transition-transform group-hover:scale-110" />
                </div>

                {/* Center: Title */}
                <span 
                  className="text-xs font-bold transition-colors duration-200 truncate"
                  style={{ color: isSelected ? theme.color : "var(--color-text-primary)" }}
                >
                  {cat.name}
                </span>

                {/* Right: Count Badge */}
                <span 
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: isSelected ? `${theme.color}20` : "var(--color-background-tertiary)",
                    color: isSelected ? theme.color : "var(--color-text-tertiary)",
                  }}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>


        {/* 3. Age Group Tabs - Sleek & Modern Tab Pill Design */}
        <motion.div variants={fadeUpItem} className="flex gap-2.5 flex-wrap">
          {AGE_GROUPS.map((group) => {
            const isActive = activeAgeGroup === group.id;
            return (
                <button
                    key={group.id}
                    onClick={() => setActiveAgeGroup(group.id)}
                    style={isActive ? { background: activeTheme.activePill } : {}}
                    className={`px-4.5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                        isActive
                            ? "text-white shadow-md shadow-[var(--color-accent_light)] border-transparent"
                            : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-accent)]"
                    }`}
                >
                  <span className={`opacity-85 transition-transform ${isActive ? "scale-110" : ""}`}>{group.icon}</span>
                  <span>{group.label}</span>
                </button>
            );
          })}
        </motion.div>

        {/* 4. Filter Bar */}
        <motion.div variants={fadeUpItem}>
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
        </motion.div>

        {/* 5. Course Grid with Popovers */}
        {isLoading && (
            <motion.div variants={fadeUpItem} className="rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
              <p className="font-bold text-[var(--color-text-primary)] text-lg">
                {isWaking ? "The course server is waking up…" : "Loading courses…"}
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {isWaking
                    ? "The first request can take longer on Render's free tier."
                    : "Fetching the latest courses from the database."}
              </p>
            </motion.div>
        )}

        {!isLoading && error && (
            <motion.div variants={fadeUpItem} className="rounded-3xl border border-red-500/20 bg-red-500/5 px-6 py-12 text-center shadow-sm">
              <p className="font-bold text-[var(--color-text-primary)] text-lg">{error}</p>
              <button
                  onClick={() => void refreshCourses()}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                <RefreshCw size={16} /> Retry
              </button>
            </motion.div>
        )}

        {!isLoading && !error && (
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch auto-rows-fr"
            >
              <AnimatePresence mode="popLayout">
                {displayCourses.map((course) => (
                    <motion.div
                        key={course.id}
                        layout
                        variants={fadeUpItem}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="h-full flex w-full"
                    >
                      <CoursePreviewPopover
                          course={course}
                          onReadMore={() => openProtectedCourse(course.id)}
                          onPreview={() => openPublicPreview(course.previewModuleId)}
                          onSave={() => toggleSave(course.id)}
                          isSaved={savedIds.includes(course.id)}
                      >
                        <div
                            onClick={() => openProtectedCourse(course.id)}
                            className={`w-full cursor-pointer h-full transition-transform hover:-translate-y-1 flex flex-col group ${activeTheme.cardClass}`}
                        >
                          <CoursePreviewCard
                              course={course}
                              onReadMore={() => openProtectedCourse(course.id)}
                              onPreview={() => openPublicPreview(course.previewModuleId)}
                              accentColor={activeTheme.accent}
                          />
                        </div>
                      </CoursePreviewPopover>
                    </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {displayCourses.length === 0 && (
                  <div className="col-span-full py-16 text-center text-[var(--color-text-tertiary)] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] flex items-center justify-center mb-4 text-[var(--color-text-tertiary)]">
                      <Search size={28} />
                    </div>
                    <p className="text-lg font-bold text-[var(--color-text-primary)]">No courses found</p>
                    <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Try adjusting your filters or search query.</p>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-[var(--color-accent)] font-bold hover:underline cursor-pointer text-sm"
                        >
                          Clear all filters
                        </button>
                    )}
                  </div>
              )}
            </motion.div>
        )}

      </motion.div>
  );
}
