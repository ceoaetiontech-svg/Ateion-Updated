import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useToast } from "../../utils/toast";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colorMap = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  error: "border-red-500/30 bg-red-500/10 text-red-500",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-500",
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
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg backdrop-blur-md ${colorMap[toast.type]} bg-[var(--color-background-secondary)] min-w-[300px] max-w-[420px]`}
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
