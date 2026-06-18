import { Plus, Edit2, Check, X } from "lucide-react";
import { useState } from "react";

interface Step1Props {
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  categories: { id: string; name: string }[];
  setCategories: (c: { id: string; name: string }[]) => void;
}

export default function Step1BasicInfo({
  title, setTitle, subtitle, setSubtitle, price, setPrice,
  selectedCategory, setSelectedCategory, categories, setCategories,
}: Step1Props) {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryInputValue, setCategoryInputValue] = useState("");

  const handleSaveCategory = () => {
    if (!categoryInputValue.trim()) return;
    if (isAddingCategory) {
      const newId = categoryInputValue.toLowerCase().replace(/[^a-z0-9]/g, "-");
      setCategories([...categories, { id: newId, name: categoryInputValue }]);
      setSelectedCategory(newId);
    } else if (isEditingCategory) {
      setCategories(categories.map((c) => (c.id === selectedCategory ? { ...c, name: categoryInputValue } : c)));
    }
    setIsAddingCategory(false);
    setIsEditingCategory(false);
    setCategoryInputValue("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)]">Course Title</label>
          <span className={`text-[10px] font-medium transition-colors ${title.length >= 80 ? "text-amber-500" : "text-[var(--color-text-tertiary)]"}`}>
            {title.length}/80 characters
          </span>
        </div>
        <input
          type="text"
          maxLength={80}
          className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)]"
          placeholder="e.g. Advanced System Design"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-[var(--color-text-primary)]">Subtitle / Short Description</label>
          <span className={`text-[10px] font-medium transition-colors ${subtitle.length >= 200 ? "text-amber-500" : "text-[var(--color-text-tertiary)]"}`}>
            {subtitle.length}/200 characters
          </span>
        </div>
        <textarea
          maxLength={200}
          className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] min-h-[100px]"
          placeholder="A brief overview of what students will learn..."
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">Category</label>
          {isAddingCategory || isEditingCategory ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                className="flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-accent)] text-[var(--color-text-primary)] outline-none w-full"
                placeholder={isAddingCategory ? "New Category Name" : "Rename Category"}
                value={categoryInputValue}
                onChange={(e) => setCategoryInputValue(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 shrink-0 justify-end">
                <button onClick={handleSaveCategory} className="flex-1 sm:flex-initial justify-center p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer" title="Save Category">
                  <Check size={18} className="mx-auto" />
                </button>
                <button onClick={() => { setIsAddingCategory(false); setIsEditingCategory(false); setCategoryInputValue(""); }} className="flex-1 sm:flex-initial justify-center p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors cursor-pointer" title="Cancel">
                  <X size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Category Pills wrapper */}
              <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto p-2 border border-[var(--color-border-light)]/40 rounded-xl bg-[var(--color-background-primary)]/30 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm"
                        : "bg-[var(--color-background-secondary)] border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-medium)]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 justify-start">
                <button
                  type="button"
                  onClick={() => { setCategoryInputValue(categories.find(c => c.id === selectedCategory)?.name || ""); setIsAddingCategory(false); setIsEditingCategory(true); }}
                  className="px-3 py-1.5 bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]/30 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 size={12} /> Edit Category
                </button>
                <button
                  type="button"
                  onClick={() => { setCategoryInputValue(""); setIsEditingCategory(false); setIsAddingCategory(true); }}
                  className="px-3 py-1.5 bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                >
                  <Plus size={12} /> Add Category
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-[var(--color-text-primary)]">Price (INR)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] font-bold text-sm select-none">
              ₹
            </span>
            <input
              type="number"
              min="0"
              max="1000000"
              className="w-full pl-8 pr-3 py-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)]"
              placeholder="0 for free"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setPrice("");
                  return;
                }
                const num = parseFloat(val);
                if (isNaN(num)) return;
                if (num < 0) {
                  setPrice("0");
                } else if (num > 1000000) {
                  setPrice("1000000");
                } else {
                  setPrice(val);
                }
              }}
            />
          </div>
          <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1.5">
            Leave 0 to make this course free for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
