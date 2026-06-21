# 📐 Ateion Frontend Coding & Design Guidelines

These guidelines define the standards for layouts, styling, components, and code structure in the Ateion frontend project.

---

## 🎨 General Layout Guidelines

1. **Prefer Responsive Layouts**: Avoid using hardcoded absolute positions (`absolute`, `top-[Xpx]`, `left-[Ypx]`) unless absolutely necessary (e.g., decorative background ornaments). By default, build layouts using **CSS Flexbox** and **CSS Grid**.
2. **Spacing & Sizing**:
   - Use standard padding and margin increments (prefer multiples of `4px` / `8px` or Tailwind spacing scales).
   - Ensure component outer containers do not enforce hardcoded widths unless specifying a max-width; components should adapt to their parent container's layout.
3. **Typography**: Always assign fonts according to their category mapping. Refer to [FONT-GUIDE.md](../docs/FONT-GUIDE.md) for full mappings:
   - **Outfit** for major headers, heroes, and prominent brand words.
   - **Inter** for body copy and general description blocks.
   - **Manrope** for navigation, UI actions, and button text.
   - **DM Sans** for numeric displays, badges, statistics counters, and tags.

---

## 🧩 Component & React Standards

1. **Granularity**: Keep file sizes small. Extract sub-components and helper functions into separate files or subfolders rather than nesting them all in a single large file.
2. **Primitive Reusability**:
   - Build UI components using the custom primitives in `src/app/components/ui/` (built on top of shadcn/ui and Radix UI).
   - Avoid creating ad-hoc, duplicate styled elements (like custom input boxes or buttons) when standard primitive options already exist.
3. **Dynamic State & Hooks**:
   - Keep page-level layouts focused on composition.
   - Put repeated logic (timers, viewport tracking, mouse movements) into custom hooks located in `src/app/components/hooks/`.

---

## 💅 Styling Practices

1. **Tailwind and Custom CSS**:
   - Combine Tailwind utility classes with modular custom CSS where necessary to avoid cluttering JSX files.
   - Store generic layout/color design tokens in `src/styles/design-tokens.css` and font classes in `src/styles/fonts.css`.
2. **Background Colors**: Keep background shades consistent across all pages. The base neutral light shade for the Ateion canvas is `#f7f3eb`. Do not inject darker beige variations (like `#f3efe7`) unless explicitly styling card boundaries or section splits.
3. **Buttons**:
   - **Primary Button**: Filled with the primary brand accent, with a height of `36px` and padding of `20px` x-axis.
   - **Secondary Button**: Outlined border with transparent background.
   - **Muted/Ghost Button**: Borderless text-only interactions.
