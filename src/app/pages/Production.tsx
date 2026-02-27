import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { StatusPill } from "../components/StatusPill";
import { Factory, Zap, Clock, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const capacityData = [
  { line: "Line 1", capacity: 92, target: 85 },
  { line: "Line 2", capacity: 78, target: 85 },
  { line: "Line 3", capacity: 45, target: 85 },
  { line: "Line 4", capacity: 88, target: 85 },
  { line: "Line 5", capacity: 96, target: 85 },
];

const outputTrend = [
  { day: "Mon", actual: 420, planned: 450 },
  { day: "Tue", actual: 465, planned: 450 },
  { day: "Wed", actual: 430, planned: 450 },
  { day: "Thu", actual: 490, planned: 450 },
  { day: "Fri", actual: 410, planned: 450 },
  { day: "Sat", actual: 280, planned: 300 },
  { day: "Sun", actual: 150, planned: 150 },
];

const productionOrders = [
  { id: "WO-3401", product: "Motor Unit M-7", line: "Line 1", qty: 120, completed: 108, start: "Feb 20", end: "Feb 25", status: "warning", statusLabel: "In Progress" },
  { id: "WO-3402", product: "PCB Assembly v3", line: "Line 2", qty: 500, completed: 350, start: "Feb 18", end: "Feb 26", status: "warning", statusLabel: "In Progress" },
  { id: "WO-3403", product: "Control Panel CP-1", line: "Line 4", qty: 80, completed: 80, start: "Feb 15", end: "Feb 22", status: "success", statusLabel: "Completed" },
  { id: "WO-3404", product: "Sensor Module SM-2", line: "Line 5", qty: 200, completed: 180, start: "Feb 19", end: "Feb 24", status: "warning", statusLabel: "In Progress" },
  { id: "WO-3405", product: "Bearing Set BS-4", line: "Line 3", qty: 0, completed: 0, start: "Feb 27", end: "Mar 02", status: "info", statusLabel: "Scheduled" },
  { id: "WO-3406", product: "Steel Rod Assembly", line: "Line 1", qty: 300, completed: 0, start: "Feb 26", end: "Mar 01", status: "info", statusLabel: "Scheduled" },
];

export function Production() {
  return (
    <>
      <Topbar title="Production & Capacity" subtitle="Work orders, line utilization & output tracking" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Lines Active" value="4 / 5" icon={Factory} variant="default" sparkline={[4, 5, 5, 4, 5, 4, 4, 4]} />
          <KpiCard title="Utilization" value="79.8%" change={-2.1} changeLabel="Line 3 down" icon={Zap} variant="warning" sparkline={[85, 84, 83, 82, 81, 80, 80, 79.8]} />
          <KpiCard title="Cycle Time" value="4.2 min" change={-0.3} changeLabel="improvement" icon={Clock} variant="success" sparkline={[5, 4.8, 4.7, 4.5, 4.4, 4.3, 4.2, 4.2]} />
          <KpiCard title="Yield Rate" value="97.6%" change={0.4} changeLabel="above target" icon={CheckCircle} variant="success" sparkline={[96, 96.5, 96.8, 97, 97.2, 97.3, 97.5, 97.6]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Line Capacity Utilization</h4>
            <p className="text-xs text-muted-foreground mb-4">Current % vs 85% target</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={capacityData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="line" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
                <Bar dataKey="capacity" radius={[4, 4, 0, 0]} barSize={28}>
                  {capacityData.map((entry, index) => {
                    const fill = entry.capacity >= 85 ? "#34d399" : entry.capacity >= 60 ? "#fbbf24" : "#f87171";
                    return <Cell key={index} fill={fill} />;
                  })}
                </Bar>
                <Bar dataKey="target" fill="transparent" stroke="#64748b" strokeDasharray="4 4" barSize={28} />
              </BarChart>
            </ResponsiveContainer>
            {/* Custom colored bars since recharts Cell is needed */}
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /> Above Target</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warning" /> Below Target</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" /> Critical</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Daily Output</h4>
            <p className="text-xs text-muted-foreground mb-4">Actual vs Planned (units)</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={outputTrend}>
                <defs>
                  <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }} />
                <Area type="monotone" dataKey="actual" stroke="#60a5fa" fill="url(#gradActual)" strokeWidth={2} name="Actual" />
                <Area type="monotone" dataKey="planned" stroke="#64748b" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Planned" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Orders */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-foreground">Work Orders</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Active and scheduled production orders</p>
            </div>
          </div>
          <div className="overflow-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-2/50">
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">WO ID</th>
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">Product</th>
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">Line</th>
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">Progress</th>
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">Schedule</th>
                  <th className="text-left text-xs text-muted-foreground px-4 py-3 border-b border-border">Status</th>
                </tr>
              </thead>
              <tbody>
                {productionOrders.map((wo) => {
                  const pct = wo.qty > 0 ? Math.round((wo.completed / wo.qty) * 100) : 0;
                  return (
                    <tr key={wo.id} className="border-b border-border last:border-b-0 hover:bg-surface-2/30 transition-colors">
                      <td className="px-4 py-3 text-foreground">{wo.id}</td>
                      <td className="px-4 py-3 text-foreground">{wo.product}</td>
                      <td className="px-4 py-3 text-muted-foreground">{wo.line}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                pct === 100 ? "bg-success" : pct > 0 ? "bg-primary" : "bg-surface-3"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12">
                            {wo.completed}/{wo.qty}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {wo.start} — {wo.end}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={wo.status as any} label={wo.statusLabel} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}