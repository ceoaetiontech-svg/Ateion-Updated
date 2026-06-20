import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-6">
      <div className="min-w-0">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
          style={{ transformOrigin: "left" }}
        />
        <motion.h2 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl font-bold font-['OV_Soge'] mb-2 leading-tight tracking-tight text-[var(--color-text-primary)]"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
      {action && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex-shrink-0 flex items-center gap-2"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
