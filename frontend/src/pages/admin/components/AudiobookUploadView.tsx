import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, CheckCircle, Upload, Plus, Trash2, Clock, Play } from "lucide-react";
import { useToast } from "../utils/toast";

interface ChapterFile {
  id: string;
  title: string;
  fileName: string;
}

interface TimestampMarker {
  id: string;
  title: string;
  time: string; // e.g. "05:30"
}

export default function AudiobookUploadView() {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("technology");
  const [creationMethod, setCreationMethod] = useState<"multi" | "single">("multi");
  const [loading, setLoading] = useState(false);

  // Cover Art States
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  // Upload Progress Sim States
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Bulk parser state
  const [bulkText, setBulkText] = useState("");
  const [showBulkImport, setShowBulkImport] = useState(false);

  // Method A state (Multi-chapters)
  const [chapters, setChapters] = useState<ChapterFile[]>([
    { id: "ch-1", title: "Chapter 1: Intro", fileName: "" }
  ]);

  // Method B state (Single file + timestamps)
  const [singleFileName, setSingleFileName] = useState("");
  const [markers, setMarkers] = useState<TimestampMarker[]>([
    { id: "m-1", title: "Introduction", time: "00:00" }
  ]);

  // Method A Actions
  const handleAddChapterRow = () => {
    setChapters([...chapters, { id: `ch-${Date.now()}`, title: "", fileName: "" }]);
  };

  const handleRemoveChapterRow = (id: string) => {
    setChapters(chapters.filter((ch) => ch.id !== id));
  };

  const handleChapterTitleChange = (id: string, text: string) => {
    setChapters(chapters.map((ch) => (ch.id === id ? { ...ch, title: text } : ch)));
  };

  // Method B Actions
  const handleAddMarker = () => {
    setMarkers([...markers, { id: `m-${Date.now()}`, title: "", time: "" }]);
  };

  const handleRemoveMarker = (id: string) => {
    setMarkers(markers.filter((m) => m.id !== id));
  };

  const handleMarkerChange = (id: string, field: "title" | "time", text: string) => {
    setMarkers(markers.map((m) => (m.id === id ? { ...m, [field]: text } : m)));
  };

  const handleParseBulkTimestamps = () => {
    if (!bulkText.trim()) {
      showToast("Please enter some timestamps to parse.", "error");
      return;
    }

    const lines = bulkText.split("\n");
    const parsedMarkers: TimestampMarker[] = [];
    const regex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—:]\s*(.+)/;

    lines.forEach((line) => {
      const match = line.match(regex);
      if (match) {
        parsedMarkers.push({
          id: `m-${Date.now()}-${Math.random()}`,
          time: match[1].trim(),
          title: match[2].trim(),
        });
      }
    });

    if (parsedMarkers.length === 0) {
      showToast("No valid timestamps found. Format should be '00:00 - Chapter Name'.", "error");
      return;
    }

    setMarkers(parsedMarkers);
    setBulkText("");
    setShowBulkImport(false);
    showToast(`Successfully parsed ${parsedMarkers.length} chapters!`, "success");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      showToast("Please fill in the title and author fields.", "error");
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setUploadStatus("Processing files...");

    const steps = [
      { progress: 20, status: "Compressing cover art..." },
      { progress: 50, status: "Uploading media track..." },
      { progress: 80, status: "Configuring chapter markers..." },
      { progress: 100, status: "Finalizing metadata..." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setUploadProgress(steps[currentStep].progress);
        setUploadStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
        setLoading(false);
        setUploadProgress(null);
        setUploadStatus("");
        showToast("Audiobook published successfully!", "success");
        // Reset form
        setTitle("");
        setAuthor("");
        setDescription("");
        setChapters([{ id: "ch-1", title: "Chapter 1: Intro", fileName: "" }]);
        setMarkers([{ id: "m-1", title: "Introduction", time: "00:00" }]);
        setSingleFileName("");
        setCoverFile(null);
        if (coverPreviewUrl) {
          URL.revokeObjectURL(coverPreviewUrl);
          setCoverPreviewUrl(null);
        }
      }
    }, 600);
  };

  return (
    <form onSubmit={handlePublish} className="space-y-8 pb-20">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2 tracking-tight text-[var(--color-text-primary)]">
            Create Audiobook
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Upload narrations and configure chapter details for the student audio library.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center justify-center gap-2 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] transition-all duration-350 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle size={18} />
          {loading ? "Publishing..." : "Publish Audiobook"}
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: General Info & Cover Dropzone */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="admin-card p-6 space-y-6">
            <h3 className="text-lg font-bold border-b border-[var(--color-border-light)] pb-3 flex items-center gap-2">
              <Headphones size={18} className="text-[var(--color-accent)]" />
              General Metadata
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g. Clean Code Audio Guide"
                  className="admin-input w-full px-4 py-2.5 rounded-xl outline-none text-sm text-[var(--color-text-primary)]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Author / Narrator</label>
                <input
                  type="text"
                  placeholder="e.g. Robert C. Martin"
                  className="admin-input w-full px-4 py-2.5 rounded-xl outline-none text-sm text-[var(--color-text-primary)]"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                placeholder="Brief summary of the audiobook..."
                className="admin-input w-full px-4 py-2.5 rounded-xl outline-none text-sm min-h-[100px] text-[var(--color-text-primary)]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  className="admin-input w-full px-4 py-2.5 rounded-xl outline-none text-sm text-[var(--color-text-primary)] cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="technology">Technology</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="science">Science</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sourcing Method Card */}
          <div className="admin-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[var(--color-border-light)] pb-3 gap-3">
              <h3 className="text-lg font-bold">Audio Chapter Sourcing</h3>
              
              {/* Method Switcher Toggle */}
              <div className="flex bg-[var(--color-background-primary)] border border-[var(--color-border-light)] rounded-xl p-0.75 text-xs font-semibold select-none">
                <button
                  type="button"
                  onClick={() => setCreationMethod("multi")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    creationMethod === "multi"
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  Separate Chapters
                </button>
                <button
                  type="button"
                  onClick={() => setCreationMethod("single")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    creationMethod === "single"
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  Single Track
                </button>
              </div>
            </div>

            {/* Method A: Multi Files Chapter Editor */}
            {creationMethod === "multi" ? (
              <div className="space-y-4">
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Upload a separate MP3/M4A audio file for each individual chapter.
                </p>

                <div className="space-y-3">
                  {chapters.map((ch, idx) => (
                    <div 
                      key={ch.id} 
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[var(--color-background-primary)]/40 p-4 border border-[var(--color-border-light)] rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] shrink-0 self-start sm:self-auto">
                        {idx + 1}
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Chapter Title"
                        className="admin-input flex-1 px-4 py-2 rounded-xl text-xs text-[var(--color-text-primary)] outline-none"
                        value={ch.title}
                        onChange={(e) => handleChapterTitleChange(ch.id, e.target.value)}
                      />

                      {/* File Uploader Input Mock */}
                      <div className="flex-1 relative flex items-center gap-2 px-3 py-2 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-xl text-xs cursor-pointer hover:bg-[var(--color-background-tertiary)]/20 transition-all">
                        <Upload size={14} className="text-[var(--color-accent)]" />
                        <span className="truncate opacity-80">{ch.fileName || "Upload Audio File..."}</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setChapters(chapters.map(c => c.id === ch.id ? { ...c, fileName: file.name } : c));
                            }
                          }}
                        />
                      </div>

                      {chapters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChapterRow(ch.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0 self-end sm:self-auto"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddChapterRow}
                  className="text-xs font-bold text-[var(--color-accent)] flex items-center gap-1 px-4 py-2 border border-dashed border-[var(--color-accent)]/30 rounded-xl hover:bg-[var(--color-accent)]/5 cursor-pointer mt-4"
                >
                  <Plus size={14} /> Add Chapter File
                </button>
              </div>
            ) : (
              /* Method B: Single File Upload + Timestamp configuration */
              <div className="space-y-6">
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Upload a single large audio track, then map the chapter start times.
                </p>

                {/* Primary Single Audio track upload Dropzone */}
                <div className="border-2 border-dashed border-[var(--color-border-light)] hover:border-[var(--color-accent)]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[var(--color-background-primary)]/20 hover:bg-[var(--color-background-tertiary)]/10 transition-all duration-200 group relative">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-3 border border-[var(--color-border-light)] group-hover:scale-105 transition-transform">
                    <Upload size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-[var(--color-text-primary)]">
                    {singleFileName || "Upload Audiobook Track"}
                  </h4>
                  <p className="text-xs text-[var(--color-text-tertiary)] max-w-xs">
                    Drag and drop one MP3/M4A master track here, or browse files.
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSingleFileName(file.name);
                    }}
                  />
                </div>

                {/* Chapters Timestamp Markers */}
                <div className="space-y-4 pt-4 border-t border-[var(--color-border-light)]/60">
                  <h4 className="text-sm font-bold flex items-center gap-1.5">
                    <Clock size={16} className="text-[var(--color-accent)]" />
                    Chapter Timestamp Markers
                  </h4>

                  {/* Collapsible Bulk Parser */}
                  <div className="bg-[var(--color-background-secondary)]/50 p-4 border border-[var(--color-border-light)]/60 rounded-2xl space-y-3">
                    <button
                      type="button"
                      onClick={() => setShowBulkImport(!showBulkImport)}
                      className="text-xs font-bold text-[var(--color-accent)] flex items-center gap-1 cursor-pointer"
                    >
                      {showBulkImport ? "Hide Bulk Import Tool" : "Bulk Import Timestamps..."}
                    </button>
                    
                    {showBulkImport && (
                      <div className="space-y-3 pt-2">
                        <textarea
                          placeholder="Paste timestamps here. Format:&#10;00:00 - Introduction&#10;04:30 - Chapter 1: Setup&#10;12:15 - Chapter 2: Coding"
                          className="admin-input w-full p-3 rounded-xl text-xs font-mono min-h-[120px] outline-none text-[var(--color-text-primary)] bg-[var(--color-background-primary)]"
                          value={bulkText}
                          onChange={(e) => setBulkText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleParseBulkTimestamps}
                            className="px-4 py-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-xl hover:opacity-90 cursor-pointer"
                          >
                            Parse & Populate Markers
                          </button>
                          <button
                            type="button"
                            onClick={() => { setShowBulkImport(false); setBulkText(""); }}
                            className="px-4 py-2 bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] text-xs font-bold rounded-xl cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {markers.map((m, idx) => (
                      <div key={m.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-background-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--color-text-secondary)] shrink-0 self-start sm:self-auto">
                          {idx + 1}
                        </div>

                        <input
                          type="text"
                          placeholder="Chapter Name"
                          className="admin-input flex-1 px-4 py-2 rounded-xl text-xs text-[var(--color-text-primary)] outline-none"
                          value={m.title}
                          onChange={(e) => handleMarkerChange(m.id, "title", e.target.value)}
                        />

                        <input
                          type="text"
                          placeholder="Start Time (e.g. 05:30)"
                          className="admin-input w-full sm:w-40 px-4 py-2 rounded-xl text-xs text-[var(--color-text-primary)] outline-none"
                          value={m.time}
                          onChange={(e) => handleMarkerChange(m.id, "time", e.target.value)}
                        />

                        {markers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMarker(m.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer shrink-0 self-end sm:self-auto"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddMarker}
                    className="text-xs font-bold text-[var(--color-accent)] flex items-center gap-1 px-4 py-2 border border-dashed border-[var(--color-accent)]/30 rounded-xl hover:bg-[var(--color-accent)]/5 cursor-pointer mt-4"
                  >
                    <Plus size={14} /> Add Timestamp Marker
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Cover Art Upload dropzone */}
        <div className="lg:col-span-1 admin-card p-6 space-y-4">
          <h3 className="text-sm font-bold border-b border-[var(--color-border-light)] pb-2">
            Audiobook Cover Art
          </h3>
          <div className="border-2 border-dashed border-[var(--color-border-light)] hover:border-[var(--color-accent)]/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-[var(--color-background-primary)]/20 hover:bg-[var(--color-background-tertiary)]/10 transition-all duration-200 group relative aspect-square overflow-hidden">
            {coverPreviewUrl ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5">
                <img src={coverPreviewUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1">
                  <Upload size={20} />
                  <span>Replace Image</span>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center mb-3 border border-[var(--color-border-light)] group-hover:scale-105 transition-transform">
                  <Upload size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
                </div>
                <h4 className="font-semibold text-xs mb-1 text-[var(--color-text-primary)]">
                  Upload Cover Image
                </h4>
                <p className="text-[10px] text-[var(--color-text-tertiary)] max-w-xs leading-relaxed">
                  Square Image (1:1 aspect ratio)<br/>PNG or JPG. Max 2MB
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCoverFile(file);
                  if (coverPreviewUrl) {
                    URL.revokeObjectURL(coverPreviewUrl);
                  }
                  setCoverPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </div>

      </div>

      {/* Upload Progress Overlay */}
      {loading && uploadProgress !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full border-4 border-[var(--color-border-light)] absolute inset-0" />
              <div className="w-full h-full rounded-full border-4 border-[var(--color-accent)] absolute inset-0 border-t-transparent animate-spin" />
              <Headphones size={28} className="text-[var(--color-accent)] relative z-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">Publishing Audiobook</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{uploadStatus}</p>
            </div>
            <div className="w-full bg-[var(--color-background-tertiary)] h-2.5 rounded-full overflow-hidden relative">
              <div 
                className="bg-[var(--color-accent)] h-full transition-all duration-350 ease-out" 
                style={{ width: `${uploadProgress}%` }} 
              />
            </div>
            <span className="text-xs font-bold text-[var(--color-accent)]">{uploadProgress}% Complete</span>
          </div>
        </div>
      )}
    </form>
  );
}
