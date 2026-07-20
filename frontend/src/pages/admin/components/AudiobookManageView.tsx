import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones, Plus, Trash2, Edit2, Search, RefreshCw,
  X, Check, Loader2, ChevronDown, ChevronUp, GripVertical, AlertTriangle
} from "lucide-react";
import { useToast } from "../utils/toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const CATEGORIES = [
  "Technology", "Philosophy", "Science", "Business",
  "History", "Self-Help", "Fiction", "Biography",
  "Psychology", "Spirituality", "Health", "Arts",
];

interface Chapter {
  id?: number;
  title: string;
  youtubeVideoId: string;
  durationSeconds: number;
  sortOrder: number;
}

interface Audiobook {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl: string;
  createdAt: string;
  chapters: Chapter[];
}

interface BookFormState {
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl: string;
  chapters: Chapter[];
}

const EMPTY_FORM: BookFormState = {
  title: "", author: "", description: "",
  category: "Technology", coverUrl: "", chapters: [],
};

function fmtDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function parseDuration(val: string): number {
  if (val.includes(":")) {
    const parts = val.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  }
  return parseInt(val) || 0;
}

function secondsToDisplay(sec: number) {
  if (!sec) return "";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ── Chapter editor row ────────────────────────────────────────────────────────
function ChapterRow({
  ch, idx, total,
  onChange, onRemove, onMoveUp, onMoveDown
}: {
  ch: Chapter; idx: number; total: number;
  onChange: (idx: number, field: keyof Chapter, val: string | number) => void;
  onRemove: (idx: number) => void;
  onMoveUp: (idx: number) => void;
  onMoveDown: (idx: number) => void;
}) {
  const [durInput, setDurInput] = useState(secondsToDisplay(ch.durationSeconds));

  return (
    <div className="flex items-start gap-2 p-3 bg-[var(--color-background-primary)]/50 border border-[var(--color-border-light)] rounded-xl">
      <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
        <button type="button" onClick={() => onMoveUp(idx)} disabled={idx === 0}
          className="p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] disabled:opacity-30 cursor-pointer">
          <ChevronUp size={14} />
        </button>
        <span className="text-[11px] font-bold text-[var(--color-text-tertiary)] select-none w-5 text-center">{idx + 1}</span>
        <button type="button" onClick={() => onMoveDown(idx)} disabled={idx === total - 1}
          className="p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] disabled:opacity-30 cursor-pointer">
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 min-w-0">
        <input
          type="text" placeholder="Chapter title"
          className="admin-input px-3 py-2 rounded-lg text-xs outline-none text-[var(--color-text-primary)]"
          value={ch.title}
          onChange={(e) => onChange(idx, "title", e.target.value)}
        />
        <input
          type="text" placeholder="YouTube Video ID"
          className="admin-input px-3 py-2 rounded-lg text-xs outline-none text-[var(--color-text-primary)] font-mono"
          value={ch.youtubeVideoId}
          onChange={(e) => onChange(idx, "youtubeVideoId", e.target.value)}
        />
        <input
          type="text" placeholder="Duration (mm:ss)"
          className="admin-input px-3 py-2 rounded-lg text-xs outline-none text-[var(--color-text-primary)]"
          value={durInput}
          onChange={(e) => setDurInput(e.target.value)}
          onBlur={() => onChange(idx, "durationSeconds", parseDuration(durInput))}
        />
      </div>

      <button type="button" onClick={() => onRemove(idx)}
        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0 mt-0.5">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ── Portal Overlay wrapper — renders at document.body to escape fixed-context bugs ──
function PortalOverlay({ children }: { children: React.ReactNode }) {
  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99999 }}
    >
      {children}
    </div>,
    document.body
  );
}

// ── Modal for add / edit ──────────────────────────────────────────────────────
function AudiobookModal({
  mode, initial, onClose, onSave
}: {
  mode: "add" | "edit";
  initial: BookFormState;
  onClose: () => void;
  onSave: (data: BookFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<BookFormState>({ ...initial });
  const [saving, setSaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const set = (field: keyof BookFormState, val: any) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleChapterChange = (idx: number, field: keyof Chapter, val: string | number) => {
    const chs = [...form.chapters];
    chs[idx] = { ...chs[idx], [field]: val };
    set("chapters", chs);
  };

  const handleAddChapter = () =>
    set("chapters", [...form.chapters, { title: "", youtubeVideoId: "", durationSeconds: 0, sortOrder: form.chapters.length }]);

  const handleRemoveChapter = (idx: number) =>
    set("chapters", form.chapters.filter((_, i) => i !== idx));

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const chs = [...form.chapters];
    [chs[idx - 1], chs[idx]] = [chs[idx], chs[idx - 1]];
    set("chapters", chs);
  };

  const handleMoveDown = (idx: number) => {
    const chs = [...form.chapters];
    if (idx >= chs.length - 1) return;
    [chs[idx], chs[idx + 1]] = [chs[idx + 1], chs[idx]];
    set("chapters", chs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try { await onSave(form); } finally { setSaving(false); }
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <PortalOverlay>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflowY: "auto",
          padding: "24px 16px 40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--color-background-secondary)",
            border: "1px solid var(--color-border-light)",
            borderRadius: 24,
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
            width: "100%",
            maxWidth: 760,
            marginTop: 16,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "22px 28px 18px",
            borderBottom: "1px solid var(--color-border-light)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: "var(--color-accent-10, rgba(var(--color-accent-rgb,232,102,75),0.12))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Headphones size={18} color="var(--color-accent)" />
              </div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: "var(--color-text-primary)", margin: 0 }}>
                {mode === "add" ? "Add New Audiobook" : "Edit Audiobook"}
              </h2>
            </div>
            <button onClick={onClose} style={{
              padding: 8, borderRadius: 10, border: "none", background: "transparent",
              cursor: "pointer", color: "var(--color-text-secondary)",
              display: "flex", alignItems: "center",
            }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: "24px 28px 28px" }}>
            {/* Title + Author */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
                  Title *
                </label>
                <input required type="text" placeholder="Audiobook title"
                  className="admin-input w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
                  Author / Narrator
                </label>
                <input type="text" placeholder="e.g. Robert Greene"
                  className="admin-input w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ color: "var(--color-text-primary)" }}
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 16 }}>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
                Description
              </label>
              <textarea placeholder="Brief summary of the audiobook..."
                className="admin-input w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ minHeight: 80, color: "var(--color-text-primary)", resize: "vertical" }}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            {/* Category + Cover URL */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
                  Category
                </label>
                <select
                  className="admin-input w-full px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
                  style={{ color: "var(--color-text-primary)" }}
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
                  Cover Image URL
                </label>
                <input type="url" placeholder="https://...image.jpg"
                  className="admin-input w-full px-4 py-2.5 rounded-xl text-sm outline-none font-mono"
                  style={{ color: "var(--color-text-primary)" }}
                  value={form.coverUrl}
                  onChange={(e) => set("coverUrl", e.target.value)}
                />
              </div>
            </div>

            {/* Cover preview */}
            {form.coverUrl?.startsWith("http") && (
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px",
                background: "var(--color-background-tertiary, rgba(0,0,0,0.04))",
                borderRadius: 14,
                border: "1px solid var(--color-border-light)",
                marginBottom: 20,
              }}>
                <img
                  src={form.coverUrl} alt="Cover preview"
                  style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", border: "1px solid var(--color-border-light)", flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
                  Cover image preview — check if it loads correctly.
                </span>
              </div>
            )}

            {/* Chapters */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 6 }}>
                  <GripVertical size={14} /> Chapters ({form.chapters.length})
                </label>
                <button type="button" onClick={handleAddChapter}
                  className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 border border-dashed rounded-xl cursor-pointer transition-all hover:opacity-80"
                  style={{ color: "var(--color-accent)", borderColor: "var(--color-accent)", background: "transparent" }}>
                  <Plus size={13} /> Add Chapter
                </button>
              </div>

              {form.chapters.length === 0 && (
                <div style={{
                  padding: "28px 0", textAlign: "center",
                  border: "1px dashed var(--color-border-light)", borderRadius: 16,
                  color: "var(--color-text-tertiary)", fontSize: 12,
                }}>
                  No chapters yet — click "+ Add Chapter" to start.
                </div>
              )}

              <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
                {form.chapters.map((ch, idx) => (
                  <ChapterRow
                    key={idx} ch={ch} idx={idx} total={form.chapters.length}
                    onChange={handleChapterChange}
                    onRemove={handleRemoveChapter}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: "flex", gap: 12, paddingTop: 20,
              borderTop: "1px solid var(--color-border-light)",
            }}>
              <button type="button" onClick={onClose}
                className="admin-input"
                style={{
                  flex: 1, padding: "10px 20px", borderRadius: 12,
                  fontSize: 14, fontWeight: 600,
                  color: "var(--color-text-secondary)", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={saving}
                style={{
                  flex: 1, padding: "10px 20px", borderRadius: 12,
                  background: "var(--color-accent)", color: "#fff",
                  fontSize: 14, fontWeight: 700, border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.65 : 1,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  transition: "all 0.2s",
                }}
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {saving ? "Saving..." : mode === "add" ? "Create Audiobook" : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </PortalOverlay>
  );
}

// ── Delete confirm modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({
  target, deleting, onCancel, onConfirm
}: {
  target: Audiobook;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <PortalOverlay>
      <div
        onClick={onCancel}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "var(--color-background-secondary)",
            border: "1px solid var(--color-border-light)",
            borderRadius: 24, padding: 32, maxWidth: 400, width: "100%",
            boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
            textAlign: "center",
          }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "rgba(239,68,68,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", marginBottom: 8 }}>
            Delete Audiobook?
          </h3>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: 24 }}>
            <strong>"{target.title}"</strong> and all its {target.chapters.length} chapters will be permanently removed.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onCancel} disabled={deleting}
              className="admin-input"
              style={{
                flex: 1, padding: "10px 20px", borderRadius: 12,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: "var(--color-text-secondary)",
              }}>
              Cancel
            </button>
            <button onClick={onConfirm} disabled={deleting}
              style={{
                flex: 1, padding: "10px 20px", borderRadius: 12,
                background: "#ef4444", color: "#fff",
                fontSize: 14, fontWeight: 700, border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                cursor: deleting ? "not-allowed" : "pointer",
                opacity: deleting ? 0.65 : 1,
              }}>
              {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </div>
    </PortalOverlay>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AudiobookManageView() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Audiobook | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Audiobook | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/content/audiobooks`);
      if (!res.ok) throw new Error();
      setAudiobooks(await res.json());
    } catch {
      showToast("Failed to load audiobooks", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSave = async (data: BookFormState) => {
    const isEdit = modalMode === "edit" && editTarget;
    const url = isEdit
      ? `${API_BASE}/content/audiobooks/${editTarget!.id}`
      : `${API_BASE}/content/audiobooks`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        chapters: data.chapters.map((ch, i) => ({ ...ch, sortOrder: i })),
      }),
    });

    if (!res.ok) {
      showToast("Save failed — check backend logs", "error");
      throw new Error();
    }

    showToast(isEdit ? "Audiobook updated!" : "Audiobook created!", "success");
    setModalMode(null);
    setEditTarget(null);
    await fetchAll();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/content/audiobooks/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Audiobook deleted", "success");
      setDeleteTarget(null);
      await fetchAll();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  const openAdd = () => { setEditTarget(null); setModalMode("add"); };
  const openEdit = (ab: Audiobook) => { setEditTarget(ab); setModalMode("edit"); };

  const allCategories = Array.from(new Set(audiobooks.map((ab) => ab.category).filter(Boolean)));
  const categoryOptions = ["All", ...allCategories];

  const filtered = audiobooks.filter((ab) => {
    const matchCat = catFilter === "All" || ab.category === catFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || ab.title.toLowerCase().includes(q) || (ab.author || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const toFormState = (ab: Audiobook): BookFormState => ({
    title: ab.title ?? "",
    author: ab.author ?? "",
    description: ab.description ?? "",
    category: ab.category || "Technology",
    coverUrl: ab.coverUrl ?? "",
    chapters: (ab.chapters ?? []).map((ch) => ({ ...ch })),
  });

  return (
    <div className="space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-text-primary)] tracking-tight font-['OV_Soge']">
            Manage Audiobooks
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            {audiobooks.length} audiobook{audiobooks.length !== 1 ? "s" : ""} in the library
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAll}
            className="px-3 py-2 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)] cursor-pointer flex items-center gap-1.5 text-sm transition-all">
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={openAdd}
            className="px-4 py-2 rounded-xl text-white font-bold flex items-center gap-1.5 text-sm cursor-pointer shadow-md hover:opacity-90 transition-all"
            style={{ background: "var(--color-accent)" }}>
            <Plus size={16} /> Add Audiobook
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: audiobooks.length, color: "#6366f1" },
          { label: "Categories", value: allCategories.length, color: "#0891b2" },
          { label: "Chapters", value: audiobooks.reduce((s, a) => s + a.chapters.length, 0), color: "#d97706" },
          {
            label: "Total Duration",
            value: (() => {
              const secs = audiobooks.reduce((s, a) => s + a.chapters.reduce((cs, c) => cs + (c.durationSeconds || 0), 0), 0);
              return fmtDuration(secs) || "—";
            })(),
            color: "#059669",
          },
        ].map((stat) => (
          <div key={stat.label}
            className="admin-card p-4 rounded-2xl"
            style={{ borderLeft: `3px solid ${stat.color}` }}>
            <p className="text-2xl font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-[var(--color-text-tertiary)] font-medium mt-0.5 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upload shortcut */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <span>To upload a new audiobook via YouTube playlist →</span>
        <button
          onClick={() => navigate("/admin/upload")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:opacity-90 transition-all"
          style={{ background: "var(--color-accent)", color: "#fff" }}
        >
          Go to Upload Page
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={16} />
          <input
            type="text" placeholder="Search by title or author..."
            className="admin-input w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none text-[var(--color-text-primary)]"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="admin-input px-4 py-2.5 rounded-xl text-sm outline-none text-[var(--color-text-primary)] cursor-pointer"
          value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
        >
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-[var(--color-text-tertiary)]">
            <Loader2 size={28} className="animate-spin" style={{ color: "var(--color-accent)" }} />
            <p className="text-sm">Loading audiobooks...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center text-[var(--color-text-tertiary)]">
            <Headphones size={32} className="opacity-40 mb-3" />
            <p className="text-sm font-semibold">No audiobooks found</p>
            <p className="text-xs mt-1">Try a different filter or add a new audiobook.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-light)] text-left text-xs font-bold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                <th className="px-5 py-3.5">Audiobook</th>
                <th className="px-5 py-3.5 hidden sm:table-cell">Author</th>
                <th className="px-5 py-3.5 hidden md:table-cell">Category</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Chapters</th>
                <th className="px-5 py-3.5 hidden lg:table-cell">Duration</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ab) => {
                const totalSecs = ab.chapters.reduce((s, c) => s + (c.durationSeconds || 0), 0);
                return (
                  <tr key={ab.id}
                    className="border-b border-[var(--color-border-light)]/50 hover:bg-[var(--color-background-tertiary)]/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {ab.coverUrl?.startsWith("http") ? (
                          <img src={ab.coverUrl} alt={ab.title}
                            className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[var(--color-border-light)]" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-border-light)]"
                            style={{ background: "linear-gradient(135deg, var(--color-accent, #e8664b)/15, var(--color-accent, #e8664b)/5)" }}>
                            <Headphones size={16} style={{ color: "var(--color-accent)" }} />
                          </div>
                        )}
                        <p className="font-semibold text-[var(--color-text-primary)] truncate max-w-[180px]">{ab.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell text-xs text-[var(--color-text-secondary)]">
                      {ab.author || "—"}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-md"
                        style={{ background: "rgba(var(--color-accent-rgb,232,102,75),0.10)", color: "var(--color-accent)" }}>
                        {ab.category || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-[var(--color-text-secondary)] font-medium text-xs">
                      {ab.chapters.length} ch.
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-[var(--color-text-tertiary)] text-xs">
                      {totalSecs > 0 ? fmtDuration(totalSecs) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => openEdit(ab)}
                          className="p-2 rounded-lg cursor-pointer transition-all text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => setDeleteTarget(ab)}
                          className="p-2 rounded-lg cursor-pointer transition-all text-[var(--color-text-tertiary)] hover:text-red-500 hover:bg-red-500/10">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals — rendered via portal at document.body */}
      <AnimatePresence>
        {modalMode && (
          <AudiobookModal
            mode={modalMode}
            initial={editTarget ? toFormState(editTarget) : { ...EMPTY_FORM }}
            onClose={() => { setModalMode(null); setEditTarget(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            target={deleteTarget}
            deleting={deleting}
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
