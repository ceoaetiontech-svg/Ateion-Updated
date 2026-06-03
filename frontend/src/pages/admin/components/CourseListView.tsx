import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, TrendingUp, BookOpen, Search, Plus, Book, FileText } from "lucide-react";
import { Link } from "react-router";

interface Course {
  id: number;
  title: string;
  category: string;
  price: string;
  status: string;
  date: string;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function CourseListView() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedCourses = JSON.parse(
      localStorage.getItem("admin_courses") || "[]",
    );
    if (savedCourses.length === 0) {
      const dummy = [
        { id: 1, title: "Introduction to Artificial Intelligence", category: "technology", price: "0", status: "Published", date: "2025-01-15" },
        { id: 2, title: "Advanced UX Design Principles", category: "design", price: "49", status: "Draft", date: "2025-02-28" },
        { id: 3, title: "Data Science Fundamentals", category: "science", price: "0", status: "Published", date: "2025-03-10" },
        { id: 4, title: "Business Strategy & Leadership", category: "business", price: "79", status: "Draft", date: "2025-04-01" },
      ];
      setCourses(dummy);
      localStorage.setItem("admin_courses", JSON.stringify(dummy));
    } else {
      setCourses(savedCourses);
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter((c) => c.id !== id);
      setCourses(updated);
      localStorage.setItem("admin_courses", JSON.stringify(updated));
    }
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalCourses = courses.length;
  const published = courses.filter((c) => c.status === "Published").length;
  const draft = courses.filter((c) => c.status === "Draft").length;
  const free = courses.filter((c) => c.price === "0" || !c.price).length;

  return (
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
          style={{ transformOrigin: "left" }}
        />
        <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">Manage Courses</h2>
        <p className="text-[var(--color-text-secondary)]">View, edit, and analyze your ecosystem courses.</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div className="flex flex-wrap gap-3 my-6" variants={itemVariants}>
        {[
          { label: "Total Courses", value: totalCourses, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
          { label: "Published", value: published, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
          { label: "Draft", value: draft, color: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
          { label: "Free Courses", value: free, color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`px-4 py-2 rounded-xl border ${stat.color} text-sm font-semibold flex items-center gap-2`}
          >
            <span className="text-lg font-bold">{stat.value}</span>
            {stat.label}
          </div>
        ))}
      </motion.div>

      {/* Search + Add */}
      <motion.div className="flex items-center justify-between gap-4 mb-6" variants={itemVariants}>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
          />
        </div>
        <Link
          to="/admin/upload"
          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(232,133,106,0.25)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.4)] hover:scale-[1.03] active:scale-[0.97]"
        >
          <Plus size={18} />
          Add Course
        </Link>
      </motion.div>

      {/* Table */}
      <motion.div
        className="clay-card overflow-hidden bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)]"
        variants={itemVariants}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-sm">
                <th className="p-5 font-semibold">Course Title</th>
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Price</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, i) => (
                  <motion.tr
                    key={course.id}
                    className="hover:bg-[var(--color-background-primary)] transition-colors"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-border-medium)] text-[var(--color-accent)]">
                          {course.status === "Published" ? <Book size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--color-text-primary)]">{course.title}</p>
                          <p className="text-xs text-[var(--color-text-tertiary)]">ID: #{course.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="capitalize px-3 py-1 bg-[var(--color-background-tertiary)] rounded-full text-xs font-semibold text-[var(--color-text-secondary)]">
                        {course.category}
                      </span>
                    </td>
                    <td className="p-5 font-medium text-[var(--color-text-primary)]">
                      {course.price === "0" || !course.price ? (
                        <span className="text-emerald-500 font-semibold">Free</span>
                      ) : (
                        `$${course.price}`
                      )}
                    </td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${course.status === "Published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {course.status}
                      </span>
                    </td>
                    <td className="p-5 text-sm text-[var(--color-text-secondary)]">{course.date}</td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                          title="View Analytics"
                        >
                          <TrendingUp size={16} />
                        </button>
                        <button
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors cursor-pointer"
                          title="Edit Course"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--color-background-tertiary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]">
                        <BookOpen size={28} className="text-[var(--color-text-tertiary)]" />
                      </div>
                      <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                        {searchQuery ? "No matching courses" : "No courses yet"}
                      </p>
                      <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
                        {searchQuery
                          ? `Nothing found for "${searchQuery}"`
                          : "Go to Upload Course to add your first course."}
                      </p>
                      {!searchQuery && (
                        <Link
                          to="/admin/upload"
                          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(232,133,106,0.25)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.4)] hover:scale-[1.03] active:scale-[0.97]"
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

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center text-sm text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)]">
          <p>Showing {filteredCourses.length} of {courses.length} courses</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
