import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function VerticalTicker() {
  const words = ["Inefficient", "Outdated", "Deprecated", "Stagnant"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  const ITEM_HEIGHT = 70;
  // Duplicate words so wrap-around always has a prev/next
  const repeated = [...words, ...words, ...words];
  const offset = words.length; // start from middle set

  return (
    <div
      style={{
        height: `${ITEM_HEIGHT * 3}px`,
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ y: -(index + offset) * ITEM_HEIGHT + ITEM_HEIGHT }}
        transition={{ duration: 0.85, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {repeated.map((word, i) => {
          const actualIndex = i - offset;
          const distance = actualIndex - index;
          const isActive = distance === 0;
          const isPrev = distance === -1;
          const isNext = distance === 1;
          const isVisible = isActive || isPrev || isNext;

          return (
            <motion.p
              key={i}
              animate={{
                opacity: isActive ? 1 : isVisible ? 0.35 : 0,
                scale: isActive ? 1 : 0.88,
              }}
              transition={{ duration: 0.5 }}
              style={{
                height: `${ITEM_HEIGHT}px`,
                display: "flex",
                alignItems: "center",
                fontSize: isActive ? "clamp(36px, 4vw, 56px)" : "clamp(28px, 3vw, 42px)",
                fontFamily: "'OV Soge', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: isActive ? "#ffffff" : "var(--color-text-primary)",
                flexShrink: 0,
                margin: 0,
                padding: 0,
                transformOrigin: "left center",
              }}
            >
              {word}
            </motion.p>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function RedIntelligenceCard() {
  return (
    <div className="clay-card bg-[var(--color-primary)] content-stretch flex flex-col items-center justify-center pb-[32px] sm:pb-[48px] pl-[24px] sm:pl-[64px] pr-[16px] sm:pr-[48px] pt-[32px] sm:pt-[48px] relative rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink flex-1 w-full">
      <div className="content-stretch flex flex-col gap-[24px] sm:gap-[32px] items-start relative shrink-0 w-full max-w-[800px]">
        {/* Desktop layout */}
        <div className="hidden lg:flex items-center justify-between relative shrink-0 w-full gap-[24px]">
          <div className="relative shrink-0 w-[50%]">
            <p className="font-bold relative leading-[1.15] not-italic text-[28px] lg:text-[36px] xl:text-[42px] text-[var(--color-text-primary)] w-full" style={{ fontFamily: "'OV Soge', sans-serif", letterSpacing: "-0.01em" }}>
              Education is<br />
              Not broken.<br />
              Its measurement<br />
              System is :
            </p>
          </div>
          <div className="w-[45%] flex justify-end xl:justify-start">
            <VerticalTicker />
          </div>
        </div>
        {/* Mobile & Tablet layout */}
        <div className="lg:hidden flex flex-col gap-[16px] items-start w-full">
          <p className="font-bold relative leading-[1.25] not-italic text-[28px] sm:text-[32px] md:text-[36px] text-[var(--color-text-primary)]" style={{ fontFamily: "'OV Soge', sans-serif", letterSpacing: "-0.01em" }}>
            Education is<br />
            Not broken.<br />
            Its measurement<br />
            System is :
          </p>
          <div className="w-full flex justify-start">
            <VerticalTicker />
          </div>
        </div>
        <div className="w-full mt-[12px] sm:mt-[20px]">
          <p className="font-['Manrope',sans-serif] h-auto leading-[1.3] not-italic relative shrink-0 text-[var(--color-text-primary)] w-full flex-1">
            <span className="text-[20px] sm:text-[24px] md:text-[26px]">{`Ateion replaces memory-based validation with `}</span>
            <br className="hidden sm:block" />
            <span className="font-['Manrope',sans-serif] italic text-[32px] sm:text-[42px] md:text-[48px]">Capability-based intelligence.</span>
          </p>
        </div>
      </div>
    </div>
  );
}