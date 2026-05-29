import { RefObject, useCallback, useEffect, useRef, useState } from "react";

/**
 * useMouseVector - Tracks mouse position and movement delta relative to an optional container.
 * Throttled to ~60fps using requestAnimationFrame to prevent performance issues.
 */
export const useMouseVector = (
  containerRef?: RefObject<HTMLElement | SVGElement>,
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [vector, setVector] = useState({ dx: 0, dy: 0 });

  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingEventRef = useRef<{ x: number; y: number } | null>(null);

  const updatePosition = useCallback(
    (x: number, y: number) => {
      pendingEventRef.current = { x, y };

      // Throttle using requestAnimationFrame
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        if (!pendingEventRef.current) {
          rafRef.current = null;
          return;
        }

        const { x: newX, y: newY } = pendingEventRef.current;
        pendingEventRef.current = null;
        rafRef.current = null;

        let finalX = newX;
        let finalY = newY;

        if (containerRef && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          finalX = newX - rect.left;
          finalY = newY - rect.top;
        }

        const dx = finalX - lastPositionRef.current.x;
        const dy = finalY - lastPositionRef.current.y;

        setVector({ dx, dy });
        setPosition({ x: finalX, y: finalY });
        lastPositionRef.current = { x: finalX, y: finalY };
      });
    },
    [containerRef],
  );

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updatePosition]);

  return { position, vector };
};
