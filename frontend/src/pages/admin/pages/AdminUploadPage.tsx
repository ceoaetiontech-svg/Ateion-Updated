import { motion } from "framer-motion";
import CourseUploadViewYoutube from "../components/CourseUploadView";
import CourseUploadViewForm from "../components/courses/CourseUploadView";
import AudiobookUploadView from "../components/AudiobookUploadView";

export default function AdminUploadPage() {
  return (
    <motion.div
      className="pb-20"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hidden Radio Inputs for Tab State */}
      <input
        type="radio"
        id="method-manual"
        name="upload-method"
        className="hidden"
        defaultChecked
      />
      <input
        type="radio"
        id="method-youtube"
        name="upload-method"
        className="hidden"
      />
      <input
        type="radio"
        id="method-audiobook"
        name="upload-method"
        className="hidden"
      />

      {/* Tab Switcher Bar */}
      <div className="tab-container flex p-1 bg-[var(--color-background-secondary)] rounded-xl border border-[var(--color-border-light)] w-full max-w-2xl mb-8 shadow-sm">
        <label
          htmlFor="method-manual"
          className="manual-label flex-1 text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--color-text-secondary)] cursor-pointer select-none transition-all duration-200 hover:text-[var(--color-text-primary)]"
        >
          Manual Course Builder
        </label>
        <label
          htmlFor="method-youtube"
          className="youtube-label flex-1 text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--color-text-secondary)] cursor-pointer select-none transition-all duration-200 hover:text-[var(--color-text-primary)]"
        >
          YouTube Playlist Importer
        </label>
        <label
          htmlFor="method-audiobook"
          className="audiobook-label flex-1 text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-[var(--color-text-secondary)] cursor-pointer select-none transition-all duration-200 hover:text-[var(--color-text-primary)]"
        >
          Audiobook Manager
        </label>
      </div>

      {/* Manual Course Builder Content */}
      <div className="content-manual">
        <CourseUploadViewForm onUploadSuccess={() => {}} />
      </div>

      {/* YouTube Importer Content */}
      <div className="content-youtube">
        <CourseUploadViewYoutube onUploadSuccess={() => {}} />
      </div>

      {/* Audiobook Manager Content */}
      <div className="content-audiobook">
        <AudiobookUploadView />
      </div>
    </motion.div>
  );
}
