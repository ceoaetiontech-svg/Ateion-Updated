import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[700] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={onCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-[var(--shadow-xl)] p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                variant === "danger" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
              }`}>
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-[var(--color-text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1 leading-relaxed">{message}</p>
              </div>
              <button
                onClick={onCancel}
                className="p-1.5 rounded-lg hover:bg-[var(--color-background-tertiary)] transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] cursor-pointer -mr-1 -mt-1"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-2">
              <button
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] font-medium text-sm hover:bg-[var(--color-background-tertiary)]/50 hover:text-[var(--color-text-primary)] transition-all duration-150 cursor-pointer active:scale-95"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-150 cursor-pointer active:scale-95 ${
                  variant === "danger"
                    ? "bg-red-500 hover:bg-red-650 shadow-lg shadow-red-500/20"
                    : "bg-[var(--color-accent)] hover:opacity-95 shadow-[var(--shadow-accent)]"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
