import { X } from "lucide-react";

interface FilterSidebarProps {
  selectedLevels: string[];
  toggleLevel: (v: string) => void;
  selectedDurations: string[];
  toggleDuration: (v: string) => void;
  selectedRatings: string[];
  toggleRating: (v: string) => void;
  selectedTopics: string[];
  toggleTopic: (v: string) => void;
  allTopics: string[];
  showFreeOnly: boolean;
  setShowFreeOnly: (v: boolean) => void;
  onClear: () => void;
}

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["Under 1h", "1–3h", "3–10h", "10h+"];
const RATINGS = ["4.5+", "4.0+", "3.5+"];

function FilterGroup({ label, options, selected, toggle, colorMap }: {
  label: string;
  options: string[];
  selected: string[];
  toggle: (v: string) => void;
  colorMap?: (v: string) => string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2.5">{label}</p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                active
                  ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  active ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-[var(--color-border-medium)]"
                }`}
              >
                {active && <X size={10} className="text-[#fff]" strokeWidth={3} />}
              </div>
              <span style={colorMap && active ? { color: colorMap(opt) } : undefined}>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const count = props.selectedLevels.length + props.selectedDurations.length + props.selectedRatings.length + props.selectedTopics.length + (props.showFreeOnly ? 1 : 0);

  return (
    <div className="bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-[var(--color-text-primary)]">Filters</h4>
        {count > 0 && (
          <button onClick={props.onClear} className="text-xs text-[var(--color-accent)] font-bold hover:underline">
            Clear all ({count})
          </button>
        )}
      </div>

      <FilterGroup label="Level" options={LEVELS} selected={props.selectedLevels} toggle={props.toggleLevel} />
      <FilterGroup label="Duration" options={DURATIONS} selected={props.selectedDurations} toggle={props.toggleDuration} />
      <FilterGroup label="Rating" options={RATINGS} selected={props.selectedRatings} toggle={props.toggleRating} />

      <div className="mb-5">
        <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2.5">Price</p>
        <button
          onClick={() => props.setShowFreeOnly(!props.showFreeOnly)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left w-full ${
            props.showFreeOnly
              ? "bg-[var(--color-success)]/10 text-[var(--color-success)] font-bold"
              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              props.showFreeOnly ? "border-[var(--color-success)] bg-[var(--color-success)]" : "border-[var(--color-border-medium)]"
            }`}
          >
            {props.showFreeOnly && <X size={10} className="text-[#fff]" strokeWidth={3} />}
          </div>
          Free only
        </button>
      </div>

      <div className="mb-2">
        <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2.5">Topic</p>
        <div className="flex flex-wrap gap-1.5">
          {props.allTopics.map((topic) => {
            const active = props.selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => props.toggleTopic(topic)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                  active
                    ? "text-[#fff] shadow-sm"
                    : "bg-[var(--color-background-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
                }`}
                style={active ? { backgroundColor: `var(--color-${["React", "TypeScript", "Frontend", "Mobile"].includes(topic) ? "info" : ["Design", "Figma", "UX"].includes(topic) ? "accent" : ["Python", "AI"].includes(topic) ? "warning" : "success"})` } : undefined}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
