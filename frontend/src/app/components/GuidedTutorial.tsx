import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const TOUR_STORAGE_KEY = "ateion-guided-tutorial-v2";

type TourStep = {
  route: string;
  selectors: string[];
  title: string;
  primaryLabel: string;
  nextRoute?: string;
  waitLabel?: string;
};

type TargetRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const steps: TourStep[] = [
  {
    route: "/",
    selectors: ['[data-tour="main-playground-nav"]', '[data-tour="mobile-playground-nav"]', '[data-tour="main-mobile-menu"]'],
    title: "PlayGround",
    primaryLabel: "Next",
    nextRoute: "/playground",
  },
  {
    route: "/playground",
    selectors: ['[data-tour="explore-playground-cta"]'],
    title: "Explore Playground",
    primaryLabel: "Open",
    nextRoute: "/playground/dashboard",
  },
  {
    route: "/playground/dashboard",
    selectors: ['[data-tour="dashboard-discover-courses"]', '[data-tour="sidebar-discover-courses"]'],
    title: "Discover Courses",
    primaryLabel: "Open",
    nextRoute: "/playground/discover",
  },
  {
    route: "/playground/discover",
    selectors: ['[data-tour="discover-preview-course"]'],
    title: "Preview Course",
    primaryLabel: "Done",
    waitLabel: "Loading courses...",
  },
];

function getVisibleTarget(selectors: string[]) {
  for (const selector of selectors) {
    const matches = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const target = matches.find((el) => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && styles.visibility !== "hidden" && styles.display !== "none";
    });

    if (target) return target;
  }

  return null;
}

function getStoredTourState() {
  try {
    return window.localStorage.getItem(TOUR_STORAGE_KEY);
  } catch {
    return "complete";
  }
}

function completeTour() {
  try {
    window.localStorage.setItem(TOUR_STORAGE_KEY, "complete");
  } catch {
    // Ignore private browsing storage failures.
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const scrollKeys = new Set(["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

export default function GuidedTutorial() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const step = steps[stepIndex];
  const hasTourSurface = Boolean(targetRect) || Boolean(step.waitLabel);

  const isSupportedRoute = useMemo(() => {
    return location.pathname === "/" || location.pathname.startsWith("/playground");
  }, [location.pathname]);

  useEffect(() => {
    if (getStoredTourState() === "complete") return;

    setIsActive(true);
    if (location.pathname.startsWith("/playground/discover")) {
      setStepIndex(3);
    } else if (location.pathname.startsWith("/playground/dashboard")) {
      setStepIndex(2);
    } else if (location.pathname.startsWith("/playground")) {
      setStepIndex(1);
    } else {
      setStepIndex(0);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;
    setTargetRect(null);

    if (location.pathname.startsWith("/course-preview") && stepIndex >= 3) {
      completeTour();
      setIsActive(false);
      return;
    }

    if (location.pathname.startsWith("/playground/discover") && stepIndex < 3) {
      setStepIndex(3);
      return;
    }

    if (location.pathname.startsWith("/playground/dashboard") && stepIndex < 2) {
      setStepIndex(2);
      return;
    }

    if (location.pathname === "/playground" && stepIndex === 0) {
      setStepIndex(1);
    }
  }, [isActive, location.pathname, stepIndex]);

  useEffect(() => {
    setTargetRect(null);
  }, [stepIndex]);

  useEffect(() => {
    if (!isActive || !isSupportedRoute) return;

    let frame = 0;
    let timeout = 0;
    let interval = 0;

    const updateTarget = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const target = getVisibleTarget(step.selectors);
        if (!target) {
          setTargetRect(null);
          return;
        }

        const rect = target.getBoundingClientRect();
        const isOutsideViewport = rect.bottom < 28 || rect.top > window.innerHeight - 28;

        if (isOutsideViewport) {
          target.scrollIntoView({ block: "center", inline: "nearest" });
          window.setTimeout(updateTarget, 120);
          return;
        }

        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      });
    };

    updateTarget();
    timeout = window.setTimeout(updateTarget, 350);
    interval = window.setInterval(updateTarget, 600);

    const ac = new AbortController();
    window.addEventListener("resize", updateTarget, { signal: ac.signal });
    window.addEventListener("scroll", updateTarget, { signal: ac.signal, passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.clearInterval(interval);
      ac.abort();
    };
  }, [isActive, isSupportedRoute, location.pathname, step]);

  useEffect(() => {
    if (!isActive || !isSupportedRoute || !hasTourSurface) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverscroll = document.body.style.overscrollBehavior;
    const originalBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    document.body.style.touchAction = "none";

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
    window.addEventListener("keydown", preventScrollKeys, { capture: true });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscroll;
      document.body.style.touchAction = originalBodyTouchAction;
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventScrollKeys, { capture: true });
    };
  }, [hasTourSurface, isActive, isSupportedRoute]);

  if (!isActive || !isSupportedRoute || !hasTourSurface) return null;

  const finish = () => {
    completeTour();
    setIsActive(false);
  };

  const handlePrimary = () => {
    if (step.nextRoute) {
      setTargetRect(null);
      setStepIndex(Math.min(stepIndex + 1, steps.length - 1));
      navigate(step.nextRoute);
      return;
    }

    finish();
  };

  const viewportWidth = typeof window === "undefined" ? 1024 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 768 : window.innerHeight;
  const cardWidth = Math.min(236, viewportWidth - 24);
  const cardLeft = targetRect
    ? clamp(targetRect.left + targetRect.width / 2 - cardWidth / 2, 12, viewportWidth - cardWidth - 12)
    : clamp(viewportWidth / 2 - cardWidth / 2, 12, viewportWidth - cardWidth - 12);
  const placeBelow = targetRect ? targetRect.top + targetRect.height + 18 < viewportHeight - 126 : true;
  const cardTop = targetRect
    ? placeBelow
      ? targetRect.top + targetRect.height + 14
      : Math.max(12, targetRect.top - 112)
    : Math.max(80, viewportHeight * 0.22);
  const stepLabel = `${stepIndex + 1}/${steps.length}`;
  const isWaitingForTarget = !targetRect && Boolean(step.waitLabel);
  const title = isWaitingForTarget ? step.waitLabel : step.title;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[260] pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!targetRect && <div className="absolute inset-0 bg-[#060713]/35 backdrop-blur-[1px]" />}

        {targetRect && (
          <>
            <motion.div
              className="pointer-events-none absolute rounded-[22px] border-2 border-[var(--color-accent)] shadow-[0_0_0_9999px_rgba(6,7,19,0.38),0_0_24px_rgba(232,133,106,0.42)]"
              style={{
                top: targetRect.top - 7,
                left: targetRect.left - 7,
                width: targetRect.width + 14,
                height: targetRect.height + 14,
              }}
              animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.025, 1] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_16px_rgba(232,133,106,0.8)]"
              style={{
                top: placeBelow ? targetRect.top + targetRect.height + 6 : targetRect.top - 16,
                left: targetRect.left + targetRect.width / 2 - 5,
              }}
              animate={{ y: placeBelow ? [0, 7, 0] : [0, -7, 0], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        <motion.div
          className="absolute pointer-events-auto rounded-[18px] border border-white/15 bg-[var(--color-background-primary)]/96 p-3 text-[var(--color-text-primary)] shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          style={{
            top: cardTop,
            left: cardLeft,
            width: cardWidth,
          }}
          initial={{ opacity: 0, y: placeBelow ? -8 : 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={finish}
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            aria-label="Skip tutorial"
          >
            <X size={15} />
          </button>

          <div className="pr-8">
            <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Step {stepLabel}
            </p>
            <h2 className="text-[18px] font-extrabold leading-tight text-[var(--color-text-primary)]">
              {title}
            </h2>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={finish}
              className="flex h-9 flex-1 items-center justify-center rounded-full border border-[var(--color-border-medium)] bg-[var(--color-background-secondary)] px-3 text-xs font-bold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)]"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={handlePrimary}
              disabled={isWaitingForTarget}
              className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 text-xs font-bold text-white shadow-[0_10px_24px_rgba(232,133,106,0.24)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isWaitingForTarget ? "Waiting" : step.primaryLabel}
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
