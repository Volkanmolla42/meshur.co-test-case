# Meşhur - Pazaryeri Frontend

Modern, ölçeklenebilir ve üretim ortamı düşünülerek tasarlanmış bir pazaryeri frontend uygulaması.

[![GitHub](https://img.shields.io/badge/GitHub-Volkanmolla42/meshur.co--test--case-181717?logo=github)](https://github.com/Volkanmolla42/meshur.co-test-case)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0_strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)

---

## 📋 Gereksinim Kontrol Listesi

| # | Gereksinim | Durum |
|---|-----------|-------|
| 1 | Next.js 16+ | ✅ |
| 2 | TypeScript strict | ✅ |
| 3 | REST API modeli | ✅ |
| 4 | SSR/SSG/ISR stratejileri | ✅ |
| 5 | next/image kullanımı | ✅ |
| 6 | i18n (TR/EN) | ✅ |
| 7 | Zustand state | ✅ |
| 8 | Tailwind CSS v4 | ✅ |
| 9 | Storybook | ✅ |
| 10 | Atomic Design | ✅ |
| 11 | Dark Mode | ✅ |
| 12 | JSON-LD Schema | ✅ |
| 13 | sitemap.xml / robots.txt | ✅ |
| 14 | ESLint / Prettier | ✅ |
| 15 | Jest tests | ✅ |

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler

- Node.js 20+
- pnpm 9+

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/Volkanmolla42/meshur.co-test-case.git
cd meshur.co-test-case

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
pnpm storybook      # Storybook
pnpm test           # Testler
pnpm lint           # Linting
pnpm format         # Formatting
```

---

## 🏗️ Proje Mimarisi

```
meshur.co-test-case/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n routing
│   │   │   ├── layout.tsx      # Locale layout
│   │   │   ├── page.tsx        # Homepage (SSG + ISR)
│   │   │   ├── c/[slug]/       # Category (ISR)
│   │   │   ├── p/[slug]/       # Product detail (ISR)
│   │   │   ├── cart/           # Cart page
│   │   │   ├── favorites/      # Favorites (Client-side)
│   │   │   └── search/         # Search page
│   │   ├── layout.tsx          # Root layout
│   │   ├── robots.ts           # robots.txt
│   │   ├── sitemap.ts          # sitemap.xml
│   │   ├── not-found.tsx       # 404 page
│   │   └── error.tsx           # Error boundary
│   ├── i18n/                   # Internationalization
│   │   ├── routing.ts          # defineRouting()
│   │   ├── navigation.ts       # createNavigation()
│   │   └── request.ts          # getRequestConfig()
│   ├── shared/                 # Shared code
│   │   ├── ui/
│   │   │   ├── primitives/     # Atoms (Button, Badge, Skeleton)
│   │   │   └── react/          # Molecules (ProductCard, SearchBar)
│   │   ├── layout/             # Organisms (Header, Footer, ProductGrid)
│   │   ├── lib/                # Utils, API functions, transformers
│   │   └── providers/          # ClientProviders, ServerProviders
│   ├── features/               # Domain-specific features
│   │   └── marketplace/        # Zustand stores (cart, favorites, theme)
│   ├── types/                  # TypeScript type definitions
│   ├── data/                   # Mock JSON data
│   ├── stories/                # Storybook stories
│   ├── styles/                 # Global CSS
│   └── proxy.ts                # Next.js 16 i18n proxy
├── messages/                   # i18n message files (TR/EN)
└── ...
```

---

## 🌍 Internationalization (i18n)

**next-intl** ile URL tabanlı çoklu dil desteği:

```
/tr              → Türkçe
/en              → İngilizce
/tr/p/urun-adi   → Türkçe ürün detay
/en/p/product    → İngilizce ürün detay
```

### Yapılandırma (Next.js 16+)

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always',
});

// src/i18n/navigation.ts
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

---

## 🎯 Rendering Stratejileri

| Sayfa | Strateji | Gerekçe |
|-------|----------|---------|
| Homepage | SSG + ISR (60s) | SEO kritik |
| Product Detail | ISR (120s) | SEO önemli |
| Category | ISR | Dinamik filtreler |
| Favorites | Client-side | Kullanıcıya özel |

---

## 🎨 UI & Component Mimarisi

### Atomic Design

| Seviye | Örnekler | Konum |
|--------|----------|-------|
| Atoms | Button, Badge, Skeleton | `src/shared/ui/primitives/` |
| Molecules | ProductCard, SearchBar | `src/shared/ui/react/` |
| Organisms | Header, Footer, ProductGrid | `src/shared/layout/` |

### Dark Mode

CSS custom properties ile tema yönetimi:
- Sistem tercihine otomatik uyum
- Manuel toggle
- localStorage persist

---

## 📊 SEO

- ✅ Dynamic metadata (`generateMetadata`)
- ✅ OpenGraph / Twitter Cards
- ✅ JSON-LD Schema (Product, WebSite)
- ✅ `sitemap.xml` (dinamik)
- ✅ `robots.txt`
- ✅ Canonical URLs
- ✅ Alternate hreflang (TR/EN)

---

## 🔧 Teknik Detaylar

### Bağımlılıklar

**Production:**
- next: 16.1.1
- react: 19.2.3
- next-intl: ^4.1.0
- next-themes: ^0.4.4
- zustand: ^5.0.2
- framer-motion: ^11.15.0

**Development:**
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- ESLint 9 + Prettier
- Storybook 8.5
- Jest + React Testing Library

---

## 📝 Referans

Bu proje [Xjectro/nextjs-tailwindcss-shadcn-boilerplate](https://github.com/Xjectro/nextjs-tailwindcss-shadcn-boilerplate) yapısı referans alınarak oluşturulmuştur.

---

## 📄 Lisans

MIT © 2024
