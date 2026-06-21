import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BarChart2, PlayCircle, Check, Heart, Play } from "lucide-react";
import { getTopicColor } from "../shared/topicColors";
import type { Course } from "../shared/types";

interface CoursePreviewPopoverProps {
  course: Course;
  children: React.ReactNode;
  onReadMore?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

const PopoverListItem = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.08 + 0.1,
      }}
      className="flex items-start gap-3 text-[14px] text-[var(--color-text-secondary)]"
    >
      <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] mt-0.5">
        <Check size={13} className="stroke-[3]" />
      </div>
      <span className="leading-tight pt-0.5">{children}</span>
    </motion.li>
  );
};

export default function CoursePreviewPopover({
  course, children, onReadMore, onPreview, onSave, isSaved
}: CoursePreviewPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState<"right" | "left">("right");
  const containerRef = useRef<HTMLDivElement>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    clearTimeout(leaveTimeoutRef.current);

    enterTimeoutRef.current = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.right + 400 > window.innerWidth) {
          setPosition("left");
        } else {
          setPosition("right");
        }
      }
      setIsOpen(true);
    }, 350);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const topicColor = getTopicColor(course.topics);
  const isBestseller = course.rating >= 4.7;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${isOpen ? "z-50" : "z-10"} ${isMobile ? "flex flex-col" : "flex"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: position === "right" ? -10 : 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className={`absolute top-1/2 -translate-y-1/2 w-[380px] bg-[var(--color-background-secondary)]/90 backdrop-blur-xl rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[var(--color-border-medium)] ${position === "right" ? "left-full ml-4" : "right-full mr-4"
              } z-50 cursor-default`}
          >
            {/* Arrow wrapper to clip the inside of the translucent arrow */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-8 overflow-hidden ${position === "right" ? "-left-4" : "-right-4"
                }`}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-background-secondary)]/90 backdrop-blur-xl transform rotate-45 ${position === "right"
                    ? "left-full -translate-x-1/2 border-b border-l border-[var(--color-border-medium)]"
                    : "right-full translate-x-1/2 border-t border-r border-[var(--color-border-medium)]"
                  }`}
              />
            </div>

            <div className="relative z-10 bg-transparent rounded-[24px] overflow-hidden flex flex-col">
              <div className="h-1.5 w-full" style={{ backgroundColor: topicColor }} />

              <div className="p-6">
                <h3 className="text-[19px] font-black text-[var(--color-text-primary)] leading-tight mb-3">
                  {course.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  {isBestseller && (
                    <span className="px-2 py-0.5 bg-[#eceb98] text-[#3d3c0a] text-[11px] font-extrabold uppercase tracking-wider rounded-sm">
                      Bestseller
                    </span>
                  )}
                  <span className="text-[13px] text-[var(--color-success)] font-extrabold">
                    Updated {new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[13px] text-[var(--color-text-secondary)] font-bold mb-5">
                  <span className="flex items-center gap-1.5"><Clock size={15} /> {course.duration}</span>
                  <span className="flex items-center gap-1.5"><BarChart2 size={15} /> {course.level}</span>
                  <span className="flex items-center gap-1.5"><PlayCircle size={15} /> {course.lessons} lessons</span>
                </div>

                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5 line-clamp-3">
                  {course.description && course.description.trim()
                    ? course.description.trim()
                    : course.title.includes("French")
                      ? "Master practical French through short, easy-to-follow lessons designed for busy learners. Learn essential vocabulary, everyday phrases, pronunciation, and grammar in bite-sized 3-minute sessions that help you start speaking French from day one. Perfect for complete beginners, travelers, students, and anyone looking to build confidence in real-world French conversations."
                      : course.title.match(/bitcoin|crypto|blockchain/i)
                        ? "Learn the basics of Bitcoin, cryptocurrencies, and blockchain technology. Understand how digital currencies work, how transactions are secured, and the key concepts needed to confidently navigate the world of crypto."
                        : course.title.match(/money|financial|saving|budget|finance/i)
                          ? "Help young learners build essential money management skills through fun and practical lessons. This course introduces key financial concepts such as saving, budgeting, spending, and setting financial goals. Learners will develop smart habits that encourage responsible decision-making and financial confidence from an early age."
                          : course.title.match(/drawing|illustration|sketch|digital art|draw|painting/i)
                            ? "Discover the fundamentals of digital drawing and illustration using Adobe Photoshop. Learn how to sketch, create line art, apply color, and develop artwork using industry-standard tools and techniques. This course is ideal for beginners looking to bring their creative ideas to life digitally."
                            : course.title.match(/photography|portrait|retouch|photo/i)
                              ? "Learn the techniques used by professional photographers and designers to create polished, high-quality portraits. From skin retouching and blemish removal to color correction and image enhancement, this course focuses on achieving natural and visually appealing results using Adobe Photoshop."
                              : course.title.match(/animation|2d animation|frame by frame/i)
                                ? "Learn how to bring ideas to life through the art of 2D animation. This course covers animation principles, character movement, timing, storytelling, and scene creation, helping learners create smooth and engaging animations from concept to completion."
                                : course.title.match(/mobile|android|ios|app development|application/i)
                                  ? "Explore the core principles of mobile application development through a structured and practical approach. Learn how to design user-friendly interfaces, develop application functionality, manage data, and create mobile experiences that meet modern industry standards."
                                  : course.title.match(/web|full.?stack|front.?end|back.?end/i)
                                    ? "Learn how modern web applications are built by combining front-end and back-end technologies. This course covers database integration, user authentication, form processing, and dynamic content generation, providing a strong foundation in full-stack web development."
                                    : course.title.match(/programming|coding|software|computer science|learn to code|code basics/i)
                                      ? "Start your programming journey through engaging lessons and hands-on projects designed to make coding approachable and enjoyable. Learn how software is created, develop logical thinking skills, and gain practical experience solving real-world challenges through code."
                                      : `A comprehensive deep dive into ${course.topics.slice(0, 2).join(" and ")}. Master the core principles, build scalable solutions, and elevate your real-world capability index.`}
                </p>

                <div className="mb-6">
                  <ul className="space-y-2.5">
                    {course.title.includes("French") ? (
                      <>
                        <PopoverListItem index={0}>Speak French confidently in everyday situations</PopoverListItem>
                        <PopoverListItem index={1}>Build your own sentences from the very first lessons</PopoverListItem>
                        <PopoverListItem index={2}>Learn useful vocabulary and phrases for travel and conversation</PopoverListItem>
                      </>
                    ) : course.title.match(/bitcoin|crypto|blockchain/i) ? (
                      <>
                        <PopoverListItem index={0}>Understand Bitcoin and cryptocurrency fundamentals</PopoverListItem>
                        <PopoverListItem index={1}>Learn how blockchain technology works</PopoverListItem>
                        <PopoverListItem index={2}>Explore cryptocurrency wallets and security practices</PopoverListItem>
                      </>
                    ) : course.title.match(/money|financial|saving|budget|finance/i) ? (
                      <>
                        <PopoverListItem index={0}>Understand the basics of money and financial literacy</PopoverListItem>
                        <PopoverListItem index={1}>Learn budgeting, saving, and spending habits</PopoverListItem>
                        <PopoverListItem index={2}>Make smart financial decisions from an early age</PopoverListItem>
                      </>
                    ) : course.title.match(/drawing|illustration|sketch|digital art|draw|painting/i) ? (
                      <>
                        <PopoverListItem index={0}>Create digital sketches and illustrations in Photoshop</PopoverListItem>
                        <PopoverListItem index={1}>Understand drawing fundamentals and perspective</PopoverListItem>
                        <PopoverListItem index={2}>Apply shading, coloring, and digital painting techniques</PopoverListItem>
                      </>
                    ) : course.title.match(/photography|portrait|retouch|photo/i) ? (
                      <>
                        <PopoverListItem index={0}>Retouch portraits using professional Photoshop techniques</PopoverListItem>
                        <PopoverListItem index={1}>Remove blemishes and enhance images naturally</PopoverListItem>
                        <PopoverListItem index={2}>Master color correction and skin retouching workflows</PopoverListItem>
                      </>
                    ) : course.title.match(/animation|2d animation|frame by frame/i) ? (
                      <>
                        <PopoverListItem index={0}>Learn the fundamental principles of 2D animation</PopoverListItem>
                        <PopoverListItem index={1}>Create smooth character movements and actions</PopoverListItem>
                        <PopoverListItem index={2}>Develop storyboards and animated scenes professionally</PopoverListItem>
                      </>
                    ) : course.title.match(/mobile|android|ios|app development|application/i) ? (
                      <>
                        <PopoverListItem index={0}>Understand the mobile app development process</PopoverListItem>
                        <PopoverListItem index={1}>Design and build functional mobile applications</PopoverListItem>
                        <PopoverListItem index={2}>Work with APIs, data storage, and app deployment</PopoverListItem>
                      </>
                    ) : course.title.match(/web|full.?stack|front.?end|back.?end/i) ? (
                      <>
                        <PopoverListItem index={0}>Build interactive and database-driven websites</PopoverListItem>
                        <PopoverListItem index={1}>Implement user authentication and form handling</PopoverListItem>
                        <PopoverListItem index={2}>Connect front-end interfaces with back-end systems</PopoverListItem>
                      </>
                    ) : course.title.match(/programming|coding|software|computer science|learn to code|code basics/i) ? (
                      <>
                        <PopoverListItem index={0}>Learn core programming concepts and logic</PopoverListItem>
                        <PopoverListItem index={1}>Write, test, and debug code effectively</PopoverListItem>
                        <PopoverListItem index={2}>Build simple projects while developing problem-solving skills</PopoverListItem>
                      </>
                    ) : (
                      <>
                        <PopoverListItem index={0}>Build real-world {course.topics || "projects"} from scratch</PopoverListItem>
                        <PopoverListItem index={1}>Master {course.level.toLowerCase()} concepts & best practices</PopoverListItem>
                        <PopoverListItem index={2}>Increase your capability score through hands-on labs</PopoverListItem>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1.5 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onReadMore) onReadMore();
                      }}
                      className="flex-1 bg-[var(--color-accent)] text-white py-3 rounded-xl text-[15px] font-bold hover:brightness-110 hover:shadow-[0_8px_20px_rgba(232,133,106,0.35)] transition-all text-center shadow-md cursor-pointer"
                    >
                      Read More
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSave) onSave();
                      }}
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all shrink-0 cursor-pointer ${isSaved
                          ? "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error)]/10 hover:shadow-[0_8px_20px_rgba(239,68,68,0.25)]"
                          : "border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)] hover:shadow-[0_8px_20px_rgba(232,133,106,0.15)]"
                        }`}
                      aria-label="Save course"
                    >
                      <Heart size={21} fill={isSaved ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPreview) onPreview();
                    }}
                    className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-3 rounded-xl text-[15px] font-bold hover:border-[var(--color-accent)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play size={17} fill="currentColor" /> Preview Course
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
