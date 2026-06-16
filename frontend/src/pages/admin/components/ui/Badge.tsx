import type { ReactNode } from "react";

interface BadgeProps {
  variant: "role" | "status";
  value: string;
  children?: ReactNode;
}

const roleStyles: Record<string, string> = {
  Admin: "bg-purple-500/10 text-purple-600 border border-purple-500/20",
  Instructor: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  Student: "bg-gray-500/10 text-gray-600 border border-gray-500/20",
  Partner: "bg-teal-500/10 text-teal-600 border border-teal-500/20",
};

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Suspended: "bg-red-500/10 text-red-600 border border-red-500/20",
  Published: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Draft: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Archived: "bg-gray-500/10 text-gray-600 border border-gray-500/20",
};

const statusDot: Record<string, string> = {
  Active: "bg-emerald-500",
  Suspended: "bg-red-500",
  Published: "bg-emerald-500",
  Draft: "bg-amber-500",
  Archived: "bg-gray-500",
};

export default function Badge({ variant, value, children }: BadgeProps) {
  const styles = variant === "role" ? roleStyles[value] : statusStyles[value];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles || ""}`}>
      {variant === "status" && (
        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[value] || "bg-gray-500"}`} />
      )}
      {children || value}
    </span>
  );
}
