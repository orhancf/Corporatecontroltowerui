# Changelog

Bu dosya WiseFlow SCCT projesindeki tüm önemli değişiklikleri içerir.

## [2.0.0] - 2026-02-27 - WiseFlow SCCT Dönüşümü

### 🎯 Majör Değişiklikler

#### Branding & Navigasyon
- ✅ Logo değiştirildi: **"ControlTower"** → **"WiseFlow SCCT"**
- ✅ Alt başlık: **"Supply Chain HQ"** → **"Cambro Özay"**
- ✅ Sidebar navigasyon tamamen yenilendi:
  - Overview → **Tower** (Radar icon)
  - Inventory → **Planning** (Calendar icon)
  - Orders → **Procurement** (ShoppingBag icon)
  - Suppliers → **Masterdata** (Database icon)
  - Production → **IBP** (LineChart icon)

#### Yeni Sayfa Yapısı
- ✅ **Tower.tsx** - Ana kontrol merkezi dashboard'u
- ✅ **Planning.tsx** - Talep planlaması ve tahminleme
- ✅ **Procurement.tsx** - Satın alma ve tedarikçi yönetimi
- ✅ **Masterdata.tsx** - Ana veri yönetimi ve katalog
- ✅ **IBP.tsx** - Integrated Business Planning

#### KPI & Metrics Dönüşümü

**Eski → Yeni:**
- "Total Inventory $2.4M" → **"Hazır Stok Değeri €2.8M"** (EUR formatı)
- "Open Orders 347" → **"Açık Siparişler 8.450 KG"** (KG bazlı)
- "On-Time Delivery 94.2%" → **"DIFOT 87.3%"** (Cambro hedefi)
- "Active Alerts 12" → **"Uyarılı Ürün 12"** (alertFlag=true count)

#### Grafikler & Görselleştirme

**Area Chart (Net Pozisyon Trendi):**
- ✅ Aylık görünüm → **Haftalık görünüm** (W09, W10, W11...)
- ✅ "Orders & Fulfilled" → **"TR Katman1"** vs **"BG Katman1"**
- ✅ Sıfır referans çizgisi eklendi (negatif pozisyonlar için)
- ✅ Tooltip formatı KG bazlı

**Pie Chart (Segment Dağılımı):**
- ✅ "Raw Materials/WIP/Finished Goods" → **"TR Stok / BG Stok / Transit"**
- ✅ Başlık: "Inventory Breakdown" → **"Stok Dağılımı"**

**Bar Chart (Key Item Analizi):**
- ✅ "Top Suppliers - OTD Rate" → **"Key Item Net Pozisyon Özeti"**
- ✅ Fake supplier isimleri → **CAM-001, CAM-002...** (gerçek katalog kodları)
- ✅ Pozitif/negatif değerlere göre renk kodlama (yeşil/kırmızı)

#### Tablo & Liste Bileşenleri

**Recent Orders → Aktif Hareketler:**
- ✅ PO numaraları → **CAM-XXX kodları**
- ✅ Dolar değerleri → **Net pozisyon (KG)**
- ✅ Hafta bilgisi eklendi (W11, W12...)
- ✅ Durum etiketleri Türkçeleştirildi

**Alert Banner:**
- ✅ İngilizce mesajlar → **Türkçe mesajlar**
- ✅ Generic uyarılar → **Domain-specific uyarılar**
- ✅ Örnek: "CAM-002 · W11 haftasında net pozisyon negatife düştü: -350 KG"

#### StatusPill Component

**Yeni Variant'lar:**
- ✅ `transit` - Yolda (mor, purple-500)
- ✅ `overdue` - Gecikmiş (amber, amber-500)

**Türkçe Label'lar:**
- "Delivered" → **"Teslim Edildi"**
- "In Transit" → **"Yolda"**
- "Delayed" → **"Gecikmiş"**
- "Processing" → **"İşlemde"**

#### Lokalizasyon & Formatlar

**Para Birimi:**
- ✅ Tüm $ işaretleri → **€** (EUR)
- ✅ Global `formatCurrency()` utility eklendi
- ✅ Türkçe locale (tr-TR) desteği

**Tarih Formatı:**
- ✅ Topbar tarihi: "Feb 27, 2026" → **"27 Şubat 2026"**
- ✅ Türkçe ay isimleri

**Ağırlık Formatı:**
- ✅ `formatWeight()` utility eklendi
- ✅ Örnek: "8.450 KG"

#### Command Palette

**Türkçeleştirme:**
- ✅ Placeholder: "Search..." → **"Sayfa, sipariş, ürün, tedarikçi ara..."**
- ✅ Heading'ler: "Pages" → **"Sayfalar"**, "Quick Actions" → **"Hızlı Eylemler"**
- ✅ Data entities: CAM kodları, TR/BG lokasyonları
- ✅ Recent searches: Domain-specific örnekler

#### Utility Fonksiyonlar

**Yeni Dosya: `/src/app/lib/utils.ts`**
```typescript
formatCurrency(amount, currency = 'EUR', locale = 'tr-TR')
formatNumber(amount, locale = 'tr-TR')
formatWeight(amount, locale = 'tr-TR')
```

#### API Service Layer

**Yeni Dosya: `/src/app/services/api.ts`**
- ✅ Mock data service oluşturuldu
- ✅ Gelecek API entegrasyonu için hazır
- ✅ Type-safe metodlar:
  - `getKpiData()`
  - `getNetPositionTrend()`
  - `getSegmentDistribution()`
  - `getKeyItems()`
  - `getCriticalAlerts()`
  - `getActiveMovements()`

### 🗑️ Silinen Dosyalar

- ❌ Dashboard.tsx (Tower.tsx ile değiştirildi)
- ❌ Inventory.tsx (Planning.tsx ile değiştirildi)
- ❌ Orders.tsx (Procurement.tsx ile değiştirildi)
- ❌ Suppliers.tsx (Masterdata.tsx ile değiştirildi)
- ❌ Production.tsx (IBP.tsx ile değiştirildi)

### 📚 Dokümantasyon

- ✅ **README.md** eklendi - Proje genel bakışı, stack, modüller
- ✅ **CHANGELOG.md** (bu dosya) - Tüm değişiklikler detaylı

### 🔮 Gelecek Adımlar (TODO)

1. **API Entegrasyonu**
   - [ ] Mock data'yı gerçek API çağrılarına dönüştür
   - [ ] API endpoint'leri backend ile entegre et
   - [ ] Real-time data sync için WebSocket ekle

2. **ABC Segment Analizi**
   - [ ] S-11 endpoint'inden ABC sınıfı verisi çek
   - [ ] Pie chart'ı A/B/C segmentlerine göre güncelle

3. **Filter & Search**
   - [ ] Hafta bazlı filtreleme ekle
   - [ ] Katalog kodu arama optimize et
   - [ ] Lokasyon bazlı filtreleme

4. **Exportlar**
   - [ ] PDF rapor eksport
   - [ ] Excel veri eksport
   - [ ] Haftalık e-posta raporları

5. **Performans**
   - [ ] Chart rendering optimizasyonu
   - [ ] Data caching stratejisi
   - [ ] Lazy loading büyük veri setleri için

---

## [1.0.0] - Initial Release

- ✅ Dark-mode-first tasarım
- ✅ Glass overlay efektleri
- ✅ Bento grid layout
- ✅ shadcn/ui component library
- ✅ Recharts entegrasyonu
- ✅ React Router Data mode
