# AURA Fine Jewellery - Premium Luxury E-Commerce Frontend

A complete, production-ready premium luxury jewellery e-commerce frontend built using React 19, Vite, TypeScript, Tailwind CSS v4, and Framer Motion. 

This project operates as a headless frontend designed to connect to the Shopify Storefront API. Shopify handles the core back-office services (products, inventory, collections, orders, cart updates, and customers) while this repository provides a high-fidelity, high-contrast visual canvas.

---

## 💎 Design System & Aesthetic Tokens

- **Palette:** High-contrast luxury canvas matching Alabaster Cream backgrounds (`#F7F5F0`), Obsidian Caviar text (`#0D0D0D`), and Satin Champagne Gold accents (`#D4AF37`).
- **Typography:** Elegant serif headings utilizing Google Fonts **Cormorant Garamond** paired with clean sans-serif UI typography using **Inter**.
- **Aesthetics:** Generous whitespace, thin gold-tinted dividers, glassmorphism overlays, custom scrollbars, and smooth Lenis deceleration curves.
- **Animations:** Magnetic button actions, dual product-card hover zooms, fullscreen overlays, and exit route fade transitions.

---

## 🛠 Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (Rust compiler plugin `@tailwindcss/vite`)
- **Smooth Scroll:** Lenis Smooth Scroll
- **Animations:** Framer Motion (centralized reusable variants)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **Utility:** clsx + tailwind-merge

---

## 📂 Project Structure

```
JewelleryStore/
├── frontend/                 # React 19 application
│   ├── src/
│   │   ├── app/              # Page views & Routing bootstrapper
│   │   ├── components/       # Component directory (ui, layout, sections, common)
│   │   ├── providers/        # Context Providers tree (Theme, Cart, Wishlist, Search, Toast, Lenis, A11y)
│   │   ├── lib/              # Shopify client Abstraction Layer
│   │   ├── config/           # Feature flags and tokens configurations
│   │   ├── content/          # CMS JSONs mapping homepage sections & navigation
│   │   ├── animations/       # Framer Motion animation presets
│   │   └── utils/            # General helpers (currency, date, storage, seo)
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
│
├── integrations/             # Shopify storefront query reference templates
│   └── shopify/
│
└── docs/                     # Guides and developer docs
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Navigate to the frontend folder and download the packages:
```bash
cd JewelleryStore/frontend
npm install
```

### 2. Startup Dev Server
To start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Connect a Production Shopify Store
To swap from local Mock data to your live inventory, add your keys to `frontend/.env`:
```env
VITE_SHOPIFY_DOMAIN=your-store-name.myshopify.com
VITE_STOREFRONT_TOKEN=your_storefront_access_token
```
The client selector will automatically re-route requests without requiring component alterations.

---

## ♿ Accessibility & Performance SLA

- **Keyboard Navigation:** Includes focus rings (`focus-visible:ring-gold`), escape triggers, focus traps for sliders and drawers, and a "Skip to Content" accessibility link.
- **Motion Controls:** Built-in `AccessibilityProvider` reads browser `prefers-reduced-motion` settings to scale animations off.
- **Core Web Vitals targets:**
  - Lighthouse Score: > 95
  - Cumulative Layout Shift (CLS): < 0.05
  - Largest Contentful Paint (LCP): < 2.0s
  - Interaction to Next Paint (INP): < 200ms
