-- ============================================================
-- Category Cleanup Migration — Run this in Supabase SQL Editor
-- ============================================================
-- This cleans up old category ID values (e.g. "technology",
-- "business") that were stored by the old CourseUploadView.
-- Maps them to the correct display names used by the frontend
-- category pill filters.
-- ============================================================

-- Step 1: Normalize old category IDs to new display names
UPDATE courses SET category = 
  CASE 
    WHEN LOWER(category) = 'technology'            THEN 'AI'
    WHEN LOWER(category) = 'business'              THEN 'Finance'
    WHEN LOWER(category) = 'design'                THEN 'Art'
    WHEN LOWER(category) = 'science'               THEN 'Advanced Skills'
    WHEN LOWER(category) = 'university'            THEN 'Advanced Skills'
    WHEN LOWER(category) = 'advance skills'        THEN 'Advanced Skills'
    WHEN LOWER(category) = 'technology & engineering' THEN 'AI'
    WHEN LOWER(category) = 'business & management' THEN 'Finance'
    WHEN LOWER(category) = 'design & arts'         THEN 'Art'
    WHEN LOWER(category) = 'applied sciences'      THEN 'Advanced Skills'
    WHEN LOWER(category) = 'university students'   THEN 'Advanced Skills'
    WHEN LOWER(category) = 'general'               THEN ''
    ELSE category  -- keep as-is if already a valid pill name
  END
WHERE category IS NOT NULL;

-- Step 2: Check what categories exist after cleanup
SELECT category, COUNT(*) as course_count 
FROM courses 
GROUP BY category 
ORDER BY course_count DESC;
