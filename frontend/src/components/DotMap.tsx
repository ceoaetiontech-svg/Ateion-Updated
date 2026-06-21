import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const nodesData = [
  { id: "uk", label: "United Kingdom", coords: [-2, 53] as [number, number] },
  { id: "france", label: "France", coords: [2, 46] as [number, number] },
  {
    id: "middle-east",
    label: "United Arab Emirates",
    coords: [55, 25] as [number, number],
  },
  { id: "india", label: "India", coords: [78, 20] as [number, number] },
  {
    id: "singapore",
    label: "Singapore",
    coords: [103.8, 1.3] as [number, number],
  },
  {
    id: "australia",
    label: "Australia",
    coords: [151, -33] as [number, number],
  },
];

let globalCachedWorld: any = null;
let dotsCanvas: OffscreenCanvas | null = null;

function getThemeColor(ctx: CanvasRenderingContext2D, isDark: boolean, isMobile: boolean) {
  if (isMobile) return "rgba(128, 128, 128, 0.5)";
  return isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.5)";
}

function renderDotsFromCache(canvas: HTMLCanvasElement, isDark: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx || !dotsCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const isMobile = width < 768;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.scale(dpr, dpr);
  ctx.drawImage(dotsCanvas, 0, 0);
  ctx.fillStyle = getThemeColor(ctx, isDark, isMobile);
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
}

async function renderMapCore(
  width: number,
  height: number,
  isDark: boolean,
  canvas: HTMLCanvasElement,
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.scale(dpr, dpr);

  if (!globalCachedWorld) {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
    );
    if (!response.ok) throw new Error("Failed to fetch map data");
    globalCachedWorld = await response.json();
  }

  const world = globalCachedWorld;
  const { geoPath, geoEquirectangular } = await import("d3");
  const { feature } = await import("topojson-client");

  const countries = feature(
    world,
    world.objects.countries as any,
  ) as any;
  if (!countries || !countries.features) return [];

  countries.features = countries.features.filter(
    (d: any) => d.id !== "010",
  );

  const projection = geoEquirectangular()
    .fitSize([width, height], countries);

  const positions = nodesData.map((node) => {
    const [x, y] = projection(node.coords) || [0, 0];
    return { ...node, x, y };
  });

  const offCanvas = new OffscreenCanvas(width, height);
  const offCtx = offCanvas.getContext("2d");
  if (!offCtx) return positions;

  const path = geoPath().projection(projection).context(offCtx);
  offCtx.fillStyle = "#fff";
  offCtx.beginPath();
  path(countries);
  offCtx.fill();

  const imageData = offCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const imgWidth = imageData.width;

  ctx.clearRect(0, 0, width, height);

  const isMobile = width < 768;
  const step = isMobile ? 6 : 8;
  const dotRadius = 1.5;
  ctx.fillStyle = getThemeColor(ctx, isDark, isMobile);

  const dotsOffCanvas = new OffscreenCanvas(width, height);
  const dotsOffCtx = dotsOffCanvas.getContext("2d");
  if (dotsOffCtx) {
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * imgWidth + x) * 4;
        if (data[index + 3] > 128) {
          dotsOffCtx.beginPath();
          dotsOffCtx.arc(x, y, dotRadius, 0, Math.PI * 2);
          dotsOffCtx.fill();
        }
      }
    }
    dotsCanvas = dotsOffCanvas;
    ctx.drawImage(dotsCanvas, 0, 0);
    ctx.fillStyle = getThemeColor(ctx, isDark, isMobile);
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";
  }

  return positions;
}

export default function DotMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodePositions, setNodePositions] = useState<
    { id: string; label: string; x: number; y: number }[]
  >([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let isMounted = true;

    const renderMap = async (width: number, height: number) => {
      if (!isMounted || !canvasRef.current) return;
      if (width <= 0 || height <= 0) return;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const positions = await renderMapCore(width, height, isDark, canvas);
      if (isMounted) setNodePositions(positions);
    };

    const onResize = (width: number, height: number) => {
      setIsMobile(width < 768);
      dotsCanvas = null;
      renderMap(width, height);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      onResize(Math.floor(width), Math.floor(height));
    });
    resizeObserver.observe(container);

    const rect = container.getBoundingClientRect();
    onResize(Math.floor(rect.width), Math.floor(rect.height));

    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme" && dotsCanvas && canvasRef.current) {
          const isDark = document.documentElement.getAttribute("data-theme") === "dark";
          if (canvasRef.current) renderDotsFromCache(canvasRef.current, isDark);
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  const markerSize = isMobile ? 16 : 14;
  const rippleSize = isMobile ? 36 : 48;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <style>{`
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-ripple { animation: ripple 3s infinite; }
        .animate-ripple-delay-1 { animation: ripple 3s infinite 1s; }
        .animate-ripple-delay-2 { animation: ripple 3s infinite 2s; }
      `}</style>

      {nodePositions.map((node) => (
        <div
          key={node.id}
          className="absolute z-10 cursor-pointer group"
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          onTouchStart={(e) => {
            e.preventDefault();
            setHoveredNode(node.id);
          }}
          onTouchEnd={() => setTimeout(() => setHoveredNode(null), 2000)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={
              hoveredNode === node.id
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none z-20"
          >
            <div className="bg-[var(--color-background-primary)] px-3 py-1.5 rounded-lg shadow-lg border border-[var(--color-border-medium)] whitespace-nowrap">
              <span className="text-[var(--color-text-primary)] text-[13px] font-semibold tracking-tight uppercase">
                {node.label}
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--color-border-medium)]" />
              <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--color-background-primary)]" />
            </div>
          </motion.div>

          <div
            className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{
              width: markerSize,
              height: markerSize,
              backgroundColor: "var(--color-accent)",
              boxShadow: `0 0 ${isMobile ? 12 : 18}px ${isMobile ? 3 : 5}px color-mix(in srgb, var(--color-accent) 60%, transparent)`,
            }}
          >
            <div
              className="rounded-full bg-white"
              style={{
                width: `${Math.round(markerSize * 0.36)}px`,
                height: `${Math.round(markerSize * 0.36)}px`,
              }}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute rounded-full animate-ripple"
              style={{
                width: rippleSize,
                height: rippleSize,
                border: "1.5px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
              }}
            />
            <div
              className="absolute rounded-full animate-ripple animate-ripple-delay-1"
              style={{
                width: rippleSize,
                height: rippleSize,
                border: "1.5px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
              }}
            />
            <div
              className="absolute rounded-full animate-ripple animate-ripple-delay-2"
              style={{
                width: rippleSize,
                height: rippleSize,
                border: "1.5px solid color-mix(in srgb, var(--color-accent) 15%, transparent)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
