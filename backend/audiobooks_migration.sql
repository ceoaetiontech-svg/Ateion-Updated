-- ============================================================
-- Audiobook Tables Migration
-- Run this in: Supabase → SQL Editor → New Query → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS audiobooks (
    id          BIGSERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    author      TEXT DEFAULT '',
    description TEXT DEFAULT '',
    category    TEXT DEFAULT 'Technology',
    cover_url   TEXT DEFAULT '',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audiobook_chapters (
    id                BIGSERIAL PRIMARY KEY,
    audiobook_id      BIGINT REFERENCES audiobooks(id) ON DELETE CASCADE,
    title             TEXT NOT NULL,
    youtube_video_id  TEXT NOT NULL,
    duration_seconds  INTEGER DEFAULT 0,
    sort_order        INTEGER DEFAULT 0,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by audiobook
CREATE INDEX IF NOT EXISTS idx_audiobook_chapters_audiobook_id
    ON audiobook_chapters(audiobook_id);
