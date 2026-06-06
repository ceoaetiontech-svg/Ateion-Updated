import { motion } from "framer-motion";
import { Heart, Star, Clock, Signal, BarChart2, PlayCircle, ChevronRight, BookOpen, Play, Share2, X, Compass, ArrowLeft } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useCourses } from "../hooks/useCourses";
import { useNavigate } from "react-router";
import { getTopicColor } from "../shared/topicColors";

export default function SavedCoursesPage() {
  const { savedIds, toggleSave } = usePlayground();
  const { allCourses } = useCourses("");
  const navigate = useNavigate();

  const saved = allCourses.filter(c => savedIds.includes(c.id));

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h3
            className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Heart size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)]">Saved Courses</span>
          </h3>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-4">
            <Heart size={32} className="text-[var(--color-text-tertiary)]" />
          </div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No saved courses yet</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Click the heart icon on any course to save it for later.</p>
          <button
            onClick={() => navigate("/playground/discover")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-bold hover:brightness-110 transition-all"
          >
            <Compass size={16} /> Discover Courses
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {saved.map((course) => (
            <motion.div
              variants={fadeUpItem}
              key={course.id}
              className="bg-[var(--color-background-secondary)] rounded-3xl flex flex-col group cursor-pointer overflow-hidden border border-[var(--color-border-light)] border-t-[3px] shadow-md hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
              style={{ borderTopColor: getTopicColor(course.topics) }}
              onClick={() => navigate(`/playground/course/${course.id}`)}
            >
              <div className="relative h-[200px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <img
                  src={course.image}
                  alt={course.title}
                  onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-[#000000]/40 backdrop-blur-[2px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                    className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg"
                  >
                    <Play size={18} className="fill-[#ffffff]" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                    className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg"
                  >
                    <Heart size={18} className="fill-red-500 text-red-500" />
                  </button>
                  <button className="p-2.5 bg-[#ffffff]/20 hover:bg-[#ffffff]/40 backdrop-blur-md rounded-full text-[#ffffff] transition-transform hover:scale-110 shadow-lg">
                    <Share2 size={18} />
                  </button>
                </div>
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 text-[#ffffff] px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                    <Signal size={12} /> {course.level}
                  </div>
                  {course.isFree && (
                    <div className="bg-[var(--color-success)]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider shadow-lg">FREE</div>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(course.id); }}
                  className="absolute top-4 right-4 z-20 bg-[#ffffff]/10 backdrop-blur-md border border-[#ffffff]/20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
                <div className="absolute bottom-4 left-4 z-20 right-4">
                  <h4 className="text-[18px] font-bold text-[#ffffff] mb-1 line-clamp-2 leading-tight drop-shadow-md">{course.title}</h4>
                  <div className="flex items-center gap-2">
                    <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover border border-white/30" />
                    <span className="text-[12px] text-[#ffffff]/90 font-medium truncate">{course.instructor}</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[var(--color-warning)]">{course.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="text-[var(--color-warning)]" fill={i < Math.round(course.rating) ? "var(--color-warning)" : "none"} />
                    ))}
                    <span className="text-xs text-[var(--color-text-tertiary)]">({course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students})</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]"><BarChart2 size={11} /> {course.level}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]"><Clock size={11} /> {course.duration}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)]"><PlayCircle size={11} /> {course.lessons} lessons</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {course.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ backgroundColor: getTopicColor(course.topics) + "20", color: getTopicColor(course.topics) }}>{topic}</span>
                  ))}
                </div>
                <div className="mt-auto">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/playground/course/${course.id}`); }}
                    className="w-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white py-3 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
