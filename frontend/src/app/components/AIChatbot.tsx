import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type TouchEvent,
  type CSSProperties,
} from "react";
import { useTheme } from "./ThemeProvider";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

interface AIChatBotProps {
  greeting?: string;
  subHeading?: string;
  brandName?: string;
  userInitial?: string;
  onSendMessage?: (message: string, history: Message[]) => Promise<string>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const defaultAIHandler = async (
  message: string,
  history: Message[]
): Promise<string> => {
  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: message },
  ];
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are a helpful assistant for Ateion, an edtech platform. Be concise and friendly.",
      messages,
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const textBlock = data?.content?.find(
    (b: { type: string }) => b.type === "text"
  );
  return textBlock?.text ?? "Sorry, I couldn't get a response.";
};

const uid = () => Math.random().toString(36).slice(2, 9);

const fmt = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const fmtDate = (d: Date) => {
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

function renderMarkdown(text: string) {
  const parts: (string | JSX.Element)[] = [];
  const lines = text.split("\n");
  lines.forEach((line, li) => {
    const segments = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    segments.forEach((seg, si) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        parts.push(<strong key={`${li}-${si}`}>{seg.slice(2, -2)}</strong>);
      } else if (seg.startsWith("`") && seg.endsWith("`")) {
        parts.push(
          <code
            key={`${li}-${si}`}
            style={{
              background: "var(--color-border-light)",
              borderRadius: "4px",
              padding: "1px 5px",
              fontSize: "0.9em",
              fontFamily: "monospace",
            }}
          >
            {seg.slice(1, -1)}
          </code>
        );
      } else {
        parts.push(seg);
      }
    });
    if (li < lines.length - 1) parts.push(<br key={`br-${li}`} />);
  });
  return <>{parts}</>;
}

const MOCK_PAST: Conversation[] = [
  {
    id: "past1",
    title: "How does the Olympiad scoring work?",
    lastUpdated: new Date(Date.now() - 86_400_000 * 2),
    messages: [
      {
        id: "p1a",
        role: "user",
        content: "How does the Olympiad scoring work?",
        timestamp: new Date(Date.now() - 86_400_000 * 2),
      },
      {
        id: "p1b",
        role: "assistant",
        content:
          "The Global Capability Olympiad uses an AI-integrated scoring system that evaluates **thinking patterns** rather than memorized answers.",
        timestamp: new Date(Date.now() - 86_400_000 * 2),
      },
    ],
  },
  {
    id: "past2",
    title: "Registration deadline query",
    lastUpdated: new Date(Date.now() - 86_400_000 * 5),
    messages: [
      {
        id: "p2a",
        role: "user",
        content: "When is the registration deadline?",
        timestamp: new Date(Date.now() - 86_400_000 * 5),
      },
      {
        id: "p2b",
        role: "assistant",
        content:
          "Registration deadlines vary by region. Please check the **Dashboard** for your specific cohort's deadline.",
        timestamp: new Date(Date.now() - 86_400_000 * 5),
      },
    ],
  },
];

// ── Hook: safe mobile detection (no SSR window crash) ─────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ── Hook: track visual viewport height for keyboard avoidance ─────────────────
function useViewportHeight() {
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    const update = () => setVh(vv?.height ?? window.innerHeight);
    update();
    vv?.addEventListener("resize", update);
    vv?.addEventListener("scroll", update);
    return () => {
      vv?.removeEventListener("resize", update);
      vv?.removeEventListener("scroll", update);
    };
  }, []);
  return vh;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AIChatBot({
  greeting = "Hello! 👋",
  subHeading = "How can we help?",
  brandName = "AI Assistant",
  userInitial = "U",
  onSendMessage = defaultAIHandler,
}: AIChatBotProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"home" | "chat" | "history" | "past-chat">(
    "home"
  );
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_PAST);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Touch-to-dismiss drag state
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);
  const isDragging = useRef(false);

  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const vph = useViewportHeight();

  const isDark = theme === "dark";
  const T = {
    bg: "var(--color-background-primary)",
    panel: "var(--color-background-secondary)",
    panelDark: "var(--color-background-dark)",
    heroBg: isDark
      ? "linear-gradient(135deg, #080C16 0%, #1A1833 100%)"
      : "linear-gradient(135deg, var(--color-background-deep) 0%, var(--color-background-dark) 100%)",
    accent: "var(--color-accent)",
    accentLight: "var(--color-accent_light)",
    navy: "var(--color-text-primary)",
    textMuted: "var(--color-text-tertiary)",
    textSecondary: "var(--color-text-secondary)",
    border: "var(--color-border-light)",
    userBubble: isDark ? "#1E293B" : "var(--color-background-dark)",
    botBubble: "var(--color-background-secondary)",
    inputBg: isDark ? "rgba(15,23,42,0.6)" : "var(--color-background-primary)",
    cardBg: isDark ? "#334155" : "#FFFFFF",
    cardBorder: isDark ? "rgba(148,163,184,0.12)" : "var(--color-border-medium)",
    shadow: isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "var(--shadow-card)",
    surfaceHover: "var(--color-gray-100)",
    glassBg: isDark ? "rgba(30,41,59,0.7)" : "rgba(248,248,244,0.7)",
    glassBorder: isDark ? "rgba(148,163,184,0.08)" : "rgba(0,0,0,0.06)",
  } as const;

  // ── Auto-scroll to latest message ──────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, loading]);

  // ── Auto-focus input when entering chat ────────────────────────────────────
  useEffect(() => {
    if (view === "chat") {
      setTimeout(() => textareaRef.current?.focus(), 120);
    }
  }, [view]);

  // ── Auto-grow textarea ─────────────────────────────────────────────────────
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  // ── Body scroll lock on mobile ─────────────────────────────────────────────
  useEffect(() => {
    if (!isMobile) return;
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.cssText = `overflow:hidden;position:fixed;top:-${scrollY}px;width:100%`;
    } else {
      const top = parseFloat(document.body.style.top || "0");
      document.body.style.cssText = "";
      window.scrollTo(0, -top);
    }
    return () => {
      document.body.style.cssText = "";
    };
  }, [open, isMobile]);

  // ── Swipe-down to dismiss (mobile drag handle area) ────────────────────────
  const onTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    touchDeltaY.current = delta;
    if (delta > 0 && panelRef.current) {
      panelRef.current.style.transform = `translateY(${delta}px)`;
      panelRef.current.style.transition = "none";
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (panelRef.current) {
      panelRef.current.style.transition = "";
    }
    if (touchDeltaY.current > 100) {
      setOpen(false);
    } else if (panelRef.current) {
      panelRef.current.style.transform = "translateY(0)";
    }
  }, []);

  // ── Conversations logic ────────────────────────────────────────────────────
  const startNewChat = () => {
    setActiveConvId(null);
    setCurrentMessages([]);
    setError(null);
    setView("chat");
  };

  const openPastConv = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setCurrentMessages(conv.messages);
    setError(null);
    setView("past-chat");
  };

  const saveMessages = useCallback(
    (msgs: Message[]) => {
      if (activeConvId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConvId
              ? { ...c, messages: msgs, lastUpdated: new Date() }
              : c
          )
        );
      } else {
        const firstUser = msgs.find((m) => m.role === "user");
        const title = firstUser
          ? firstUser.content.slice(0, 48) +
            (firstUser.content.length > 48 ? "…" : "")
          : "New conversation";
        const newConv: Conversation = {
          id: uid(),
          title,
          messages: msgs,
          lastUpdated: new Date(),
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveConvId(newConv.id);
      }
    },
    [activeConvId]
  );

  // ── Send message ───────────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    const updated = [...currentMessages, userMsg];
    setCurrentMessages(updated);
    setInput("");
    setLoading(true);
    if (view === "past-chat") setView("chat");

    try {
      const reply = await onSendMessage(text, currentMessages);
      const botMsg: Message = {
        id: uid(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      const final = [...updated, botMsg];
      setCurrentMessages(final);
      saveMessages(final);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(msg);
      const errMsg: Message = {
        id: uid(),
        role: "assistant",
        content: "⚠️ " + msg,
        timestamp: new Date(),
      };
      const final = [...updated, errMsg];
      setCurrentMessages(final);
      saveMessages(final);
    } finally {
      setLoading(false);
    }
  }, [input, loading, currentMessages, view, onSendMessage, saveMessages]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const grouped = conversations.reduce<Record<string, Conversation[]>>(
    (acc, c) => {
      const key = fmtDate(c.lastUpdated);
      (acc[key] ??= []).push(c);
      return acc;
    },
    {}
  );

  const isInChat = view === "chat" || view === "past-chat";

  // ── Panel style ────────────────────────────────────────────────────────────
  const panelStyle: CSSProperties = isMobile
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        height: vph > 0 ? `${vph}px` : "100dvh",
        borderRadius: 0,
        background: T.panel,
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9998,
        border: "none",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
        pointerEvents: open ? "all" : "none",
        willChange: "transform",
        fontFamily: "var(--font-family-body)",
      }
    : {
        position: "fixed",
        bottom: "96px",
        right: "28px",
        width: "368px",
        height: "560px",
        borderRadius: "20px",
        background: isDark ? "rgba(30,41,59,0.92)" : T.panel,
        backdropFilter: isDark ? "blur(16px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(16px)" : "none",
        boxShadow: isDark
          ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(148,163,184,0.06)"
          : "var(--shadow-modal)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9998,
        border: `1px solid ${isDark ? "rgba(148,163,184,0.08)" : T.border}`,
        transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition:
          "transform 0.24s cubic-bezier(0.34,1.2,0.64,1), opacity 0.18s ease",
        fontFamily: "var(--font-family-body)",
      };

  const fabStyle: CSSProperties = {
    position: "fixed",
    bottom: isMobile ? "20px" : "28px",
    right: isMobile ? "16px" : "28px",
    width: isMobile ? "52px" : "54px",
    height: isMobile ? "52px" : "54px",
    borderRadius: "50%",
    background: T.accent,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow-button)",
    transition: "transform 0.2s, box-shadow 0.2s",
    zIndex: 9999,
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  };

  // ── Shared sub-components ──────────────────────────────────────────────────
  const Avatar = ({ role }: { role: "user" | "assistant" }) => (
    <div
      style={{
        width: isMobile ? "30px" : "28px",
        height: isMobile ? "30px" : "28px",
        borderRadius: "50%",
        background: role === "user" ? T.userBubble : T.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: "11px",
        fontWeight: 700,
        color: "#fff",
      }}
    >
      {role === "user" ? userInitial : "AI"}
    </div>
  );

  const ConvRow = ({
    conv,
    showMeta = false,
  }: {
    conv: Conversation;
    showMeta?: boolean;
  }) => (
    <button
      onClick={() => openPastConv(conv)}
      className="chat-conv-row"
      style={{
        width: "100%",
        background: isDark ? "rgba(51,65,85,0.5)" : T.cardBg,
        border: `1px solid ${isDark ? "rgba(148,163,184,0.06)" : T.cardBorder}`,
        borderRadius: "10px",
        padding: isMobile ? "10px 12px" : "8px 10px",
        cursor: "pointer",
        marginBottom: "6px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background: isDark ? "rgba(232,133,106,0.1)" : T.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke={T.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
        <p
          style={{
            color: T.navy,
            fontSize: isMobile ? "14px" : "13px",
            fontWeight: 500,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {conv.title}
        </p>
        <p style={{ color: T.textMuted, fontSize: "11px", margin: "1px 0 0" }}>
          {showMeta
            ? `${conv.messages.length} messages · ${fmt(conv.lastUpdated)}`
            : fmtDate(conv.lastUpdated)}
        </p>
      </div>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={T.textMuted}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 9997,
            animation: "fadeIn 0.18s ease",
          }}
        />
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        style={fabStyle}
        onMouseEnter={(e) => {
          if (!isMobile)
            (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          if (!isMobile)
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        {open ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label="AI Chat"
      >
        {/* Mobile drag handle — swipe down to close */}
        {isMobile && (
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "12px 0 8px",
              background: T.panel,
              flexShrink: 0,
              cursor: "grab",
              touchAction: "none",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "4px",
                background: T.border,
              }}
            />
          </div>
        )}

        {/* Header */}
        <div
          style={{
            background: T.panelDark,
            padding: isMobile ? "10px 16px 12px" : "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {(isInChat || view === "history") && (
              <button
                onClick={() => setView("home")}
                aria-label="Back"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px",
                  minWidth: "32px",
                  minHeight: "32px",
                  justifyContent: "center",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background 0.15s",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: T.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: isMobile ? "14px" : "13px",
                  margin: 0,
                }}
              >
                {brandName}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "11px",
                  margin: "1px 0 0",
                }}
              >
                {view === "history"
                  ? "Conversation history"
                  : isInChat
                  ? "Online"
                  : "How can we help?"}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: T.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "12px",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {userInitial}
            </div>
            {isMobile && (
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ══ HOME VIEW ══ */}
        {view === "home" && (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Hero */}
            <div
              style={{
                background: T.heroBg,
                padding: isMobile ? "20px 20px 24px" : "24px 20px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isDark && (
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(232,133,106,0.12) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
              )}
              <p
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "24px" : "22px",
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.3,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {greeting}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: isMobile ? "18px" : "16px",
                  fontWeight: 500,
                  margin: "6px 0 0",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {subHeading}
              </p>
            </div>

            <div
              style={{
                padding: isMobile ? "16px 16px 32px" : "16px 16px 16px",
                flex: 1,
                background: isDark
                  ? "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, transparent 40px)"
                  : "none",
              }}
            >
              {/* New chat CTA */}
              <button
                onClick={startNewChat}
                className="chat-cta-btn"
                style={{
                  width: "100%",
                  background: isDark ? T.cardBg : T.cardBg,
                  border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : T.cardBorder}`,
                  borderRadius: "12px",
                  padding: isMobile ? "11px" : "10px 12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.2)" : T.shadow,
                  marginBottom: "16px",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "10px",
                    background: T.accentLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={T.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <p
                    style={{
                      color: T.navy,
                      fontSize: isMobile ? "14px" : "13px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Start new conversation
                  </p>
                  <p
                    style={{
                      color: T.textMuted,
                      fontSize: "12px",
                      margin: "1px 0 0",
                    }}
                  >
                    Ask me anything…
                  </p>
                </div>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T.textMuted}
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Recent conversations */}
              {conversations.length > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      padding: "0 2px",
                    }}
                  >
                  <p
                    style={{
                      color: T.textMuted,
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      margin: 0,
                    }}
                  >
                    Recent conversations
                    </p>
                    <button
                      onClick={() => setView("history")}
                      style={{
                        background: isDark ? "rgba(232,133,106,0.1)" : "none",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: T.accent,
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "4px 8px",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      View all
                    </button>
                  </div>
                  {conversations.slice(0, isMobile ? 4 : 3).map((conv) => (
                    <ConvRow key={conv.id} conv={conv} />
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* ══ HISTORY VIEW ══ */}
        {view === "history" && (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              minHeight: 0,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {Object.entries(grouped).map(([date, convs]) => (
              <div key={date} style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    color: T.textMuted,
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    margin: "0 0 8px",
                  }}
                >
                  {date}
                </p>
                {convs.map((conv) => (
                  <ConvRow key={conv.id} conv={conv} showMeta />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ══ CHAT / PAST-CHAT VIEW ══ */}
        {isInChat && (
          <>
            {/* Past-chat banner */}
            {view === "past-chat" && (
              <div
                style={{
                  background: T.accentLight,
                  padding: isMobile ? "10px 16px" : "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${T.border}`,
                  flexShrink: 0,
                  gap: "8px",
                }}
              >
                <p
                  style={{
                    color: T.accent,
                    fontSize: "12px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Viewing past conversation
                </p>
                <button
                  onClick={startNewChat}
                  style={{
                    background: T.accent,
                    border: "none",
                    borderRadius: "20px",
                    padding: "6px 16px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    flexShrink: 0,
                    minHeight: "34px",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                  }}
                >
                  New chat
                </button>
              </div>
            )}

            {/* Message list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
                padding: isMobile ? "16px 14px" : "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: isDark ? "rgba(15,23,42,0.85)" : T.bg,
                backdropFilter: isDark ? "blur(4px)" : "none",
                WebkitBackdropFilter: isDark ? "blur(4px)" : "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {currentMessages.length === 0 && (
                <div style={{ textAlign: "center", marginTop: "60px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: T.accentLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={T.accent}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p
                    style={{ color: T.textMuted, fontSize: "14px", margin: 0 }}
                  >
                    Start a conversation…
                  </p>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      padding: "0 16px",
                    }}
                  >
                    {[
                      "How does Olympiad scoring work?",
                      "When is the registration deadline?",
                      "What courses are available?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="chat-suggestion"
                        onClick={() => {
                          setInput(suggestion);
                          setTimeout(
                            () => textareaRef.current?.focus(),
                            50
                          );
                        }}
                        style={{
                          background: isDark ? "rgba(51,65,85,0.4)" : T.cardBg,
                          border: `1px solid ${isDark ? "rgba(148,163,184,0.06)" : T.cardBorder}`,
                          borderRadius: "8px",
                          padding: "8px 12px",
                          color: T.navy,
                          fontSize: "13px",
                          cursor: "pointer",
                          textAlign: "left",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection:
                      msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  <Avatar role={msg.role} />
                  <div style={{ maxWidth: isMobile ? "78%" : "74%" }}>
                    <div
                      style={{
                        background:
                          msg.role === "user" ? T.userBubble : T.botBubble,
                        color: msg.role === "user" ? "#fff" : T.navy,
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        padding: isMobile ? "11px 15px" : "10px 14px",
                        fontSize: isMobile ? "14px" : "13px",
                        lineHeight: 1.55,
                        boxShadow: "var(--shadow-xs)",
                        border:
                          msg.role === "assistant"
                            ? `1px solid ${T.border}`
                            : "none",
                        wordBreak: "break-word",
                      }}
                    >
                      {renderMarkdown(msg.content)}
                    </div>
                    <p
                      style={{
                        color: T.textMuted,
                        fontSize: "10px",
                        margin: "4px 4px 0",
                        textAlign: msg.role === "user" ? "right" : "left",
                      }}
                    >
                      {fmt(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: T.accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      AI
                    </span>
                  </div>
                  <div
                    style={{
                      background: T.botBubble,
                      borderRadius: "18px 18px 18px 4px",
                      padding: "12px 16px",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: T.accent,
                          display: "inline-block",
                          animation: `chatBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: isMobile ? "10px 12px 10px" : "10px 12px",
                paddingBottom: isMobile
                  ? "max(10px, env(safe-area-inset-bottom, 10px))"
                  : "10px",
                borderTop: `1px solid ${isDark ? "rgba(148,163,184,0.08)" : T.border}`,
                display: "flex",
                gap: "8px",
                alignItems: "flex-end",
                background: isDark ? "rgba(30,41,59,0.95)" : T.panel,
                backdropFilter: isDark ? "blur(12px)" : "none",
                WebkitBackdropFilter: isDark ? "blur(12px)" : "none",
                flexShrink: 0,
              }}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                className="chat-textarea"
                rows={1}
                style={{
                  flex: 1,
                  background: T.inputBg,
                  border: `1px solid ${T.border}`,
                  borderRadius: "20px",
                  padding: isMobile ? "11px 16px" : "9px 16px",
                  color: T.navy,
                  fontSize: "14px",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "none",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-inner)",
                  lineHeight: 1.45,
                  maxHeight: "120px",
                  display: "block",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="chat-send-btn"
                style={{
                  width: isMobile ? "44px" : "40px",
                  height: isMobile ? "44px" : "40px",
                  borderRadius: "50%",
                  background:
                    input.trim() && !loading ? T.accent : T.border,
                  border: "none",
                  cursor:
                    input.trim() && !loading
                      ? "pointer"
                      : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.15s, transform 0.15s",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                  alignSelf: "flex-end",
                  marginBottom: "2px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Error toast */}
            {error && (
              <div
                style={{
                  position: "absolute",
                  bottom: isMobile ? "80px" : "72px",
                  left: "12px",
                  right: "12px",
                  background: "var(--color-error_light)",
                  border: "1px solid var(--color-error)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  zIndex: 10,
                }}
              >
                <p
                  style={{
                    color: "var(--color-error)",
                    fontSize: "12px",
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-error)",
                    fontSize: "16px",
                    padding: "0 2px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .chat-textarea::placeholder {
          color: var(--color-text-muted) !important;
          opacity: 1;
        }
        .chat-textarea:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 2px rgba(232,133,106,0.15) !important;
        }
        .chat-conv-row,
        .chat-cta-btn,
        .chat-suggestion {
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
        }
        .chat-conv-row:hover {
          background: rgba(232,133,106,0.06) !important;
          border-color: rgba(232,133,106,0.2) !important;
          transform: translateX(2px);
        }
        .chat-cta-btn:hover {
          background: rgba(232,133,106,0.04) !important;
          border-color: rgba(232,133,106,0.15) !important;
        }
        .chat-suggestion:hover {
          background: rgba(232,133,106,0.06) !important;
          border-color: rgba(232,133,106,0.15) !important;
        }
        .chat-send-btn:not(:disabled):hover {
          filter: brightness(1.15);
          transform: scale(1.05);
        }
        .chat-send-btn:not(:disabled):active {
          transform: scale(0.92);
        }
        [data-theme="dark"] .chat-conv-row:hover {
          background: rgba(232,133,106,0.08) !important;
          border-color: rgba(232,133,106,0.25) !important;
        }
        [data-theme="dark"] .chat-cta-btn:hover {
          background: rgba(232,133,106,0.06) !important;
          border-color: rgba(232,133,106,0.2) !important;
        }
        [data-theme="dark"] .chat-suggestion:hover {
          background: rgba(232,133,106,0.08) !important;
          border-color: rgba(232,133,106,0.2) !important;
        }
      `}</style>
    </>
  );
}
