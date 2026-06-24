import { useState, useEffect } from "react";

export interface Breakpoints {
  isTablet: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;
}

export function useBreakpoints(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isTablet: typeof window !== "undefined" ? window.matchMedia("(max-width: 1024px)").matches : false,
    isMobile: typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false,
    isSmallMobile: typeof window !== "undefined" ? window.matchMedia("(max-width: 480px)").matches : false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tabletQuery = window.matchMedia("(max-width: 1024px)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const smallMobileQuery = window.matchMedia("(max-width: 480px)");

    const update = () => {
      setBreakpoints({
        isTablet: tabletQuery.matches,
        isMobile: mobileQuery.matches,
        isSmallMobile: smallMobileQuery.matches,
      });
    };

    // Initial sync
    update();

    if (tabletQuery.addEventListener) {
      tabletQuery.addEventListener("change", update);
      mobileQuery.addEventListener("change", update);
      smallMobileQuery.addEventListener("change", update);
      
      return () => {
        tabletQuery.removeEventListener("change", update);
        mobileQuery.removeEventListener("change", update);
        smallMobileQuery.removeEventListener("change", update);
      };
    } else {
      // Fallback for older browsers
      tabletQuery.addListener(update);
      mobileQuery.addListener(update);
      smallMobileQuery.addListener(update);
      
      return () => {
        tabletQuery.removeListener(update);
        mobileQuery.removeListener(update);
        smallMobileQuery.removeListener(update);
      };
    }
  }, []);

  return breakpoints;
}
