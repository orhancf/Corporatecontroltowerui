import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { AlertBanner } from "../components/AlertBanner";
import { StatusPill } from "../components/StatusPill";
import {
  Package,
  ShoppingCart,
  Truck,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const trendData = [
  { month: "Sep", orders: 1240, fulfilled: 1180 },
  { month: "Oct", orders: 1380, fulfilled: 1320 },
  { month: "Nov", orders: 1520, fulfilled: 1410 },
  { month: "Dec", orders: 1780, fulfilled: 1620 },
  { month: "Jan", orders: 1620, fulfilled: 1580 },
  { month: "Feb", orders: 1490, fulfilled: 1450 },
];

const categoryData = [
  { name: "Raw Materials", value: 34 },
  { name: "WIP", value: 22 },
  { name: "Finished Goods", value: 28 },
  { name: "MRO", value: 16 },
];

const pieColors = ["#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];

const supplierPerf = [
  { name: "Acme Corp", otd: 96, quality: 98 },
  { name: "GlobalTex", otd: 88, quality: 94 },
  { name: "PrimeMat", otd: 92, quality: 97 },
  { name: "SteelWorks", otd: 78, quality: 91 },
  { name: "ChemPro", otd: 94, quality: 99 },
];

const recentAlerts = [
  { id: "1", type: "warning" as const, title: "Low Stock Alert", message: "SKU-4821 below safety stock threshold (12 units remaining)" },
  { id: "2", type: "error" as const, title: "Supplier Delay", message: "PO-7234 from SteelWorks delayed by 5 days, ETA Mar 1" },
  { id: "3", type: "info" as const, title: "Capacity Update", message: "Line 3 maintenance scheduled Feb 26 — plan rebalance needed" },
];

const recentOrders = [
  { id: "PO-7891", supplier: "Acme Corp", items: 24, status: "success", statusLabel: "Delivered", value: "$48,200" },
  { id: "PO-7890", supplier: "GlobalTex", items: 12, status: "warning", statusLabel: "In Transit", value: "$23,400" },
  { id: "PO-7889", supplier: "PrimeMat", items: 8, status: "info", statusLabel: "Processing", value: "$15,800" },
  { id: "PO-7888", supplier: "SteelWorks", items: 36, status: "danger", statusLabel: "Delayed", value: "$72,100" },
  { id: "PO-7887", supplier: "ChemPro", items: 18, status: "success", statusLabel: "Delivered", value: "$31,500" },
];

export function Dashboard() {
  return (
    <>
      <Topbar title="Executive Overview" subtitle="Real-time supply chain performance" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Inventory"
            value="$2.4M"
            change={3.2}
            changeLabel="vs last month"
            icon={Package}
            variant="default"
            sparkline={[65, 72, 68, 80, 74, 82, 78, 85]}
          />
          <KpiCard
            title="Open Orders"
            value="347"
            change={-5.1}
            changeLabel="vs last month"
            icon={ShoppingCart}
            variant="warning"
            sparkline={[40, 45, 42, 38, 35, 33, 30, 28]}
          />
          <KpiCard
            title="On-Time Delivery"
            value="94.2%"
            change={1.8}
            changeLabel="vs target"
            icon={Truck}
            variant="success"
            sparkline={[88, 90, 89, 92, 91, 93, 94, 94]}
          />
          <KpiCard
            title="Active Alerts"
            value="12"
            change={-2}
            changeLabel="vs yesterday"
            icon={AlertTriangle}
            variant="danger"
            sparkline={[18, 16, 15, 14, 13, 14, 12, 12]}
          />
        </div>

        {/* Bento Grid — Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Order Trend — spans 2 cols */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-foreground">Order & Fulfillment Trend</h4>
                <p className="text-xs text-muted-foreground mt-0.5">6-month rolling view</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-1" /> Orders
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-2" /> Fulfilled
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradFulfilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                />
                <Area type="monotone" dataKey="orders" stroke="#60a5fa" fill="url(#gradOrders)" strokeWidth={2} />
                <Area type="monotone" dataKey="fulfilled" stroke="#34d399" fill="url(#gradFulfilled)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Inventory Breakdown — 1 col */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Inventory Breakdown</h4>
            <p className="text-xs text-muted-foreground mb-4">By category allocation</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categoryData.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pieColors[i] }} />
                  <span className="text-muted-foreground truncate">{c.name}</span>
                  <span className="text-foreground ml-auto">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Alerts */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Active Alerts</h4>
              <button className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((a) => (
                <AlertBanner key={a.id} type={a.type} title={a.title} message={a.message} dismissible={false} />
              ))}
            </div>
          </div>

          {/* Supplier Performance */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Top Suppliers</h4>
            <p className="text-xs text-muted-foreground mb-4">On-time delivery rate</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={supplierPerf} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" domain={[70, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                />
                <Bar dataKey="otd" fill="#60a5fa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Recent Orders</h4>
              <button className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-foreground">{o.id}</span>
                    <span className="text-xs text-muted-foreground">{o.supplier} — {o.items} items</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm text-foreground">{o.value}</span>
                    <StatusPill status={o.status as any} label={o.statusLabel} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
