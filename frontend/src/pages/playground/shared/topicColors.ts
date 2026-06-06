const TOPIC_COLOR_MAP: Record<string, string> = {
  React: "var(--color-info)",
  TypeScript: "var(--color-info)",
  Frontend: "var(--color-info)",
  Python: "var(--color-warning)",
  Data: "var(--color-success)",
  Statistics: "var(--color-success)",
  "Node.js": "var(--color-success)",
  MongoDB: "var(--color-success)",
  "Full Stack": "var(--color-info)",
  Design: "var(--color-accent)",
  Figma: "var(--color-accent)",
  UX: "var(--color-accent)",
  AI: "var(--color-warning)",
  Mobile: "var(--color-info)",
};

export function getTopicColor(topics: string[]): string {
  for (const topic of topics) {
    const color = TOPIC_COLOR_MAP[topic];
    if (color) return color;
  }
  return "var(--color-border-medium)";
}
