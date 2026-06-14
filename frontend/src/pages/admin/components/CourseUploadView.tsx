import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Save, Video, Search } from "lucide-react";
import { Link } from "react-router";

export default function CourseUploadView({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("technology");
  const [ageSegment, setAgeSegment] = useState("All Levels");
  const [price, setPrice] = useState("0");
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    if (!playlistUrl) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/import/youtube/preview?playlistUrl=${encodeURIComponent(playlistUrl)}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to preview");
      const data = await res.json();
      setPreviewData(data);
      if (!title) setTitle(data.playlistTitle);
    } catch (err) {
      alert("Error fetching preview. Ensure playlist is unlisted or public.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!previewData) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/import/youtube/publish`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description, ageSegment, category, price, previewData })
      });
      if (!res.ok) {
        if (res.status === 409) throw new Error("This playlist has already been imported.");
        throw new Error("Failed to publish");
      }
      alert("Course Published Successfully!");
      onUploadSuccess();
    } catch (err: any) {
      alert(err.message || "Error publishing course.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <motion.div className="pb-20">
        <Link to="/admin/courses" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Courses
        </Link>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">Import YouTube Playlist</h2>
            <p className="text-[var(--color-text-secondary)]">Import an unlisted YouTube playlist to create a new ecosystem course.</p>
          </div>
          <button onClick={handlePublish} disabled={loading || !previewData} className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 transition-all hover:scale-[1.03]">
            <CheckCircle size={18} /> {loading ? "Processing..." : "Publish Course Live"}
          </button>
        </div>

        <div className="admin-glass-card space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">YouTube Playlist URL</label>
            <div className="flex gap-4">
              <input
                  type="text"
                  placeholder="https://youtube.com/playlist?list=..."
                  className="admin-input flex-1 px-4 py-3 rounded-xl outline-none focus:border-[var(--color-accent)]"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
              />
              <button onClick={handlePreview} disabled={loading} className="px-6 py-3 bg-[var(--color-text-primary)] text-[var(--color-background-primary)] rounded-xl font-bold flex items-center gap-2 hover:opacity-90">
                <Search size={18} /> Preview
              </button>
            </div>
          </div>

          {previewData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--color-border-light)]">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Course Title</label>
                    <input type="text" className="admin-input w-full px-4 py-3 rounded-xl outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea className="admin-input w-full px-4 py-3 rounded-xl h-24 outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <div className="p-4 bg-[var(--color-background-primary)] rounded-2xl border border-[var(--color-border-light)]">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><Video size={18} className="text-[var(--color-accent)]"/> Preview Found ({previewData.totalVideos} Videos)</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {previewData.videos.map((vid: any) => (
                        <div key={vid.videoId} className="text-sm bg-[var(--color-background-secondary)] p-3 rounded-lg flex gap-3 truncate border border-[var(--color-border-light)]">
                          <span className="font-bold text-[var(--color-accent)]">{vid.playlistOrder}.</span> {vid.title}
                        </div>
                    ))}
                  </div>
                </div>
              </div>
          )}
        </div>
      </motion.div>
  );
}