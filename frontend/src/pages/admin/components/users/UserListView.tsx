import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, ShieldAlert, Trash2, UserPlus, ArrowUpDown, ArrowUp, ArrowDown, CheckSquare, Square, Archive, Download } from "lucide-react";
import { containerVariants, itemVariants } from "../../utils/variants";
import SearchInput from "../ui/SearchInput";
import Badge from "../ui/Badge";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useToast } from "../../utils/toast";
import { relativeTime } from "../../utils/time";
import type { IUser } from "../../types/types";

const ITEMS_PER_PAGE = 5;
const TABS = ["All", "Admin", "Instructor", "Student"] as const;

type SortKey = "name" | "role" | "status" | "joinedAt";

export default function UserListView() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const onSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredByTab = activeTab === "All"
    ? users
    : users.filter((u) => u.role === activeTab);

  const searched = filteredByTab.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sorted = useMemo(() => {
    const arr = [...searched];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "role") cmp = a.role.localeCompare(b.role);
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else if (sortKey === "joinedAt") cmp = new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [searched, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((u) => u.id)));
    }
  };

  const allSelected = paginated.length > 0 && selectedIds.size === paginated.length;

  const handleBulkDelete = () => {
    setUsers((prev) => prev.filter((u) => !selectedIds.has(u.id)));
    showToast(`${selectedIds.size} user(s) deleted`, "success");
    setSelectedIds(new Set());
  };

  const handleBulkSuspend = () => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedIds.has(u.id) ? { ...u, status: "Suspended" as const } : u,
      ),
    );
    showToast(`${selectedIds.size} user(s) suspended`, "info");
  };

  const handleBulkActivate = () => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedIds.has(u.id) ? { ...u, status: "Active" as const } : u,
      ),
    );
    showToast(`${selectedIds.size} user(s) activated`, "info");
  };

  const handleBulkExport = () => {
    const selected = users.filter((u) => selectedIds.has(u.id));
    const csv = ["Name,Email,Role,Status,Joined Date"];
    selected.forEach((u) => {
      csv.push(`${u.name},${u.email},${u.role},${u.status},${u.joinedAt}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV exported", "success");
  };

  const handleDelete = () => {
    if (deleteId) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      showToast("User deleted", "success");
      setDeleteId(null);
    }
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Suspended" as const : "Active" as const }
          : u,
      ),
    );
    const user = users.find((u) => u.id === id);
    if (user) {
      showToast(
        `${user.name} ${user.status === "Active" ? "suspended" : "activated"}`,
        "info",
      );
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={14} className="opacity-40" />;
    return sortDir === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const SortTh = ({ col, label }: { col: SortKey; label: string }) => (
    <th
      className="p-4 font-semibold cursor-pointer select-none hover:text-[var(--color-text-primary)] transition-colors"
      onClick={() => onSort(col)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <SortIcon col={col} />
      </div>
    </th>
  );

  const totalUsers = users.length;
  const admins = users.filter((u) => u.role === "Admin").length;
  const instructors = users.filter((u) => u.role === "Instructor").length;
  const students = users.filter((u) => u.role === "Student").length;

  return (
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4" variants={itemVariants}>
        <div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">User Management</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage students, instructors, and administrative accounts.</p>
        </div>
        <motion.button
          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <UserPlus size={18} />
          Add New User
        </motion.button>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6" variants={itemVariants}>
        {[
          { label: "Total Users", value: totalUsers, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
          { label: "Administrators", value: admins, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
          { label: "Instructors", value: instructors, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
          { label: "Students", value: students, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
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
        className="clay-card bg-[var(--color-background-secondary)] rounded-2xl overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
        variants={itemVariants}
      >
        <div className="p-6 border-b border-[var(--color-border-light)] flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--color-background-secondary)]">
          <div className="flex items-center gap-2 flex-wrap order-2 md:order-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 hover:text-[var(--color-text-primary)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="order-1 md:order-2 w-full md:w-auto">
            <SearchInput
              value={searchQuery}
              onChange={(v) => { setSearchQuery(v); setPage(1); }}
              placeholder="Search by name or email..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-background-tertiary)]/30 border-b border-[var(--color-border-light)] text-[var(--color-text-secondary)] text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 w-10">
                  <button onClick={toggleSelectAll} className="cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center">
                    {allSelected ? <CheckSquare size={16} className="text-[var(--color-accent)]" /> : <Square size={16} />}
                  </button>
                </th>
                <SortTh col="name" label="User" />
                <SortTh col="role" label="Role" />
                <SortTh col="status" label="Status" />
                <SortTh col="joinedAt" label="Joined Date" />
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    className="border-b border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]/40 transition-colors group"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                  >
                    <td className="p-4">
                      <button
                        onClick={() => toggleSelect(user.id)}
                        className="cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center"
                      >
                        {selectedIds.has(user.id) ? <CheckSquare size={16} className="text-[var(--color-accent)]" /> : <Square size={16} />}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center font-bold text-[var(--color-accent)] border border-[var(--color-accent)]/20 shrink-0 shadow-[var(--shadow-sm)] transition-transform duration-200 group-hover:scale-105">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">{user.name}</p>
                          <p className="text-sm text-[var(--color-text-tertiary)]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="role" value={user.role} />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="transition-transform duration-200 hover:scale-[1.05] active:scale-[0.95]"
                      >
                        <Badge variant="status" value={user.status} />
                      </button>
                    </td>
                    <td className="p-4 text-[var(--color-text-secondary)] text-sm">
                      {relativeTime(user.joinedAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200 transform translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
                        <button
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-blue-650 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          title="Edit User"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          title={user.status === "Active" ? "Suspend User" : "Activate User"}
                        >
                          <ShieldAlert size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(user.id)}
                          className="p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-red-650 dark:hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--color-text-tertiary)]">
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[var(--color-border-light)] flex justify-between items-center text-sm text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)]">
          <p>
            Showing {sorted.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(sorted.length, page * ITEMS_PER_PAGE)} of {sorted.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 border border-[var(--color-border-light)] rounded-lg hover:bg-[var(--color-background-tertiary)]/50 text-[var(--color-text-secondary)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-150"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 border border-[var(--color-border-light)] rounded-lg hover:bg-[var(--color-background-tertiary)]/50 text-[var(--color-text-secondary)] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-150"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-3 px-6 py-4 rounded-2xl bg-[var(--color-background-secondary)]/90 backdrop-blur-xl border border-[var(--color-border-light)] shadow-[var(--shadow-xl)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="text-sm font-medium text-[var(--color-text-secondary)] mr-2">
              {selectedIds.size} selected
            </span>
            <button
              onClick={handleBulkSuspend}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)]/50 hover:bg-amber-500/15 text-[var(--color-text-secondary)] hover:text-amber-600 dark:hover:text-amber-400 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldAlert size={14} />
              Suspend
            </button>
            <button
              onClick={handleBulkActivate}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)]/50 hover:bg-emerald-500/15 text-[var(--color-text-secondary)] hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Archive size={14} />
              Activate
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)]/50 hover:bg-red-500/15 text-[var(--color-text-secondary)] hover:text-red-600 dark:hover:text-red-400 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              onClick={handleBulkExport}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-background-tertiary)]/50 hover:bg-blue-500/15 text-[var(--color-text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Delete"
        variant="danger"
      />
    </motion.div>
  );
}
