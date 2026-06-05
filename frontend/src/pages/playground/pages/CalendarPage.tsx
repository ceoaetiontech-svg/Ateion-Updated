import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ListVideo } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3
          className="text-2xl sm:text-3xl font-bold flex items-center gap-3 group"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Calendar size={28} className="text-[var(--color-accent)] group-hover:-rotate-6 transition-transform duration-300" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-text-primary)] to-[var(--color-text-tertiary)] relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--color-accent)] after:to-transparent group-hover:after:w-full after:transition-all after:duration-500">My Calendar</span>
        </h3>

        <button
          className="bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition shadow-sm flex items-center gap-2"
        >
          <Calendar size={16} /> Add Event
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Left: The Calendar Grid (Col 1-2) */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[18px] font-bold text-[var(--color-text-primary)]">
              May 2026
            </h4>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="w-full mt-2">
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4 text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[15px] font-medium text-[var(--color-text-primary)]">
              <div className="text-[var(--color-text-tertiary)]/50 py-2">26</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">27</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">28</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">29</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">30</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">1</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                2
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-info)]"></div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">3</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                4
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">5</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">6</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">7</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">8</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">9</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">10</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">11</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">12</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                13
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div>
                </div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">14</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">15</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">16</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">17</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">18</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">19</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">20</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">21</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">22</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">23</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">24</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                25
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-info)]"></div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">26</div>
              <div className="bg-[var(--color-accent)] text-[var(--color-text-inverse)] rounded-xl py-2 flex items-center justify-center mx-1 shadow-md font-bold cursor-pointer relative">
                27
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-warning)] border-2 border-[var(--color-background-primary)]"></div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">28</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">29</div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors relative">
                30
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></div>
              </div>
              <div className="py-2 hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors">31</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">1</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">2</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">3</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">4</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">5</div>
              <div className="text-[var(--color-text-tertiary)]/50 py-2">6</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Today's Schedule */}
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-secondary)]">
          <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
            <Calendar size={18} className="text-[var(--color-accent)]" />
            Schedule for May 27
          </h4>
          
          <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[var(--color-border-light)]">
            
            {/* Event 1 */}
            <div className="relative pl-8">
              <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-warning)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
              <div className="p-3 bg-[var(--color-background-primary)] rounded-xl border border-[var(--color-border-light)] shadow-sm hover:border-[var(--color-warning)]/30 transition-colors cursor-pointer group">
                <p className="text-[10px] font-bold text-[var(--color-warning)] uppercase tracking-wider mb-1">
                  10:00 AM - 11:30 AM
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">
                  Team Standup & Sync
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] border border-[var(--color-background-primary)]"></div>
                    <div className="w-5 h-5 rounded-full bg-[var(--color-info)] border border-[var(--color-background-primary)]"></div>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-tertiary)] font-medium">+3 others</span>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative pl-8">
              <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
              <div className="p-3 bg-[var(--color-background-primary)] rounded-xl border border-[var(--color-border-light)] shadow-sm hover:border-[var(--color-accent)]/30 transition-colors cursor-pointer group">
                <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
                  1:00 PM - 2:00 PM
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">
                  1:1 Mentoring Session
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-1 flex items-center gap-1">
                  <ListVideo size={12} /> Google Meet
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative pl-8">
              <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-info)] shadow-[0_0_0_4px_var(--color-background-secondary)]"></div>
              <div className="p-3 bg-[var(--color-info_light)] rounded-xl border border-[var(--color-info)]/20 shadow-sm cursor-pointer group">
                <p className="text-[10px] font-bold text-[var(--color-info)] uppercase tracking-wider mb-1">
                  4:00 PM - 5:30 PM
                </p>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">
                  Focus Work: React Course
                </p>
                <p className="text-xs text-[var(--color-info)]/80 font-medium mt-1">
                  Chapter 4: Advanced State
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
