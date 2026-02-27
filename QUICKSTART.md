# WiseFlow SCCT - Hızlı Başlangıç Kılavuzu

## 📦 Gereksinimler

- **Node.js** 18+ veya 20+
- **pnpm** 8+

## 🚀 Kurulum

### 1. Projeyi Klonla

```bash
git clone <repository-url>
cd wiseflow-scct
```

### 2. Bağımlılıkları Yükle

```bash
pnpm install
```

### 3. Environment Değişkenlerini Ayarla

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyerek kendi ayarlarınızı yapın:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_ENABLE_MOCK_DATA=true
```

### 4. Geliştirme Sunucusunu Başlat

```bash
pnpm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

## 🏗️ Build

Production build oluşturmak için:

```bash
pnpm run build
```

Build çıktısı `dist/` klasöründe olacaktır.

## 📁 Proje Yapısı

```
wiseflow-scct/
├── src/
│   ├── app/
│   │   ├── components/          # UI bileşenleri
│   │   │   ├── ui/             # shadcn/ui components
│   │   │   ├── AlertBanner.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatusPill.tsx
│   │   │   └── Topbar.tsx
│   │   ├── lib/                # Utility fonksiyonlar
│   │   │   └── utils.ts       # formatCurrency, formatWeight, vb.
│   │   ├── pages/              # Sayfa bileşenleri
│   │   │   ├── Tower.tsx      # Ana dashboard
│   │   │   ├── Planning.tsx
│   │   │   ├── Procurement.tsx
│   │   │   ├── Masterdata.tsx
│   │   │   └── IBP.tsx
│   │   ├── services/           # API servisleri
│   │   │   └── api.ts         # Mock/Real API çağrıları
│   │   ├── App.tsx
│   │   └── routes.ts          # React Router yapılandırması
│   └── styles/                 # Global CSS
│       ├── fonts.css
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── .env.example
├── CHANGELOG.md
├── README.md
└── package.json
```

## 🎯 Ana Sayfalar

### Tower (Ana Dashboard)
**URL:** `/`

Ana kontrol merkezi - KPI'lar, trend grafikleri, kritik uyarılar:
- Hazır Stok Değeri (EUR)
- Açık Siparişler (KG)
- DIFOT performansı
- Net Pozisyon Trendi (TR/BG katmanları)
- Key Item analizleri

### Planning
**URL:** `/planning`

Talep planlaması ve tahminleme modülü.

### Procurement
**URL:** `/procurement`

Satın alma ve tedarikçi yönetimi.

### Masterdata
**URL:** `/masterdata`

Ana veri yönetimi ve ürün kataloğu.

### IBP
**URL:** `/ibp`

Integrated Business Planning ve S&OP süreçleri.

## ⌨️ Klavye Kısayolları

- **⌘K / Ctrl+K** - Command Palette'i aç
- **⌘E / Ctrl+E** - Rapor indir (planlanan)
- **⌘R / Ctrl+R** - Veriyi yenile (planlanan)
- **⌘A / Ctrl+A** - Kritik uyarıları göster (planlanan)

## 🛠️ Geliştirme İpuçları

### Yeni KPI Kartı Ekleme

```tsx
import { KpiCard } from "../components/KpiCard";
import { formatCurrency } from "../lib/utils";

<KpiCard
  title="Başlık"
  value={formatCurrency(1000000)}
  change={3.2}
  changeLabel="geçen aya göre"
  icon={Package}
  variant="default"
  sparkline={[100, 120, 110, 130]}
/>
```

### StatusPill Kullanımı

```tsx
<StatusPill 
  status="transit"    // success | warning | danger | info | transit | overdue | neutral
  label="Yolda" 
/>
```

### Para Birimi Formatı

```tsx
import { formatCurrency, formatWeight, formatNumber } from "../lib/utils";

formatCurrency(2800000)           // "€2.800.000"
formatWeight(8450)                // "8.450 KG"
formatNumber(1234567)             // "1.234.567"
```

## 🔌 API Entegrasyonu

### Mock Data Devre Dışı Bırakma

`.env` dosyasında:

```env
VITE_ENABLE_MOCK_DATA=false
VITE_API_BASE_URL=https://your-real-api.com
```

### API Service Kullanımı

```tsx
import { 
  getKpiData, 
  getNetPositionTrend,
  getCriticalAlerts 
} from "../services/api";

// Component içinde
useEffect(() => {
  const fetchData = async () => {
    const kpis = await getKpiData();
    const trend = await getNetPositionTrend();
    const alerts = await getCriticalAlerts();
    // Set state...
  };
  fetchData();
}, []);
```

## 🎨 Tema Özelleştirme

Theme değişkenleri `/src/styles/theme.css` dosyasında tanımlı:

```css
@layer theme {
  :root {
    --color-primary: #60a5fa;
    --color-success: #34d399;
    --color-warning: #fbbf24;
    --color-destructive: #ef4444;
    /* ... */
  }
}
```

## 📊 Recharts Kullanımı

Tüm grafikler için Recharts kullanılıyor. Örnek:

```tsx
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

<ResponsiveContainer width="100%" height={220}>
  <AreaChart data={data}>
    <XAxis dataKey="week" />
    <YAxis />
    <Tooltip />
    <Area dataKey="value" stroke="#60a5fa" fill="url(#gradient)" />
  </AreaChart>
</ResponsiveContainer>
```

## 🐛 Debugging

### Console Log'ları

```tsx
// Geliştirme ortamında log'ları göster
if (import.meta.env.DEV) {
  console.log('Data:', data);
}
```

### React DevTools

React Developer Tools browser extension'ı kullanarak component hierarchy'yi incele.

## 📝 Lisans

Proprietary - Cambro Özay için geliştirilmiştir.

## 🆘 Yardım

Sorularınız için:
- Proje dokümantasyonunu inceleyin: `README.md`
- Değişiklik geçmişini kontrol edin: `CHANGELOG.md`
- API servislerini inceleyin: `src/app/services/api.ts`
