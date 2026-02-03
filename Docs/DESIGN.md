# Design System: OptiFinish Training Dashboard
**Project ID:** 1220531332361989351

## 1. Visual Theme & Atmosphere
The design leverages a **"Deep Focus Tech"** aesthetic, characterized by a dark, immersive interface (`bg-background-dark`) that prioritizes legibility and concentration. It uses **Glassmorphism** and transparency (`white/5`, `backdrop-blur`) to create depth without clutter. The vibe is professional, high-performance, and slightly futuristic—reminiscent of high-end gaming dashboards or modern fintech apps. Glowing accents (`shadow-glow`) emphasize interactivity and active states.

## 2. Color Palette & Roles
*   **Electric Primary Blue (#137fec)**: Used for primary actions (Standard Buttons), active states, and key highlights. It serves as the brand's energetic core.
*   **Luminous Glow Blue (#3b82f6)**: Used specifically for outer glow effects and subtle gradients to add dimensionality to the primary color.
*   **Deep Void Navy (#101922)**: The primary background color. A very dark, desaturated blue-grey that reduces eye strain.
*   **Surface Navy (#1c2630)**: Used for elevated surfaces like cards, headers, and panels to distinguish them from the background.
*   **Depths Navy (#161e26)**: A darker shade used for secondary backgrounds or recessed areas.
*   **Pure White (#ffffff)**: Primary text color and icons for maximum contrast against the dark theme.
*   **Muted Slate (#94a3b8)**: Used for secondary text, labels, and inactive icons (e.g., `text-slate-400`).
*   **Alert Orange (#f97316)**: Used sparingly for specific state indicators or warnings (e.g., Dart 2 marker).
*   **Success Green (#4ade80)**/ **Danger Red (#ef4444)**: Implicitly used for positive/negative actions (e.g., S-BULL, MISS buttons).

## 3. Typography Rules
*   **Font Family:** **Lexend** (`font-display`). A geometric sans-serif font designed for readability.
*   **Usage:**
    *   **Headings/Scores:** Bold/ExtraBold weights, tight tracking (`tracking-tighter`) for large numbers (e.g., "301", "T20").
    *   **Labels:** Uppercase, wide tracking (`tracking-[0.2em]`) for small descriptors (e.g., "REST", "OPTIMAL").

## 4. Component Stylings
*   **Buttons (Primary):** `rounded-lg` or `rounded-full`. Solid Electric Blue background with a subtle glow request (`shadow-[0_4px_14px_rgba(19,127,236,0.4)]`). Text is uppercase and bold.
*   **Buttons (Input Pad):** `rounded` corners. Dark blue-grey background (`bg-[#233648]`) responding to hover with lightening or primary color tint.
*   **Cards/Containers:**
    *   **Standard:** `rounded-lg` or `rounded-xl`. `bg-surface-dark` with optional thin border (`border-white/5`).
    *   **Bottom Sheet:** `rounded-t-[1.5rem]`. heavily used for the input area, creating a physical "drawer" feel.
    *   **Glass Effects:** `bg-surface-dark/20` with `backdrop-blur-sm` for overlay elements like the score display.
*   **Icons:** **Material Symbols Outlined**. Often enclosed in `rounded-full` containers with semi-transparent backgrounds (`bg-surface-dark/50`).

## 5. Layout Principles
*   **Density:** Compact but touch-friendly. Input pads use a tight grid (`gap-1`), while display areas use generous negative space to frame the score.
*   **Navigation:** Fixed bottom bar (`h-[80px]`) with glassmorphism (`backdrop-blur-md`).
*   **Z-Axis:** Distinct layering. Background -> Content Surfaces -> Glass Overlays -> Floating Action Buttons/Modals.

## 6. Game Phase Visuals (Cockpit Logic)
The interface adapts dynamically to the game state ("Game Cycle") to provide subconscious strategic feedback:
*   **SCORING (>170):**
    *   **Color:** Muted Slate / Ice White (`text-slate-400`, `border-slate-400`)
    *   **Anim:** Static or Slow Breathe.
    *   **Vibe:** Calm, Accumulation.
*   **SETUP (101-170):**
    *   **Color:** Focus Amber (`text-amber-400`, `border-amber-400`)
    *   **Anim:** Active Pulse.
    *   **Vibe:** Alert, Preparation.
*   **CHECKOUT (<=100):**
    *   **Color:** Electric Blue (`text-primary`, `border-primary`)
    *   **Anim:** Intense Heartbeat (Fast Pulse).
    *   **Vibe:** Attack, Execution.
