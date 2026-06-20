import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, ListVideo, Plus, X, Clock, Users, BookOpen, AlertTriangle, Video, Trash2 } from "lucide-react";
import { staggerContainer, fadeUpItem } from "../shared/types";
import { usePlayground } from "../shared/PlaygroundContext";
import { useState, useMemo } from "react";
import type { CalendarEvent } from "../shared/types";

const TYPE_CONFIG = {
  meeting: { color: "var(--color-warning)", icon: Users, label: "Meeting" },
  mentoring: { color: "var(--color-accent)", icon: Video, label: "Mentoring" },
  focus: { color: "var(--color-info)", icon: BookOpen, label: "Focus" },
  deadline: { color: "var(--color-error)", icon: AlertTriangle, label: "Deadline" },
} as const;

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const { events, addEvent, removeEvent, selectedDate, setSelectedDate, tasks } = usePlayground();
  const today = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", endTime: "", type: "meeting" as CalendarEvent["type"], description: "" });

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1
  );

  const calendarDays = useMemo(() => {
    const days: { day: number; isCurrent: boolean; isToday: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      days.push({ day: d, isCurrent: false, isToday: false });
    }

    const dateStr = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrent: true, isToday: dateStr(i) === today });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrent: false, isToday: false });
    }

    return days;
  }, [year, month, daysInMonth, firstDay, today]);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const dateStr = (day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const ev of events) {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    }
    for (const t of tasks) {
      if (t.date && !t.completed && !["Tomorrow", "Today", "Yesterday"].includes(t.date)) {
        const d = new Date(t.date);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (!map[key]) map[key] = [];
          map[key].push({
            id: t.id + 1000,
            title: t.title,
            date: key,
            time: "",
            endTime: "",
            type: "deadline",
          });
        }
      }
    }
    return map;
  }, [events, tasks]);

  const selectedEvents = eventsByDate[selectedDate] || [];
  const selectedEventsSorted = [...selectedEvents].sort((a, b) => a.time.localeCompare(b.time));

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    addEvent({
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time || "00:00",
      endTime: newEvent.endTime || "00:00",
      type: newEvent.type,
      description: newEvent.description,
    });
    setNewEvent({ title: "", date: "", time: "", endTime: "", type: "meeting", description: "" });
    setShowAddModal(false);
  };

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

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
          onClick={() => setShowAddModal(true)}
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
        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[18px] font-bold text-[var(--color-text-primary)]">
              {monthNames[month]} {year}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => { const d = new Date(); setYear(d.getFullYear()); setMonth(d.getMonth()); }}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 transition-colors"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-[var(--color-background-tertiary)] rounded-md transition-colors text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="w-full mt-2">
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4 text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-[15px] font-medium">
              {calendarDays.map((d, i) => {
                const ds = d.isCurrent ? dateStr(d.day) : "";
                const dayEvents = eventsByDate[ds] || [];
                const isSelected = ds === selectedDate;
                return (
                  <div
                    key={i}
                    onClick={() => d.isCurrent && setSelectedDate(ds)}
                    className={`relative py-2 transition-all ${
                      !d.isCurrent
                        ? "text-[var(--color-text-tertiary)]/50"
                        : isSelected
                          ? "bg-[var(--color-accent)] text-[var(--color-text-inverse)] rounded-xl shadow-md font-bold cursor-pointer mx-1"
                          : d.isToday
                            ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold rounded-xl cursor-pointer mx-1 hover:bg-[var(--color-accent)]/20"
                            : "hover:bg-[var(--color-background-secondary)] rounded-lg cursor-pointer transition-colors"
                    }`}
                  >
                    {d.day}
                    {dayEvents.length > 0 && d.isCurrent && (
                      <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 ${isSelected ? "opacity-80" : ""}`}>
                        {dayEvents.slice(0, 3).map((ev, idx) => {
                          const cfg = TYPE_CONFIG[ev.type];
                          return (
                            <div
                              key={idx}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: isSelected ? "white" : cfg.color }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUpItem} className="clay-card flex flex-col h-full bg-[var(--color-background-secondary)]">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[16px] font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <Calendar size={18} className="text-[var(--color-accent)]" />
              Schedule
            </h4>
            <span className="text-xs text-[var(--color-text-tertiary)] font-medium">
              {formatDateLabel(selectedDate)}
            </span>
          </div>

          <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[var(--color-border-light)] flex-1">
            {selectedEventsSorted.length > 0 ? selectedEventsSorted.map((ev) => {
              const cfg = TYPE_CONFIG[ev.type];
              return (
                <div key={ev.id} className="relative pl-8 group">
                  <div
                    className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full shadow-[0_0_0_4px_var(--color-background-secondary)]"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <div
                    className="p-3 bg-[var(--color-background-primary)] rounded-xl border shadow-sm transition-all cursor-pointer group-hover:-translate-y-0.5"
                    style={{ borderColor: cfg.color + "30" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: cfg.color }}
                      >
                        <cfg.icon size={10} className="inline mr-1" />
                        {ev.time} {ev.endTime !== "00:00" && ev.endTime !== ev.time ? `- ${ev.endTime}` : ""}
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeEvent(ev.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-[var(--color-background-tertiary)]"
                      >
                        <Trash2 size={12} className="text-[var(--color-text-tertiary)] hover:text-red-500" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{ev.title}</p>
                    {ev.description && (
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{ev.description}</p>
                    )}
                    {ev.link && (
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1 flex items-center gap-1">
                        <ListVideo size={12} /> {ev.link}
                      </p>
                    )}
                  </div>
                </div>
              );
            }) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center mb-3">
                  <Calendar size={24} className="text-[var(--color-text-tertiary)]" />
                </div>
                <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">No events</p>
                <p className="text-xs text-[var(--color-text-tertiary)] max-w-[200px]">
                  Nothing scheduled for this day. Tap "Add Event" to create one.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {showAddModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[var(--color-background-secondary)] p-6 rounded-xl w-[360px] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[var(--color-text-primary)]">Add Event</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded hover:bg-[var(--color-background-tertiary)]">
                <X size={18} className="text-[var(--color-text-secondary)]" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent(p => ({ ...p, title: e.target.value }))}
              className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg mb-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-[var(--color-text-tertiary)] mb-1 block">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent(p => ({ ...p, date: e.target.value }))}
                  className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--color-text-tertiary)] mb-1 block">Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(p => ({ ...p, type: e.target.value as CalendarEvent["type"] }))}
                  className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)]"
                >
                  <option value="meeting">Meeting</option>
                  <option value="mentoring">Mentoring</option>
                  <option value="focus">Focus</option>
                  <option value="deadline">Deadline</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-[var(--color-text-tertiary)] mb-1 block">Start</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(p => ({ ...p, time: e.target.value }))}
                  className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--color-text-tertiary)] mb-1 block">End</label>
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(p => ({ ...p, endTime: e.target.value }))}
                  className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)]"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Description (optional)"
              value={newEvent.description}
              onChange={(e) => setNewEvent(p => ({ ...p, description: e.target.value }))}
              className="w-full bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] p-2.5 rounded-lg mb-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-medium)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.title || !newEvent.date}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-accent)] text-white hover:brightness-110 transition disabled:opacity-50"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
