# Knowledge Base & Learnings

Dieses Dokument sammelt gelöste Probleme und technische Entscheidungen (Self-Annealing).

## 1. Vite Build: Syntax-Fehler durch Minification
**Problem:**  
Der Build (`npm run build`) schlug fehl mit einem kryptischen Syntax-Fehler in `useGameStore.ts`: `);&& multiplier === 2)`.
`tsc` lief lokal fehlerfrei durch.

**Ursache:**  
Vermutlich ein Parser-Problem im Build-Tool (Vite/Rollup/Esbuild) bei der Verarbeitung von verschachtelten TypeScript-Konditionen oder Type-Assertions in Kombination mit der Minification.

**Lösung:**  
Vereinfachung der Syntax.
Statt komplexer Inline-Checks:
```typescript
const isDouble = multiplier === 2 || (segment === 25 && multiplier === 2);
```
Wurde die Logik explizit aufgebrochen:
```typescript
const isStandardDouble = multiplier === 2;
const isBullDouble = segment === 25 && multiplier === 2;
const isDouble = isStandardDouble || isBullDouble;
```
Dies behob den Build-Fehler sofort.

**Learning:**  
Bei kryptischen Build-Fehlern, die lokal in `tsc` nicht auftreten, hilft oft eine explizitere Schreibweise und das Aufbrechen von komplexen Ausdrücken (`Bisecting`).

## 2. Zustand Re-Renders & Getters
**Problem:**  
Wie aktualisiert man eine UI-Komponente basierend auf einem berechneten Wert (`getStats()`) aus dem Store, ohne explizite Selektoren zu bauen?

**Lösung:**  
Wenn man den gesamten Store-State (oder Teile davon ohne spezifischen Selektor) via `useGameStore()` destructuring abruft:
```typescript
const { score, history } = useGameStore();
```
Rendert die Komponente bei *jedem* Store-Update neu.
Dadurch kann eine Helper-Funktion `getStats()`, die aktuelle Werte via `get()` liest, einfach im Render-Body aufgerufen werden:
```typescript
const stats = getStats(); // Calculated on every render
```
Dies ist für einfache Apps akzeptabel (wenig Performance-Impact), spart Boilerplate für Selektoren. Für größere Apps wären memorisierte Selektoren (`useShallow`) besser.
