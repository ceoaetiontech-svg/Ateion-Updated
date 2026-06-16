import { motion } from "framer-motion";
import { Compass, Sprout, Sparkles, Search } from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate, useLocation } from "react-router";
import { getActiveView } from "../shared/navigationData";
import { courseMatchesAgeGroup } from "../shared/courseAgeGroups";
import CoursePreviewPopover from "../components/CoursePreviewPopover";
import CoursePreviewCard from "../components/CoursePreviewCard";
import type { AgeGroupId } from "../shared/types";

type AgeGroupFilterId = "All" | AgeGroupId;

const AGE_GROUP_THEMES: Record<string, {
  kicker: string; title: string; description: string; accent: string; activePill: string; wallpaper: string; panelClass: string;
}> = {
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

export default function AgeGroupPage() {
  const location = useLocation();
  const activeView = getActiveView(location.pathname);
  const { savedIds, toggleSave, setActiveAgeGroup } = usePlayground();
  const { allCourses, isLoading } = useCourses("");
  const navigate = useNavigate();

  const theme = AGE_GROUP_THEMES[activeView] ?? AGE_GROUP_THEMES["Sproutlings (5-7 age)"];

  const filtered = allCourses.filter(c => courseMatchesAgeGroup(c, activeView));

  const openProtectedCourse = (courseId: number, previewModuleId?: number | null) => {
    if (previewModuleId) {
      navigate(`/course-preview/${previewModuleId}`);
      return;
    }
    if (!localStorage.getItem("token")) {
      window.dispatchEvent(new CustomEvent("open-login"));
      return;
    }
    navigate(`/playground/course/${courseId}`);
  };

  return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Themed Header */}
        <div className={`p-8 rounded-3xl ${theme.panelClass} relative overflow-hidden`} style={{ background: theme.wallpaper }}>
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
              {theme.kicker}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">
              {activeView}
            </h1>
            <p className="text-[var(--color-text-secondary)]">{theme.description}</p>
          </div>
        </div>

        {isLoading ? (
            <div className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] px-6 py-10 text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
              <p className="font-bold text-[var(--color-text-primary)]">Loading courses…</p>
            </div>
        ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-4">
                <Search size={32} className="text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No courses available yet</p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Courses for this age group are being added. Check back soon!</p>
              <button
                  onClick={() => { setActiveAgeGroup("All"); navigate("/playground/discover"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-bold hover:brightness-110 transition-all"
              >
                <Compass size={16} /> Browse All Courses
              </button>
            </div>
        ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-tertiary)] font-medium">{filtered.length} course{filtered.length !== 1 ? "s" : ""} available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch auto-rows-fr">
                {filtered.map((course) => (
                    <motion.div
                        key={course.id}
                        layout
                        variants={slideInItem}
                        initial="hidden"
                        animate="show"
                        className="h-full flex w-full"
                    >
                      <CoursePreviewPopover
                          course={course}
                          onReadMore={() => openProtectedCourse(course.id, course.previewModuleId)}
                          onSave={() => toggleSave(course.id)}
                          isSaved={savedIds.includes(course.id)}
                      >
                        <div
                            onClick={() => openProtectedCourse(course.id, course.previewModuleId)}
                            className="w-full cursor-pointer h-full transition-transform hover:-translate-y-1 flex flex-col group bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl overflow-hidden"
                        >
                          <CoursePreviewCard course={course} />
                        </div>
                      </CoursePreviewPopover>
                    </motion.div>
                ))}
              </div>
            </>
        )}
      </div>
  );
}
