import { useState, useRef, useEffect } from "react";
import { Star, Search, X, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  selectedDurations: string[];
  toggleDuration: (v: string) => void;
  selectedLevels: string[];
  toggleLevel: (v: string) => void;
  selectedRatings: string[];
  toggleRating: (v: string) => void;
  selectedTopics: string[];
  toggleTopic: (v: string) => void;
  allTopics: string[];
  priceFilter: "all" | "free" | "paid";
  setPriceFilter: (v: "all" | "free" | "paid") => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  sortOptions: { id: string; label: string }[];
  totalCount: number;
  onClear: () => void;
  hasFilters: boolean;
}

const DURATIONS = ["Under 1h", "1–3h", "3–10h", "10h+"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const RATING_OPTIONS = [4.5, 4.0, 3.5];
const PRICE_OPTIONS = [
  { id: "all" as const, label: "All" },
  { id: "free" as const, label: "Free" },
  { id: "paid" as const, label: "Paid" },
];

function ActivePill({ label, active, onClick }: { label: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all cursor-pointer ${
        active
          ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30"
          : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-[10px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest">{title}</h4>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export default function FilterBar(props: FilterBarProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [topicSearch, setTopicSearch] = useState("");
  const barRef = useRef<HTMLDivElement>(null);
  const filteredTopics = props.allTopics.filter(t => t.toLowerCase().includes(topicSearch.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtersCount =
    props.selectedDurations.length +
    props.selectedLevels.length +
    props.selectedRatings.length +
    props.selectedTopics.length +
    (props.priceFilter !== "all" ? 1 : 0);

  return (
    <div ref={barRef} className="relative">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {/* Filters trigger */}
        <button
          onClick={() => setPanelOpen(prev => !prev)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all shrink-0 cursor-pointer ${
            panelOpen || props.hasFilters
              ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30"
              : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters{filtersCount > 0 ? ` (${filtersCount})` : ""} · {props.sortOptions.find(s => s.id === props.sortBy)?.label || ""}
        </button>

        {/* Clear all */}
        {props.hasFilters && (
          <button onClick={props.onClear} className="shrink-0 text-xs font-bold text-[var(--color-accent)] hover:underline px-2 py-2 cursor-pointer">
            Clear all
          </button>
        )}

        {/* Course count */}
        <span className="shrink-0 ml-auto text-xs text-[var(--color-text-tertiary)] font-medium pl-2 border-l border-[var(--color-border-light)]">
          {props.totalCount} course{props.totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filters panel */}
      {panelOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-background-primary)] border border-[var(--color-border-light)] rounded-2xl shadow-xl z-[999] p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            {/* Duration */}
            <FilterGroup title="Duration">
              {DURATIONS.map(dur => (
                <ActivePill
                  key={dur}
                  label={dur}
                  active={props.selectedDurations.includes(dur)}
                  onClick={() => props.toggleDuration(dur)}
                />
              ))}
            </FilterGroup>

            {/* Level */}
            <FilterGroup title="Level">
              {LEVELS.map(level => (
                <ActivePill
                  key={level}
                  label={level}
                  active={props.selectedLevels.includes(level)}
                  onClick={() => props.toggleLevel(level)}
                />
              ))}
            </FilterGroup>

            {/* Rating */}
            <FilterGroup title="Rating">
              {RATING_OPTIONS.map(threshold => {
                const key = `${threshold}+`;
                const fullStars = Math.floor(threshold);
                return (
                  <ActivePill
                    key={key}
                    label={
                      <span className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className={i < fullStars ? "text-[var(--color-warning)] fill-[var(--color-warning)]" : "text-[var(--color-text-tertiary)]"} />
                        ))}
                        <span className="ml-0.5">{threshold}+</span>
                      </span>
                    }
                    active={props.selectedRatings.includes(key)}
                    onClick={() => props.toggleRating(key)}
                  />
                );
              })}
            </FilterGroup>

            {/* Sort */}
            <FilterGroup title="Sort">
              {props.sortOptions.map(opt => (
                <ActivePill
                  key={opt.id}
                  label={opt.label}
                  active={props.sortBy === opt.id}
                  onClick={() => props.setSortBy(opt.id)}
                />
              ))}
            </FilterGroup>

            {/* Price */}
            <FilterGroup title="Price">
              {PRICE_OPTIONS.map(opt => (
                <ActivePill
                  key={opt.id}
                  label={opt.label}
                  active={props.priceFilter === opt.id}
                  onClick={() => props.setPriceFilter(opt.id)}
                />
              ))}
            </FilterGroup>

            {/* Topic */}
            <FilterGroup title="Topic">
              <div className="relative w-full mb-1">
                <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={topicSearch}
                  onChange={e => setTopicSearch(e.target.value)}
                  className="w-full bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-lg pl-7 pr-2 py-1.5 text-[11px] font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
                {topicSearch && (
                  <button onClick={() => setTopicSearch("")} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer">
                    <X size={12} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {filteredTopics.map(topic => (
                  <ActivePill
                    key={topic}
                    label={topic}
                    active={props.selectedTopics.includes(topic)}
                    onClick={() => props.toggleTopic(topic)}
                  />
                ))}
                {filteredTopics.length === 0 && (
                  <p className="text-[11px] text-[var(--color-text-tertiary)] py-2">No topics match</p>
                )}
              </div>
            </FilterGroup>
          </div>
        </div>
      )}
    </div>
  );
}
