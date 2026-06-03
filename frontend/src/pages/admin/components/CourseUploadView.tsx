import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  Save,
  Edit2,
  Check,
  X,
  Video,
  FileImage,
  ArrowLeft,
  BookOpen,
  Layers,
} from "lucide-react";
import { Link } from "react-router";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

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
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [modules, setModules] = useState([
    { id: Date.now(), title: "", lessons: [""] },
  ]);

  const hasTitle = title.trim().length > 0;
  const hasSubtitle = subtitle.trim().length > 0;
  const hasModules = modules.some((m) => m.title.trim() || m.lessons.some((l) => l.trim()));

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: "", lessons: [""] }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const handleAddLesson = (moduleId: number) => {
    setModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: [...m.lessons, ""] } : m,
      ),
    );
  };

  const handleLessonChange = (moduleId: number, lessonIndex: number, value: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          const newLessons = [...m.lessons];
          newLessons[lessonIndex] = value;
          return { ...m, lessons: newLessons };
        }
        return m;
      }),
    );
  };

  const handleModuleTitleChange = (moduleId: number, value: string) => {
    setModules(modules.map((m) => (m.id === moduleId ? { ...m, title: value } : m)));
  };

  const handleSaveCategory = () => {
    if (!categoryInputValue.trim()) return;
    if (isAddingCategory) {
      const newId = categoryInputValue.toLowerCase().replace(/[^a-z0-9]/g, "-");
      setCategories([...categories, { id: newId, name: categoryInputValue }]);
      setSelectedCategory(newId);
      setIsAddingCategory(false);
    } else if (isEditingCategory) {
      setCategories(categories.map((c) => (c.id === selectedCategory ? { ...c, name: categoryInputValue } : c)));
      setIsEditingCategory(false);
    }
    setCategoryInputValue("");
  };

  const handleSaveDraft = () => {
    const draft = {
      id: Date.now(),
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      price,
      modules,
      status: "Draft",
      date: new Date().toISOString().split("T")[0],
    };
    const existing = JSON.parse(localStorage.getItem("admin_courses") || "[]");
    localStorage.setItem("admin_courses", JSON.stringify([...existing, draft]));
    alert("Course saved as draft!");
    onUploadSuccess();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      title,
      subtitle,
      category: categories.find((c) => c.id === selectedCategory)?.name || selectedCategory,
      price,
      modules,
      status: "Published",
      date: new Date().toISOString().split("T")[0],
    };
    const existingCourses = JSON.parse(localStorage.getItem("admin_courses") || "[]");
    localStorage.setItem("admin_courses", JSON.stringify([...existingCourses, newCourse]));
    alert("Course Successfully Published!");
    onUploadSuccess();
  };

  return (
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
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
              className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center gap-2 shadow-[0_4px_16px_rgba(232,133,106,0.25)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.4)] transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckCircle size={18} />
              Publish Course
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <motion.div className="flex items-center gap-4 my-8" variants={itemVariants}>
        {sections.map((s, i) => (
          <div key={s.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  (s.num === 1 && hasTitle) ||
                  (s.num === 2 && (hasTitle || hasSubtitle)) ||
                  (s.num === 3 && hasModules)
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-background-tertiary)] text-[var(--color-text-tertiary)]"
                }`}
              >
                <Check size={14} />
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

      {/* 1. BASIC INFO */}
      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] mb-8 overflow-hidden" variants={itemVariants}>
        <div className="flex items-center gap-3 px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">1</div>
          <h3 className="text-xl font-bold">Basic Information</h3>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Course Title</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
              placeholder="e.g. Advanced System Design"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Subtitle / Short Description</label>
            <textarea
              className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)] min-h-[100px]"
              placeholder="A brief overview of what students will learn..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              {isAddingCategory || isEditingCategory ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-accent)] text-[var(--color-text-primary)] outline-none"
                    placeholder={isAddingCategory ? "New Category Name" : "Rename Category"}
                    value={categoryInputValue}
                    onChange={(e) => setCategoryInputValue(e.target.value)}
                    autoFocus
                  />
                  <button onClick={handleSaveCategory} className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer" title="Save Category">
                    <Check size={18} />
                  </button>
                  <button onClick={() => { setIsAddingCategory(false); setIsEditingCategory(false); setCategoryInputValue(""); }} className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors cursor-pointer" title="Cancel">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <select
                    className="flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)] cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <button onClick={() => { setCategoryInputValue(categories.find(c => c.id === selectedCategory)?.name || ""); setIsAddingCategory(false); setIsEditingCategory(true); }} className="p-3 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-medium)] hover:text-blue-500 transition-colors cursor-pointer" title="Edit Category">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => { setCategoryInputValue(""); setIsEditingCategory(false); setIsAddingCategory(true); }} className="p-3 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-medium)] hover:text-emerald-500 transition-colors cursor-pointer" title="Add New Category">
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price (USD)</label>
              <input
                type="number"
                className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
                placeholder="0 for free"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. MEDIA */}
      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] mb-8 overflow-hidden" variants={itemVariants}>
        <div className="flex items-center gap-3 px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">2</div>
          <h3 className="text-xl font-bold">Course Media</h3>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { Icon: ImageIcon, title: "Course Thumbnail", desc: "Square JPG/PNG (1:1)\nMax 2MB" },
              { Icon: FileImage, title: "Course Banner", desc: "Wide JPG/PNG (16:9)\nMax 5MB" },
              { Icon: Video, title: "Preview Video", desc: "Promo MP4 Video\nMax 100MB" },
            ].map(({ Icon, title: t, desc }) => (
              <motion.div
                key={t}
                className="border-2 border-dashed border-[var(--color-border-medium)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-accent)] transition-all group"
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)] group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]" />
                </div>
                <h4 className="font-semibold text-base mb-1">{t}</h4>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-4 whitespace-pre-line">{desc}</p>
                <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-full text-xs font-semibold group-hover:border-[var(--color-accent)] transition-colors cursor-pointer">
                  Browse Files
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. CURRICULUM */}
      <motion.div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden" variants={itemVariants}>
        <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-[var(--color-border-light)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center text-sm font-bold">3</div>
            <h3 className="text-xl font-bold">Curriculum Builder</h3>
          </div>
          <motion.button
            onClick={handleAddModule}
            className="text-sm font-semibold text-[var(--color-accent)] flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} /> Add Module
          </motion.button>
        </div>
        <div className="p-8 space-y-6">
          {modules.length > 0 ? (
            modules.map((mod, index) => (
              <motion.div
                key={mod.id}
                className="rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between px-6 py-4 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-light)]">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                      <Layers size={14} />
                    </div>
                    <span className="font-bold text-sm text-[var(--color-text-secondary)]">
                      Module {index + 1}
                    </span>
                    <input
                      type="text"
                      placeholder="Module Title (e.g. Introduction to Variables)"
                      className="flex-1 bg-transparent border-b border-transparent hover:border-[var(--color-border-light)] focus:border-[var(--color-accent)] outline-none px-2 py-1 font-semibold transition-all duration-250"
                      value={mod.title}
                      onChange={(e) => handleModuleTitleChange(mod.id, e.target.value)}
                    />
                  </div>
                  <motion.button
                    onClick={() => handleRemoveModule(mod.id)}
                    className="text-red-400 hover:text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete Module"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
                <div className="px-6 py-5 space-y-3">
                  {mod.lessons.map((lesson, lIndex) => (
                    <div key={lIndex} className="flex items-center gap-3 group">
                      <div className="w-7 h-7 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] border border-[var(--color-border-light)] shrink-0">
                        {lIndex + 1}
                      </div>
                      <input
                        type="text"
                        placeholder="Lesson Name"
                        className="flex-1 bg-transparent border border-[var(--color-border-light)] rounded-lg px-3 py-2 text-sm outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_2px_rgba(232,133,106,0.1)]"
                        value={lesson}
                        onChange={(e) => handleLessonChange(mod.id, lIndex, e.target.value)}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddLesson(mod.id)}
                    className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] flex items-center gap-1.5 mt-4 ml-10 transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full border border-dashed border-current flex items-center justify-center">
                      <Plus size={12} />
                    </div>
                    Add Lesson
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-background-tertiary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]">
                <BookOpen size={28} className="text-[var(--color-text-tertiary)]" />
              </div>
              <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">No modules yet</p>
              <p className="text-sm text-[var(--color-text-tertiary)] mb-6">Start building your course by adding a module.</p>
              <motion.button
                onClick={handleAddModule}
                className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-[0_4px_16px_rgba(232,133,106,0.25)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.4)] transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Plus size={18} />
                Add Module
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
