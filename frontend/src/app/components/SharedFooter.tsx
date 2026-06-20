import React, { memo } from "react";
import { motion } from "framer-motion";
import svgPaths from "../../pages/svg-paths";
import { Link } from "react-router";
import logo from "../../assets/logo.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: [0.21, 0.45, 0.32, 0.9] } }),
};

const SocialIcon = memo(function SocialIcon({ svgPath, href }: { svgPath: string; href?: string }) {
  const IconContainer = href ? "a" : "div";
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <IconContainer
      {...linkProps}
      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 group hover:scale-110"
      style={{ backgroundColor: "rgba(232,133,106,0.08)" }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(232,133,106,0.08)"; }}
    >
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 22.2726 22.2726">
        <path d={svgPath} className="fill-[var(--color-text-secondary)] group-hover:fill-white transition-colors" />
      </svg>
    </IconContainer>
  );
});

const MailIcon = memo(function MailIcon({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 group hover:scale-110"
      style={{ backgroundColor: "rgba(232,133,106,0.08)" }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(232,133,106,0.08)"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20V18H4V6Z" className="stroke-[var(--color-text-secondary)] group-hover:stroke-white transition-colors" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 7L12 13L20 7" className="stroke-[var(--color-text-secondary)] group-hover:stroke-white transition-colors" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </a>
  );
});

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Global Olympiad", to: "/gco" },
  { label: "PlayGround", to: "/playground" },
  { label: "Get Connected", to: "/contact" },
];

const legalLinks = ["Terms of Use", "Privacy Policy", "Data Collection & Consent"];

export default function SharedFooter() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full border-t relative"
      style={{ backgroundColor: "var(--color-background-secondary)", borderColor: "var(--color-border-light)", boxShadow: "var(--shadow-clay)" }}
    >
      {/* Top accent line */}
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, var(--color-accent), rgba(232,133,106,0.1))" }} />

      <div className="w-full max-w-[var(--max-width)] mx-auto px-[24px] sm:px-[40px] md:px-[64px] py-[48px] sm:py-[64px]">
        <div className="flex flex-col md:flex-row items-start justify-between gap-[48px] md:gap-[32px]">
          {/* Brand */}
          <motion.div className="flex flex-col gap-[20px] flex-[1.5]" variants={fadeUp} custom={0}>
            <Link to="/">
              <img src={logo} alt="Ateion" className="h-[52px] w-auto object-contain logo-footer" />
            </Link>
            <p className="text-[14px] leading-[1.7] max-w-[300px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}>
              The world&apos;s leading Capability-First Education ecosystem — integrating AI literacy, innovation, and measurable readiness into modern schooling.
            </p>
            <div className="flex gap-[10px] items-center mt-[4px]">
              <SocialIcon svgPath={svgPaths.peb98800} href="https://www.linkedin.com/company/ateion/" />
              <MailIcon href="mailto:destiny@ateion.info?subject=Hello%20Ateion" />
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div className="flex flex-col gap-[16px] flex-[1]" variants={fadeUp} custom={1}>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] font-manrope" style={{ color: "var(--color-accent)" }}>
              Navigate
            </p>
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-[14px] transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
              >
                {label}
              </Link>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div className="flex flex-col gap-[16px] flex-[1]" variants={fadeUp} custom={2}>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] font-manrope" style={{ color: "var(--color-accent)" }}>
              Contact
            </p>
            <p className="text-[14px] leading-[1.6]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}>
              PCMC, Pune, Maharashtra - 500034
            </p>
            <p className="text-[14px]" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}>
              +91 93569 76878
            </p>
            <a
              href="mailto:destiny@ateion.info"
              className="text-[14px] transition-colors duration-200"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-family-body)" }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
            >
              destiny@ateion.info
            </a>
          </motion.div>

          {/* Legal */}
          <motion.div className="flex flex-col gap-[16px] flex-[1]" variants={fadeUp} custom={3}>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] font-manrope" style={{ color: "var(--color-accent)" }}>
              Legal
            </p>
            {legalLinks.map((item) => (
              <p
                key={item}
                className="text-[14px] transition-colors duration-200 cursor-pointer"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
              >
                {item}
              </p>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full py-[18px] flex items-center justify-center px-[24px]" style={{ backgroundColor: "var(--color-background-primary)", borderTop: "1px solid var(--color-border-light)" }}>
        <p className="text-[13px] text-center" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-family-body)" }}>
          Copyright &copy; Ateion Pvt. Ltd. 2026. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}
