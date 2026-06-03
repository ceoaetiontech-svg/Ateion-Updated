import { motion } from "framer-motion";
import "../../styles/gco/Slide.css";

export default function Slide() {
  return (
    <div className="slide">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 32,
          padding: "36px 40px",
          background: "var(--color-background-secondary)",
          borderRadius: 24,
          border: "1.5px solid var(--color-border-light)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          flexWrap: "wrap",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "var(--color-text-primary)",
            margin: 0,
            flex: 1,
            minWidth: 240,
          }}
        >
          Education Systems Are
          <br />
          Fighting the Last War
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            fontWeight: 400,
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxWidth: 420,
            margin: 0,
            marginTop: 6,
          }}
        >
          Highlighting facts like{" "}
          <span
            style={{
              fontWeight: 800,
              color: "var(--color-accent)",
              fontSize: "1.15em",
            }}
          >
            40–70%
          </span>{" "}
          of graduates lacking job readiness and{" "}
          <span
            style={{
              fontWeight: 800,
              color: "var(--color-accent)",
              fontSize: "1.15em",
            }}
          >
            44–50%
          </span>{" "}
          of workforce skills changing in 5 years.
        </motion.p>
      </motion.div>
    </div>
  );
}
