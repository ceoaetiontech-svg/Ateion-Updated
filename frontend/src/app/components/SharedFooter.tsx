import React from "react";
import svgPaths from "../../pages/svg-paths";
import { Link } from "react-router";

function SocialIcon({
  svgPath,
  href,
}: {
  svgPath: string;
  href?: string;
}) {
  const IconContainer = href ? "a" : ("div" as any);
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <IconContainer
      {...linkProps}
      className="w-[36px] h-[36px] rounded-full bg-[var(--color-background-tertiary)] hover:bg-[var(--color-primary)] flex items-center justify-center cursor-pointer transition-all duration-200 group"
    >
      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 22.2726 22.2726">
        <path d={svgPath} className="fill-[var(--color-text-secondary)] group-hover:fill-white transition-colors" />
      </svg>
    </IconContainer>
  );
}

function MailIcon({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="w-[36px] h-[36px] rounded-full bg-[var(--color-background-tertiary)] hover:bg-[var(--color-primary)] flex items-center justify-center cursor-pointer transition-all duration-200 group"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20V18H4V6Z" className="stroke-[var(--color-text-secondary)] group-hover:stroke-white transition-colors" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 7L12 13L20 7" className="stroke-[var(--color-text-secondary)] group-hover:stroke-white transition-colors" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function SharedFooter() {
  return (
    <footer className="w-full bg-[var(--color-background-secondary)] border-t border-[var(--color-border-tertiary)]" style={{ boxShadow: 'var(--shadow-clay)' }}>

      {/* Main Footer Body */}
      <div className="w-full max-w-[1280px] mx-auto px-[24px] sm:px-[40px] md:px-[64px] py-[48px] sm:py-[64px]">
        <div className="flex flex-col md:flex-row items-start justify-between gap-[48px] md:gap-[32px]">

          {/* Brand Column */}
          <div className="flex flex-col gap-[20px] flex-[1.5]">
            <p className="font-bold text-[22px] text-[var(--color-primary)] font-manrope tracking-tight">
              Ateion Pvt. Ltd.
            </p>
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] max-w-[280px] font-['Inter',sans-serif]">
              The world's leading Capability-First Education ecosystem — integrating AI literacy, innovation, and measurable readiness into modern schooling.
            </p>
            {/* Social Icons */}
            <div className="flex gap-[10px] items-center mt-[4px]">
              <SocialIcon svgPath={svgPaths.peb98800} href="https://www.linkedin.com/company/ateion/" />
              <MailIcon href="mailto:destiny@ateion.info?subject=Hello%20Ateion" />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-[16px] flex-[1]">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] font-manrope">
              Navigate
            </p>
            {[
              { label: "Home", to: "/" },
              { label: "Dashboard", to: "/dashboard" },
              { label: "Global Olympiad", to: "/gco" },
              { label: "PlayGround", to: "/playground" },
              { label: "Get Connected", to: "/contact" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors font-['Inter',sans-serif]"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-[16px] flex-[1]">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] font-manrope">
              Contact
            </p>
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.6] font-['Inter',sans-serif]">
              PCMC, Pune, Maharashtra - 500034
            </p>
            <p className="text-[14px] text-[var(--color-text-secondary)] font-['Inter',sans-serif]">
              +91 93569 76878
            </p>
            <a
              href="mailto:destiny@ateion.info"
              className="text-[14px] text-[var(--color-primary)] hover:underline transition-colors font-['Inter',sans-serif]"
            >
              destiny@ateion.info
            </a>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-[16px] flex-[1]">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] font-manrope">
              Legal
            </p>
            {["Terms of Use", "Privacy Policy", "Data Collection & Consent"].map((item) => (
              <p
                key={item}
                className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer font-['Inter',sans-serif]"
              >
                {item}
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* Copyright Strip */}
      <div className="w-full bg-[var(--color-background-primary)] py-[16px] sm:py-[20px] flex items-center justify-center px-[24px] border-t border-[var(--color-border-tertiary)]">
        <p className="text-[13px] text-[var(--color-text-secondary)] text-center font-['Inter',sans-serif]">
          Copyright © Ateion Pvt. Ltd. 2026. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}