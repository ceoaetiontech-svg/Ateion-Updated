const ONE_MINUTE = 60_000;
const ONE_HOUR = 3_600_000;
const ONE_DAY = 86_400_000;
const ONE_WEEK = 604_800_000;
const ONE_MONTH = 2_592_000_000;

export function relativeTime(date: string | Date): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;

  if (diff < ONE_MINUTE) return "just now";
  if (diff < ONE_HOUR) {
    const m = Math.round(diff / ONE_MINUTE);
    return `${m}m ago`;
  }
  if (diff < ONE_DAY) {
    const h = Math.round(diff / ONE_HOUR);
    return `${h}h ago`;
  }
  if (diff < ONE_WEEK) {
    const d = Math.round(diff / ONE_DAY);
    return `${d}d ago`;
  }
  if (diff < ONE_MONTH) {
    const w = Math.round(diff / ONE_WEEK);
    return `${w}w ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(then);
}
