# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start Vite dev server (HMR)
pnpm build      # Type-check + Vite production build
pnpm preview    # Serve the production build locally
```

No test runner is configured.

## Architecture

Pure frontend SPA — no backend. React 19 + Vite + Tailwind CSS v4 + React Router v7 + Zustand.

**Flow:** User submits a query on `LandingPage` → `AnalyzeForm` calls `startAnalysis()` (sets status to `submitting`/`loading`) → `AgentProgressModal` overlays the screen running a timed animation → once `status === 'done'`, router pushes to `/insights` → user can navigate to `/roadmap`.

**State** lives entirely in `src/store/analysisStore.ts` (Zustand, persisted to `sessionStorage` under key `cpo-ai-analysis`). The `useAnalysis` hook provides a shallow-selected slice for components to avoid re-renders.

**API layer** (`src/api/client.ts`) is fully mocked — `postAnalyze` returns a `jobId` and `getResults` resolves after a 20s delay (simulating agent work). Real queries fall back to the `notion` demo dataset. Demo queries (`kiro`, `notion`, `siri`) are matched by slug/label and served from static JSON files in `src/data/demos/`.

**Route protection:** `/insights` and `/roadmap` redirect to `/` if `result` is null in the store, ensuring the analysis flow is always completed first.

**UI conventions:**
- Dark theme with a gold accent (`#c98c2e` / `#e3b264`) throughout
- Framer Motion handles all page/card entrance animations
- `GlassCard` is the shared card primitive used across insight and roadmap components
- Inline `style` props are used heavily alongside Tailwind for fine-grained opacity and color control — this is intentional, not a pattern to move away from

## Adding a demo

1. Add a JSON file to `src/data/demos/` matching the `AnalysisResult` shape from `src/types/index.ts` (plus `slug`, `label`, `description` fields)
2. Import and register it in `src/data/demos/index.ts`
3. Add an entry to `DEMO_LIST` in the same file
