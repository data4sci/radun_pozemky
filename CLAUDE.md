# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Production build → /dist
npm run preview  # Preview production build locally
```

## Project Overview

Real estate listing website for land plots in Raduň, Czech Republic. Built with **Astro 5.0.0** (static site generation), **Tailwind CSS 3.4.0**, and **TypeScript**. Deployed to GitHub Pages via GitHub Actions on push to `main`.

**Live site:** <https://radun-pozemky.cz>

## Architecture

### Content-Driven Design

All property data lives in YAML files, not a database:

- `/content/offers/*.yaml` - Individual property listings (A-1, A-12, B-1, B-2)
- `/content/site/global.yaml` - Site config, hero text, map settings
- `/content/site/translations.yaml` - UI strings in all languages
- `/content/site/contacts.yaml` - Contact information

### Internationalization (i18n)

Three parallel language routes: `/cs/`, `/en/`, `/pl/`

- Each property has language-specific slugs in its YAML
- Translation keys use dot notation (e.g., `nav.home`, `offer.price`)
- `src/utils/i18n.ts` handles translation loading and URL helpers
- `src/utils/offers.ts` manages property data with in-memory caching
- Price formatting adapts to language locale

### Page Structure

- `/src/pages/index.astro` - Root redirect to `/cs/`
- `/src/pages/[lang]/index.astro` - Homepage per language
- `/src/pages/[lang]/offer/[slug].astro` - Property detail (dynamic route)

### Key Components

| Component | Purpose |
|-----------|---------|
| `Layout.astro` | Main wrapper with header, footer, SEO meta |
| `Header.astro` | Sticky header with navigation, mobile menu |
| `Footer.astro` | Footer with links and contact info |
| `Head.astro` | SEO tags, hreflang links, Open Graph |
| `HeroSection.astro` | Hero banner with CTA buttons |
| `OfferCard.astro` | Property card with image, price, status badge |
| `ImageGallery.astro` | Lightbox gallery with keyboard navigation |
| `ContactBox.astro` | Contact information display |
| `LanguageSwitcher.astro` | Language dropdown (CS/EN/PL) |
| `ThemeToggle.astro` | Dark/light mode toggle |
| `Button.astro` | Reusable button (primary/accent/secondary/ghost) |
| `Badge.astro` | Status badges (discount/reserved/sold/available) |
| `Section.astro` | Section container with theming options |
| `FeatureItem.astro` | Feature item with icon |

### Utility Functions

**i18n.ts:**

- `loadTranslations()` / `loadGlobalConfig()` / `loadContacts()` - YAML loaders with cache
- `t(key, lang)` - Translation lookup with dot notation
- `formatPrice(price, lang)` - Locale-aware price formatting
- `getAlternateUrls()` - Generate hreflang URLs

**offers.ts:**

- `loadOffers()` - Load all offers from YAML files (cached)
- `getActiveOffers()` - Filter: active, discounted, reserved
- `getAllOffers()` - Include inactive offers
- `getOfferBySlug(slug, lang)` / `getOfferById(id)` - Lookup functions

**markdown.ts:**

- `renderMarkdown(text)` - Convert Markdown to HTML using `marked` (GFM enabled)

## Property YAML Structure

```yaml
id: "A-12"
status: active|discounted|reserved|inactive
featured: true|false
slug:
  cs: "pozemek-a-12"
  en: "plot-a-12"
  pl: "dzialka-a-12"
size_sqm: 830
price_per_sqm: 4800
price_total: 3984000
discount:
  active: true
  percentage: 4
  old_price_per_sqm: 5000
  old_price_total: 4150000
map_position:
  x: 150
  y: 200
  label: "A-12"
title:
  cs: "Pozemek A-12"
  en: "Plot A-12"
  pl: "Działka A-12"
description:
  cs: "Markdown popis..."
  en: "Markdown description..."
  pl: "Opis w Markdown..."
features:
  utilities: [electricity, water, sewage, gas]
  access: asphalt|gravel|dirt
  zoning: residential|commercial|mixed
images:
  - /images/plots/A-12/12-1.jpg
  - /images/plots/A-12/12-2.jpg
contact: default|secondary
created: 2025-01-19
updated: 2025-01-19
```

## Adding a New Property

1. Create `/content/offers/X-N.yaml` following the structure above
2. Add images to `/public/images/plots/X-N/`
3. Commit and push to `main` (auto-deploys via GitHub Actions)

## Modifying Translations

Edit `/content/site/translations.yaml`. Key sections:

- `nav` - Navigation labels
- `status` - Property status labels
- `offer` - Property detail labels
- `features` - Utility/access/zoning translations
- `general` - Common UI strings
- `trust` - Trust indicators on homepage
- `detail` - Detail page specific strings
- `footer` - Footer content

## Tailwind Configuration

Custom theme in `tailwind.config.mjs`:

- **Dark mode:** class-based toggle (persisted in localStorage)
- **Primary color:** green palette (#16a34a)
- **Accent color:** orange palette (#f97316)
- **Custom shadows:** `soft`, `soft-lg`
- **Custom animations:** `fade-in`, `slide-up`
- **Font:** Inter (400-800 weights)

## Custom CSS Classes

Defined in `/src/styles/global.css`:

**Containers:** `.container-narrow`, `.container-wide`

**Buttons:** `.btn`, `.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-ghost`, `.btn-sm`, `.btn-lg`

**Cards:** `.card`, `.card-hover`, `.card-interactive`

**Badges:** `.badge`, `.badge-discount`, `.badge-reserved`, `.badge-sold`, `.badge-available`

**Sections:** `.section`, `.section-sm`, `.section-lg`

**Utilities:** `.text-gradient`, `.text-muted`, `.text-balance`, `.divider`, `.focus-ring`

## Path Alias

`@/*` maps to `src/*` (configured in tsconfig.json)

## Current Properties

| ID   | Status     | Size   | Price        |
|------|------------|--------|--------------|
| A-1  | inactive   | 850 m² | 2,125,000 Kč |
| A-12 | discounted | 830 m² | 3,984,000 Kč |
| B-1  | reserved   | 570 m² | 2,850,000 Kč |
| B-2  | reserved   | 570 m² | 2,850,000 Kč |

## Common Tasks

### Change property status

Edit the `status` field in the property's YAML file.

### Add discount to property

Set `status: discounted` and fill in the `discount` block with `active: true`, `percentage`, `old_price_per_sqm`, and `old_price_total`.

### Update site hero text

Edit `/content/site/global.yaml` under `site.hero_claim` (supports Markdown).

### Add new translation

Add the key to `/content/site/translations.yaml` under all three language sections.

### Update contact info

Edit `/content/site/contacts.yaml`.
