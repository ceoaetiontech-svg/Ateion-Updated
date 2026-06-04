import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../pages/svg-paths";

function Tag({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`border-[var(--color-text-primary)] border-[0.6px] border-solid rounded-full px-6 py-2 h-[54px] flex items-center justify-center bg-transparent ${className}`}
    >
      <p
        className="font-['Outfit',sans-serif] font-normal leading-none text-[var(--color-text-primary)] text-[17px] text-center pt-[1px]"
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
  const navigate = useNavigate();

  const accentColor = activeData.id === "gco" || activeData.id === "playground"
    ? "var(--color-accent)"
    : "var(--color-primary_light)";

  return (
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
              <div className="flex items-center gap-3 w-full">
                <div className="w-[4px] h-[32px] rounded-full shrink-0" style={{ background: accentColor }} />
                <p
                  className="font-bold leading-[0.95] tracking-[-0.05em] not-italic text-[36px] sm:text-[42px] md:text-[48px] text-[var(--color-text-primary)] w-full max-w-[500px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activeData.title}
                </p>
              </div>
              <div className="flex justify-start w-full">
                {activeData.id !== "gco" && (
                  <p className="font-['Manrope',sans-serif] text-[16px] md:text-[18px] text-[var(--color-text-muted)] leading-relaxed md:pr-8">
                    {activeData.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="clay-button flex items-center justify-between bg-[var(--color-accent)] h-[54px] pl-7 pr-6 rounded-full w-[174px] cursor-pointer group"
        role="button"
        tabIndex={0}
        aria-label="View more details"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{ boxShadow: "0 4px 14px rgba(232,133,106,0.3)" }}
        onClick={() => {
          if (activeData.id === "gco") navigate("/gco");
          if (activeData.id === "playground") navigate("/playground");
          if (activeData.id === "vouch") navigate("/contact");
          if (activeData.id === "ateion") navigate("/contact");
        }}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') { 
            e.preventDefault(); 
            if (activeData.id === "gco") navigate("/gco"); 
            if (activeData.id === "playground") navigate("/playground");
            if (activeData.id === "vouch") navigate("/contact");
            if (activeData.id === "ateion") navigate("/contact");
          } 
        }}
      >
        <motion.p
          className="font-['Outfit',sans-serif] leading-none text-[17px] text-[var(--color-text-inverse)] tracking-[0.16px] whitespace-nowrap pt-0.5"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          View More
        </motion.p>
        <motion.div
          className="flex items-center justify-center"
          aria-hidden="true"
          whileHover={{ x: 4, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          <div className="flex items-center justify-center h-[26px] w-[26px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
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
          filter: isHovered ? "drop-shadow(0 0 15px var(--color-accent_light))" : "none",
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
              fill: isHovered ? hoverColor : defaultColor,
              stroke: isHovered
                ? hoverColor
                : defaultColor !== "transparent"
                  ? defaultColor
                  : "var(--color-border-medium)",
              strokeWidth: isHovered ? 3 : 0.8,
              scale: isHovered ? 1.12 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        </svg>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center p-5 text-center pointer-events-none gap-3">
        <motion.p
          className={`transition-all duration-500 not-italic ${titleClass} leading-tight font-bold`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: titleSize,
            color:
              isHovered && isDark ? "white" : staticTextColor || "var(--color-text-primary)",
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
          className="font-['Manrope',sans-serif] leading-snug not-italic"
          style={{
            fontSize: descSize,
            maxWidth: "80%",
            color:
              isHovered && isDark
                ? "rgba(255,255,255,0.9)"
                : staticTextColor || "var(--color-text-muted)",
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
  const navigate = useNavigate();
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

      {/* Curved connector arrows — Kronos lines removed */}
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
            fill="var(--color-text-primary)"
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
            stroke="var(--color-text-primary)"
            strokeWidth="0.88"
          />
        </svg>
      </div>

      {/* Bubbles — exact original coordinates, now using left/top instead of marginLeft/marginTop */}
      <EcosystemBubble
        ml="274.69px"
        mt="137.18px"
        size="272.92px"
        defaultColor="var(--color-primary)"
        staticTextColor="white"
        hoverColor="var(--color-primary-hover)"
        isDark={true}
        gradientId="ateionGrad"
        title="Ateion"
        description="Ateion is building the infrastructure for a capability-based future by integrating early AI PlayGround with standard-setting competitions."
        titleSize="24px"
        titleClass="font-['Outfit:Semi_Bold',sans-serif]"
        onClick={() => {
          onBubbleClick("ateion");
          navigate("/contact");
        }}
      />

      <EcosystemBubble
        ml="0px"
        mt="0px"
        size="274.68px"
        defaultColor="var(--color-accent)"
        staticTextColor="white"
        hoverColor="var(--color-accent-hover)"
        isDark={true}
        gradientId="gcoGrad"
        title="GCO"
        description="From early AI PlayGround to the Global Capability Olympiad, and emerging initiatives like VOUCH."
        titleSize="32px"
        onClick={() => {
          onBubbleClick("gco");
          navigate("/gco");
        }}
      />


      <EcosystemBubble
        ml="468.38px"
        mt="369.61px"
        size="248.27px"
        defaultColor="var(--color-text-secondary)"
        staticTextColor="white"
        hoverColor="var(--color-primary-hover)"
        isDark={true}
        gradientId="ateionGrad"
        title="Vouch"
        description="A way to get trusted proof of what you’ve accomplished."
        titleSize="22px"
        onClick={() => {
          onBubbleClick("vouch");
          navigate("/contact");
        }}
      />

      <EcosystemBubble
        ml="601.32px"
        mt="57.94px"
        size="333.67px"
        defaultColor="var(--color-primary_light)"
        staticTextColor="var(--color-primary)"
        hoverColor="var(--color-primary_light)"
        isDark={false}
        gradientId="gcoGrad"
        title="PlayGround"
        description="Engaging, hands-on learning experiences designed to bridge theory with practical AI execution."
        titleSize="20px"
        onClick={() => {
          onBubbleClick("playground");
          navigate("/playground");
        }}
      />
    </div>
  );
}

export default function EcosystemSection() {
  const [activeId, setActiveId] = useState("gco");
  const [desktopScale, setDesktopScale] = useState(1);
  const [mobileScale, setMobileScale] = useState(0.85);

  const CANVAS_WIDTH_PX = 935;
  const CANVAS_HEIGHT_PX = 663;
  const DESKTOP_CONTENT_WIDTH = 392 + 64 + CANVAS_WIDTH_PX;

  useEffect(() => {
    const updateScales = () => {
      const dw = window.innerWidth - 64;
      setDesktopScale(Math.min(1, Math.max(0.7, dw / DESKTOP_CONTENT_WIDTH)));

      const mw = window.innerWidth - 48;
      setMobileScale(Math.min(0.85, mw / CANVAS_WIDTH_PX));
    };

    updateScales();
    window.addEventListener("resize", updateScales);
    return () => window.removeEventListener("resize", updateScales);
  }, [DESKTOP_CONTENT_WIDTH, CANVAS_WIDTH_PX]);

  const ecosystemData = {
    gco: {
      id: "gco",
      number: "01",
      title: "Global Capability Olympiad (GCO)",
      description:
        "From early AI PlayGround to the Global Capability Olympiad, and emerging initiatives like VOUCH.",
      hasTags: true,
    },
    ateion: {
      id: "ateion",
      number: "02",
      title: "Ateion",
      description:
        "Ateion is building the infrastructure for a capability-based future by integrating early AI PlayGround with standard-setting competitions.",
      hasTags: false,
    },
    kronos: {
      id: "kronos",
      number: "03",
      title: "",
      description: "",
      hasTags: false,
    },
    vouch: {
      id: "vouch",
      number: "04",
      title: "Vouch",
      description:
        "A way to get trusted proof of what you’ve accomplished.",
      hasTags: false,
    },
    playground: {
      id: "playground",
      number: "05",
      title: "PlayGround",
      description:
        "Engaging, hands-on learning experiences designed to bridge theory with practical AI execution.",
      hasTags: false,
    },
  };

  const activeData = ecosystemData[activeId as keyof typeof ecosystemData];

  return (
    // `relative` + `w-full` + explicit padding ensures the section occupies
    // real document space so the next sibling renders below it — no overlap.
    <section className="relative w-full bg-[var(--color-background-primary)]">
      {/* Section title */}
      <div className="flex flex-col items-center w-full mb-[24px] sm:mb-[32px] md:mb-[40px] px-4">
        <p className="font-bold text-[36px] sm:text-[48px] md:text-[58px] text-[var(--color-text-primary)] text-center tracking-[-0.05em] leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
          Ateion as an Ecosystem
        </p>
        <div className="flex items-center gap-3 mt-4">
          <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
          <div className="w-[8px] h-[8px] rounded-full" style={{ background: "var(--color-primary_light)" }} />
          <div className="w-[40px] sm:w-[60px] h-[3px] rounded-full" style={{ background: "var(--color-accent)" }} />
        </div>
      </div>

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

        {/* Mobile cluster — scaled to fit without scroll */}
        <div className="w-full">
          <div
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${mobileScale})`,
              transformOrigin: "top left",
              marginBottom: -(CANVAS_HEIGHT * (1 - mobileScale)),
              marginRight: -(CANVAS_WIDTH * (1 - mobileScale)),
            }}
          >
            <EcosystemCluster onBubbleClick={setActiveId} />
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
            className="flex flex-row items-center gap-[48px] lg:gap-[64px] px-8 lg:px-16"
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