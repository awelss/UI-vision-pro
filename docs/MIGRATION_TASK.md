# MIGRATION TASK — bring old screens onto Vision Pro Glassmorphism

Paste this whole file to **Claude Code** (or give it to a developer) inside the
repo. It is a standing task: for every existing page, **add what's missing,
move what's misplaced, remove what doesn't belong**, until each screen matches
the Vision Pro Glassmorphism system.

**Read first (source of truth):**
- `DESIGN_CONVENTIONS.md` — every layout/visual/interaction rule
- `INSTALL.md` (Path A) — how the kit is wired
- `components/VisionProUI.tsx` — the only allowed building blocks
- `components/VisionProPages.tsx` — reference page recipes

---

## Your job

Refactor each old screen to the new system **without changing its data or
business logic** — only its layout, structure, and styling. Work page by page.
For each page, do an **ADD / MOVE / REMOVE** pass:

### ADD (what's missing)
- Wrap the screen shell in `vp-canvas`; ensure `vision-pro.css` is imported globally.
- Add a `PageHeader` (icon + title + desc + breadcrumb + actions) if absent.
- Add the KPI row (`grid grid-cols-2 lg:grid-cols-4 gap-4` of `KpiCard`) when the page has summary metrics.
- Add a filter bar (`SearchField` + `Select`s) + `FilterPills` above any table.
- Add `Pagination` to any table missing it; add `EmptyState` for zero-results.
- Add loading **skeletons** where data fetches (no blank flashes / spinners).
- Add a row-detail `Drawer` (`position="center"`) where rows are inspectable.
- Add focus rings / `aria-label`s / `title`s on icon-only controls.

### MOVE (what's misplaced)
- Reorder every list page to the canonical recipe:
  `PageHeader → KPIs → filter bar → FilterPills → DataTable → Drawer` (§9).
- Put primary/secondary actions into `PageHeader.actions` (top-right), not scattered.
- Move filters above the table; move pagination into the table footer.
- Move settings-style forms into the left-subnav + right-panel layout (§9).
- Right-align numeric columns; make IDs/money `.tabular` (mono).
- Promote nav into the shell (`Sidebar`/`TopNav` + `MobileNav`) — no per-page nav.

### REMOVE (what's not needed)
- Delete one-off cards/buttons/badges and replace with `VisionProUI` primitives.
- Remove custom backgrounds, dark navy/purple fills, gradients, heavy/colored shadows.
- Remove raw hex colors and `bg-[#…]` — use `VP_TONE` / stock tokens only.
- Remove duplicate page chrome, redundant headings, decorative icons/emoji.
- Remove centered spinners, bouncy/looping animations (keep only the live dot).
- Remove dead spacing/dividers; collapse to the spacing scale (§3).

---

## Rules

1. **Logic untouched.** Keep data fetching, props, routes, handlers. Only the
   presentational layer changes.
2. **Primitives only.** If a needed UI piece doesn't exist, add it to
   `VisionProUI.tsx` (shared) — never style a one-off inside a page.
3. **Tokens only.** Colors from `VP_TONE` / stock Tailwind; no new hues, no dark
   navy/purple. Radius/spacing/type per `DESIGN_CONVENTIONS.md`.
4. **Two layouts must both work** — don't hard-code Sidebar-only assumptions.
5. **Don't break tests/build.** Run typecheck + the app after each page.

---

## Workflow (do this, in order)

1. **Inventory:** list every page/route. Output a table:
   `route · purpose · type (list/detail/dashboard/form) · components used`.
2. **Gap report per page:** for each, list concrete ADD / MOVE / REMOVE items
   (cite the convention section). **Wait for my OK on the plan** before editing
   more than one page.
3. **Migrate one page first** (pick a simple list page) as the reference PR.
   Show before/after. Get sign-off.
4. **Roll out** the rest in small PRs (1–3 pages each), each following the same
   ADD/MOVE/REMOVE pass. Reuse the reference page's structure.
5. **Final sweep:** grep for raw hex, `bg-[#`, custom shadows, leftover one-off
   components; confirm every page passes the PR checklist below.

---

## Per-page acceptance checklist

- [ ] Shell uses `vp-canvas` + global `vision-pro.css`; glass renders frosted
- [ ] `PageHeader` present; actions top-right; breadcrumb where relevant
- [ ] KPIs use `KpiCard`; tables use `DataTable` (+ Pagination, +zebra, right-aligned numbers)
- [ ] Filters above table + `FilterPills`; `EmptyState` for zero results
- [ ] Detail opens in centered `Drawer`; confirms use `Modal`
- [ ] Built only from `VisionProUI` primitives — no one-off cards/buttons
- [ ] Colors from `VP_TONE`; no raw hex, no dark navy/purple, no neon/colored shadow
- [ ] Numbers/IDs `.tabular`; fonts Inter + JetBrains Mono
- [ ] Works under both Sidebar and TopNav; `MobileNav` ok < lg
- [ ] Focus rings intact; icon-only buttons have labels; hit targets ≥ 36px
- [ ] No console errors; nothing renders blank; build + typecheck pass

---

## Output format I want from you

For each page: a short **diff summary** (ADDED / MOVED / REMOVED bullets) +
the PR. Don't refactor logic. Don't invent new visual styles — when unsure,
quote the relevant `DESIGN_CONVENTIONS.md` line and follow it.
