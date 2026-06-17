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
        <label className="block text-sm font-semibold mb-2">Course Title</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)]"
          placeholder="e.g. Advanced System Design"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Subtitle / Short Description</label>
        <textarea
          className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] min-h-[100px]"
          placeholder="A brief overview of what students will learn..."
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <select
                className="flex-1 p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)] cursor-pointer w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="flex gap-2 shrink-0 justify-end">
                <button onClick={() => { setCategoryInputValue(categories.find(c => c.id === selectedCategory)?.name || ""); setIsAddingCategory(false); setIsEditingCategory(true); }} className="flex-1 sm:flex-initial justify-center p-3 bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]/30 hover:text-blue-650 dark:hover:text-blue-400 transition-colors cursor-pointer" title="Edit Category">
                  <Edit2 size={18} className="mx-auto" />
                </button>
                <button onClick={() => { setCategoryInputValue(""); setIsEditingCategory(false); setIsAddingCategory(true); }} className="flex-1 sm:flex-initial justify-center p-3 bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] rounded-xl border border-[var(--color-border-light)] hover:bg-[var(--color-background-tertiary)]/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer" title="Add New Category">
                  <Plus size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Price (INR)</label>
          <input
            type="number"
            min="0"
            max="1000000"
            className="w-full p-3 rounded-xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] text-[var(--color-text-primary)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.12)]"
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
      </div>
    </div>
  );
}
