# 🎨 Font Usage Guide

## Font Strategy

This project uses **4 Google Fonts** to replace the original proprietary fonts (OV Soge and SF Pro Display) with accessible alternatives.

---

## Font Mapping

| Original Font | Replacement | Weights | Usage |
|---------------|-------------|---------|-------|
| **OV Soge** | **Outfit** | 400, 500, 600, 700, 800 | Headlines, hero text, section titles, brand elements |
| **SF Pro Display** | **Inter** | 300, 400, 500, 600, 700 | Body text, descriptions, paragraphs, labels |
| **Manrope** | **Manrope** (kept) | 400, 500, 600, 700, 800 | Navigation, buttons, CTAs, UI elements |
| **DM Sans** | **DM Sans** (kept) | 200-700 + italic | Stats counters, numeric displays, tags |

---

## Section-by-Section Font Assignment

### 🎯 **Outfit** (Primary Display Font)
Use for maximum visual impact:

- ✅ Hero headlines ("Reimagining Education")
- ✅ Section titles ("Power By Proven Numbers")
- ✅ Ticker text ("Inefficient", "Outdated", "Deprecated", "Stagnant")
- ✅ Major statements ("Education is not broken...")
- ✅ Initiative labels ("GCO", "Kronos", "Workshops", "Vouch")
- ✅ Footer brand text ("Ateion")
- ✅ FAQ section title ("Your Common Questions Answered")

**CSS Class:** `font-['Outfit:Semi_Bold',sans-serif]` or `font-['Outfit:Bold',sans-serif]`

---

### 📝 **Inter** (Primary Body Font)
Use for readable body content:

- ✅ Paragraph text ("Because marks measure memory...")
- ✅ Descriptions ("Ateion is the world's leading...")
- ✅ Explanatory text ("Ateion replaces memory-based validation...")
- ✅ Stats labels ("Institutions", "Students", "Alliances")
- ✅ Footer descriptions
- ✅ Modal/dialog content

**CSS Class:** `font-['Inter:Regular',sans-serif]` or `font-['Inter:Medium',sans-serif]`

---

### 🔘 **Manrope** (UI Font)
Use for interactive elements:

- ✅ Navigation buttons ("About Us", "Workshops", "GCO", "Learn")
- ✅ CTA buttons ("Get Connected", "Explore more")

**CSS Class:** `font-['Manrope:Bold',sans-serif]`

---

### 📊 **DM Sans** (Numbers & Stats)
Use for numeric displays:

- ✅ Counter numbers (200+, 50000+, 193+)
- ✅ Tags and labels
- ✅ Small annotations

**CSS Class:** `font-['DM_Sans:Bold',sans-serif]`

---

## Why These Replacements?

### Outfit → OV Soge
- **Geometric sans-serif** with modern tech aesthetic
- Similar **x-height** and **letter spacing**
- Excellent **web performance** (Google Fonts CDN)
- Full **weight range** available

### Inter → SF Pro Display
- **Near-identical metrics** to SF Pro Display
- Designed specifically for **computer screens**
- Exceptional **readability** at all sizes
- **Open source** and freely available

---

## Implementation

Fonts are loaded via Google Fonts CDN in `src/styles/fonts.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
```

---

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                    OUTFIT (Headlines)                   │
│  "Reimagining Education"                                │
├─────────────────────────────────────────────────────────┤
│  INTER (Body)                                           │
│  Ateion is the world's leading Capability-First         │
│  Education ecosystem...                                 │
├─────────────────────────────────────────────────────────┤
│  [MANROPE] [MANROPE] [MANROPE]  ← Navigation Buttons   │
├─────────────────────────────────────────────────────────┤
│  DM SANS: 200+  50000+  193+  ← Stats                  │
└─────────────────────────────────────────────────────────┘
```

---

## Notes

- All fonts are loaded from **Google Fonts CDN** for optimal performance
- Font weights match the original design intent
- No layout shifts expected (fonts have similar metrics)
- Fully **open source** and **production-ready**
