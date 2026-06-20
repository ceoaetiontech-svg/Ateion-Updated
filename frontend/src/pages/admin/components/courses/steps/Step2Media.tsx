import { Image as ImageIcon, Video, FileImage, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "../../../utils/toast";

interface Step2MediaProps {
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  thumbnailPreview: string | null;
  setThumbnailPreview: (url: string | null) => void;
  bannerFile: File | null;
  setBannerFile: (file: File | null) => void;
  bannerPreview: string | null;
  setBannerPreview: (url: string | null) => void;
  videoFile: File | null;
  setVideoFile: (file: File | null) => void;
}

export default function Step2Media({
  thumbnailFile,
  setThumbnailFile,
  thumbnailPreview,
  setThumbnailPreview,
  bannerFile,
  setBannerFile,
  bannerPreview,
  setBannerPreview,
  videoFile,
  setVideoFile,
}: Step2MediaProps) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState<{ [key: string]: boolean }>({});
  const { showToast } = useToast();

  const validateFile = (file: File, key: string): boolean => {
    if (key === "thumbnail") {
      if (!file.type.startsWith("image/")) {
        showToast("Thumbnail must be an image (JPG/PNG).", "error");
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast("Thumbnail size exceeds 2MB limit.", "error");
        return false;
      }
    } else if (key === "banner") {
      if (!file.type.startsWith("image/")) {
        showToast("Banner must be an image (JPG/PNG).", "error");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("Banner size exceeds 5MB limit.", "error");
        return false;
      }
    } else if (key === "video") {
      if (!file.type.startsWith("video/")) {
        showToast("Preview must be a video file (MP4/MKV).", "error");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        showToast("Video size exceeds 100MB limit.", "error");
        return false;
      }
    }
    return true;
  };

  const handleDrag = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [key]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDrop = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [key]: false }));

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!validateFile(file, key)) return;
      if (key === "thumbnail") {
        setThumbnailFile(file);
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(URL.createObjectURL(file));
      } else if (key === "banner") {
        setBannerFile(file);
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setBannerPreview(URL.createObjectURL(file));
      } else if (key === "video") {
        setVideoFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateFile(file, key)) {
        e.target.value = "";
        return;
      }
      if (key === "thumbnail") {
        setThumbnailFile(file);
        if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailPreview(URL.createObjectURL(file));
      } else if (key === "banner") {
        setBannerFile(file);
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setBannerPreview(URL.createObjectURL(file));
      } else if (key === "video") {
        setVideoFile(file);
      }
    }
  };

  const removeFile = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    if (key === "thumbnail") {
      setThumbnailFile(null);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    } else if (key === "banner") {
      setBannerFile(null);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerPreview(null);
    } else if (key === "video") {
      setVideoFile(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thumbnail Card */}
        <motion.div
          onClick={() => thumbnailInputRef.current?.click()}
          onDragEnter={(e) => handleDrag(e, "thumbnail")}
          onDragLeave={(e) => handleDrag(e, "thumbnail")}
          onDragOver={(e) => handleDrag(e, "thumbnail")}
          onDrop={(e) => handleDrop(e, "thumbnail")}
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group relative aspect-square overflow-hidden ${
            dragActive["thumbnail"] ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]/20"
          }`}
          whileHover={{ y: -2 }}
        >
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "thumbnail")}
          />
          {thumbnailPreview ? (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[var(--color-background-primary)]">
              <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-2">
                <Upload size={18} />
                <span>Change Thumbnail</span>
                <button
                  onClick={(e) => removeFile(e, "thumbnail")}
                  className="mt-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  title="Remove Thumbnail"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]/40 group-hover:scale-110 transition-transform">
                <ImageIcon size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
              </div>
              <h4 className="font-semibold text-base mb-1 text-[var(--color-text-primary)]">Course Thumbnail</h4>
              <p className="text-xs text-[var(--color-text-tertiary)] mb-4 leading-relaxed">Square JPG/PNG (1:1)<br />Max 2MB</p>
              <button className="px-4 py-2 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-secondary)] rounded-full text-xs font-semibold hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)] transition-all cursor-pointer group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)]">
                Browse Files
              </button>
            </>
          )}
        </motion.div>

        {/* Banner Card */}
        <motion.div
          onClick={() => bannerInputRef.current?.click()}
          onDragEnter={(e) => handleDrag(e, "banner")}
          onDragLeave={(e) => handleDrag(e, "banner")}
          onDragOver={(e) => handleDrag(e, "banner")}
          onDrop={(e) => handleDrop(e, "banner")}
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group relative aspect-square overflow-hidden ${
            dragActive["banner"] ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]/20"
          }`}
          whileHover={{ y: -2 }}
        >
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e, "banner")}
          />
          {bannerPreview ? (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[var(--color-background-primary)]">
              <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-2">
                <Upload size={18} />
                <span>Change Banner</span>
                <button
                  onClick={(e) => removeFile(e, "banner")}
                  className="mt-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  title="Remove Banner"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]/40 group-hover:scale-110 transition-transform">
                <FileImage size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
              </div>
              <h4 className="font-semibold text-base mb-1 text-[var(--color-text-primary)]">Course Banner</h4>
              <p className="text-xs text-[var(--color-text-tertiary)] mb-4 leading-relaxed">Wide JPG/PNG (16:9)<br />Max 5MB</p>
              <button className="px-4 py-2 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-secondary)] rounded-full text-xs font-semibold hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)] transition-all cursor-pointer group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)]">
                Browse Files
              </button>
            </>
          )}
        </motion.div>

        {/* Preview Video Card */}
        <motion.div
          onClick={() => videoInputRef.current?.click()}
          onDragEnter={(e) => handleDrag(e, "video")}
          onDragLeave={(e) => handleDrag(e, "video")}
          onDragOver={(e) => handleDrag(e, "video")}
          onDrop={(e) => handleDrop(e, "video")}
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group relative aspect-square overflow-hidden ${
            dragActive["video"] ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5" : "border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-background-tertiary)]/20"
          }`}
          whileHover={{ y: -2 }}
        >
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/mkv,video/x-m4v"
            className="hidden"
            onChange={(e) => handleFileChange(e, "video")}
          />
          {videoFile ? (
            <div className="flex flex-col items-center justify-center p-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-500">
                <Video size={28} />
              </div>
              <h4 className="font-semibold text-base mb-1 text-[var(--color-text-primary)]">Video Selected</h4>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium max-w-full truncate px-2">{videoFile.name}</p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">{formatSize(videoFile.size)}</p>
              <button
                onClick={(e) => removeFile(e, "video")}
                className="mt-4 px-4 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Remove Video"
              >
                <Trash2 size={12} /> Remove Video
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)]/40 group-hover:scale-110 transition-transform">
                <Video size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-200" />
              </div>
              <h4 className="font-semibold text-base mb-1 text-[var(--color-text-primary)]">Preview Video</h4>
              <p className="text-xs text-[var(--color-text-tertiary)] mb-4 leading-relaxed">Promo MP4 Video<br />Max 100MB</p>
              <button className="px-4 py-2 bg-[var(--color-background-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-secondary)] rounded-full text-xs font-semibold hover:bg-[var(--color-background-tertiary)]/40 hover:text-[var(--color-text-primary)] transition-all cursor-pointer group-hover:border-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)]">
                Browse Files
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
