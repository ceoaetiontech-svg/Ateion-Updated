import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { BookOpen, StickyNote, MessageCircle, Download, ArrowLeft, CheckCircle, Zap } from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import CurriculumSidebar, { Section, Lesson } from "../components/CurriculumSidebar";
import { usePlayground } from "../shared/PlaygroundContext";

type TabId = "overview" | "notes" | "qa" | "resources";
interface TabDef { id: TabId; label: string; icon: React.ComponentType<{ size?: number | string }>; }
const TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "notes", label: "My Notes", icon: StickyNote },
  { id: "qa", label: "Q&A", icon: MessageCircle },
  { id: "resources", label: "Resources", icon: Download },
];

export default function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addXp, incrementStreak, addNote, notes, touchCourse } = usePlayground();

  const courseId = Number(id);
  const [courseTitle, setCourseTitle] = useState("Loading Course...");
  // FIX 4: Store raw sections without baking `completed` into them at fetch time.
  // `completed` is derived reactively at render time from `completedIds` so it
  // never goes stale when the user marks lessons complete.
  const [sections, setSections] = useState<Section[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [backendVideoId, setBackendVideoId] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [noteInput, setNoteInput] = useState("");

  const progressKey = `ateion_progress_${courseId}`;
  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(progressKey) || "[]")); }
    catch { return new Set<number>(); }
  });

  const persistCompleted = useCallback((ids: Set<number>) => {
    localStorage.setItem(progressKey, JSON.stringify([...ids]));
  }, [progressKey]);

  useEffect(() => {
    try {
      setCompletedIds(new Set(JSON.parse(localStorage.getItem(progressKey) || "[]")));
    } catch {
      setCompletedIds(new Set<number>());
    }
  }, [progressKey]);

  useEffect(() => {
    if (courseId) touchCourse(courseId);
  }, [courseId, touchCourse]);

  // 1. Fetch Dynamic Course Curriculum
  useEffect(() => {
    const controller = new AbortController();

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentLesson(null);
      setBackendVideoId(null);

      try {
        if (!Number.isFinite(courseId) || courseId <= 0) {
          throw new Error("Invalid course ID");
        }

        const token = localStorage.getItem("token");
        const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const res = await fetch(`${apiBase}/content/courses/${courseId}/full`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Course request failed with status ${res.status}`);
        }

        const data = await res.json();
        const modules = Array.isArray(data?.modules) ? data.modules : [];

        const mappedSections: Section[] = modules.map((mod: any) => ({
          title: String(mod?.title ?? "Module"),
          lessons: (Array.isArray(mod?.videos) ? mod.videos : []).map((vid: any) => {
            const durationSeconds = Number(vid?.durationSeconds ?? 0);
            return {
              id: Number(vid.id),
              title: String(vid?.title ?? "Untitled lesson"),
              duration: `${Math.floor(durationSeconds / 60)}:${String(durationSeconds % 60).padStart(2, "0")}`,
              completed: false,
              isLocked: false,
              isCurrent: false,
            };
          }),
        }));

        const firstLesson = mappedSections.flatMap(section => section.lessons)[0] ?? null;

        setCourseTitle(String(data?.title ?? "Course"));
        setSections(mappedSections);
        setCurrentLesson(firstLesson);

        if (!firstLesson) {
          setError("No lessons are available in this course.");
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Failed to load course curriculum:", err);
        setError("Failed to load course curriculum.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void fetchCourse();
    return () => controller.abort();
  }, [courseId]);

  // 2. Fetch Secured Video Access whenever the selected lesson changes.
  useEffect(() => {
    if (!currentLesson) return;

    const controller = new AbortController();
    const selectedLessonId = currentLesson.id;

    const fetchVideoAccess = async () => {
      setIsVideoLoading(true);
      setVideoError(null);

      try {
        const token = localStorage.getItem("token");
        const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const res = await fetch(`${apiBase}/content/videos/${selectedLessonId}/access`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: controller.signal,
        });

        if (!res.ok) {
          let message = `Video access failed with status ${res.status}`;
          try {
            const body = await res.json();
            if (typeof body?.message === "string") message = body.message;
          } catch {
            // The server may return an empty body. Keep the status-based message.
          }
          throw new Error(message);
        }

        const data = await res.json();
        if (typeof data?.youtubeVideoId !== "string" || !data.youtubeVideoId.trim()) {
          throw new Error("The server returned no YouTube video ID.");
        }

        if (!controller.signal.aborted) {
          setBackendVideoId(data.youtubeVideoId.trim());
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(`Failed to load video ${selectedLessonId}:`, err);
        setVideoError(err instanceof Error ? err.message : "Failed to load this video.");
      } finally {
        if (!controller.signal.aborted) setIsVideoLoading(false);
      }
    };

    void fetchVideoAccess();
    return () => controller.abort();
  }, [currentLesson?.id]);

  const markComplete = useCallback(() => {
    if (!currentLesson) return;
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.add(currentLesson.id);
      persistCompleted(next);
      return next;
    });
    addXp(50);
    incrementStreak();
  }, [currentLesson, addXp, incrementStreak, persistCompleted]);

  const handleAddNote = () => {
    if (!noteInput.trim() || !currentLesson) return;
    addNote({ courseId, lessonId: currentLesson.id, text: `${noteInput} — at "${currentLesson.title}"` });
    setNoteInput("");
  };

  // FIX 4 (continued): Derive sections with live `completed` flags by merging
  // the raw fetched sections with the current completedIds set. This runs on
  // every render where either `sections` or `completedIds` changes, so the
  // sidebar always reflects the true completion state without requiring a
  // re-fetch or additional state management.
  const derivedSections: Section[] = sections.map(section => ({
    ...section,
    lessons: section.lessons.map(lesson => ({
      ...lesson,
      completed: completedIds.has(lesson.id),
    })),
  }));

  const totalLessons = sections.flatMap(s => s.lessons).length;
  const derivedProgress = totalLessons === 0 ? 0 : Math.round((completedIds.size / totalLessons) * 100);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-[var(--color-background-primary)]">
          <div className="w-10 h-10 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  if (error || !currentLesson) {
    return (
        <div className="flex items-center justify-center h-screen bg-[var(--color-background-primary)]">
          <div className="text-center p-8 bg-[var(--color-background-secondary)] rounded-2xl border border-[var(--color-border-light)]">
            <p className="text-xl font-bold text-[var(--color-text-primary)] mb-4">{error || "No lessons available"}</p>
            <button onClick={() => navigate("/playground/discover")} className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90"> Back to Discover </button>
          </div>
        </div>
    );
  }

  const courseNotes = notes.filter(n => n.courseId === courseId);

  return (
      <div className="flex h-full bg-[var(--color-background-primary)]">
        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50">
            <button onClick={() => navigate("/playground/my-courses")} className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
              <ArrowLeft size={16} /> My Courses
            </button>
            <span className="text-sm text-[var(--color-text-tertiary)]">›</span>
            <span className="text-sm text-[var(--color-text-tertiary)] truncate max-w-[200px]">{courseTitle}</span>
            <span className="text-sm text-[var(--color-text-tertiary)]">›</span>
            <span className="text-sm text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">{currentLesson.title}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* The Player */}
              <VideoPlayer
                  videoId={backendVideoId}
                  title={currentLesson.title}
                  loading={isVideoLoading}
                  error={videoError}
                  onComplete={markComplete}
              />

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] font-['OV_Soge']">{currentLesson.title}</h2>
                  <p className="text-[var(--color-text-secondary)] mt-1">Module: {sections.find(s => s.lessons.some(l => l.id === currentLesson.id))?.title}</p>
                </div>
                <button
                    onClick={markComplete}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                        completedIds.has(currentLesson.id)
                            ? "bg-[var(--color-success)]/10 text-[var(--color-success)] cursor-default"
                            : "bg-[var(--color-accent)] text-white hover:shadow-md hover:-translate-y-0.5"
                    }`}
                >
                  <CheckCircle size={18} />
                  {completedIds.has(currentLesson.id) ? "Completed" : "Mark Complete"}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 border-b border-[var(--color-border-light)] mt-8 overflow-x-auto hide-scrollbar">
                {TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                              isActive ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                          }`}
                      >
                        <Icon size={18} /> <span className="font-semibold text-sm">{tab.label}</span>
                      </button>
                  );
                })}
              </div>

              <div className="py-6">
                {activeTab === "overview" && (
                    <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4">
                      <p>This is a dynamically generated lesson view for <strong>{currentLesson.title}</strong>.</p>
                      <p>Watch the video above, and click "Mark Complete" when finished to earn XP and increase your streak!</p>
                    </div>
                )}
                {activeTab === "notes" && (
                    <div className="space-y-6">
                      <div className="bg-[var(--color-background-secondary)] rounded-xl border border-[var(--color-border-light)] p-2 flex gap-2">
                        <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                            placeholder="Type a note and press Enter..."
                            className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-[var(--color-text-primary)]"
                        />
                        <button onClick={handleAddNote} className="bg-[var(--color-accent)] text-white p-2 rounded-lg hover:opacity-90 transition-opacity">
                          <Zap size={16} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {courseNotes.map(n => (
                            <div key={n.id} className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                              <p className="text-sm text-[var(--color-text-primary)]">{n.text}</p>
                            </div>
                        ))}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CURRICULUM SIDEBAR */}
        <div className="w-80 border-l border-[var(--color-border-light)] bg-[var(--color-background-secondary)] flex-col hidden lg:flex">
          <div className="p-4 border-b border-[var(--color-border-light)] bg-[var(--color-background-primary)]/50">
            <h2 className="font-bold text-[var(--color-text-primary)] text-lg mb-4 truncate">{courseTitle}</h2>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[var(--color-text-secondary)] text-xs font-bold">Course Progress</span>
              <span className="text-[var(--color-accent)] text-xs font-bold">{derivedProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--color-border-light)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500" style={{ width: `${derivedProgress}%` }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* FIX 4 (continued): Pass derivedSections (with live completed flags)
                instead of raw sections so the sidebar always reflects real progress. */}
            <CurriculumSidebar
                sections={derivedSections}
                currentLessonId={currentLesson.id}
                completedIds={completedIds}
                onLessonSelect={(lesson) => {
                  if (lesson.id !== currentLesson.id) setCurrentLesson(lesson);
                }}
            />
          </div>
        </div>
      </div>
  );
}