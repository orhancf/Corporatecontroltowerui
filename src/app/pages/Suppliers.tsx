import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { DataTable } from "../components/DataTable";
import { StatusPill } from "../components/StatusPill";
import { Users, Award, TrendingUp, AlertTriangle } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const radarData = [
  { metric: "OTD", Acme: 96, GlobalTex: 88, PrimeMat: 92 },
  { metric: "Quality", Acme: 98, GlobalTex: 94, PrimeMat: 97 },
  { metric: "Cost", Acme: 85, GlobalTex: 92, PrimeMat: 88 },
  { metric: "Lead Time", Acme: 90, GlobalTex: 78, PrimeMat: 85 },
  { metric: "Flexibility", Acme: 88, GlobalTex: 82, PrimeMat: 90 },
  { metric: "Communication", Acme: 94, GlobalTex: 86, PrimeMat: 92 },
];

const spendData = [
  { name: "Acme Corp", spend: 480 },
  { name: "GlobalTex", spend: 320 },
  { name: "PrimeMat", spend: 280 },
  { name: "SteelWorks", spend: 420 },
  { name: "ChemPro", spend: 190 },
  { name: "TechAlloys", spend: 350 },
];

const suppliers = [
  { id: "SUP-001", name: "Acme Corp", category: "Metals & Alloys", otd: 96, quality: 98, score: 94, activePOs: 12, status: "success", statusLabel: "Preferred" },
  { id: "SUP-002", name: "GlobalTex", category: "Textiles", otd: 88, quality: 94, score: 86, activePOs: 8, status: "warning", statusLabel: "Under Review" },
  { id: "SUP-003", name: "PrimeMat", category: "Polymers", otd: 92, quality: 97, score: 91, activePOs: 5, status: "success", statusLabel: "Approved" },
  { id: "SUP-004", name: "SteelWorks", category: "Steel & Iron", otd: 78, quality: 91, score: 74, activePOs: 15, status: "danger", statusLabel: "At Risk" },
  { id: "SUP-005", name: "ChemPro", category: "Chemicals", otd: 94, quality: 99, score: 95, activePOs: 3, status: "success", statusLabel: "Preferred" },
  { id: "SUP-006", name: "TechAlloys", category: "Electronics", otd: 91, quality: 96, score: 89, activePOs: 9, status: "success", statusLabel: "Approved" },
  { id: "SUP-007", name: "NanoCoat", category: "Coatings", otd: 85, quality: 93, score: 82, activePOs: 2, status: "neutral", statusLabel: "New" },
];

const columns = [
  { key: "id", header: "ID", width: "90px" },
  { key: "name", header: "Supplier" },
  { key: "category", header: "Category" },
  { key: "otd", header: "OTD %", render: (r: any) => <span className={r.otd < 85 ? "text-destructive" : r.otd < 90 ? "text-warning" : "text-success"}>{r.otd}%</span> },
  { key: "quality", header: "Quality %", render: (r: any) => <span className={r.quality < 92 ? "text-warning" : "text-success"}>{r.quality}%</span> },
  { key: "score", header: "Score", render: (r: any) => {
    const color = r.score >= 90 ? "bg-success" : r.score >= 80 ? "bg-warning" : "bg-destructive";
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-surface-3 overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${r.score}%` }} />
        </div>
        <span className="text-xs">{r.score}</span>
      </div>
    );
  }},
  { key: "activePOs", header: "Active POs" },
  { key: "status", header: "Status", sortable: false, render: (r: any) => <StatusPill status={r.status} label={r.statusLabel} /> },
];

export function Suppliers() {
  return (
    <>
      <Topbar title="Supplier Performance" subtitle="Vendor evaluation, scorecards & risk monitoring" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Active Suppliers" value="42" change={2} changeLabel="new onboarded" icon={Users} variant="default" sparkline={[35, 36, 37, 38, 39, 40, 41, 42]} />
          <KpiCard title="Avg Score" value="88.4" change={1.2} changeLabel="vs prior quarter" icon={Award} variant="success" sparkline={[84, 85, 86, 86.5, 87, 87.5, 88, 88.4]} />
          <KpiCard title="Avg OTD" value="91.3%" change={-0.8} changeLabel="vs target 95%" icon={TrendingUp} variant="warning" sparkline={[93, 92, 91.5, 91, 91.2, 91, 91.3, 91.3]} />
          <KpiCard title="At Risk" value="3" change={1} changeLabel="escalation needed" icon={AlertTriangle} variant="danger" sparkline={[1, 1, 2, 2, 2, 3, 3, 3]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Supplier Comparison</h4>
            <p className="text-xs text-muted-foreground mb-4">Top 3 suppliers across 6 metrics</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                <Radar name="Acme" dataKey="Acme" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="GlobalTex" dataKey="GlobalTex" stroke="#f472b6" fill="#f472b6" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="PrimeMat" dataKey="PrimeMat" stroke="#34d399" fill="#34d399" fillOpacity={0.1} strokeWidth={2} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 rounded-full bg-chart-1" /> Acme</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 rounded-full bg-chart-5" /> GlobalTex</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 rounded-full bg-chart-2" /> PrimeMat</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Spend Distribution</h4>
            <p className="text-xs text-muted-foreground mb-4">YTD procurement spend (K$)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={spendData} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={85} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} formatter={(v: any) => [`$${v}K`, "Spend"]} />
                <Bar dataKey="spend" fill="#60a5fa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-foreground">Supplier Directory</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Performance scorecards and status</p>
            </div>
          </div>
          <DataTable columns={columns} data={suppliers} keyField="id" />
        </div>
      </div>
    </>
  );
}
