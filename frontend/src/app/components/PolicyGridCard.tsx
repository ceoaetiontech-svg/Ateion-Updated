import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { PolicyEntry } from "../../data/policies";

import singaporeImg  from "../../assets/policies/singapore.webp";
import finlandImg    from "../../assets/policies/finland.webp";
import japanImg      from "../../assets/policies/japan.webp";
import indiaImg      from "../../assets/gco/education-ministry-logo.webp";
import uaeImg        from "../../assets/gco/logo-education.webp";
import germanyImg    from "../../assets/policies/germany.webp";
import usaImg        from "../../assets/policies/usa.webp";
import ukImg         from "../../assets/policies/uk.webp";
import southkoreaImg from "../../assets/policies/southkorea.webp";
import euImg         from "../../assets/policies/eu.webp";
import unescoImg     from "../../assets/policies/unesco.webp";
import wefImg        from "../../assets/policies/wef.webp";

export const policyImages: Record<string, string> = {
  singapore:  singaporeImg,
  finland:    finlandImg,
  japan:      japanImg,
  india:      indiaImg,
  uae:        uaeImg,
  germany:    germanyImg,
  usa:        usaImg,
  uk:         ukImg,
  southkorea: southkoreaImg,
  eu:         euImg,
  unesco:     unescoImg,
  wef:        wefImg,
};

export default function PolicyGridCard({ policy, index }: { policy: PolicyEntry; index?: number }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleOpen = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, "_blank", "noopener noreferrer");
  };

  const img = policyImages[policy.id];
  const delay = index !== undefined ? index * 0.09 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="clay-card bg-[var(--color-background-secondary)] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer relative flex flex-col border border-[var(--color-border-light)]"
      whileHover={{ scale: 1.03, y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigate(`/policy/${policy.id}`)}
    >
      {/* Policy logo image — full card top */}
      <div className="w-full aspect-square overflow-hidden bg-transparent shrink-0">
        {img ? (
          <img
            src={img}
            alt={`${policy.country} education policy`}
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            className="w-full h-full object-contain object-center block transition-transform duration-400 ease-in-out"
          />
        ) : (
          <div style={{
            background: `${policy.accentColor}08`,
          }} className="w-full h-full flex items-center justify-center text-[4rem]">
            {policy.flag}
          </div>
        )}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: `3px solid ${policy.accentColor}`,
        }}
        className="flex items-center gap-[10px] py-3 px-4 bg-transparent shrink-0"
      >
        <span
          style={{
            background: policy.accentColor,
          }}
          className="font-['Manrope',sans-serif] text-[0.62rem] font-extrabold tracking-[0.06em] text-white rounded-md py-1 px-2 shrink-0 leading-none"
        >
          {policy.code}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-['OV_Soge',sans-serif] text-[0.9rem] font-bold text-[var(--color-text-primary)] m-0 whitespace-nowrap overflow-hidden text-ellipsis">
            {policy.country}
          </p>
          <p style={{
            color: policy.accentColor,
          }} className="font-['Manrope',sans-serif] text-[0.58rem] font-extrabold tracking-[0.1em] uppercase mt-0.5 mb-0">
            {policy.frameworks.length} framework{policy.frameworks.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
            <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              borderTop: `3px solid ${policy.accentColor}`,
            }}
            className="absolute inset-0 rounded-[var(--radius-lg)] solid-hover-overlay pt-5 px-[18px] pb-[18px] flex flex-col overflow-hidden"
          >
            <p className="font-['Manrope',sans-serif] text-[0.58rem] font-extrabold tracking-[0.16em] uppercase text-[var(--color-text-tertiary)] m-0 mb-2">
              HOW ATEION ALIGNS
            </p>

            <p className="font-['Manrope',sans-serif] text-[0.76rem] text-[var(--color-text-secondary)] leading-[1.65] flex-1 m-0 mb-[14px]">
              {policy.frameworks[0].hoverMessage}
            </p>

            {/* Framework open buttons */}
            <div className="flex flex-col gap-[7px] mb-[14px]">
              {policy.frameworks.map((fw, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 py-2 px-[11px] bg-[var(--color-background-tertiary)] rounded-[10px]"
                >
                  <span className="font-['Manrope',sans-serif] text-[0.67rem] font-semibold text-[var(--color-text-secondary)] flex-1 leading-[1.3]">
                    {fw.name}
                  </span>
                  <button
                    className="clay-button font-['Manrope',sans-serif] text-[0.62rem] font-bold text-white rounded-full py-[5px] px-[11px] cursor-pointer whitespace-nowrap shrink-0"
                    style={{
                      background: policy.accentColor,
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                    onClick={(e) => handleOpen(e, fw.policyLink)}
                  >
                    Open →
                  </button>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {policy.frameworks[0].tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: `1px solid ${policy.accentColor}38`,
                    background: `${policy.accentColor}0d`,
                    color: policy.accentColor,
                  }}
                  className="font-['Manrope',sans-serif] text-[0.6rem] font-bold py-[3px] px-[9px] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
