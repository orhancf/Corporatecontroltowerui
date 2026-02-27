import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { AlertBanner } from "../components/AlertBanner";
import { StatusPill } from "../components/StatusPill";
import { formatCurrency, formatWeight } from "../lib/utils";
import {
  Package,
  ShoppingCart,
  TrendingDown,
  AlertTriangle,
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
  ReferenceLine,
} from "recharts";

// Mock data - Bu veriler gerçek API çağrılarından gelecek
const netPositionTrendData = [
  { week: "W09", trNet: 1240, bgNet: 850 },
  { week: "W10", trNet: 980, bgNet: 620 },
  { week: "W11", trNet: -150, bgNet: -320 },
  { week: "W12", trNet: 420, bgNet: 180 },
  { week: "W13", trNet: 890, bgNet: 540 },
  { week: "W14", trNet: 1120, bgNet: 780 },
];

// ABC Segment dağılımı - Kısa vadede TR/BG/Transit olarak basitleştirildi
const segmentData = [
  { name: "TR Stok", value: 42 },
  { name: "BG Stok", value: 31 },
  { name: "Transit", value: 27 },
];

const pieColors = ["#60a5fa", "#34d399", "#a78bfa"];

// Key Item Net Pozisyon Özeti
const keyItemData = [
  { code: "CAM-001", netPosition: 850 },
  { code: "CAM-002", netPosition: -350 },
  { code: "CAM-003", netPosition: 420 },
  { code: "CAM-004", netPosition: -150 },
  { code: "CAM-005", netPosition: 620 },
];

const kritikUyarilar = [
  { 
    id: "1", 
    type: "error" as const, 
    title: "Negatif Net Pozisyon", 
    message: "CAM-002 · W11 haftasında net pozisyon negatife düştü: -350 KG" 
  },
  { 
    id: "2", 
    type: "warning" as const, 
    title: "Gecikmeli Sipariş", 
    message: "CAM-004 · Gecikmeli sipariş: 150 KG eksik" 
  },
  { 
    id: "3", 
    type: "info" as const, 
    title: "Transit Durum", 
    message: "CAM-001 · Transit yükleme 850 KG BG'den TR'ye yolda" 
  },
];

const aktifHareketler = [
  { id: "CAM-002", week: "W11", netPosition: -350, status: "danger", statusLabel: "Negatif" },
  { id: "CAM-004", week: "W12", netPosition: -150, status: "overdue", statusLabel: "Gecikmiş" },
  { id: "CAM-001", week: "W13", netPosition: 850, status: "transit", statusLabel: "Yolda" },
  { id: "CAM-005", week: "W14", netPosition: 620, status: "success", statusLabel: "Teslim Edildi" },
  { id: "CAM-003", week: "W10", netPosition: 420, status: "info", statusLabel: "İşlemde" },
];

export function Tower() {
  return (
    <>
      <Topbar title="Tower" subtitle="Tedarik zinciri kontrol merkezi" />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Hazır Stok Değeri"
            value={formatCurrency(2800000)}
            change={3.2}
            changeLabel="geçen aya göre"
            icon={Package}
            variant="default"
            sparkline={[2600000, 2650000, 2720000, 2780000, 2750000, 2800000]}
          />
          <KpiCard
            title="Açık Siparişler"
            value={formatWeight(8450)}
            change={-5.1}
            changeLabel="geçen haftaya göre"
            icon={ShoppingCart}
            variant="warning"
            sparkline={[9200, 9100, 8900, 8700, 8600, 8450]}
          />
          <KpiCard
            title="DIFOT"
            value="87.3%"
            change={-6.7}
            changeLabel="hedefe göre"
            icon={TrendingDown}
            variant="danger"
            sparkline={[92, 91, 89, 88, 87.5, 87.3]}
          />
          <KpiCard
            title="Uyarılı Ürün"
            value="12"
            change={-2}
            changeLabel="dün'e göre"
            icon={AlertTriangle}
            variant="danger"
            sparkline={[18, 16, 15, 14, 13, 12]}
          />
        </div>

        {/* Bento Grid — Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Net Pozisyon Trendi — spans 2 cols */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-foreground">Net Pozisyon Trendi</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Haftalık bakış (ISO haftalar)</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-1" /> TR Katman1
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-2" /> BG Katman1
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={netPositionTrendData}>
                <defs>
                  <linearGradient id="gradTR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradBG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value: number) => `${value} KG`}
                />
                <Area type="monotone" dataKey="trNet" stroke="#60a5fa" fill="url(#gradTR)" strokeWidth={2} name="TR Net Poz" />
                <Area type="monotone" dataKey="bgNet" stroke="#34d399" fill="url(#gradBG)" strokeWidth={2} name="BG Net Poz" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ABC Segment Dağılımı — 1 col */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Stok Dağılımı</h4>
            <p className="text-xs text-muted-foreground mb-4">Lokasyon bazında segmentasyon</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {segmentData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {segmentData.map((c, i) => (
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
          {/* Kritik Uyarılar */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Kritik Uyarılar</h4>
              <button className="text-xs text-primary hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {kritikUyarilar.map((a) => (
                <AlertBanner key={a.id} type={a.type} title={a.title} message={a.message} dismissible={false} />
              ))}
            </div>
          </div>

          {/* Key Item Net Pozisyon Özeti */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Key Item Özeti</h4>
            <p className="text-xs text-muted-foreground mb-4">Net pozisyon (KG bazlı)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={keyItemData} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fill: "#94a3b8", fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  type="category" 
                  dataKey="code" 
                  tick={{ fill: "#94a3b8", fontSize: 11 }} 
                  axisLine={false} 
                  tickLine={false} 
                  width={70} 
                />
                <ReferenceLine x={0} stroke="#94a3b8" strokeOpacity={0.3} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value: number) => `${value} KG`}
                />
                <Bar 
                  dataKey="netPosition" 
                  fill="#60a5fa" 
                  radius={[0, 4, 4, 0]}
                  shape={(props: any) => {
                    const fill = props.value < 0 ? "#ef4444" : "#34d399";
                    return <rect {...props} fill={fill} />;
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Aktif Hareketler */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Aktif Hareketler</h4>
              <button className="text-xs text-primary hover:underline flex items-center gap-1">
                Tümünü Gör <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {aktifHareketler.map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-foreground">{o.id}</span>
                    <span className="text-xs text-muted-foreground">{o.week} · {o.netPosition} KG</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
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
