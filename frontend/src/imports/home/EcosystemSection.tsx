import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import svgPaths from "../svg-paths";

function Tag({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`border-[#272424] border-[0.6px] border-solid rounded-full px-6 py-2 h-[54px] flex items-center justify-center bg-transparent ${className}`}
    >
      <p
        className="font-['Outfit',sans-serif] font-normal leading-none text-[#272424] text-[17px] text-center pt-[1px]"
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        {text}
      </p>
    </div>
  );
}

function GcoFeatureTagsRow() {
  return (
    <div className="flex flex-wrap gap-[12px]">
      <Tag text="Brand Strategy" />
      <Tag text="Brand Naming" />
      <Tag text="Tagline" />
    </div>
  );
}

function GcoFeatureBadge({
  activeData,
}: {
  activeData: {
    id: string;
    number: string;
    title: string;
    description: string;
    hasTags: boolean;
  };
}) {
  return (
    // On mobile: full width, centered text. On desktop: fixed 392px, left-aligned.
    <div className={`flex flex-col ${activeData.id === "gco" ? "" : "gap-[32px]"} items-start w-full md:w-[392px] md:shrink-0`}>
      <div className="flex flex-col items-start w-full min-h-[180px] md:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-start"
          >
            <div className="flex flex-col gap-[20px] md:gap-[24px] items-start w-full">
              <p
                className="leading-[1.19] not-italic text-[36px] sm:text-[42px] md:text-[48px] text-black tracking-[0.4px] w-full max-w-[500px]"
                style={{ fontFamily: "'OV Soge', sans-serif" }}
              >
                {activeData.title}
              </p>
              <div className="flex justify-start w-full">
                {activeData.hasTags ? (
                  activeData.id === "gco" ? (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex gap-4">
                        <Tag text="Brand Strategy" />
                        <Tag text="Brand Naming" />
                      </div>
                      <div className="flex gap-4 items-center">
                        <Tag text="Tagline" />
                        <div
                          className="flex items-center justify-between bg-[#161616] h-[54px] pl-7 pr-6 rounded-full w-[174px] cursor-pointer group hover:bg-[#222] transition-colors"
                          data-name="view more"
                        >
                          <p className="font-['Outfit',sans-serif] leading-none text-[17px] text-white tracking-[0.16px] whitespace-nowrap pt-0.5">
                            View More
                          </p>
                          <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center h-[26px] w-[26px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M7 17L17 7M7 7h10v10" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <GcoFeatureTagsRow />
                  )
                ) : (
                  <p className="font-['Inter',sans-serif] text-[16px] md:text-[18px] text-[rgba(0,0,0,0.7)] leading-relaxed md:pr-8">
                    {activeData.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {activeData.id !== "gco" && (
        <div
          className="flex items-center justify-between bg-[#161616] h-[54px] pl-7 pr-6 rounded-full w-[174px] cursor-pointer group hover:bg-[#222] transition-colors"
          data-name="view more"
        >
          <p className="font-['Outfit',sans-serif] leading-none text-[17px] text-white tracking-[0.16px] whitespace-nowrap pt-0.5">
            View More
          </p>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-[26px] w-[26px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EcosystemBubble({
  ml,
  mt,
  size,
  defaultColor = "transparent",
  hoverColor,
  title,
  description,
  isDark = false,
  titleSize = "18px",
  titleClass = "font-['Outfit',sans-serif]",
  gradientId,
  descSize = "12px",
  staticTextColor,
  onClick,
}: {
  ml: string;
  mt: string;
  size: string;
  defaultColor?: string;
  hoverColor: string;
  title: string;
  description: string;
  isDark?: boolean;
  titleSize?: string;
  titleClass?: string;
  gradientId?: string;
  descSize?: string;
  staticTextColor?: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute flex items-center justify-center cursor-pointer pointer-events-auto"
      style={{ left: ml, top: mt, width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          y: isHovered ? -4 : 0,
          rotate: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          filter: isHovered ? "drop-shadow(0 0 15px rgba(30, 22, 50, 0.5))" : "none",
        }}
      >
        <svg
          className="absolute block size-full overflow-visible"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <AnimatePresence>
            {isHovered && (
              <motion.circle
                cx="50"
                cy="50"
                r="54"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.35, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.9 }}
                fill={hoverColor}
                style={{ filter: "blur(15px)" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          <motion.circle
            cx="50"
            cy="50"
            r="49.5"
            animate={{
              fill: isHovered ? (hoverColor === "#FF595B" ? "#FF595B" : "#1E1632") : defaultColor,
              stroke: isHovered
                ? hoverColor
                : defaultColor !== "transparent"
                ? defaultColor
                : "rgba(0,0,0,0.15)",
              strokeWidth: isHovered ? 3 : 0.8,
              scale: isHovered ? 1.12 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        </svg>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center p-5 text-center pointer-events-none gap-3">
        <motion.p
          className={`transition-all duration-500 not-italic ${titleClass} leading-tight`}
          style={{
            fontSize: titleSize,
            color:
              isHovered && isDark ? "white" : staticTextColor || "black",
            textShadow:
              isHovered && isDark
                ? "0 0 8px rgba(255,255,255,0.4)"
                : "none",
          }}
          animate={{
            y: isHovered ? -4 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
        >
          {title}
        </motion.p>

        <motion.p
          className="font-['Inter',sans-serif] leading-snug not-italic"
          style={{
            fontSize: descSize,
            maxWidth: "80%",
            color:
              isHovered && isDark
                ? "rgba(255,255,255,0.9)"
                : staticTextColor || "rgba(0,0,0,0.7)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            y: isHovered ? -2 : 0,
          }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

// The bubble cluster keeps its exact original pixel coordinates.
// It lives inside a fixed-size container so the layout never collapses.
// Canvas dimensions: rightmost edge = 601.32 + 333.67 = 934.99 ≈ 935px wide
//                    bottom edge    = 414.51 + 248.27 = 662.78 ≈ 663px tall
const CANVAS_WIDTH = 935;
const CANVAS_HEIGHT = 663;

function EcosystemCluster({
  onBubbleClick,
}: {
  onBubbleClick: (id: string) => void;
}) {
  return (
    // Explicit width + height so the cluster never collapses and never
    // causes the next section to overlap.
    <div
      className="relative shrink-0"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      {/* SVG gradient defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="ateionGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1E1632" />
            <stop offset="100%" stopColor="#4A3B6F" />
          </linearGradient>
          <linearGradient id="gcoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF595B" />
            <stop offset="100%" stopColor="#FF8A8C" />
          </linearGradient>
          <linearGradient
            id="softGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(247, 243, 235, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Curved connector arrows */}
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: "259.28px",
          top: "79.07px",
          width: "212.218px",
          height: "336.118px",
        }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 212.806 336.735"
        >
          <path
            d={svgPaths.p242fe600}
            id="Vector 467"
            stroke="black"
            strokeWidth="0.88"
          />
        </svg>
      </div>
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: "337.64px",
          top: "390.74px",
          width: "71.754px",
          height: "125.899px",
        }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 72.7077 126.898"
        >
          <path
            d={svgPaths.p3505a800}
            fill="black"
            id="Vector 465"
          />
        </svg>
      </div>
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: "179.61px",
          top: "108.13px",
          width: "471.022px",
          height: "294.499px",
        }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 471.903 299.228"
        >
          <path
            d={svgPaths.p3938fb80}
            fill="black"
            id="Vector 466"
          />
        </svg>
      </div>
      <div
        className="absolute pointer-events-none opacity-20"
        style={{
          left: "474.98px",
          top: "280.69px",
          width: "84.96px",
          height: "178.284px",
        }}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 85.8082 178.495"
        >
          <path
            d={svgPaths.pe1a2a00}
            id="Vector 468"
            stroke="black"
            strokeWidth="0.88"
          />
        </svg>
      </div>

      {/* Bubbles — exact original coordinates, now using left/top instead of marginLeft/marginTop */}
      <EcosystemBubble
        ml="274.69px"
        mt="137.18px"
        size="272.92px"
        defaultColor="#1E1632"
        staticTextColor="white"
        hoverColor="#1E1632"
        isDark={true}
        gradientId="ateionGrad"
        title="Ateion"
        description="Ateion is building the infrastructure for a capability-based future by integrating early AI workshops with standard-setting competitions."
        titleSize="24px"
        titleClass="font-['Outfit:Semi_Bold',sans-serif]"
        onClick={() => onBubbleClick("ateion")}
      />

      <EcosystemBubble
        ml="0px"
        mt="0px"
        size="274.68px"
        defaultColor="#FF595B"
        staticTextColor="black"
        hoverColor="#FF595B"
        isDark={true}
        gradientId="gcoGrad"
        title="GCO"
        description="From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH."
        titleSize="32px"
        onClick={() => onBubbleClick("gco")}
      />

      <EcosystemBubble
        ml="162.88px"
        mt="414.51px"
        size="248.27px"
        hoverColor="#FF595B"
        isDark={true}
        gradientId="gcoGrad"
        title="Kronos"
        description="Focused on specialized capabilities and advanced skill validation within the Ateion ecosystem."
        titleSize="20px"
        onClick={() => onBubbleClick("kronos")}
      />

      <EcosystemBubble
        ml="468.38px"
        mt="369.61px"
        size="248.27px"
        hoverColor="#1E1632"
        isDark={true}
        gradientId="ateionGrad"
        title="Vouch"
        description="A decentralized verification protocol for authenticating learner capabilities and achievements."
        titleSize="22px"
        onClick={() => onBubbleClick("vouch")}
      />

      <EcosystemBubble
        ml="601.32px"
        mt="57.94px"
        size="333.67px"
        hoverColor="#FF595B"
        isDark={true}
        gradientId="gcoGrad"
        title="Workshops"
        description="Engaging, hands-on learning experiences designed to bridge theory with practical AI execution."
        titleSize="20px"
        onClick={() => onBubbleClick("workshops")}
      />
    </div>
  );
}

export default function EcosystemSection() {
  const [activeId, setActiveId] = useState("gco");
  const [desktopScale, setDesktopScale] = useState(1);

  const MOBILE_CLUSTER_SCALE = 0.85;
  const DESKTOP_CONTENT_WIDTH = 392 + 64 + CANVAS_WIDTH;

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth - 64; // gutter allowance
      setDesktopScale(Math.min(1, Math.max(0.7, availableWidth / DESKTOP_CONTENT_WIDTH)));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [DESKTOP_CONTENT_WIDTH]);

  const ecosystemData = {
    gco: {
      id: "gco",
      number: "01",
      title: "Global Capability Olympiad (GCO)",
      description:
        "From early AI workshops to the Global Capability Olympiad, and emerging initiatives like KRONOS and VOUCH.",
      hasTags: true,
    },
    ateion: {
      id: "ateion",
      number: "02",
      title: "Ateion",
      description:
        "Ateion is building the infrastructure for a capability-based future by integrating early AI workshops with standard-setting competitions.",
      hasTags: false,
    },
    kronos: {
      id: "kronos",
      number: "03",
      title: "Kronos",
      description:
        "Focused on specialized capabilities and advanced skill validation within the Ateion ecosystem.",
      hasTags: false,
    },
    vouch: {
      id: "vouch",
      number: "04",
      title: "Vouch",
      description:
        "A decentralized verification protocol for authenticating learner capabilities and achievements.",
      hasTags: false,
    },
    workshops: {
      id: "workshops",
      number: "05",
      title: "Workshops",
      description:
        "Engaging, hands-on learning experiences designed to bridge theory with practical AI execution.",
      hasTags: false,
    },
  };

  const activeData = ecosystemData[activeId as keyof typeof ecosystemData];

  return (
    // `relative` + `w-full` + explicit padding ensures the section occupies
    // real document space so the next sibling renders below it — no overlap.
    <section className="relative w-full bg-[#f7f3eb] py-[60px] sm:py-[80px] md:py-[120px]">
      {/* Section title */}
      <p className="font-['Outfit',sans-serif] text-[36px] sm:text-[48px] md:text-[58px] text-black text-center w-full mb-[32px] sm:mb-[48px] md:mb-[60px] tracking-tight px-4">
        <span className="leading-[1.2]">Ateion as an </span>
        <span className="font-['IBM Plex Sans',sans-serif] italic">
          Ecosystem
        </span>
      </p>

      {/*
        ── MOBILE LAYOUT (< md) ──
        Stack: badge on top, then horizontally-scrollable bubble cluster below.

        ── DESKTOP LAYOUT (≥ md) ──
        Side-by-side: badge left, cluster right.
        The whole row is horizontally scrollable if the viewport is narrower
        than badge + gap + cluster (rare on real desktops but safe).
      */}

      {/* Mobile: stacked */}
      <div className="md:hidden flex flex-col items-start gap-[40px] px-6">
        <GcoFeatureBadge activeData={activeData} />

        {/* Scroll hint */}
        <p className="text-[11px] text-black/30 tracking-widest uppercase self-center">
          ← scroll to explore →
        </p>

        {/* Horizontally scrollable cluster (mobile) with vertical scroll area and invisible scrollbars */}
        <div
          className="w-full overflow-x-auto overflow-y-auto pb-4"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxHeight: "70vh",
            minHeight: "40vh",
          }}
        >
          {/* Hide scrollbars visually but keep content swipe-scrollable */}
          <style>{`
            .bubble-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .bubble-scroll::-webkit-scrollbar { width: 0; height: 0; }
            .bubble-scroll::-webkit-scrollbar-track { background: transparent; }
            .bubble-scroll::-webkit-scrollbar-thumb { background: transparent; }
          `}</style>
          <div className="bubble-scroll w-full overflow-x-auto overflow-y-auto pb-4">
            {/* Scale down the cluster on mobile, but keep bigger height to avoid vertical scrollbar */}
            <div
              style={{
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                transform: `scale(${MOBILE_CLUSTER_SCALE})`,
                transformOrigin: "top left",
                minHeight: CANVAS_HEIGHT * MOBILE_CLUSTER_SCALE,
                // The scaled element still occupies original space without this:
                marginBottom: -(CANVAS_HEIGHT * (1 - MOBILE_CLUSTER_SCALE)),
              }}
            >
              <EcosystemCluster onBubbleClick={setActiveId} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side, no horizontal scrollbar; content scales to fit viewport */}
      <div
        className="hidden md:block w-full overflow-x-hidden overflow-y-visible"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex justify-center">
          <div
            className="flex flex-row items-start gap-[48px] lg:gap-[64px] px-8 lg:px-16"
            style={{
              width: DESKTOP_CONTENT_WIDTH,
              maxWidth: "100%",
              transform: `scale(${desktopScale})`,
              transformOrigin: "top left",
            }}
          >
            <GcoFeatureBadge activeData={activeData} />
            <EcosystemCluster onBubbleClick={setActiveId} />
          </div>
        </div>
      </div>
    </section>
  );
}