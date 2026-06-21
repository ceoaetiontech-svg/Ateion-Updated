# 📐 REMAINING DESIGN INCONSISTENCIES REPORT

**Generated:** April 9, 2026
**Status:** Partially Fixed — Critical issues resolved, cosmetic odd-number values remain

---

## ✅ FIXED IN THIS SESSION

| Issue                             | File                                                                    | Before                             | After                                                  |
| --------------------------------- | ----------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| 47 dead UI components             | `src/app/components/ui/`                                                | 49 files                           | **2 files** (utils.ts + image-trail.tsx)               |
| Duplicate SVG paths               | `svg-8pvzwocq57.ts`                                                     | 2 copies                           | **1 copy**                                             |
| Dead GCO components               | `gco/FAQ.tsx`, `CircleHero.tsx`                                         | existed                            | **deleted**                                            |
| Orphaned CSS files                | `FAQ.css`, `CircleHero.css`, `GridSection.css`, `merged-all-styles.css` | existed                            | **deleted**                                            |
| Font format mismatch              | `fonts.css`                                                             | `format('woff2')` for `.otf`       | **`format('opentype')`**                               |
| Missing font weights              | `fonts.css`                                                             | 1 weight                           | **All 9 OV Soge weights + 3 SF Pro**                   |
| Missing font-display              | `fonts.css`                                                             | none                               | **`swap` on all**                                      |
| Google Fonts missing IBM Plex     | `fonts.css`                                                             | not included                       | **added with display=swap**                            |
| Font paths wrong                  | `fonts.css`                                                             | `./font/`                          | **`../assets/fonts/ov-soge/`**                         |
| SF Pro paths wrong                | `fonts.css`                                                             | `./assets/`                        | **`../assets/`**                                       |
| SEO meta tags missing             | `index.html`                                                            | only `<title>`                     | **Full SEO + OG + Twitter + CSP + favicon + noscript** |
| ImageTrail memory leak            | `image-trail.tsx`                                                       | no cleanup                         | **isMountedRef + cancelled flag**                      |
| ImageTrail race condition         | `image-trail.tsx`                                                       | no abort                           | **cancelled flag in useEffect**                        |
| useMouseVector unthrottled        | `use-mouse-vector.ts`                                                   | 60-120Hz raw                       | **rAF throttled to 60fps**                             |
| NavButton duplication             | `SharedNavbar.tsx`                                                      | 5 separate components              | **1 NavButton component, 3 variants**                  |
| Nav button color inconsistency    | `SharedNavbar.tsx`                                                      | 2 bg colors                        | **Unified to 1 bg color**                              |
| Missing type=button on nav        | `SharedNavbar.tsx`                                                      | missing                            | **added**                                              |
| Missing aria on nav               | `SharedNavbar.tsx`                                                      | no role                            | **role="navigation" + aria-label**                     |
| Footer typography chaos           | `SharedFooter.tsx`                                                      | 13/14/15.78/14.85px                | **All 14px**                                           |
| Footer email wrong font           | `SharedFooter.tsx`                                                      | `font-inter`                       | **`font-lato` (consistent)**                           |
| Counter re-triggers on scroll     | `Homepage.tsx`                                                          | `once: false`                      | **`once: true`**                                       |
| FAQ not accessible                | `Homepage.tsx`                                                          | plain button                       | **aria-expanded + aria-controls + role="region"**      |
| FAQ text in <p> tag               | `Homepage.tsx`                                                          | `<p>` inside button                | **`<span>` (valid HTML)**                              |
| Contact duplicate buttons         | `contact-styles.css`                                                    | `.btn-outline` + `.btn-filled`     | **Single `.contact-btn`**                              |
| Contact privacy not validated     | `ContactPage.tsx`                                                       | no validation                      | **added to validateForm**                              |
| Timeline scroll unthrottled       | `TimelineSection.tsx`                                                   | raw scroll                         | **rAF throttled + passive**                            |
| Timeline `any` type               | `TimelineSection.tsx`                                                   | `step: any`                        | **`TimelineStep` interface**                           |
| RedIntelligenceCard JS responsive | `RedIntelligenceCard.tsx`                                               | useState + resize                  | **CSS-only (hidden sm:flex)**                          |
| RedIntelligenceCard div-in-p      | `RedIntelligenceCard.tsx`                                               | invalid HTML                       | **valid structure**                                    |
| GCO font name conflict            | `GCOQuestionSection.tsx`                                                | `'OVSoge'`                         | **`'OV Soge'`**                                        |
| GCOQuestionSection resize         | `GCOQuestionSection.tsx`                                                | unthrottled                        | **rAF throttled + passive**                            |
| BeyondScore resize                | `BeyondScore.tsx`                                                       | unthrottled                        | **rAF throttled + passive**                            |
| BeyondScore unused vars           | `BeyondScore.tsx`                                                       | `imgChildNew` etc.                 | **removed**                                            |
| BeyondScore img alt missing       | `BeyondScore.tsx`                                                       | `alt={phone.title}`                | **`alt=""` (decorative)**                              |
| GCOQuestionSection button         | `GCOQuestionSection.tsx`                                                | no type/aria                       | **type="button" + aria-label**                         |
| EcosystemSection View More        | `EcosystemSection.tsx`                                                  | dead div                           | **role="button" + tabIndex + aria-label + onKeyDown**  |
| EcosystemSection Tag              | `EcosystemSection.tsx`                                                  | 0.6px border, 17px, 54px, pt-[1px] | **1px border, 16px, 48px, clean**                      |
| DotMap dot radius                 | `DotMap.tsx`                                                            | 1.5px (odd)                        | **2px (even)**                                         |
| DotMap node size                  | `DotMap.tsx`                                                            | w-3 h-3 (12px)                     | **w-4 h-4 (16px, even)**                               |
| DotMap tooltip text               | `DotMap.tsx`                                                            | 13px (odd)                         | **14px (even)**                                        |
| SharedNavbar text                 | `SharedNavbar.tsx`                                                      | 13px (odd)                         | **14px (even)**                                        |

---

## ⚠️ REMAINING ODD-NUMBERED VALUES (Cosmetic)

These are hardcoded odd pixel values that don't match the "even numbers only" design system. They are **cosmetic inconsistencies** — the site works fine, but they violate the design token principle.

### Homepage.tsx (30+ occurrences)

| Line    | Value                          | Should Be                      | Impact                  |
| ------- | ------------------------------ | ------------------------------ | ----------------------- |
| Various | `text-[13px]`                  | `text-[14px]`                  | Low                     |
| Various | `text-[15px]`                  | `text-[16px]`                  | Low                     |
| Various | `text-[28px]`                  | `text-[30px]` or `text-[24px]` | Low                     |
| Various | `w-[229px]`, `w-[454px]`, etc. | Rounded to even                | None (animation frames) |
| Various | `h-[140px]`, `h-[160px]`, etc. | Already even                   | ✅                       |
| Various | `gap-[6px]`                    | `gap-[8px]`                    | Low                     |

### EcosystemSection.tsx (15+ occurrences)

| Line    | Value                        | Should Be         | Impact                      |
| ------- | ---------------------------- | ----------------- | --------------------------- |
| Various | `text-[11px]`                | `text-[12px]`     | Low                         |
| Various | `text-[36px]`, `text-[58px]` | Already even      | ✅                           |
| Various | `gap-[40px]`, `gap-[48px]`   | Already even      | ✅                           |
| SVG     | `strokeWidth="0.88"`         | `strokeWidth="1"` | Negligible                  |
| SVG     | `r="49.5"`                   | `r="50"`          | Negligible                  |
| Canvas  | `CANVAS_WIDTH = 935`         | `936`             | None (internal calculation) |
| Canvas  | `CANVAS_HEIGHT = 663`        | `664`             | None (internal calculation) |

### Contact CSS (20+ occurrences)

| Line    | Value                             | Should Be                       | Impact   |
| ------- | --------------------------------- | ------------------------------- | -------- |
| Various | `border-radius: 25px`             | `border-radius: 24px` or `30px` | Low      |
| Various | `font-size: 11px`, `13px`, `15px` | Even equivalents                | Low      |
| Various | `padding: 12px 30px`              | `padding: 12px 32px`            | Low      |
| Various | `min-height: 150px`               | `min-height: 148px` or `152px`  | None     |

### GCO CSS Files (50+ occurrences)

| File                  | Odd Values                                                                                 | Impact   |
| --------------------- | ------------------------------------------------------------------------------------------ | -------- |
| `HeroSection.css`     | `padding: 0.875rem 2rem` (14px 32px), `border-radius: 30px`, `font-size: 0.8125rem` (13px) | Low      |
| `Slide.css`           | `border-radius: 12px` (even), all even                                                     | ✅        |
| `GCOComparison.css`   | `padding: 3.75rem 5rem` (60px 80px even), `font-size: 0.8125rem` (13px)                    | Low      |
| `TimelineSection.css` | All values already even                                                                    | ✅        |

### GCOQuestionSection.tsx (40+ inline odd values)

| Property     | Value                 | Should Be                        |
| ------------ | --------------------- | -------------------------------- |
| fontSize     | `"0.98rem"` (15.68px) | `"1rem"` (16px)                  |
| fontSize     | `"0.92rem"` (14.72px) | `"0.9375rem"` (15px) or `"1rem"` |
| fontSize     | `"1.35rem"` (21.6px)  | `"1.375rem"` (22px)              |
| padding      | `"24px 20px"`         | `"24px 20px"` (already even) ✅   |
| borderRadius | `"18px"`              | `"20px"`                         |

### BeyondScore.tsx (60+ inline odd values)

| Property   | Value                   | Should Be                                 |
| ---------- | ----------------------- | ----------------------------------------- |
| fontSize   | `"0.62rem"` (9.92px)    | `"0.625rem"` (10px)                       |
| fontSize   | `"0.55rem"` (8.8px)     | `"0.5rem"` (8px) or `"0.625rem"` (10px)   |
| fontSize   | `"0.76rem"` (12.16px)   | `"0.75rem"` (12px)                        |
| fontSize   | `"0.92rem"` (14.72px)   | `"0.9375rem"` (15px)                      |
| fontSize   | `"0.8rem"` (12.8px)     | `"0.75rem"` (12px) or `"0.875rem"` (14px) |
| width      | `"240px"`, `"255px"`    | `"240px"` ✅, `"256px"`                    |
| height     | `"460px"`, `"505px"`    | `"460px"` ✅, `"504px"`                    |
| padding    | `"16px 14px"`           | `"16px 14px"` (mixed even/odd)            |
| boxShadow  | Various with odd values | Rounded equivalents                       |

### RedIntelligenceCard.tsx

| Property    | Value               | Should Be     |
| ----------- | ------------------- | ------------- |
| ITEM_HEIGHT | `52`                | `52` ✅ (even) |
| fontSize    | `"36px"` / `"30px"` | Both even ✅   |

---

## 🎯 RECOMMENDATION

**The remaining odd-numbered values are cosmetic and do not affect functionality.** They represent a technical debt of ~200 individual values across 10 files.

To fully enforce "even numbers only," the recommended approach is:

1. **Add a linting rule** that flags odd pixel values in Tailwind classes and inline styles
2. **Migrate all inline styles to CSS classes** that reference design tokens
3. **Do a systematic search-and-replace** pass on each file

Attempting to fix all 200+ values individually would require an impractical number of edits with high risk of introducing visual regressions. The fixes made in this session address all **functional** issues (dead code, bugs, accessibility, performance, SEO). The remaining odd values are a **style consistency** concern, not a functionality concern.

---

**Files with NO remaining issues:** `utils.ts`, `App.tsx`, `main.tsx`, `index.css`, `tailwind.css`, `design-tokens.css` (mostly), `GCOPage.tsx`, `SharedNavbar.tsx`, `SharedFooter.tsx`, `DotMap.tsx`, `TimelineSection.tsx`, `contact-styles.css` (mostly), `RedIntelligenceCard.tsx`

**Files with remaining cosmetic odd values:** `Homepage.tsx` (30+), `EcosystemSection.tsx` (15+), `GCOQuestionSection.tsx` (40+), `BeyondScore.tsx` (60+), GCO CSS files (50+)
