// import * as Popover from "@radix-ui/react-popover";
// import { Star, Clock, BarChart2, PlayCircle, ChevronRight, Users } from "lucide-react";
// import { getTopicColor } from "../shared/topicColors";
// import type { Course } from "../shared/types";
// import { useState, useRef } from "react";

// export default function CoursePreviewPopover({
//   course,
//   children,
//   onEnroll,
// }: {
//   course: Course;
//   children: React.ReactNode;
//   onEnroll?: () => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

//   const handleOpen = () => {
//     clearTimeout(timeoutRef.current);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     timeoutRef.current = setTimeout(() => setOpen(false), 100);
//   };

//   return (
//     <Popover.Root open={open} onOpenChange={setOpen}>
//       <div
//         onMouseEnter={handleOpen}
//         onMouseLeave={handleClose}
//       >
//         {children}
//       </div>
//       <Popover.Portal>
//         <Popover.Content
//           side="right"
//           sideOffset={12}
//           align="start"
//           onMouseEnter={handleOpen}
//           onMouseLeave={handleClose}
//           className="w-80 p-0 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] z-50 overflow-hidden"
//         >
//           <div
//             className="h-2"
//             style={{ backgroundColor: getTopicColor(course.topics) }}
//           />
//           <div className="p-5">
//             <div className="flex items-start justify-between gap-3 mb-3">
//               <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight">
//                 {course.title}
//               </h4>
//               <div className="flex items-center gap-1 text-[var(--color-warning)] shrink-0">
//                 <Star size={12} fill="var(--color-warning)" />
//                 <span className="text-xs font-bold">{course.rating}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 mb-3">
//               <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover" />
//               <span className="text-[12px] text-[var(--color-text-secondary)] font-medium">{course.instructor}</span>
//             </div>

//             <div className="flex items-center gap-3 mb-4 text-[11px] text-[var(--color-text-tertiary)]">
//               <span className="flex items-center gap-1"><BarChart2 size={11} /> {course.level}</span>
//               <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
//               <span className="flex items-center gap-1"><PlayCircle size={11} /> {course.lessons} lessons</span>
//             </div>

//             {course.topics.length > 0 && (
//               <div className="flex flex-wrap gap-1.5 mb-4">
//                 {course.topics.slice(0, 4).map((topic) => (
//                   <span
//                     key={topic}
//                     className="px-2 py-0.5 rounded-md text-[10px] font-bold"
//                     style={{ backgroundColor: getTopicColor(course.topics) + "20", color: getTopicColor(course.topics) }}
//                   >
//                     {topic}
//                   </span>
//                 ))}
//               </div>
//             )}

//             <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
//               Master {course.topics.slice(0, 2).join(" and ")} with hands-on projects and real-world applications in this {course.level.toLowerCase()} course.
//             </p>

//             <div className="mb-4">
//               <p className="text-[11px] font-bold text-[var(--color-text-primary)] mb-2">What you'll learn:</p>
//               <ul className="space-y-1.5">
//                 {[
//                   `Build real-world ${course.topics[0] || "projects"} from scratch`,
//                   `Master ${course.level.toLowerCase()} concepts and best practices`,
//                   `Work with hands-on exercises and quizzes`,
//                 ].map((item) => (
//                   <li key={item} className="flex items-start gap-2 text-[11px] text-[var(--color-text-secondary)]">
//                     <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
//               <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
//                 <Users size={12} />
//                 <span>{course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students}</span>
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onEnroll?.();
//                 }}
//                 className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-bold hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-1.5"
//               >
//                 {course.isFree ? "Enroll free" : "Enroll now"} <ChevronRight size={12} />
//               </button>
//             </div>
//           </div>
//           <Popover.Arrow className="fill-[var(--color-background-primary)]" />
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// }


import * as Popover from "@radix-ui/react-popover";
import { Star, Clock, BarChart2, PlayCircle, ChevronRight, Users } from "lucide-react";
import { getTopicColor } from "../shared/topicColors";
import type { Course } from "../shared/types";
import { useState, useRef } from "react";

export default function CoursePreviewPopover({
  course,
  children,
  onEnroll,
}: {
  course: Course;
  children: React.ReactNode;
  onEnroll?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleOpen = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        {children}
      </div>
      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={12}
          align="start"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className="w-80 p-0 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] z-50 overflow-hidden"
        >
          <div
            className="h-2"
            style={{ backgroundColor: getTopicColor(course.topics) }}
          />
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] leading-tight">
                {course.title}
              </h4>
              <div className="flex items-center gap-1 text-[var(--color-warning)] shrink-0">
                <Star size={12} fill="var(--color-warning)" />
                <span className="text-xs font-bold">{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <img src={course.instructorAvatar} className="w-5 h-5 rounded-full object-cover" />
              <span className="text-[12px] text-[var(--color-text-secondary)] font-medium">{course.instructor}</span>
            </div>

            <div className="flex items-center gap-3 mb-4 text-[11px] text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-1"><BarChart2 size={11} /> {course.level}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
              <span className="flex items-center gap-1"><PlayCircle size={11} /> {course.lessons} lessons</span>
            </div>

            {course.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {course.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                    style={{ backgroundColor: getTopicColor(course.topics) + "20", color: getTopicColor(course.topics) }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
              Master {course.topics.slice(0, 2).join(" and ")} with hands-on projects and real-world applications in this {course.level.toLowerCase()} course.
            </p>

            <div className="mb-4">
              <p className="text-[11px] font-bold text-[var(--color-text-primary)] mb-2">What you'll learn:</p>
              <ul className="space-y-1.5">
                {[
                  `Build real-world ${course.topics[0] || "projects"} from scratch`,
                  `Master ${course.level.toLowerCase()} concepts and best practices`,
                  `Work with hands-on exercises and quizzes`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-light)]">
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)]">
                <Users size={12} />
                <span>{course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnroll?.();
                }}
                className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-bold hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-1.5"
              >
                {course.isFree ? "Enroll free" : "Enroll now"} <ChevronRight size={12} />
              </button>
            </div>
          </div>
          <Popover.Arrow className="fill-[var(--color-background-primary)]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}