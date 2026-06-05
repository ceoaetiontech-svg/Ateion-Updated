import { motion } from "framer-motion";
import { Compass, ChevronRight, Smile, Zap, Rocket, Heart, Star, User, Play, Bookmark, Share2, Sprout, Sparkles } from "lucide-react";
import { staggerContainer, fadeUpItem, MY_COURSES_DATA } from "../shared/types";

interface DiscoverCoursesViewProps {
  courseQuery: string;
  setCourseQuery: (val: string) => void;
  activeAgeGroup: string;
  setActiveAgeGroup: (val: string) => void;
  isLoadingCourses: boolean;
}

export default function DiscoverCoursesPage({
  courseQuery,
  setCourseQuery,
  activeAgeGroup,
  setActiveAgeGroup,
  isLoadingCourses,
}: DiscoverCoursesViewProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Compass size={28} className="text-[var(--color-accent)] group-hover:-rotate-12 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">Discover Courses</span>
          </h3>
        </div>

        <div className="mb-2 relative max-w-xl group focus-within:scale-[1.01] transition-transform duration-300">
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

        {/* Age Segment Filter Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 mb-4 mt-2 px-1">
          {[
            { id: "All", icon: <Compass size={18} /> },
            { id: "Sproutlings (5\u20137)", icon: <Sprout size={18} /> },
            { id: "Saplings (7\u201314)", icon: <Sprout size={18} /> },
            { id: "Pathfinders (14\u201318)", icon: <Compass size={18} /> },
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

        {/* Discovery Course Grid (Reusing mock data) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {isLoadingCourses ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skel-disc-${i}`} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col overflow-hidden border border-[var(--color-border-light)] shadow-sm animate-pulse">
                <div className="h-[200px] w-full bg-[var(--color-background-tertiary)] opacity-50"></div>
                <div className="p-5 flex flex-col flex-1 gap-4 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>
                  <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-full opacity-50"></div>
                  <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-5/6 opacity-50"></div>
                  <div className="h-4 bg-[var(--color-background-tertiary)] rounded-md w-2/3 opacity-50 mb-4"></div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-6 bg-[var(--color-background-tertiary)] rounded-full w-24 opacity-50"></div>
                    <div className="h-8 bg-[var(--color-background-tertiary)] rounded-xl w-8 opacity-50"></div>
                  </div>
                </div>
              </div>
            ))
          ) : MY_COURSES_DATA.filter(c =>
            c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
            c.instructor.toLowerCase().includes(courseQuery.toLowerCase())
          ).map((course) => (
            <motion.div variants={fadeUpItem} key={course.id} className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500">
              <div className="relative h-[200px] w-full overflow-hidden">
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
                <div className="absolute top-4 left-4 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg z-20">
                  <Star size={14} className="text-[var(--color-warning)]" /> FEATURED
                </div>
                <div className="absolute top-4 right-4 bg-[var(--color-background-primary)] text-[var(--color-text-primary)] w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform">
                  <Heart size={16} />
                </div>
                <div className="absolute bottom-4 left-4 z-20 right-4">
                  <h4 className="text-[18px] font-bold text-[#ffffff] mb-1 line-clamp-2 leading-tight drop-shadow-md">
                    {course.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-[#ffffff]/80 font-medium flex items-center gap-1.5">
                      <User size={12} /> {course.instructor}
                    </p>
                    <div className="flex items-center gap-1 text-[var(--color-warning)] text-xs font-bold">
                      <Star size={12} fill="currentColor" /> 4.9 (12k)
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 bg-[var(--color-background-secondary)] relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-border-light)] to-transparent opacity-50"></div>

                <p className="text-[13px] text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                  Learn the fundamentals and advanced techniques in this comprehensive course tailored for {activeAgeGroup !== "All" ? activeAgeGroup : "your specific learning path"}.
                </p>

                <div className="mt-auto">
                  <button className="w-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
                    View Details
                    <ChevronRight size={16} className="transition-all" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
