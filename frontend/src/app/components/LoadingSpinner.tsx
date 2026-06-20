import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[var(--color-background-primary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-20 pt-32 animate-pulse">
        <div className="h-10 w-3/4 bg-[var(--color-border-light)] rounded-lg mb-4" />
        <div className="h-4 w-1/2 bg-[var(--color-border-light)] rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="h-48 bg-[var(--color-border-light)] rounded-xl" />
          <div className="h-48 bg-[var(--color-border-light)] rounded-xl" />
          <div className="h-48 bg-[var(--color-border-light)] rounded-xl" />
        </div>
        <div className="h-64 bg-[var(--color-border-light)] rounded-xl mb-6" />
        <div className="h-32 bg-[var(--color-border-light)] rounded-xl" />
      </div>
    </div>
  );
}
