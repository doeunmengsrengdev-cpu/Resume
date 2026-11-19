# Doune Memgsreng — Portfolio & Resume

A fast, responsive, and modern developer portfolio website built with Tailwind CSS, custom modern UI effects, and vanilla JavaScript.

## 📁 Project Structure

The project has been restructured into modular separate files:

```text
├── Index.html           # Production-ready compiled entry point
├── template.html        # Base HTML layout shell with component @include tags
├── dev.html             # Dynamic dev preview (fetches parts via fetch on Live Server)
├── build.js             # Lightweight zero-dependency builder & watcher
├── package.json         # NPM scripts (npm run build, npm run dev)
│
├── parts/               # Modular HTML components
│   ├── navbar.html      # Sticky navigation bar & mobile drawer
│   ├── hero.html        # Hero intro & interactive code perspective switcher
│   ├── work.html        # Featured project cards
│   ├── process.html     # Development workflow stepper
│   ├── stack.html       # Skills & tech stack bento grid
│   ├── about.html       # About bio & experience timeline
│   ├── contact.html     # Interactive contact form & social links
│   ├── footer.html      # Footer copyright & back-to-top button
│   └── modals.html      # Telegram QR modal, Image lightbox modal & Toast notification
│
├── css/
│   └── styles.css       # Custom styles, animations, scrollbar & modal backdrops
│
├── js/
│   └── main.js          # Interactive JavaScript (theme toggle, modals, forms, etc.)
│
└── profile/
    ├── pf.PNG           # Profile photo
    └── telegram-qr.svg  # Telegram QR code for @majesty_fury
```

---

## 🚀 Quick Start

### 1. View Directly
Double-click `Index.html` to open it in any browser (`file://`), or serve it on any static hosting (GitHub Pages, Vercel, Netlify).

### 2. Live Watch & Auto-Rebuild
When editing any component inside `parts/`, `css/`, `js/`, or `template.html`:

```bash
npm run dev
# or
node build.js --watch
```

Whenever you save any file, `Index.html` is instantly recompiled in milliseconds.

### 3. Dynamic Dev Mode (VS Code Live Server)
Open `dev.html` in VS Code with **Live Server** to preview changes dynamically via runtime component fetching without building.
# Resume
