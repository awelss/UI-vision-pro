import React, { useState } from "react";
import { Icon as VPI } from "./VPIcons";
import { Sidebar, Topbar, TopNav, MobileNav, LayoutToggle } from "./VisionProUI";
import {
  LoginPage, DashboardPage, InventoryPage, OrdersPage, PurchasingPage, WarehousePage, ReportsPage, SettingsPage,
} from "./VisionProPages";
const NAV = [
  { title: "OPERATIONS", items: [
    { key: "dashboard", label: "Dashboard", icon: VPI.Home },
    { key: "orders",    label: "Orders",    icon: VPI.Cart, badge: 142 },
    { key: "inventory", label: "Inventory", icon: VPI.Box, badge: 47 },
    { key: "purchasing",label: "Purchasing",icon: VPI.Truck },
  ]},
  { title: "WAREHOUSE", items: [
    { key: "warehouse", label: "Warehouse", icon: VPI.Warehouse, badge: 5 },
    { key: "inbound",   label: "Inbound",   icon: VPI.Inbox, soon: true },
    { key: "shipping",  label: "Shipping",  icon: VPI.Package, soon: true },
  ]},
  { title: "INSIGHTS", items: [
    { key: "reports",   label: "Reports",   icon: VPI.Chart },
    { key: "suppliers", label: "Suppliers", icon: VPI.Factory, soon: true },
    { key: "settings",  label: "Settings",  icon: VPI.Cog },
  ]},
];

// compact set for the mobile bottom bar
const MOBILE = [
  { key: "dashboard", label: "Home",    icon: VPI.Home },
  { key: "orders",    label: "Orders",  icon: VPI.Cart },
  { key: "inventory", label: "Stock",   icon: VPI.Box },
  { key: "warehouse", label: "WMS",     icon: VPI.Warehouse },
  { key: "settings",  label: "More",    icon: VPI.Cog },
];

const PAGES = {
  dashboard: DashboardPage, orders: OrdersPage, inventory: InventoryPage,
  purchasing: PurchasingPage, warehouse: WarehousePage, reports: ReportsPage, settings: SettingsPage,
};
const TITLES = {
  dashboard: "Dashboard", orders: "Orders", inventory: "Inventory",
  purchasing: "Purchasing", warehouse: "Warehouse", reports: "Reports", settings: "Settings",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [layout, setLayout] = useState("side");   // "side" | "top"
  const [route, setRoute] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  if (!loggedIn) return <LoginPage onSignIn={() => setLoggedIn(true)} />;

  const Page = PAGES[route];
  const content = <div key={route} className="pb-24 lg:pb-0">{Page ? <Page /> : null}</div>;

  return (
    <>
      {layout === "side" ? (
        <div className="flex gap-4 p-4 min-h-screen items-start">
          <div className="hidden lg:block">
            <Sidebar nav={NAV} active={route} onNav={setRoute} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="sticky top-4 z-40">
              <Topbar title={TITLES[route]} />
            </div>
            {content}
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="sticky top-0 z-40 px-4 pt-4">
            <TopNav nav={NAV} active={route} onNav={setRoute} />
          </div>
          <div className="px-4 pt-5 max-w-[1500px] mx-auto">{content}</div>
        </div>
      )}

      <MobileNav items={MOBILE} active={route} onNav={setRoute} />
      <LayoutToggle layout={layout} onLayout={setLayout} />
    </>
  );
}

export default App;

