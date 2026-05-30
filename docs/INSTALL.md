# INSTALL — Vision Pro Glassmorphism (ERP / WMS)

How to drop this template into a **website** or a **git repo** so the whole
team gets the *same layout & CSS*. Three install paths — pick one. The
**non-negotiables** at the bottom are what make every screen look identical.

> Files in this package:
> `components/VPIcons.tsx · VisionProUI.tsx · VisionProPages.tsx · VisionProApp.tsx`
> `styles/vision-pro.css` · `README.md` · `DESIGN_CONVENTIONS.md`

---

## A · Next.js app (App Router) — e.g. the cilupbah-ops repo

1. **Copy files** into the repo:
   ```
   apps/web/src/components/vision-pro/VPIcons.tsx
   apps/web/src/components/vision-pro/VisionProUI.tsx
   apps/web/src/components/vision-pro/VisionProPages.tsx
   apps/web/src/components/vision-pro/VisionProApp.tsx
   apps/web/src/styles/vision-pro.css
   ```
2. **Logo:** `cp apps/web/src/app/icon.png apps/web/public/logo-mark.png`
3. **Load the CSS once** (global). In `apps/web/src/app/layout.tsx`:
   ```tsx
   import "@/styles/vision-pro.css";
   ```
4. **Wrap the shell in the canvas** so glass has a backdrop to frost. On the
   `<body>` or the layout root:
   ```tsx
   <body className="vp-canvas">…</body>
   ```
5. **Mount.** Easiest: render the whole shell on a route:
   ```tsx
   // app/(vision)/page.tsx
   "use client";
   import VisionProApp from "@/components/vision-pro/VisionProApp";
   export default function Page() { return <VisionProApp />; }
   ```
   …or compose your own layout with the primitives:
   ```tsx
   "use client";
   import { Sidebar, Topbar, PageHeader, KpiCard, DataTable } from "@/components/vision-pro/VisionProUI";
   import { Icon } from "@/components/vision-pro/VPIcons";
   ```
   > Mark any file using these `"use client"` — they use `useState`.
6. **Commit & push:**
   ```bash
   git checkout -b feat/vision-pro-ui
   git add apps/web/src/components/vision-pro apps/web/src/styles/vision-pro.css apps/web/public/logo-mark.png
   git commit -m "feat(ui): Vision Pro Glassmorphism template + conventions"
   git push -u origin feat/vision-pro-ui
   ```
   Open a PR; add `DESIGN_CONVENTIONS.md` to the repo (e.g. `docs/`) and link it
   in the PR description so reviewers enforce it.

Tailwind v4 is already in this repo — no config change needed (the components
use stock classes: `blue/sky/slate/emerald/amber/rose/indigo/violet`).

---

## B · Vite / CRA / any React app

1. Copy `components/` → `src/components/vision-pro/` and `styles/vision-pro.css` → `src/styles/`.
2. Ensure **Tailwind** is installed (the components are Tailwind-class based).
   No custom theme needed.
3. Add fonts (Inter + JetBrains Mono) via `<link>` or self-host.
4. Import the CSS once in your entry (`main.tsx`): `import "./styles/vision-pro.css";`
5. Put `vp-canvas` on your root element; render `<VisionProApp/>` or compose primitives.
6. Drop a square logo at `public/logo-mark.png`.

---

## C · Plain website (no build step / CDN)

Use the live reference kit as-is — it runs with CDN React + Tailwind + Babel.
Copy the `ui_kits/vision-pro-erp/` folder (the `vp-*.jsx` files + `vp.css` +
`index.html`) to your server and open `index.html`. Good for a static demo or
embedding in a non-React site (iframe). For production, prefer path A or B
(CDN Tailwind + in-browser Babel are dev-only).

---

## Non-negotiables — what keeps every screen identical

Tell the team these are **required**, not optional:

1. **Load `vision-pro.css` globally, once.** It defines `vp-canvas`,
   `vp-glass*`, animations, and the z-index scale. Without it, nothing frosts.
2. **The shell root must have `vp-canvas`.** `backdrop-filter` only shows over
   content — no canvas ⇒ glass reads as flat white.
3. **Tailwind must be available** with stock colors. Don't swap the palette;
   extend `VP_TONE` if you need a new semantic tone.
4. **Use the primitives, don't re-style.** Build pages from `PageHeader`,
   `KpiCard`, `DataTable`, `Button`, `StatusBadge`, etc. Don't hand-roll
   one-off cards/buttons — that's how drift starts.
5. **Follow the page recipe order** (PageHeader → KPIs → filter bar →
   FilterPills → DataTable → Drawer). See `DESIGN_CONVENTIONS.md` §9.
6. **Fonts:** Inter (UI) + JetBrains Mono (`.tabular`). Numbers/IDs always mono.
7. **Logo** at `/logo-mark.png` (square).

If a screen needs something not in the kit, **add it to `VisionProUI.tsx`** (so
it's shared) rather than styling inline in a page.

---

## Make the conventions stick (team enforcement)

- **Commit `DESIGN_CONVENTIONS.md`** into the repo (`docs/DESIGN_CONVENTIONS.md`)
  and reference it in `CONTRIBUTING.md` / PR template: *"New UI must follow
  DESIGN_CONVENTIONS.md."*
- **PR checklist** (paste into the template):
  - [ ] Uses `vp-*` glass + `vp-canvas`, no custom backgrounds
  - [ ] Built from `VisionProUI` primitives (no one-off cards/buttons)
  - [ ] Page follows the §9 recipe order
  - [ ] Colors from `VP_TONE` only (no new hues, no dark navy/purple)
  - [ ] Numbers/IDs `.tabular`; focus rings intact; hit targets ≥ 36px
- **Lint guardrails (optional):** an ESLint rule / CI grep to flag raw hex
  colors and `bg-[#…]` in `components/**` and `app/**`, nudging devs to tokens.
- **One owner** merges UI PRs against the conventions until the pattern sticks.

---

*Questions an integrator will ask are answered in `README.md` (file map, quick
start) and `DESIGN_CONVENTIONS.md` (every layout/visual rule).*
