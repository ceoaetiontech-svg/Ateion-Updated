import { motion } from "framer-motion";
import "../../styles/gco/Slide.css";

export default function Slide() {
  return (
    <div className="slide">
      <motion.div
        className="slide-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.h1
          className="slide-title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          Education Systems Are
          <br />
          Fighting the Last War
        </motion.h1>

        <motion.p
          className="slide-description"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          Highlighting facts like{" "}
          <span className="slide-accent">
            40–70%
          </span>{" "}
          of graduates lacking job readiness and{" "}
          <span className="slide-accent">
            44–50%
          </span>{" "}
          of workforce skills changing in 5 years.
        </motion.p>
      </motion.div>
    </div>
  );
}
