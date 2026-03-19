import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { BookOpen, FileText, Lightbulb, FileCheck } from 'lucide-react';

interface TimelineStep {
  number: number;
  icon: React.ReactNode;
  text: string;
  side: 'left' | 'right';
}

const timelineSteps: TimelineStep[] = [
  {
    number: 1,
    icon: <BookOpen className="w-6 h-6" />,
    text: 'Students face unfamiliar real-world scenarios.',
    side: 'right',
  },
  {
    number: 2,
    icon: <FileText className="w-6 h-6" />,
    text: 'There is no syllabus to prepare from.',
    side: 'left',
  },
  {
    number: 3,
    icon: <Lightbulb className="w-6 h-6" />,
    text: 'AI evaluates reasoning pathways — not memory.',
    side: 'right',
  },
  {
    number: 4,
    icon: <FileCheck className="w-6 h-6" />,
    text: 'Students receive a Strategic Capability Report.',
    side: 'left',
  },
];

function TimelineStepComponent({ 
  step, 
  index 
}: { 
  step: TimelineStep; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center mb-24">
      {/* Left side content */}
      <motion.div
        className="absolute right-1/2 pr-16 w-80 flex justify-end"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        {step.side === 'left' ? (
          <p className="text-base text-right">{step.text}</p>
        ) : (
          <motion.div
            className="w-20 h-20 rounded-full bg-[#D4CDB7] flex items-center justify-center transition-colors duration-500 ease-out"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
          >
            {step.icon}
          </motion.div>
        )}
      </motion.div>

      {/* Center numbered circle */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center border-4 border-[#f5f1e8] transition-colors duration-500 ease-out"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
      >
        <span className="text-white text-lg font-medium">{step.number}</span>
      </motion.div>

      {/* Right side content */}
      <motion.div
        className="absolute left-1/2 pl-16 w-80"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        {step.side === 'right' ? (
          <p className="text-base text-left">{step.text}</p>
        ) : (
          <motion.div
            className="w-20 h-20 rounded-full bg-[#D4CDB7] flex items-center justify-center transition-colors duration-500 ease-out"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
          >
            {step.icon}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function App() {
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (lineRef.current) {
        const element = lineRef.current as HTMLElement;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        // Calculate how much of the line should be visible
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight)));
        setLineHeight(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-[#f5f1e8] py-24">
      <div className="max-w-6xl mx-auto px-8">
        {/* Title */}
        <motion.h1
          className="text-4xl text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How GCO Works ?
        </motion.h1>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line - background */}
          <div
            ref={lineRef}
            className="absolute left-1/2 w-0.5 bg-gray-300 -translate-x-1/2"
            style={{ top: '0px', height: `${(timelineSteps.length - 1) * 200}px` }}
          />

          {/* Vertical line - animated fill */}
          <motion.div
            className="absolute left-1/2 w-0.5 bg-[#1a1a1a] -translate-x-1/2 transition-all duration-500 ease-out"
            style={{
              top: '0px',
              height: `${(timelineSteps.length - 1) * 200}px`,
              scaleY: lineHeight / 100,
              transformOrigin: 'top',
            }}
          />

          {/* Timeline steps */}
          <div className="relative">
            {timelineSteps.map((step, index) => (
              <TimelineStepComponent 
                key={index} 
                step={step} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}