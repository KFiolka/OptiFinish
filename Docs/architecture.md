# Architecture Documentation: OptiFinish

## 1. High-Level Overview
OptiFinish ist eine **Single Page Application (SPA)** fokussiert auf Darts-Training und Performance-Analyse.
Der Fokus liegt auf **geringer Latenz** (Sofortige Eingabe-Reaktion), **Offline-First** Funktionalität und **High-Fidelity UI**.

## 2. Tech Stack

### Core
*   **Runtime / Build:** [Vite](https://vitejs.dev/) (Schnell, modern).
*   **Framework:** [React 19](https://react.dev/) (Component-Based, Ecosystem).
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode für Stabilität).

### State Management & Logic
*   **Global State:** [Zustand](https://github.com/pmndrs/zustand) (Minimalistisch, performant, keine Boilerplate).
    *   *Warum?* Ideal für Game-Loops (Score-Updates) ohne unnötige Re-Renders.
*   **Business Logic:** Reine TypeScript-Klassen/Funktionen ("Hexagonal Architecture" Ansatz), entkoppelt von der UI.

### Styling & UI
*   **CSS Framework:** [Tailwind CSS v3.4+](https://tailwindcss.com/).
*   **Design Tokens:** Definiert in `tailwind.config.js` basierend auf `DESIGN.md`.
*   **Icons:** Material Symbols (via Google Fonts oder SVG-Import).
*   **Animation:** CSS Transitions + `framer-motion` (optional für komplexe Sace-Transitions).

### Testing
*   **Unit/Integration:** [Vitest](https://vitest.dev/).
*   **Environment:** jsdom / happy-dom.

## 3. Projektstruktur (`/src`)

Wir folgen einer **Feature-basierten Architektur** ("Screaming Architecture"), um Code organisatorisch zu gruppieren, nicht technisch.

```
src/
├── assets/             # Statische Dateien (Images, Fonts)
├── components/         # Geteilte UI-Komponenten (Buttons, Inputs - "Stitch Exports")
│   ├── ui/             # Primitive (Button, Card)
│   └── layout/         # App-Shell, Header, BottomNav
├── features/           # Fachliche Module
│   ├── game/           # Kern-Logik (301/501, Checkout-Rechner)
│   ├── input/          # Eingabe-Logik (Numpad, Dart-Matrix)
│   ├── dashboard/      # Statistik & Verlauf
│   └── settings/       # Benutzer-Einstellungen
├── hooks/              # Globale React Hooks
├── lib/                # Hilfsfunktionen & Utils
├── styles/             # Globale CSS & Tailwind Directives
├── types/              # Globale Typ-Definitionen
├── App.tsx             # Root Component
└── main.tsx            # Entry Point
```

## 4. Datenfluss & Prinzipien

1.  **Strict Unidirectional Data Flow:**
    *   Events (User Click) -> Store Action -> State Update -> UI Re-Render.
2.  **Logic Separation:**
    *   Keine komplexe Logik in JSX-Komponenten.
    *   Logik gehört in Custom Hooks (`useGameEngine`) oder reine TS-Funktionen.
3.  **Stitch-First UI:**
    *   UI-Komponenten folgen strikt den Vorgaben aus `Docs/DESIGN.md`.
    *   Änderungen am Design werden erst dokumentiert, dann implementiert.

## 5. Deployment / Build
*   **Zielplattform:** [Render.com](https://render.com/).
    *   *Type:* Static Site.
    *   *Build Command:* `npm run build`.
    *   *Publish Directory:* `dist`.
    *   *Routing:* Rewrite all routes to `index.html` (SPA Rule).
*   **Output:** `/dist` (HTML/CSS/JS Bundle).
