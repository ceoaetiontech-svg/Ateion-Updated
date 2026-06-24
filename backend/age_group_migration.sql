-- ============================================================
-- Age Group Migration — Run this in your Supabase SQL Editor
-- ============================================================
-- Adds a new `age_group` column to the `courses` table.
-- This is SEPARATE from `age_segment` (which stores skill level).
-- age_group stores: "Sproutlings (5-7 age)", "Saplings (7-14 age)",
--                   "Pathfinders (14-18 age)", "Dreamers (18+ age)"
-- Multiple values are stored comma-separated, e.g.:
--   "Sproutlings (5-7 age), Saplings (7-14 age)"
-- ============================================================

ALTER TABLE courses
    ADD COLUMN IF NOT EXISTS age_group TEXT DEFAULT '';

-- Optional: Add a comment to document the column
COMMENT ON COLUMN courses.age_group IS
    'Comma-separated age group targeting: Sproutlings (5-7 age), Saplings (7-14 age), Pathfinders (14-18 age), Dreamers (18+ age)';
