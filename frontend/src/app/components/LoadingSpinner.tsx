import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background-primary)] z-50">
      <div className="w-12 h-12 border-4 border-[var(--color-accent-light)] border-t-[var(--color-accent)] rounded-full animate-spin"></div>
    </div>
  );
}
