import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, FileText, Lightbulb, FileCheck } from 'lucide-react';
import '../../styles/gco/TimelineSection.css';

const timelineSteps = [
  {
    number: 1,
    icon: <BookOpen className="timeline-icon-svg" />,
    text: 'Students face unfamiliar real-world scenarios.',
    side: 'right',
  },
  {
    number: 2,
    icon: <FileText className="timeline-icon-svg" />,
    text: 'There is no syllabus to prepare from.',
    side: 'left',
  },
  {
    number: 3,
    icon: <Lightbulb className="timeline-icon-svg" />,
    text: 'AI evaluates reasoning pathways — not memory.',
    side: 'right',
  },
  {
    number: 4,
    icon: <FileCheck className="timeline-icon-svg" />,
    text: 'Students receive a Strategic Capability Report.',
    side: 'left',
  },
];

function TimelineStepComponent({ step, index }: { step: any, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="timeline-step">
      <motion.div
        className={`timeline-content-side timeline-left ${step.side === 'left' ? 'text-side' : 'icon-side'}`}
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {step.side === 'left' ? (
          <p className="timeline-text text-right">{step.text}</p>
        ) : (
          <motion.div
            className="timeline-icon-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {step.icon}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="timeline-circle"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0 }}
      >
        <span className="timeline-number">{step.number}</span>
      </motion.div>

      <motion.div
        className={`timeline-content-side timeline-right ${step.side === 'right' ? 'text-side' : 'icon-side'}`}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {step.side === 'right' ? (
          <p className="timeline-text text-left">{step.text}</p>
        ) : (
          <motion.div
            className="timeline-icon-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {step.icon}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (lineRef.current) {
        const element = lineRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight)));
        setLineHeight(scrollProgress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="timeline-section">
      <div className="timeline-container">
        <motion.h1
          className="timeline-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How GCO Works ?
        </motion.h1>

        <div className="timeline-relative">
          <div
            ref={lineRef}
            className="timeline-line-bg"
            style={{ height: `${(timelineSteps.length - 1) * 200}px` }}
          />

          <motion.div
            className="timeline-line-fill"
            style={{
              height: `${(timelineSteps.length - 1) * 200}px`,
              scaleY: lineHeight / 100,
              transformOrigin: 'top',
              backgroundColor: '#ff5a5a'
            }}
          />

          <div className="timeline-steps-wrapper">
            {timelineSteps.map((step, index) => (
              <TimelineStepComponent key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
