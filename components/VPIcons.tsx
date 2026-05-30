import React from "react";

export type IconProps = { size?: number; className?: string; stroke?: number };
const Svg = ({ children, size = 16, stroke = 1.5, ...rest }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);

const I = {
  Sparkle:   (p: IconProps) => <Svg {...p}><path d="M12 3l1.8 5.4L19.2 10 13.8 11.8 12 17l-1.8-5.2L4.8 10l5.4-1.6L12 3z"/><circle cx="19" cy="4" r="0.8" fill="currentColor"/><circle cx="5" cy="19" r="0.8" fill="currentColor"/></Svg>,
  Bolt:      (p: IconProps) => <Svg {...p}><path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/></Svg>,
  Home:      (p: IconProps) => <Svg {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></Svg>,
  Cart:      (p: IconProps) => <Svg {...p}><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l3 12h12l3-8H6"/></Svg>,
  Truck:     (p: IconProps) => <Svg {...p}><rect x="2" y="6" width="13" height="11" rx="1.5"/><path d="M15 9h4l3 3v5h-7V9z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></Svg>,
  Box:       (p: IconProps) => <Svg {...p}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></Svg>,
  Chart:     (p: IconProps) => <Svg {...p}><path d="M3 21V5M3 21h18"/><rect x="6" y="13" width="3" height="6" rx="0.5"/><rect x="11" y="9" width="3" height="10" rx="0.5"/><rect x="16" y="4" width="3" height="15" rx="0.5"/></Svg>,
  Megaphone: (p: IconProps) => <Svg {...p}><path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M14 8.5a4 4 0 010 7"/><path d="M17 6a7 7 0 010 12"/></Svg>,
  Brain:     (p: IconProps) => <Svg {...p}><path d="M9 4a3 3 0 016 0v0a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3v0a3 3 0 01-6 0v0a3 3 0 01-3-3v-1a3 3 0 010-6V7a3 3 0 013-3v0z"/><path d="M9 4v16M15 4v16M6 10h3M6 14h3M15 10h3M15 14h3"/></Svg>,

  // Commerce
  ShoppingBag: (p: IconProps) => <Svg {...p}><path d="M5 7h14l-1 13H6L5 7z"/><path d="M9 11V7a3 3 0 016 0v4"/></Svg>,
  ShopTikTok:  (p: IconProps) => <Svg {...p}><path d="M16 6c0.5 1.6 1.8 3 4 3"/><path d="M16 6v9.5a4.5 4.5 0 11-4.5-4.5"/></Svg>,
  Tag:         (p: IconProps) => <Svg {...p}><path d="M2 9l7-7h7v7l-7 7-7-7z"/><circle cx="11" cy="6" r="1.5" fill="currentColor"/></Svg>,
  Receipt:     (p: IconProps) => <Svg {...p}><path d="M5 3h14v18l-3-2-3 2-2-2-3 2-3-2V3z"/><path d="M9 8h6M9 12h6M9 16h4"/></Svg>,
  Click:       (p: IconProps) => <Svg {...p}><path d="M9 9l2 12 2-5 5 1-9-8z"/><path d="M4 9V4M4 4h5M4 4l5 5"/></Svg>,
  Users:       (p: IconProps) => <Svg {...p}><circle cx="9" cy="9" r="3"/><path d="M3 19a6 6 0 0112 0"/><circle cx="17" cy="8" r="2.5"/><path d="M14 19a5 5 0 0110-0.5"/></Svg>,
  Alert:       (p: IconProps) => <Svg {...p}><path d="M12 2L2 21h20L12 2z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></Svg>,
  Refund:      (p: IconProps) => <Svg {...p}><path d="M3 12a9 9 0 0115-6.7L21 8"/><polyline points="21,3 21,8 16,8"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/></Svg>,

  // Operations
  Video:       (p: IconProps) => <Svg {...p}><rect x="2" y="6" width="14" height="12" rx="1.5"/><path d="M16 10l6-3v10l-6-3v-4z"/></Svg>,
  Clock:       (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Svg>,
  Trophy:      (p: IconProps) => <Svg {...p}><path d="M8 4h8v3a4 4 0 11-8 0V4z"/><path d="M5 5H3v3a3 3 0 003 3M19 5h2v3a3 3 0 01-3 3"/><path d="M9 13h6l-1 4h-4l-1-4z"/><path d="M8 21h8"/></Svg>,
  Warehouse:   (p: IconProps) => <Svg {...p}><path d="M3 9l9-5 9 5v12H3V9z"/><rect x="7" y="13" width="4" height="8"/><rect x="13" y="13" width="4" height="6"/></Svg>,
  Hand:        (p: IconProps) => <Svg {...p}><path d="M9 11V5a1.5 1.5 0 013 0v6M12 11V4a1.5 1.5 0 013 0v8M15 11V6a1.5 1.5 0 013 0v9a6 6 0 01-6 6h-2a4 4 0 01-4-4l-2-4a1.5 1.5 0 012.5-1.5L9 14"/></Svg>,
  Package:     (p: IconProps) => <Svg {...p}><path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></Svg>,
  Check2:      (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9"/><polyline points="8,12 11,15 16,9"/></Svg>,
  Inbox:       (p: IconProps) => <Svg {...p}><path d="M3 12h6l2 3h2l2-3h6"/><path d="M3 12V5a2 2 0 012-2h14a2 2 0 012 2v7M3 12v7a2 2 0 002 2h14a2 2 0 002-2v-7"/></Svg>,
  Headset:     (p: IconProps) => <Svg {...p}><path d="M4 13a8 8 0 0116 0v4a3 3 0 01-3 3h-1v-7h4M4 13v4a3 3 0 003 3h1v-7H4"/></Svg>,
  Robot:       (p: IconProps) => <Svg {...p}><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 4v4"/><circle cx="9" cy="14" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/><path d="M9 18h6"/></Svg>,

  // Product
  Layers:      (p: IconProps) => <Svg {...p}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></Svg>,
  Database:    (p: IconProps) => <Svg {...p}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></Svg>,
  Image:       (p: IconProps) => <Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-9 9"/></Svg>,
  Coins:       (p: IconProps) => <Svg {...p}><ellipse cx="9" cy="7" rx="6" ry="2.5"/><path d="M3 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/><path d="M3 11v4c0 1.4 2.7 2.5 6 2.5"/><circle cx="16" cy="15" r="5"/></Svg>,
  Bundle:      (p: IconProps) => <Svg {...p}><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></Svg>,
  Factory:     (p: IconProps) => <Svg {...p}><path d="M3 21V9l5 3V9l5 3V6l8 5v10H3z"/><rect x="6" y="15" width="2" height="3"/><rect x="11" y="15" width="2" height="3"/><rect x="16" y="15" width="2" height="3"/></Svg>,
  Lightbulb:   (p: IconProps) => <Svg {...p}><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 2a7 7 0 014 12.7V17H8v-2.3A7 7 0 0112 2z"/></Svg>,
  Skull:       (p: IconProps) => <Svg {...p}><path d="M5 11a7 7 0 0114 0v3h-2v3h-3v-2h-4v2H7v-3H5v-3z"/><circle cx="9" cy="11" r="1.5" fill="currentColor"/><circle cx="15" cy="11" r="1.5" fill="currentColor"/></Svg>,

  // Finance
  Pie:         (p: IconProps) => <Svg {...p}><path d="M21 12a9 9 0 11-9-9v9h9z"/><path d="M14 3a9 9 0 017 7h-7V3z"/></Svg>,
  Wallet:      (p: IconProps) => <Svg {...p}><path d="M3 7v12a2 2 0 002 2h16V9H5a2 2 0 01-2-2zM3 7a2 2 0 012-2h13l1 4"/><circle cx="17" cy="14" r="1.5" fill="currentColor"/></Svg>,
  Coin:        (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 6v12M14 9h-3a2 2 0 100 4h2a2 2 0 110 4H8"/></Svg>,
  Calculator:  (p: IconProps) => <Svg {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><rect x="7" y="5" width="10" height="4" rx="0.5"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/><circle cx="12" cy="13" r="0.8" fill="currentColor"/><circle cx="15" cy="13" r="0.8" fill="currentColor"/><circle cx="9" cy="17" r="0.8" fill="currentColor"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/><circle cx="15" cy="17" r="0.8" fill="currentColor"/></Svg>,

  // Growth
  Calendar:    (p: IconProps) => <Svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><rect x="7" y="12" width="3" height="3" rx="0.5" fill="currentColor"/></Svg>,
  Star:        (p: IconProps) => <Svg {...p}><path d="M12 3l2.5 6 6.5 1-5 4.5 1.5 6.5L12 17.5 6.5 21 8 14.5 3 10l6.5-1L12 3z"/></Svg>,
  Rocket:      (p: IconProps) => <Svg {...p}><path d="M14 4c4 0 6 2 6 6 0 5-9 12-9 12s-7-2-7-7c0-4 4-11 10-11z"/><circle cx="14" cy="10" r="2"/><path d="M7 17l-3 3M11 21l-2 1"/></Svg>,
  Eye:         (p: IconProps) => <Svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Svg>,
  Palette:     (p: IconProps) => <Svg {...p}><path d="M12 3a9 9 0 109 9c0-2-1.5-3-3-3h-2a2 2 0 010-4 2 2 0 002-2c0-1.5-2-2-4-2 0 0-1 0-2 1z"/><circle cx="7"  cy="10" r="1" fill="currentColor"/><circle cx="9"  cy="6"  r="1" fill="currentColor"/><circle cx="14" cy="6"  r="1" fill="currentColor"/></Svg>,

  // AI Command
  Wand:        (p: IconProps) => <Svg {...p}><path d="M3 21l11-11M14 6l4 4M16 4l4 4M5 14l2 2M19 14l2-2M14 19l-2 2"/></Svg>,
  Stethoscope: (p: IconProps) => <Svg {...p}><path d="M4 3v7a4 4 0 008 0V3M16 14a3 3 0 116 0v3a6 6 0 01-12 0"/><circle cx="19" cy="14" r="1.2" fill="currentColor"/></Svg>,
  Crystal:     (p: IconProps) => <Svg {...p}><path d="M6 9l6-6 6 6-6 12L6 9z"/><path d="M6 9h12M12 3v18"/></Svg>,
  Shield:      (p: IconProps) => <Svg {...p}><path d="M12 3l9 3v6c0 5-4 8-9 9-5-1-9-4-9-9V6l9-3z"/><polyline points="8,12 11,15 16,10"/></Svg>,
  PenAI:       (p: IconProps) => <Svg {...p}><path d="M3 21l4-1 11-11-3-3L4 17l-1 4z"/><path d="M14 6l3 3"/><circle cx="19" cy="5" r="2"/></Svg>,
  AlertOctagon:(p: IconProps) => <Svg {...p}><path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.8" fill="currentColor"/></Svg>,

  // General UI
  Grid:        (p: IconProps) => <Svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Svg>,
  Refresh:     (p: IconProps) => <Svg {...p}><path d="M3 12a9 9 0 0115-6.7L21 8M3 3v5h5M21 12a9 9 0 01-15 6.7L3 16M21 21v-5h-5"/></Svg>,
  Clipboard:   (p: IconProps) => <Svg {...p}><rect x="5" y="5" width="14" height="15" rx="2"/><path d="M9 5V3h6v2"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/></Svg>,
  Columns:     (p: IconProps) => <Svg {...p}><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></Svg>,
  Scan:        (p: IconProps) => <Svg {...p}><path d="M3 7V5a2 2 0 012-2h2M21 7V5a2 2 0 00-2-2h-2M3 17v2a2 2 0 002 2h2M21 17v2a2 2 0 01-2 2h-2"/><line x1="3" y1="12" x2="21" y2="12"/></Svg>,
  TrendUp:     (p: IconProps) => <Svg {...p}><polyline points="3,17 9,11 13,15 21,7"/><polyline points="15,7 21,7 21,13"/></Svg>,
  Cog:         (p: IconProps) => <Svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"/></Svg>,

  Search:      (p: IconProps) => <Svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></Svg>,
  Filter:      (p: IconProps) => <Svg {...p}><path d="M3 5h18l-7 8v6l-4 2v-8L3 5z"/></Svg>,
  Download:    (p: IconProps) => <Svg {...p}><path d="M12 3v12M7 11l5 5 5-5"/><path d="M5 21h14"/></Svg>,
  Close:       (p: IconProps) => <Svg {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></Svg>,
  Bell:        (p: IconProps) => <Svg {...p}><path d="M5 17h14l-2-3v-4a5 5 0 00-10 0v4l-2 3z"/><path d="M10 20a2 2 0 004 0"/></Svg>,
  ChevronDown: (p: IconProps) => <Svg {...p}><polyline points="6,9 12,15 18,9"/></Svg>,
  Arrow:       (p: IconProps) => <Svg {...p}><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14,6 20,12 14,18"/></Svg>,
  Plus:        (p: IconProps) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  Up:          (p: IconProps) => <Svg {...p}><polyline points="6,15 12,9 18,15"/></Svg>,
  Down:        (p: IconProps) => <Svg {...p}><polyline points="6,9 12,15 18,9"/></Svg>,
};

export const Icon = I;

