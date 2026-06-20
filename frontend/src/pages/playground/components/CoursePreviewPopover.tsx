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
        if (rect.right + 380 > window.innerWidth) {
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
                  className={`absolute top-1/2 -translate-y-1/2 w-[360px] bg-[var(--color-background-secondary)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.22)] border border-[var(--color-border-medium)] ${
                      position === "right" ? "left-full ml-4" : "right-full mr-4"
                  } z-50 cursor-default`}
              >
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[var(--color-background-secondary)] transform rotate-45 ${
                        position === "right"
                            ? "-left-2 border-b border-l border-[var(--color-border-medium)]"
                            : "-right-2 border-t border-r border-[var(--color-border-medium)]"
                    }`}
                />

                <div className="relative z-10 bg-[var(--color-background-secondary)] rounded-2xl overflow-hidden flex flex-col">
                  <div className="h-1.5 w-full" style={{ backgroundColor: topicColor }} />

                  <div className="p-6">
                    <h3 className="text-[17px] font-bold text-[var(--color-text-primary)] leading-tight mb-3">
                      {course.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {isBestseller && (
                          <span className="px-2 py-0.5 bg-[#eceb98] text-[#3d3c0a] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      Bestseller
                    </span>
                      )}
                      <span className="text-xs text-[var(--color-success)] font-bold">
                    Updated {new Date(course.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric"})}
                  </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] font-medium mb-5">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BarChart2 size={14} /> {course.level}</span>
                      <span className="flex items-center gap-1"><PlayCircle size={14} /> {course.lessons} lessons</span>
                    </div>

                    <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-5 line-clamp-3">
                      {course.title.includes("French")
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
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Speak French confidently in everyday situations</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Build your own sentences from the very first lessons</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Learn useful vocabulary and phrases for travel and conversation</span>
                            </li>

                          </>
                        ) : course.title.match(/bitcoin|crypto|blockchain/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Understand Bitcoin and cryptocurrency fundamentals</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Learn how blockchain technology works</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Explore cryptocurrency wallets and security practices</span>
                            </li>
                          </>
                        ) : course.title.match(/money|financial|saving|budget|finance/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Understand the basics of money and financial literacy</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Learn budgeting, saving, and spending habits</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Make smart financial decisions from an early age</span>
                            </li>
                          </>
                        ) : course.title.match(/drawing|illustration|sketch|digital art|draw|painting/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Create digital sketches and illustrations in Photoshop</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Understand drawing fundamentals and perspective</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Apply shading, coloring, and digital painting techniques</span>
                            </li>
                          </>
                        ) : course.title.match(/photography|portrait|retouch|photo/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Retouch portraits using professional Photoshop techniques</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Remove blemishes and enhance images naturally</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Master color correction and skin retouching workflows</span>
                            </li>
                          </>
                        ) : course.title.match(/animation|2d animation|frame by frame/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Learn the fundamental principles of 2D animation</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Create smooth character movements and actions</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Develop storyboards and animated scenes professionally</span>
                            </li>
                          </>
                        ) : course.title.match(/mobile|android|ios|app development|application/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Understand the mobile app development process</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Design and build functional mobile applications</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Work with APIs, data storage, and app deployment</span>
                            </li>
                          </>
                        ) : course.title.match(/web|full.?stack|front.?end|back.?end/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Build interactive and database-driven websites</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Implement user authentication and form handling</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Connect front-end interfaces with back-end systems</span>
                            </li>
                          </>
                        ) : course.title.match(/programming|coding|software|computer science|learn to code|code basics/i) ? (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Learn core programming concepts and logic</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Write, test, and debug code effectively</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Build simple projects while developing problem-solving skills</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Build real-world {course.topics || "projects"} from scratch</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Master {course.level.toLowerCase()} concepts & best practices</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-[var(--color-text-secondary)]">
                              <Check size={16} className="text-[var(--color-success)] shrink-0 mt-0.5" />
                              <span>Increase your capability score through hands-on labs</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onReadMore) onReadMore();
                            }}
                            className="flex-1 bg-[var(--color-accent)] text-white py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-all text-center shadow-md cursor-pointer"
                        >
                          Read More
                        </button>
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSave) onSave();
                            }}
                            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                                isSaved
                                    ? "border-[var(--color-error)] text-[var(--color-error)] bg-[var(--color-error)]/10"
                                    : "border-[var(--color-border-medium)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]"
                            }`}
                            aria-label="Save course"
                        >
                          <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onPreview) onPreview();
                          }}
                          className="w-full bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] py-3 rounded-xl text-sm font-bold hover:border-[var(--color-accent)] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play size={16} fill="currentColor" /> Preview Course
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
