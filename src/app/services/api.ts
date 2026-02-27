/**
 * API Service Layer — WiseFlowSCCT Backend
 *
 * Bu dosya WiseFlowSCCT Express backend'ine bağlanır.
 * Base URL: import.meta.env.VITE_API_BASE_URL (default: http://localhost:3000)
 */

const API_BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "http://localhost:3000";

const API_TIMEOUT = 10000;

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...options?.headers },
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`API Error: ${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error) {
      if (error.name === "AbortError") throw new Error("İstek zaman aşımına uğradı");
      throw error;
    }
    throw new Error("Bilinmeyen hata");
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KpiData {
  hazirStokDegeri: number;
  acikSiparisler: number;
  difot: number;
  uyariliUrun: number;
}

export interface NetPositionWeek {
  week: string;
  trNet: number;
  bgNet: number;
}

export interface SegmentData {
  name: string;
  value: number;
}

export interface KeyItem {
  catalogCode: string;
  description: string;
  readyStock: number;
  totalStock: number;
  openOrders: number;
  netPosition: number;
  alertFlag: boolean;
  valueEUR: string;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
}

export interface Movement {
  id: string;
  week: string;
  netPosition: number;
  status: "success" | "warning" | "danger" | "info" | "transit" | "overdue";
  statusLabel: string;
}

// ─── API Methods ──────────────────────────────────────────────────────────────

/** GET /api/v1/tower/key-items → KPI özet */
export async function getKpiData(): Promise<KpiData> {
  const res = await apiRequest<{ data: KeyItem[] }>("/api/v1/tower/key-items");
  const items = res.data;
  const hazirStokDegeri = items.reduce((sum, i) => {
    const num = parseFloat(i.valueEUR.replace(/[^\d.,-]/g, "").replace(",", "."));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const acikSiparisler = items.reduce((sum, i) => sum + i.openOrders, 0);
  const uyariliUrun = items.filter((i) => i.alertFlag).length;
  return { hazirStokDegeri, acikSiparisler, difot: 0, uyariliUrun };
}

/** GET /api/v1/planning/net-position → TR + BG haftalık trend */
export async function getNetPositionTrend(): Promise<NetPositionWeek[]> {
  const [trRes, bgRes] = await Promise.all([
    apiRequest<{ data: Array<{ weekNo: string; layer1: number }> }>(
      "/api/v1/planning/net-position?country=TR"
    ),
    apiRequest<{ data: Array<{ weekNo: string; layer1: number }> }>(
      "/api/v1/planning/net-position?country=BG"
    ),
  ]);
  const trMap = new Map(trRes.data.map((r) => [r.weekNo, r.layer1]));
  const bgMap = new Map(bgRes.data.map((r) => [r.weekNo, r.layer1]));
  const weeks = [...new Set([...trMap.keys(), ...bgMap.keys()])].sort();
  return weeks.slice(0, 6).map((week) => ({
    week: week.replace(/^\d{4}-/, ""),
    trNet: trMap.get(week) ?? 0,
    bgNet: bgMap.get(week) ?? 0,
  }));
}

/** GET /api/v1/tower/key-items → stok dağılımı (TR/BG/Transit) */
export async function getSegmentDistribution(): Promise<SegmentData[]> {
  const res = await apiRequest<{ data: KeyItem[] }>("/api/v1/tower/key-items");
  const items = res.data;
  const totalReady = items.reduce((s, i) => s + i.readyStock, 0);
  const totalTransit = items.reduce((s, i) => s + Math.max(0, i.totalStock - i.readyStock), 0);
  const total = totalReady + totalTransit || 1;
  const trEst = Math.round((totalReady * 0.58 * 100) / total);
  const bgEst = Math.round((totalReady * 0.42 * 100) / total);
  const transit = 100 - trEst - bgEst;
  return [
    { name: "TR Stok", value: trEst },
    { name: "BG Stok", value: bgEst },
    { name: "Transit", value: Math.max(0, transit) },
  ];
}

/** GET /api/v1/tower/key-items → key item listesi */
export async function getKeyItems(): Promise<KeyItem[]> {
  const res = await apiRequest<{ data: KeyItem[] }>("/api/v1/tower/key-items");
  return res.data;
}

/** alertFlag=true olan key item'ları uyarı olarak döndür */
export async function getCriticalAlerts(): Promise<Alert[]> {
  const res = await apiRequest<{ data: KeyItem[] }>("/api/v1/tower/key-items");
  return res.data
    .filter((i) => i.alertFlag)
    .slice(0, 5)
    .map((i, idx) => ({
      id: String(idx + 1),
      type: (i.netPosition < -500 ? "error" : "warning") as Alert["type"],
      title: i.netPosition < 0 ? "Negatif Net Pozisyon" : "Stok Uyarısı",
      message: `${i.catalogCode} · ${i.description} · Net poz: ${i.netPosition.toLocaleString("tr-TR")} KG`,
    }));
}

/** Aktif hareketleri key item'lardan türet */
export async function getActiveMovements(): Promise<Movement[]> {
  const res = await apiRequest<{ data: KeyItem[] }>("/api/v1/tower/key-items");
  return res.data.slice(0, 5).map((i) => ({
    id: i.catalogCode,
    week: "—",
    netPosition: i.netPosition,
    status: (
      i.netPosition < 0 ? "danger" : i.alertFlag ? "warning" : "success"
    ) as Movement["status"],
    statusLabel: i.netPosition < 0 ? "Negatif" : i.alertFlag ? "Uyarı" : "Normal",
  }));
}

export { apiRequest };
