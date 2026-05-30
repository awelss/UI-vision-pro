# UI UX · Vision Pro Glassmorphism — ERP / WMS Template

A **blank, reusable** dashboard template for ERP & WMS apps. Frosted-glass
"Vision Pro" surfaces, soft light palette (gentle blue/sky accent — no dark
navy / purple), and every component an ERP/WMS screen needs. React + TypeScript,
framework-agnostic (works in Next.js, Vite, CRA — no `next/*` imports).

> Generic placeholder data throughout — swap in your own API. Nothing here is
> tied to a specific business.

---

## What's in the box

```
vision-pro-erp-template/
├── styles/
│   └── vision-pro.css           ← glass utilities, soft canvas, animations
└── components/
    ├── VPIcons.tsx              ← ~70 stroke-1.5 SVG icons (Icon.Home, …)
    ├── VisionProUI.tsx          ← the component library (exports below)
    ├── VisionProPages.tsx       ← 7 ready pages (Dashboard, Inventory, Orders,
    │                              Purchasing, Warehouse/WMS, Reports, Settings)
    └── VisionProApp.tsx         ← example shell: sidebar + topbar + routing
```

### Components (`VisionProUI.tsx`)

| Component | Use |
| --- | --- |
| `Sidebar` | Collapsible left nav with grouped items, badges, `SOON` flags |
| `Topbar` | Search + sync chip + notifications + user |
| `PageHeader` | Icon + title + breadcrumb + actions |
| `KpiCard` | Metric card — tone, delta chip, optional `spark` sparkline |
| `DataTable` | Column-config table + zebra rows + status cells + `Pagination` |
| `Button` / `IconButton` | primary / secondary / ghost / danger |
| `StatusBadge` / `Pill` | semantic status chips (8 tones) |
| `SearchField` / `Select` / `TextField` / `FilterPills` | filter bar pieces |
| `Tabs` | segmented control |
| `Toggle` | on/off switch for settings rows |
| `ProgressBar` | capacity / utilisation bars |
| `Card` / `SectionCard` | glass panels with optional header |
| `Drawer` | right slide-in **or centered** detail panel (`position="right" | "center"`) |
| `Modal` | centered confirm / form dialog overlay |
| `Timeline` | vertical status timeline (`items=[{label,time,done}]`) |
| `EmptyState` | empty / zero-result state |
| `TopNav` / `Sidebar` | two nav layouts — horizontal top bar **or** collapsible side rail |
| `MobileNav` | bottom tab bar for < lg screens |
| `LayoutToggle` | floating Side ↔ Top switch |
| `Dropdown` | compact menu (account / row actions) — click-outside to close, `align`, optional `icon`/`badge`/`divider`/`danger` items |
| `Spark` | standalone sparkline |

All tones (`slate · blue · sky · emerald · amber · rose · indigo · violet`)
live in `VP_TONE`.

---

## Quick start

### 1. Copy files
Drop `components/` and `styles/vision-pro.css` into your app (e.g.
`src/components/vision-pro/` and `src/styles/`).

### 2. Dependencies
Stock React + Tailwind. The components use **standard Tailwind classes only**
(`slate`, `blue`, `sky`, `emerald`, `amber`, `rose`, `indigo`, `violet`) — no
custom theme tokens needed. Fonts: Inter + JetBrains Mono (link or self-host).

### 3. Load the theme
Import once (e.g. in your root layout / `globals.css`):
```ts
import "@/styles/vision-pro.css";
```
Add the soft backdrop to your app shell so the glass has something to frost:
```tsx
<body className="… vp-canvas">  {/* or wrap your layout root */}
```
> `vp-canvas` is also applied by the body rules in `vision-pro.css` — if you
> import the css globally you get the gradient + dot grid for free.

### 4. Logo
The `Sidebar` references `/logo-mark.png`. Drop any square logo at
`public/logo-mark.png` (or edit the `<img src>` in `VisionProUI.tsx`).

### 5. Render
```tsx
import VisionProApp from "@/components/vision-pro/VisionProApp";
export default function Page() { return <VisionProApp />; }
```
…or compose your own shell:
```tsx
import { Sidebar, Topbar, PageHeader, KpiCard, DataTable } from "@/components/vision-pro/VisionProUI";
import { Icon } from "@/components/vision-pro/VPIcons";
```

---

## The 6 pages (`VisionProPages.tsx`)

| Page | Shows |
| --- | --- |
| `DashboardPage` | 4 sparkline KPIs · order-volume bar chart · warehouse capacity · recent orders · reorder alerts |
| `InventoryPage` | KPIs + filter bar + SKU table (on-hand / available / reorder point / status) |
| `OrdersPage` | KPIs + filter bar + sales-order table (channel / total / status) |
| `PurchasingPage` | KPIs + PO table (supplier / ETA / status) |
| `WarehousePage` | WMS — zone-capacity cards + Pick/Inbound tabs + task tables |
| `ReportsPage` | revenue bar chart + report-tile grid |
| `SettingsPage` | detail page — left sub-nav (General / Company / Warehouse / Notifications / Integrations) + form panels with `TextField`, `Select`, `Toggle` |
| `LoginPage` | centered glass auth card (email / password / remember / sign-in) |

Each page is self-contained with local filter state and placeholder data —
copy one as the starting point for a new screen.

### Two nav layouts + mobile

`VisionProApp.tsx` ships **both** navigation styles and a floating
`LayoutToggle` to switch live: a collapsible **Sidebar** (left rail) or a
horizontal **TopNav** bar. Under `lg` the side/top chrome hides and a
**MobileNav** bottom bar takes over. It also gates on `LoginPage` first —
click **Sign in** to enter, and the row-detail uses a **centered** `Drawer`
plus a confirm `Modal`. Pick whichever layout fits and delete the other if
client / vp helper). When switched to the **TopNav** layout the items render
**icon-only** (label in tooltip) to keep the bar compact; the account chip is
a `Dropdown` (Notifications / Settings / Sign out). The **Sidebar** keeps its
labels. Pick whichever layout fits and delete the other if you don't need the
toggle.

### Row-detail drawer

`OrdersPage` and `InventoryPage` show the **drawer** pattern: pass
`onRowClick={setSelected}` to `DataTable`, then render a `<Drawer>` with the
selected row's detail (line items, stock movement, timeline, actions). Copy
that wiring into any table page.

### Sticky top bar

The example shell (`VisionProApp.tsx`) keeps the `Topbar` pinned with
`sticky top-4 z-40` so it stays in view while the page scrolls — content
frosts under it via the glass background. The `Sidebar` is likewise sticky.

---

## Wiring to real data

Components are presentational. Replace the in-file arrays (`INV`, `ORD`, `PO`,
`PICK`, …) with data from your API / query layer, and pass `columns` + `rows`
to `DataTable`. `KpiCard` takes plain `value` / `delta` / `spark` props.

---

## Notes

- **No build assumptions.** Plain React + TS. Works with Next.js App Router
  (mark pages/shell `"use client"` since they use `useState`), Vite, etc.
- **TypeScript.** Props are loosely typed for portability; tighten as you
  integrate. If `noUnusedLocals` complains, prune the example imports you don't
  use.
- **Soft palette by design.** No dark navy / purple. Accent = `blue-500`,
  hovers are low-opacity `slate-900` tints.
- **Live HTML reference** of this template (no build needed) lives at
  `ui_kits/vision-pro-erp/index.html` in the design-system project.

*Vision Pro Glassmorphism · ERP/WMS starter.*
