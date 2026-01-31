# Product Requirements Document (PRD)

## Web „Pozemky Raduň" - radun-pozemky.cz

**Verze:** 2.0 FINAL  
**Datum:** 14.11.2025  
**Doména:** radun-pozemky.cz

---

## 1. Executive Summary

### 1.1 Kontext a účel

Jednoduchý, **čistě statický**, vícejazyčný web pro prodej jednotek až desítek pozemků v obci Raduň. Důraz na transparentnost, profesionalitu a snadné sdílení jednotlivých nabídek prostřednictvím persistentních URL.

### 1.2 Hlavní cíle

- **Transparentní prezentace** omezeného počtu pozemků (max. desítky nabídek)
- **Snadná správa** prostřednictvím konfiguračních souborů (JSON/YAML)
- **3 jazykové mutace** (CZ jako výchozí, EN, PL)
- **Persistentní URL** pro každou nabídku umožňující snadné sdílení
- **Oddělení kódu a obsahu** - veškeré texty a data v konfiguračních souborech

### 1.3 Technické řešení

- **Hosting:** Netlify / Azure Static Web Apps / GitHub Pages (rozhodnutí později)
- **Technologie:** Čistě statický web (HTML/CSS/JS) generovaný z konfiguračních souborů
- **Build:** Jednoduchý SSG nebo client-side rendering z JSON

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

### 3.1 IN SCOPE (MVP)

#### Struktura a obsah

- **Hlavní stránka** s kompletním přehledem:
  - Hero sekce s názvem a hlavním claimem
  - **Statický obrázek mapy** oblasti s ručně označenými pozemky
  - **Sekce o obci Raduň** (krátký text přímo na hlavní stránce)
  - Grid/seznam všech nabídek s kartami
  - Kontaktní sekce
  - Patička s odkazy

- **Detailní stránky nabídek:**
  - Vlastní persistentní URL pro každou nabídku
  - Kompletní informace o pozemku
  - Fotogalerie
  - Kontaktní údaje

#### Technické vlastnosti

- **3 jazykové mutace** (CZ/EN/PL) s přepínačem
- **Světlý a tmavý režim** (auto-detekce + manuální přepínač)
- **Konfigurační soubory** (JSON/YAML):
  - `data/offers.json` - nabídky pozemků
  - `data/site-content.json` - texty a nastavení
  - `data/translations.json` - překlady UI

#### Stavy nabídek

- **active** - standardní aktivní nabídka
- **discounted** - aktivní se slevou (zobrazení původní i nové ceny)
- **reserved** - rezervováno (viditelné označení)
- **inactive** - neaktivní (šedé nebo skryté v seznamu)

#### SEO a AI optimalizace

- Meta tagy a Open Graph protokol
- Strukturovaná data (JSON-LD)
- `robots.txt` a `sitemap.xml`
- `LLMs.txt` soubor

### 3.2 OUT OF SCOPE (není součástí MVP)

- ❌ Administrátorský backend/CMS
- ❌ Interaktivní mapa (pouze statický obrázek)
- ❌ Online rezervační systém
- ❌ Kontaktní formulář (pouze zobrazení kontaktů)
- ❌ Integrace s realitními portály
- ❌ Uživatelské účty nebo přihlašování
- ❌ Platební brána

---

## 4. Detailní funkční specifikace

### 4.1 Struktura URL

**Základní routing:**

```
/ → přesměrování na /cs/
/cs/ → česká domovská stránka
/en/ → anglická domovská stránka  
/pl/ → polská domovská stránka

/cs/nabidka/[slug] → detail nabídky v češtině
/en/offer/[slug] → detail nabídky v angličtině
/pl/oferta/[slug] → detail nabídky v polštině
```

### 4.2 Domovská stránka - sekce

1. **Hero sekce**
   - Název: „Pozemky Raduň" + lokalizovaný claim
   - CTA tlačítko: „Prohlédnout nabídku" (scroll na seznam)

2. **Mapa oblasti** (hned pod hero)
   - Statický obrázek mapy s ručně vyznačenými pozemky
   - Legenda s čísly/názvy pozemků
   - Odkaz na větší verzi obrázku (lightbox)

3. **O obci Raduň**
   - 2-3 odstavce textu o obci
   - Klíčové informace: vzdálenost od Opavy, občanská vybavenost, dopravní dostupnost
   - Lokalizovaný obsah pro každý jazyk

4. **Seznam nabídek**
   - Grid karet (responsive: 1 sloupec mobil, 2-3 tablet/desktop)
   - Každá karta obsahuje:
     - Náhledový obrázek
     - ID/název pozemku
     - Velikost v m²
     - Cena (celková + za m²)
     - Vizuální badge pro stav (SLEVA/REZERVOVÁNO/PRODÁNO)
     - CTA: „Zobrazit detail"

5. **Kontakt**
   - Jméno prodejce/společnosti
   - Telefon (klikatelný na mobilu)
   - Email
   - Případně více kontaktních osob

6. **Patička**
   - Copyright
   - Odkazy: LLMs.txt, Sitemap
   - Přepínač jazyka
   - Přepínač světlý/tmavý režim

### 4.3 Detail nabídky - struktura

**Obsah stránky:**

- **Navigace zpět** („← Zpět na nabídku")
- **Název/ID** pozemku
- **Stavový badge** (pokud je sleva/rezervace)
- **Fotogalerie** (carousel nebo grid s lightboxem)
- **Cenové informace:**
  - Velikost: X m²
  - Cena za m²: Y Kč
  - Celková cena: Z Kč
  - Při slevě: ~~původní cena~~ **nová cena** (-X%)
- **Popis** (lokalizovaný delší text)
- **Technické parametry** (volitelné):
  - Inženýrské sítě
  - Přístup
  - Územní plán
  - Další specifika
- **Kontaktní box** (výrazný, fixní na desktopu)

### 4.4 Stavová logika UI

| Stav | Karta v seznamu | Detail | Chování |
|------|-----------------|---------|---------|
| `active` | Standardní vzhled | Plně funkční | Normální zobrazení |
| `discounted` | Badge "SLEVA -X%", zvýrazněná cena | Přeškrtnutá původní cena | Výrazné označení slevy |
| `reserved` | Badge "REZERVOVÁNO", mírně průhledná | Info o rezervaci | Stále přístupné, ale označené |
| `inactive` | Šedá/skrytá (dle konfigurace) | "Nabídka již není aktivní" | URL funguje, ale jasné označení |

---

## 5. Konfigurace a datové modely

### 5.1 Struktura konfiguračních souborů (YAML)

```
content/
├── offers/                # Jednotlivé nabídky
│   ├── radun-01.yaml
│   ├── radun-02.yaml
│   ├── radun-03.yaml
│   └── radun-04.yaml
└── site/
    ├── global.yaml        # Globální nastavení
    ├── contacts.yaml      # Kontakty
    └── translations.yaml  # UI překlady
```

### 5.2 Datový model nabídky (YAML formát)

**content/offers/radun-01.yaml:**

```yaml
# Identifikace a stav
id: radun-01
status: active  # active | discounted | reserved | inactive
featured: false

# URL slugs pro každý jazyk
slug:
  cs: pozemek-u-lesa
  en: plot-by-forest
  pl: dzialka-przy-lesie

# Velikost a ceny
size_sqm: 850
price_per_sqm: 2500
price_total: 2125000

# Sleva (pokud status: discounted)
discount:
  active: false
  percentage: 0
  old_price_total: null

# Pozice na statické mapě
map_position:
  x: 150  # pozice X na obrázku v px
  y: 200  # pozice Y na obrázku v px
  label: "1"  # číslo/označení na mapě

# Lokalizované texty
title:
  cs: Stavební pozemek u lesa
  en: Building plot by the forest
  pl: Działka budowlana przy lesie

description:
  cs: |
    Krásný rovinatý pozemek o rozloze 850 m² na okraji obce Raduň. 
    Pozemek se nachází v klidné lokalitě s výhledem do přírody.
    Veškeré inženýrské sítě jsou dostupné na hranici pozemku.
  en: |
    Beautiful flat plot of 850 m² at the edge of Raduň village.
    The plot is located in a quiet area with nature views.
    All utilities are available at the plot boundary.
  pl: |
    Piękna płaska działka o powierzchni 850 m² na skraju wsi Raduň.
    Działka znajduje się w spokojnej okolicy z widokiem na przyrodę.
    Wszystkie media dostępne przy granicy działki.

# Technické parametry
features:
  utilities:
    - electricity
    - water
    - sewage
    - gas
  access: asphalt  # asphalt | gravel | dirt
  zoning: residential  # residential | commercial | mixed

# Fotografie
images:
  - /images/plots/radun-01/main.jpg
  - /images/plots/radun-01/view.jpg
  - /images/plots/radun-01/surroundings.jpg

# Reference na kontakt
contact: default  # odkazuje na contacts.yaml

# Metadata
created: 2025-01-01
updated: 2025-01-14
```

### 5.3 Příklady dalších nabídek pro MVP

**content/offers/radun-02.yaml (se slevou):**

```yaml
id: radun-02
status: discounted
featured: true

slug:
  cs: pozemek-u-potoka
  en: plot-by-stream
  pl: dzialka-przy-potoku

size_sqm: 1200
price_per_sqm: 3000
price_total: 3240000

discount:
  active: true
  percentage: 10
  old_price_total: 3600000

map_position:
  x: 300
  y: 150
  label: "2"

title:
  cs: Sleva 10% - Pozemek u potoka
  en: 10% Discount - Plot by the stream
  pl: Rabat 10% - Działka przy potoku

# ... další pole
```

**content/offers/radun-03.yaml (rezervováno):**

```yaml
id: radun-03
status: reserved
featured: false

slug:
  cs: pozemek-na-kopci
  en: hillside-plot
  pl: dzialka-na-wzgorzu

size_sqm: 650
price_per_sqm: 2500
price_total: 1625000

# ... další pole
```

**content/offers/radun-04.yaml (neaktivní):**

```yaml
id: radun-04
status: inactive
featured: false

slug:
  cs: pozemek-u-silnice
  en: roadside-plot
  pl: dzialka-przy-drodze

size_sqm: 920
price_per_sqm: 2800
price_total: 2576000

# ... další pole
```

### 5.4 Globální konfigurace

**content/site/global.yaml:**

```yaml
# Metadata webu
site:
  url: https://radun-pozemky.cz
  default_language: cs
  languages:
    - cs
    - en
    - pl
  
  # Lokalizované titulky
  title:
    cs: Pozemky Raduň - Stavební parcely na prodej
    en: Raduň Plots - Building Land for Sale
    pl: Działki Raduň - Działki budowlane na sprzedaż
  
  # Hero sekce
  hero_claim:
    cs: Váš vysněný domov začíná zde
    en: Your dream home starts here
    pl: Twój wymarzony dom zaczyna się tutaj
  
  # Text o obci
  about_radun:
    cs: |
      Obec Raduň leží v malebné krajině Hlučínska, pouhých 15 km od Opavy. 
      S necelými 1000 obyvateli nabízí klidné bydlení v přírodě s výbornou 
      dostupností do města. V obci najdete základní občanskou vybavenost 
      včetně obchodu, restaurace a mateřské školy.
    en: |
      The village of Raduň is located in the picturesque Hlučín region, 
      just 15 km from Opava. With less than 1000 inhabitants, it offers 
      peaceful living in nature with excellent access to the city.
    pl: |
      Wieś Raduň położona jest w malowniczym regionie Hlučína, 
      zaledwie 15 km od Opawy. Z niecałym tysiącem mieszkańców oferuje 
      spokojne życie na łonie natury z doskonałym dostępem do miasta.

# Statická mapa
map:
  image: /images/map/radun-map.jpg
  alt:
    cs: Mapa pozemků v Raduni
    en: Map of plots in Raduň
    pl: Mapa działek w Raduniu
  width: 1200
  height: 800

# Nastavení zobrazení
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
    name: Jan Novák
    company: Reality Raduň s.r.o.
    role:
      cs: Prodejce
      en: Sales Agent
      pl: Agent sprzedaży
    phone: +420 777 123 456
    email: info@radun-pozemky.cz
    
  secondary:
    name: Marie Svobodová
    role:
      cs: Asistentka
      en: Assistant
      pl: Asystentka
    phone: +420 777 987 654
    email: marie@radun-pozemky.cz
```

**content/site/translations.yaml:**

```yaml
# Navigace
nav:
  home:
    cs: Úvod
    en: Home
    pl: Start
  offers:
    cs: Nabídka pozemků
    en: Land Offers
    pl: Oferty działek
  contact:
    cs: Kontakt
    en: Contact
    pl: Kontakt
  back_to_offers:
    cs: ← Zpět na nabídku
    en: ← Back to offers
    pl: ← Wróć do ofert

# Stavy nabídek
status:
  active:
    cs: K dispozici
    en: Available
    pl: Dostępna
  discounted:
    cs: Sleva
    en: Discount
    pl: Promocja
  reserved:
    cs: Rezervováno
    en: Reserved
    pl: Zarezerwowana
  inactive:
    cs: Prodáno
    en: Sold
    pl: Sprzedana

# Detaily nabídky
offer:
  size:
    cs: Velikost
    en: Size
    pl: Powierzchnia
  price_per_sqm:
    cs: Cena za m²
    en: Price per m²
    pl: Cena za m²
  total_price:
    cs: Celková cena
    en: Total price
    pl: Cena całkowita
  view_details:
    cs: Zobrazit detail
    en: View details
    pl: Zobacz szczegóły
  contact_seller:
    cs: Kontaktovat prodejce
    en: Contact seller
    pl: Skontaktuj się ze sprzedawcą

# Technické parametry
features:
  utilities:
    cs: Inženýrské sítě
    en: Utilities
    pl: Media
  electricity:
    cs: Elektřina
    en: Electricity
    pl: Prąd
  water:
    cs: Voda
    en: Water
    pl: Woda
  sewage:
    cs: Kanalizace
    en: Sewage
    pl: Kanalizacja
  gas:
    cs: Plyn
    en: Gas
    pl: Gaz
  access:
    cs: Přístup
    en: Access
    pl: Dojazd
  asphalt:
    cs: Asfaltová cesta
    en: Asphalt road
    pl: Droga asfaltowa
  gravel:
    cs: Štěrková cesta
    en: Gravel road
    pl: Droga żwirowa
  zoning:
    cs: Územní plán
    en: Zoning
    pl: Plan zagospodarowania
  residential:
    cs: Obytná zástavba
    en: Residential
    pl: Zabudowa mieszkaniowa

# Obecné
general:
  language:
    cs: Jazyk
    en: Language
    pl: Język
  dark_mode:
    cs: Tmavý režim
    en: Dark mode
    pl: Tryb ciemny
  light_mode:
    cs: Světlý režim
    en: Light mode
    pl: Tryb jasny
  currency_format:
    cs: "{price} Kč"
    en: "CZK {price}"
    pl: "{price} CZK"
```

---

## 6. MVP specifikace

### 6.1 Obsah MVP - 4 ukázkové nabídky

1. **Nabídka 1 - Aktivní standardní**
   - Status: `active`
   - Velikost: 850 m²
   - Cena: 2.125.000 Kč (2.500 Kč/m²)
   - 3 fotografie
   - Kompletní popis ve všech jazycích

2. **Nabídka 2 - Aktivní se slevou**
   - Status: `discounted`
   - Velikost: 1.200 m²
   - Původní cena: ~~3.600.000 Kč~~
   - Nová cena: 3.240.000 Kč (-10%)
   - Badge "SLEVA 10%"
   - 3 fotografie

3. **Nabídka 3 - Rezervovaná**
   - Status: `reserved`
   - Velikost: 650 m²
   - Cena: 1.625.000 Kč
   - Badge "REZERVOVÁNO"
   - Zobrazená, ale vizuálně odlišená

4. **Nabídka 4 - Neaktivní**
   - Status: `inactive`
   - Velikost: 920 m²
   - URL stále funkční
   - V seznamu skrytá nebo šedá (dle konfigurace)
   - Na detailu info "Nabídka již není aktivní"

### 6.2 Minimální funkcionalita MVP

- ✅ Statická mapa s vyznačenými 4 pozemky
- ✅ Text o obci na hlavní stránce
- ✅ Seznam 4 nabídek s kartami
- ✅ Detailní stránky pro každou nabídku
- ✅ 3 jazykové verze (CZ/EN/PL)
- ✅ Světlý a tmavý režim
- ✅ Responzivní design
- ✅ SEO meta tagy
- ✅ LLMs.txt soubor
- ✅ Kontaktní informace

### 6.3 Akceptační kritéria

- [ ] Web se načte pod 2 sekundy
- [ ] Všechny 4 nabídky mají funkční detailní stránky
- [ ] Přepínání jazyků zachovává kontext (zůstává na stejné stránce)
- [ ] Světlý/tmavý režim funguje a ukládá se preference
- [ ] Web je plně responzivní (320px - 1920px)
- [ ] Lighthouse skóre > 90 ve všech kategoriích
- [ ] Validní HTML5 a CSS3
- [ ] Funkční bez JavaScriptu (základní zobrazení)

---

## 7. Technická architektura

### 7.1 Doporučený technology stack

**Finální doporučení: Astro + Tailwind CSS**

```
Framework: Astro (SSG - Static Site Generator)
- Perfektní pro statické weby s minimální interaktivitou
- Islands architecture - JS pouze kde je potřeba
- Výborná podpora content collections (YAML/Markdown)
- Build-time rendering = excelentní SEO
- Čistý statický výstup (HTML/CSS/JS)

Styling: Tailwind CSS
- Rychlé prototypování i produkční design
- Vestavěná podpora dark mode (class strategy)
- Utility-first = konzistentní design system
- Optimalizovaný output (purge unused styles)

Mapa: Statický obrázek (MVP)
- Jednoduchý JPG/PNG s vyznačenými pozemky
- Lightbox pro zvětšení
- Případně Leaflet.js jako Astro island (post-MVP)

Konfigurace: YAML
- Astro Content Collections
- Typová bezpečnost s TypeScript (volitelně)
- Snadná editace i pro netechnické uživatele

Balíčkovací nástroj: pnpm nebo npm
Build příkaz: astro build
Dev server: astro dev
Output: dist/ složka
```

### 7.2 Struktura projektu - Astro

```
pozemky-radun/
├── src/
│   ├── pages/
│   │   ├── cs/
│   │   │   ├── index.astro          # Homepage CZ
│   │   │   └── nabidka/
│   │   │       └── [slug].astro     # Detail nabídky CZ
│   │   ├── en/
│   │   │   ├── index.astro          # Homepage EN
│   │   │   └── offer/
│   │   │       └── [slug].astro     # Detail nabídky EN
│   │   └── pl/
│   │       ├── index.astro          # Homepage PL
│   │       └── oferta/
│   │           └── [slug].astro     # Detail nabídky PL
│   ├── components/
│   │   ├── Layout.astro            # Hlavní layout
│   │   ├── Head.astro              # SEO meta tagy
│   │   ├── Header.astro            # Navigace + přepínače
│   │   ├── OfferCard.astro         # Karta nabídky
│   │   ├── OfferGallery.astro      # Fotogalerie
│   │   ├── ContactBox.astro        # Kontaktní sekce
│   │   ├── LanguageSwitcher.astro  # Přepínač jazyků
│   │   └── ThemeToggle.astro       # Dark/light mode
│   ├── styles/
│   │   └── global.css              # Tailwind directives
│   ├── utils/
│   │   ├── i18n.ts                 # Pomocné funkce pro i18n
│   │   └── offers.ts               # Pomocné funkce pro nabídky
│   └── content/
│       └── config.ts               # Definice content collections
├── content/
│   ├── offers/                     # Nabídky jako YAML soubory
│   │   ├── radun-01.yaml
│   │   ├── radun-02.yaml
│   │   ├── radun-03.yaml
│   │   └── radun-04.yaml
│   └── site/
│       ├── global.yaml             # Globální nastavení
│       ├── contacts.yaml           # Kontakty
│       └── translations.yaml       # UI překlady
├── public/
│   ├── images/
│   │   ├── map/
│   │   │   └── radun-map.jpg      # Statická mapa
│   │   └── plots/
│   │       ├── radun-01/
│   │       ├── radun-02/
│   │       ├── radun-03/
│   │       └── radun-04/
│   ├── fonts/                     # Lokální fonty (optional)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── llms.txt
│   └── _headers                   # Netlify headers (optional)
├── dist/                           # Build output
├── astro.config.mjs               # Astro konfigurace
├── tailwind.config.mjs            # Tailwind konfigurace
├── tsconfig.json                  # TypeScript config
├── package.json
├── pnpm-lock.yaml
├── netlify.toml                   # Netlify deploy config
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Actions (optional)
└── README.md
```

### 7.3 Konfigurace souborů

**astro.config.mjs:**

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://radun-pozemky.cz',
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
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B5E20',
          dark: '#4CAF50'
        },
        accent: '#FF6B35'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};
```

### 7.4 Build a deployment

**Netlify (doporučeno pro MVP):**

```toml
# netlify.toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/"
  to = "/cs/"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Package.json scripts:**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "prettier --write .",
    "lint": "eslint src"
  }
}
```

---

## 8. SEO a AI optimalizace

### 8.1 SEO implementace

**Meta tagy (pro každou stránku):**

```html
<title>Pozemky Raduň - Stavební parcely na prodej</title>
<meta name="description" content="Nabízíme stavební pozemky v obci Raduň...">
<link rel="canonical" href="https://radun-pozemky.cz/cs/">
<link rel="alternate" hreflang="en" href="https://radun-pozemky.cz/en/">
<link rel="alternate" hreflang="pl" href="https://radun-pozemky.cz/pl/">
```

**Open Graph:**

```html
<meta property="og:title" content="Pozemky Raduň">
<meta property="og:description" content="Stavební parcely...">
<meta property="og:image" content="https://radun-pozemky.cz/images/og-image.jpg">
<meta property="og:type" content="website">
```

**Strukturovaná data (JSON-LD):**

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Stavební pozemek Raduň",
  "description": "Pozemek 850 m²...",
  "offers": {
    "@type": "Offer",
    "price": "2125000",
    "priceCurrency": "CZK"
  },
  "areaServed": "Raduň, Czech Republic",
  "category": "BuildingLot"
}
```

### 8.2 LLMs.txt specifikace

```txt
# LLMs.txt for radun-pozemky.cz

## About This Website
Domain: radun-pozemky.cz
Type: Real estate listings - building plots
Location: Raduň, Opava District, Czech Republic
Languages: Czech (primary), English, Polish

## Content Structure
- Homepage with plot listings
- Individual plot detail pages
- Static map with plot locations
- Information about Raduň village

## Data Format
All plots have:
- Unique ID and slug
- Size in square meters
- Price per m² and total price
- Status: active, discounted, reserved, or inactive
- Multiple photos
- Descriptions in 3 languages

## URL Pattern
- /cs/nabidka/[slug] - Czech plot details
- /en/offer/[slug] - English plot details
- /pl/oferta/[slug] - Polish plot details

## Current Inventory
Active plots: [dynamic count]
Price range: 1,500-3,000 CZK/m²
Size range: 650-1,200 m²

## Contact
Primary: info@radun-pozemky.cz
Phone: +420 777 123 456

## Technical
Static website, no API
Content managed via JSON configuration
Hosted on: [Netlify/Azure/GitHub Pages]
```

### 8.3 Performance optimalizace

- **Obrázky:** WebP formát s JPEG fallbackem, lazy loading
- **CSS:** Kritické CSS inline, zbytek asynchronně
- **JavaScript:** Minimální, defer loading
- **Fonty:** System font stack nebo optimalizované webfonty
- **Caching:** Agresivní cache headers pro statické assety

---

## 9. UI/UX požadavky

### 9.1 Design principy

- **Seriózní a důvěryhodný** - profesionální vzhled pro realitní segment
- **Čistý a minimalistický** - focus na obsah, ne na dekorace
- **Vysoký kontrast** - snadná čitelnost pro všechny věkové skupiny
- **Velké interaktivní prvky** - snadné ovládání na mobilu

### 9.2 Barevné schéma

**Světlý režim:**

- Primární: Tmavě zelená (#1B5E20)
- Sekundární: Světle šedá (#F5F5F5)
- Akcent: Oranžová pro CTA (#FF6B35)
- Text: Tmavě šedá (#212121)

**Tmavý režim:**

- Primární: Světle zelená (#4CAF50)
- Pozadí: Tmavě šedá (#121212)
- Karty: Středně šedá (#1E1E1E)
- Text: Světle šedá (#E0E0E0)

### 9.3 Typografie

- **Nadpisy:** System serif nebo Playfair Display
- **Tělo:** System sans-serif nebo Inter
- **Velikosti:** 16px base, 1.5 line-height

### 9.4 Komponenty

**Karta nabídky:**

- Minimální výška 320px
- Hover efekt: mírný stín + posun nahoru
- Badge v pravém horním rohu
- Cena výrazně zobrazená

**Tlačítka:**

- Minimální výška 48px (mobile)
- Kontrastní barvy
- Jasné hover/focus stavy

---

## 10. Časový harmonogram

### Fáze 0: Příprava (2-3 dny)

- Výběr konkrétního tech stacku
- Setup repozitáře a vývojového prostředí
- Příprava grafických podkladů (mapa, fotky)

### Fáze 1: Základní struktura (3-4 dny)

- HTML struktura hlavní stránky
- CSS framework a základní styly
- Responzivní layout

### Fáze 2: Funkcionalita (4-5 dnů)

- Načítání dat z JSON
- Generování karet nabídek
- Implementace detailních stránek
- Jazykové přepínání
- Světlý/tmavý režim

### Fáze 3: Obsah a lokalizace (2-3 dny)

- Příprava textů ve 3 jazycích
- Optimalizace obrázků
- Vytvoření statické mapy s pozemky

### Fáze 4: Optimalizace a testing (2-3 dny)

- SEO optimalizace
- Performance tuning
- Cross-browser testing
- Mobile testing

### Fáze 5: Deployment (1-2 dny)

- Setup hostingu
- CI/CD pipeline
- DNS konfigurace
- Finální testy na produkci

**Celkem: 14-20 dní** pro kompletní MVP

---

## 11. Údržba a správa obsahu

### 11.1 Workflow pro přidání nové nabídky

1. **Příprava dat:**
   - Vyfotit pozemek (min. 3 fotky)
   - Získat přesné údaje (velikost, cena, parcelní číslo)
   - Připravit popis ve 3 jazycích

2. **Technická implementace:**

   ```bash
   # 1. Přidat fotky do složky
   src/images/plots/radun-05/
   
   # 2. Upravit offers.json
   git pull
   # přidat nový objekt nabídky
   
   # 3. Commit a push
   git add .
   git commit -m "Přidána nabídka radun-05"
   git push
   
   # 4. Automatický deploy přes CI/CD
   ```

3. **Kontrola:**
   - Ověřit zobrazení na webu
   - Zkontrolovat všechny jazykové mutace
   - Otestovat detail nabídky

### 11.2 Změna stavu nabídky

**Rezervace:**

- Změnit `status` na `reserved` v offers.json
- Commit + push → auto-deploy

**Prodej (deaktivace):**

- Změnit `status` na `inactive`
- Nabídka zmizí ze seznamu, ale URL zůstane

### 11.3 Dokumentace pro správce

Vytvořit jednoduchý `ADMIN-GUIDE.md` s:

- Strukturou JSON souborů
- Příklady běžných úkonů
- Checklisty pro nové nabídky
- Kontakty na technickou podporu

---

## 12. Metriky úspěchu

### 12.1 Technické metriky

- PageSpeed Insights: > 90/100
- Time to Interactive: < 2s
- Bounce rate: < 40%

### 12.2 Business metriky (first 3 months)

- Unikátní návštěvy: 300+/měsíc
- Průměrná doba na stránce: > 2 minuty
- Kontaktů přes web: 10+/měsíc
- Konverze návštěva → kontakt: > 3%

### 12.3 Dlouhodobé cíle (12 měsíců)

- Organický traffic: > 60%
- Pozice pro "pozemky Raduň": TOP 3
- Úspěšné prodeje přes web: 2+

---

## 13. Rizika a mitigace

| Riziko | Pravděpodobnost | Dopad | Řešení |
|--------|-----------------|-------|---------|
| Složitá správa pro laika | Střední | Vysoký | Detailní dokumentace + video návod |
| Problémy s hostingem | Nízká | Vysoký | Backup hosting provider |
| Špatné SEO pozice | Střední | Střední | PPC kampaň jako backup |
| Neaktuální informace | Střední | Vysoký | Pravidelné revize (1x týdně) |

---

## 14. Budoucí vylepšení (post-MVP)

- **Fáze 2** (3-6 měsíců):
  - Kontaktní formulář s captchou
  - WhatsApp tlačítko
  - Google Analytics dashboard
  - Virtuální prohlídky (360° foto)

- **Fáze 3** (6-12 měsíců):
  - Interaktivní mapa (pokud bude potřeba)
  - Integrace s realitními portály
  - Automatické upozornění na nové nabídky
  - PDF generátor nabídek

---

## Přílohy

### A. Vzorová data pro MVP

(Viz sekce 5.2 - 5.4)

### B. Konkurenční analýza

- bezrealitky.cz - komplexní portál
- sreality.cz - největší český portál
- Lokální weby makléřů - jednoduché prezentace

### C. Technické detaily

- Konkrétní build skripty
- Deployment postupy pro jednotlivé platformy
- SEO checklist

---

## 15. Implementační poznámky (Astro specifické)

### 15.1 Content Collections setup

**src/content/config.ts:**

```typescript
import { z, defineCollection } from 'astro:content';

const offersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    status: z.enum(['active', 'discounted', 'reserved', 'inactive']),
    featured: z.boolean().default(false),
    slug: z.object({
      cs: z.string(),
      en: z.string(),
      pl: z.string(),
    }),
    size_sqm: z.number(),
    price_per_sqm: z.number(),
    price_total: z.number(),
    discount: z.object({
      active: z.boolean(),
      percentage: z.number().optional(),
      old_price_total: z.number().nullable(),
    }).optional(),
    map_position: z.object({
      x: z.number(),
      y: z.number(),
      label: z.string(),
    }),
    title: z.object({
      cs: z.string(),
      en: z.string(),
      pl: z.string(),
    }),
    description: z.object({
      cs: z.string(),
      en: z.string(),
      pl: z.string(),
    }),
    features: z.object({
      utilities: z.array(z.string()),
      access: z.enum(['asphalt', 'gravel', 'dirt']),
      zoning: z.enum(['residential', 'commercial', 'mixed']),
    }),
    images: z.array(z.string()),
    contact: z.string(),
    created: z.string(),
    updated: z.string(),
  }),
});

export const collections = {
  'offers': offersCollection,
};
```

### 15.2 i18n implementace

**src/utils/i18n.ts:**

```typescript
export const languages = ['cs', 'en', 'pl'] as const;
export type Language = typeof languages[number];

export const defaultLang: Language = 'cs';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    // Implementace načítání překladů
    return translations[lang][key] || key;
  };
}
```

### 15.3 Dark mode implementace

**src/components/ThemeToggle.astro:**

```astro
---
// Component logic
---

<button
  id="theme-toggle"
  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
  aria-label="Toggle dark mode"
>
  <svg class="sun-icon w-6 h-6" /* Sun SVG */ />
  <svg class="moon-icon w-6 h-6 hidden" /* Moon SVG */ />
</button>

<script>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  window.localStorage.setItem('theme', theme);

  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // Toggle icons
  });
</script>

<style>
  .dark .sun-icon { display: none; }
  .dark .moon-icon { display: block; }
</style>
```

### 15.4 Deployment skripty

**package.json:**

```json
{
  "name": "pozemky-radun",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "prettier --write .",
    "lint": "eslint src",
    "clean": "rm -rf dist .astro",
    "deploy:netlify": "netlify deploy --prod --dir=dist",
    "deploy:github": "gh-pages -d dist"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0",
    "typescript": "^5.0.0"
  }
}
```

### 15.5 Optimalizace výkonu

**Doporučení pro Astro:**

1. **Image optimization:** Použít `@astrojs/image` pro automatickou optimalizaci
2. **Font loading:** Použít `font-display: swap` pro web fonty
3. **CSS:** Tailwind automaticky purge unused styles
4. **JS:** Astro islands - JS pouze kde je potřeba
5. **Prefetch:** Použít `prefetch` directive pro rychlejší navigaci

```astro
---
import { Image } from '@astrojs/image/components';
---

<Image 
  src="/images/plots/radun-01/main.jpg"
  alt="Pozemek Raduň 01"
  width={800}
  height={600}
  format="webp"
  loading="lazy"
/>
```

### 15.6 Checklist před spuštěním

- [ ] Instalace dependencies: `pnpm install`
- [ ] Vytvoření YAML souborů pro 4 MVP nabídky
- [ ] Příprava obrázků (mapa + fotky pozemků)
- [ ] Nastavení Tailwind barev dle brand guidelines
- [ ] Konfigurace Netlify/GitHub Pages/Azure
- [ ] Test všech 3 jazykových mutací
- [ ] Test dark/light mode
- [ ] Validace SEO meta tagů
- [ ] Vytvoření LLMs.txt
- [ ] Test build: `pnpm run build`
- [ ] Preview: `pnpm run preview`

---

*Tento PRD představuje kompletní technickou specifikaci pro implementaci webu radun-pozemky.cz pomocí moderního Astro + Tailwind stacku s důrazem na výkon, SEO a snadnou správu obsahu.*
