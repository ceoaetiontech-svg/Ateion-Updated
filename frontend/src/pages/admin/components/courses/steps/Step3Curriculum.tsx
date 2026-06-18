import { useState } from "react";
import { Plus, Trash2, Layers, BookOpen, GripVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Reorder } from "framer-motion";

export interface IBuilderLesson {
  id: string;
  text: string;
}

export interface IBuilderModule {
  id: string;
  title: string;
  lessons: IBuilderLesson[];
}

interface Step3Props {
  modules: IBuilderModule[];
  setModules: (m: IBuilderModule[]) => void;
}

export default function Step3Curriculum({ modules, setModules }: Step3Props) {
  const handleAddModule = () => {
    const timestamp = Date.now();
    setModules([...modules, { id: `m${timestamp}`, title: "", lessons: [{ id: `l${timestamp}-0`, text: "" }] }]);
  };

  const handleRemoveModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const handleModuleTitleChange = (id: string, value: string) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, title: value } : m)));
  };

  const handleAddLesson = (moduleId: string) => {
    const timestamp = Date.now();
    setModules(
      modules.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: [...m.lessons, { id: `l${timestamp}-${m.lessons.length}-${Math.random()}`, text: "" }],
            }
          : m,
      ),
    );
  };

  const handleLessonChange = (moduleId: string, lessonIndex: number, value: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          const newLessons = m.lessons.map((l, idx) => (idx === lessonIndex ? { ...l, text: value } : l));
          return { ...m, lessons: newLessons };
        }
        return m;
      }),
    );
  };

  const handleRemoveLesson = (moduleId: string, lessonIndex: number) => {
    setModules(
      modules.map((m) => {
        if (m.id === moduleId) {
          const newLessons = m.lessons.filter((_, i) => i !== lessonIndex);
          return { ...m, lessons: newLessons };
        }
        return m;
      }),
    );
  };

  const handleReorderLessons = (moduleId: string, lessons: IBuilderLesson[]) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, lessons } : m)),
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {modules.length > 0 ? (
        <Reorder.Group
          axis="y"
          values={modules}
          onReorder={setModules}
          className="space-y-4"
        >
          {modules.map((mod, index) => (
            <ModuleItem
              key={mod.id}
              mod={mod}
              index={index}
              onTitleChange={handleModuleTitleChange}
              onRemove={handleRemoveModule}
              onAddLesson={handleAddLesson}
              onLessonChange={handleLessonChange}
              onRemoveLesson={handleRemoveLesson}
              onReorderLessons={handleReorderLessons}
            />
          ))}
        </Reorder.Group>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center mb-4 border border-[var(--color-accent)]/20 text-[var(--color-accent)]">
            <BookOpen size={28} className="opacity-90" />
          </div>
          <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">No modules yet</p>
          <p className="text-sm text-[var(--color-text-tertiary)] mb-6">Start building your course by adding a module.</p>
          <motion.button
            onClick={handleAddModule}
            className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={18} />
            Add Module
          </motion.button>
        </div>
      )}
      {modules.length > 0 && (
        <div className="flex justify-center pt-2">
          <motion.button
            onClick={handleAddModule}
            className="text-sm font-semibold text-[var(--color-accent)] flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[var(--color-accent)]/30 hover:bg-[var(--color-accent)]/5 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} /> Add Module
          </motion.button>
        </div>
      )}
    </div>
  );
}

function ModuleItem({
  mod,
  index,
  onTitleChange,
  onRemove,
  onAddLesson,
  onLessonChange,
  onRemoveLesson,
  onReorderLessons,
}: {
  mod: IBuilderModule;
  index: number;
  onTitleChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onAddLesson: (moduleId: string) => void;
  onLessonChange: (moduleId: string, lessonIndex: number, value: string) => void;
  onRemoveLesson: (moduleId: string, lessonIndex: number) => void;
  onReorderLessons: (moduleId: string, lessons: IBuilderLesson[]) => void;
}) {
  return (
    <Reorder.Item
      value={mod}
      id={mod.id}
      className="rounded-2xl bg-[var(--color-background-primary)] border border-[var(--color-border-light)] overflow-hidden shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 sm:px-6 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-light)] gap-3">
        <div className="flex items-center gap-3 flex-1 w-full">
          <div className="cursor-grab active:cursor-grabbing touch-none text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors shrink-0">
            <GripVertical size={16} />
          </div>
          <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] shrink-0">
            <Layers size={14} />
          </div>
          <span className="font-bold text-sm text-[var(--color-text-secondary)] shrink-0">
            Module {index + 1}
          </span>
          <input
            type="text"
            placeholder="Module Title (e.g. Introduction to Variables)"
            className="flex-1 bg-transparent border-b border-transparent hover:border-[var(--color-border-light)] focus:border-[var(--color-accent)] outline-none px-2 py-1 font-semibold transition-all duration-250 w-full"
            value={mod.title}
            onChange={(e) => onTitleChange(mod.id, e.target.value)}
          />
        </div>
        <motion.button
          onClick={() => onRemove(mod.id)}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer self-end sm:self-auto shrink-0"
          title="Delete Module"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        {mod.lessons.length > 0 ? (
          <Reorder.Group
            axis="y"
            values={mod.lessons}
            onReorder={(lessons) => onReorderLessons(mod.id, lessons)}
            className="space-y-2"
          >
            {mod.lessons.map((lesson, lIndex) => (
              <Reorder.Item
                key={lesson.id}
                value={lesson}
                id={lesson.id}
                className="flex items-center gap-3 group"
              >
                <div className="cursor-grab active:cursor-grabbing touch-none text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors">
                  <GripVertical size={12} />
                </div>
                <div className="w-7 h-7 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] border border-[var(--color-border-light)] shrink-0">
                  {lIndex + 1}
                </div>
                <input
                  type="text"
                  placeholder="Lesson Name"
                  className="flex-1 bg-[var(--color-background-secondary)]/40 border border-[var(--color-border-light)] hover:border-[var(--color-border-medium)] rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:hover:border-[var(--color-accent)] focus:shadow-[0_0_0_2px_rgba(232,133,106,0.1)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]/60"
                  value={lesson.text}
                  onChange={(e) => onLessonChange(mod.id, lIndex, e.target.value)}
                />
                <button
                  onClick={() => onRemoveLesson(mod.id, lIndex)}
                  className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 p-1 rounded-lg text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
                  title="Remove Lesson"
                >
                  <Trash2 size={12} />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : null}
        <button
          onClick={() => onAddLesson(mod.id)}
          className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] flex items-center gap-1.5 mt-4 ml-10 sm:ml-[52px] transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full border border-dashed border-current flex items-center justify-center">
            <Plus size={12} />
          </div>
          Add Lesson
        </button>
      </div>
    </Reorder.Item>
  );
}
