import React, { useState } from "react";
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
} from "lucide-react";

export default function CourseUploadView({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("0");

  // Category Management State
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

  // Curriculum Modules State
  const [modules, setModules] = useState([
    { id: Date.now(), title: "", lessons: [""] },
  ]);

  // Handlers for Curriculum
  const handleAddModule = () => {
    setModules([...modules, { id: Date.now(), title: "", lessons: [""] }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const handleAddLesson = (moduleId: number) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons: [...m.lessons, ""] };
        }
        return m;
      }),
    );
  };

  const handleLessonChange = (
    moduleId: number,
    lessonIndex: number,
    value: string,
  ) => {
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
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, title: value } : m)),
    );
  };

  // Handlers for Category Management
  const handleSaveCategory = () => {
    if (!categoryInputValue.trim()) return;

    if (isAddingCategory) {
      const newId = categoryInputValue.toLowerCase().replace(/[^a-z0-9]/g, "-");
      setCategories([...categories, { id: newId, name: categoryInputValue }]);
      setSelectedCategory(newId);
      setIsAddingCategory(false);
    } else if (isEditingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory ? { ...c, name: categoryInputValue } : c,
        ),
      );
      setIsEditingCategory(false);
    }
    setCategoryInputValue("");
  };

  const cancelCategoryAction = () => {
    setIsAddingCategory(false);
    setIsEditingCategory(false);
    setCategoryInputValue("");
  };

  const startAddingCategory = () => {
    setCategoryInputValue("");
    setIsEditingCategory(false);
    setIsAddingCategory(true);
  };

  const startEditingCategory = () => {
    const cat = categories.find((c) => c.id === selectedCategory);
    if (cat) {
      setCategoryInputValue(cat.name);
      setIsAddingCategory(false);
      setIsEditingCategory(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate upload
    const newCourse = {
      id: Date.now(),
      title,
      subtitle,
      category:
        categories.find((c) => c.id === selectedCategory)?.name ||
        selectedCategory,
      price,
      modules,
      status: "Published",
      date: new Date().toISOString().split("T")[0],
    };

    const existingCourses = JSON.parse(
      localStorage.getItem("admin_courses") || "[]",
    );
    localStorage.setItem(
      "admin_courses",
      JSON.stringify([...existingCourses, newCourse]),
    );

    alert("Course Successfully Published!");
    onUploadSuccess();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            Create New Course
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Fill in the details to publish a new course to the ecosystem.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="clay-button bg-[var(--color-background-tertiary)] text-[var(--color-text-primary)] px-6 py-2 rounded-xl border border-[var(--color-border-medium)] flex items-center gap-2">
            <Save size={18} />
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="clay-button bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Publish Course
          </button>
        </div>
      </div>

      {/* BASIC INFO CARD */}
      <div className="clay-card p-8 bg-[var(--color-background-secondary)]">
        <h3 className="text-xl font-bold mb-6 border-b border-[var(--color-border-light)] pb-4">
          1. Basic Information
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
              placeholder="e.g. Advanced System Design"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Subtitle / Short Description
            </label>
            <textarea
              className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] min-h-[100px]"
              placeholder="A brief overview of what students will learn..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CATEGORY MANAGEMENT SECTION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              {isAddingCategory || isEditingCategory ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className="clay-input flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-primary)] text-[var(--color-text-primary)] outline-none"
                    placeholder={
                      isAddingCategory ? "New Category Name" : "Rename Category"
                    }
                    value={categoryInputValue}
                    onChange={(e) => setCategoryInputValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveCategory}
                    className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                    title="Save Category"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={cancelCategoryAction}
                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <select
                    className="clay-input flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={startEditingCategory}
                    className="p-3 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-medium)] hover:text-blue-500 transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={startAddingCategory}
                    className="p-3 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-medium)] hover:text-emerald-500 transition-colors"
                    title="Add New Category"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                className="clay-input w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                placeholder="0 for free"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MEDIA UPLOAD CARD */}
      <div className="clay-card p-8 bg-[var(--color-background-secondary)]">
        <h3 className="text-xl font-bold mb-6 border-b border-[var(--color-border-light)] pb-4">
          2. Course Media
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thumbnail Slot */}
          <div className="border-2 border-dashed border-[var(--color-border-medium)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-primary)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)] group-hover:scale-110 transition-transform">
              <ImageIcon
                size={24}
                className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]"
              />
            </div>
            <h4 className="font-semibold text-base mb-1">Course Thumbnail</h4>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
              Square JPG/PNG (1:1)
              <br />
              Max 2MB
            </p>
            <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-full text-xs font-semibold group-hover:border-[var(--color-primary)] transition-colors">
              Browse Files
            </button>
          </div>

          {/* Banner Slot */}
          <div className="border-2 border-dashed border-[var(--color-border-medium)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-primary)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)] group-hover:scale-110 transition-transform">
              <FileImage
                size={24}
                className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]"
              />
            </div>
            <h4 className="font-semibold text-base mb-1">Course Banner</h4>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
              Wide JPG/PNG (16:9)
              <br />
              Max 5MB
            </p>
            <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-full text-xs font-semibold group-hover:border-[var(--color-primary)] transition-colors">
              Browse Files
            </button>
          </div>

          {/* Video Slot */}
          <div className="border-2 border-dashed border-[var(--color-border-medium)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-primary)] transition-all group lg:col-span-1 md:col-span-2">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)] group-hover:scale-110 transition-transform">
              <Video
                size={24}
                className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)]"
              />
            </div>
            <h4 className="font-semibold text-base mb-1">Preview Video</h4>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-4">
              Promo MP4 Video
              <br />
              Max 100MB
            </p>
            <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-full text-xs font-semibold group-hover:border-[var(--color-primary)] transition-colors">
              Browse Files
            </button>
          </div>
        </div>
      </div>

      {/* CURRICULUM BUILDER */}
      <div className="clay-card p-8 bg-[var(--color-background-secondary)]">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border-light)] pb-4">
          <h3 className="text-xl font-bold">3. Curriculum Builder</h3>
          <button
            onClick={handleAddModule}
            className="text-sm font-semibold text-[var(--color-primary)] flex items-center gap-1 hover:underline"
          >
            <Plus size={16} /> Add Module
          </button>
        </div>

        <div className="space-y-6">
          {modules.map((mod, index) => (
            <div
              key={mod.id}
              className="p-6 rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-medium)]"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 w-full">
                  <span className="font-bold text-[var(--color-text-secondary)]">
                    Module {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="Module Title (e.g. Introduction to Variables)"
                    className="flex-1 bg-transparent border-b border-[var(--color-border-light)] outline-none focus:border-[var(--color-primary)] p-2 font-semibold"
                    value={mod.title}
                    onChange={(e) =>
                      handleModuleTitleChange(mod.id, e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => handleRemoveModule(mod.id)}
                  className="text-red-500 p-2 hover:bg-red-500/10 rounded-full ml-4"
                  title="Delete Module"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="pl-6 space-y-3">
                {mod.lessons.map((lesson, lIndex) => (
                  <div key={lIndex} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] border border-[var(--color-border-light)]">
                      {lIndex + 1}
                    </div>
                    <input
                      type="text"
                      placeholder="Lesson Name"
                      className="flex-1 bg-transparent border border-[var(--color-border-light)] rounded-lg outline-none focus:border-[var(--color-primary)] p-2 text-sm"
                      value={lesson}
                      onChange={(e) =>
                        handleLessonChange(mod.id, lIndex, e.target.value)
                      }
                    />
                  </div>
                ))}

                <button
                  onClick={() => handleAddLesson(mod.id)}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] flex items-center gap-1 mt-3 ml-9"
                >
                  <Plus size={14} /> Add Lesson
                </button>
              </div>
            </div>
          ))}

          {modules.length === 0 && (
            <div className="text-center py-8 text-[var(--color-text-tertiary)]">
              No modules added yet. Click "Add Module" to start building.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
