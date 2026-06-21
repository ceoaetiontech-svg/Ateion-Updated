import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  ChevronDown,
  BookOpen,
  Tag,
  DollarSign,
  Users,
  Image as ImageIcon,
  FileText,
  Loader2,
  CheckCircle2,
  Pencil,
  Upload,
  Trash2,
} from "lucide-react";

interface AdminCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  isFree: boolean;
  ageSegment: string;
  image: string;
  status: "Published" | "Draft";
  moduleCount: number;
  videoCount: number;
  createdAt: string | null;
}

interface EditCourseModalProps {
  course: AdminCourse | null;
  onClose: () => void;
  onSaved: (updated: AdminCourse) => void;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

const CATEGORIES = [
  "AI",
  "Coding",
  "Languages",
  "Curious Kitty",
  "Finance",
  "Art",
  "Advance Skills",
  "Mental Health",
  "Technology",
];

const AGE_SEGMENTS = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Kids",
  "Teens",
  "Adults",
];

export default function EditCourseModal({ course, onClose, onSaved }: EditCourseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAgeSegments, setSelectedAgeSegments] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState([...CATEGORIES]);
  const [editingCatIndex, setEditingCatIndex] = useState<number | null>(null);
  const [editingCatValue, setEditingCatValue] = useState("");
  const [price, setPrice] = useState("0");
  const [isFree, setIsFree] = useState(true);
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [catOpen, setCatOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Seed form when course changes
  useEffect(() => {
    if (course) {
      setTitle(course.title ?? "");
      setDescription(course.description ?? "");
      setSelectedCategories(course.category ? course.category.split(",").map((c) => c.trim()).filter(Boolean) : []);
      setSelectedAgeSegments(course.ageSegment ? course.ageSegment.split(",").map((s) => s.trim()).filter(Boolean) : []);
      setPrice(course.price ?? "0");
      setIsFree(course.isFree ?? true);
      setImage(course.image ?? "");
      setError(null);
      setSuccess(false);
    }
  }, [course]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (ageRef.current && !ageRef.current.contains(e.target as Node)) setAgeOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleAgeSegment = (seg: string) => {
    setSelectedAgeSegments((prev) =>
      prev.includes(seg) ? prev.filter((s) => s !== seg) : [...prev, seg],
    );
  };

  const startEditingCategory = (index: number, name: string) => {
    setEditingCatIndex(index);
    setEditingCatValue(name);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const addCategory = () => {
    setCategoriesList((prev) => {
      const newIdx = prev.length;
      setEditingCatIndex(newIdx);
      setEditingCatValue("");
      setTimeout(() => editInputRef.current?.focus(), 0);
      return [...prev, ""];
    });
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveCategoryEdit = () => {
    if (editingCatIndex === null) return;
    const trimmed = editingCatValue.trim();
    if (!trimmed) {
      setEditingCatIndex(null);
      return;
    }
    const oldName = categoriesList[editingCatIndex];
    if (oldName === trimmed) {
      setEditingCatIndex(null);
      return;
    }
    setCategoriesList((prev) => {
      const next = [...prev];
      next[editingCatIndex] = trimmed;
      return next;
    });
    setSelectedCategories((prev) => prev.map((c) => (c === oldName ? trimmed : c)));
    setEditingCatIndex(null);
  };

  const handleSave = async () => {
    if (!course) return;
    setSaving(true);
    setError(null);
    try {
      const category = selectedCategories.join(", ");
      const ageSegment = selectedAgeSegments.join(", ");
      const res = await fetch(`${API_BASE}/admin/courses/${course.id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ title, description, category, ageSegment, price, isFree, image }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed (${res.status})`);
      }
      const updated: AdminCourse = await res.json();
      setSuccess(true);
      window.dispatchEvent(new Event("ateion:courses-changed"));
      setTimeout(() => {
        onSaved(updated);
        onClose();
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (!course) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        ref={overlayRef}
        key="edit-modal-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.55)" }}
      >
          <motion.div
            key="edit-modal-panel"
            className="w-full max-w-2xl rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] shadow-2xl overflow-hidden"
            initial={{ scale: 0.93, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-light)] bg-gradient-to-r from-[var(--color-accent)]/8 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/15 flex items-center justify-center">
                  <BookOpen size={18} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[var(--color-text-primary)]">Edit Course</h2>
                  <p className="text-xs text-[var(--color-text-tertiary)]">ID #{course.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]/60 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                  <FileText size={13} /> Course Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter course title..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] transition-all text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                  <FileText size={13} /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Optional: update description..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] transition-all text-sm resize-none"
                />
              </div>

              {/* Category + Age Segment (side by side) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    <Tag size={13} /> Categories
                  </label>
                  <div className="relative" ref={catRef}>
                    <button
                      type="button"
                      onClick={() => { setCatOpen(!catOpen); setAgeOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] text-sm outline-none transition-all cursor-pointer"
                    >
                      <span className={selectedCategories.length === 0 ? "text-[var(--color-text-tertiary)]" : ""}>
                        {selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select categories..."}
                      </span>
                      <ChevronDown size={15} className={`transition-transform text-[var(--color-text-tertiary)] ${catOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {catOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.14 }}
                          className="absolute z-50 mt-1.5 w-full rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] shadow-xl overflow-hidden"
                        >
                          {categoriesList.map((cat, idx) => {
                            const checked = selectedCategories.includes(cat);
                            const isEditing = editingCatIndex === idx;
                            return (
                              <div
                                key={`${cat}-${idx}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[var(--color-accent)]/10"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleCategory(cat)}
                                  className="accent-[var(--color-accent)] w-4 h-4 shrink-0"
                                />
                                {isEditing ? (
                                  <input
                                    ref={editInputRef}
                                    type="text"
                                    value={editingCatValue}
                                    onChange={(e) => setEditingCatValue(e.target.value)}
                                    onBlur={saveCategoryEdit}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") saveCategoryEdit();
                                      if (e.key === "Escape") setEditingCatIndex(null);
                                    }}
                                    className="flex-1 px-2 py-1 rounded-md border border-[var(--color-accent)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] text-sm outline-none"
                                  />
                                ) : (
                                  <>
                                    <span className={`flex-1 ${checked ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-text-primary)]"}`}>
                                      {cat}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); startEditingCategory(idx, cat); }}
                                      className="p-1 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer shrink-0"
                                    >
                                      <Pencil size={13} />
                                    </button>
                                  </>
                                )}
                              </div>
                            );
                          })}
                          <div className="border-t border-[var(--color-border-light)]">
                            <button
                              type="button"
                              onClick={addCategory}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-all cursor-pointer font-medium"
                            >
                              <span className="text-lg leading-none">+</span> Add category
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Age Segment */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    <Users size={13} /> Levels
                  </label>
                  <div className="relative" ref={ageRef}>
                    <button
                      type="button"
                      onClick={() => { setAgeOpen(!ageOpen); setCatOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] text-sm outline-none transition-all cursor-pointer"
                    >
                      <span className={selectedAgeSegments.length === 0 ? "text-[var(--color-text-tertiary)]" : ""}>
                        {selectedAgeSegments.length > 0 ? selectedAgeSegments.join(", ") : "Select levels..."}
                      </span>
                      <ChevronDown size={15} className={`transition-transform text-[var(--color-text-tertiary)] ${ageOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {ageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.14 }}
                          className="absolute z-50 mt-1.5 w-full rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] shadow-xl overflow-hidden"
                        >
                          {AGE_SEGMENTS.map((seg) => {
                            const checked = selectedAgeSegments.includes(seg);
                            return (
                              <label
                                key={seg}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-accent)]/10 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleAgeSegment(seg)}
                                  className="accent-[var(--color-accent)] w-4 h-4"
                                />
                                <span className={checked ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-text-primary)]"}>
                                  {seg}
                                </span>
                              </label>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Price + Free toggle */}
              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                    <DollarSign size={13} /> Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setIsFree(parseFloat(e.target.value || "0") === 0);
                    }}
                    disabled={isFree}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !isFree;
                      setIsFree(next);
                      if (next) setPrice("0");
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                      isFree
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-medium)]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isFree ? "bg-emerald-500" : "bg-[var(--color-text-tertiary)]"}`} />
                    {isFree ? "Free Course" : "Mark as Free"}
                  </button>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                  <ImageIcon size={13} /> Thumbnail
                </label>
                <div
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center w-full px-4 py-6 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                    dragActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8"
                      : "border-[var(--color-border-light)] bg-[var(--color-background-secondary)] hover:border-[var(--color-border-medium)]"
                  }`}
                >
                  {image ? (
                    <div className="relative w-full group">
                      <img
                        src={image}
                        alt="thumbnail"
                        className="w-full h-36 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-lg bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                        >
                          <Upload size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImage(""); }}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-2">
                        <Upload size={18} className="text-[var(--color-accent)]" />
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] font-medium">
                        Drop an image here or click to browse
                      </p>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        JPG, PNG, WEBP &middot; Max 5MB
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or paste image URL..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] transition-all text-sm"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50">
              <p className="text-xs text-[var(--color-text-tertiary)]">
                {course.moduleCount} module{course.moduleCount !== 1 ? "s" : ""} · {course.videoCount} video{course.videoCount !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/50 text-sm font-medium transition-all cursor-pointer active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || success}
                  className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold flex items-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {success ? (
                    <><CheckCircle2 size={16} /> Saved!</>
                  ) : saving ? (
                    <><Loader2 size={16} className="animate-spin" /> Saving...</>
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>,
    document.body
  );
}
