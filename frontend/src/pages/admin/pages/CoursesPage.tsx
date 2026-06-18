import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X } from "lucide-react";
import CourseListView from "../components/courses/CourseListView";
import CourseUploadView from "../components/courses/CourseUploadView";
import CoursePreviewDrawer from "../components/courses/CoursePreviewDrawer";
import { useCourses } from "../context/CourseContext";

export default function CoursesPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { courses } = useCourses();

  const previewCourse = previewId ? courses.find((c) => c.id === previewId) ?? null : null;

  return (
    <>
      <Helmet>
        <title>Ateion Admin — Courses</title>
        <meta name="description" content="Manage courses in the Ateion admin portal." />
      </Helmet>

      <CourseListView onCourseSelect={setPreviewId} />

      <CoursePreviewDrawer course={previewCourse} onClose={() => setPreviewId(null)} />

      <AnimatePresence>
        {showUpload && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-[500]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpload(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-[600px] z-[600] bg-[var(--color-background-primary)] border-l border-[var(--color-border-light)] shadow-[var(--shadow-xl)] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]">
                <h2 className="text-xl font-bold font-['OV_Soge']">Create New Course</h2>
                <button
                  onClick={() => setShowUpload(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-background-tertiary)]/50 transition-colors cursor-pointer text-[var(--color-text-secondary)]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <CourseUploadView onUploadSuccess={() => setShowUpload(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
