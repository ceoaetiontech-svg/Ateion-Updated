import React, { memo } from "react";

const marqueeStyles = `
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
.marquee-wrapper {
  -webkit-mask: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}
.marquee-track {
  animation: marquee-left linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
.marquee-card {
  transition: transform 0.3s ease;
}
.marquee-card:hover {
  transform: scale(1.03);
  z-index: 2;
}
`;

import hero1 from "../../assets/hero/hero-1.webp";
import hero2 from "../../assets/hero/hero-2.webp";
import hero3 from "../../assets/hero/hero-3.webp";
import hero4 from "../../assets/hero/hero-4.webp";
import hero5 from "../../assets/hero/hero-5.webp";
import hero6 from "../../assets/hero/hero-6.webp";
import hero7 from "../../assets/hero/hero-7.webp";
import hero8 from "../../assets/hero/hero-8.webp";
import hero9 from "../../assets/hero/hero-9.webp";
import hero10 from "../../assets/hero/hero-10.webp";
import SharedNavbar from "./SharedNavbar";
import NavbarSpacer from "./NavbarSpacer";

function MarqueeTrack({
  children,
  duration,
  direction = "left",
  align = "end",
}: {
  children: React.ReactNode;
  duration: number;
  direction?: "left" | "right";
  align?: "end" | "center";
}) {
  return (
    <div className="marquee-wrapper overflow-hidden relative w-full">
      <div
        className={`marquee-track flex gap-[12px] shrink-0 ${align === "end" ? "items-end" : "items-center"}`}
        style={{
          width: "max-content",
          animationDuration: `${duration}s`,
          animationName: direction === "right" ? "marquee-right" : "marquee-left",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

const ITEM_ASPECT_RATIOS: Record<string, string> = {
  "w-[280px]": "280 / 200",
  "w-[320px]": "320 / 200",
  "w-[350px]": "350 / 200",
  "w-[360px]": "360 / 200",
  "w-[380px]": "380 / 200",
  "w-[400px]": "400 / 200",
  "w-[420px]": "420 / 200",
};

const Item = memo(function Item({ src, alt, width }: { src: string; alt: string; width?: string }) {
  const cls = width || "w-[360px]";
  return (
    <div
      className={`marquee-card h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] relative shrink-0 rounded-[12px] overflow-hidden cursor-pointer ${cls}`}
      style={{ aspectRatio: ITEM_ASPECT_RATIOS[cls] || "360 / 200" }}
    >
      <img
        alt={alt}
        src={src}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        role="presentation"
        aria-hidden="true"
      />
    </div>
  );
});

const Frame67 = memo(function Frame67() {
  return (
    <MarqueeTrack duration={50} direction="right" align="end">
      <Item src={hero1} alt="" width="w-[280px]" />
      <Item src={hero2} alt="" width="w-[420px]" />
      <Item src={hero3} alt="" width="w-[380px]" />
      <Item src={hero4} alt="" width="w-[350px]" />
      <Item src={hero5} alt="" width="w-[360px]" />
    </MarqueeTrack>
  );
});

const Frame66 = memo(function Frame66() {
  return (
    <MarqueeTrack duration={35} direction="left" align="center">
      <Item src={hero6} alt="" width="w-[400px]" />
      <Item src={hero7} alt="" width="w-[320px]" />
      <Item src={hero8} alt="" width="w-[380px]" />
      <Item src={hero9} alt="" width="w-[420px]" />
      <Item src={hero10} alt="" width="w-[350px]" />
    </MarqueeTrack>
  );
});

export default function HeroSliderHeader({
  showNavbar = true,
  children,
}: {
  showNavbar?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full bg-[var(--color-background-primary)]">
      <style>{marqueeStyles}</style>
      <NavbarSpacer />
      {/* 1. Content Above */}
      <div className="w-full flex flex-col items-start pb-[20px] md:pb-[32px]">
        {children}
      </div>

      {/* 2. Marquee Animation Below */}
      <div className="w-full flex flex-col gap-[14px] pb-[20px] md:pb-[40px]">
        <Frame67 />
        <Frame66 />
      </div>

      {showNavbar && <SharedNavbar />}
    </div>
  );
}
