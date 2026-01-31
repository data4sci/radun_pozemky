# AGENTS.md

Instructions for AI agents working on this codebase.

## Project Context

This is a multilingual real estate website for selling land plots in Raduň, Czech Republic. The site is built with Astro (static site generator), uses YAML files for content, and supports three languages: Czech, English, and Polish.

## Key Principles

### Content is in YAML, not code
- Property listings: `/content/offers/*.yaml`
- Translations: `/content/site/translations.yaml`
- Site config: `/content/site/global.yaml`
- Contacts: `/content/site/contacts.yaml`

When asked to add/edit content, modify YAML files. When asked to change functionality, modify Astro/TypeScript code.

### Three-language parity
Every user-facing text must exist in all three languages (cs, en, pl). When adding new UI text:
1. Add the translation key to `translations.yaml` with all three language variants
2. Use `t('key.path', lang)` in components

### Static site generation
This is a statically generated site. All pages are pre-rendered at build time. Dynamic data must be loaded at build time from YAML files.

## File Locations

| Task | Location |
|------|----------|
| Add property | `/content/offers/[ID].yaml` |
| Add images | `/public/images/plots/[ID]/` |
| Edit translations | `/content/site/translations.yaml` |
| Edit site config | `/content/site/global.yaml` |
| Edit contacts | `/content/site/contacts.yaml` |
| Add component | `/src/components/[Name].astro` |
| Edit pages | `/src/pages/[lang]/...` |
| Edit styles | `/src/styles/global.css` or Tailwind classes |
| Edit utilities | `/src/utils/` |

## Property Status Values

| Status | Meaning | Displayed |
|--------|---------|-----------|
| `active` | Available for sale | Yes |
| `discounted` | On sale with discount | Yes |
| `reserved` | Reserved by buyer | Yes |
| `inactive` | Sold or draft | No (hidden from listings) |

## Common Operations

### Adding a new property

1. Create `/content/offers/[ID].yaml`:
```yaml
id: "X-1"
status: active
featured: false
slug:
  cs: "pozemek-x-1"
  en: "plot-x-1"
  pl: "dzialka-x-1"
size_sqm: 800
price_per_sqm: 5000
price_total: 4000000
discount:
  active: false
  percentage: 0
  old_price_per_sqm: null
  old_price_total: null
map_position:
  x: 100
  y: 100
  label: "X-1"
title:
  cs: "Pozemek X-1"
  en: "Plot X-1"
  pl: "Działka X-1"
description:
  cs: "Popis v češtině."
  en: "Description in English."
  pl: "Opis po polsku."
features:
  utilities: [electricity, water]
  access: asphalt
  zoning: residential
images:
  - /images/plots/X-1/1.jpg
contact: default
created: 2025-01-31
updated: 2025-01-31
```

2. Add images to `/public/images/plots/X-1/`

### Adding a discount

Set `status: discounted` and configure the discount block:
```yaml
status: discounted
discount:
  active: true
  percentage: 10
  old_price_per_sqm: 5500
  old_price_total: 4400000
```

### Adding a new translation key

Add to `/content/site/translations.yaml`:
```yaml
new_section:
  new_key:
    cs: "Český text"
    en: "English text"
    pl: "Polski tekst"
```

Use in component:
```astro
{t('new_section.new_key', lang)}
```

### Creating a new component

1. Create `/src/components/[Name].astro`
2. Define props interface in frontmatter
3. Use Tailwind CSS for styling
4. Import and use in pages

Example:
```astro
---
interface Props {
  title: string;
  lang: 'cs' | 'en' | 'pl';
}

const { title, lang } = Astro.props;
---

<div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
  <h2 class="text-xl font-semibold">{title}</h2>
</div>
```

## Styling Guidelines

### Use existing design system

**Colors:**
- Primary (green): `text-primary`, `bg-primary`, `border-primary`
- Accent (orange): `text-accent`, `bg-accent`, `border-accent`

**Components:**
- Buttons: `btn btn-primary`, `btn btn-accent`, `btn btn-secondary`
- Cards: `card`, `card-hover`
- Badges: `badge`, `badge-discount`, `badge-reserved`
- Sections: `section`, `section-sm`, `section-lg`

**Dark mode:**
Always include dark mode variants: `dark:bg-gray-800`, `dark:text-white`

### Tailwind classes order
1. Layout (flex, grid, position)
2. Sizing (w-, h-, p-, m-)
3. Typography (text-, font-)
4. Colors (bg-, text-, border-)
5. Effects (shadow, rounded)
6. States (hover:, focus:, dark:)

## Testing Changes

```bash
# Start dev server
npm run dev

# Build for production (catches errors)
npm run build

# Preview production build
npm run preview
```

Always run `npm run build` before committing to catch any build errors.

## Code Patterns

### Loading translations
```typescript
import { t, loadTranslations } from '@/utils/i18n';
const translations = loadTranslations();
const text = t('nav.home', lang);
```

### Loading offers
```typescript
import { getActiveOffers, getOfferBySlug } from '@/utils/offers';
const offers = getActiveOffers();
const offer = getOfferBySlug('pozemek-a-12', 'cs');
```

### Rendering Markdown
```typescript
import { renderMarkdown } from '@/utils/markdown';
const html = renderMarkdown(offer.description[lang]);
```
Use with `set:html` directive:
```astro
<div set:html={renderMarkdown(text)} />
```

### Dynamic routes
Property detail pages use `getStaticPaths()`:
```astro
export async function getStaticPaths() {
  const offers = getAllOffers();
  return offers.map(offer => ({
    params: { slug: offer.slug.cs },
    props: { offer }
  }));
}
```

## Don't

- Don't hardcode text in components - use translations
- Don't add properties directly to code - use YAML files
- Don't forget dark mode styles
- Don't create new CSS files - use Tailwind or global.css
- Don't skip any of the three languages when adding text
- Don't use database or API calls - this is a static site

## Do

- Keep components simple and focused
- Use existing utility functions from `/src/utils/`
- Follow existing naming conventions
- Test in all three languages
- Verify dark mode appearance
- Run build before committing
