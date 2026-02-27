# WiseFlow SCCT

**WiseFlow Supply Chain Control Tower** - Cambro Özay için kurumsal tedarik zinciri yönetim platformu

## 🎯 Genel Bakış

WiseFlow SCCT, dark-mode-first tasarım dili ile geliştirilmiş, glass overlay efektleri ve bento grid layout sistemi kullanan premium bir tedarik zinciri kontrol kulesi uygulamasıdır.

## 🏗️ Teknoloji Stack

- **React** + **TypeScript**
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Premium UI component library
- **Recharts** - Veri görselleştirme
- **React Router** - Sayfa yönlendirme
- **Lucide React** - İkonlar

## 📊 Ana Modüller

### 1. **Tower** (Kontrol Merkezi)
Ana dashboard - Gerçek zamanlı KPI'lar, trend grafikleri ve uyarılar
- Hazır Stok Değeri (EUR formatında)
- Açık Siparişler (KG bazlı)
- DIFOT performansı
- Uyarılı ürün sayısı
- Net Pozisyon Trendi (haftalık, TR/BG katmanları)
- ABC Segment/Stok Dağılımı
- Key Item Net Pozisyon Analizi
- Kritik Uyarılar ve Aktif Hareketler

### 2. **Planning**
Talep planlaması ve tahminleme modülü
- Haftalık plan görünümü
- Talep trend analizi
- Forecast accuracy takibi

### 3. **Procurement**
Satın alma ve tedarikçi yönetimi
- Açık PO takibi
- Transit yük izleme
- Teslimat durumları

### 4. **Masterdata**
Ana veri yönetimi ve katalog
- Ürün kataloğu yönetimi
- Tedarikçi bilgileri
- Lokasyon yönetimi
- Toplam kayıt takibi

### 5. **IBP** (Integrated Business Planning)
Entegre iş planlaması
- S&OP döngüsü
- Plan uyumu takibi
- Büyüme hedefleri
- Senaryo analizleri

## 🎨 Tasarım Sistemi

- **Typography**: Inter (UI) + JetBrains Mono (kod/data)
- **Color Scheme**: Dark-mode-first, glass overlay effects
- **Layout**: Bento grid system ile responsive design
- **Components**: Accessibility-first architecture
- **Spacing & Shadows**: Consistent scale system

## 🛠️ Utility Fonksiyonlar

### Para Birimi Formatı
```typescript
formatCurrency(2800000) // "€2.800.000"
formatCurrency(2800000, 'EUR', 'tr-TR')
```

### Ağırlık Formatı
```typescript
formatWeight(8450) // "8.450 KG"
```

### Sayı Formatı
```typescript
formatNumber(1234567) // "1.234.567"
```

## 🎯 Domain-Specific Özellikler

### Cambro Özay İçin Özelleştirilmiş
- **Branding**: WiseFlow SCCT logosu ve Cambro Özay alt metni
- **Para Birimi**: EUR (€) formatı, Türkçe locale ile
- **Metrikler**: KG bazlı ölçümler (adet yerine)
- **Haftalık Görünüm**: ISO hafta numaraları (W09, W10, W11...)
- **Lokasyon**: TR (Türkiye) ve BG (Bulgaristan) katmanları
- **Key Items**: CAM-XXX formatında katalog kodları
- **DIFOT**: Delivery In Full On Time takibi

### StatusPill Varyantları
- `success` - Teslim Edildi (yeşil)
- `warning` - Uyarı (sarı)
- `danger` - Negatif/Kritik (kırmızı)
- `info` - İşlemde (mavi)
- `transit` - Yolda (mor)
- `overdue` - Gecikmiş (amber)
- `neutral` - Nötr (gri)

## 🔄 API Entegrasyonu (Gelecek)

Şu anda mock data kullanılıyor. Gerçek API entegrasyonu için:

1. Her component kendi datasını `useEffect` + `apiClient` ile çekmeli
2. Tüm hardcoded array'ler API çağrılarına dönüşmeli
3. Real-time güncellemeler için WebSocket desteği eklenebilir

## 📝 Geliştirme Notları

- Tüm para birimi gösterimleri `formatCurrency()` kullanmalı
- Ağırlık gösterimleri `formatWeight()` kullanmalı
- Alert mesajları Türkçe ve domain-specific olmalı
- Grafik başlıkları ve etiketler Türkçe
- Negative net pozisyon kırmızı renk ile vurgulanmalı

## 🚀 Başlangıç

```bash
# Bağımlılıkları yükle
pnpm install

# Geliştirme sunucusunu başlat
pnpm run dev

# Production build
pnpm run build
```

## 📄 Lisans

Proprietary - Cambro Özay için geliştirilmiştir.
