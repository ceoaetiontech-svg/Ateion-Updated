export default function SkeletonCourseCard({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-2xl bg-[var(--color-background-secondary)] overflow-hidden animate-pulse">
        <div className="h-2" />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[var(--color-border-light)]" />
            <div className="h-3 w-24 rounded bg-[var(--color-border-light)]" />
          </div>
          <div className="h-4 w-3/4 rounded bg-[var(--color-border-light)] mb-2" />
          <div className="h-3 w-1/2 rounded bg-[var(--color-border-light)] mb-3" />
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-14 rounded-md bg-[var(--color-border-light)]" />
            <div className="h-5 w-16 rounded-md bg-[var(--color-border-light)]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-[var(--color-border-light)]" />
            <div className="h-8 w-24 rounded-xl bg-[var(--color-border-light)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[var(--color-background-secondary)] overflow-hidden animate-pulse">
      <div className="aspect-video bg-[var(--color-border-light)]" />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-border-light)]" />
          <div>
            <div className="h-3 w-20 rounded bg-[var(--color-border-light)] mb-1" />
            <div className="h-2.5 w-14 rounded bg-[var(--color-border-light)]" />
          </div>
        </div>
        <div className="h-5 w-3/4 rounded bg-[var(--color-border-light)] mb-2" />
        <div className="h-4 w-full rounded bg-[var(--color-border-light)] mb-1" />
        <div className="h-4 w-2/3 rounded bg-[var(--color-border-light)] mb-3" />
        <div className="flex items-center gap-4 mb-4">
          <div className="h-3 w-16 rounded bg-[var(--color-border-light)]" />
          <div className="h-3 w-14 rounded bg-[var(--color-border-light)]" />
          <div className="h-3 w-12 rounded bg-[var(--color-border-light)]" />
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--color-border-light)] mb-3" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded bg-[var(--color-border-light)]" />
          <div className="h-9 w-28 rounded-xl bg-[var(--color-border-light)]" />
        </div>
      </div>
    </div>
  );
}
