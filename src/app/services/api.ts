/**
 * API Service Layer
 * 
 * Bu dosya gelecekte gerçek API çağrıları için kullanılacak.
 * Şu anda mock data döndürüyor, ancak API endpoint'leri hazır olduğunda
 * fetch() çağrılarına kolayca dönüştürülebilir.
 */

// Base API configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || "https://api.wiseflow-scct.com";
const API_TIMEOUT = 10000; // 10 seconds

// API Client with error handling
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
    throw new Error("Unknown error occurred");
  }
}

// Types
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
  code: string;
  netPosition: number;
  alertFlag?: boolean;
  week?: string;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
}

export interface Movement {
  id: string;
  week: string;
  netPosition: number;
  status: "success" | "warning" | "danger" | "info" | "transit" | "overdue";
  statusLabel: string;
}

// API Methods - Currently returning mock data
// Replace these with real API calls when backend is ready

export async function getKpiData(): Promise<KpiData> {
  // TODO: Replace with real API call
  // return apiRequest<KpiData>('/api/v1/kpis');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hazirStokDegeri: 2800000,
        acikSiparisler: 8450,
        difot: 87.3,
        uyariliUrun: 12,
      });
    }, 300);
  });
}

export async function getNetPositionTrend(): Promise<NetPositionWeek[]> {
  // TODO: Replace with real API call
  // return apiRequest<NetPositionWeek[]>('/api/v1/net-position/trend');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { week: "W09", trNet: 1240, bgNet: 850 },
        { week: "W10", trNet: 980, bgNet: 620 },
        { week: "W11", trNet: -150, bgNet: -320 },
        { week: "W12", trNet: 420, bgNet: 180 },
        { week: "W13", trNet: 890, bgNet: 540 },
        { week: "W14", trNet: 1120, bgNet: 780 },
      ]);
    }, 300);
  });
}

export async function getSegmentDistribution(): Promise<SegmentData[]> {
  // TODO: Replace with real API call
  // return apiRequest<SegmentData[]>('/api/v1/segments');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "TR Stok", value: 42 },
        { name: "BG Stok", value: 31 },
        { name: "Transit", value: 27 },
      ]);
    }, 300);
  });
}

export async function getKeyItems(): Promise<KeyItem[]> {
  // TODO: Replace with real API call
  // return apiRequest<KeyItem[]>('/api/v1/key-items');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { code: "CAM-001", netPosition: 850 },
        { code: "CAM-002", netPosition: -350, alertFlag: true },
        { code: "CAM-003", netPosition: 420 },
        { code: "CAM-004", netPosition: -150, alertFlag: true },
        { code: "CAM-005", netPosition: 620 },
      ]);
    }, 300);
  });
}

export async function getCriticalAlerts(): Promise<Alert[]> {
  // TODO: Replace with real API call
  // return apiRequest<Alert[]>('/api/v1/alerts/critical');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          type: "error",
          title: "Negatif Net Pozisyon",
          message: "CAM-002 · W11 haftasında net pozisyon negatife düştü: -350 KG",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          type: "warning",
          title: "Gecikmeli Sipariş",
          message: "CAM-004 · Gecikmeli sipariş: 150 KG eksik",
          timestamp: new Date().toISOString(),
        },
        {
          id: "3",
          type: "info",
          title: "Transit Durum",
          message: "CAM-001 · Transit yükleme 850 KG BG'den TR'ye yolda",
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 300);
  });
}

export async function getActiveMovements(): Promise<Movement[]> {
  // TODO: Replace with real API call
  // return apiRequest<Movement[]>('/api/v1/movements/active');
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "CAM-002", week: "W11", netPosition: -350, status: "danger", statusLabel: "Negatif" },
        { id: "CAM-004", week: "W12", netPosition: -150, status: "overdue", statusLabel: "Gecikmiş" },
        { id: "CAM-001", week: "W13", netPosition: 850, status: "transit", statusLabel: "Yolda" },
        { id: "CAM-005", week: "W14", netPosition: 620, status: "success", statusLabel: "Teslim Edildi" },
        { id: "CAM-003", week: "W10", netPosition: 420, status: "info", statusLabel: "İşlemde" },
      ]);
    }, 300);
  });
}

// Export API client for custom requests
export { apiRequest };
