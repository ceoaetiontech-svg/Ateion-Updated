import { motion } from "framer-motion";
import {
  BookMarked,
  ChevronRight,
  Compass,
  Smile,
  Zap,
  Rocket,
  Heart,
  ListVideo,
  User,
  CheckSquare,
  Target,
  Play,
  Bookmark,
  Share2,
  Star,
  Sprout,
  Sparkles,
} from "lucide-react";
import { staggerContainer, fadeUpItem, MY_COURSES_DATA } from "../shared/types";

interface MyCoursesViewProps {
  courseQuery: string;
  setCourseQuery: (val: string) => void;
  activeAgeGroup: string;
  setActiveAgeGroup: (val: string) => void;
  isLoadingCourses: boolean;
  userProfile: { fullName: string; firstName: string; segmentText: string; isPremium: boolean };
}

export default function MyCoursesPage({
  courseQuery,
  setCourseQuery,
  activeAgeGroup,
  setActiveAgeGroup,
  isLoadingCourses,
  userProfile,
}: MyCoursesViewProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 4. MY COURSES SECTION (3-FREE-VIDEOS PAYWALL) */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <BookMarked size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Courses</span>
          </h3>
          <button className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 px-4 py-2 rounded-lg transition-all flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
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
            className="w-full bg-[var(--color-background-secondary)] border-2 border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] pl-12 pr-4 py-3.5 rounded-2xl text-[15px] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-tertiary)] placeholder:font-normal shadow-sm"
          />
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

        {/* Course Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {isLoadingCourses ? (
            [1, 2, 3, 4].map((i) => (
              <div key={`skel-my-${i}`} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col overflow-hidden border border-[var(--color-border-light)] shadow-sm animate-pulse">
                <div className="h-[180px] w-full bg-[var(--color-background-tertiary)] opacity-50"></div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="h-5 bg-[var(--color-background-tertiary)] rounded-md w-3/4 opacity-50"></div>
                  <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/2 opacity-50"></div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/3 opacity-50"></div>
                    <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-1/4 opacity-50"></div>
                  </div>
                </div>
              </div>
            ))
          ) : MY_COURSES_DATA.filter(c =>
            c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
            c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
          ).length > 0 ? (
            MY_COURSES_DATA.filter(c =>
              c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
              c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
            ).map((course) => (
              <motion.div variants={fadeUpItem} key={course.id} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-transform transition-shadow duration-300">
                <div className="relative h-[180px] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* HOVER QUICK ACTIONS */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                    <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Preview">
                      <Play size={18} className="fill-[#ffffff]" />
                    </button>
                    <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Bookmark">
                      <Bookmark size={18} />
                    </button>
                    <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg" title="Share">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg z-20 group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <ListVideo size={14} className="text-[var(--color-accent)]" /> 3 VIDEOS FREE
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h4 className="text-[16px] font-bold text-[#ffffff] mb-0.5 line-clamp-2 leading-tight drop-shadow-md">
                      {course.title}
                    </h4>
                    <p className="text-[13px] text-[#ffffff]/80 font-medium flex items-center gap-1.5 group-hover:text-[#ffffff] transition-colors duration-300">
                      <User size={12} className="group-hover:scale-110 transition-transform duration-300" /> {course.instructor}
                    </p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>

                  <div className="mt-2 mb-6">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] flex items-center gap-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        <Target size={12} className="group-hover:rotate-12 transition-transform duration-300" /> Progress
                      </span>
                      <span className="text-[12px] font-bold text-[var(--color-accent)]">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-background-primary)] rounded-full h-2 mb-2.5 overflow-hidden border border-[var(--color-border-light)] shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88] relative overflow-hidden"
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
                      </div>
                    </div>
                    <p className="text-[12px] text-[var(--color-text-secondary)] font-medium flex items-center gap-1 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                      <CheckSquare size={12} className="text-[var(--color-success)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" /> {course.completed} of {course.total} lessons completed
                    </p>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-white text-[var(--color-text-primary)] py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-[0_8px_20px_rgba(232,133,106,0.3)] active:scale-95">
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                      <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-[var(--color-background-secondary)] rounded-3xl border border-dashed border-[var(--color-border-medium)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4">
                <BookMarked size={32} />
              </div>
              <p className="text-[var(--color-text-primary)] font-bold text-lg mb-2">No courses found</p>
              <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">We couldn't find any courses matching "{courseQuery}". Try adjusting your search criteria.</p>
              <button
                onClick={() => setCourseQuery("")}
                className="mt-6 text-sm font-bold text-[var(--color-accent)] hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
