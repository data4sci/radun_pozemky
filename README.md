# Pozemky Raduň - Web pro prodej pozemků

Statický vícejazyčný web pro prodej stavebních pozemků v Raduni.

## Technologie

- **Framework:** Astro 5.0.0 (SSG - Static Site Generator)
- **Styling:** Tailwind CSS 3.4.0
- **Jazyk:** TypeScript
- **Hosting:** GitHub Pages (CI/CD via GitHub Actions)
- **Jazyky webu:** Čeština (CS), Angličtina (EN), Polština (PL)

## Rychlý start

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build

# Náhled produkčního buildu
npm run preview
```

## Struktura projektu

```
├── content/                    # YAML konfigurační soubory
│   ├── offers/                 # Nabídky pozemků (A-1.yaml, B-1.yaml, ...)
│   └── site/                   # Globální nastavení
│       ├── global.yaml         # Konfigurace webu, hero text, mapa
│       ├── translations.yaml   # Překlady UI prvků
│       └── contacts.yaml       # Kontaktní informace
│
├── public/                     # Statické soubory
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt                # Konfigurace pro AI vyhledávače
│   ├── .nojekyll               # Vypnutí Jekyll na GitHub Pages
│   └── images/
│       ├── map/                # Mapa pozemků (map.png)
│       └── plots/              # Galerie obrázků (složka pro každý pozemek)
│
├── src/
│   ├── components/             # Astro komponenty
│   │   ├── Layout.astro        # Hlavní layout wrapper
│   │   ├── Header.astro        # Sticky header s navigací
│   │   ├── Footer.astro        # Patička
│   │   ├── Head.astro          # SEO meta tagy a hreflang
│   │   ├── HeroSection.astro   # Hero sekce s CTA
│   │   ├── OfferCard.astro     # Karta nabídky pozemku
│   │   ├── ImageGallery.astro  # Galerie s lightboxem
│   │   ├── ContactBox.astro    # Kontaktní informace
│   │   ├── LanguageSwitcher.astro  # Přepínač jazyků
│   │   ├── ThemeToggle.astro   # Přepínač světlý/tmavý režim
│   │   ├── Button.astro        # Tlačítko (varianty: primary, accent, secondary, ghost)
│   │   ├── Badge.astro         # Stavové štítky (sleva, rezervováno, prodáno)
│   │   ├── Section.astro       # Obalová sekce
│   │   └── FeatureItem.astro   # Položka vlastností pozemku s ikonou
│   │
│   ├── pages/                  # Stránky (routes)
│   │   ├── index.astro         # Redirect na /cs/
│   │   ├── cs/
│   │   │   ├── index.astro     # Česká homepage
│   │   │   └── offer/[slug].astro  # Detail pozemku v češtině
│   │   ├── en/
│   │   │   ├── index.astro     # Anglická homepage
│   │   │   └── offer/[slug].astro  # Detail pozemku v angličtině
│   │   └── pl/
│   │       ├── index.astro     # Polská homepage
│   │       └── offer/[slug].astro  # Detail pozemku v polštině
│   │
│   ├── styles/
│   │   └── global.css          # Tailwind setup a custom utility třídy
│   │
│   └── utils/
│       ├── i18n.ts             # Internacionalizace a překlady
│       ├── offers.ts           # Načítání a filtrování nabídek
│       └── markdown.ts         # Převod Markdown na HTML
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions pro deployment
│
├── astro.config.mjs            # Konfigurace Astro
├── tailwind.config.mjs         # Konfigurace Tailwind CSS
├── tsconfig.json               # Konfigurace TypeScript
├── CLAUDE.md                   # Instrukce pro Claude Code
├── AGENTS.md                   # Instrukce pro AI agenty
├── lokalita.md                 # Informace o lokalitě Raduň
└── package.json                # Závislosti a skripty
```

## Správa obsahu

### Struktura nabídky (YAML)

```yaml
id: A-12
status: active | discounted | reserved | inactive
featured: true | false
slug:
  cs: pozemek-a-12
  en: plot-a-12
  pl: dzialka-a-12
size_sqm: 830
price_per_sqm: 4800
price_total: 3984000
discount:
  active: true
  percentage: 20
  old_price_per_sqm: 6000
  old_price_total: 4980000
map_position:
  x: 50
  y: 30
  label: A-12
title:
  cs: Pozemek A-12
  en: Plot A-12
  pl: Działka A-12
description:
  cs: Popis pozemku v češtině... (podporuje Markdown)
  en: Plot description in English... (supports Markdown)
  pl: Opis działki po polsku... (obsługuje Markdown)
features:
  utilities: [electricity, water, sewage, gas]
  access: asphalt | gravel | dirt
  zoning: residential | commercial | mixed
images:
  - /images/plots/A-12/01.jpg
  - /images/plots/A-12/02.jpg
contact: default | secondary
created: 2024-01-01
updated: 2024-01-15
```

### Přidání nové nabídky

1. Vytvořte nový YAML soubor v `content/offers/X-N.yaml`
2. Přidejte obrázky do `public/images/plots/X-N/`
3. Commit a push → automatický deploy

### Změna stavu nabídky

| Stav        | Hodnota `status` | Popis                                                              |
| ----------- | ---------------- | ------------------------------------------------------------------ |
| Aktivní     | `active`         | Běžná nabídka k prodeji                                            |
| Sleva       | `discounted`     | Zlevněná nabídka (vyžaduje nastavení `discount`)                   |
| Rezervováno | `reserved`       | Pozemek je rezervován                                              |
| Neaktivní   | `inactive`       | Pozemek byl prodán nebo draft (nezobrazuje se v seznamu)           |

## Funkce

### Internacionalizace (i18n)

- 3 jazykové mutace (CS/EN/PL)
- Dynamické URL routing: `/cs/`, `/en/`, `/pl/`
- Přepínač jazyků v hlavičce
- Formátování cen podle jazyka (CZK)
- Hreflang meta tagy pro SEO

### Galerie obrázků

- Lightbox modal s overlay
- Klávesová navigace (šipky, Escape)
- Thumbnail grid pro rychlý náhled
- Počítadlo obrázků

### Témata

- Světlý/tmavý režim (class-based)
- Persistence nastavení v localStorage
- Vlastní barevná paleta (zelená/oranžová)

### SEO & Přístupnost

- Meta tagy pro každou jazykovou verzi
- Automatická generace sitemap s i18n
- Sémantické HTML
- LLMs.txt pro AI vyhledávače
- robots.txt

### Stavové štítky

- Sleva (s procentem)
- Rezervováno
- Prodáno
- Barevně odlišené varianty

## URL struktura

```
/                           → Redirect na /cs/
/cs/                        → Česká homepage
/en/                        → Anglická homepage
/pl/                        → Polská homepage
/cs/offer/[slug]/           → Detail v češtině
/en/offer/[slug]/           → Detail v angličtině
/pl/offer/[slug]/           → Detail v polštině
```

## Deployment

### GitHub Pages

1. Push kódu do `main` branch
2. GitHub Actions automaticky nasadí web
3. Web dostupný na <https://radun-pozemky.cz>
4.

### CI/CD Pipeline

1. **Trigger:** Push do main branch nebo manuální spuštění
2. **Build:** Node.js 20, `npm ci`, `npm run build`
3. **Deploy:** Automatické nasazení na GitHub Pages

## Konfigurace

### astro.config.mjs

- Site URL: `https://radun-pozemky.cz`
- Trailing slashes: zapnuto
- Output: static
- Integrace: Tailwind, Sitemap (s i18n)

### tailwind.config.mjs

- Dark mode: class-based
- Vlastní barvy: primary (zelená), accent (oranžová)
- Custom animace: fadeIn, slideUp
- Custom stíny: soft, soft-lg
- Font: Inter

### tsconfig.json

- Path alias: `@/*` → `src/*`

## Utility funkce

### i18n.ts

- `loadTranslations()` - Načtení překladů (s cache)
- `loadGlobalConfig()` - Načtení konfigurace webu
- `loadContacts()` - Načtení kontaktů
- `t(key, lang)` - Překlad klíče (dot notation)
- `formatPrice(price, lang)` - Formátování ceny
- `getAlternateUrls()` - Alternativní URL pro jazyky

### offers.ts

- `loadOffers()` - Načtení všech nabídek (s cache)
- `getActiveOffers()` - Aktivní nabídky (active, discounted, reserved)
- `getAllOffers()` - Všechny nabídky včetně neaktivních
- `getOfferBySlug(slug, lang)` - Vyhledání podle URL slug
- `getOfferById(id)` - Vyhledání podle ID

### markdown.ts

- `renderMarkdown(text)` - Převod Markdown na HTML (GFM)

## Aktuální nabídky

| ID   | Status     | Rozloha | Cena         |
| ---- | ---------- | ------- | ------------ |
| A-1  | inactive   | 850 m²  | 2 125 000 Kč |
| A-12 | discounted | 830 m²  | 3 984 000 Kč |
| B-1  | reserved   | 570 m²  | 2 850 000 Kč |
| B-2  | reserved   | 570 m²  | 2 850 000 Kč |

## Licence

Soukromý projekt - Všechna práva vyhrazena
