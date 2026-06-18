import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Headphones, Clock, Layers, Play, Search, ArrowRight } from "lucide-react";
import { mockAudiobooks } from "../shared/audiobooksData";
import { staggerContainer, fadeUpItem } from "../shared/types";

const CATEGORIES = ["All", "Technology", "Philosophy", "Science"] as const;

export default function AudiobooksLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredAudiobooks = mockAudiobooks.filter((ab) => {
    const matchesCat = selectedCategory === "All" || ab.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = ab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ab.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatDuration = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.round((sec % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight font-display" style={{ fontFamily: "var(--font-display)" }}>
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
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent_light)]"
                : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid of Audiobooks */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAudiobooks.length > 0 ? (
          filteredAudiobooks.map((ab) => (
            <motion.div
              key={ab.id}
              variants={fadeUpItem}
              onClick={() => navigate(`/playground/audiobook/${ab.id}`)}
              className="group flex flex-col bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 cursor-pointer h-full relative"
              whileHover={{ y: -4 }}
            >
              {/* Cover Art Box */}
              <div 
                className="h-44 w-full relative flex items-center justify-center overflow-hidden"
                style={{ background: ab.coverUrl }}
              >
                {/* Glowing Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                
                {/* Headphones Icon Grid Background */}
                <Headphones size={80} className="text-white/10 absolute -right-4 -bottom-4 rotate-12 transition-transform duration-500 group-hover:scale-110" />
                
                {/* Animated Play button Overlay */}
                <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[var(--color-accent)] shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-10">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-md">
                    {ab.category}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-1">
                    {ab.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-tertiary)] font-medium">
                    By {ab.author}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed pt-1">
                    {ab.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 mt-4 border-t border-[var(--color-border-light)]/60 text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-1 text-xs">
                    <Clock size={14} />
                    <span>{formatDuration(ab.duration)}</span>
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
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Try relaxing your search terms or choosing a different category.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
