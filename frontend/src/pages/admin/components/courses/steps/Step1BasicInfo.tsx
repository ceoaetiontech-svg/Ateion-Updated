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
  );
}
