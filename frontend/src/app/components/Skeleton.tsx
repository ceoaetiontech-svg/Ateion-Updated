import React from "react";

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-md)] bg-[var(--color-border-light)] ${className}`}
      {...props}
    />
  );
}
