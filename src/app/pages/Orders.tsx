import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { DataTable } from "../components/DataTable";
import { StatusPill } from "../components/StatusPill";
import { ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const orderData = [
  { id: "PO-7891", supplier: "Acme Corp", date: "2026-02-20", items: 24, total: "$48,200", eta: "2026-02-24", status: "success", statusLabel: "Delivered", priority: "Normal" },
  { id: "PO-7890", supplier: "GlobalTex", date: "2026-02-18", items: 12, total: "$23,400", eta: "2026-02-27", status: "warning", statusLabel: "In Transit", priority: "High" },
  { id: "PO-7889", supplier: "PrimeMat", date: "2026-02-17", items: 8, total: "$15,800", eta: "2026-03-01", status: "info", statusLabel: "Processing", priority: "Normal" },
  { id: "PO-7888", supplier: "SteelWorks", date: "2026-02-15", items: 36, total: "$72,100", eta: "2026-03-01", status: "danger", statusLabel: "Delayed", priority: "Critical" },
  { id: "PO-7887", supplier: "ChemPro", date: "2026-02-14", items: 18, total: "$31,500", eta: "2026-02-22", status: "success", statusLabel: "Delivered", priority: "Normal" },
  { id: "PO-7886", supplier: "TechAlloys", date: "2026-02-13", items: 42, total: "$89,600", eta: "2026-02-28", status: "warning", statusLabel: "In Transit", priority: "High" },
  { id: "PO-7885", supplier: "Acme Corp", date: "2026-02-12", items: 15, total: "$32,100", eta: "2026-02-20", status: "success", statusLabel: "Delivered", priority: "Normal" },
  { id: "PO-7884", supplier: "NanoCoat", date: "2026-02-10", items: 6, total: "$18,900", eta: "2026-02-25", status: "info", statusLabel: "Processing", priority: "Low" },
];

const weeklyVolume = [
  { week: "W6", created: 28, closed: 24 },
  { week: "W7", created: 34, closed: 30 },
  { week: "W8", created: 22, closed: 26 },
  { week: "W9", created: 38, closed: 32 },
  { week: "W10", created: 31, closed: 29 },
  { week: "W11", created: 27, closed: 34 },
];

const columns = [
  { key: "id", header: "Order ID", width: "100px" },
  { key: "supplier", header: "Supplier" },
  { key: "date", header: "Date" },
  { key: "items", header: "Items" },
  { key: "total", header: "Total" },
  { key: "eta", header: "ETA" },
  {
    key: "priority",
    header: "Priority",
    render: (r: any) => {
      const colors: Record<string, string> = {
        Critical: "danger",
        High: "warning",
        Normal: "neutral",
        Low: "info",
      };
      return <StatusPill status={colors[r.priority] as any} label={r.priority} />;
    },
  },
  {
    key: "status",
    header: "Status",
    sortable: false,
    render: (r: any) => <StatusPill status={r.status} label={r.statusLabel} />,
  },
];

export function Orders() {
  return (
    <>
      <Topbar title="Orders & Backlog" subtitle="Purchase order tracking and fulfillment" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Open POs" value="347" change={-5.1} changeLabel="vs last month" icon={ShoppingCart} variant="default" sparkline={[40, 45, 42, 38, 35, 33, 30, 28]} />
          <KpiCard title="Avg Lead Time" value="8.2 days" change={-0.5} changeLabel="improvement" icon={Clock} variant="success" sparkline={[10, 9.5, 9.2, 9, 8.8, 8.5, 8.3, 8.2]} />
          <KpiCard title="Fulfilled MTD" value="284" change={12} changeLabel="vs target" icon={CheckCircle} variant="success" sparkline={[180, 200, 220, 240, 255, 265, 275, 284]} />
          <KpiCard title="Overdue" value="9" change={3} changeLabel="new this week" icon={XCircle} variant="danger" sparkline={[5, 4, 6, 7, 6, 8, 9, 9]} />
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h4 className="text-foreground mb-1">Weekly Order Volume</h4>
          <p className="text-xs text-muted-foreground mb-4">Created vs Closed POs</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyVolume} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
              <Bar dataKey="created" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={16} name="Created" />
              <Bar dataKey="closed" fill="#34d399" radius={[4, 4, 0, 0]} barSize={16} name="Closed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-foreground">All Orders</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Showing {orderData.length} purchase orders</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search orders..."
                className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <DataTable columns={columns} data={orderData} keyField="id" />
        </div>
      </div>
    </>
  );
}
