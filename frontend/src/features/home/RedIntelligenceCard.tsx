const accents = [
  { bg: "rgba(232,133,106,0.08)", bar: "#E8856A" },
  { bg: "rgba(200,197,220,0.25)", bar: "#C8C5DC" },
  { bg: "rgba(232,133,106,0.08)", bar: "#E8856A" },
  { bg: "rgba(200,197,220,0.25)", bar: "#C8C5DC" },
  { bg: "rgba(232,133,106,0.08)", bar: "#E8856A" },
  { bg: "rgba(200,197,220,0.25)", bar: "#C8C5DC" },
];

const quotes = [
  {
    text: "Degrees Are Rising. Job Readiness Isn't.",
    source: "World Economic Forum",
  },
  {
    text: "High Scores. Low Thinking.",
    source: "Harvard Graduate School of Education",
  },
  {
    text: "Education Moves in Years. The World Moves in Weeks.",
    source: "McKinsey & Company",
  },
  {
    text: "Students Are Being Trained for a World That No Longer Exists.",
    source: "Stanford AI Index",
  },
  {
    text: "The World Is Moving Beyond Marks. Most Schools Aren't.",
    source: "OECD (PISA & Education Trends)",
  },
  {
    text: "What If Exams Measured Thinking Instead of Memory?",
    source: "OECD Future of Education & Skills 2030",
  },
];

function QuoteCard({ text, source, accent }: { text: string; source: string; accent: { bg: string; bar: string } }) {
  return (
    <div
      className="flex flex-col p-5 sm:p-6 rounded-[16px] transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: accent.bg,
        border: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <p className="text-slate-900 dark:text-white text-[13px] sm:text-[14px] font-semibold leading-[1.4] mb-3 flex-1" style={{ fontFamily: "var(--font-body)" }}>
        <span className="text-[20px] leading-[0] align-top mr-1" style={{ color: accent.bar }}>&ldquo;</span>
        {text}
        <span className="text-[20px] leading-[0] align-bottom ml-1" style={{ color: accent.bar }}>&rdquo;</span>
      </p>
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/20">
        <div className="w-[3px] h-[18px] rounded-full shrink-0" style={{ background: accent.bar }} />
        <p className="text-slate-900/60 dark:text-white/60 text-[11px] sm:text-[12px] font-medium tracking-wide uppercase" style={{ fontFamily: "var(--font-body)" }}>
          {source}
        </p>
      </div>
    </div>
  );
}

export default function RedIntelligenceCard() {
  return (
    <div className="clay-card flex flex-col items-center justify-center pb-[32px] sm:pb-[48px] pl-[24px] sm:pl-[64px] pr-[16px] sm:pr-[48px] pt-[32px] sm:pt-[48px] relative rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink flex-1 w-full bg-[var(--color-accent)] dark:bg-[var(--color-accent)]">
      <div className="flex flex-col gap-[28px] sm:gap-[36px] items-start relative shrink-0 w-full max-w-[900px]">
        {/* Header + tagline */}
        <div className="w-full">
          <p className="font-bold leading-[0.95] tracking-[-0.05em] text-[32px] sm:text-[40px] md:text-[48px] text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
            Education is<br />
            Not broken.
          </p>
          <p className="text-slate-900/80 dark:text-white/80 text-[16px] sm:text-[18px] md:text-[20px] mt-4 max-w-[600px]" style={{ fontFamily: "var(--font-body)" }}>
            Its measurement system is outdated. Ateion replaces memory-based validation with capability-based intelligence.
          </p>
        </div>

        {/* Quote grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
          {quotes.map((q, i) => (
            <QuoteCard key={i} text={q.text} source={q.source} accent={accents[i]} />
          ))}
        </div>
      </div>
    </div>
  );
}
