import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Video, Search, ChevronDown, BookOpen, Headphones, User, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router";

type ImportMode = "course" | "audiobook";

export default function CourseUploadView({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  // ── Shared state ────────────────────────────────────────────────────────────
  const [importMode, setImportMode] = useState<ImportMode>("course");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]     = useState("AI");
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Course-only state ────────────────────────────────────────────────────────
  const [ageSegment, setAgeSegment] = useState("All Levels");
  const [price, setPrice]           = useState("0");

  // ── Audiobook-only state ─────────────────────────────────────────────────────
  const [author, setAuthor]         = useState("");
  const [coverUrl, setCoverUrl]     = useState("");

  const courseCategories    = ["AI", "Coding", "Languages", "Curious Kitty", "Finance", "Art", "Advanced Skills", "Mental Health"];
  const audiobookCategories = ["Technology", "Philosophy", "Science", "Business", "Psychology", "History", "Self-Help"];
  const categories = importMode === "course" ? courseCategories : audiobookCategories;

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

  // Reset form when switching mode
  useEffect(() => {
    setPreviewData(null);
    setTitle("");
    setDescription("");
    setPlaylistUrl("");
    setCategory(importMode === "course" ? "AI" : "Technology");
  }, [importMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePreview = async () => {
    if (!playlistUrl) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API_BASE}/admin/import/youtube/preview?playlistUrl=${encodeURIComponent(playlistUrl)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to preview");
      const data = await res.json();
      setPreviewData(data);
      if (!title) setTitle(data.playlistTitle || "");
    } catch {
      alert("Error fetching preview. Ensure playlist is unlisted or public.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishCourse = async () => {
    if (!previewData) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/import/youtube/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, ageSegment, category, price, previewData }),
      });
      if (!res.ok) {
        if (res.status === 409) throw new Error("This playlist has already been imported.");
        throw new Error("Failed to publish");
      }
      alert("✅ Course Published Successfully!");
      onUploadSuccess();
      setPreviewData(null); setTitle(""); setDescription(""); setPlaylistUrl("");
    } catch (err: any) {
      alert(err.message || "Error publishing course.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishAudiobook = async () => {
    if (!previewData) return;
    if (!title.trim()) { alert("Please enter a title."); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/import/youtube/publish-audiobook`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description, category, coverUrl, previewData }),
      });
      if (!res.ok) throw new Error("Failed to publish audiobook");
      alert("✅ Audiobook Published Successfully! It will appear in the Audio Library.");
      onUploadSuccess();
      setPreviewData(null); setTitle(""); setDescription(""); setPlaylistUrl("");
      setAuthor(""); setCoverUrl("");
    } catch (err: any) {
      alert(err.message || "Error publishing audiobook.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    if (importMode === "course") handlePublishCourse();
    else handlePublishAudiobook();
  };

  return (
    <motion.div className="pb-20">
      <Link
        to="/admin/courses"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      {/* ── Mode Toggle ── */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
          Import As
        </p>
        <div className="inline-flex bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-2xl p-1.5 gap-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setImportMode("course")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              importMode === "course"
                ? "bg-[var(--color-accent)] text-white shadow-md"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            <BookOpen size={16} /> Course
          </button>
          <button
            type="button"
            onClick={() => setImportMode("audiobook")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              importMode === "audiobook"
                ? "bg-[var(--color-accent)] text-white shadow-md"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            <Headphones size={16} /> Audiobook
          </button>
        </div>

        {/* Mode description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={importMode}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[var(--color-text-tertiary)] mt-2"
          >
            {importMode === "course"
              ? "Imports the playlist as a video course — each video becomes a lesson."
              : "Imports the playlist as an audiobook — each video becomes a chapter in the Audio Library."}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">
            {importMode === "course" ? "Import YouTube Playlist" : "Import as Audiobook"}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {importMode === "course"
              ? "Import a YouTube playlist to create a new ecosystem course."
              : "Import a YouTube playlist to create a new audiobook in the Audio Library."}
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={loading || !previewData}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center justify-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <CheckCircle size={18} />
          {loading
            ? "Processing..."
            : importMode === "course"
            ? "Publish Course Live"
            : "Publish Audiobook"}
        </button>
      </div>

      <div className="admin-glass-card space-y-6" style={{ overflow: "visible" }}>

        {/* ── Category ── */}
        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] bg-[var(--color-background-primary)]/40 backdrop-blur-sm text-[var(--color-text-primary)] outline-none transition-all"
            >
              {category} <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-xl border border-[var(--color-border-light)] bg-[var(--color-background-primary)] backdrop-blur-xl shadow-xl overflow-hidden">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setCategory(cat); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-accent)]/10 ${
                      category === cat ? "text-[var(--color-accent)] font-semibold" : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Audiobook-only extra fields ── */}
        <AnimatePresence>
          {importMode === "audiobook" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden"
            >
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <User size={13} /> Author / Narrator
                </label>
                <input
                  type="text"
                  placeholder="e.g. Robert C. Martin"
                  className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-primary)]/40 backdrop-blur-sm text-[var(--color-text-primary)] text-sm"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <ImageIcon size={13} /> Cover Image URL <span className="text-[var(--color-text-tertiary)] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://... (leave blank to use playlist thumbnail)"
                  className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-primary)]/40 backdrop-blur-sm text-[var(--color-text-primary)] text-sm"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── YouTube Playlist URL ── */}
        <div>
          <label className="block text-sm font-semibold mb-2">YouTube Playlist URL</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="https://youtube.com/playlist?list=..."
              className="admin-input flex-1 px-4 py-3 rounded-xl outline-none border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] bg-[var(--color-background-primary)]/40 text-[var(--color-text-primary)] backdrop-blur-sm w-full"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
            />
            <button
              onClick={handlePreview}
              disabled={loading}
              className="w-full sm:w-auto justify-center px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] transition-all duration-150 rounded-xl font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search size={18} /> Preview
            </button>
          </div>
        </div>

        {/* ── Preview results ── */}
        {previewData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--color-border-light)]">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {importMode === "course" ? "Course Title" : "Audiobook Title"}
                </label>
                <input
                  type="text"
                  className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] outline-none bg-[var(--color-background-primary)]/40 backdrop-blur-sm text-[var(--color-text-primary)]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] h-24 outline-none bg-[var(--color-background-primary)]/40 backdrop-blur-sm text-[var(--color-text-primary)]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Course-only: Level + Price */}
              {importMode === "course" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Level</label>
                    <select
                      className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] outline-none bg-[var(--color-background-primary)]/40 text-[var(--color-text-primary)] cursor-pointer"
                      value={ageSegment}
                      onChange={(e) => setAgeSegment(e.target.value)}
                    >
                      {["All Levels","Beginner","Intermediate","Advanced","Kids","Teens","Adults"].map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (0 = Free)</label>
                    <input
                      type="number"
                      min="0"
                      className="admin-input w-full px-4 py-3 rounded-xl border border-[var(--color-border-light)] outline-none bg-[var(--color-background-primary)]/40 text-[var(--color-text-primary)]"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Video/Chapter list preview */}
            <div className="p-4 bg-[var(--color-background-primary)] rounded-2xl border border-[var(--color-border-light)]">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                {importMode === "course"
                  ? <><Video size={18} className="text-[var(--color-accent)]" /> Preview Found ({previewData.totalVideos} Videos)</>
                  : <><Headphones size={18} className="text-[var(--color-accent)]" /> {previewData.totalVideos} Chapters Found</>
                }
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {previewData.videos.map((vid: any) => (
                  <div
                    key={vid.videoId}
                    className="text-sm bg-[var(--color-background-secondary)] p-3 rounded-lg flex gap-3 truncate border border-[var(--color-border-light)]"
                  >
                    <span className="font-bold text-[var(--color-accent)] shrink-0">{vid.playlistOrder}.</span>
                    <span className="truncate">{vid.title}</span>
                  </div>
                ))}
              </div>

              {/* Cover preview for audiobook */}
              {importMode === "audiobook" && (coverUrl || previewData.thumbnailUrl) && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
                  <p className="text-xs text-[var(--color-text-tertiary)] mb-2">Cover preview:</p>
                  <img
                    src={coverUrl || previewData.thumbnailUrl}
                    alt="Cover"
                    className="w-24 h-24 rounded-xl object-cover border border-[var(--color-border-light)]"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}