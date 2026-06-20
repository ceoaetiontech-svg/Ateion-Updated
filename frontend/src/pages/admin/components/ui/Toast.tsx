import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useToast } from "../../utils/toast";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colorMap = {
  success: "border-l-emerald-500 text-emerald-600 dark:text-emerald-400",
  error: "border-l-red-500 text-red-600 dark:text-red-400",
  info: "border-l-blue-500 text-blue-600 dark:text-blue-400",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[var(--color-border-light)] border-l-4 shadow-[var(--shadow-xl)] backdrop-blur-xl ${colorMap[toast.type]} bg-[var(--color-background-secondary)]/95 min-w-[300px] max-w-[420px]`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">
                {toast.message}
              </span>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-lg hover:bg-[var(--color-background-tertiary)] transition-colors cursor-pointer text-[var(--color-text-tertiary)]"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
