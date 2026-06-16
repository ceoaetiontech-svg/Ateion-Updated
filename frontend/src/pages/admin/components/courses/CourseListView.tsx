import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, TrendingUp, BookOpen, Plus, Book, FileText, ArrowUpDown, ArrowUp, ArrowDown, CheckSquare, Square, Archive, Download } from "lucide-react";
import { Link } from "react-router";
import { containerVariants, itemVariants } from "../../utils/variants";
import SearchInput from "../ui/SearchInput";
import Badge from "../ui/Badge";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useCourses } from "../../context/CourseContext";
import { useToast } from "../../utils/toast";
import { relativeTime } from "../../utils/time";

const ITEMS_PER_PAGE = 5;
const STATUS_TABS = ["All", "Published", "Draft", "Archived"] as const;

type SortKey = "title" | "status" | "createdAt";

export default function CourseListView({ onCourseSelect }: { onCourseSelect?: (id: string) => void }) {
  const { courses, deleteCourse, updateCourse } = useCourses();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusTab, setStatusTab] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const onSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const statusFiltered = statusTab === "All"
    ? courses
    : courses.filter((c) => c.status === statusTab);

  const searched = statusFiltered.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sorted = useMemo(() => {
    const arr = [...searched];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else if (sortKey === "createdAt") cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [searched, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginatedCourses = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const totalCourses = courses.length;
  const published = courses.filter((c) => c.status === "Published").length;
  const draft = courses.filter((c) => c.status === "Draft").length;
  const free = courses.filter((c) => c.price === 0).length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedCourses.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedCourses.map((c) => c.id)));
    }
  };

  const allSelected = paginatedCourses.length > 0 && selectedIds.size === paginatedCourses.length;

  const handleBulkDelete = () => {
    selectedIds.forEach((id) => deleteCourse(id));
    showToast(`${selectedIds.size} course(s) deleted`, "success");
    setSelectedIds(new Set());
  };

  const handleBulkArchive = () => {
    selectedIds.forEach((id) => updateCourse(id, { status: "Archived" }));
    showToast(`${selectedIds.size} course(s) archived`, "success");
    setSelectedIds(new Set());
  };

  const handleBulkExport = () => {
    const selected = courses.filter((c) => selectedIds.has(c.id));
    const csv = ["Title,Category,Price,Status,Enrollments"];
    selected.forEach((c) => {
      csv.push(`${c.title},${c.category},${c.price},${c.status},${c.enrollments}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported", "success");
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    if (currentStatus === "Archived") return;
    const next = currentStatus === "Published" ? "Draft" : "Published";
    updateCourse(id, { status: next as "Published" | "Draft" });
    showToast(`Status changed to ${next}`, "success");
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCourse(deleteId);
      showToast("Course deleted", "success");
      setDeleteId(null);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={14} className="opacity-40" />;
    return sortDir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const SortTh = ({ col, label, className }: { col: SortKey; label: string; className?: string }) => (
    <th
      className={`p-5 font-semibold cursor-pointer select-none hover:text-[var(--color-text-primary)] transition-colors ${className || ""}`}
      onClick={() => onSort(col)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <SortIcon col={col} />
      </div>
    </th>
  );

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

      <motion.div className="flex items-center justify-between gap-4 mb-6" variants={itemVariants}>
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setStatusTab(tab); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                statusTab === tab
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(v) => { setSearchQuery(v); setPage(1); }}
            placeholder="Search courses..."
          />
          <Link
            to="/admin/upload"
            className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97]"
          >
            <Plus size={18} />
            Add Course
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="clay-card overflow-hidden bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)]"
        variants={itemVariants}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-light)] text-[var(--color-text-tertiary)] text-sm">
                <th className="p-5 w-10">
                  <button onClick={toggleSelectAll} className="cursor-pointer">
                    {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>
                </th>
                <SortTh col="title" label="Course Title" />
                <th className="p-5 font-semibold">Category</th>
                <th className="p-5 font-semibold">Price</th>
                <SortTh col="status" label="Status" />
                <SortTh col="createdAt" label="Date" />
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course, i) => (
                  <motion.tr
                    key={course.id}
                    className="hover:bg-[var(--color-background-primary)] transition-colors group cursor-pointer"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    onClick={() => onCourseSelect?.(course.id)}
                  >
                    <td className="p-5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSelect(course.id)}
                        className="cursor-pointer"
                      >
                        {selectedIds.has(course.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                    </td>
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
                      {course.price === 0 ? (
                        <span className="text-emerald-500 font-semibold">Free</span>
                      ) : (
                        `$${course.price}`
                      )}
                    </td>
                    <td className="p-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(course.id, course.status);
                        }}
                        disabled={course.status === "Archived"}
                        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                        title={
                          course.status === "Archived"
                            ? "Archived courses cannot be edited"
                            : `Click to toggle to ${course.status === "Published" ? "Draft" : "Published"}`
                        }
                      >
                        <Badge variant="status" value={course.status} />
                      </button>
                    </td>
                    <td className="p-5 text-sm text-[var(--color-text-secondary)]">
                      {relativeTime(course.createdAt)}
                    </td>
                    <td className="p-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                          onClick={() => setDeleteId(course.id)}
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
                  <td colSpan={7}>
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
                          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97]"
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

        <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center text-sm text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)]">
          <p>Showing {paginatedCourses.length} of {courses.length} courses</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 border border-[var(--color-border-medium)] rounded-lg hover:bg-[var(--color-background-tertiary)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-sm font-medium text-[var(--color-text-secondary)] mr-2">
              {selectedIds.size} selected
            </span>
            <button
              onClick={handleBulkArchive}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)] hover:bg-amber-500/10 text-[var(--color-text-secondary)] hover:text-amber-500 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Archive size={14} />
              Archive
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              onClick={handleBulkExport}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)] hover:bg-blue-500/10 text-[var(--color-text-secondary)] hover:text-blue-500 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-1.5 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
        variant="danger"
      />
    </motion.div>
  );
}
