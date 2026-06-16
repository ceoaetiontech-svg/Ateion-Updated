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
        <p className="font-semibold text-[var(--color-text-primary)] text-sm">{label}</p>
        <p className="text-sm text-[var(--color-text-tertiary)]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          checked
            ? danger
              ? "bg-red-500"
              : "bg-[var(--color-accent)]"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
