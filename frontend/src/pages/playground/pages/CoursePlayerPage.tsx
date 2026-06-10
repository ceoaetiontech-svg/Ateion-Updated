import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { BookOpen, StickyNote, MessageCircle, Download, ArrowLeft, Star, Clock, BarChart2, PlayCircle, Users, Copy, ThumbsUp, MessageSquare, Paperclip, ExternalLink, FileText, CheckCircle, Zap, X } from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import CurriculumSidebar, { COURSE_SECTIONS, SECTIONS, Lesson } from "../components/CurriculumSidebar";
import { MY_COURSES_DATA } from "../shared/mockData";
import { usePlayground } from "../shared/PlaygroundContext";
import { fetchBackendVideos } from "../../../lib/videoApi";
type TabId = "overview" | "notes" | "qa" | "resources";

interface TabDef {
  id: TabId;
  label: string;
 icon: React.ComponentType<{ size?: number | string }>;  
}

const TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "notes", label: "My Notes", icon: StickyNote },
  { id: "qa", label: "Q&A", icon: MessageCircle },
  { id: "resources", label: "Resources", icon: Download },
];




function parseDuration(d: string): number {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
}

export default function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addXp, incrementStreak, addNote, deleteNote, notes, touchCourse } = usePlayground();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [noteInput, setNoteInput] = useState("");

  const [backendVideoId, setBackendVideoId] = useState<string | null>(null);
  const courseId = Number(id);
  const course = MY_COURSES_DATA.find((c) => c.id === courseId);

  useEffect(() => {
    if (courseId) {
      touchCourse(courseId);
    }
  }, [courseId, touchCourse]);
  const sections = COURSE_SECTIONS[courseId] ?? SECTIONS;

  const allLessons = sections.flatMap(s => s.lessons);
  const totalLessons = allLessons.length;
  const firstUnlocked = allLessons.find(l => !l.isLocked) || allLessons[0];
  const [currentLesson, setCurrentLesson] = useState<Lesson>(firstUnlocked);

  const progressKey = `ateion_progress_${courseId}`;
  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(progressKey) || "[]"));
    } catch {
      return new Set<number>();
    }
  });

  const [xpFloats, setXpFloats] = useState<{ id: number; x: number; y: number }[]>([]);
  const xpIdRef = useRef(0);

  const derivedProgress = Math.round((completedIds.size / totalLessons) * 100);

  const persistCompleted = useCallback((ids: Set<number>) => {
    localStorage.setItem(progressKey, JSON.stringify([...ids]));
  }, [progressKey]);

  const addXpFloat = useCallback(() => {
    const id = ++xpIdRef.current;
    const x = 120 + Math.random() * 40;
    const y = 60 + Math.random() * 20;
    setXpFloats(prev => [...prev, { id, x, y }]);
    setTimeout(() => setXpFloats(prev => prev.filter(f => f.id !== id)), 1200);
  }, []);

  const markComplete = (lessonId: number) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      persistCompleted(next);
      return next;
    });
    addXpFloat();
    addXp(50);
    incrementStreak();
  };
    useEffect(() => {
    const loadVideoFromBackend = async () => {
      // 1. If the course is completely empty, don't try to fetch videos
      if (!currentLesson) return; 

      try {
        setBackendVideoId(null); 
        
        const videos = await fetchBackendVideos(); 
        
        // 2. Add fallback (videos || []) just in case your backend API fails
        const matchedVideo = (videos || []).find(v => v.title === currentLesson.title);
        
        if (matchedVideo) {
          setBackendVideoId(matchedVideo.videoId);
        } else {
          console.log("Video not found in backend database yet.");
        }
      } catch (error) {
        console.error("Failed to fetch from backend", error);
      }
    };

    loadVideoFromBackend();
  }, [currentLesson?.title]); 

  if (!course || !currentLesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
            {!course ? "Course not found" : "Lessons coming soon!"}
          </p>
          <button onClick={() => navigate("/playground/my-courses")} className="text-sm text-[var(--color-accent)] hover:underline">
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    addNote({ courseId, lessonId: currentLesson.id, text: `${noteInput} — at "${currentLesson.title}"` });
    setNoteInput("");
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50">
          <button onClick={() => navigate("/playground/my-courses")} className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <ArrowLeft size={16} />
            My Courses
          </button>
          <span className="text-sm text-[var(--color-text-tertiary)]">›</span>
          <span className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer truncate max-w-[200px]" onClick={() => navigate(`/playground/course/${course.id}`)}>{course.title}</span>
          <span className="text-sm text-[var(--color-text-tertiary)]">›</span>
          <span className="text-sm text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">{currentLesson.title}</span>
        </div>

        <div className="relative">
          <VideoPlayer title={currentLesson.title} videoId={backendVideoId} key={currentLesson.id} duration={parseDuration(currentLesson.duration)} onComplete={() => markComplete(currentLesson.id)} />
          <AnimatePresence>
            {xpFloats.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -60, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute z-20 flex items-center gap-1 text-[var(--color-accent)] font-bold text-sm pointer-events-none drop-shadow-lg"
                style={{ top: f.y, right: f.x }}
              >
                <Zap size={16} /> +50 XP
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            {!completedIds.has(currentLesson.id) && (
              <button
                onClick={() => markComplete(currentLesson.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-success)]/90 text-white text-xs font-bold hover:bg-[var(--color-success)] transition-colors shadow-lg backdrop-blur-sm"
              >
                <CheckCircle size={14} />
                Mark complete
              </button>
            )}
            {completedIds.has(currentLesson.id) && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 text-xs font-bold backdrop-blur-sm shadow-lg">
                <CheckCircle size={14} className="text-[var(--color-success)]" />
                Completed
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/30">
          <div className="flex">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-tertiary)]"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                  {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">About This Course</h2>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  This comprehensive course covers everything you need to know about {course.title}. Designed for {course.level} learners,
                  you'll master key concepts through hands-on projects and real-world examples.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  <BarChart2 size={14} /> {course.level}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  <Clock size={14} /> {course.duration}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  <PlayCircle size={14} /> {totalLessons} lessons
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  <Users size={14} /> {course.enrollments.toLocaleString()} enrolled
                </div>
                <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-warning)]/10 text-xs text-[var(--color-warning)] font-bold">
                  <Star size={14} fill="currentColor" /> {course.rating.toFixed(1)}
                </div>
              </div>

              <div>
                <h3 className="text-md font-bold text-[var(--color-text-primary)] mb-3">Your Progress</h3>
                <div className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">{derivedProgress}% complete</span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">{completedIds.size} / {totalLessons} lessons</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[var(--color-border-light)] overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#ff9e88]"
                      initial={{ width: 0 }}
                      animate={{ width: `${derivedProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-bold text-[var(--color-text-primary)] mb-3">Instructor</h3>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--color-border-light)]" />
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">{course.instructor}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      Senior Developer & Educator with 10+ years of experience in building scalable applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                  placeholder={`Add a note — "${currentLesson.title}"`}
                  className="flex-1 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] focus:border-[var(--color-accent)] px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]"
                />
                <button onClick={handleAddNote} className="px-4 py-2.5 bg-[var(--color-accent)] text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all">
                  Add Note
                </button>
              </div>
              <div className="space-y-2">
                {notes.filter(n => n.courseId === courseId).map(note => {
                  const lessonName = note.text.includes('"') ? note.text.split('"')[1] : "";
                  return (
                    <div key={note.id} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group hover:border-[var(--color-accent)]/20 transition-colors">
                      <StickyNote size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--color-text-secondary)]">{note.text}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-[var(--color-text-tertiary)]">{new Date(note.createdAt).toLocaleDateString()}</span>
                          {lessonName && <span className="text-[9px] font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-1.5 py-0.5 rounded">{lessonName}</span>}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded text-[var(--color-text-tertiary)] hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "qa" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex gap-3">
                <input type="text" placeholder="Ask a question about this lesson..." className="flex-1 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] focus:border-[var(--color-accent)] px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]" />
                <button className="px-4 py-2.5 bg-[var(--color-accent)] text-white rounded-xl text-sm font-bold hover:brightness-110 transition-all">Ask</button>
              </div>
              {[
                { q: "How does this pattern compare to the Observer pattern?", a: "Great question! While both deal with event-driven communication, the key difference is that this pattern uses a centralized mediator rather than direct subscriptions.", votes: 24, replies: 3 },
                { q: "Is there a practical example of this in the exercises?", a: "Yes, check out lesson 5 where we build a chat application using this exact pattern.", votes: 18, replies: 1 },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-xs font-bold text-[var(--color-accent)] shrink-0">U</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.q}</p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">{item.a}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"><ThumbsUp size={13} /> {item.votes}</button>
                        <button className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors"><MessageSquare size={13} /> {item.replies} replies</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="max-w-3xl space-y-3">
              {[
                { name: "Lesson Slides (PDF)", size: "2.4 MB", icon: FileText },
                { name: "Source Code - Lesson 3", size: "1.1 MB", icon: Paperclip },
                { name: "Cheat Sheet Reference", size: "0.8 MB", icon: BookOpen },
                { name: "External Reading List", size: "Link", icon: ExternalLink },
              ].map((resource, i) => {
                const Icon = resource.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/30 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                        <Icon size={18} className="text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{resource.name}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">{resource.size}</p>
                      </div>
                    </div>
                    <Download size={16} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <aside className="w-80 border-l border-[var(--color-border-light)] overflow-y-auto shrink-0 hidden lg:block">
        <CurriculumSidebar
          sections={sections}
          currentLessonId={currentLesson.id}
          completedIds={completedIds}
          onLessonSelect={(lesson) => { if (!lesson.isLocked) setCurrentLesson(lesson); }}
        />
      </aside>
    </div>
  );
}
