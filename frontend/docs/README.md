
# Clone Figma Design to React

This is a code bundle for Clone Figma Design to React. The original project is available at https://www.figma.com/design/yeT7P6Eq7V5ZmcEXKLkrHl/Clone-Figma-Design-to-React.

## Project Structure

```
Homepage Website Frontend/
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── app/
│   │   ├── App.tsx              # Root component
│   │   └── components/
│   │       ├── figma/           # Figma-generated components
│   │       └── ui/              # shadcn/ui components
│   ├── components/              # Shared components (DotMap, etc.)
│   ├── imports/                 # Generated imports from Figma
│   ├── assets/                  # Images and static assets
│   └── styles/                  # Global styles and fonts
├── guidelines/                  # Project guidelines
└── dist/                        # Production build output
```

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Build

Run `npm run build` to create a production build in the `dist/` folder.

## Fonts

This project uses Google Fonts:
- **Outfit** - Headlines and brand elements
- **Inter** - Body text and descriptions
- **Manrope** - Navigation and buttons
- **DM Sans** - Stats and numeric displays

See [FONT-GUIDE.md](./FONT-GUIDE.md) for detailed font usage.
  