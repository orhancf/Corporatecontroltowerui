import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { DataTable } from "../components/DataTable";
import { StatusPill } from "../components/StatusPill";
import { Package, BarChart3, AlertTriangle, Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const inventoryItems = [
  { sku: "SKU-1001", name: "Steel Rod 12mm", category: "Raw Materials", qty: 2400, reorder: 500, uom: "pcs", location: "WH-A1", status: "success", statusLabel: "In Stock", value: "$48,000" },
  { sku: "SKU-1023", name: "Copper Wire 2.5mm", category: "Raw Materials", qty: 180, reorder: 200, uom: "m", location: "WH-A2", status: "warning", statusLabel: "Low Stock", value: "$9,360" },
  { sku: "SKU-2045", name: "PCB Assembly v3", category: "WIP", qty: 340, reorder: 100, uom: "pcs", location: "WH-B1", status: "success", statusLabel: "In Stock", value: "$27,200" },
  { sku: "SKU-3012", name: "Motor Unit M-7", category: "Finished Goods", qty: 45, reorder: 50, uom: "pcs", location: "WH-C1", status: "danger", statusLabel: "Critical", value: "$67,500" },
  { sku: "SKU-4821", name: "Bearing Set BS-4", category: "MRO", qty: 12, reorder: 30, uom: "sets", location: "WH-D1", status: "danger", statusLabel: "Critical", value: "$1,440" },
  { sku: "SKU-1089", name: "Aluminum Sheet 3mm", category: "Raw Materials", qty: 890, reorder: 200, uom: "pcs", location: "WH-A3", status: "success", statusLabel: "In Stock", value: "$22,250" },
  { sku: "SKU-2078", name: "Sensor Module SM-2", category: "WIP", qty: 220, reorder: 80, uom: "pcs", location: "WH-B2", status: "success", statusLabel: "In Stock", value: "$33,000" },
  { sku: "SKU-3045", name: "Control Panel CP-1", category: "Finished Goods", qty: 88, reorder: 40, uom: "pcs", location: "WH-C2", status: "success", statusLabel: "In Stock", value: "$132,000" },
];

const turnoverData = [
  { month: "Sep", turns: 4.2 },
  { month: "Oct", turns: 4.5 },
  { month: "Nov", turns: 4.1 },
  { month: "Dec", turns: 3.8 },
  { month: "Jan", turns: 4.4 },
  { month: "Feb", turns: 4.6 },
];

const categoryStock = [
  { name: "Raw Mat.", current: 3470, target: 3000 },
  { name: "WIP", current: 560, target: 500 },
  { name: "FG", current: 133, target: 200 },
  { name: "MRO", current: 12, target: 80 },
];

const columns = [
  { key: "sku", header: "SKU", width: "100px" },
  { key: "name", header: "Item Name" },
  { key: "category", header: "Category" },
  { key: "qty", header: "Qty", render: (r: any) => r.qty.toLocaleString() },
  { key: "reorder", header: "Reorder Pt", render: (r: any) => r.reorder.toLocaleString() },
  { key: "location", header: "Location" },
  { key: "value", header: "Value" },
  {
    key: "status",
    header: "Status",
    sortable: false,
    render: (r: any) => <StatusPill status={r.status} label={r.statusLabel} />,
  },
];

export function Inventory() {
  return (
    <>
      <Topbar title="Inventory Control" subtitle="Stock levels, turnover & service level monitoring" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total SKUs" value="1,284" change={2.4} changeLabel="new this month" icon={Package} variant="default" sparkline={[60, 62, 65, 64, 68, 70, 72, 74]} />
          <KpiCard title="Inventory Value" value="$2.4M" change={3.2} changeLabel="vs prior" icon={BarChart3} variant="success" sparkline={[2.0, 2.1, 2.15, 2.2, 2.3, 2.35, 2.38, 2.4]} />
          <KpiCard title="Below Reorder" value="18" change={-3} changeLabel="vs last week" icon={AlertTriangle} variant="danger" sparkline={[25, 22, 20, 21, 19, 18, 18, 18]} />
          <KpiCard title="Service Level" value="96.8%" change={0.4} changeLabel="vs target 95%" icon={Target} variant="success" sparkline={[94, 95, 95.5, 96, 96.2, 96.5, 96.7, 96.8]} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Inventory Turnover</h4>
            <p className="text-xs text-muted-foreground mb-4">Monthly turns ratio</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[3, 5]} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
                <Line type="monotone" dataKey="turns" stroke="#60a5fa" strokeWidth={2} dot={{ fill: "#60a5fa", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Stock vs Target</h4>
            <p className="text-xs text-muted-foreground mb-4">Current levels by category</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryStock} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
                <Bar dataKey="current" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={20} name="Current" />
                <Bar dataKey="target" fill="#334155" radius={[4, 4, 0, 0]} barSize={20} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-foreground">Inventory Items</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Manage stock levels and reorder points</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search SKU or name..."
                className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <DataTable columns={columns} data={inventoryItems} keyField="sku" />
        </div>
      </div>
    </>
  );
}
