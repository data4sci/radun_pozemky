# Pozemky Raduň - Web pro prodej pozemků

# Pozemky Raduň - Web pro prodej pozemků

Statický vícejazyčný web pro prodej stavebních pozemků v Raduni.

## Technologie

- **Framework:** Astro 5.x (SSG - Static Site Generator)
- **Styling:** Tailwind CSS 3.4.x
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
│       ├── global.yaml         # Konfigurace webu, hero text
│       ├── translations.yaml   # Překlady UI prvků
│       └── contacts.yaml       # Kontaktní informace
│
├── public/                     # Statické soubory
│   ├── favicon.svg
│   ├── robots.txt
│   ├── llms.txt                # Konfigurace pro AI vyhledávače
│   └── images/
│       ├── map/                # Mapa pozemků
│       └── plots/              # Galerie obrázků (složka pro každý pozemek)
│
├── src/
│   ├── components/             # Astro komponenty
│   │   ├── Layout.astro        # Hlavní layout wrapper
│   │   ├── Header.astro        # Sticky header s navigací
│   │   ├── Footer.astro        # Patička
│   │   ├── HeroSection.astro   # Hero sekce s CTA
│   │   ├── OfferCard.astro     # Karta nabídky pozemku
│   │   ├── ImageGallery.astro  # Galerie s lightboxem
│   │   ├── ContactBox.astro    # Kontaktní informace
│   │   ├── LanguageSwitcher.astro  # Přepínač jazyků
│   │   ├── ThemeToggle.astro   # Přepínač světlý/tmavý režim
│   │   ├── Head.astro          # SEO meta tagy
│   │   ├── Button.astro        # Tlačítko
│   │   ├── Badge.astro         # Stavové štítky
│   │   ├── Section.astro       # Obalová sekce
│   │   └── FeatureItem.astro   # Položka vlastností pozemku
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
│       └── offers.ts           # Načítání a filtrování nabídek
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions pro deployment
│
├── astro.config.mjs            # Konfigurace Astro
├── tailwind.config.mjs         # Konfigurace Tailwind CSS
├── tsconfig.json               # Konfigurace TypeScript
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
  cs: Popis pozemku v češtině...
  en: Plot description in English...
  pl: Opis działki po polsku...
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

| Stav        | Hodnota `status` | Popis                                          |
| ----------- | ---------------- | ---------------------------------------------- |
| Aktivní     | `active`         | Běžná nabídka k prodeji                        |
| Sleva       | `discounted`     | Zlevněná nabídka (nastavte `discount`)         |
| Rezervováno | `reserved`       | Pozemek je rezervován                          |
| Prodáno     | `inactive`       | Pozemek byl prodán nebo jako DRAFT (nezobrazuje se v seznamu)  |

## Funkce

### Internacionalizace (i18n)

- 3 jazykové mutace (CS/EN/PL)
- Dynamické URL routing: `/cs/`, `/en/`, `/pl/`
- Dynamické směrování URL: `/cs/`, `/en/`, `/pl/`
- Přepínač jazyků v hlavičce
- Formátování cen podle jazyka

### Galerie obrázků

- Lightbox modal s klávesovou navigací
  - Šipky pro navigaci mezi obrázky
  - Escape pro zavření
- Kliknutí na hlavní obrázek pro zvětšení
- Thumbnail grid pro rychlý náhled
- Počítadlo obrázků

### Témata

- Světlý/tmavý režim
- Persistence nastavení v localStorage
- Ukládání nastavení do localStorage (persistence)
- Vlastní barevná paleta (zelená/oranžová)

### SEO & Přístupnost

- Meta tagy pro každou jazykovou verzi
- Automatická generace sitemap
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

## Deployment na GitHub Pages

1. Vytvořte GitHub repozitář
2. Push kódu do `main` branch
3. V Settings → Pages → Source: GitHub Actions
4. GitHub Actions automaticky nasadí web

### CI/CD Pipeline

1. **Trigger:** Push do main branch nebo manuální spuštění
2. **Build:** Node.js 20, `npm ci`, `npm run build`
3. **Deploy:** Automatické nasazení na GitHub Pages

## Konfigurace

### astro.config.mjs

- Site URL: `https://pozemky-radun.cz`
- Trailing slashes: zapnuto
- Integrace: Tailwind, Sitemap (s i18n)

### tailwind.config.mjs

- Dark mode: class-based
- Vlastní barvy (primary, accent)
- Custom animace (fadeIn, slideUp)
- Rozšířené stíny (soft, soft-lg)

## Utility funkce

### i18n.ts

- `loadTranslations()` - Načtení překladů
- `loadGlobalConfig()` - Načtení konfigurace webu
- `loadContacts()` - Načtení kontaktů
- `t(key, lang)` - Překlad klíče
- `formatPrice(price, lang)` - Formátování ceny

### offers.ts

- `loadOffers()` - Načtení všech nabídek (s cachí)
- `getActiveOffers()` - Filtrování aktivních nabídek
- `getAllOffers()` - Všechny nabídky včetně prodaných
- `getOfferBySlug(slug, lang)` - Vyhledání podle URL slug
- `getOfferById(id)` - Vyhledání podle ID

## Licence

Soukromý projekt - Všechna práva vyhrazena
