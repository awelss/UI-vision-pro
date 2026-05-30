import React, { useState, useRef, useEffect } from "react";
import { Icon as VPI } from "./VPIcons";
// ═══════════════════════════════════════════════════════════════════════
// Vision Pro Glassmorphism — ERP / WMS component library
// Light, soft palette. Generic placeholder content — wire to your data.
// ═══════════════════════════════════════════════════════════════════════

// ── tone tables ────────────────────────────────────────────────────────
const TONE = {
  slate:   { fg: "#475569", bg: "rgba(71,85,105,0.10)",  bd: "rgba(71,85,105,0.28)" },
  blue:    { fg: "#2563eb", bg: "rgba(37,99,235,0.10)",  bd: "rgba(37,99,235,0.26)" },
  sky:     { fg: "#0284c7", bg: "rgba(2,132,199,0.10)",  bd: "rgba(2,132,199,0.26)" },
  emerald: { fg: "#059669", bg: "rgba(5,150,105,0.10)",  bd: "rgba(5,150,105,0.26)" },
  amber:   { fg: "#b45309", bg: "rgba(180,83,9,0.10)",   bd: "rgba(180,83,9,0.28)" },
  rose:    { fg: "#e11d48", bg: "rgba(225,29,72,0.10)",  bd: "rgba(225,29,72,0.26)" },
  indigo:  { fg: "#6366f1", bg: "rgba(99,102,241,0.10)", bd: "rgba(99,102,241,0.26)" },
  violet:  { fg: "#7c8cff", bg: "rgba(124,140,255,0.12)",bd: "rgba(124,140,255,0.28)" },
};

// ── Button ──────────────────────────────────────────────────────────────
function Button({ variant = "secondary", size = "md", icon: BIcon, children, onClick, type = "button" }) {
  const V = {
    primary:   "bg-blue-500 text-white hover:bg-blue-400 shadow-sm shadow-blue-500/20 border border-transparent",
    secondary: "vp-glass-subtle text-slate-700 hover:bg-slate-900/[0.04] border-0",
    ghost:     "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04] border border-transparent",
    danger:    "bg-rose-500 text-white hover:bg-rose-400 shadow-sm shadow-rose-500/20 border border-transparent",
  };
  const S = { sm: "px-2.5 py-1.5 text-[12px]", md: "px-3 py-2 text-[12.5px]", lg: "px-4 py-2.5 text-[13.5px]" };
  return (
    <button type={type} onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl font-medium transition-colors ${V[variant]} ${S[size]}`}>
      {BIcon && <BIcon size={size === "lg" ? 15 : 13} />}
      {children}
    </button>
  );
}

function IconButton({ icon: BIcon, onClick, title, badge }) {
  return (
    <button onClick={onClick} title={title}
      className="relative w-9 h-9 rounded-xl vp-glass-subtle hover:bg-slate-900/[0.05] flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
      <BIcon size={16} />
      {badge && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-white" />}
    </button>
  );
}

// ── Badges / pills ───────────────────────────────────────────────────────
function StatusBadge({ label, tone = "slate", dot = true }) {
  const t = TONE[tone] || TONE.slate;
  return (
    <span style={{ color: t.fg, background: t.bg, borderColor: t.bd }}
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono font-semibold whitespace-nowrap">
      {dot && <span style={{ background: t.fg }} className="w-1.5 h-1.5 rounded-full" />}
      {label}
    </span>
  );
}

function Pill({ tone = "slate", children }) {
  const t = TONE[tone] || TONE.slate;
  return <span style={{ color: t.fg, background: t.bg }} className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium">{children}</span>;
}

// ── Sparkline ─────────────────────────────────────────────────────────────
function Spark({ data, stroke = "#5b8eff" }) {
  const w = 220, h = 30, pad = 2;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((d, i) => `${(pad + (i/(data.length-1))*(w-2*pad)).toFixed(1)},${(h-pad-((d-min)/range)*(h-2*pad)).toFixed(1)}`);
  const path = "M" + pts.join(" L");
  const id = "vps-" + stroke.replace("#", "");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height: 30 }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={stroke} stopOpacity="0.26" /><stop offset="100%" stopColor={stroke} stopOpacity="0" />
      </linearGradient></defs>
      <path d={`${path} L${w-pad},${h-pad} L${pad},${h-pad} Z`} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── KPI card ───────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, delta, up, tone = "blue", spark }) {
  const t = TONE[tone] || TONE.blue;
  return (
    <div className="group relative vp-glass rounded-2xl p-4 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      <span className="absolute top-0 right-0 w-28 h-28 blur-2xl rounded-full pointer-events-none" style={{ background: t.bg }} />
      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: t.fg }} />
      <div className="relative flex items-start justify-between gap-2 mb-2 pl-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{label}</p>
        {delta && (
          <span style={{ color: t.fg, background: t.bg, borderColor: t.bd }}
            className="text-[9px] font-semibold rounded-md border px-1.5 py-0.5 flex items-center gap-0.5 whitespace-nowrap">
            {up === true && <VPI.Up size={9} />}{up === false && <VPI.Down size={9} />}{delta}
          </span>
        )}
      </div>
      <p className="relative tabular font-bold text-[24px] leading-none text-slate-900 pl-1.5">{value}</p>
      {sub && <p className="relative text-[10px] text-slate-400 mt-1.5 pl-1.5">{sub}</p>}
      {spark && <div className="mt-3"><Spark data={spark} stroke={t.fg} /></div>}
    </div>
  );
}

// ── Card / SectionCard ──────────────────────────────────────────────────────
function Card({ children, className = "", pad = "p-5" }) {
  return <div className={`vp-glass rounded-3xl ${pad} ${className}`}>{children}</div>;
}

function SectionCard({ icon: SIcon, title, subtitle, action, children, pad = "p-6" }) {
  return (
    <section className={`vp-glass rounded-3xl ${pad}`}>
      <header className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          {SIcon && (
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-600"
              style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}>
              <SIcon size={16} />
            </span>
          )}
          <div>
            <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

// ── Fields ───────────────────────────────────────────────────────────────────
function SearchField({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="relative flex-1 min-w-[200px] max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><VPI.Search size={14} /></span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full vp-glass-subtle rounded-xl pl-9 pr-8 py-2 text-[12.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors" />
      {value && <button onClick={() => onChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"><VPI.Close size={13} /></button>}
    </div>
  );
}

function Select({ value, onChange, options, label }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="vp-glass-subtle rounded-xl pl-3 pr-8 py-2 text-[12.5px] text-slate-900 outline-none cursor-pointer appearance-none focus:border-blue-400 transition-colors">
        <option value="">{label}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><VPI.ChevronDown size={12} /></span>
    </div>
  );
}

function TextField({ label, ...rest }) {
  return (
    <label className="block">
      {label && <span className="block text-[11px] font-medium text-slate-500 mb-1.5">{label}</span>}
      <input {...rest} className="w-full vp-glass-subtle rounded-xl px-3 py-2 text-[12.5px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors" />
    </label>
  );
}

function FilterPills({ pills }) {
  if (!pills.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills.map((p, i) => (
        <button key={i} onClick={p.onRemove}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 text-[11px] text-blue-600 hover:bg-blue-500/15 transition-colors">
          <span className="text-slate-400">{p.prefix}</span> {p.label}<VPI.Close size={11} />
        </button>
      ))}
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 vp-glass-subtle rounded-xl p-1 w-max">
      {tabs.map((t) => (
        <button key={t.key} onClick={() => onChange(t.key)}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all flex items-center gap-1.5 ${
            active === t.key ? "bg-blue-500 text-white shadow-sm shadow-blue-500/25" : "text-slate-500 hover:text-slate-900"}`}>
          {t.label}{t.badge != null && <span className={`text-[10px] tabular ${active === t.key ? "text-white/80" : "text-slate-400"}`}>{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

// ── Progress bar (WMS capacity etc.) ─────────────────────────────────────────────
function ProgressBar({ value, tone = "blue", height = 8 }) {
  const t = TONE[tone] || TONE.blue;
  return (
    <div className="w-full rounded-full bg-slate-200/60 overflow-hidden" style={{ height }}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, value)}%`, background: t.fg, boxShadow: `0 0 10px ${t.fg}55` }} />
    </div>
  );
}

// ── Pagination + DataTable ───────────────────────────────────────────────────────
function Pagination({ shown, total }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 flex-wrap" style={{ borderTop: "1px solid rgba(15,23,42,0.07)" }}>
      <span className="text-[11px] text-slate-400">Showing <span className="text-slate-700 font-medium">1–{shown}</span> of <span className="text-slate-700 font-medium">{total.toLocaleString()}</span></span>
      <div className="flex items-center gap-1.5">
        <select className="vp-glass-subtle rounded-lg px-2 py-1 text-[11px] text-slate-700 outline-none cursor-pointer appearance-none"><option>25 / page</option><option>50 / page</option><option>100 / page</option></select>
        <button className="vp-glass-subtle rounded-lg px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-900">‹</button>
        <button className="rounded-lg px-2.5 py-1.5 text-[11px] bg-blue-500 text-white">1</button>
        <button className="vp-glass-subtle rounded-lg px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-900">2</button>
        <button className="vp-glass-subtle rounded-lg px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-900">3</button>
        <button className="vp-glass-subtle rounded-lg px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-900">›</button>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer py-2">
      <span className="min-w-0">
        <span className="block text-[13px] font-medium text-slate-800">{label}</span>
        {desc && <span className="block text-[11px] text-slate-400 mt-0.5">{desc}</span>}
      </span>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-blue-500" : "bg-slate-300"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`} />
      </button>
    </label>
  );
}

function DataTable({ columns, rows, total, empty = "No data.", minWidth = 760, onRowClick }) {
  const al = (a) => a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";
  return (
    <div className="vp-glass rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px]" style={{ minWidth }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
              {columns.map((c) => (
                <th key={c.key} className={`px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 whitespace-nowrap ${al(c.align)}`}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={columns.length} className="px-3 py-12 text-center text-slate-400 text-[12px]">{empty}</td></tr>}
            {rows.map((r, i) => (
              <tr key={i} onClick={() => onRowClick && onRowClick(r)} className={`transition-colors hover:bg-blue-500/[0.04] cursor-pointer ${i % 2 ? "bg-slate-50/40" : ""}`}>
                {columns.map((c) => (
                  <td key={c.key} className={`px-3 py-3 ${al(c.align)} ${c.mono ? "font-mono tabular" : ""}`}>{c.cell(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total != null && <Pagination shown={rows.length} total={total} />}
    </div>
  );
}

// ── EmptyState ─────────────────────────────────────────────────────────────────────
function EmptyState({ icon: EIcon, title, desc, action }) {
  return (
    <div className="vp-glass rounded-3xl p-12 text-center flex flex-col items-center gap-3">
      <span className="w-14 h-14 rounded-3xl flex items-center justify-center text-blue-600" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}>
        {EIcon ? <EIcon size={24} /> : <VPI.Box size={24} />}
      </span>
      <div><p className="text-[15px] font-semibold text-slate-900">{title}</p>{desc && <p className="text-[12px] text-slate-400 mt-1 max-w-sm mx-auto">{desc}</p>}</div>
      {action}
    </div>
  );
}

// ── Drawer ─────────────────────────────────────────────────────────────────────────
function Drawer({ open, onClose, title, subtitle, children, footer, position = "right" }) {
  if (!open) return null;
  const center = position === "center";
  return (
    <div onClick={onClose} className={`fixed inset-0 z-[60] flex ${center ? "items-center justify-center p-4" : "justify-end"}`} style={{ background: "rgba(15,23,42,0.28)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
      <div onClick={(e) => e.stopPropagation()}
        className={center
          ? "vp-menu-in w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl vp-glass-strong p-6 flex flex-col gap-5"
          : "vp-slide-in w-full max-w-md h-full overflow-y-auto vp-glass-strong p-6 flex flex-col gap-5"}>
        <div className="flex items-start justify-between gap-3">
          <div>{subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}<h2 className="text-[17px] font-semibold text-slate-900 mt-0.5">{title}</h2></div>
          <IconButton icon={VPI.Close} onClick={onClose} title="Close" />
        </div>
        <div className="flex-1">{children}</div>
        {footer && <div className="pt-4 flex items-center gap-2" style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}>{footer}</div>}
      </div>
    </div>
  );
}

// ── Modal (centered dialog overlay) ──────────────────────────────────────────
function Modal({ open, onClose, title, subtitle, children, footer, maxWidth = 440 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.30)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
      <div onClick={(e) => e.stopPropagation()} className="vp-menu-in w-full vp-glass-strong rounded-3xl p-6 flex flex-col gap-4" style={{ maxWidth }}>
        {(title || subtitle) && (
          <div className="flex items-start justify-between gap-3">
            <div>{subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}<h2 className="text-[16px] font-semibold text-slate-900 mt-0.5">{title}</h2></div>
            <IconButton icon={VPI.Close} onClick={onClose} title="Close" />
          </div>
        )}
        <div className="text-[13px] text-slate-600 leading-relaxed">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 pt-1">{footer}</div>}
      </div>
    </div>
  );
}

// ── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ items }) {
  return (
    <ol className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: it.done ? "#059669" : "#cbd5e1" }} />
          <span className="text-[12.5px] text-slate-700 flex-1">{it.label}</span>
          <span className="text-[11px] text-slate-400">{it.time}</span>
        </li>
      ))}
    </ol>
  );
}

// ── PageHeader ──────────────────────────────────────────────────────────────────────
function PageHeader({ icon: HIcon, title, desc, breadcrumb, actions }) {
  return (
    <header className="vp-glass-strong rounded-3xl p-6 lg:p-7 flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3.5">
        {HIcon && (
          <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-blue-600" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}>
            <HIcon size={20} />
          </span>
        )}
        <div>
          {breadcrumb && (
            <nav className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
              {breadcrumb.map((b, i) => <span key={i} className="flex items-center gap-1.5">{i > 0 && <span className="opacity-50">/</span>}<span className={i === breadcrumb.length-1 ? "text-slate-600" : ""}>{b}</span></span>)}
            </nav>
          )}
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-900 leading-tight">{title}</h1>
          {desc && <p className="text-[12.5px] text-slate-400 mt-0.5">{desc}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </header>
  );
}

// ── Topbar ──────────────────────────────────────────────────────────────────────────
// ── Dropdown (compact menu) ──────────────────────────────────────────────
function Dropdown({ trigger, items, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className={`absolute z-[80] mt-2 min-w-[180px] vp-glass-strong rounded-xl p-1.5 vp-menu-in ${align === "right" ? "right-0" : "left-0"}`}>
          {items.map((it, i) => it.divider ? (
            <div key={i} className="my-1 h-px bg-slate-900/[0.06]" />
          ) : (
            <button key={i} onClick={() => { setOpen(false); it.onClick && it.onClick(); }}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-left transition-colors ${it.danger ? "text-rose-600 hover:bg-rose-500/[0.08]" : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900"}`}>
              {it.icon && <it.icon size={14} />}{it.label}
              {it.badge && <span className="ml-auto text-[10px] text-slate-400">{it.badge}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const ACCOUNT_MENU = [
  { icon: VPI.Bell, label: "Notifications", badge: "3" },
  { icon: VPI.Cog, label: "Settings" },
  { divider: true },
  { icon: VPI.Close, label: "Sign out", danger: true, onClick: () => window.location.reload() },
];

// ── Topbar ─────────────────────────────────────────────────────────────────
function Topbar({ title, onSearch }) {
  return (
    <header className="vp-glass-strong rounded-2xl px-3 py-2.5 flex items-center gap-3 mb-5">
      <h2 className="text-[14px] font-semibold text-slate-900 pl-2 hidden md:block">{title}</h2>
      <span className="vp-divider mx-1 hidden md:block" />
      <div className="flex-1 max-w-md"><SearchField value="" onChange={onSearch || (() => {})} placeholder="Search SKU, order, supplier… ⌘K" /></div>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium" style={{ color: "#059669", background: "rgba(5,150,105,0.10)", borderColor: "rgba(5,150,105,0.25)" }}>
          <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500 vp-live" style={{ color: "#10b981" }} />Synced
        </span>
        <IconButton icon={VPI.Bell} title="Notifications" badge />
        <span className="vp-divider mx-1 hidden md:block" />
        <Dropdown align="right" items={ACCOUNT_MENU} trigger={
          <button className="vp-glass-subtle rounded-xl pl-1 pr-2.5 py-1 flex items-center gap-2 hover:bg-slate-900/5 transition-colors">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-black/5">AD</span>
            <span className="leading-tight text-left hidden md:block"><span className="block text-[11px] font-semibold text-slate-900">Admin</span><span className="block text-[9px] text-slate-400">Operator</span></span>
          </button>
        } />
      </div>
    </header>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────────────
function Sidebar({ nav, active, onNav, collapsed, onToggle }) {
  return (
    <aside className={`vp-glass-strong rounded-3xl flex flex-col shrink-0 transition-all duration-300 ${collapsed ? "w-[68px]" : "w-60"}`} style={{ height: "calc(100vh - 32px)", position: "sticky", top: 16 }}>
      <div className="flex items-center gap-2.5 px-4 h-16 shrink-0">
        <img src="/logo-mark.png" alt="" className="w-9 h-9 rounded-xl object-cover shadow-md ring-1 ring-black/5 shrink-0" />
        {!collapsed && <div className="leading-tight min-w-0"><div className="text-[13px] font-semibold text-slate-900 truncate">Vision Pro</div><div className="text-[9px] uppercase tracking-[0.15em] text-slate-400">ERP · WMS</div></div>}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {nav.map((group) => (
          <div key={group.title}>
            {!collapsed && <p className="px-2.5 mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400/80">{group.title}</p>}
            <ul className="space-y-0.5">
              {group.items.map((it) => {
                const IIcon = it.icon;
                const on = active === it.key;
                return (
                  <li key={it.key}>
                    <button onClick={() => !it.soon && onNav(it.key)} title={it.label}
                      className={`w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-[13px] font-medium transition-colors ${collapsed ? "justify-center" : ""} ${
                        on ? "bg-blue-500/12 text-blue-600" : it.soon ? "text-slate-300 cursor-default" : "text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04]"}`}>
                      <IIcon size={16} />
                      {!collapsed && <span className="truncate flex-1 text-left">{it.label}</span>}
                      {!collapsed && it.soon && <span className="text-[8px] font-bold tracking-wider text-slate-300">SOON</span>}
                      {!collapsed && it.badge != null && !it.soon && <span className={`text-[10px] tabular ${on ? "text-blue-600" : "text-slate-400"}`}>{it.badge}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-3 shrink-0">
        <button onClick={onToggle} className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-[12px] text-slate-400 hover:text-slate-900 hover:bg-slate-900/[0.04] transition-colors">
          <VPI.Arrow size={14} className={collapsed ? "" : "rotate-180"} />{!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

// ── TopNav (horizontal nav — alternative to Sidebar) ────────────────────────
function TopNav({ nav, active, onNav }) {
  const items = nav.flatMap((g) => g.items);
  return (
    <header className="vp-glass-strong rounded-2xl px-3 py-2.5 flex items-center gap-1">
      <div className="flex items-center gap-2.5 pl-2 pr-3 mr-1 shrink-0">
        <img src="/logo-mark.png" alt="" className="w-9 h-9 rounded-xl object-cover shadow-md ring-1 ring-black/5" />
        <div className="leading-tight hidden sm:block"><div className="text-[13px] font-semibold text-slate-900">Vision Pro</div><div className="text-[9px] uppercase tracking-[0.15em] text-slate-400">ERP · WMS</div></div>
      </div>
      <span className="vp-divider mx-1" />
      <nav className="flex items-center gap-0.5 flex-1 min-w-0 overflow-x-auto">
        {items.map((it) => {
          const IIcon = it.icon; const on = active === it.key;
          return (
            <button key={it.key} onClick={() => !it.soon && onNav(it.key)} title={it.label}
              className={`relative w-10 h-10 rounded-xl transition-colors flex items-center justify-center shrink-0 ${on ? "bg-blue-500/12 text-blue-600" : it.soon ? "text-slate-300" : "text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04]"}`}>
              <IIcon size={17} />
            </button>
          );
        })}
      </nav>
      <div className="flex items-center gap-2 ml-1 shrink-0">
        <IconButton icon={VPI.Bell} badge title="Alerts" />
        <span className="vp-divider mx-1 hidden md:block" />
        <Dropdown align="right" items={ACCOUNT_MENU} trigger={
          <button className="vp-glass-subtle rounded-xl pl-1 pr-2.5 py-1 flex items-center gap-2 hover:bg-slate-900/5 transition-colors"><span className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-black/5">AD</span><span className="hidden md:block text-[11px] font-semibold text-slate-900">Admin</span><VPI.ChevronDown size={12} className="text-slate-400 hidden md:block" /></button>
        } />
      </div>
    </header>
  );
}

// ── MobileNav (bottom bar — shown < lg) ─────────────────────────────────────
function MobileNav({ items, active, onNav }) {
  return (
    <nav className="lg:hidden fixed bottom-3 inset-x-3 z-50 vp-glass-strong rounded-2xl px-1.5 py-1.5 flex items-center justify-around">
      {items.map((it) => {
        const IIcon = it.icon; const on = active === it.key;
        return (
          <button key={it.key} onClick={() => onNav(it.key)} className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl transition-colors ${on ? "text-blue-600" : "text-slate-400"}`}>
            <IIcon size={18} /><span className="text-[9px] font-medium">{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ── LayoutToggle (switch side ↔ top nav) ─────────────────────────────────────
function LayoutToggle({ layout, onLayout }) {
  return (
    <div className="hidden lg:flex fixed bottom-4 right-4 z-50 vp-glass-strong rounded-full p-1 items-center gap-1">
      {[["side", "Side", VPI.Columns], ["top", "Top", VPI.Grid]].map(([k, l, KI]) => (
        <button key={k} onClick={() => onLayout(k)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${layout === k ? "bg-blue-500 text-white" : "text-slate-500 hover:text-slate-900"}`}><KI size={13} />{l}</button>
      ))}
    </div>
  );
}

export {
  TONE as VP_TONE, Button, IconButton, StatusBadge, Pill, Spark, KpiCard, Card, SectionCard,
  SearchField, Select, TextField, Toggle, FilterPills, Tabs, ProgressBar, Pagination, DataTable,
  EmptyState, Drawer, Modal, Timeline, PageHeader, Topbar, Sidebar, TopNav, MobileNav, LayoutToggle, Dropdown,
};

