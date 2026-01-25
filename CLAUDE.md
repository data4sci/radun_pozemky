# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Production build → /dist
npm run preview  # Preview production build locally
```

## Project Overview

Real estate listing website for land plots. Built with **Astro 5** (static site generation), **Tailwind CSS**, and **TypeScript**. Deployed to GitHub Pages via GitHub Actions on push to `main`.

## Architecture

### Content-Driven Design

All property data lives in YAML files, not a database:

- `/content/offers/*.yaml` - Individual property listings (A-1, A-12, B-1, etc.)
- `/content/site/global.yaml` - Site config, hero text, map settings
- `/content/site/translations.yaml` - UI strings in all languages
- `/content/site/contacts.yaml` - Contact information

### Internationalization (i18n)

Three parallel language routes: `/cs/`, `/en/`, `/pl/`

- Each property has language-specific slugs in its YAML
- Translation keys use dot notation (e.g., `nav.home`, `offer.price`)
- `src/utils/i18n.ts` handles translation loading and URL helpers
- `src/utils/offers.ts` manages property data with in-memory caching

### Page Structure

- `/src/pages/[lang]/index.astro` - Homepage per language
- `/src/pages/[lang]/offer/[slug].astro` - Property detail (dynamic route)
- `/src/pages/index.astro` - Root redirect to `/cs/`

### Key Components

- `Layout.astro` - Main wrapper with header, footer, SEO meta
- `OfferCard.astro` - Property card with image, price, status badge
- `ImageGallery.astro` - Lightbox gallery with keyboard navigation
- `Head.astro` - SEO tags and hreflang links

## Property YAML Structure

```yaml
id: "A-12"
status: active|discounted|reserved|inactive
slug: { cs: "...", en: "...", pl: "..." }
size_sqm: 1200
price_per_sqm: 2500
price_total: 3000000
discount:
  active: true
  percentage: 10
  old_price_per_sqm: 2750
  old_price_total: 3300000
title: { cs: "...", en: "...", pl: "..." }
description: { cs: "...", en: "...", pl: "..." }
features:
  utilities: [electricity, water, sewage]
  access: asphalt
  zoning: residential
images: ["/images/plots/A-12/1.jpg", ...]
```

## Adding a New Property

1. Create `/content/offers/X-N.yaml` following the structure above
2. Add images to `/public/images/plots/X-N/`
3. Commit and push to `main` (auto-deploys via GitHub Actions)

## Tailwind Configuration

Custom theme in `tailwind.config.mjs`:

- Dark mode: class-based toggle (persisted in localStorage)
- Primary color: green palette
- Accent color: orange palette
- Custom animations: `fade-in`, `slide-up`

## Path Alias

`@/*` maps to `src/*` (configured in tsconfig.json)
