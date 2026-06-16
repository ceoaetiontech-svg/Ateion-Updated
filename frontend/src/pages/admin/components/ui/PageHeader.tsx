import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
          style={{ transformOrigin: "left" }}
        />
        <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">{title}</h2>
        <p className="text-[var(--color-text-secondary)]">{subtitle}</p>
      </div>
      {action && (
        <div className="flex-shrink-0">{action}</div>
      )}
    </div>
  );
}
