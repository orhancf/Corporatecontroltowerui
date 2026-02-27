import { useState, useEffect } from "react";
import { Topbar } from "../components/Topbar";
import { KpiCard } from "../components/KpiCard";
import { AlertBanner } from "../components/AlertBanner";
import { StatusPill } from "../components/StatusPill";
import { formatCurrency, formatWeight } from "../lib/utils";
import {
  getKpiData,
  getNetPositionTrend,
  getSegmentDistribution,
  getKeyItems,
  getCriticalAlerts,
  getActiveMovements,
  type KpiData,
  type NetPositionWeek,
  type SegmentData,
  type KeyItem,
  type Alert,
  type Movement,
} from "../services/api";
import {
  Package,
  ShoppingCart,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
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

const pieColors = ["#60a5fa", "#34d399", "#a78bfa"];

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-surface-2 ${className ?? ""}`} />
  );
}

// ─── Tower Page ───────────────────────────────────────────────────────────────

export function Tower() {
  const [kpi, setKpi] = useState<KpiData | null>(null);
  const [trend, setTrend] = useState<NetPositionWeek[]>([]);
  const [segments, setSegments] = useState<SegmentData[]>([]);
  const [keyItems, setKeyItems] = useState<KeyItem[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [kpiData, trendData, segData, itemsData, alertsData, movData] =
        await Promise.all([
          getKpiData(),
          getNetPositionTrend(),
          getSegmentDistribution(),
          getKeyItems(),
          getCriticalAlerts(),
          getActiveMovements(),
        ]);
      setKpi(kpiData);
      setTrend(trendData);
      setSegments(segData);
      setKeyItems(itemsData);
      setAlerts(alertsData);
      setMovements(movData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Veriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAll();
  }, []);

  return (
    <>
      <Topbar
        title="Tower"
        subtitle="Tedarik zinciri kontrol merkezi"
        action={
          <button
            onClick={() => void loadAll()}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-surface-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            {lastUpdated
              ? `${lastUpdated.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}`
              : "Yenile"}
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">

        {/* ── Error Banner ── */}
        {error && (
          <AlertBanner
            type="error"
            title="Bağlantı Hatası"
            message={`${error} — Backend'in çalıştığından emin ol: npm run dev (server/)`}
            dismissible={false}
          />
        )}

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading || !kpi ? (
            <>
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </>
          ) : (
            <>
              <KpiCard
                title="Hazır Stok Değeri"
                value={formatCurrency(kpi.hazirStokDegeri)}
                change={0}
                changeLabel="key item toplam"
                icon={Package}
                variant="default"
                sparkline={[]}
              />
              <KpiCard
                title="Açık Siparişler"
                value={formatWeight(kpi.acikSiparisler)}
                change={0}
                changeLabel="toplam outstanding"
                icon={ShoppingCart}
                variant="warning"
                sparkline={[]}
              />
              <KpiCard
                title="DIFOT"
                value={kpi.difot > 0 ? `${kpi.difot}%` : "—"}
                change={kpi.difot > 0 ? kpi.difot - 95 : 0}
                changeLabel="hedefe göre (%95)"
                icon={TrendingDown}
                variant={kpi.difot > 0 && kpi.difot < 90 ? "danger" : "default"}
                sparkline={[]}
              />
              <KpiCard
                title="Uyarılı Ürün"
                value={String(kpi.uyariliUrun)}
                change={0}
                changeLabel="alertFlag=true"
                icon={AlertTriangle}
                variant={kpi.uyariliUrun > 0 ? "danger" : "success"}
                sparkline={[]}
              />
            </>
          )}
        </div>

        {/* ── Bento Row 1: Trend + Segment ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Net Pozisyon Trendi — 2 cols */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-foreground">Net Pozisyon Trendi</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Haftalık bakış · Katman 1
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-1 inline-block" /> TR
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-chart-2 inline-block" /> BG
                </span>
              </div>
            </div>
            {loading ? (
              <Skeleton className="h-[220px] rounded-lg" />
            ) : trend.length === 0 ? (
              <div className="flex h-[220px] items-center justify-center text-sm text-muted-foreground">
                Net pozisyon verisi bulunamadı — önce recalculate çalıştır
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={trend}>
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
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }}
                    formatter={(value: number) => [`${value.toLocaleString("tr-TR")} KG`]}
                  />
                  <Area type="monotone" dataKey="trNet" stroke="#60a5fa" fill="url(#gradTR)" strokeWidth={2} name="TR Net Poz" />
                  <Area type="monotone" dataKey="bgNet" stroke="#34d399" fill="url(#gradBG)" strokeWidth={2} name="BG Net Poz" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Stok Dağılımı — 1 col */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Stok Dağılımı</h4>
            <p className="text-xs text-muted-foreground mb-4">Lokasyon bazında</p>
            {loading ? (
              <Skeleton className="h-[160px] rounded-lg" />
            ) : (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={segments}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {segments.map((_, i) => (
                        <Cell key={i} fill={pieColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {segments.map((c, i) => (
                    <div key={c.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pieColors[i] }} />
                      <span className="text-muted-foreground truncate">{c.name}</span>
                      <span className="text-foreground ml-auto">{c.value}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Bento Row 2: Alerts + Key Items + Movements ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Kritik Uyarılar */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Kritik Uyarılar</h4>
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                Tümünü Gör <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => <Skeleton key={i} className="h-14 rounded-lg" />)}
              </div>
            ) : alerts.length === 0 ? (
              <div className="rounded-lg border border-success/20 bg-success/5 p-4 text-sm text-success">
                ✓ Aktif uyarı yok
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((a) => (
                  <AlertBanner key={a.id} type={a.type} title={a.title} message={a.message} dismissible={false} />
                ))}
              </div>
            )}
          </div>

          {/* Key Item Özeti Bar Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h4 className="text-foreground mb-1">Key Item Özeti</h4>
            <p className="text-xs text-muted-foreground mb-4">Net pozisyon (KG)</p>
            {loading ? (
              <Skeleton className="h-[200px] rounded-lg" />
            ) : keyItems.length === 0 ? (
              <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                Key item bulunamadı
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={keyItems.slice(0, 6).map((i) => ({ code: i.catalogCode, netPosition: i.netPosition }))}
                  layout="vertical"
                  barSize={12}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="code" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                  <ReferenceLine x={0} stroke="#94a3b8" strokeOpacity={0.3} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", fontSize: "12px", color: "#e2e8f0" }}
                    formatter={(value: number) => [`${value.toLocaleString("tr-TR")} KG`]}
                  />
                  <Bar
                    dataKey="netPosition"
                    radius={[0, 4, 4, 0]}
                    fill="#34d399"
                    shape={(props: any) => {
                      const fill = props.value < 0 ? "#ef4444" : "#34d399";
                      const { x, y, width, height } = props;
                      return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />;
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Aktif Hareketler */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-foreground">Aktif Hareketler</h4>
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                Tümünü Gör <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-10 rounded" />)}
              </div>
            ) : movements.length === 0 ? (
              <div className="text-sm text-muted-foreground">Hareket bulunamadı</div>
            ) : (
              <div className="space-y-3">
                {movements.map((o) => (
                  <div key={o.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-foreground">{o.id}</span>
                      <span className="text-xs text-muted-foreground">
                        {o.netPosition.toLocaleString("tr-TR")} KG
                      </span>
                    </div>
                    <StatusPill status={o.status} label={o.statusLabel} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
