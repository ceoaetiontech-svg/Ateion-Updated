import { motion } from "framer-motion";

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  danger?: boolean;
}

export default function Toggle({ label, description, checked, onChange, danger = false }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-[var(--color-text-primary)] text-sm leading-normal">{label}</p>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5 leading-normal">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-primary)] ${
          checked
            ? danger
              ? "bg-red-500 shadow-sm shadow-red-500/30"
              : "bg-[var(--color-accent)] shadow-[var(--shadow-accent)]"
            : "bg-[var(--color-background-tertiary)]/60 dark:bg-gray-800"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0"
          style={{ translateX: checked ? 20 : 0 }}
        />
      </button>
    </div>
  );
}
