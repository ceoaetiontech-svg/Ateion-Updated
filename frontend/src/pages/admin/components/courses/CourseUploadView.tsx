import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Save, ArrowLeft, Check, Layers } from "lucide-react";
import { Link } from "react-router";
import { containerVariants, itemVariants } from "../../utils/variants";
import Step1BasicInfo from "./steps/Step1BasicInfo";
import Step2Media from "./steps/Step2Media";
import Step3Curriculum, { IBuilderModule } from "./steps/Step3Curriculum";
import { useCourses } from "../../context/CourseContext";
import { useToast } from "../../utils/toast";


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
  
  // Media Files States
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, [thumbnailPreview, bannerPreview]);

  const [categories, setCategories] = useState([
    { id: "technology", name: "Technology & Engineering" },
    { id: "business", name: "Business & Management" },
    { id: "design", name: "Design & Arts" },
    { id: "science", name: "Applied Sciences" },
    { id: "university", name: "University Students" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [modules, setModules] = useState<IBuilderModule[]>([
    { id: `m${Date.now()}`, title: "", lessons: [{ id: `l${Date.now()}-0`, text: "" }] },
  ]);
  const [activeStep, setActiveStep] = useState(1);

  const { addCourse } = useCourses();
  const { showToast } = useToast();

  const isStepValid = (stepNum: number) => {
    if (stepNum === 1) return title.trim().length > 0;
    if (stepNum === 2) return true; // Media fields are optional
    if (stepNum === 3) return modules.length > 0 && modules.some((m) => m.title.trim().length > 0);
    return true;
  };

  const handleStepClick = (stepNum: number) => {
    if (stepNum < activeStep) {
      setActiveStep(stepNum);
      return;
    }
    // Check validation of preceding steps before going forward
    for (let s = activeStep; s < stepNum; s++) {
      if (!isStepValid(s)) {
        if (s === 1) showToast("Please enter a Course Title in Step 1.", "info");
        if (s === 3) showToast("Please add at least one module with a title in Step 3.", "info");
        return;
      }
    }
    setActiveStep(stepNum);
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      if (isStepValid(activeStep)) {
        setActiveStep(activeStep + 1);
      } else {
        if (activeStep === 1) showToast("Course Title is required to proceed.", "info");
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSaveDraft = () => {
    if (!isStepValid(1)) {
      showToast("Please enter a Course Title in Step 1 to save a draft.", "error");
      setActiveStep(1);
      return;
    }
    addCourse({
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      instructor: "Admin",
      price: parseFloat(price) || 0,
      status: "Draft",
      modules: modules.filter((m) => m.title.trim().length > 0).map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => l.text),
      })),
      thumbnailUrl: thumbnailPreview || undefined,
    });
    showToast("Course saved as draft!", "success");
    onUploadSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(1)) {
      showToast("Please enter a Course Title in Step 1.", "error");
      setActiveStep(1);
      return;
    }
    if (!isStepValid(3)) {
      showToast("Please create at least one module with a title in Step 3.", "error");
      setActiveStep(3);
      return;
    }
    addCourse({
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      instructor: "Admin",
      price: parseFloat(price) || 0,
      status: "Published",
      modules: modules.filter((m) => m.title.trim().length > 0).map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => l.text),
      })),
      thumbnailUrl: thumbnailPreview || undefined,
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[2px] rounded-full bg-[var(--color-accent)] mb-4"
          style={{ transformOrigin: "left" }}
        />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">Create New Course</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Fill in the details step-by-step to publish a new course.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <motion.button
              onClick={handleSaveDraft}
              className="px-5 py-2.5 rounded-xl border border-[var(--color-border-light)] text-[var(--color-text-secondary)] bg-[var(--color-background-secondary)] font-medium flex items-center justify-center gap-2 hover:bg-[var(--color-background-tertiary)]/30 hover:text-[var(--color-text-primary)] transition-all duration-200 cursor-pointer w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              Save Draft
            </motion.button>
            <motion.button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center justify-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckCircle size={18} />
              Publish Course
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modern Horizontal Stepper */}
      <motion.div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 my-6 sm:my-8 flex-wrap" variants={itemVariants}>
        {sections.map((s, i) => {
          const isActive = s.num === activeStep;
          const isCompleted = s.num < activeStep && isStepValid(s.num);
          return (
            <div key={s.num} className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => handleStepClick(s.num)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 border text-left cursor-pointer outline-none ${
                  isActive
                    ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold shadow-[0_0_12px_rgba(232,133,106,0.08)]"
                    : isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                    : "bg-[var(--color-background-secondary)] border-[var(--color-border-light)] text-[var(--color-text-secondary)] opacity-60 hover:opacity-100 hover:border-[var(--color-border-medium)]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--color-background-tertiary)]/50 text-[var(--color-text-tertiary)]"
                  }`}
                >
                  {isCompleted ? <Check size={12} /> : s.num}
                </div>
                <span className="text-xs sm:text-sm whitespace-nowrap">
                  {s.label}
                </span>
              </button>
              {i < sections.length - 1 && (
                <div className={`w-4 sm:w-6 h-px ${activeStep > s.num ? "bg-emerald-500/40" : "bg-[var(--color-border-light)]"}`} />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Step Render Area */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] shadow-sm overflow-hidden mb-6"
      >
        <div className="flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:pt-6 lg:pb-4 border-b border-[var(--color-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 text-white flex items-center justify-center text-sm font-bold shadow-sm">
            {activeStep}
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
            {sections.find((s) => s.num === activeStep)?.label}
          </h3>
        </div>

        {activeStep === 1 && (
          <Step1BasicInfo
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            price={price}
            setPrice={setPrice}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            setCategories={setCategories}
          />
        )}

        {activeStep === 2 && (
          <Step2Media
            thumbnailFile={thumbnailFile}
            setThumbnailFile={setThumbnailFile}
            thumbnailPreview={thumbnailPreview}
            setThumbnailPreview={setThumbnailPreview}
            bannerFile={bannerFile}
            setBannerFile={setBannerFile}
            bannerPreview={bannerPreview}
            setBannerPreview={setBannerPreview}
            videoFile={videoFile}
            setVideoFile={setVideoFile}
          />
        )}

        {activeStep === 3 && (
          <Step3Curriculum modules={modules} setModules={setModules} />
        )}

        {/* Wizard Navigation Footer */}
        <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8 bg-[var(--color-background-secondary)]/50 border-t border-[var(--color-border-light)] gap-4">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={activeStep === 1}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
              activeStep === 1
                ? "border-[var(--color-border-light)]/50 text-[var(--color-text-tertiary)]/50 cursor-not-allowed opacity-50"
                : "border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-tertiary)]/30 hover:text-[var(--color-text-primary)]"
            }`}
          >
            Previous
          </button>
          
          {activeStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={!isStepValid(activeStep)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                !isStepValid(activeStep)
                  ? "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-light)]/60 cursor-not-allowed opacity-60"
                  : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90 shadow-[var(--shadow-accent)]"
              }`}
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid(3)}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                !isStepValid(3)
                  ? "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-light)]/60 cursor-not-allowed opacity-60"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              }`}
            >
              Complete & Publish
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
