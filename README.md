# Pozemky Radun - Web pro prodej pozemku

Staticky vicejazycny web pro prodej stavebnich pozemku v obci Radun.

## Technologie

- **Framework:** Astro 5.x (SSG - Static Site Generator)
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (CI/CD via GitHub Actions)
- **Jazyky:** Cestina (CZ), Anglictina (EN), Polstina (PL)

## Rychly start

```bash
# Instalace zavislosti
npm install

# Spusteni vyvojoveho serveru
npm run dev

# Build pro produkci
npm run build

# Nahled produkcniho buildu
npm run preview
```

## Struktura projektu

```
├── content/              # YAML konfiguracni soubory
│   ├── offers/          # Nabidky pozemku
│   └── site/            # Globalni nastaveni a preklady
├── public/              # Staticke soubory (obrazky, favicon)
├── src/
│   ├── components/      # Astro komponenty
│   ├── pages/           # Stranky (routes)
│   ├── styles/          # Globalni styly
│   └── utils/           # Pomocne funkce (i18n, offers)
└── .github/workflows/   # GitHub Actions pro deployment
```

## Sprava obsahu

### Pridani nove nabidky

1. Vytvorte novy YAML soubor v `content/offers/radun-XX.yaml`
2. Pridejte obrazky do `public/images/plots/radun-XX/`
3. Commit a push -> automaticky deploy

### Zmena stavu nabidky

- **Rezervace:** Zmente `status: reserved`
- **Sleva:** Zmente `status: discounted` a nastavte discount
- **Prodano:** Zmente `status: inactive`

## Deployment na GitHub Pages

1. Vytvorte GitHub repozitar
2. Push kodu do `main` branch
3. V Settings -> Pages -> Source: GitHub Actions
4. GitHub Actions automaticky nasadi web

## Funkce

- 3 jazykove mutace (CZ/EN/PL)
- Svetly/tmavy rezim
- Responzivni design
- SEO optimalizace (meta tagy, sitemap)
- Staticka mapa s vyznacenymi pozemky
- Stavove badge (Sleva, Rezervovano, Prodano)
- LLMs.txt pro AI vyhledavace

## URL struktura

```
/                           -> Redirect na /cs/
/cs/                        -> Ceska homepage
/en/                        -> Anglicka homepage
/pl/                        -> Polska homepage
/cs/nabidka/[slug]/         -> Detail v cestine
/en/offer/[slug]/           -> Detail v anglictine
/pl/oferta/[slug]/          -> Detail v polstine
```

## Licence

Soukromy projekt - Vsechna prava vyhrazena
