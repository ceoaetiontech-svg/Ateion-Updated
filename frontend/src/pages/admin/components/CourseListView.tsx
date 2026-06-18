import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Book,
  BookOpen,
  Edit2,
  FileText,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import CourseEditDrawer, { AdminCourse } from "./CourseEditDrawer";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getErrorMessage(response: Response): Promise<string> {
  const text = await response.text();
  if (!text) return `Request failed (${response.status})`;

  try {
    const parsed = JSON.parse(text);
    return parsed.message || parsed.error || text;
  } catch {
    return text;
  }
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

export default function CourseListView() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
          `${API_BASE}/admin/courses`,
          { headers: authHeaders() },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data: AdminCourse[] = await response.json();
      setCourses(data);
    } catch (requestError) {
      console.error("Failed to load admin courses", requestError);
      setError(
          requestError instanceof Error
              ? requestError.message
              : "Failed to load courses.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCourses();
  }, [fetchCourses]);

  const handleDelete = async (course: AdminCourse) => {
    const confirmed = window.confirm(
        `Delete “${course.title}”?\n\nThis permanently removes the course, its modules, its videos, and related watch-progress records from the database.`,
    );

    if (!confirmed) return;

    setDeletingId(course.id);
    setError(null);

    try {
      const response = await fetch(
          `${API_BASE}/admin/courses/${course.id}`,
          {
            method: "DELETE",
            headers: authHeaders(),
          },
      );

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      setCourses((current) => current.filter((item) => item.id !== course.id));

      // Any mounted course lists can listen for this and immediately refetch.
      window.dispatchEvent(new Event("ateion:courses-changed"));
    } catch (requestError) {
      console.error("Failed to delete course", requestError);
      setError(
          requestError instanceof Error
              ? requestError.message
              : "Failed to delete the course.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter(
        (course) =>
            course.title.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query) ||
            course.ageSegment.toLowerCase().includes(query),
    );
  }, [courses, searchQuery]);

  const totalCourses = courses.length;
  const published = courses.filter((course) => course.status === "Published").length;
  const draft = courses.filter((course) => course.status === "Draft").length;
  const free = courses.filter((course) => course.isFree).length;

  return (
      <motion.div
          className="pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
              style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">
            Manage Courses
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Courses shown here come directly from the database.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6" variants={itemVariants}>
          {[
            { label: "Total Courses", value: totalCourses, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
            { label: "Published Courses", value: published, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
            { label: "Drafts", value: draft, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
            { label: "Free Courses", value: free, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
          ].map((stat) => (
              <div
                  key={stat.label}
                  className={`p-5 rounded-2xl border ${stat.color} flex flex-col justify-between shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 hover:-translate-y-0.5`}
              >
                <span className="text-3xl font-black tracking-tight mb-2">{stat.value}</span>
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{stat.label}</span>
              </div>
          ))}
        </motion.div>

        <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
            variants={itemVariants}
        >
          <div className="relative flex-1 w-full md:max-w-md">
            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
                size={18}
            />
            <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
                type="button"
                onClick={() => void fetchCourses()}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 transition-all duration-150 disabled:opacity-50 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RefreshCw size={17} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>

            <Link
                to="/admin/upload"
                className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97] shrink-0"
            >
              <Plus size={18} />
              Add Course
            </Link>
          </div>
        </motion.div>

        {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
        )}

        <motion.div
            className="clay-card overflow-hidden bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)]"
            variants={itemVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
              <tr className="bg-[var(--color-background-tertiary)]/30 border-b border-[var(--color-border-light)] text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider">
                <th className="p-5 font-semibold">Course</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Curriculum</th>
                <th className="p-5 font-semibold">Price</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Created</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
              </thead>

              <tbody className="divide-y divide-[var(--color-border-light)]">
              {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-[var(--color-text-secondary)]">
                      Loading courses...
                    </td>
                  </tr>
              ) : filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                      <motion.tr
                          key={course.id}
                          className="hover:bg-[var(--color-background-primary)]/80 transition-colors group"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + index * 0.03 }}
                      >
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center border border-[var(--color-accent)]/20 text-[var(--color-accent)] overflow-hidden shrink-0">
                              {course.image ? (
                                  <img src={course.image} alt="" className="h-full w-full object-cover" />
                              ) : course.status === "Published" ? (
                                  <Book size={18} />
                              ) : (
                                  <FileText size={18} />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-[var(--color-text-primary)]">
                                {course.title}
                              </p>
                              <p className="text-xs text-[var(--color-text-tertiary)]">
                                ID: #{course.id} · {course.ageSegment}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-5">
                      <span className="capitalize px-3 py-1 bg-[var(--color-background-tertiary)]/50 rounded-full text-xs font-semibold text-[var(--color-text-secondary)]">
                        {course.category}
                      </span>
                        </td>

                        <td className="p-5 text-sm text-[var(--color-text-secondary)]">
                          {course.moduleCount} module{course.moduleCount === 1 ? "" : "s"}
                          <br />
                          {course.videoCount} video{course.videoCount === 1 ? "" : "s"}
                        </td>

                        <td className="p-5 font-medium text-[var(--color-text-primary)]">
                          {course.isFree || course.price === "0" ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg text-xs tracking-wide border border-emerald-500/10">Free</span>
                          ) : (
                              `₹${parseFloat(course.price).toLocaleString("en-IN")}`
                          )}
                        </td>

                        <td className="p-5">
                      <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              course.status === "Published"
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          }`}
                      >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                course.status === "Published" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                        />
                        {course.status}
                      </span>
                        </td>

                        <td className="p-5 text-sm text-[var(--color-text-secondary)]">
                          {formatDate(course.createdAt)}
                        </td>

                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 transform translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
                            <button
                                type="button"
                                className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-blue-650 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                                title="Analytics coming later"
                            >
                              <TrendingUp size={16} />
                            </button>
                             <button
                                 type="button"
                                 onClick={() => setEditingCourse(course)}
                                 className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                                 title="Edit Course"
                             >
                               <Edit2 size={16} />
                             </button>
                            <button
                                type="button"
                                onClick={() => void handleDelete(course)}
                                disabled={deletingId === course.id}
                                className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-red-650 dark:hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                                title="Delete course"
                            >
                              {deletingId === course.id ? (
                                  <RefreshCw size={16} className="animate-spin" />
                              ) : (
                                  <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center mb-4 border border-[var(--color-accent)]/20 text-[var(--color-accent)]">
                          <BookOpen size={28} className="opacity-95" />
                        </div>
                        <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                          {searchQuery ? "No matching courses" : "No uploaded courses yet"}
                        </p>
                        <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
                          {searchQuery
                              ? `Nothing found for “${searchQuery}”`
                              : "Upload a YouTube playlist to create your first database course."}
                        </p>
                        {!searchQuery && (
                            <Link
                                to="/admin/upload"
                                className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2"
                            >
                              <Plus size={18} />
                              Create Course
                            </Link>
                        )}
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[var(--color-border-light)] text-sm text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)]">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        </motion.div>

        <CourseEditDrawer
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSave={(updatedCourse) => {
            setCourses((current) =>
              current.map((item) => (item.id === updatedCourse.id ? updatedCourse : item))
            );
          }}
        />
      </motion.div>
  );
}
