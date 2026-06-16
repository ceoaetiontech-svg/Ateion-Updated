import { Image as ImageIcon, Video, FileImage } from "lucide-react";
import { motion } from "framer-motion";

const mediaItems = [
  { Icon: ImageIcon, title: "Course Thumbnail", desc: "Square JPG/PNG (1:1)\nMax 2MB" },
  { Icon: FileImage, title: "Course Banner", desc: "Wide JPG/PNG (16:9)\nMax 5MB" },
  { Icon: Video, title: "Preview Video", desc: "Promo MP4 Video\nMax 100MB" },
];

export default function Step2Media() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mediaItems.map(({ Icon, title, desc }) => (
          <motion.div
            key={title}
            className="border-2 border-dashed border-[var(--color-border-medium)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[var(--color-background-tertiary)] hover:border-[var(--color-accent)] transition-all group"
            whileHover={{ y: -2 }}
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-primary)] flex items-center justify-center mb-4 border border-[var(--color-border-light)] group-hover:scale-110 transition-transform">
              <Icon size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]" />
            </div>
            <h4 className="font-semibold text-base mb-1">{title}</h4>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-4 whitespace-pre-line">{desc}</p>
            <button className="px-4 py-2 bg-[var(--color-background-primary)] border border-[var(--color-border-medium)] rounded-full text-xs font-semibold group-hover:border-[var(--color-accent)] transition-colors cursor-pointer">
              Browse Files
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
