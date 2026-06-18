import { motion } from "framer-motion";
import { CheckSquare, Target, Calendar, Zap, Plus, X } from "lucide-react";
import { slideInItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useState } from "react";

type TaskTab = "all" | "pending" | "completed";

export default function TasksPage() {
  const { tasks, toggleTask, showAddTask, setShowAddTask, newTask, setNewTask, handleAddTask, userProfile } = usePlayground();
  const [tab, setTab] = useState<TaskTab>("all");

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const displayTasks = tab === "pending" ? pending : tab === "completed" ? completed : tasks;

  const completionRate = tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0;

  return (
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Themed Header */}
        <div className="p-8 rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background-secondary)] relative overflow-hidden"
             style={{
               background: "radial-gradient(circle at 12% 18%, rgba(232,133,106,0.14), transparent 24%), radial-gradient(circle at 86% 12%, rgba(99,102,241,0.10), transparent 22%)"
             }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                Get things done
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-['OV_Soge'] text-[var(--color-text-primary)]">
                My Tasks
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Stay on top of your learning goals and deadlines.
              </p>
            </div>
            <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all shrink-0"
            >
              <Plus size={18} /> Add Task
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { id: "all" as TaskTab, label: "All", count: tasks.length },
            { id: "pending" as TaskTab, label: "Pending", count: pending.length },
            { id: "completed" as TaskTab, label: "Completed", count: completed.length },
          ].map((t) => (
              <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      tab === t.id
                          ? "bg-[var(--color-accent)] text-white shadow-md"
                          : "bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30"
                  }`}
              >
                <span>{t.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    tab === t.id ? "bg-white/20" : "bg-[var(--color-background-tertiary)]"
                }`}>{t.count}</span>
              </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] p-6">
              {displayTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center mb-4">
                      <CheckSquare size={32} className="text-[var(--color-text-tertiary)]" />
                    </div>
                    <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1">No tasks here</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                      {tab === "pending" ? "All tasks are complete!" : tab === "completed" ? "No completed tasks yet" : "Add a task to get started."}
                    </p>
                    {tab !== "pending" && (
                        <button
                            onClick={() => setShowAddTask(true)}
                            className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 transition-all"
                        >
                          <Plus size={16} /> Add Task
                        </button>
                    )}
                  </div>
              ) : (
                  <motion.div className="flex flex-col gap-3">
                    {displayTasks.map((task) => (
                        <motion.div
                            key={task.id}
                            variants={slideInItem}
                            initial="hidden"
                            animate="show"
                            layout
                            onClick={() => toggleTask(task.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
                                task.completed
                                    ? "border-[var(--color-border-light)] opacity-50 bg-[var(--color-background-primary)]"
                                    : "border-[var(--color-border-light)] bg-[var(--color-background-primary)] hover:border-[var(--color-accent)]/30"
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                    task.completed
                                        ? "bg-[var(--color-success)] text-white"
                                        : "border-2 border-[var(--color-border-medium)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
                                }`}
                            >
                              {task.completed && <CheckSquare size={14} />}
                            </div>

                            <div className="flex flex-col">
                              <p className={`text-sm font-bold transition-colors ${task.completed ? "text-[var(--color-text-tertiary)] line-through" : "text-[var(--color-text-primary)]"}`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[11px] text-[var(--color-text-tertiary)] flex items-center gap-1 font-medium">
                                  <Calendar size={11} /> {task.date}
                                </span>
                                <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                        task.priority === "high"
                                            ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                                            : task.priority === "medium"
                                                ? "text-[var(--color-warning)] bg-[var(--color-warning)]/10"
                                                : "text-[var(--color-text-tertiary)] bg-[var(--color-background-tertiary)]"
                                    }`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] border-2 border-[var(--color-background-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] shrink-0">
                            {userProfile.firstName.charAt(0).toUpperCase()}
                          </div>
                        </motion.div>
                    ))}
                  </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Productivity Ring */}
            <div className="bg-[var(--color-background-secondary)] rounded-3xl border border-[var(--color-border-light)] p-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-success)] opacity-10 rounded-full blur-2xl"></div>
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-6 w-full text-left">
                Productivity
              </h4>

              <div className="relative w-28 h-28 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-light)" strokeWidth="8" />
                  <circle
                      cx="50" cy="50" r="45" fill="none" stroke="var(--color-success)" strokeWidth="8"
                      strokeDasharray={`${(completed.length / Math.max(tasks.length, 1)) * 283} 283`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--color-text-primary)]">{completionRate}%</span>
                  <span className="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-widest">Done</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-[var(--color-background-primary)] p-3 rounded-2xl border border-[var(--color-border-light)]">
                  <p className="text-2xl font-bold text-[var(--color-success)]">{completed.length}</p>
                  <p className="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase">Completed</p>
                </div>
                <div className="bg-[var(--color-background-primary)] p-3 rounded-2xl border border-[var(--color-border-light)]">
                  <p className="text-2xl font-bold text-[var(--color-warning)]">{pending.length}</p>
                  <p className="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase">Pending</p>
                </div>
              </div>
            </div>

            {/* Focus Mode Card */}
            <div className="bg-gradient-to-br from-[var(--color-accent)] to-[#d66f55] text-white rounded-3xl p-6 relative overflow-hidden group cursor-pointer border-none">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <p className="font-bold text-lg mb-1">Focus Mode</p>
                <p className="text-sm text-white/80 mb-4">Block distractions and stay in the zone</p>
                <div className="flex items-center gap-2 text-white/90 text-xs font-bold">
                  <Zap size={14} /> 25 min session
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-[var(--color-background-secondary)] p-6 rounded-2xl w-[360px] shadow-xl border border-[var(--color-border-light)]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
                    Add New Task
                  </h3>
                  <button onClick={() => setShowAddTask(false)} className="p-1 rounded-lg hover:bg-[var(--color-background-tertiary)] transition-colors">
                    <X size={18} className="text-[var(--color-text-tertiary)]" />
                  </button>
                </div>

                <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-3 rounded-xl mb-3 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] text-sm"
                />

                <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-3 rounded-xl mb-3 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] text-sm"
                />

                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-3 rounded-xl mb-5 outline-none focus:border-[var(--color-accent)] text-[var(--color-text-primary)] text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <div className="flex gap-3 justify-end">
                  <button
                      onClick={() => setShowAddTask(false)}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-sm font-bold hover:bg-[var(--color-border-medium)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={handleAddTask}
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-bold hover:brightness-110 transition-all"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
