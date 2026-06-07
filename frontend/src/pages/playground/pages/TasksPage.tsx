import { motion } from "framer-motion";
import { CheckSquare, Target, Calendar, Zap } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";

export default function TasksPage() {
  const { tasks, toggleTask, showAddTask, setShowAddTask, newTask, setNewTask, handleAddTask, userProfile } = usePlayground();

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <CheckSquare size={28} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Tasks</span>
        </h3>

        <button
          onClick={() => setShowAddTask(true)}
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
        >
          <Target size={16} /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="clay-card flex flex-col h-full bg-[var(--color-background-primary)]">
            <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border-light)] pb-4">
              <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <CheckSquare className="text-[var(--color-accent)]" size={20} />
                Active Tasks
              </h4>
              <span className="text-xs font-bold bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full">
                {tasks.filter((t: any) => !t.completed).length} Pending
              </span>
            </div>

            <motion.div 
              className="flex flex-col gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {tasks.map((task: any) => (
                <motion.div
                  variants={fadeUpItem}
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group hover:-translate-y-[2px] hover:shadow-md ${
                    task.completed
                      ? "border-[var(--color-border-light)] opacity-50 bg-[var(--color-background-secondary)] grayscale"
                      : task.priority === "medium"
                        ? "border-[var(--color-warning)]/30 bg-[var(--color-warning_light)] hover:border-[var(--color-warning)]/50"
                        : "border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 bg-[var(--color-background-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? "bg-[var(--color-success)] text-white scale-110"
                          : task.priority === "medium"
                            ? "border-2 border-[var(--color-warning)] group-hover:bg-[var(--color-warning)] group-hover:text-white"
                            : "border-2 border-[var(--color-border-medium)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white text-transparent"
                      }`}
                    >
                      {task.completed && task.priority === "high" && (
                        <>
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] -top-3 left-1/2 animate-[ping_0.6s_ease-out_forwards]"></div>
                          <div className="absolute w-1 h-1 rounded-full bg-[var(--color-warning)] top-0 -right-2 animate-[ping_0.5s_ease-out_forwards]"></div>
                          <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--color-info)] top-1/2 -left-3 animate-[ping_0.7s_ease-out_forwards]"></div>
                          <div className="absolute w-1 h-1 rounded-full bg-[#8b5cf6] -bottom-2 right-0 animate-[ping_0.6s_ease-out_forwards]"></div>
                        </>
                      )}
                      <CheckSquare size={14} className={task.completed ? "block animate-in zoom-in duration-300" : "hidden group-hover:block opacity-50"} />
                    </div>

                    <div className="flex flex-col relative transition-all duration-500">
                      <p className={`text-[15px] font-bold mb-1 relative inline-block w-fit transition-colors duration-300 ${task.completed ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-primary)]"}`}>
                        {task.title}
                        <span className={`absolute top-1/2 left-0 h-[2px] bg-[var(--color-text-tertiary)] transition-all duration-300 ease-out origin-left ${task.completed ? "w-full" : "w-0"}`}></span>
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--color-text-tertiary)] flex items-center gap-1 font-medium">
                          <Calendar size={12} /> {task.date}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            task.priority === "high"
                              ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                              : "text-[var(--color-warning)] bg-[var(--color-warning)]/10"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex -space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] border-2 border-[var(--color-background-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)]">
                      {userProfile.firstName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-6">
          <motion.div variants={fadeUpItem} className="clay-card flex flex-col items-center justify-center text-center bg-gradient-to-b from-[var(--color-background-secondary)] to-[var(--color-background-primary)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-success)] opacity-10 rounded-full blur-2xl"></div>
            <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 w-full text-left">
              Productivity
            </h4>
            
            <div className="relative w-32 h-32 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-light)" strokeWidth="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="var(--color-success)" 
                  strokeWidth="8" 
                  strokeDasharray={`${(tasks.filter((t: any) => t.completed).length / Math.max(tasks.length, 1)) * 283} 283`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                  {Math.round((tasks.filter((t: any) => t.completed).length / Math.max(tasks.length, 1)) * 100)}%
                </span>
                <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-widest">
                  Done
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
                <p className="text-2xl font-bold text-[var(--color-success)]">{tasks.filter((t: any) => t.completed).length}</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase">Completed</p>
              </div>
              <div className="bg-[var(--color-background-secondary)] p-3 rounded-xl border border-[var(--color-border-light)]">
                <p className="text-2xl font-bold text-[var(--color-warning)]">{tasks.filter((t: any) => !t.completed).length}</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase">Pending</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="clay-card bg-[var(--color-accent)] text-white border-none relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="font-bold text-lg mb-1">Focus Mode</p>
                <p className="text-xs text-white/80">Block distractions now</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Zap size={20} className="text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {showAddTask && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-xl w-[320px] shadow-xl">
            <h3 className="font-bold text-lg mb-4 text-[var(--color-text-primary)]">
              Add New Task
            </h3>

            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg mb-3 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] text-sm"
            />

            <input
              type="date"
              value={newTask.date}
              onChange={(e) =>
                setNewTask({ ...newTask, date: e.target.value })
              }
              className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg mb-3 outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] text-sm"
            />

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg mb-4 outline-none focus:border-[var(--color-accent)] text-[var(--color-text-primary)] text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-3 py-1 bg-[var(--color-background-tertiary)] rounded hover:bg-[var(--color-border-medium)]"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTask}
                className="px-3 py-1 bg-[var(--color-accent)] text-white rounded hover:brightness-110"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
