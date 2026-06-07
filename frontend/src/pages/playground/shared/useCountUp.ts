import { useState, useEffect, useRef } from "react";

export function useCountUp(
  end: number,
  duration = 700,
  delay = 0,
  enabled = true
) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    const timeout = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [end, duration, delay, enabled]);

  return count;
}
