# Product Requirements Document (PRD)

## Web „Pozemky Raduň" - radun-pozemky.cz

**Verze:** 3.0 (Implementováno)
**Datum:** 31.01.2026
**Doména:** radun-pozemky.cz
**Status:** ✅ MVP Implementováno a nasazeno

---

## 1. Executive Summary

### 1.1 Kontext a účel

Jednoduchý, **čistě statický**, vícejazyčný web pro prodej jednotek až desítek pozemků v obci Raduň. Důraz na transparentnost, profesionalitu a snadné sdílení jednotlivých nabídek prostřednictvím persistentních URL.

### 1.2 Hlavní cíle

- **Transparentní prezentace** omezeného počtu pozemků (max. desítky nabídek)
- **Snadná správa** prostřednictvím konfiguračních souborů (YAML)
- **3 jazykové mutace** (CZ jako výchozí, EN, PL)
- **Persistentní URL** pro každou nabídku umožňující snadné sdílení
- **Oddělení kódu a obsahu** - veškeré texty a data v konfiguračních souborech

### 1.3 Technické řešení (Implementováno)

- **Hosting:** GitHub Pages
- **Framework:** Astro 5.0.0 (Static Site Generator)
- **Styling:** Tailwind CSS 3.4.0
- **Jazyk:** TypeScript
- **CI/CD:** GitHub Actions (automatický deploy na push do main)

---

## 2. Cílové skupiny

### 2.1 Primární - Kupující pozemků

- **Fyzické osoby** hledající stavební pozemek v Raduni a okolí Opavy
- **Očekávání:** jasné informace o velikosti, ceně, dostupnosti, fotografie, poloha na mapě
- **Věk:** 25-55 let
- **Lokace:** ČR (primárně Moravskoslezský kraj), Polsko (příhraniční oblasti)

### 2.2 Sekundární - Realitní makléři/zprostředkovatelé

- **Potřebují:** přehledné URL jednotlivých nabídek pro sdílení s klienty
- **Očekávání:** profesionální vzhled, rychlé načítání, důvěryhodné informace

### 2.3 Terciární - AI asistenti a vyhledávače

- **Vyhledávače:** Google, Seznam, Bing
- **LLM modely:** ChatGPT, Claude, Gemini - využití LLMs.txt
- **Strukturovaná data** pro snadnou indexaci

---

## 3. Scope definice

### 3.1 IN SCOPE (Implementováno)

#### Struktura a obsah

- ✅ **Hlavní stránka** s kompletním přehledem:
  - Hero sekce s názvem a hlavním claimem
  - **Statický obrázek mapy** oblasti s ručně označenými pozemky (s lightboxem)
  - **Sekce o obci Raduň** (s Markdown podporou)
  - Grid všech nabídek s kartami
  - Trust indicators (klid, sítě, transparentnost)
  - Kontaktní sekce
  - Patička s odkazy

- ✅ **Detailní stránky nabídek:**
  - Vlastní persistentní URL pro každou nabídku
  - Kompletní informace o pozemku
  - Fotogalerie s lightboxem a klávesovou navigací
  - Kontaktní údaje
  - Odkaz na další nabídky

#### Technické vlastnosti

- ✅ **3 jazykové mutace** (CZ/EN/PL) s přepínačem
- ✅ **Světlý a tmavý režim** (class-based + localStorage persistence)
- ✅ **Konfigurační soubory** (YAML):
  - `content/offers/*.yaml` - nabídky pozemků
  - `content/site/global.yaml` - texty a nastavení
  - `content/site/translations.yaml` - překlady UI
  - `content/site/contacts.yaml` - kontakty
- ✅ **Markdown podpora** v popisech (GFM)

#### Stavy nabídek

- ✅ **active** - standardní aktivní nabídka
- ✅ **discounted** - aktivní se slevou (zobrazení původní i nové ceny)
- ✅ **reserved** - rezervováno (viditelné označení)
- ✅ **inactive** - neaktivní (skryté v seznamu, URL stále funkční)

#### SEO a AI optimalizace

- ✅ Meta tagy a Open Graph protokol
- ✅ Hreflang tagy pro jazykové verze
- ✅ `robots.txt` a automatický `sitemap.xml`
- ✅ `LLMs.txt` soubor

### 3.2 OUT OF SCOPE

- ❌ Administrátorský backend/CMS
- ❌ Interaktivní mapa (pouze statický obrázek)
- ❌ Online rezervační systém
- ❌ Kontaktní formulář (pouze zobrazení kontaktů)
- ❌ Integrace s realitními portály
- ❌ Uživatelské účty nebo přihlašování
- ❌ Platební brána
- ❌ JSON-LD strukturovaná data (budoucí vylepšení)

---

## 4. Detailní funkční specifikace

### 4.1 Struktura URL (Implementováno)

**Základní routing:**

```
/ → přesměrování na /cs/
/cs/ → česká domovská stránka
/en/ → anglická domovská stránka
/pl/ → polská domovská stránka

/cs/offer/[slug]/ → detail nabídky v češtině
/en/offer/[slug]/ → detail nabídky v angličtině
/pl/offer/[slug]/ → detail nabídky v polštině
```

> **Poznámka:** Implementace používá jednotný segment `/offer/` pro všechny jazyky místo původně plánovaných `/nabidka/`, `/offer/`, `/oferta/`. Toto zjednodušuje routing a údržbu.

### 4.2 Domovská stránka - sekce

1. **Hero sekce**
   - Název: „Pozemky Raduň" + lokalizovaný claim
   - CTA tlačítka: „Prohlédnout nabídku" a „Kontaktovat"

2. **Mapa oblasti**
   - Statický obrázek mapy s vyznačenými pozemky
   - Lightbox pro zvětšení

3. **O obci Raduň**
   - Text o obci s Markdown podporou
   - Klíčové informace: vzdálenost od Opavy/Ostravy, občanská vybavenost

4. **Seznam nabídek**
   - Grid karet (responsive: 1 sloupec mobil, 2-3 tablet/desktop)
   - Každá karta obsahuje:
     - Náhledový obrázek
     - ID/název pozemku
     - Velikost v m²
     - Cena (celková + za m²)
     - Vizuální badge pro stav (SLEVA/REZERVOVÁNO)
     - CTA: „Zobrazit detail"

5. **Trust indicators**
   - Klidná lokalita
   - Kompletní sítě
   - Transparentní ceny

6. **Kontakt**
   - Jméno/společnost
   - Telefon (klikatelný)
   - Email

7. **Patička**
   - Copyright
   - Navigační odkazy
   - Kontaktní email

### 4.3 Detail nabídky - struktura

- **Navigace zpět** („← Zpět na nabídku")
- **Název/ID** pozemku
- **Stavový badge** (pokud je sleva/rezervace)
- **Fotogalerie** s lightboxem a klávesovou navigací
- **Popis** (Markdown)
- **Summary grid:**
  - Velikost: X m²
  - Cena za m²: Y Kč
  - Celková cena: Z Kč
  - Při slevě: ~~původní cena~~ **nová cena** (-X%)
- **Technické parametry** (features):
  - Inženýrské sítě (elektřina, voda, kanalizace, plyn)
  - Přístup (asfalt/štěrk/polní cesta)
  - Územní plán (obytná/komerční/smíšená)
- **Kontaktní box**
- **Sekce „Další nabídky"**

### 4.4 Stavová logika UI

| Stav | Karta v seznamu | Detail | Chování |
|------|-----------------|--------|---------|
| `active` | Standardní vzhled | Plně funkční | Normální zobrazení |
| `discounted` | Badge „SLEVA -X%", zvýrazněná cena | Přeškrtnutá původní cena | Výrazné označení slevy |
| `reserved` | Badge „REZERVOVÁNO" | Info o rezervaci | Stále přístupné, ale označené |
| `inactive` | Skryté v seznamu | Varování „není aktivní" | URL funguje, ale jasné označení |

---

## 5. Konfigurace a datové modely

### 5.1 Struktura konfiguračních souborů

```
content/
├── offers/                # Jednotlivé nabídky
│   ├── A-1.yaml
│   ├── A-12.yaml
│   ├── B-1.yaml
│   └── B-2.yaml
└── site/
    ├── global.yaml        # Globální nastavení
    ├── contacts.yaml      # Kontakty
    └── translations.yaml  # UI překlady
```

### 5.2 Datový model nabídky (Implementovaný)

**content/offers/A-12.yaml:**

```yaml
# Identifikace a stav
id: A-12
status: discounted  # active | discounted | reserved | inactive
featured: true

# URL slugs pro každý jazyk
slug:
  cs: pozemek-a-12-radun
  en: plot-a-12-radun
  pl: dzialka-a-12-radun

# Velikost a ceny
size_sqm: 830
price_per_sqm: 4800
price_total: 3984000

# Sleva (pokud status: discounted)
discount:
  active: true
  percentage: 4
  old_price_per_sqm: 5000
  old_price_total: 4150000

# Pozice na statické mapě
map_position:
  x: 150
  y: 200
  label: "A-12"

# Lokalizované texty
title:
  cs: Pozemek A-12
  en: Plot A-12
  pl: Działka A-12

description:
  cs: |
    Stavební pozemek o rozloze 830 m² v klidné části obce Raduň.
    [Více informací](https://example.com)
  en: |
    Building plot of 830 m² in a quiet part of Raduň village.
  pl: |
    Działka budowlana o powierzchni 830 m² w spokojnej części wsi Raduň.

# Technické parametry
features:
  utilities:
    - electricity
    - water
    - sewage
  access: asphalt  # asphalt | gravel | dirt
  zoning: residential  # residential | commercial | mixed

# Fotografie
images:
  - /images/plots/A-12/12-1.jpg
  - /images/plots/A-12/12-2.jpg
  - /images/plots/A-12/12-3.png

# Reference na kontakt
contact: default

# Metadata
created: 2025-01-19
updated: 2025-01-19
```

### 5.3 Aktuální nabídky

| ID   | Status     | Rozloha | Cena         | Featured |
|------|------------|---------|--------------|----------|
| A-1  | inactive   | 850 m²  | 2,125,000 Kč | Ne       |
| A-12 | discounted | 830 m²  | 3,984,000 Kč | Ano      |
| B-1  | reserved   | 570 m²  | 2,850,000 Kč | Ne       |
| B-2  | reserved   | 570 m²  | 2,850,000 Kč | Ne       |

### 5.4 Globální konfigurace

**content/site/global.yaml:**

```yaml
site:
  url: https://radun-pozemky.cz
  default_language: cs
  languages:
    - cs
    - en
    - pl
  title:
    cs: Pozemky Raduň - Stavební parcely na prodej
    en: Raduň Plots - Building Land for Sale
    pl: Działki Raduň - Działki budowlane na sprzedaż
  hero_claim:
    cs: Váš vysněný domov začíná zde
    en: Your dream home starts here
    pl: Twój wymarzony dom zaczyna się tutaj
  about_radun:
    cs: |
      Obec Raduň leží v malebné krajině...
    # ... lokalizované texty

map:
  image: /images/map/map.png
  alt:
    cs: Mapa pozemků v Raduni
    en: Map of plots in Raduň
    pl: Mapa działek w Raduniu
  width: 1200
  height: 800

settings:
  show_inactive_in_list: false
  enable_dark_mode: true
  currency: CZK
  date_format: DD.MM.YYYY
```

**content/site/contacts.yaml:**

```yaml
contacts:
  default:
    name: Pozemky Raduň
    company: ""
    role:
      cs: Prodej pozemků
      en: Land Sales
      pl: Sprzedaż działek
    phone: "+420 734 330 489"
    email: info@radun-pozemky.cz
```

### 5.5 Překlady UI

**content/site/translations.yaml** obsahuje sekce:

- `nav` - Navigace
- `status` - Stavy nabídek
- `offer` - Detaily nabídky
- `features` - Technické parametry
- `general` - Obecné texty
- `trust` - Trust indicators
- `detail` - Stránka detailu
- `footer` - Patička

---

## 6. Technická architektura (Implementovaná)

### 6.1 Technology Stack

```
Framework: Astro 5.0.0 (SSG - Static Site Generator)
- Islands architecture - JS pouze kde je potřeba
- Výborná podpora YAML souborů
- Build-time rendering = excelentní SEO
- Čistý statický výstup (HTML/CSS/JS)

Styling: Tailwind CSS 3.4.0
- Dark mode: class-based
- Utility-first design system
- Optimalizovaný output (purge unused styles)
- Vlastní barvy: primary (zelená), accent (oranžová)

Markdown: marked 17.0.1
- GitHub Flavored Markdown (GFM)
- Podpora odkazů v popisech

Konfigurace: YAML (js-yaml 4.1.0)
- Snadná editace
- In-memory caching při buildu

Build: npm
Build příkaz: npm run build
Dev server: npm run dev
Output: dist/ složka
```

### 6.2 Struktura projektu

```
radun_pozemky/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Redirect na /cs/
│   │   ├── cs/
│   │   │   ├── index.astro          # Homepage CZ
│   │   │   └── offer/[slug].astro   # Detail CZ
│   │   ├── en/
│   │   │   ├── index.astro          # Homepage EN
│   │   │   └── offer/[slug].astro   # Detail EN
│   │   └── pl/
│   │       ├── index.astro          # Homepage PL
│   │       └── offer/[slug].astro   # Detail PL
│   ├── components/
│   │   ├── Layout.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Head.astro
│   │   ├── HeroSection.astro
│   │   ├── OfferCard.astro
│   │   ├── ImageGallery.astro
│   │   ├── ContactBox.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── ThemeToggle.astro
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   ├── Section.astro
│   │   └── FeatureItem.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── i18n.ts
│       ├── offers.ts
│       └── markdown.ts
├── content/
│   ├── offers/
│   │   ├── A-1.yaml
│   │   ├── A-12.yaml
│   │   ├── B-1.yaml
│   │   └── B-2.yaml
│   └── site/
│       ├── global.yaml
│       ├── contacts.yaml
│       └── translations.yaml
├── public/
│   ├── images/
│   │   ├── map/map.png
│   │   └── plots/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt
│   └── .nojekyll
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── CLAUDE.md
├── AGENTS.md
├── README.md
└── specs/PRD.md
```

### 6.3 Konfigurace

**astro.config.mjs:**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://radun-pozemky.cz',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: {
          cs: 'cs-CZ',
          en: 'en-US',
          pl: 'pl-PL',
        }
      }
    })
  ],
  output: 'static',
  build: {
    format: 'directory'
  }
});
```

**tailwind.config.mjs:**

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          // ... green palette 50-900
        },
        accent: {
          DEFAULT: '#f97316',
          // ... orange palette
        }
      },
      boxShadow: {
        soft: '...',
        'soft-lg': '...'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out'
      }
    }
  }
};
```

### 6.4 Deployment

**GitHub Actions (.github/workflows/deploy.yml):**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## 7. Utility funkce

### 7.1 i18n.ts

```typescript
export const languages = ['cs', 'en', 'pl'] as const;
export type Language = 'cs' | 'en' | 'pl';
export const defaultLang: Language = 'cs';

// Funkce
getLangFromUrl(url: URL): Language
loadTranslations(): Record<string, any>  // s cache
loadGlobalConfig(): Record<string, any>  // s cache
loadContacts(): Record<string, any>      // s cache
t(key: string, lang: Language): string
formatPrice(price: number, lang: Language): string
getAlternateUrls(currentPath, currentLang, offerSlugs?): Record<Language, string>
```

### 7.2 offers.ts

```typescript
export interface Offer {
  id: string;
  status: 'active' | 'discounted' | 'reserved' | 'inactive';
  featured: boolean;
  slug: Record<Language, string>;
  size_sqm: number;
  price_per_sqm: number;
  price_total: number;
  discount: {
    active: boolean;
    percentage: number;
    old_price_per_sqm: number | null;
    old_price_total: number | null;
  };
  // ... další pole
}

// Funkce
loadOffers(): Offer[]           // s cache
getActiveOffers(): Offer[]      // active, discounted, reserved
getAllOffers(): Offer[]         // včetně inactive
getOfferBySlug(slug, lang): Offer | undefined
getOfferById(id): Offer | undefined
```

### 7.3 markdown.ts

```typescript
import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true
});

export function renderMarkdown(text: string): string {
  return marked.parse(text);
}
```

---

## 8. SEO a AI optimalizace

### 8.1 Meta tagy (Head.astro)

- `<title>` - lokalizovaný
- `<meta name="description">` - lokalizovaný
- `<link rel="canonical">` - aktuální URL
- `<link rel="alternate" hreflang="...">` - všechny jazykové verze
- Open Graph tagy (og:title, og:description, og:image, og:type, og:url)

### 8.2 Automatické soubory

- **sitemap.xml** - generovaný @astrojs/sitemap s i18n
- **robots.txt** - manuální
- **llms.txt** - manuální, aktualizovaný

### 8.3 Performance

- Statické pre-renderované stránky
- Tailwind CSS purging
- Lazy loading obrázků
- Minimální JavaScript (pouze pro interaktivitu)

---

## 9. UI/UX

### 9.1 Design principy

- **Seriózní a důvěryhodný** - profesionální vzhled
- **Čistý a minimalistický** - focus na obsah
- **Vysoký kontrast** - snadná čitelnost
- **Responzivní** - mobile-first

### 9.2 Barevné schéma

**Světlý režim:**

- Primary: Zelená (#16a34a)
- Accent: Oranžová (#f97316)
- Text: Tmavá

**Tmavý režim:**

- Primary: Světle zelená
- Pozadí: Tmavě šedá
- Karty: Středně šedá

### 9.3 Komponenty

**Badge varianty:**

- `discount` - oranžová, SLEVA -X%
- `reserved` - žlutá, REZERVOVÁNO
- `sold` - šedá, PRODÁNO
- `available` - zelená, K DISPOZICI

**Button varianty:**

- `primary` - zelené pozadí
- `accent` - oranžové pozadí
- `secondary` - průhledné s okrajem
- `ghost` - pouze text

---

## 10. Správa obsahu

### 10.1 Přidání nové nabídky

1. Vytvořit `/content/offers/X-N.yaml` s kompletní strukturou
2. Přidat obrázky do `/public/images/plots/X-N/`
3. Commit a push do `main`
4. GitHub Actions automaticky nasadí

### 10.2 Změna stavu nabídky

Upravit `status` v YAML souboru:

- `active` → `reserved` - rezervace
- `reserved` → `inactive` - prodáno
- `active` → `discounted` + vyplnit `discount` blok - sleva

### 10.3 Aktualizace textů

- Překlady UI: `/content/site/translations.yaml`
- Hero text: `/content/site/global.yaml`
- Kontakty: `/content/site/contacts.yaml`

---

## 11. Budoucí vylepšení (Post-MVP)

### Fáze 2 (plánováno)

- [ ] JSON-LD strukturovaná data
- [ ] Kontaktní formulář s captchou
- [ ] WhatsApp tlačítko
- [ ] Google Analytics

### Fáze 3 (možná)

- [ ] Interaktivní mapa (Leaflet.js)
- [ ] Virtuální prohlídky (360° foto)
- [ ] PDF generátor nabídek
- [ ] Integrace s realitními portály

---

## 12. Dokumentace

| Soubor | Účel |
|--------|------|
| `README.md` | Dokumentace projektu (česky) |
| `CLAUDE.md` | Instrukce pro Claude Code |
| `AGENTS.md` | Instrukce pro AI agenty |
| `specs/PRD.md` | Product Requirements Document |
| `specs/lokalita.md` | Informace o lokalitě Raduň |
| `public/llms.txt` | Informace pro LLM modely |

---

*Tento PRD dokumentuje implementovaný stav webu radun-pozemky.cz pomocí Astro + Tailwind stacku s důrazem na výkon, SEO a snadnou správu obsahu.*
