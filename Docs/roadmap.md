# Roadmap: OptiFinish - Darts Training App

## Phase 1: Initialisierung & Design
- [x] **Projekt-Struktur aufsetzen** (Folders: src, tests, Docs)
- [x] **Design-System importieren** (Stitch Project 1220531332361989351)
    - [x] Project-Metadata abrufen via Stitch MCP
    - [x] `code.html` analysieren
    - [x] `Docs/DESIGN.md` erstellen
- [x] **Architektur-Planung** (`Docs/architecture.md`)

## Phase 2: Frontend-Entwicklung (Stitch-Driven)
**Stack:** React + Vite + Tailwind + Zustand
- [x] **Basis-Komponenten erstellen** (Buttons, Cards, Inputs) via Stitch
- [ ] **Screens implementieren**
    - [x] Training Dashboard (Main Screen)
- [x] Settings / Menu
- [x] **UI/UX Quality Polish (Pro Max Audit)**
    - [x] **Accessibility:** `aria-label` für alle Icon-Buttons hinzufügen
    - [x] **Touch Targets:** Buttons auf min. 44x44px vergrößern (besonders Input-Grid)
    - [x] **Interaktion:** `cursor-pointer` explizit setzen

## Phase 3: Core-Logik & State Management
- [x] **Zustand Store Setup** (`useGameStore`)
    - [x] State: `score` (301/501), `history`, `currentTurn`
    - [x] Actions: `throw`, `undo`, `submit`
    - [x] **Optimal Checkout Logic:** Rekursiver Solver für korrekte Pfade (inkl. 121, 169 etc.)
- [x] **UI Integration**
    - [x] Scoreboard an Store binden (Live-Updates)
    - [x] InputPad an Store binden (Interaktion)
    - [x] **Interaktive Pfad-Visualisierung:** Click-to-Throw Funktion
    - [x] **Game Phase UI:** Scoring/Setup/Checkout Ring-Farben & Labels
- [x] **Game Logic Rules**
    - [x] Bust-Logik (Überworfen)
    - [x] Double-Out Validierung
    - [x] Match Won State
