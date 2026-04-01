"use client";

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

  const ITEM_HEIGHT = 52;
  // Duplicate words so wrap-around always has a prev/next
  const repeated = [...words, ...words, ...words];
  const offset = words.length; // start from middle set

  return (
    <div
      style={{
        height: `${ITEM_HEIGHT * 3}px`,
        overflow: "hidden",
        width: "329px",
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
                fontSize: isActive ? "42px" : "36px",
                fontFamily: "'OV Soge', sans-serif",
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: isActive ? "#ffffff" : "#1a1a1a",
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

function DekstopCard() {
    return (
            <div className="bg-[#ff6b6b] content-stretch flex flex-col items-center justify-center pb-[24px] sm:pb-[32px] pl-[24px] sm:pl-[50px] pr-[16px] sm:pr-[24px] pt-[24px] sm:pt-[32px] relative rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink flex-1 w-full">
      <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full max-w-[510px]">
        <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
          <div className="h-auto sm:h-[132px] relative shrink-0 w-full max-w-[235px]">
            <p className="relative leading-[normal] not-italic text-[20px] sm:text-[24px] text-black w-full" style={{ fontFamily: "'OV Soge', sans-serif" }}>Education is not broken. Its measurement system is :</p>
          </div>
          <VerticalTicker />
        </div>
        <p className="font-['Inter',sans-serif] h-auto sm:h-[88px] leading-[0] not-italic relative shrink-0 text-[0px] text-black w-full flex-1 mt-4 sm:mt-0">
          <span className="leading-[28px] sm:leading-[32px] text-[18px] sm:text-[20px]">{`Ateion replaces memory-based validation with `}</span>
          <span className="font-['IBM Plex Sans',sans-serif] italic leading-[28px] sm:leading-[32px] text-[28px] sm:text-[36px]">Capability-based intelligence.</span>
        </p>
      </div>
    </div>
    );
}

function MobileCard() {
    return (
        <div className="bg-[#ff6b6b] flex flex-col items-start justify-center px-[24px] sm:px-[40px] md:px-[48px] py-[28px] sm:py-[40px] relative rounded-[13px] sm:rounded-[20px] shrink-0 md:shrink flex-1 w-full">
            <div className="flex flex-col gap-[20px] sm:gap-[28px] items-start w-full">

                {/* Sentence with inline swapping word — wraps naturally on mobile */}
                <p
                    style={{
                        fontFamily: "'OV Soge', sans-serif",
                        fontSize: "clamp(20px, 3.5vw, 32px)",
                        lineHeight: 1.3,
                        color: "#1a1a1a",
                        margin: 0,
                        wordBreak: "break-word",
                    }}
                >
                    Education is not broken.
                    <br className="hidden sm:block" />
                    {" "}Its measurement system is{" "}
                    <VerticalTicker />
                </p>

                {/* Subtext */}
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "clamp(14px, 1.8vw, 18px)",
                        lineHeight: 1.65,
                        color: "rgba(0,0,0,0.72)",
                        margin: 0,
                    }}
                >
                    Ateion replaces memory-based validation with{" "}
                    <span
                        style={{
                            fontFamily: "'IBM Plex Sans', sans-serif",
                            fontStyle: "italic",
                            fontWeight: 600,
                            fontSize: "clamp(16px, 2.2vw, 22px)",
                            color: "#1a1a1a",
                        }}
                    >
                        Capability-based intelligence.
                    </span>
                </p>

            </div>
        </div>
    );
}

export default function RedIntelligenceCard() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            {isMobile ? <MobileCard /> : <DekstopCard />}
        </>
    );
}