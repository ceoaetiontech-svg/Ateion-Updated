import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Headphones, Clock, Layers, Play, Search, ArrowRight, Loader2 } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";

interface ApiChapter {
  id: number;
  title: string;
  youtubeVideoId: string;
  durationSeconds: number;
  sortOrder: number;
}

interface ApiAudiobook {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
  coverUrl: string;
  createdAt: string;
  chapters: ApiChapter[];
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Gradient fallbacks when no cover image
const COVER_GRADIENTS = [
  "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
  "linear-gradient(135deg, #d97706 0%, #dc2626 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
  "linear-gradient(135deg, #059669 0%, #0284c7 100%)",
  "linear-gradient(135deg, #ea580c 0%, #eab308 100%)",
  "linear-gradient(135deg, #be185d 0%, #7c3aed 100%)",
];

function formatDuration(sec: number) {
  const hrs = Math.floor(sec / 3600);
  const mins = Math.round((sec % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

export default function AudiobooksLibraryPage() {
  const [audiobooks, setAudiobooks] = useState<ApiAudiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/content/audiobooks`);
        if (!res.ok) {
          // Try to read any error body from the server
          let serverMsg = "";
          try {
            const body = await res.text();
            serverMsg = body ? ` — ${body.slice(0, 120)}` : "";
          } catch {
            // ignore
          }
          throw new Error(`Server returned ${res.status} ${res.statusText}${serverMsg}`);
        }
        const data: ApiAudiobook[] = await res.json();
        setAudiobooks(data);
      } catch (err: any) {
        // Network error (backend not reachable) or server error
        const msg: string = err?.message || "Could not load audiobooks";
        setError(msg);
        console.error("[AudiobooksLibraryPage] fetch error:", msg);
      } finally {
        setLoading(false);
      }
    };
    fetchAudiobooks();
  }, []);

  // Build category list dynamically from DB
  const categories = ["All", ...Array.from(new Set(audiobooks.map((ab) => ab.category).filter(Boolean)))];

  const filtered = audiobooks.filter((ab) => {
    const matchCat = selectedCategory === "All" || ab.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      ab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ab.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalDuration = (ab: ApiAudiobook) =>
    ab.chapters.reduce((sum, ch) => sum + (ch.durationSeconds || 0), 0);

  const coverStyle = (ab: ApiAudiobook, idx: number): React.CSSProperties => {
    const url = ab.coverUrl;
    if (url && url.startsWith("http")) {
      return { backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center" };
    }
    return { background: COVER_GRADIENTS[idx % COVER_GRADIENTS.length] };
  };

  return (
    <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate="show">

      {/* Header */}
      <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2
            className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight font-display"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Audio Library
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Listen to professionally narrated guides and summaries to learn on the go.
          </p>
        </div>
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
          <input
            type="text"
            placeholder="Search audiobooks or authors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={fadeUpItem} className="flex gap-2.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent_light)]"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* States: Loading / Error / Empty / Grid */}
      {loading ? (
        <motion.div variants={fadeUpItem} className="flex flex-col items-center justify-center py-24 text-[var(--color-text-tertiary)]">
          <Loader2 size={36} className="animate-spin mb-3 text-[var(--color-accent)]" />
          <p className="text-sm font-medium">Loading audiobooks...</p>
        </motion.div>
      ) : error ? (
        <motion.div variants={fadeUpItem} className="py-12 flex flex-col items-center gap-4">
          {/* Error Banner */}
          <div className="w-full max-w-xl bg-red-50 border border-red-200 rounded-2xl p-5 text-left">
            <div className="flex items-start gap-3">
              <Headphones size={20} className="text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-600">Failed to load audiobooks</p>
                <p className="text-xs text-red-500 mt-1 break-all">{error}</p>
              </div>
            </div>
          </div>
          {/* Fix hint */}
          <div className="w-full max-w-xl bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800 space-y-2">
            <p className="font-semibold">💡 How to fix this:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs leading-relaxed">
              <li>
                Open <strong>Supabase → SQL Editor</strong> and run the file{" "}
                <code className="bg-amber-100 px-1 rounded">backend/audiobooks_migration.sql</code>
              </li>
              <li>Make sure the Spring Boot backend is running on port <strong>8080</strong></li>
              <li>Check the browser console (F12) for the full error details</li>
            </ol>
          </div>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((ab, idx) => (
              <motion.div
                key={ab.id}
                variants={fadeUpItem}
                onClick={() => navigate(`/playground/audiobook/${ab.id}`)}
                className="group flex flex-col bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 cursor-pointer h-full relative"
                whileHover={{ y: -4 }}
              >
                {/* Cover */}
                <div className="h-44 w-full relative flex items-center justify-center overflow-hidden" style={coverStyle(ab, idx)}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  <Headphones size={80} className="text-white/10 absolute -right-4 -bottom-4 rotate-12 transition-transform duration-500 group-hover:scale-110" />
                  <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[var(--color-accent)] shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-md">
                      {ab.category}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-1">
                      {ab.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-tertiary)] font-medium">By {ab.author}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed pt-1">
                      {ab.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-[var(--color-border-light)]/60 text-[var(--color-text-tertiary)]">
                    <div className="flex items-center gap-1 text-xs">
                      <Clock size={14} />
                      <span>{formatDuration(totalDuration(ab))}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Layers size={14} />
                      <span>{ab.chapters.length} Chapters</span>
                    </div>
                    <div className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1 text-xs font-bold">
                      <span>Listen</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] flex items-center justify-center mb-4 text-[var(--color-text-tertiary)]">
                <Headphones size={28} />
              </div>
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">No audiobooks found</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
                {audiobooks.length === 0
                  ? "No audiobooks have been added yet. Use the Admin panel to import one."
                  : "Try relaxing your search or choosing a different category."}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
