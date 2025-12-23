# Meşhur - Pazaryeri Frontend

Modern, ölçeklenebilir ve üretim ortamı düşünülerek tasarlanmış bir pazaryeri frontend uygulaması.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0_strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)
![Storybook](https://img.shields.io/badge/Storybook-8.5-FF4785?logo=storybook)

---

## 📋 Gereksinim Kontrol Listesi

| # | Gereksinim | Durum | Açıklama |
|---|-----------|-------|----------|
| 1 | Next.js 16+ | ✅ | v16.1.1 |
| 2 | TypeScript strict | ✅ | tsconfig.json'da aktif |
| 3 | REST API modeli | ✅ | api.meshur.co/docs referans alındı |
| 4 | SSR/SSG/ISR stratejileri | ✅ | Sayfa bazlı doğru strateji |
| 5 | next/image kullanımı | ✅ | Tüm görsellerde |
| 6 | Code splitting | ✅ | Route bazlı |
| 7 | Memoization | ✅ | useCallback, useMemo |
| 8 | i18n (TR/EN) | ✅ | next-intl, URL tabanlı |
| 9 | Zustand state | ✅ | Normalize edilmiş favorites |
| 10 | Tailwind CSS | ✅ | v4 |
| 11 | Storybook | ✅ | Button, Badge, Skeleton stories |
| 12 | Atomic Design | ✅ | Atoms, Molecules, Organisms |
| 13 | Dark Mode | ✅ | System preference + toggle |
| 14 | Framer Motion | ✅ | ProductCard animasyonları |
| 15 | Mock JSON data | ✅ | products, categories, brands |
| 16 | Data transformers | ✅ | lib/transformers |
| 17 | Dynamic metadata | ✅ | generateMetadata |
| 18 | OpenGraph/Twitter | ✅ | Tüm sayfalarda |
| 19 | JSON-LD Schema | ✅ | Product, WebSite |
| 20 | 404/Error pages | ✅ | Custom tasarım |
| 21 | sitemap.xml | ✅ | Dinamik |
| 22 | robots.txt | ✅ | Mevcut |
| 23 | ESLint | ✅ | eslint.config.mjs |
| 24 | Prettier | ✅ | .prettierrc |
| 25 | Jest tests | ✅ | Button, Store, Transformers |

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler

- Node.js 20+
- pnpm 9+

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/username/meshur-co.git
cd meshur-co

# Bağımlılıkları yükleyin
pnpm install

# Development server
pnpm dev

# Production build
pnpm build
pnpm start
```

### Diğer Komutlar

```bash
# Storybook
pnpm storybook

# Testler
pnpm test
pnpm test:watch

# Linting
pnpm lint

# Formatting
pnpm format
```

---

## 🏗️ Proje Mimarisi

```
meshur-co/
├── app/                      # Next.js App Router
│   ├── [locale]/             # i18n route grubu
│   │   ├── layout.tsx        # Header + Footer wrapper
│   │   ├── page.tsx          # Homepage (SSG + ISR)
│   │   ├── loading.tsx       # Skeleton loading
│   │   ├── favorites/        # Favoriler (Client-side)
│   │   └── p/[slug]/         # Ürün detay (ISR)
│   ├── globals.css           # Tailwind + CSS variables
│   ├── not-found.tsx         # 404 sayfası
│   ├── error.tsx             # Error boundary
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # sitemap.xml
├── components/               # Atomic Design
│   ├── atoms/                # Button, Badge, Skeleton
│   ├── molecules/            # ProductCard, SearchBar, CategoryChip
│   ├── organisms/            # Header, Footer, ProductGrid
│   └── providers/            # ThemeProvider
├── data/                     # Mock JSON verileri
│   ├── products.json         # 20 ürün
│   ├── categories.json       # 6 kategori (hiyerarşik)
│   └── brands.json           # 12 marka
├── i18n/                     # Internationalization
│   ├── config.ts             # Locale yapılandırması
│   ├── request.ts            # next-intl request handler
│   └── messages/             # TR/EN çevirileri
├── lib/                      # Utility ve servisler
│   ├── api/                  # Data fetching (products, categories, brands)
│   ├── transformers/         # Veri dönüşümleri
│   └── utils/                # Yardımcı fonksiyonlar (cn)
├── store/                    # Zustand stores
│   ├── favorites.ts          # Normalize edilmiş favoriler
│   └── theme.ts              # Tema yönetimi
├── types/                    # TypeScript tipleri
│   └── index.ts              # Product, Category, Brand, Cart, etc.
├── .storybook/               # Storybook yapılandırması
├── middleware.ts             # i18n routing
└── next.config.ts            # Next.js yapılandırması
```

---

## 🎯 Rendering & State Kararları

### Sayfa Bazlı Rendering Stratejileri

| Sayfa | Strateji | Gerekçe |
|-------|----------|---------|
| **Homepage** | SSG + ISR (60s) | SEO kritik, içerik düzenli güncellenir |
| **Product Detail** | ISR (120s) | SEO önemli, ürün bilgisi nadiren değişir |
| **Category** | SSR | Dinamik filtre ve sıralama parametreleri |
| **Favorites** | Client-side | Kullanıcıya özel, localStorage'dan okunur |

### State Management Kararları

**Zustand seçim gerekçeleri:**
- Redux'a göre daha az boilerplate
- TypeScript desteği daha temiz
- Persist middleware ile localStorage entegrasyonu kolay
- React 19 ile uyumlu

**Normalized State Yapısı:**
```typescript
interface FavoritesState {
  items: Record<number, Product>;  // ID -> Product map (O(1) lookup)
  ids: number[];                    // Sıralı ID listesi (render order)
}
```

**Avantajları:**
- ✅ Hızlı lookup: `items[productId]` = O(1)
- ✅ Kolay persist: JSON serializable
- ✅ Duplicate kontrolü: `ids.includes()` veya `items[id]`
- ✅ Sıralama korunur: `ids` array'i

---

## 🌍 Internationalization (i18n)

**Çözüm:** next-intl

**Neden next-intl?**
- Next.js App Router ile native entegrasyon
- Server Components desteği
- URL tabanlı routing (`/tr`, `/en`)
- Merkezi çeviri yönetimi

**Yapı:**
```
/tr              → Türkçe anasayfa
/en              → İngilizce anasayfa
/tr/p/urun-adi   → Türkçe ürün detay
/en/p/product-name → İngilizce ürün detay
```

---

## 🎨 UI & Component Mimarisi

### Atomic Design

| Seviye | Örnekler | Açıklama |
|--------|----------|----------|
| **Atoms** | Button, Badge, Skeleton | En temel, yeniden kullanılabilir birimler |
| **Molecules** | ProductCard, SearchBar, CategoryChip | Atom kombinasyonları |
| **Organisms** | Header, Footer, ProductGrid | Karmaşık UI bölümleri |
| **Templates** | [locale]/layout.tsx | Sayfa düzenleri |

### Dark Mode

CSS custom properties ile tema yönetimi:

```css
:root {
  --background: 255 255 255;
  --foreground: 23 23 23;
}

.dark {
  --background: 10 10 10;
  --foreground: 237 237 237;
}
```

**Özellikler:**
- Sistem tercihine otomatik uyum
- Manuel toggle
- localStorage persist

---

## 📊 SEO Özellikleri

### Dynamic Metadata

Her sayfa için `generateMetadata` ile dinamik meta taglar:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: product.name,
    description: product.description,
    openGraph: { ... },
    twitter: { ... },
  };
}
```

### JSON-LD Schema

```typescript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "offers": { "@type": "Offer", ... },
  "aggregateRating": { ... }
}
```

### Technical SEO

- ✅ `sitemap.xml` - Dinamik, tüm ürünler ve kategoriler
- ✅ `robots.txt` - Doğru indexleme kuralları
- ✅ Canonical URLs
- ✅ Alternate hreflang (TR/EN)

---

## 🧪 Test Stratejisi

### Test Kapsamı

| Modül | Test Türü | Kapsam |
|-------|-----------|--------|
| Button | Unit | Props, variants, events |
| Favorites Store | Unit | Add, remove, toggle, normalize |
| Product Transformers | Unit | Price format, stock check, discount |

### Çalıştırma

```bash
pnpm test           # Tüm testler
pnpm test:watch     # Watch mode
```

---

## 📚 Varsayımlar ve Trade-off'lar

### Varsayımlar

1. **API Yapısı**: api.meshur.co/docs referans alındı
2. **Mock Data**: Production'da gerçek API'ye bağlanacak şekilde tasarlandı
3. **Authentication**: Bu scope'ta dahil değil, ancak yapı genişletilebilir

### Trade-off'lar

| Karar | Alternatif | Gerekçe |
|-------|------------|---------|
| **Zustand** vs Redux | Redux Toolkit | Daha az boilerplate, kolay persist |
| **next-intl** vs next-i18next | next-i18next | App Router native desteği |
| **Mock JSON** vs MSW | MSW | Hızlı başlangıç, ISR uyumlu |
| **Tailwind v4** vs v3 | v3 (stable) | Modern CSS features, inline theme |

### Kısıtlamalar

- **Search sayfası**: Henüz implement edilmedi (scope dışı)
- **Cart fonksiyonu**: UI hazır, business logic eklenmedi
- **Authentication**: Placeholder sayfalar mevcut

---

## 🔧 Teknik Detaylar

### Bağımlılıklar

**Production:**
- next: 16.1.1
- react: 19.2.3
- next-intl: ^4.1.0
- zustand: ^5.0.2
- framer-motion: ^11.15.0
- clsx: ^2.1.1
- lucide-react: ^0.468.0

**Development:**
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- ESLint 9 + Prettier
- Storybook 8.5.2
- Jest + React Testing Library

### Performans Optimizasyonları

- ✅ `next/image` - Otomatik optimizasyon, lazy loading
- ✅ Route-based code splitting - App Router native
- ✅ ISR - Static + incremental regeneration
- ✅ Loading states - Skeleton components
- ✅ Memoization - useCallback, useSyncExternalStore

---

## 📝 Sonuç

Bu proje, **meshur.co** pazaryeri için ölçeklenebilir, bakımı kolay ve modern bir frontend altyapısı sunmaktadır:

- ✅ **Mimari**: Atomic Design + Clean separation of concerns
- ✅ **Performans**: SSG/SSR/ISR stratejileri doğru uygulandı
- ✅ **DX**: TypeScript strict, ESLint, Prettier, Storybook
- ✅ **UX**: Dark mode, i18n, animations
- ✅ **SEO**: Full metadata, JSON-LD, sitemap, robots

---

## 📄 Lisans

MIT © 2024 Meşhur
