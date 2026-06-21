# 🎨 Ateion Frontend — React + Vite App

This is the React frontend for the Ateion platform, generated from the Figma design, refactored to support state management, API integration, routing, and dynamic interactions.

---

## 🏗️ Directory Structure

```
frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── app/
│   │   ├── App.tsx              # Root app component (Routing & Layouts)
│   │   └── components/
│   │       ├── ui/              # shadcn/ui custom primitives
│   │       ├── figma/           # Figma-compatible layout components
│   │       ├── hooks/           # Custom React hooks (use-interval, use-mouse-vector, etc.)
│   │       └── SharedNavbar/SharedFooter.tsx  # Shared layouts
│   ├── pages/                   # Main page layouts (Homepage.tsx, GCOPage.tsx, etc.)
│   ├── features/                # Domain-specific feature modules
│   ├── lib/                     # API client, YouTube integration, validation schemas
│   ├── data/                    # Local mocks and static policies
│   ├── assets/                  # Static images, SVG maps, and fonts
│   └── styles/                  # CSS styles, design tokens, and fonts
├── docs/                        # Audits, checklists, and guides
├── guidelines/                  # Code quality and styling guidelines
├── package.json                 # Node package configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## ⚙️ Scripts & Commands

In the `frontend` folder, you can run:

| Command               | Action                                        |
| --------------------- | --------------------------------------------- |
| **`npm install`**     | Installs project dependencies                 |
| **`npm run dev`**     | Runs Vite local development server            |
| **`npm run build`**   | Builds static production files to `dist/`     |
| **`npm run preview`** | Locally previews the built production website |

---

## 🪟 Font Configuration

Ateion utilizes the following Google Fonts:
- **Outfit** — Headlines and major brand elements
- **Inter** — Main body text, descriptions, and paragraphs
- **Manrope** — Interactive elements, buttons, and navigation
- **DM Sans** — Statistics and numeric labels

For instructions on font styling and mapping, refer to the [Font Usage Guide](./FONT-GUIDE.md).

---

## 🐋 Docker Development

The frontend can be built and run standalone using the Dockerfile inside this directory:

```bash
# Build the production Docker image
docker build -t ateion-frontend .

# Run the container
docker run -p 3000:80 ateion-frontend
```

Alternatively, launch the complete stack from the root directory using:
```bash
docker-compose up
```
