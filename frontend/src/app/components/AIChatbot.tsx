import { useState, useRef, useEffect } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
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
  /** Called with every user message — plug in your own API here */
  onSendMessage?: (message: string, history: Message[]) => Promise<string>;
}

// ── Theme tokens (matches your UI) ──────────────────────────────────────────
const T = {
  bg: "#eeeae3",           // warm cream background
  panel: "#f5f2ec",        // slightly lighter panel
  panelDark: "#1a1a2e",    // dark navy for header
  accent: "#c9623f",       // coral/orange accent
  accentLight: "#f0d9d1",  // light coral tint
  navy: "#1a1a2e",         // dark navy text
  navyMid: "#2d2d4e",      // mid navy
  textMuted: "#8a8070",    // muted warm grey
  border: "#ddd8cf",       // warm border
  userBubble: "#1a1a2e",   // dark navy user bubble
  botBubble: "#fff",       // white bot bubble
  inputBg: "#fff",         // white input
};

// ── Default AI handler ───────────────────────────────────────────────────────
const defaultAIHandler = async (message: string, history: Message[]): Promise<string> => {
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
      system: "You are a helpful assistant. Be concise and friendly.",
      messages,
    }),
  });
  const data = await res.json();
  const textBlock = data?.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text ?? "Sorry, I couldn't get a response.";
};

const uid = () => Math.random().toString(36).slice(2, 9);
const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const fmtDate = (d: Date) => {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

// ── Mock past conversations ──────────────────────────────────────────────────
const MOCK_PAST: Conversation[] = [
  {
    id: "past1",
    title: "How does the Olympiad scoring work?",
    lastUpdated: new Date(Date.now() - 86400000 * 2),
    messages: [
      { id: "p1a", role: "user", content: "How does the Olympiad scoring work?", timestamp: new Date(Date.now() - 86400000 * 2) },
      { id: "p1b", role: "assistant", content: "The Global Capability Olympiad uses an AI-integrated scoring system that evaluates thinking patterns rather than memorized answers. Each section is scored on logic, reasoning depth, and response quality.", timestamp: new Date(Date.now() - 86400000 * 2) },
    ],
  },
  {
    id: "past2",
    title: "Registration deadline query",
    lastUpdated: new Date(Date.now() - 86400000 * 5),
    messages: [
      { id: "p2a", role: "user", content: "When is the registration deadline?", timestamp: new Date(Date.now() - 86400000 * 5) },
      { id: "p2b", role: "assistant", content: "Registration deadlines vary by region. Please check the Dashboard for your specific cohort's deadline or contact the team via the 'Get Connected' page.", timestamp: new Date(Date.now() - 86400000 * 5) },
    ],
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function AIChatBot({
  greeting = "Hello! 👋",
  subHeading = "How can we help?",
  brandName = "AI Assistant",
  userInitial = "U",
  onSendMessage = defaultAIHandler,
}: AIChatBotProps) {
  const [open, setOpen] = useState(false);
  // view: "home" | "chat" | "history" | "past-chat"
  const [view, setView] = useState<"home" | "chat" | "history" | "past-chat">("home");
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_PAST);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [currentMessages]);
  useEffect(() => { if (view === "chat") setTimeout(() => inputRef.current?.focus(), 100); }, [view]);

  const startNewChat = () => {
    setActiveConvId(null);
    setCurrentMessages([]);
    setView("chat");
  };

  const openPastConv = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setCurrentMessages(conv.messages);
    setView("past-chat");
  };

  const saveMessages = (msgs: Message[]) => {
    if (activeConvId) {
      setConversations(prev => prev.map(c =>
        c.id === activeConvId ? { ...c, messages: msgs, lastUpdated: new Date() } : c
      ));
    } else {
      const firstUser = msgs.find(m => m.role === "user");
      const title = firstUser ? firstUser.content.slice(0, 48) + (firstUser.content.length > 48 ? "…" : "") : "New conversation";
      const newConv: Conversation = { id: uid(), title, messages: msgs, lastUpdated: new Date() };
      setConversations(prev => [newConv, ...prev]);
      setActiveConvId(newConv.id);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: uid(), role: "user", content: text, timestamp: new Date() };
    const updated = [...currentMessages, userMsg];
    setCurrentMessages(updated);
    setInput("");
    setLoading(true);
    if (view === "past-chat") setView("chat"); // switch to live chat
    try {
      const reply = await onSendMessage(text, currentMessages);
      const botMsg: Message = { id: uid(), role: "assistant", content: reply, timestamp: new Date() };
      const final = [...updated, botMsg];
      setCurrentMessages(final);
      saveMessages(final);
    } catch {
      const errMsg: Message = { id: uid(), role: "assistant", content: "Something went wrong. Please try again.", timestamp: new Date() };
      const final = [...updated, errMsg];
      setCurrentMessages(final);
      saveMessages(final);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // Group conversations by date
  const grouped = conversations.reduce<Record<string, Conversation[]>>((acc, c) => {
    const key = fmtDate(c.lastUpdated);
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  const isInChat = view === "chat" || view === "past-chat";

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle AI chat"
        style={{
          position: "fixed", bottom: "28px", right: "28px",
          width: "54px", height: "54px", borderRadius: "50%",
          background: T.accent, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(201,98,63,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s", zIndex: 9999,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── Panel ── */}
      <div style={{
        position: "fixed", bottom: "96px", right: "28px",
        width: "368px", height: "560px",
        borderRadius: "20px", background: T.panel,
        boxShadow: "0 20px 60px rgba(26,26,46,0.18), 0 4px 16px rgba(26,26,46,0.1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        zIndex: 9998, border: `1px solid ${T.border}`,
        transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
        transition: "transform 0.24s cubic-bezier(0.34,1.2,0.64,1), opacity 0.18s ease",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>

        {/* ── Header ── */}
        <div style={{
          background: T.panelDark, padding: "14px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isInChat && (
              <button onClick={() => setView("home")} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", padding: "0 4px 0 0",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {view === "history" && (
              <button onClick={() => setView("home")} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", padding: "0 4px 0 0",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            {/* Bot avatar */}
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "13px", margin: 0 }}>{brandName}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", margin: "1px 0 0" }}>
                {view === "history" ? "Conversation history" : isInChat ? "Online" : "How can we help?"}
              </p>
            </div>
          </div>
          {/* User avatar */}
          <div style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: T.accent, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "12px", border: "2px solid rgba(255,255,255,0.2)",
          }}>
            {userInitial}
          </div>
        </div>

        {/* ══ HOME VIEW ══ */}
        {view === "home" && (
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {/* Greeting banner */}
            <div style={{
              background: `linear-gradient(135deg, ${T.navyMid} 0%, ${T.panelDark} 100%)`,
              padding: "24px 20px 28px",
            }}>
              <p style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{greeting}</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", fontWeight: 500, margin: "4px 0 0" }}>{subHeading}</p>
            </div>

            {/* Curved separator */}
            <div style={{ height: "20px", background: T.panelDark, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "20px", background: T.panel, borderRadius: "20px 20px 0 0" }} />
            </div>

            <div style={{ padding: "4px 16px 16px", flex: 1 }}>
              {/* New chat CTA */}
              <button onClick={startNewChat} style={{
                width: "100%", background: "#fff",
                border: `1px solid ${T.border}`, borderRadius: "14px",
                padding: "14px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "14px",
                boxShadow: "0 2px 8px rgba(26,26,46,0.06)",
                transition: "box-shadow 0.15s, transform 0.15s",
                marginBottom: "16px",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(201,98,63,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(26,26,46,0.06)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <p style={{ color: T.navy, fontSize: "14px", fontWeight: 600, margin: 0 }}>Start new conversation</p>
                  <p style={{ color: T.textMuted, fontSize: "12px", margin: "2px 0 0" }}>Ask me anything…</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Past conversations */}
              {conversations.length > 0 && (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: 0 }}>
                      Recent conversations
                    </p>
                    <button onClick={() => setView("history")} style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: T.accent, fontSize: "12px", fontWeight: 600, padding: 0,
                    }}>
                      View all
                    </button>
                  </div>
                  {conversations.slice(0, 3).map(conv => (
                    <button key={conv.id} onClick={() => openPastConv(conv)} style={{
                      width: "100%", background: "#fff",
                      border: `1px solid ${T.border}`, borderRadius: "12px",
                      padding: "12px 14px", cursor: "pointer", marginBottom: "8px",
                      display: "flex", alignItems: "center", gap: "12px",
                      transition: "background 0.12s",
                    }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
                    >
                      <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                        <p style={{ color: T.navy, fontSize: "13px", fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {conv.title}
                        </p>
                        <p style={{ color: T.textMuted, fontSize: "11px", margin: "2px 0 0" }}>
                          {fmtDate(conv.lastUpdated)}
                        </p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2" strokeLinecap="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* ══ HISTORY VIEW ══ */}
        {view === "history" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {Object.entries(grouped).map(([date, convs]) => (
              <div key={date} style={{ marginBottom: "20px" }}>
                <p style={{ color: T.textMuted, fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>
                  {date}
                </p>
                {convs.map(conv => (
                  <button key={conv.id} onClick={() => openPastConv(conv)} style={{
                    width: "100%", background: "#fff",
                    border: `1px solid ${T.border}`, borderRadius: "12px",
                    padding: "13px 14px", cursor: "pointer", marginBottom: "8px",
                    display: "flex", alignItems: "center", gap: "12px",
                    transition: "background 0.12s",
                  }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
                  >
                    <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                      <p style={{ color: T.navy, fontSize: "13px", fontWeight: 500, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {conv.title}
                      </p>
                      <p style={{ color: T.textMuted, fontSize: "11px", margin: "2px 0 0" }}>
                        {conv.messages.length} messages · {fmt(conv.lastUpdated)}
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textMuted} strokeWidth="2" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                ))}
              </div>
            ))}
            {conversations.length === 0 && (
              <div style={{ textAlign: "center", marginTop: "60px" }}>
                <p style={{ color: T.textMuted, fontSize: "13px" }}>No conversations yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ══ CHAT / PAST-CHAT VIEW ══ */}
        {isInChat && (
          <>
            {/* Past-chat notice */}
            {view === "past-chat" && (
              <div style={{
                background: T.accentLight, padding: "8px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: `1px solid ${T.border}`, flexShrink: 0,
              }}>
                <p style={{ color: T.accent, fontSize: "12px", fontWeight: 500, margin: 0 }}>
                  Viewing past conversation
                </p>
                <button onClick={startNewChat} style={{
                  background: T.accent, border: "none", borderRadius: "20px",
                  padding: "4px 12px", color: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer",
                }}>
                  New chat
                </button>
              </div>
            )}

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", background: T.bg }}>
              {currentMessages.length === 0 && (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <p style={{ color: T.textMuted, fontSize: "13px", margin: 0 }}>Start a conversation…</p>
                </div>
              )}

              {currentMessages.map(msg => (
                <div key={msg.id} style={{
                  display: "flex",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end", gap: "8px",
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: msg.role === "user" ? T.userBubble : T.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: "11px", fontWeight: 700,
                    color: "#fff",
                  }}>
                    {msg.role === "user" ? userInitial : "AI"}
                  </div>
                  {/* Bubble */}
                  <div style={{ maxWidth: "74%" }}>
                    <div style={{
                      background: msg.role === "user" ? T.userBubble : T.botBubble,
                      color: msg.role === "user" ? "#fff" : T.navy,
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      padding: "10px 14px",
                      fontSize: "13px", lineHeight: 1.55,
                      boxShadow: "0 2px 6px rgba(26,26,46,0.08)",
                      border: msg.role === "assistant" ? `1px solid ${T.border}` : "none",
                      wordBreak: "break-word",
                    }}>
                      {msg.content}
                    </div>
                    <p style={{
                      color: T.textMuted, fontSize: "10px", margin: "4px 4px 0",
                      textAlign: msg.role === "user" ? "right" : "left",
                    }}>
                      {fmt(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#fff", fontSize: "10px", fontWeight: 700 }}>AI</span>
                  </div>
                  <div style={{ background: T.botBubble, borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center", border: `1px solid ${T.border}` }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: "6px", height: "6px", borderRadius: "50%", background: T.accent,
                        display: "inline-block",
                        animation: `chatBounce 1.2s ${i * 0.2}s infinite ease-in-out`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 14px",
              borderTop: `1px solid ${T.border}`,
              display: "flex", gap: "8px", alignItems: "center",
              background: T.panel, flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                style={{
                  flex: 1, background: T.inputBg,
                  border: `1px solid ${T.border}`, borderRadius: "24px",
                  padding: "10px 16px", color: T.navy,
                  fontSize: "13px", outline: "none",
                  fontFamily: "inherit",
                  boxShadow: "inset 0 1px 3px rgba(26,26,46,0.06)",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: input.trim() && !loading ? T.accent : T.border,
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.15s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}