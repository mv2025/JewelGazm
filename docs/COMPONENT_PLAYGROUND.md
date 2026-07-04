# AURA Fine Jewellery - Component Design System Guidelines

This document outlines the visual principles and component playground layout guides designed to preserve AURA's luxury aesthetic.

---

## 📐 Spacing & Layout Guidelines

In premium luxury design, spacing must feel **generous, balanced, and intentional**. Avoid crowding elements. 

- **Grid Margins:** Use `container mx-auto px-6 md:px-12 max-w-7xl` to align pages.
- **Section Spacing:** Pad landing blocks using `py-24` or `py-28`.
- **Card Spacing:** Use `gap-x-6 gap-y-12` for product grids, giving each item space to breathe.
- **Text Spacing:** Headings should feature letters spaced out cleanly using `tracking-wide` or `tracking-widest`.
- **Borders:** Implement borders with `border-[0.5px] border-border/80` or `border-border/40`.

---

## 🎨 Color Palette & Variables Reference

Avoid hardcoded hex colors. Utilize tailwind variables mapping to CSS custom properties:

| Visual Token | CSS Variable Class | Hex Equivalent (Light) | Hex Equivalent (Dark) |
|---|---|---|---|
| Primary Caviar | `bg-primary` / `text-primary` | `#0D0D0D` | `#FAFAFA` |
| Champagne Gold | `bg-gold` / `text-gold` | `#D4AF37` | `#C5A880` |
| Soft Alabaster | `bg-background` | `#F7F5F0` | `#0A0A0A` |
| Fine White | `bg-surface` | `#FFFFFF` | `#121212` |
| Soft Border | `border-border` | `#DFDCD6` | `#222222` |

---

## 🧪 Visual Component Playground (Demo Preview Setup)

To test atoms dynamically inside the catalog, you can inspect standard components using the inline layout below:

### 1. Luxury Button Presets
```tsx
import { Button } from '@/components/ui/Button';

// Solitaire detail button
<Button variant="primary" size="md" magnetic>
  Explore Solitaires
</Button>

// Secondary transparent outline
<Button variant="outline" size="sm" magnetic={false}>
  Check Store Sizing
</Button>
```

### 2. Shimmer Skeleton Preview
```tsx
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

// Renders an image grid frame + title/price lines with dynamic shimmering animations
<ProductCardSkeleton />
```

### 3. Visual Responsive Image
```tsx
import { Image } from '@/components/ui/Image';

// Square ratio card layout
<Image 
  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e"
  alt="Celeste Solitaire"
  aspectRatio="square"
/>
```
