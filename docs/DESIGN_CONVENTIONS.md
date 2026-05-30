# Design Conventions — Vision Pro Glassmorphism (ERP / WMS)

Single source of truth for **layout · visual · interaction · content** in the
Vision Pro Glassmorphism template. Every new page or component aligns to this
so the system never drifts.

**Direction:** Apple-visionOS calm + frosted glass + soft daylight palette.
Airy white surfaces, gentle blue accent, content-first. **Never** dark navy,
dark purple, neon, heavy shadows, or busy gradients.

---

## Contents
0. [Principles](#0-principles)
1. [Color tokens](#1-color-tokens)
2. [Typography](#2-typography)
3. [Radius, spacing & grid](#3-radius-spacing--grid)
4. [Glass surfaces](#4-glass-surfaces)
5. [Elevation, z-index & motion](#5-elevation-z-index--motion)
6. [Iconography](#6-iconography)
7. [Responsive & breakpoints](#7-responsive--breakpoints)
8. [App shell & navigation](#8-app-shell--navigation)
9. [Page recipes](#9-page-recipes)
10. [Component rules](#10-component-rules)
11. [Forms & inputs](#11-forms--inputs)
12. [Data display & viz](#12-data-display--viz)
13. [States: loading / empty / error](#13-states-loading--empty--error)
14. [Content & voice](#14-content--voice)
15. [Accessibility](#15-accessibility)
16. [Naming & file structure](#16-naming--file-structure)
17. [Component cheat-sheet](#17-component-cheat-sheet)
18. [Don'ts](#18-donts)

---

## 0. Principles

1. **Glass is chrome, not content.** Frost the shell (nav, topbar, cards,
   drawers); keep data crisp and high-contrast on top.
2. **Soft, not loud.** One accent (blue/sky). Status colors carry meaning,
   never decoration. Hovers are low-opacity slate tints — never a dark fill.
3. **Calm motion.** 150–220 ms ease-out. Menus fade+scale, drawers slide,
   nothing bounces, nothing loops (except a single live-dot pulse).
4. **Density follows purpose.** Tables are tight (Notion-like); drawers,
   forms, and detail panels breathe (Apple-like).
5. **One system, two layouts.** The same screens work under a left Sidebar or
   a top icon-nav. Build layout-agnostic; never hard-code nav assumptions.

---

## 1. Color tokens

Stock Tailwind only — **no custom theme config required**.

| Role | Token | Use |
|---|---|---|
| Accent / primary | `blue-500` #3b82f6 · hover `blue-400` | CTAs, active nav, links, focus |
| Accent soft | `sky-400` · `sky-300` | dots, gradients, avatars |
| Text primary | `slate-900` | headings, key data |
| Text secondary | `slate-600` / `slate-700` | body |
| Text muted | `slate-400` | labels, meta, placeholders |
| Hairline | `slate-900/[0.06]` | borders, dividers |
| Hover wash | `slate-900/[0.04]` · `blue-500/[0.04]` | rows, nav, list items |
| Canvas | gradient + dot grid (`vp-canvas`) | page background |

### Semantic tones (`VP_TONE`)
`slate · blue · sky · emerald (ok/success) · amber (warn/pending) · rose
(danger/error) · indigo · violet`. Each tone = `{ fg, bg (~10% α), bd (~28% α) }`.

**Mapping by domain meaning:**
| Meaning | Tone |
|---|---|
| Success / fulfilled / in-stock / paid / done | `emerald` |
| Warning / low / pending / packing / partial | `amber` |
| Danger / out / cancelled / overdue / returned | `rose` |
| Info / shipped / assigned / in-transit | `blue` / `sky` |
| Neutral / draft / queued / discontinued | `slate` |
| Finance / value | `indigo` / `violet` |

Badges & pills **always** = tinted bg + colored fg + soft border. Never
solid-fill + white text.

---

## 2. Typography

- Family: **Inter** (UI) + **JetBrains Mono** (`.tabular`/`.font-mono` for IDs, money, counts, timestamps).
- Numerals that align in columns → always `.tabular`.

| Style | Spec |
|---|---|
| Page title | `text-[22px] font-semibold tracking-tight text-slate-900` |
| Hero value (login/big) | `text-[20px]–[26px] font-bold` |
| Section title | `text-[14px] font-semibold text-slate-900` |
| Eyebrow | `text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400` |
| Body | `text-[12.5px]–[13px] text-slate-600/700` |
| Meta / caption | `text-[11px] text-slate-400` |
| KPI value | `text-[24px] font-bold tabular text-slate-900` |
| Table cell | `text-[12.5px]` · header `text-[10px] uppercase tracking-[0.1em] text-slate-400` |

Eyebrows: **use sparingly**, only above genuinely grouped content — not as a
default heading style.

---

## 3. Radius, spacing & grid

**Radius (bias large — this system is rounder than a typical admin):**
`rounded-xl` 12px → buttons, inputs, chips, nav items ·
`rounded-2xl` 16px → cards, KPIs, list tiles ·
`rounded-3xl` 24px → page panels, section cards, drawer, modal, login ·
`rounded-full` → pills, avatars, toggles, the layout toggle.

**Spacing:**
- Page sections `space-y-5` (20px).
- Card padding `p-4` dense · `p-5` default · `p-6` section/drawer/login.
- Gaps `gap-3` (KPI/tile) · `gap-4` (KPI row) · `gap-5` (page columns).
- Page width `max-w-[1500px] mx-auto`; shell padding `p-4`.

**Grid:**
- KPI row `grid grid-cols-2 lg:grid-cols-4 gap-4`.
- Content split `grid grid-cols-12 gap-5` → main `col-span-8`, rail `col-span-4` (or 7/5).
- Settings `col-span-3` sub-nav + `col-span-9` panel.

---

## 4. Glass surfaces

Defined in `vision-pro.css`. Three levels:

| Class | Recipe | Use |
|---|---|---|
| `vp-glass-subtle` | 55% white, blur 16 | chips, inputs, icon buttons, pills |
| `vp-glass` | 85→64% white gradient, blur 24 + soft shadow | default card, KPI, table |
| `vp-glass-strong` | 92→76% white gradient, blur 40 | nav, topbar, drawer, modal, hero, login |

Rules:
- Every glass surface inherits `inset 0 1px 0 rgba(255,255,255,.9)` — that
  white top lip is what reads as real glass. **Don't remove it.**
- Glass only works **over the `vp-canvas` backdrop** (soft gradient + dot
  grid). Always keep the canvas behind any glass surface, else it's flat white.
- Don't stack glass-strong on glass-strong (double blur muddies). A glass card
  on the canvas is the norm; nested panels use `vp-glass-subtle`.

---

## 5. Elevation, z-index & motion

**One elevation system** — the glass box-shadow. No layered, colored, or neon shadows.

**z-index scale (keep to these):**
| Layer | z |
|---|---|
| Page content | 0–10 |
| Sticky Sidebar / Topbar / TopNav | `z-40` |
| Mobile bottom nav · LayoutToggle | `z-50` |
| Drawer overlay | `z-[60]` |
| Modal overlay | `z-[70]` |
| Dropdown menu | `z-[80]` |

**Motion:**
- Default `transition-colors` / `transition-all` 150 ms.
- Hover-lift cards `hover:-translate-y-0.5`.
- Keyframes: `vp-menu-in` (menus/modals, fade+scale 180 ms), `vp-slide-in`
  (right drawer 220 ms), `vp-fade-in` (page — apply with care, **never leave
  content stuck at opacity 0**), `vp-live` (status dot, the only loop).
- Backdrops: `black/28` + `blur(6px)` for drawer/modal. Never a heavy dim.

---

## 6. Iconography

- **Hand-rolled inline SVG**, 24×24 viewBox, `stroke 1.5`, `currentColor`,
  round caps/joins. Exposed as `Icon.*` (`VPIcons.tsx`). ~70 glyphs.
- Size: 14 in dense rows/menus, 16 in nav/buttons, 18 mobile nav, 20 page-header tile.
- Icon tile = `w-9/10/11 rounded-xl/2xl bg-blue-500/8 border border-blue-500/18 text-blue-600`.
- **No icon font, no Lucide/Heroicons** unless you add them deliberately.
- Emoji is never UI. Unicode `↑ ↓ → ·` allowed for trend/separators only.

---

## 7. Responsive & breakpoints

Tailwind defaults; design mobile-first.
| BP | Behaviour |
|---|---|
| base (< 640) | single column; KPI grid `grid-cols-2`; filter bar wraps; tables scroll-x inside `overflow-x-auto`; bottom `MobileNav` |
| `sm` 640 | 2-col tiles where useful |
| `lg` 1024 | Sidebar/TopNav appear; MobileNav hides; KPI `grid-cols-4`; content split grids engage |
| `xl` 1280 | wider nav padding; multi-column dashboards |

Always add `pb-24 lg:pb-0` to page content so the mobile nav doesn't cover the
last rows. Money in narrow cells uses compact form (`$1.2M`, `Rp 1,4 jt`).

---

## 8. App shell & navigation

Two interchangeable modes via `LayoutToggle` (floating, bottom-right, lg+ only):

- **Side (default):** collapsible `Sidebar` (sticky `top-4`, groups with
  labels, badges, `SOON` flags, collapse to 68px icon rail) + sticky `Topbar`.
- **Top:** full-width sticky `TopNav` (sticky `top-0`). **Icon-only** items
  (label → `title` tooltip) to stay compact; account = `Dropdown`.
- **< lg:** side/top chrome hides → `MobileNav` bottom bar (5 key items, icon + short label).
- **Auth gate:** show `LoginPage` before the shell; "Sign out" reloads to it.

Active state: nav item highlighted `bg-blue-500/12 text-blue-600` (+ dot under
side-rail). Map the current route → top-level key for highlight.

---

## 9. Page recipes

### List / table page (workhorse) — order is fixed
```tsx
<PageHeader icon title desc breadcrumb actions />        {/* glass-strong */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">  {/* 4 KPIs */}…</div>
<div className="flex flex-wrap items-center gap-2">       {/* filter bar */}
  <SearchField/> <Select/> <Select/>
</div>
<FilterPills pills={active}/>                             {/* removable */}
<DataTable columns rows total onRowClick={setSel}/>       {/* zebra + pagination */}
<Drawer position="center" open={!!sel} …/>                {/* row detail */}
```

### Detail / settings page
- Left sub-nav card `col-span-3` + right panels `col-span-9`.
- Panels are `SectionCard`s of `TextField`/`Select`/`Toggle`; primary
  `Save` + ghost `Cancel` live in `PageHeader` actions.

### Dashboard
- KPI row (sparkline `KpiCard`s) → split grid (chart `SectionCard` + side
  rail list) → secondary table + alerts. Keep ≤ 2 charts; tables carry detail.

### Auth
- Full-screen centered `vp-glass-strong` card, `max-w-sm p-8`, logo + title +
  fields + primary button + secondary link.

---

## 10. Component rules

- **KpiCard** — left 1px accent bar, uppercase label, tabular value, optional
  `delta` chip (`up` arrow) + optional `spark`. Tone = meaning.
- **DataTable** — `columns` config (`align`, `mono`, `cell(row)`); zebra `i%2`;
  hover `bg-blue-500/[0.04]`; `onRowClick` opens a `Drawer`. Include the
  `Pagination` footer whenever `total` is set. Header 10px uppercase muted.
- **StatusBadge / Pill** — tinted; badge = mono + dot (states), pill = compact
  label (categories/channels). Choose a tone, never raw colors.
- **Button** — `primary` (blue/white) · `secondary` (glass-subtle) · `ghost` ·
  `danger`. Optional leading icon; `sm/md/lg`. One primary per toolbar.
- **Drawer** — `position="right"` (list context, slides in) or `"center"`
  (focus; template default for row detail). title + subtitle + footer actions.
- **Modal** — small centered confirm/form (`maxWidth ~440`); destructive action
  uses `danger`; actions right-aligned; never for long content (use Drawer).
- **Timeline** — `items=[{label,time,done}]`; done = emerald dot, pending = slate.
- **Dropdown** — compact `min-w-[180px]`; click-outside closes; items support
  `icon`/`badge`/`divider`/`danger`. Account menu + row actions, **not** primary nav.
- **Toggle** — settings rows only; label + desc left, switch right.
- **Tabs** — segmented control for ≤ 5 in-page views; active = blue fill.
- **ProgressBar** — capacity/utilisation; tone by threshold (emerald→amber→rose).

---

## 11. Forms & inputs

- Field = label (`text-[11px] font-medium text-slate-500 mb-1.5`) + control.
- Controls sit on `vp-glass-subtle`, `rounded-xl`, focus `border-blue-400`.
- Group related fields in a `SectionCard`; 2-col `grid sm:grid-cols-2 gap-4`.
- Validation: inline message under field in `text-rose-600 text-[11px]`.
- Primary submit bottom-right or in header; destructive separated + `danger`.
- Use `Toggle` for booleans, `Select` for 4+ options, segmented `Tabs` for 2–3.

---

## 12. Data display & viz

- **Tables** carry the detail; keep them tight (`px-3 py-3`), right-align
  numbers (`text-right font-mono tabular`), truncate long text with `title`.
- **Sparklines** (`Spark`) for KPI trend — gradient fill + 1.75px stroke, tone-matched.
- **Bar charts** — rounded-top bars, soft gradient (`from-blue-500/70 to-sky-400/70`),
  10px mono axis labels. ≤ 12 bars; for more, aggregate.
- **ProgressBar** for ratios/capacity. No pie charts unless truly part-to-whole.
- Always label units (`$000s`, `% margin`, `units`). Never a naked number.

---

## 13. States: loading / empty / error

- **Loading:** skeleton blocks (`bg-slate-200/60 rounded-lg animate-pulse`) in
  the shape of the content — never a centered spinner on a blank page. Buttons
  show inline text change, not a spinner swap.
- **Empty:** `EmptyState` (icon tile + title + 1-line desc + optional CTA).
  Never bare "No data".
- **Error:** inline card `bg-rose-500/[0.08] border border-rose-400/30` with a
  short cause + retry action. Toasts for transient confirmations (top-right).
- **Zero-result filter:** table `empty` prop message referencing the filter.

---

## 14. Content & voice

- Sentence case for buttons/labels; Title Case for page titles; ALL-CAPS only
  for status codes + eyebrows.
- Direct & operational — say what and what-to-do, no marketing fluff, no praise.
- Numbers/money/IDs in `.tabular`. Currency keeps its symbol; compact on mobile.
- Dates: explicit (`May 30, 2026`); relative only for "synced 3m ago" type meta.
- Emoji-free UI. Trend arrows `↑ ↓ →` (color-coded) and `·` separators only.

---

## 15. Accessibility

- Contrast: body text `slate-600`+ on white passes AA; don't drop below `slate-400` for anything readable.
- Focus: every interactive control keeps a visible focus ring (`focus:ring-2 focus:ring-blue-400 focus:outline-none`); don't strip it.
- Hit targets ≥ 36px (mobile nav/buttons ≥ 44px).
- Toggles use `role="switch"` + `aria-checked`; icon-only buttons need `title`/`aria-label`.
- Drawer/Modal: close on overlay click **and** `Esc`; trap focus; restore focus to trigger on close.
- Don't rely on color alone — pair status color with a label/dot/icon.

---

## 16. Naming & file structure

```
components/
  VPIcons.tsx        // Icon.* SVG set
  VisionProUI.tsx    // primitives (exports listed in §17)
  VisionProPages.tsx // page compositions
  VisionProApp.tsx   // shell: login gate + side/top + mobile + routing
styles/
  vision-pro.css     // vp-canvas, vp-glass*, animations, z-scale
```
- Components `PascalCase`; tone/route keys `lowercase`.
- Page = self-contained: local filter state + `columns` config + data adapter.
- Wire real data by replacing the in-file arrays; pass `columns`+`rows` to `DataTable`.
- Keep one component per concern; lift shared bits into `VisionProUI.tsx`.

---

## 17. Component cheat-sheet

`VisionProUI.tsx` exports:
`VP_TONE · Button · IconButton · StatusBadge · Pill · Spark · KpiCard · Card ·
SectionCard · SearchField · Select · TextField · Toggle · FilterPills · Tabs ·
ProgressBar · Pagination · DataTable · EmptyState · Drawer · Modal · Timeline ·
PageHeader · Topbar · Sidebar · TopNav · MobileNav · LayoutToggle · Dropdown`

`VisionProPages.tsx`: `DashboardPage · InventoryPage · OrdersPage ·
PurchasingPage · WarehousePage · ReportsPage · SettingsPage · LoginPage`

---

## 18. Don'ts

❌ Dark navy / dark purple fills · ❌ neon glow / colored / layered shadows ·
❌ solid-fill status badges with white text · ❌ heavy dim drawer backdrops
(use `black/28` + blur) · ❌ glass surface with no `vp-canvas` behind it ·
❌ text labels in TopNav (icon-only) · ❌ idle/looping animation beyond the
live dot · ❌ inventing new accent hues (extend `VP_TONE`) · ❌ centered
spinners on blank pages (use skeletons) · ❌ pie charts for non-part-to-whole ·
❌ stripping focus rings · ❌ more than one primary button per toolbar.

---

*Vision Pro Glassmorphism · ERP/WMS · v2 conventions.*
