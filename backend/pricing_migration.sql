-- ============================================================
-- ATEION — Pricing v2 Migration
-- Run this SQL in your Supabase SQL Editor to enable full
-- pricing features (original price, selling price, discount).
--
-- HOW TO RUN:
-- 1. Open https://supabase.com/dashboard
-- 2. Select your project → SQL Editor
-- 3. Paste this entire file and click "Run"
-- ============================================================

-- Step 1: Add the new pricing columns (safe - uses IF NOT EXISTS)
ALTER TABLE courses
    ADD COLUMN IF NOT EXISTS original_price      DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS selling_price       DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS discount_percentage DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS currency            VARCHAR(10)  DEFAULT 'INR',
    ADD COLUMN IF NOT EXISTS button_text         VARCHAR(255) DEFAULT 'Unlock Course';

-- Step 2: Verify the columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'courses'
  AND column_name IN ('original_price','selling_price','discount_percentage','currency','button_text')
ORDER BY column_name;

-- ============================================================
-- AFTER running this SQL, do ONE more thing in the Java code:
-- In Course.java, change all 5 pricing field annotations
-- from @Transient  →  @Column
-- Then rebuild and restart the backend.
-- ============================================================
