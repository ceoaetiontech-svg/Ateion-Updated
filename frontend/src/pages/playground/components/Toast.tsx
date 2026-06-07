import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, X } from "lucide-react";

export default function Toast({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] shrink-0">
            <CheckCircle size={18} />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
            <Zap size={14} className="text-[var(--color-accent)]" />
            {message}
          </div>
          <button
            onClick={onDismiss}
            className="ml-2 p-1 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
