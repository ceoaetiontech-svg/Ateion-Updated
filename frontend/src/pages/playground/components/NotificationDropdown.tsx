import { useState } from "react";
import { Bell, BookOpen, Award, Clock, Check, Sparkles } from "lucide-react";

interface Notification {
  id: number;
  type: "course" | "badge" | "task";
  text: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "course", text: "New lesson added to React course", time: "2m ago", read: false },
  { id: 2, type: "badge", text: "You earned the 7-day streak badge", time: "1h ago", read: false },
  { id: 3, type: "task", text: "Assignment due in 3 hours", time: "3h ago", read: true },
  { id: 4, type: "course", text: "Data visualization course updated", time: "1d ago", read: true },
  { id: 5, type: "badge", text: "Top 10% learner this month", time: "2d ago", read: true },
];

const ICON_MAP = {
  course: BookOpen,
  badge: Award,
  task: Clock,
};

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors group/bell"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-[var(--color-text-primary)] group-hover/bell:scale-110 transition-transform duration-200" />
        {unreadCount > 0 && !open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              {unreadCount}
            </span>
          </span>
        )}
        {unreadCount > 0 && open && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-[var(--color-background-primary)] border border-[var(--color-border-light)] rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-light)]">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-[var(--color-accent)] hover:underline font-medium">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-[var(--color-text-tertiary)]">
                  <Sparkles size={24} />
                  <p className="text-sm">All caught up!</p>
                </div>
              ) : (
                notifications.map(n => {
                  const Icon = ICON_MAP[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[var(--color-background-secondary)] transition-colors ${!n.read ? "bg-[var(--color-accent)]/5" : ""}`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${n.type === "course" ? "bg-blue-500/10 text-blue-500" : n.type === "badge" ? "bg-amber-500/10 text-amber-500" : "bg-purple-500/10 text-purple-500"}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"} text-[var(--color-text-primary)]`}>{n.text}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <Check size={14} className="shrink-0 text-[var(--color-text-tertiary)] mt-1" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
