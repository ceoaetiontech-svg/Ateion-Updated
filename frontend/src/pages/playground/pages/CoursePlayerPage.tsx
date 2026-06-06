import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BookOpen, StickyNote, MessageCircle, Download, ArrowLeft, Star, Clock, BarChart2, PlayCircle, Users, Copy, ThumbsUp, MessageSquare, Paperclip, ExternalLink, FileText, CheckCircle } from "lucide-react";
import VideoPlayer from "../components/VideoPlayer";
import CurriculumSidebar, { SECTIONS, Lesson } from "../components/CurriculumSidebar";
import { MY_COURSES_DATA } from "../shared/mockData";

type TabId = "overview" | "notes" | "qa" | "resources";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const TABS: TabDef[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "notes", label: "My Notes", icon: StickyNote },
  { id: "qa", label: "Q&A", icon: MessageCircle },
  { id: "resources", label: "Resources", icon: Download },
];

export default function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState<string[]>([
    "Important: the dependency injection pattern is core to this module — timestamp 12:34",
    "Review the architecture diagram in lesson 4 for the system design question",
  ]);

  const courseId = Number(id);
  const course = MY_COURSES_DATA.find((c) => c.id === courseId);

  const allLessons = SECTIONS.flatMap(s => s.lessons);
  const firstUnlocked = allLessons.find(l => !l.isLocked) || allLessons[0];
  const [currentLesson, setCurrentLesson] = useState<Lesson>(firstUnlocked);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set([1, 2]));

  const markComplete = (lessonId: number) => {
    setCompletedIds(prev => new Set([...prev, lessonId]));
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Course not found</p>
          <button onClick={() => navigate("/playground/my-courses")} className="text-sm text-[var(--color-accent)] hover:underline">
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setNotes((prev) => [...prev, `${noteInput} — at "${currentLesson.title}"`]);
    setNoteInput("");
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--color-border-light)] bg-[var(--color-background-secondary)]/50">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-sm text-[var(--color-text-tertiary)]">/</span>
          <span className="text-sm text-[var(--color-text-primary)] font-medium truncate">{course.title}</span>
        </div>

        <div className="relative">
          <VideoPlayer title={currentLesson.title} key={currentLesson.id} />
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
                  {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]" />}
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
                  <PlayCircle size={14} /> {course.lessons} lessons
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-background-tertiary)] text-xs text-[var(--color-text-secondary)]">
                  <Users size={14} /> {course.enrollments.toLocaleString()} enrolled
                </div>
                <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--color-warning)]/10 text-xs text-[var(--color-warning)] font-bold">
                  <Star size={14} fill="currentColor" /> {course.rating.toFixed(1)}
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
                {notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] group">
                    <StickyNote size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                    <p className="flex-1 text-sm text-[var(--color-text-secondary)]">{note}</p>
                    <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[var(--color-background-tertiary)] rounded">
                      <Copy size={14} className="text-[var(--color-text-tertiary)]" />
                    </button>
                  </div>
                ))}
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
          currentLessonId={currentLesson.id}
          completedIds={completedIds}
          onLessonSelect={(lesson) => { if (!lesson.isLocked) setCurrentLesson(lesson); }}
        />
      </aside>
    </div>
  );
}
