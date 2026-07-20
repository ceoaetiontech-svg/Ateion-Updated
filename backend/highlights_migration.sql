-- ============================================================
-- Highlights Column Migration — Run in Supabase SQL Editor
-- ============================================================
-- Adds a `highlights` column to store up to 3 custom bullet
-- points for the course preview popover.
-- Stored as pipe-separated text: "Point 1|Point 2|Point 3"
-- ============================================================

ALTER TABLE courses
    ADD COLUMN IF NOT EXISTS highlights TEXT DEFAULT '';

COMMENT ON COLUMN courses.highlights IS
    'Pipe-separated bullet points shown in course preview popover. Example: "Build real apps|Master concepts|Hands-on labs"';
