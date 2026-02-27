# WiseFlow SCCT - Mimari Dokümantasyon

## 📐 Mimari Genel Bakış

WiseFlow SCCT, modern React uygulaması prensiplerine uygun olarak geliştirilmiş, component-based, type-safe ve responsive bir tedarik zinciri kontrol kulesidir.

## 🏗️ Teknoloji Stack

### Core
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool & dev server

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **CSS Custom Properties** - Theme system
- **Glass morphism** - Premium UI effects

### UI Components
- **shadcn/ui** - Radix UI primitives
- **Lucide React** - Icon system
- **Recharts** - Data visualization

### Routing
- **React Router 7** - Data mode routing
- **File-based routes** - Declarative routing

## 📦 Proje Yapısı

```
wiseflow-scct/
│
├── src/
│   ├── app/                          # Ana uygulama kodu
│   │   ├── components/               # React bileşenleri
│   │   │   ├── ui/                  # shadcn/ui base components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   └── ... (40+ components)
│   │   │   │
│   │   │   ├── AlertBanner.tsx      # Uyarı banner component
│   │   │   ├── CommandPalette.tsx   # ⌘K arama paleti
│   │   │   ├── DataTable.tsx        # Tablo component
│   │   │   ├── DateRangePicker.tsx  # Tarih aralığı seçici
│   │   │   ├── FilterChips.tsx      # Filtre chip'leri
│   │   │   ├── KpiCard.tsx          # KPI kartı
│   │   │   ├── Layout.tsx           # Ana layout wrapper
│   │   │   ├── Sidebar.tsx          # Yan navigasyon
│   │   │   ├── StatusPill.tsx       # Durum pill'i
│   │   │   └── Topbar.tsx           # Üst bar
│   │   │
│   │   ├── lib/                     # Utility fonksiyonlar
│   │   │   └── utils.ts             # formatCurrency, formatWeight, cn
│   │   │
│   │   ├── pages/                   # Sayfa component'leri
│   │   │   ├── Tower.tsx            # Ana dashboard (/)
│   │   │   ├── Planning.tsx         # Planlama (/planning)
│   │   │   ├── Procurement.tsx      # Satın alma (/procurement)
│   │   │   ├── Masterdata.tsx       # Ana veri (/masterdata)
│   │   │   └── IBP.tsx              # IBP (/ibp)
│   │   │
│   │   ├── services/                # API servisleri
│   │   │   └── api.ts               # API client & mock data
│   │   │
│   │   ├── App.tsx                  # Root component
│   │   └── routes.ts                # Route yapılandırması
│   │
│   └── styles/                      # Global stiller
│       ├── fonts.css                # Font imports
│       ├── index.css                # Ana CSS entry
│       ├── tailwind.css             # Tailwind directives
│       └── theme.css                # CSS custom properties
│
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore patterns
├── ARCHITECTURE.md                  # Bu dosya
├── ATTRIBUTIONS.md                  # Lisanslar
├── CHANGELOG.md                     # Değişiklik geçmişi
├── package.json                     # Dependencies
├── QUICKSTART.md                    # Hızlı başlangıç
├── README.md                        # Ana dokümantasyon
└── vite.config.ts                   # Vite yapılandırması
```

## 🎯 Component Hierarchy

```
App (TooltipProvider)
└── RouterProvider
    └── Layout
        ├── Sidebar
        │   ├── Logo (WiseFlow SCCT)
        │   ├── Navigation
        │   │   ├── Tower
        │   │   ├── Planning
        │   │   ├── Procurement
        │   │   ├── Masterdata
        │   │   └── IBP
        │   └── Bottom Actions
        │       ├── Notifications
        │       ├── Help
        │       └── Settings
        │
        ├── Main (Outlet)
        │   ├── Topbar
        │   │   ├── Title & Subtitle
        │   │   ├── Search
        │   │   ├── Date
        │   │   └── User
        │   │
        │   └── Page Content
        │       └── [Tower | Planning | Procurement | Masterdata | IBP]
        │
        └── CommandPalette
```

## 🔄 Data Flow

### Mock Data (Mevcut)
```
Component → useEffect → api.ts (mock) → setState → Render
```

### Real API (Gelecek)
```
Component → useEffect → api.ts → fetch(API) → setState → Render
                                      ↓
                              Error Handling
                                      ↓
                                Toast/Alert
```

## 🎨 Design System

### Color Tokens
```css
/* Primary Colors */
--color-primary: #60a5fa         /* Blue */
--color-success: #34d399         /* Green */
--color-warning: #fbbf24         /* Yellow */
--color-destructive: #ef4444     /* Red */
--color-info: #3b82f6            /* Blue */

/* Chart Colors */
--color-chart-1: #60a5fa
--color-chart-2: #34d399
--color-chart-3: #fbbf24
--color-chart-4: #a78bfa
--color-chart-5: #f87171
```

### Typography
```css
/* Fonts */
--font-sans: Inter               /* UI Text */
--font-mono: JetBrains Mono      /* Data/Code */

/* Scale */
text-xs     11px
text-sm     13px
text-base   14px
text-lg     16px
text-xl     18px
text-2xl    24px
```

### Spacing Scale
```
0.5 → 2px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
```

## 🧩 Key Components

### KpiCard
**Props:**
```typescript
{
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger";
  sparkline?: number[];
}
```

**Kullanım:**
```tsx
<KpiCard
  title="Hazır Stok Değeri"
  value={formatCurrency(2800000)}
  change={3.2}
  icon={Package}
  variant="default"
  sparkline={[...]}
/>
```

### StatusPill
**Variants:**
- `success` - Teslim Edildi (yeşil)
- `warning` - Uyarı (sarı)
- `danger` - Kritik (kırmızı)
- `info` - Bilgi (mavi)
- `transit` - Yolda (mor)
- `overdue` - Gecikmiş (amber)
- `neutral` - Nötr (gri)

### AlertBanner
**Types:**
- `warning` - Uyarı
- `info` - Bilgi
- `success` - Başarı
- `error` - Hata

## 🔌 API Service Pattern

### Service Layer (`api.ts`)
```typescript
// Type definitions
export interface KpiData { ... }

// Mock data (development)
export async function getKpiData(): Promise<KpiData> {
  // TODO: Replace with real API
  return mockData;
}

// Real API (production)
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return response.json();
}
```

### Component Usage
```typescript
import { getKpiData } from "../services/api";

function Component() {
  const [data, setData] = useState<KpiData | null>(null);
  
  useEffect(() => {
    getKpiData().then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <KpiCard {...data} />;
}
```

## 🎯 Routing Strategy

### React Router Data Mode
```typescript
createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Tower },
      { path: "planning", Component: Planning },
      // ...
    ],
  },
]);
```

### Navigation Flow
```
User clicks → NavLink → Router → Component renders
                            ↓
                    URL updates (/planning)
```

## 🔒 Type Safety

### TypeScript Configuration
- Strict mode enabled
- No implicit any
- Strict null checks

### Type Definitions
```typescript
// API Types
interface KpiData { ... }
interface NetPositionWeek { ... }

// Component Props
interface KpiCardProps { ... }
interface StatusPillProps { ... }
```

## 🚀 Performance

### Optimization Strategies
1. **Code Splitting** - Route-based lazy loading (planned)
2. **Memoization** - React.memo for expensive components
3. **Virtual Scrolling** - Large data sets (planned)
4. **Debouncing** - Search inputs
5. **Caching** - API responses (planned)

### Bundle Size
- Recharts: ~150KB
- shadcn/ui: ~80KB
- Lucide Icons: ~50KB (tree-shakeable)

## 🔄 State Management

### Current Approach
- **Local State** - useState for component state
- **No Global Store** - Props drilling minimal
- **Future** - Zustand/Jotai for complex state

### State Flow
```
Component A (fetch data)
    ↓
useState(data)
    ↓
Pass via props → Component B
```

## 🌐 Internationalization

### Current
- Hardcoded Turkish strings
- EUR currency
- tr-TR locale

### Future (i18n)
```typescript
// Planned
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('tower.title')}</h1>
```

## 📊 Chart Architecture

### Recharts Components
```
ResponsiveContainer
└── AreaChart / BarChart / PieChart
    ├── CartesianGrid
    ├── XAxis / YAxis
    ├── Tooltip
    ├── Legend
    └── Area / Bar / Pie
```

### Data Format
```typescript
// Area Chart
{ week: "W09", trNet: 1240, bgNet: 850 }

// Bar Chart
{ code: "CAM-001", netPosition: 850 }

// Pie Chart
{ name: "TR Stok", value: 42 }
```

## 🔐 Security Considerations

### Environment Variables
```bash
# .env
VITE_API_BASE_URL=https://api...
VITE_API_KEY=***  # Never commit!
```

### API Security (Planned)
- JWT authentication
- CORS configuration
- Rate limiting
- Input validation

## 🧪 Testing Strategy (Planned)

### Unit Tests
- Component rendering
- Utility functions
- API mocking

### Integration Tests
- Page navigation
- Data fetching
- User interactions

### E2E Tests
- Critical user flows
- Dashboard loading
- Chart interactions

## 📈 Scalability

### Horizontal Scaling
- Stateless components
- API-driven data
- CDN for static assets

### Vertical Scaling
- Code splitting
- Lazy loading
- Virtual scrolling
- Web workers for heavy computation

## 🔄 CI/CD Pipeline (Planned)

```
Git Push
    ↓
GitHub Actions
    ↓
    ├── Lint (ESLint)
    ├── Type Check (tsc)
    ├── Build (vite build)
    └── Deploy (Vercel/Netlify)
```

## 📝 Naming Conventions

### Files
- Components: PascalCase (`KpiCard.tsx`)
- Utilities: camelCase (`utils.ts`)
- Pages: PascalCase (`Tower.tsx`)

### Variables
- Components: PascalCase (`const KpiCard = ...`)
- Functions: camelCase (`formatCurrency`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### CSS Classes
- Tailwind utilities
- BEM for custom CSS (minimal)

## 🎯 Future Architecture

### Planned Enhancements
1. **State Management** - Zustand for complex state
2. **Real-time** - WebSocket for live data
3. **Offline Support** - Service Workers
4. **PWA** - Progressive Web App
5. **Analytics** - User behavior tracking
6. **A/B Testing** - Feature flags

---

**Last Updated:** 2026-02-27  
**Version:** 2.0.0  
**Maintainer:** WiseFlow Team
