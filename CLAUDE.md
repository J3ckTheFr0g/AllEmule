# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server
npm run build     # tsc typecheck + vite build (output: dist/)
npm run preview   # preview the production build locally
npm run deploy    # publish dist/ to gh-pages branch
```

There is no test runner or linter configured yet. `npm run build` (which runs `tsc` before `vite build`) is currently the only automated check — run it after changes to catch type errors.

## Architecture

This is **rom-console-web**, a static React/TypeScript PWA that emulates handheld game consoles (pre-2005) in the browser. It deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

The app is a single flow driven by one explicit state machine, not a router or a component tree with scattered state:

- **`src/models/consoleTypes.ts`** — the single source of truth for console metadata. `CONSOLE_SPECS` maps each `ConsoleType` to its screen orientation/aspect ratio, its EmulatorJS core name, and a `SupportStatus` (`mvp` / `phase2` / `excluded`) reflecting whether an EmulatorJS Wasm build actually exists for that core. Check this table before assuming a console is playable — several (GP32, Watara Supervision, Game & Watch) are only partially or not supported. `GAME_AND_WATCH_SKINS` is a separate per-game table since each Game & Watch title has its own physical case.

- **`src/detection/consoleDetector.ts`** — identifies which console a ROM belongs to from raw bytes, in priority order: Game Boy/Color header (Nintendo logo + checksum at 0x104), GBA header (checksum at 0xB2), Lynx magic bytes, then falls back to file extension for consoles without a reliable in-ROM header (Game Gear, PC Engine, NGP, Supervision, GP32). Detection returns a confidence (`certain` / `probable` / `ambiguous`); `ambiguous` results throw `AmbiguousRomError` rather than guessing silently — callers must handle this and prompt the user. Note GBA and GBA SP are indistinguishable from ROM content alone (identical chip) — that split has to come from a user preference, not detection.

- **`src/state/deviceStateMachine.ts`** — `DeviceStateMachine` is the core control flow, independent of React. States: `off -> romInserting -> (morphing) -> awaitingPowerOn -> poweringOn -> playing -> poweringOff -> off`. The `morphing` state is only entered when switching to a console different from the one currently loaded (case-swap animation). Each transition method (`onInsertAnimationComplete`, `onMorphAnimationComplete`, etc.) is meant to be called when the corresponding UI animation finishes — the machine itself has no timers or animation logic. `pressPowerOn`/`pressPowerOff` are the only user-initiated transitions; the rest are animation-driven.

- **`src/hooks/useDeviceStateMachine.ts`** — wraps `DeviceStateMachine` in a `useRef`-held singleton per component instance and mirrors its state into React via `onStateChange`.

- **`src/components/DeviceShell/DeviceShell.tsx`** — the only screen. It owns the file input, calls `machine.loadRom()`, and renders a different placeholder per state. Placeholder animations (cartridge slide, morph flip, boot flash) are plain CSS keyframes in `DeviceShell.css`, advanced by `setTimeout` durations in `ANIM_DURATIONS_MS` — these are stand-ins and are meant to be replaced by real Rive (`.riv`) animations driven by their actual completion events, not fixed timers. When `state === 'playing'`, it dynamically injects the EmulatorJS loader script (`EJS_core`, `EJS_gameUrl`, etc. set as `window` globals per EmulatorJS's own integration contract) rather than importing a package.

**Key constraints to preserve when extending this:**
- ROMs are never uploaded or committed — they're read client-side via `<input type="file">` into a `Uint8Array`/blob URL only.
- `vite.config.ts`'s `base: '/AllEmule/'` must match the GitHub repo name exactly, or the Pages deploy will 404 on assets.
- Boot logos/case art are meant to be original stylized homages, not reproductions of trademarked console designs — keep this in mind if adding new console skins or Rive assets.
