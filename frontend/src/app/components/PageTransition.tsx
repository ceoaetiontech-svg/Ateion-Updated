import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1,
        filter: { type: "tween", ease: "easeOut", duration: 0.3 },
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
