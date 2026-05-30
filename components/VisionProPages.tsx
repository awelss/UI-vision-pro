import React, { useState } from "react";
import { Icon as VPI } from "./VPIcons";
import {
  Button, KpiCard, DataTable, StatusBadge, Pill, SearchField, Select, FilterPills,
  Tabs, ProgressBar, SectionCard, Card, PageHeader, Drawer, TextField, Toggle, Timeline, Modal,
} from "./VisionProUI";
// generic ERP/WMS placeholder content — replace with your API data.

// ════════════════════════════════════════════════════════════════════
// 1 · DASHBOARD
// ════════════════════════════════════════════════════════════════════
function DashboardPage() {
  const orders = [
    { no: "SO-100482", cust: "Acme Retail",      ch: "Web",       items: 4, total: "$1,240.00", status: "Fulfilled",  tone: "emerald" },
    { no: "SO-100481", cust: "Northwind Co.",    ch: "Marketplace", items: 1, total: "$219.00",  status: "Packing",    tone: "amber" },
    { no: "SO-100480", cust: "Globex Ltd.",      ch: "POS",       items: 7, total: "$3,180.00", status: "Pending",    tone: "slate" },
    { no: "SO-100479", cust: "Soylent Corp.",    ch: "Web",       items: 2, total: "$486.00",   status: "Fulfilled",  tone: "emerald" },
    { no: "SO-100478", cust: "Initech",          ch: "Marketplace", items: 3, total: "$702.00",  status: "Returned",   tone: "rose" },
  ];
  const lowStock = [
    { sku: "SKU-0417", name: "USB-C Power Strip 65W", on: 12, rop: 40, tone: "rose" },
    { sku: "SKU-0521", name: "Wireless Earbuds Pro",  on: 9,  rop: 30, tone: "rose" },
    { sku: "SKU-0099", name: "Memory Foam Cushion",   on: 28, rop: 35, tone: "amber" },
    { sku: "SKU-0712", name: "Smart Plug 16A (4-pk)", on: 22, rop: 30, tone: "amber" },
  ];
  const volume = [42, 38, 51, 47, 58, 62, 55, 68, 64, 72, 70, 78];

  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Home} title="Dashboard" desc="Operations overview · last 30 days"
        actions={<><Button icon={VPI.Download}>Export</Button><Button variant="primary" icon={VPI.Plus}>New Order</Button></>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Revenue" value="$284.6k" delta="+12.4%" up tone="indigo" spark={[20,22,21,26,25,30,29,34,33,38,40,42]} />
        <KpiCard label="Open Orders" value="1,284" delta="+8.0%" up tone="blue" spark={[40,42,41,45,48,46,52,55,54,58,60,61]} />
        <KpiCard label="Inventory Value" value="$1.82M" delta="−2.1%" up={false} tone="emerald" spark={[60,58,57,55,54,52,53,51,52,50,49,48]} />
        <KpiCard label="Low Stock SKUs" value="47" delta="+5" tone="amber" spark={[28,30,33,35,38,40,42,44,45,46,47,47]} />
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard icon={VPI.Chart} title="Order Volume" subtitle="orders / day · 12-day trend"
            action={<a href="#" className="text-[11px] text-blue-600 hover:underline">Details →</a>}>
            <div className="flex items-end gap-2 h-44 pt-2">
              {volume.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-blue-500/70 to-sky-400/70" style={{ height: `${v * 1.7}px`, boxShadow: "0 0 14px rgba(59,130,246,0.25)" }} />
                  <span className="text-[9px] text-slate-400 font-mono">D{i + 1}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SectionCard icon={VPI.Warehouse} title="Warehouse Capacity" subtitle="by zone">
            <div className="space-y-3.5">
              {[["Zone A · Bulk", 82, "rose"], ["Zone B · Pick", 64, "amber"], ["Zone C · Cold", 41, "emerald"], ["Zone D · Returns", 28, "blue"]].map(([n, v, t]) => (
                <div key={n}>
                  <div className="flex items-center justify-between text-[12px] mb-1.5"><span className="text-slate-600">{n}</span><span className="tabular font-mono text-slate-900 font-medium">{v}%</span></div>
                  <ProgressBar value={v} tone={t} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <SectionCard icon={VPI.Cart} title="Recent Orders" subtitle="latest 5"
            action={<a href="#" className="text-[11px] text-blue-600 hover:underline">All orders →</a>}>
            <table className="w-full text-[12.5px]">
              <thead><tr className="text-[10px] uppercase tracking-[0.1em] text-slate-400">
                <th className="text-left font-semibold px-2 py-2">Order</th><th className="text-left font-semibold px-2 py-2">Customer</th>
                <th className="text-left font-semibold px-2 py-2">Channel</th><th className="text-right font-semibold px-2 py-2">Total</th><th className="text-left font-semibold px-2 py-2">Status</th>
              </tr></thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={o.no} className={`hover:bg-blue-500/[0.04] transition-colors ${i % 2 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-2 py-2.5 font-mono text-[11.5px] text-slate-500">{o.no}</td>
                    <td className="px-2 py-2.5 text-slate-900 font-medium">{o.cust}</td>
                    <td className="px-2 py-2.5"><Pill tone="slate">{o.ch}</Pill></td>
                    <td className="px-2 py-2.5 text-right font-mono tabular text-slate-900">{o.total}</td>
                    <td className="px-2 py-2.5"><StatusBadge label={o.status} tone={o.tone} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <SectionCard icon={VPI.Alert} title="Reorder Alerts" subtitle="below reorder point"
            action={<a href="#" className="text-[11px] text-blue-600 hover:underline">Create PO →</a>}>
            <ul className="space-y-1 -mx-1">
              {lowStock.map((s) => (
                <li key={s.sku} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-blue-500/[0.04] transition-colors">
                  <span className="flex-1 min-w-0"><span className="block text-[12.5px] text-slate-900 font-medium truncate">{s.name}</span><span className="block text-[10px] font-mono text-slate-400">{s.sku}</span></span>
                  <span className="text-right"><span className="block text-[12px] tabular font-mono font-semibold" style={{ color: s.tone === "rose" ? "#e11d48" : "#b45309" }}>{s.on}</span><span className="block text-[9px] text-slate-400">/ {s.rop}</span></span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 2 · INVENTORY
// ════════════════════════════════════════════════════════════════════
const INV = [
  { sku: "SKU-0417", name: "USB-C Power Strip 65W",  cat: "Accessories", wh: "Zone A", on: 12,  av: 8,   rop: 40, status: "Low",    tone: "amber" },
  { sku: "SKU-0521", name: "Wireless Earbuds Pro",   cat: "Audio",       wh: "Zone B", on: 9,   av: 5,   rop: 30, status: "Low",    tone: "amber" },
  { sku: "SKU-0204", name: "Smart Doorbell V2",      cat: "Smart Home",  wh: "Zone A", on: 142, av: 138, rop: 40, status: "In Stock",tone: "emerald" },
  { sku: "SKU-0604", name: "Ceramic Mug 350ml",      cat: "Home",        wh: "Zone C", on: 88,  av: 80,  rop: 25, status: "In Stock",tone: "emerald" },
  { sku: "SKU-0351", name: "Bamboo Diffuser 300ml",  cat: "Home",        wh: "Zone C", on: 188, av: 188, rop: 20, status: "Overstock",tone: "blue" },
  { sku: "SKU-1122", name: "Mini Clip Fan USB",      cat: "Accessories", wh: "Zone D", on: 0,   av: 0,   rop: 15, status: "Out",     tone: "rose" },
  { sku: "SKU-0789", name: "Foldable Phone Stand",   cat: "Accessories", wh: "Zone B", on: 64,  av: 60,  rop: 20, status: "In Stock",tone: "emerald" },
  { sku: "SKU-0868", name: "Travel Duffel 40L",      cat: "Bags",        wh: "Zone A", on: 18,  av: 12,  rop: 25, status: "Low",     tone: "amber" },
];
function InventoryPage() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState(""); const [st, setSt] = useState(""); const [sel, setSel] = useState(null);
  const rows = INV.filter((r) => (!q || (r.name + r.sku).toLowerCase().includes(q.toLowerCase())) && (!cat || r.cat === cat) && (!st || r.status === st));
  const pills = []; if (cat) pills.push({ prefix: "Category:", label: cat, onRemove: () => setCat("") }); if (st) pills.push({ prefix: "Status:", label: st, onRemove: () => setSt("") });
  const cols = [
    { key: "sku", label: "SKU", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.sku}</span> },
    { key: "name", label: "Product", cell: (r) => <span className="text-slate-900 font-medium">{r.name}</span> },
    { key: "cat", label: "Category", cell: (r) => <Pill tone="slate">{r.cat}</Pill> },
    { key: "wh", label: "Location", cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.wh}</span> },
    { key: "on", label: "On Hand", align: "right", mono: true, cell: (r) => r.on },
    { key: "av", label: "Available", align: "right", mono: true, cell: (r) => <span className="text-slate-500">{r.av}</span> },
    { key: "rop", label: "Reorder Pt", align: "right", mono: true, cell: (r) => <span className="text-slate-400">{r.rop}</span> },
    { key: "status", label: "Status", cell: (r) => <StatusBadge label={r.status} tone={r.tone} /> },
  ];
  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Box} title="Inventory" desc="Stock on hand across all warehouses" breadcrumb={["ERP", "Inventory"]}
        actions={<><Button icon={VPI.Download}>Export</Button><Button variant="primary" icon={VPI.Plus}>Add Product</Button></>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total SKUs" value="2,518" sub="active" tone="slate" />
        <KpiCard label="In Stock" value="2,270" sub="90.2%" tone="emerald" />
        <KpiCard label="Low Stock" value="47" sub="below ROP" tone="amber" />
        <KpiCard label="Out of Stock" value="18" sub="needs PO" tone="rose" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SearchField value={q} onChange={setQ} placeholder="Search SKU / product…" />
        <Select value={cat} onChange={setCat} label="All Categories" options={["Accessories", "Audio", "Smart Home", "Home", "Bags"]} />
        <Select value={st} onChange={setSt} label="All Status" options={["In Stock", "Low", "Out", "Overstock"]} />
      </div>
      <FilterPills pills={pills} />
      <DataTable columns={cols} rows={rows} total={2518} onRowClick={setSel} empty="No products match your filters." />
      <Drawer open={!!sel} onClose={() => setSel(null)} position="center"
        title={sel ? sel.name : ""} subtitle={sel ? sel.sku : ""}
        footer={<><Button variant="ghost" onClick={() => setSel(null)}>Close</Button><Button variant="primary" icon={VPI.Plus}>Create PO</Button></>}>
        {sel && (
          <div className="space-y-5">
            <div className="flex items-center gap-2"><StatusBadge label={sel.status} tone={sel.tone} /><Pill tone="slate">{sel.cat}</Pill><Pill tone="blue">{sel.wh}</Pill></div>
            <div className="grid grid-cols-3 gap-3">
              <Card pad="p-3"><p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">On Hand</p><p className="text-[20px] font-bold tabular font-mono text-slate-900 mt-1">{sel.on}</p></Card>
              <Card pad="p-3"><p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">Available</p><p className="text-[20px] font-bold tabular font-mono text-slate-900 mt-1">{sel.av}</p></Card>
              <Card pad="p-3"><p className="text-[10px] uppercase tracking-[0.1em] text-slate-400">Reorder</p><p className="text-[20px] font-bold tabular font-mono text-slate-400 mt-1">{sel.rop}</p></Card>
            </div>
            <div>
              <div className="flex items-center justify-between text-[12px] mb-1.5"><span className="text-slate-500">Stock vs reorder point</span><span className="tabular font-mono text-slate-900">{sel.on} / {sel.rop}</span></div>
              <ProgressBar value={Math.min(100, (sel.on / Math.max(sel.rop, 1)) * 100)} tone={sel.tone} />
            </div>
            <Card pad="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2">Recent Movement</p>
              <ul className="space-y-2 text-[12px]">
                {[["Inbound", "+40", "May 24", "emerald"], ["Sale", "-12", "May 27", "rose"], ["Sale", "-9", "May 29", "rose"], ["Adjustment", "-7", "May 30", "amber"]].map(([t, n, d, tone], i) => (
                  <li key={i} className="flex items-center gap-3"><span className="flex-1 text-slate-700">{t}</span><span className="font-mono tabular font-semibold" style={{ color: tone === "emerald" ? "#059669" : tone === "rose" ? "#e11d48" : "#b45309" }}>{n}</span><span className="text-slate-400 w-14 text-right">{d}</span></li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 3 · ORDERS
// ════════════════════════════════════════════════════════════════════
const ORD = [
  { no: "SO-100482", date: "May 30, 2026", cust: "Acme Retail",   ch: "Web",       items: 4, total: "$1,240.00", status: "Fulfilled", tone: "emerald" },
  { no: "SO-100481", date: "May 30, 2026", cust: "Northwind Co.", ch: "Marketplace",items: 1, total: "$219.00",  status: "Packing",   tone: "amber" },
  { no: "SO-100480", date: "May 30, 2026", cust: "Globex Ltd.",   ch: "POS",       items: 7, total: "$3,180.00", status: "Pending",   tone: "slate" },
  { no: "SO-100479", date: "May 29, 2026", cust: "Soylent Corp.", ch: "Web",       items: 2, total: "$486.00",   status: "Fulfilled", tone: "emerald" },
  { no: "SO-100478", date: "May 29, 2026", cust: "Initech",       ch: "Marketplace",items: 3, total: "$702.00",  status: "Returned",  tone: "rose" },
  { no: "SO-100477", date: "May 29, 2026", cust: "Umbrella Inc.", ch: "Web",       items: 5, total: "$1,905.00", status: "Shipped",   tone: "blue" },
  { no: "SO-100476", date: "May 28, 2026", cust: "Stark Trading", ch: "POS",       items: 1, total: "$149.00",   status: "Fulfilled", tone: "emerald" },
  { no: "SO-100475", date: "May 28, 2026", cust: "Wayne Supply",  ch: "Marketplace",items: 6, total: "$2,430.00",status: "Cancelled", tone: "slate" },
];
function OrdersPage() {
  const [q, setQ] = useState(""); const [ch, setCh] = useState(""); const [st, setSt] = useState(""); const [sel, setSel] = useState(null); const [confirm, setConfirm] = useState(false);
  const rows = ORD.filter((r) => (!q || (r.cust + r.no).toLowerCase().includes(q.toLowerCase())) && (!ch || r.ch === ch) && (!st || r.status === st));
  const pills = []; if (ch) pills.push({ prefix: "Channel:", label: ch, onRemove: () => setCh("") }); if (st) pills.push({ prefix: "Status:", label: st, onRemove: () => setSt("") });
  const cols = [
    { key: "no", label: "Order #", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.no}</span> },
    { key: "date", label: "Date", cell: (r) => <span className="text-slate-500 whitespace-nowrap">{r.date}</span> },
    { key: "cust", label: "Customer", cell: (r) => <span className="text-slate-900 font-medium">{r.cust}</span> },
    { key: "ch", label: "Channel", cell: (r) => <Pill tone="slate">{r.ch}</Pill> },
    { key: "items", label: "Items", align: "right", mono: true, cell: (r) => r.items },
    { key: "total", label: "Total", align: "right", mono: true, cell: (r) => <span className="text-slate-900 font-medium">{r.total}</span> },
    { key: "status", label: "Status", cell: (r) => <StatusBadge label={r.status} tone={r.tone} /> },
  ];
  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Cart} title="Orders" desc="Sales orders across all channels" breadcrumb={["ERP", "Orders"]}
        actions={<><Button icon={VPI.Download}>Export</Button><Button variant="primary" icon={VPI.Plus}>New Order</Button></>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Orders" value="1,284" delta="+8.0%" up tone="blue" />
        <KpiCard label="Fulfilled" value="1,108" sub="86.3%" tone="emerald" />
        <KpiCard label="Pending" value="142" sub="needs action" tone="amber" />
        <KpiCard label="Returns" value="34" sub="2.6%" tone="rose" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SearchField value={q} onChange={setQ} placeholder="Search order # / customer…" />
        <Select value={ch} onChange={setCh} label="All Channels" options={["Web", "Marketplace", "POS"]} />
        <Select value={st} onChange={setSt} label="All Status" options={["Fulfilled", "Shipped", "Packing", "Pending", "Returned", "Cancelled"]} />
      </div>
      <FilterPills pills={pills} />
      <DataTable columns={cols} rows={rows} total={1284} onRowClick={setSel} empty="No orders match your filters." />
      <Drawer open={!!sel} onClose={() => setSel(null)} position="center"
        title={sel ? sel.no : ""} subtitle={sel ? `${sel.cust} · ${sel.date}` : ""}
        footer={<><Button variant="ghost" onClick={() => setSel(null)}>Close</Button><Button icon={VPI.Download}>Invoice</Button><Button variant="primary" icon={VPI.Truck} onClick={() => setConfirm(true)}>Fulfill</Button></>}>
        {sel && <OrderDetail o={sel} />}
      </Drawer>
      <Modal open={confirm} onClose={() => setConfirm(false)} title="Mark as fulfilled?" subtitle={sel ? sel.no : ""}
        footer={<><Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button><Button variant="primary" onClick={() => { setConfirm(false); setSel(null); }}>Confirm</Button></>}>
        This will allocate stock and generate a shipping label for <b>{sel ? sel.cust : ""}</b>. You can undo within 30 minutes.
      </Modal>
    </div>
  );
}

function OrderDetail({ o }) {
  const lines = [
    { sku: "SKU-0417", name: "USB-C Power Strip 65W", qty: 2, price: "$45.00" },
    { sku: "SKU-0204", name: "Smart Doorbell V2", qty: 1, price: "$129.00" },
    { sku: "SKU-0604", name: "Ceramic Mug 350ml", qty: o.items > 2 ? o.items - 2 : 1, price: "$12.50" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <StatusBadge label={o.status} tone={o.tone} />
        <Pill tone="slate">{o.ch}</Pill>
        <span className="ml-auto text-[11px] text-slate-400">{o.items} items</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card pad="p-3"><p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Customer</p><p className="text-[13px] font-medium text-slate-900 mt-1">{o.cust}</p></Card>
        <Card pad="p-3"><p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Order Total</p><p className="text-[15px] font-bold tabular font-mono text-slate-900 mt-1">{o.total}</p></Card>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2">Line Items</p>
        <div className="vp-glass rounded-2xl overflow-hidden">
          <table className="w-full text-[12px]">
            <tbody>
              {lines.map((l, i) => (
                <tr key={l.sku} className={i ? "border-t border-slate-900/[0.06]" : ""}>
                  <td className="px-3 py-2.5"><span className="block text-slate-900 font-medium">{l.name}</span><span className="block text-[10px] font-mono text-slate-400">{l.sku}</span></td>
                  <td className="px-3 py-2.5 text-right font-mono tabular text-slate-500">×{l.qty}</td>
                  <td className="px-3 py-2.5 text-right font-mono tabular text-slate-900">{l.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2">Timeline</p>
        <Timeline items={[
          { label: "Order placed", time: o.date, done: true },
          { label: "Payment confirmed", time: o.date, done: true },
          { label: "Picking", time: o.status === "Pending" ? "pending" : o.date, done: o.status !== "Pending" },
          { label: "Shipped", time: (o.status === "Fulfilled" || o.status === "Shipped") ? o.date : "—", done: o.status === "Fulfilled" || o.status === "Shipped" },
        ]} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 4 · PURCHASING
// ════════════════════════════════════════════════════════════════════
const PO = [
  { no: "PO-2026-018", sup: "Shenzhen Tech Co.",  date: "May 28", items: 11, total: "$14,200", eta: "Jun 15", status: "Confirmed", tone: "indigo" },
  { no: "PO-2026-017", sup: "Audio Source HK",    date: "May 27", items: 8,  total: "$11,600", eta: "Jun 18", status: "Shipped",   tone: "amber" },
  { no: "PO-2026-016", sup: "Wuxi Home Goods",    date: "May 25", items: 6,  total: "$8,400",  eta: "Jun 10", status: "Confirmed", tone: "indigo" },
  { no: "PO-2026-015", sup: "Yiwu Bag Factory",   date: "May 22", items: 4,  total: "$6,100",  eta: "—",      status: "Received",  tone: "emerald" },
  { no: "PO-2026-014", sup: "Shenzhen Tech Co.",  date: "May 20", items: 9,  total: "$12,800", eta: "—",      status: "Received",  tone: "emerald" },
  { no: "PO-2026-013", sup: "Guangzhou Plastics", date: "May 18", items: 5,  total: "$5,900",  eta: "Overdue",status: "Overdue",   tone: "rose" },
  { no: "PO-2026-012", sup: "Audio Source HK",    date: "May 15", items: 3,  total: "$4,200",  eta: "—",      status: "Draft",     tone: "slate" },
];
function PurchasingPage() {
  const [q, setQ] = useState(""); const [sup, setSup] = useState(""); const [st, setSt] = useState("");
  const rows = PO.filter((r) => (!q || (r.sup + r.no).toLowerCase().includes(q.toLowerCase())) && (!sup || r.sup === sup) && (!st || r.status === st));
  const pills = []; if (sup) pills.push({ prefix: "Supplier:", label: sup, onRemove: () => setSup("") }); if (st) pills.push({ prefix: "Status:", label: st, onRemove: () => setSt("") });
  const cols = [
    { key: "no", label: "PO #", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.no}</span> },
    { key: "sup", label: "Supplier", cell: (r) => <span className="text-slate-900 font-medium">{r.sup}</span> },
    { key: "date", label: "Date", cell: (r) => <span className="text-slate-500 whitespace-nowrap">{r.date}</span> },
    { key: "items", label: "Items", align: "right", mono: true, cell: (r) => r.items },
    { key: "total", label: "Total", align: "right", mono: true, cell: (r) => <span className="text-slate-900 font-medium">{r.total}</span> },
    { key: "eta", label: "ETA", cell: (r) => <span className="text-slate-500 text-[11.5px] whitespace-nowrap">{r.eta}</span> },
    { key: "status", label: "Status", cell: (r) => <StatusBadge label={r.status} tone={r.tone} /> },
  ];
  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Truck} title="Purchasing" desc="Purchase orders & supplier receiving" breadcrumb={["ERP", "Purchasing"]}
        actions={<><Button icon={VPI.Download}>Export</Button><Button variant="primary" icon={VPI.Plus}>Create PO</Button></>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Open POs" value="38" sub="this month" tone="blue" />
        <KpiCard label="Receiving" value="23" sub="in transit" tone="amber" />
        <KpiCard label="PO Value" value="$184.2k" sub="outstanding" tone="indigo" />
        <KpiCard label="Overdue" value="6" sub="past ETA" tone="rose" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SearchField value={q} onChange={setQ} placeholder="Search PO # / supplier…" />
        <Select value={sup} onChange={setSup} label="All Suppliers" options={["Shenzhen Tech Co.", "Audio Source HK", "Wuxi Home Goods", "Yiwu Bag Factory", "Guangzhou Plastics"]} />
        <Select value={st} onChange={setSt} label="All Status" options={["Draft", "Confirmed", "Shipped", "Received", "Overdue"]} />
      </div>
      <FilterPills pills={pills} />
      <DataTable columns={cols} rows={rows} total={38} empty="No purchase orders match your filters." />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 5 · WAREHOUSE (WMS)
// ════════════════════════════════════════════════════════════════════
const PICK = [
  { task: "PT-5582", order: "SO-100482", zone: "A-12-3", items: 4, who: "J. Doe",   status: "Picking",  tone: "amber" },
  { task: "PT-5581", order: "SO-100481", zone: "B-04-1", items: 1, who: "M. Smith", status: "Assigned", tone: "blue" },
  { task: "PT-5580", order: "SO-100480", zone: "A-08-2", items: 7, who: "R. Lee",   status: "Picking",  tone: "amber" },
  { task: "PT-5579", order: "SO-100479", zone: "C-02-4", items: 2, who: "K. Park",  status: "Done",     tone: "emerald" },
  { task: "PT-5578", order: "SO-100477", zone: "B-11-2", items: 5, who: "—",        status: "Queued",   tone: "slate" },
];
const INBOUND = [
  { asn: "ASN-3201", sup: "Shenzhen Tech Co.", dock: "Dock 2", items: 11, status: "Receiving", tone: "amber" },
  { asn: "ASN-3200", sup: "Yiwu Bag Factory",  dock: "Dock 1", items: 4,  status: "Putaway",   tone: "blue" },
  { asn: "ASN-3199", sup: "Wuxi Home Goods",   dock: "—",      items: 6,  status: "Scheduled", tone: "slate" },
];
function WarehousePage() {
  const [tab, setTab] = useState("pick");
  const pickCols = [
    { key: "task", label: "Task", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.task}</span> },
    { key: "order", label: "Order", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.order}</span> },
    { key: "zone", label: "Bin", mono: true, cell: (r) => <Pill tone="blue">{r.zone}</Pill> },
    { key: "items", label: "Items", align: "right", mono: true, cell: (r) => r.items },
    { key: "who", label: "Assignee", cell: (r) => <span className="text-slate-900">{r.who}</span> },
    { key: "status", label: "Status", cell: (r) => <StatusBadge label={r.status} tone={r.tone} /> },
  ];
  const inCols = [
    { key: "asn", label: "ASN", mono: true, cell: (r) => <span className="text-slate-500 text-[11.5px]">{r.asn}</span> },
    { key: "sup", label: "Supplier", cell: (r) => <span className="text-slate-900 font-medium">{r.sup}</span> },
    { key: "dock", label: "Dock", cell: (r) => <Pill tone="slate">{r.dock}</Pill> },
    { key: "items", label: "Items", align: "right", mono: true, cell: (r) => r.items },
    { key: "status", label: "Status", cell: (r) => <StatusBadge label={r.status} tone={r.tone} /> },
  ];
  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Warehouse} title="Warehouse" desc="WMS · pick · pack · inbound" breadcrumb={["WMS", "Operations"]}
        actions={<><Button icon={VPI.Scan}>Scan</Button><Button variant="primary" icon={VPI.Plus}>New Task</Button></>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[["Zone A · Bulk", 82, "rose"], ["Zone B · Pick", 64, "amber"], ["Zone C · Cold", 41, "emerald"], ["Zone D · Returns", 28, "blue"]].map(([n, v, t]) => (
          <Card key={n} pad="p-4">
            <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{n}</span><span className="tabular font-mono text-[18px] font-bold text-slate-900">{v}%</span></div>
            <ProgressBar value={v} tone={t} />
          </Card>
        ))}
      </div>
      <Tabs tabs={[{ key: "pick", label: "Pick Tasks", badge: 5 }, { key: "inbound", label: "Inbound", badge: 3 }]} active={tab} onChange={setTab} />
      {tab === "pick"
        ? <DataTable columns={pickCols} rows={PICK} total={28} />
        : <DataTable columns={inCols} rows={INBOUND} total={12} />}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 6 · REPORTS
// ════════════════════════════════════════════════════════════════════
function ReportsPage() {
  const months = [["Jan", 62], ["Feb", 70], ["Mar", 58], ["Apr", 78], ["May", 84], ["Jun", 72]];
  const max = 90;
  const reports = [
    ["Sales by Channel", "Web · Marketplace · POS revenue split", VPI.Cart],
    ["Inventory Aging", "0–30 / 31–60 / 61–90 / 90+ days", VPI.Box],
    ["Supplier Performance", "On-time %, fill rate, lead time", VPI.Truck],
    ["Stock Movement", "Inbound vs outbound by SKU", VPI.Refresh],
    ["Fulfillment SLA", "Pick→ship cycle time", VPI.Clock],
    ["Margin Analysis", "Gross margin by category", VPI.Chart],
  ];
  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Chart} title="Reports" desc="Analytics & exports" breadcrumb={["ERP", "Reports"]}
        actions={<Button variant="primary" icon={VPI.Download}>Export All</Button>} />
      <SectionCard icon={VPI.Chart} title="Revenue" subtitle="last 6 months · $000s"
        action={<a href="#" className="text-[11px] text-blue-600 hover:underline">Full report →</a>}>
        <div className="flex items-end gap-4 h-48 pt-2">
          {months.map(([m, v]) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[11px] tabular font-mono text-slate-500">{v}</span>
              <div className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500/70 to-sky-400/70" style={{ height: `${(v / max) * 150}px`, boxShadow: "0 0 16px rgba(99,102,241,0.25)" }} />
              <span className="text-[10px] text-slate-400 font-mono">{m}</span>
            </div>
          ))}
        </div>
      </SectionCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(([t, d, RIcon]) => (
          <button key={t} className="vp-glass rounded-2xl p-5 text-left hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 shrink-0" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}><RIcon size={18} /></span>
              <div className="min-w-0"><p className="text-[13.5px] font-semibold text-slate-900">{t}</p><p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{d}</p></div>
              <VPI.Arrow size={14} className="text-slate-300 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 7 · SETTINGS (detail page)
// ════════════════════════════════════════════════════════════════════
const SETTINGS_NAV = [
  { key: "general",       label: "General",        icon: VPI.Cog },
  { key: "company",       label: "Company",        icon: VPI.Factory },
  { key: "warehouse",     label: "Warehouse",      icon: VPI.Warehouse },
  { key: "notifications", label: "Notifications",  icon: VPI.Bell },
  { key: "integrations",  label: "Integrations",   icon: VPI.Refresh },
];

function SettingsPage() {
  const [panel, setPanel] = useState("general");
  const [notif, setNotif] = useState({ lowStock: true, newOrder: true, poReceived: false, weekly: true });
  const [autoPO, setAutoPO] = useState(true);

  return (
    <div className="space-y-5">
      <PageHeader icon={VPI.Cog} title="Settings" desc="Workspace, company & operational preferences" breadcrumb={["System", "Settings"]}
        actions={<><Button variant="ghost">Cancel</Button><Button variant="primary">Save changes</Button></>} />

      <div className="grid grid-cols-12 gap-5 items-start">
        {/* sub-nav */}
        <div className="col-span-12 lg:col-span-3">
          <Card pad="p-2">
            <ul className="space-y-0.5">
              {SETTINGS_NAV.map((s) => {
                const SIcon = s.icon; const on = panel === s.key;
                return (
                  <li key={s.key}>
                    <button onClick={() => setPanel(s.key)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${on ? "bg-blue-500/12 text-blue-600" : "text-slate-500 hover:text-slate-900 hover:bg-slate-900/[0.04]"}`}>
                      <SIcon size={16} /><span>{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        {/* panel */}
        <div className="col-span-12 lg:col-span-9 space-y-5">
          {panel === "general" && (
            <SectionCard icon={VPI.Cog} title="General" subtitle="Profile & workspace defaults">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Display name" defaultValue="Admin" />
                <TextField label="Email" defaultValue="admin@company.com" />
                <label className="block"><span className="block text-[11px] font-medium text-slate-500 mb-1.5">Language</span><Select value="" onChange={() => {}} label="English (US)" options={["Bahasa Indonesia", "中文"]} /></label>
                <label className="block"><span className="block text-[11px] font-medium text-slate-500 mb-1.5">Timezone</span><Select value="" onChange={() => {}} label="GMT+7 · Jakarta" options={["GMT+8 · Singapore", "GMT+0 · UTC"]} /></label>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-900/[0.06]">
                <Toggle checked={true} onChange={() => {}} label="Compact tables" desc="Denser row height across all data tables" />
              </div>
            </SectionCard>
          )}

          {panel === "company" && (
            <SectionCard icon={VPI.Factory} title="Company" subtitle="Legal entity & billing">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Company name" defaultValue="Vision Pro Trading Co." />
                <TextField label="Tax ID" defaultValue="01.234.567.8-901.000" />
                <TextField label="Address" defaultValue="Jl. Industri No. 42" />
                <TextField label="City" defaultValue="Jakarta" />
                <label className="block"><span className="block text-[11px] font-medium text-slate-500 mb-1.5">Base currency</span><Select value="" onChange={() => {}} label="USD ($)" options={["IDR (Rp)", "CNY (¥)", "EUR (€)"]} /></label>
                <TextField label="Fiscal year start" defaultValue="January" />
              </div>
            </SectionCard>
          )}

          {panel === "warehouse" && (
            <SectionCard icon={VPI.Warehouse} title="Warehouse" subtitle="Default fulfillment behaviour">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <label className="block"><span className="block text-[11px] font-medium text-slate-500 mb-1.5">Default warehouse</span><Select value="" onChange={() => {}} label="Zone A · Jakarta" options={["Zone B · Surabaya", "Zone C · Bandung"]} /></label>
                <label className="block"><span className="block text-[11px] font-medium text-slate-500 mb-1.5">Picking strategy</span><Select value="" onChange={() => {}} label="FEFO (first-expire)" options={["FIFO", "LIFO", "Nearest-bin"]} /></label>
              </div>
              <div className="divide-y divide-slate-900/[0.06]">
                <Toggle checked={autoPO} onChange={setAutoPO} label="Auto-draft PO on low stock" desc="Create a draft purchase order when a SKU drops below its reorder point" />
                <Toggle checked={true} onChange={() => {}} label="Require checker scan" desc="Second scan before an order can be marked shipped" />
                <Toggle checked={false} onChange={() => {}} label="Allow negative stock" desc="Permit fulfilment when on-hand would go below zero" />
              </div>
            </SectionCard>
          )}

          {panel === "notifications" && (
            <SectionCard icon={VPI.Bell} title="Notifications" subtitle="What you get alerted about">
              <div className="divide-y divide-slate-900/[0.06]">
                <Toggle checked={notif.lowStock} onChange={(v) => setNotif({ ...notif, lowStock: v })} label="Low-stock alerts" desc="When a SKU falls below reorder point" />
                <Toggle checked={notif.newOrder} onChange={(v) => setNotif({ ...notif, newOrder: v })} label="New order" desc="Every incoming sales order" />
                <Toggle checked={notif.poReceived} onChange={(v) => setNotif({ ...notif, poReceived: v })} label="PO received" desc="When inbound stock is checked in" />
                <Toggle checked={notif.weekly} onChange={(v) => setNotif({ ...notif, weekly: v })} label="Weekly summary" desc="Monday digest of KPIs" />
              </div>
            </SectionCard>
          )}

          {panel === "integrations" && (
            <SectionCard icon={VPI.Refresh} title="Integrations" subtitle="Connected services">
              <ul className="space-y-2">
                {[["Marketplace Sync", "Orders & stock · every 15 min", "emerald", "Connected"], ["Accounting", "Push invoices & journals", "emerald", "Connected"], ["Shipping Carrier", "Rates & label printing", "slate", "Connect"], ["BI / Warehouse", "Nightly data export", "slate", "Connect"]].map(([t, d, tone, action]) => (
                  <li key={t} className="flex items-center gap-3 vp-glass rounded-2xl p-3.5">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center text-blue-600" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}><VPI.Refresh size={16} /></span>
                    <span className="flex-1 min-w-0"><span className="block text-[13px] font-medium text-slate-900">{t}</span><span className="block text-[11px] text-slate-400">{d}</span></span>
                    {tone === "emerald" ? <StatusBadge label={action} tone="emerald" /> : <Button size="sm">{action}</Button>}
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// 8 · LOGIN (card)
// ════════════════════════════════════════════════════════════════════
function LoginPage({ onSignIn }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm vp-glass-strong rounded-3xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <img src="/logo-mark.png" alt="" className="w-14 h-14 rounded-2xl object-cover shadow-md ring-1 ring-black/5" />
          <h1 className="text-[20px] font-semibold text-slate-900 mt-3">Vision Pro ERP</h1>
          <p className="text-[12px] text-slate-400 mt-0.5">Sign in to your workspace</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSignIn && onSignIn(); }} className="space-y-3">
          <TextField label="Email" type="email" defaultValue="admin@company.com" placeholder="you@company.com" />
          <TextField label="Password" type="password" defaultValue="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <label className="flex items-center gap-1.5 text-slate-500"><input type="checkbox" defaultChecked className="accent-blue-500" /> Remember me</label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-[13.5px] font-medium py-2.5 mt-1 shadow-sm shadow-blue-500/25 transition-colors">Sign in</button>
        </form>
        <p className="text-center text-[11px] text-slate-400 mt-5">No account? <a href="#" className="text-blue-600 hover:underline">Contact admin</a></p>
      </div>
    </div>
  );
}

export { DashboardPage, InventoryPage, OrdersPage, PurchasingPage, WarehousePage, ReportsPage, SettingsPage, LoginPage };

