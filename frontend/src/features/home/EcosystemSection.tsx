import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import svgPaths from "../../pages/svg-paths";
import bunnyPointing from "../../assets/bunny_pointing.png";

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

  const accentColor = "var(--color-accent)";

  return (
    <div className="ecosystem-badge-card">
      <div className="flex flex-col items-start w-full min-h-[160px] md:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex flex-col items-start"
          >
            <div className="flex flex-col gap-[16px] items-start w-full">
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Featured Module
              </span>
              <div className="flex items-center gap-3 w-full">
                <div className="w-[3px] h-[28px] rounded-full shrink-0" style={{ background: accentColor }} />
                <p
                  className="font-bold leading-[1.15] tracking-[-0.03em] not-italic text-[26px] sm:text-[30px] text-[var(--color-text-primary)] w-full"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {activeData.title}
                </p>
              </div>
              <p className="font-['Manrope',sans-serif] text-[15px] sm:text-[16px] text-[var(--color-text-muted)] leading-relaxed pr-2">
                {activeData.description}
              </p>
              {activeData.id === "gco" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[rgba(232,133,106,0.08)] text-[var(--color-accent)] border border-[rgba(232,133,106,0.15)]">National Olympiad</span>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[rgba(26,24,51,0.05)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)]">AI Integrated</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="clay-button flex items-center justify-between bg-[var(--color-accent)] h-[48px] pl-6 pr-5 rounded-full w-[160px] cursor-pointer group"
        role="button"
        tabIndex={0}
        aria-label="View more details"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{ boxShadow: "0 4px 14px rgba(232,133,106,0.25)" }}
        onClick={() => {
          if (activeData.id === "gco") navigate("/gco");
          if (activeData.id === "playground") navigate("/playground");
          if (activeData.id === "psychometric") window.location.assign("https://www.ateion.com/psychometric-assessment");
          if (activeData.id === "ateion") navigate("/contact");
        }}
        onKeyDown={(e) => { 
          if (e.key === 'Enter' || e.key === ' ') { 
            e.preventDefault(); 
            if (activeData.id === "gco") navigate("/gco"); 
            if (activeData.id === "playground") navigate("/playground");
            if (activeData.id === "psychometric") window.location.assign("https://www.ateion.com/psychometric-assessment");
            if (activeData.id === "ateion") navigate("/contact");
          } 
        }}
      >
        <motion.p
          className="font-['Outfit',sans-serif] leading-none text-[15px] text-white tracking-[0.16px] whitespace-nowrap pt-0.5"
          style={{ color: "#ffffff" }}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          View More
        </motion.p>
        <motion.div
          className="flex items-center justify-center text-white"
          style={{ color: "#ffffff" }}
          aria-hidden="true"
          whileHover={{ x: 4, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          <div className="flex items-center justify-center h-[22px] w-[22px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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

interface PhysicsBubble {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  mass: number;
  hoverColor: string;
  defaultColor?: string;
  isDark?: boolean;
  gradientId?: string;
  titleSize: string;
  descSize: string;
  titleClass?: string;
  staticTextColor?: string;
  hoverTextColor?: string;
  hoverDescColor?: string;
  url: string;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  ref: HTMLDivElement | null;
}

const CONNECTIONS = [
  ["gco", "ateion"],
  ["ateion", "playground"],
  ["playground", "psychometric"],
  ["psychometric", "gco"],
  ["ateion", "psychometric"],
  ["gco", "mascot"],
  ["ateion", "mascot"],
  ["playground", "mascot"],
  ["psychometric", "mascot"],
];

const CANVAS_WIDTH = 935;
const CANVAS_HEIGHT = 663;

function EcosystemCluster({
  onBubbleClick,
  onBubbleHover,
}: {
  onBubbleClick: (id: string) => void;
  onBubbleHover?: (id: string) => void;
}) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const bubblesRef = useRef<PhysicsBubble[]>([
    {
      id: "gco",
      title: "GCO",
      description: "From early AI PlayGround to the Global Capability Olympiad, with psychometric readiness tools.",
      x: 230,
      y: 210,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 320,
      r: 160,
      mass: 224,
      hoverColor: "var(--color-accent)",
      isDark: true,
      gradientId: "themeGrad",
      titleSize: "36px",
      descSize: "16px",
      url: "/gco",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      ref: null,
    },
    {
      id: "ateion",
      title: "Ateion",
      description: "Ateion is building the infrastructure for a capability-based future by integrating early AI PlayGround with standard-setting competitions.",
      x: 450,
      y: 300,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 330,
      r: 165,
      mass: 231,
      hoverColor: "var(--color-accent)",
      isDark: true,
      gradientId: "themeGrad",
      titleSize: "36px",
      descSize: "16px",
      titleClass: "font-['Outfit:Semi_Bold',sans-serif]",
      url: "/contact",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      ref: null,
    },
    {
      id: "psychometric",
      title: "Psychometric Tests",
      description: "Discover strengths, mindset, and learning style.",
      x: 560,
      y: 480,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 300,
      r: 150,
      mass: 210,
      hoverColor: "var(--color-accent)",
      isDark: true,
      gradientId: "themeGrad",
      titleSize: "28px",
      descSize: "15px",
      url: "https://www.ateion.com/psychometric-assessment",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      ref: null,
    },
    {
      id: "playground",
      title: "PlayGround",
      description: "Engaging, hands-on learning experiences designed to bridge theory with practical AI execution.",
      x: 740,
      y: 240,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 340,
      r: 170,
      mass: 238,
      hoverColor: "var(--color-accent)",
      isDark: true,
      gradientId: "themeGrad",
      titleSize: "32px",
      descSize: "16px",
      url: "/playground",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      ref: null,
    },
    {
      id: "mascot",
      title: "Mascot",
      description: "",
      x: -60,
      y: 320,
      vx: 0,
      vy: 0,
      size: 480,
      r: 240,
      mass: 400,
      hoverColor: "transparent",
      isDark: false,
      titleSize: "0px",
      descSize: "0px",
      url: "",
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      ref: null,
    }
  ]);

  const connectionPathsRef = useRef<{ [key: string]: SVGPathElement | null }>({});
  const activeDragRef = useRef<PhysicsBubble | null>(null);
  const dragStartPosRef = useRef({ x: 0, y: 0, time: 0, hasMoved: false });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, b: PhysicsBubble) => {
    if (b.id === "mascot") return; // Keep mascot static and non-draggable
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    activeDragRef.current = b;
    b.isDragging = true;
    setDraggedId(b.id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    b.dragStartX = clientX - b.x;
    b.dragStartY = clientY - b.y;
    dragStartPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      hasMoved: false
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = activeDragRef.current;
    if (!b || !b.isDragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const targetX = clientX - b.dragStartX;
    const targetY = clientY - b.dragStartY;
    
    b.vx = (targetX - b.x) * 0.8;
    b.vy = (targetY - b.y) * 0.8;
    b.x = targetX;
    b.y = targetY;
    
    const dx = Math.abs(e.clientX - dragStartPosRef.current.x);
    const dy = Math.abs(e.clientY - dragStartPosRef.current.y);
    if (dx > 5 || dy > 5) {
      dragStartPosRef.current.hasMoved = true;
    }
  };

  const getBubbleConnectionPoint = (b: PhysicsBubble) => {
    if (b.id === "mascot") {
      const handDx = b.r * 0.6;
      const handDy = b.r * 0.14;
      return { x: b.x + handDx, y: b.y + handDy };
    }
    return { x: b.x, y: b.y };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = activeDragRef.current;
    if (!b) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    b.isDragging = false;
    setDraggedId(null);
    activeDragRef.current = null;
    const dt = Date.now() - dragStartPosRef.current.time;
    if (!dragStartPosRef.current.hasMoved && dt < 250) {
      if (b.id !== "mascot") {
        onBubbleClick(b.id);
        if (b.id === "gco") navigate("/gco");
        else if (b.id === "playground") navigate("/playground");
        else if (b.id === "psychometric") window.location.assign("https://www.ateion.com/psychometric-assessment");
        else navigate("/contact");
      }
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    const updatePhysics = () => {
      const bubbles = bubblesRef.current;
      const numBubbles = bubbles.length;
      
      for (let i = 0; i < numBubbles; i++) {
        const b = bubbles[i];
        if (!b.isDragging && b.id !== "mascot") {
          b.vx += (Math.random() - 0.5) * 0.05;
          b.vy += (Math.random() - 0.5) * 0.05;
          b.vx *= 0.992;
          b.vy *= 0.992;
          b.x += b.vx;
          b.y += b.vy;
        }
      }
      
      for (let i = 0; i < numBubbles; i++) {
        for (let j = i + 1; j < numBubbles; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.r + b2.r;
          
          if (dist < minDist && dist > 0.001) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            
            if (b1.isDragging && !b2.isDragging) {
              b2.x += nx * overlap;
              b2.y += ny * overlap;
            } else if (b2.isDragging && !b1.isDragging) {
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
            } else if (!b1.isDragging && !b2.isDragging) {
              if (b1.id === "mascot") {
                b2.x += nx * overlap;
                b2.y += ny * overlap;
              } else if (b2.id === "mascot") {
                b1.x -= nx * overlap;
                b1.y -= ny * overlap;
              } else {
                b1.x -= nx * overlap * 0.5;
                b1.y -= ny * overlap * 0.5;
                b2.x += nx * overlap * 0.5;
                b2.y += ny * overlap * 0.5;
              }
            }
            
            const rvx = b2.vx - b1.vx;
            const rvy = b2.vy - b1.vy;
            const velAlongNormal = rvx * nx + rvy * ny;
            
            if (velAlongNormal < 0) {
              const restitution = 0.85;
              let impulse = -(1 + restitution) * velAlongNormal;
              impulse /= (1 / b1.mass + 1 / b2.mass);
              if (!b1.isDragging && b1.id !== "mascot") {
                b1.vx -= (impulse / b1.mass) * nx;
                b1.vy -= (impulse / b1.mass) * ny;
              }
              if (!b2.isDragging && b2.id !== "mascot") {
                b2.vx += (impulse / b2.mass) * nx;
                b2.vy += (impulse / b2.mass) * ny;
              }
            }
          }
        }
      }
      
      for (let i = 0; i < numBubbles; i++) {
        const b = bubbles[i];
        if (!b.isDragging && b.id !== "mascot") {
          const bounce = -0.7;
          if (b.x - b.r < 0) {
            b.x = b.r;
            b.vx *= bounce;
          } else if (b.x + b.r > CANVAS_WIDTH) {
            b.x = CANVAS_WIDTH - b.r;
            b.vx *= bounce;
          }
          if (b.y - b.r < 0) {
            b.y = b.r;
            b.vy *= bounce;
          } else if (b.y + b.r > CANVAS_HEIGHT) {
            b.y = CANVAS_HEIGHT - b.r;
            b.vy *= bounce;
          }
        }
      }
      
      for (let i = 0; i < numBubbles; i++) {
        const b = bubbles[i];
        if (b.ref) {
          b.ref.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
        }
      }
      
      const connectionPaths = connectionPathsRef.current;
      CONNECTIONS.forEach(([id1, id2]) => {
        const b1 = bubbles.find(b => b.id === id1);
        const b2 = bubbles.find(b => b.id === id2);
        if (b1 && b2) {
          const key = `${id1}-${id2}`;
          const pathEl = connectionPaths[key];
          if (pathEl) {
            const p1 = getBubbleConnectionPoint(b1);
            const p2 = getBubbleConnectionPoint(b2);
            pathEl.setAttribute("d", `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`);
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(updatePhysics);
    };
    
    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative shrink-0 select-none overflow-visible"
      style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
    >
      <style>{`
        @keyframes pulseFlow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .pulse-flow-animation {
          animation: pulseFlow 1s linear infinite;
        }
      `}</style>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="themeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent_light, var(--color-accent))" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="absolute inset-0 size-full pointer-events-none z-0 overflow-visible">
        {CONNECTIONS.map(([id1, id2]) => {
          const key = `${id1}-${id2}`;
          return (
            <path
              key={key}
              ref={(el) => (connectionPathsRef.current[key] = el)}
              stroke="var(--color-accent)"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              opacity="0.4"
              fill="none"
              className="pulse-flow-animation"
            />
          );
        })}
      </svg>

      {bubblesRef.current.map((b) => {
        const isHovered = hoveredId === b.id;
        const isDragged = draggedId === b.id;
        return (
          <div
            key={b.id}
            ref={(el) => (b.ref = el)}
            className={`absolute flex items-center justify-center pointer-events-auto select-none ${
              b.id === "mascot" ? "cursor-default" : "cursor-grab active:cursor-grabbing"
            }`}
            style={{
              width: b.size,
              height: b.size,
              left: 0,
              top: 0,
              transform: `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`
            }}
            onPointerDown={(e) => handlePointerDown(e, b)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => {
              if (b.id !== "mascot") {
                setHoveredId(b.id);
                if (!draggedId) {
                  onBubbleHover?.(b.id);
                }
              }
            }}
            onMouseLeave={() => {
              if (b.id !== "mascot") {
                setHoveredId(null);
              }
            }}
          >
            {b.id === "mascot" ? (
              <div className="w-full h-full relative">
                <img
                  src={bunnyPointing}
                  alt="Ateion Mascot"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            ) : (
              <>
                <motion.div
                  className={`ecosystem-bubble-bg bubble-${b.id} ${isHovered ? "is-hovered" : ""} ${isDragged ? "is-dragged" : ""}`}
                  animate={{
                    scale: isDragged ? 1.08 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none gap-2">
                  <motion.p
                    className={`transition-all duration-300 not-italic ${b.titleClass || "font-['Outfit',sans-serif]"} leading-tight font-bold`}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: b.titleSize,
                      color: `var(--color-bubble-${b.id})`,
                    }}
                  >
                    {b.title}
                  </motion.p>

                  <motion.p
                    className="font-['Manrope',sans-serif] leading-snug not-italic"
                    style={{
                      fontSize: b.descSize,
                      maxWidth: "92%",
                      color: "var(--color-text-muted)",
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    {b.description}
                  </motion.p>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MobileEcosystemCluster({
  onBubbleClick,
}: {
  onBubbleClick: (id: string) => void;
}) {
  const navigate = useNavigate();

  const bubbles = [
    {
      id: "gco",
      title: "GCO",
      description:
        "From early AI PlayGround to the Global Capability Olympiad, with psychometric readiness tools.",
      circleColor: "var(--color-accent)",
      textColor: "white",
    },
    {
      id: "ateion",
      title: "Ateion",
      description:
        "Ateion is building the infrastructure for a capability-based future by integrating early AI PlayGround with standard-setting competitions.",
      circleColor: "var(--color-accent)",
      textColor: "white",
    },
    {
      id: "psychometric",
      title: "Psychometric Tests",
      description:
        "Discover strengths, mindset, and learning style.",
      circleColor: "var(--color-accent)",
      textColor: "white",
    },
    {
      id: "playground",
      title: "PlayGround",
      description:
        "Engaging, hands-on learning experiences designed to bridge theory with practical AI execution.",
      circleColor: "var(--color-accent)",
      textColor: "white",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer w-full"
          style={{ background: "var(--color-background-secondary)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onBubbleClick(b.id);
            if (b.id === "gco") navigate("/gco");
            else if (b.id === "playground") navigate("/playground");
            else if (b.id === "psychometric") window.location.assign("https://www.ateion.com/psychometric-assessment");
            else navigate("/contact");
          }}
        >
          <div
            className="shrink-0 flex items-center justify-center rounded-full font-bold"
            style={{
              width: 76,
              height: 76,
              background: `linear-gradient(135deg, var(--color-bubble-${b.id}) 0%, var(--color-accent) 100%)`,
              color: b.textColor,
              fontFamily: "var(--font-display)",
              fontSize: 18,
            }}
          >
            {b.title === "PlayGround" ? "PG" : b.title === "Psychometric Tests" ? "PT" : b.title}
          </div>

          <div className="flex flex-col gap-1.5 min-w-0">
            <p
              className="font-bold text-[21px] leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              {b.title}
            </p>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {b.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function EcosystemSection() {
  const DESKTOP_BADGE_WIDTH = 392;
  const DESKTOP_GAP = 200;
  const DESKTOP_CONTENT_WIDTH = DESKTOP_BADGE_WIDTH + DESKTOP_GAP + CANVAS_WIDTH;
  const DESKTOP_SAFE_PADDING = 28;
  const DESKTOP_MAX_SCALE = 0.88;
  const DESKTOP_MIN_SCALE = 0.55;

  const [activeId, setActiveId] = useState("gco");
  const [desktopScale, setDesktopScale] = useState(DESKTOP_MAX_SCALE);
  const desktopFrameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateScales = (frameWidth?: number) => {
      if (!frameWidth) frameWidth = desktopFrameRef.current?.clientWidth ?? window.innerWidth;
      const availableWidth = Math.max(320, frameWidth - DESKTOP_SAFE_PADDING * 2 - 64);
      setDesktopScale(
        Math.min(
          DESKTOP_MAX_SCALE,
          Math.max(DESKTOP_MIN_SCALE, availableWidth / DESKTOP_CONTENT_WIDTH),
        ),
      );
    };

    const rect = desktopFrameRef.current?.getBoundingClientRect();
    updateScales(rect ? Math.floor(rect.width) : undefined);

          const observer =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver((entries) => {
          const entry = entries[0];
          if (entry) {
            updateScales(Math.floor(entry.contentRect.width));
          }
        })
      : null;

    if (desktopFrameRef.current && observer) {
      observer.observe(desktopFrameRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [DESKTOP_CONTENT_WIDTH, DESKTOP_MAX_SCALE, DESKTOP_MIN_SCALE, DESKTOP_SAFE_PADDING]);

  const ecosystemData = {
    gco: {
      id: "gco",
      number: "01",
      title: "Global Capability Olympiad (GCO)",
      description:
        "From early AI PlayGround to the Global Capability Olympiad, with psychometric readiness tools.",
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
    psychometric: {
      id: "psychometric",
      number: "04",
      title: "Psychometric Tests",
      description:
        "Discover strengths, mindset, and learning style through guided assessments.",
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
    <section className="relative w-full px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:py-12">
      <div className="relative mx-auto w-full max-w-[1360px] overflow-visible bg-transparent pt-8 pb-6 shadow-none sm:pt-10 sm:pb-8 lg:pt-12 lg:pb-10">
      {/* Section title */}
      <div className="relative z-10 flex flex-col items-center w-full mb-[20px] sm:mb-[26px] lg:mb-[30px] px-4">
        <p className="font-bold text-[34px] sm:text-[44px] md:text-[52px] text-[var(--color-text-primary)] text-center tracking-[-0.05em] leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
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
      <div className="relative z-10 lg:hidden mx-auto flex w-full max-w-[720px] flex-col items-start gap-[40px] px-4 sm:px-6">
        <GcoFeatureBadge activeData={activeData} />

        <MobileEcosystemCluster onBubbleClick={setActiveId} />
      </div>

      {/* Desktop: side-by-side, scaled visually and sized physically so it never clips. */}
      <div
        ref={desktopFrameRef}
        className="relative z-10 hidden lg:flex w-full justify-start overflow-hidden px-0"
      >
        <div
          className="relative"
          style={{
            width: DESKTOP_CONTENT_WIDTH * desktopScale + DESKTOP_SAFE_PADDING * 2,
            height: CANVAS_HEIGHT * desktopScale + DESKTOP_SAFE_PADDING * 2,
          }}
        >
          <div
            className="absolute flex flex-row items-center"
            style={{
              left: DESKTOP_SAFE_PADDING,
              top: DESKTOP_SAFE_PADDING,
              width: DESKTOP_CONTENT_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${desktopScale})`,
              transformOrigin: "top left",
              gap: `${DESKTOP_GAP}px`,
            }}
          >
            <GcoFeatureBadge activeData={activeData} />
            <EcosystemCluster onBubbleClick={setActiveId} onBubbleHover={setActiveId} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
