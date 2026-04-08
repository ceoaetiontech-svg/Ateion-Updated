import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion } from 'framer-motion';

const nodesData = [
  { id: 'uk', label: 'United Kingdom', coords: [-2, 53] as [number, number] },
  { id: 'france', label: 'France', coords: [2, 46] as [number, number] },
  { id: 'middle-east', label: 'United Arab Emirates', coords: [55, 25] as [number, number] },
  { id: 'india', label: 'India', coords: [78, 20] as [number, number] },
  { id: 'singapore', label: 'Singapore', coords: [103.8, 1.3] as [number, number] },
  { id: 'australia', label: 'Australia', coords: [151, -33] as [number, number] },
];

export default function DotMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodePositions, setNodePositions] = useState<{id: string, label: string, x: number, y: number}[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isMounted = true;
    let cachedWorld: any = null;

    const renderMap = async () => {
      if (!isMounted || !containerRef.current || !canvasRef.current) return;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      if (width <= 0 || height <= 0) return;

      // Set canvas size for high DPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      try {
        if (!cachedWorld) {
          const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
          if (!response.ok) throw new Error('Failed to fetch map data');
          cachedWorld = await response.json();
        }

        const world = cachedWorld;
        if (!isMounted || !world) return;

        const countries = topojson.feature(world, world.objects.countries as any) as any;
        if (!countries || !countries.features) return;

        countries.features = countries.features.filter((d: any) => d.id !== '010');

        const projection = d3.geoEquirectangular()
          .fitSize([width, height], countries);

        const positions = nodesData.map(node => {
          const [x, y] = projection(node.coords) || [0, 0];
          return { ...node, x, y };
        });

        if (isMounted) setNodePositions(positions);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = width;
        offCanvas.height = height;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return;

        const path = d3.geoPath().projection(projection).context(offCtx);

        offCtx.fillStyle = '#fff';
        offCtx.beginPath();
        path(countries);
        offCtx.fill();

        const imageData = offCtx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const imgWidth = imageData.width;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

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

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(renderMap);
    });

    resizeObserver.observe(container);

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Add ripple animation styles */}
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

      {nodePositions.map(node => (
        <div
          key={node.id}
          className="absolute z-10 cursor-pointer"
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={hoveredNode === node.id ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 whitespace-nowrap">
              <span className="text-black text-[13px] font-semibold tracking-tight uppercase">{node.label}</span>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/95" />
            </div>
          </motion.div>

          {/* Node core */}
          <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_15px_4px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-125" />

          {/* Ripples */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-12 h-12 border border-blue-500/30 rounded-full animate-ripple" />
            <div className="absolute w-12 h-12 border border-blue-500/20 rounded-full animate-ripple animate-ripple-delay-1" />
            <div className="absolute w-12 h-12 border border-blue-500/10 rounded-full animate-ripple animate-ripple-delay-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
