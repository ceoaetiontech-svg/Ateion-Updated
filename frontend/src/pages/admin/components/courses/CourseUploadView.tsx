import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Save, ArrowLeft, Check, Layers } from "lucide-react";
import { Link } from "react-router";
import { containerVariants, itemVariants } from "../../utils/variants";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Media from "./steps/Step2Media";
import Step3Curriculum from "./steps/Step3Curriculum";
import { useCourses } from "../../context/CourseContext";
import { useToast } from "../../utils/toast";
import type { ICourseModule } from "../../types/types";

const sections = [
  { num: 1, label: "Basic Information" },
  { num: 2, label: "Course Media" },
  { num: 3, label: "Curriculum Builder" },
];

export default function CourseUploadView({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("0");
  const [categories, setCategories] = useState([
    { id: "technology", name: "Technology & Engineering" },
    { id: "business", name: "Business & Management" },
    { id: "design", name: "Design & Arts" },
    { id: "science", name: "Applied Sciences" },
    { id: "university", name: "University Students" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [modules, setModules] = useState<ICourseModule[]>([
    { id: `m${Date.now()}`, title: "", lessons: [""] },
  ]);

  const { addCourse } = useCourses();
  const { showToast } = useToast();

  const hasTitle = title.trim().length > 0;
  const hasModules = modules.some((m) => m.title.trim());

  const handleSaveDraft = () => {
    addCourse({
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      instructor: "Admin",
      price: parseFloat(price) || 0,
      status: "Draft",
      modules,
      thumbnailUrl: undefined,
    });
    showToast("Course saved as draft!", "success");
    onUploadSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse({
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      instructor: "Admin",
      price: parseFloat(price) || 0,
      status: "Published",
      modules,
      thumbnailUrl: undefined,
    });
    showToast("Course Successfully Published!", "success");
    onUploadSuccess();
  };

  return (
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <Link
          to="/admin/courses"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
          style={{ transformOrigin: "left" }}
        />
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">Create New Course</h2>
            <p className="text-[var(--color-text-secondary)]">Fill in the details to publish a new course to the ecosystem.</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              onClick={handleSaveDraft}
              className="px-5 py-2.5 rounded-xl border border-[var(--color-border-medium)] text-[var(--color-text-primary)] bg-[var(--color-background-tertiary)] font-medium flex items-center gap-2 hover:bg-[var(--color-background-primary)] transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              Save Draft
            </motion.button>
            <motion.button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckCircle size={18} />
              Publish Course
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex items-center gap-4 my-8" variants={itemVariants}>
        {sections.map((s, i) => (
          <div key={s.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  (s.num === 1 && hasTitle) ||
                  (s.num === 3 && hasModules)
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)]"
                }`}
              >
                {s.num === 1 && hasTitle || s.num === 3 && hasModules ? (
                  <Check size={14} />
                ) : (
                  s.num
                )}
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-secondary)] hidden sm:inline">
                {s.label}
              </span>
            </div>
            {i < sections.length - 1 && (
              <div className="w-8 h-px bg-[var(--color-border-light)]" />
            )}
          </div>
        ))}
      </motion.div>

      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] mb-8 overflow-hidden" variants={itemVariants}>
        <div className="flex items-center gap-3 px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">1</div>
          <h3 className="text-xl font-bold">Basic Information</h3>
        </div>
        <Step1BasicInfo
          title={title} setTitle={setTitle}
          subtitle={subtitle} setSubtitle={setSubtitle}
          price={price} setPrice={setPrice}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          categories={categories} setCategories={setCategories}
        />
      </motion.div>

      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] mb-8 overflow-hidden" variants={itemVariants}>
        <div className="flex items-center gap-3 px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">2</div>
          <h3 className="text-xl font-bold">Course Media</h3>
        </div>
        <Step2Media />
      </motion.div>

      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden" variants={itemVariants}>
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">3</div>
            <h3 className="text-xl font-bold">Curriculum Builder</h3>
          </div>
        </div>
        <Step3Curriculum modules={modules} setModules={setModules} />
      </motion.div>
    </motion.div>
  );
}
