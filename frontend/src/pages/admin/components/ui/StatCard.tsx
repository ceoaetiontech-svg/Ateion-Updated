import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import type { LucideIcon } from "lucide-react";
import { itemVariants } from "../../utils/variants";

interface IChartPoint {
  value: number;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  border: string;
  sparklineData?: IChartPoint[];
}

export default function StatCard({ label, value, icon: Icon, gradient, iconBg, border, sparklineData }: StatCardProps) {
  return (
    <motion.div
      className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-5 border border-[var(--color-border-light)] relative overflow-hidden group cursor-default"
      variants={itemVariants}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative z-10">
        <div
          className={`w-11 h-11 rounded-xl ${iconBg} border ${border} flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}
        >
          <Icon size={20} className="transition-transform duration-300 group-hover:scale-105" />
        </div>
        <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-1 tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
          {value}
        </p>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-2 h-10 -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`sparkline-${label}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  fill={`url(#sparkline-${label})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
