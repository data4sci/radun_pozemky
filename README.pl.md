# Pozemky Radun - Strona sprzedazy dzialek

Statyczna wielojezyczna strona do sprzedazy dzialek budowlanych w wsi Radun.

## Technologia

- **Framework:** Astro 5.x (SSG - Static Site Generator)
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (CI/CD przez GitHub Actions)
- **Jezyki:** Czeski (CZ), Angielski (EN), Polski (PL)

## Szybki start

```bash
# Instalacja zaleznosci
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Build produkcyjny
npm run build

# Podglad buildu produkcyjnego
npm run preview
```

## Struktura projektu

```
├── content/              # Pliki konfiguracyjne YAML
│   ├── offers/          # Oferty dzialek
│   └── site/            # Globalne ustawienia i tlumaczenia
├── public/              # Pliki statyczne (obrazy, favicon)
├── src/
│   ├── components/      # Komponenty Astro
│   ├── pages/           # Strony (routes)
│   ├── styles/          # Globalne style
│   └── utils/           # Funkcje pomocnicze (i18n, offers)
└── .github/workflows/   # GitHub Actions do wdrozenia
```

## Zarzadzanie trescia

### Dodawanie nowej oferty

1. Utworz nowy plik YAML w `content/offers/radun-XX.yaml`
2. Dodaj obrazy do `public/images/plots/radun-XX/`
3. Commit i push -> automatyczne wdrozenie

### Zmiana statusu oferty

- **Zarezerwowana:** Zmien `status: reserved`
- **Promocja:** Zmien `status: discounted` i ustaw rabat
- **Sprzedana:** Zmien `status: inactive`

## Wdrozenie na GitHub Pages

1. Utworz repozytorium GitHub
2. Push kodu do galezi `main`
3. W Settings -> Pages -> Source: GitHub Actions
4. GitHub Actions automatycznie wdrozy strone

## Funkcje

- 3 wersje jezykowe (CZ/EN/PL)
- Tryb jasny/ciemny
- Responsywny design
- Optymalizacja SEO (meta tagi, sitemap)
- Statyczna mapa z zaznaczonymi dzialkami
- Odznaki statusu (Promocja, Zarezerwowana, Sprzedana)
- LLMs.txt dla wyszukiwarek AI

## Struktura URL

```
/                           -> Przekierowanie na /cs/
/cs/                        -> Czeska strona glowna
/en/                        -> Angielska strona glowna
/pl/                        -> Polska strona glowna
/cs/nabidka/[slug]/         -> Szczegoly po czesku
/en/offer/[slug]/           -> Szczegoly po angielsku
/pl/oferta/[slug]/          -> Szczegoly po polsku
```

## Licencja

Projekt prywatny - Wszelkie prawa zastrzezone
