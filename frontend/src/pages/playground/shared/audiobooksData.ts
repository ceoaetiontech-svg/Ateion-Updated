import { type IAudiobook } from "./types";

export const mockAudiobooks: IAudiobook[] = [
  {
    id: "ab-system-design",
    title: "Understanding Distributed Systems",
    author: "Dr. Elena Vance",
    description: "A comprehensive guide to scaling services, designing fault-tolerant architectures, and understanding core consensus protocols in modern distributed environments.",
    coverUrl: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    category: "Technology",
    duration: 5400, // 1.5 hours
    isSingleFile: false,
    createdAt: new Date().toISOString(),
    chapters: [
      {
        id: "c1-sys",
        title: "Chapter 1: Network Primitives & Latency",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 1800,
      },
      {
        id: "c2-sys",
        title: "Chapter 2: Replication & Fault Tolerance",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 1800,
      },
      {
        id: "c3-sys",
        title: "Chapter 3: Consensus & CAP Theorem",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 1800,
      }
    ]
  },
  {
    id: "ab-stoic-mind",
    title: "The Stoic Mindset for Engineers",
    author: "Marcus Aurel",
    description: "Apply ancient philosophical principles to modern tech challenges. Learn to manage production stress, handle feedback, and maintain clarity amidst chaos.",
    coverUrl: "linear-gradient(135deg, #d97706 0%, #dc2626 100%)",
    category: "Philosophy",
    duration: 3600, // 1 hour
    isSingleFile: true,
    createdAt: new Date().toISOString(),
    chapters: [
      {
        id: "c1-stoic",
        title: "Introduction & Context",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 600,
        startTimestamp: 0
      },
      {
        id: "c2-stoic",
        title: "The Dichotomy of Control in Debugging",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 1200,
        startTimestamp: 600
      },
      {
        id: "c3-stoic",
        title: "Handling Production Downtime Stoically",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 1800,
        startTimestamp: 1800
      }
    ]
  },
  {
    id: "ab-future-ai",
    title: "AI & The Next Human Era",
    author: "Sarah Jenkins",
    description: "An inquiry into how agentic systems and deep models are rewriting the cognitive and mechanical tasks of the next century, and what humans must learn to adapt.",
    coverUrl: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    category: "Science",
    duration: 4800, // 1h 20m
    isSingleFile: false,
    createdAt: new Date().toISOString(),
    chapters: [
      {
        id: "c1-ai",
        title: "Chapter 1: The Spark of Reasoning",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: 2400,
      },
      {
        id: "c2-ai",
        title: "Chapter 2: Multi-Agent Collaboration",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: 2400,
      }
    ]
  }
];
