import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
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

export default function DotMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodePositions, setNodePositions] = useState<
    { id: string; label: string; x: number; y: number }[]
  >([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    let animationFrameId: number;
    let isMounted = true;

    const renderMap = async () => {
      if (!isMounted || !containerRef.current || !canvasRef.current) return;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      if (width <= 0 || height <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      try {
        if (!globalCachedWorld) {
          const response = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
          );
          if (!response.ok) throw new Error("Failed to fetch map data");
          globalCachedWorld = await response.json();
        }

        const world = globalCachedWorld;
        if (!isMounted || !world) return;

        const countries = topojson.feature(
          world,
          world.objects.countries as any,
        ) as any;
        if (!countries || !countries.features) return;

        countries.features = countries.features.filter(
          (d: any) => d.id !== "010",
        );

        const projection = d3
          .geoEquirectangular()
          .fitSize([width, height], countries);

        const positions = nodesData.map((node) => {
          const [x, y] = projection(node.coords) || [0, 0];
          return { ...node, x, y };
        });

        if (isMounted) setNodePositions(positions);

        const offCanvas = document.createElement("canvas");
        offCanvas.width = width;
        offCanvas.height = height;
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) return;

        const path = d3.geoPath().projection(projection).context(offCtx);

        // Theme Support for Canvas
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        
        offCtx.fillStyle = isDark ? "#fff" : "#000";
        offCtx.beginPath();
        path(countries);
        offCtx.fill();

        const imageData = offCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const imgWidth = imageData.width;

        ctx.clearRect(0, 0, width, height);
        
        // Theme Support for Canvas Dots
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.5)";

        const step = 8;
        const dotRadius = 1.5;

        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * imgWidth + x) * 4;
            if (data[index + 3] > 128) {
              ctx.beginPath();
              ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } catch (error) {
        console.error("Error loading map data:", error);
      }
    };

    renderMap();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(renderMap);
    });

    resizeObserver.observe(container);

    // Re-render when theme changes so canvas updates
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(renderMap);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 3s infinite;
        }
        .animate-ripple-delay-1 {
          animation: ripple 3s infinite 1s;
        }
        .animate-ripple-delay-2 {
          animation: ripple 3s infinite 2s;
        }
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
        >
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={
              hoveredNode === node.id
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none"
          >
            <div className="bg-[var(--color-background-primary)] px-3 py-1.5 rounded-lg shadow-lg border border-[var(--color-border-medium)] whitespace-nowrap">
              <span className="text-[var(--color-text-primary)] text-[13px] font-semibold tracking-tight uppercase">
                {node.label}
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--color-border-medium)]" />
              <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--color-background-primary)]" />
            </div>
          </motion.div>

          {/* Node core */}
          <div className="relative w-3 h-3 bg-[var(--color-accent)] rounded-full shadow-[0_0_15px_4px_var(--color-accent-light)] transition-transform duration-300 group-hover:scale-125" />

          {/* Ripples */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-12 h-12 border border-[var(--color-accent)]/40 rounded-full animate-ripple" />
            <div className="absolute w-12 h-12 border border-[var(--color-accent)]/30 rounded-full animate-ripple animate-ripple-delay-1" />
            <div className="absolute w-12 h-12 border border-[var(--color-accent)]/20 rounded-full animate-ripple animate-ripple-delay-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
