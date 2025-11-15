# Pozemky Radun - Land Plot Sales Website

Static multilingual website for selling building plots in Radun village.

## Technology

- **Framework:** Astro 5.x (SSG - Static Site Generator)
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages (CI/CD via GitHub Actions)
- **Languages:** Czech (CZ), English (EN), Polish (PL)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── content/              # YAML configuration files
│   ├── offers/          # Land plot offers
│   └── site/            # Global settings and translations
├── public/              # Static files (images, favicon)
├── src/
│   ├── components/      # Astro components
│   ├── pages/           # Pages (routes)
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions (i18n, offers)
└── .github/workflows/   # GitHub Actions for deployment
```

## Content Management

### Adding a New Offer

1. Create a new YAML file in `content/offers/radun-XX.yaml`
2. Add images to `public/images/plots/radun-XX/`
3. Commit and push -> automatic deployment

### Changing Offer Status

- **Reserved:** Change `status: reserved`
- **Discount:** Change `status: discounted` and set discount
- **Sold:** Change `status: inactive`

## GitHub Pages Deployment

1. Create a GitHub repository
2. Push code to `main` branch
3. In Settings -> Pages -> Source: GitHub Actions
4. GitHub Actions will automatically deploy the website

## Features

- 3 language versions (CZ/EN/PL)
- Light/dark mode
- Responsive design
- SEO optimization (meta tags, sitemap)
- Static map with marked plots
- Status badges (Discount, Reserved, Sold)
- LLMs.txt for AI search engines

## URL Structure

```
/                           -> Redirect to /cs/
/cs/                        -> Czech homepage
/en/                        -> English homepage
/pl/                        -> Polish homepage
/cs/nabidka/[slug]/         -> Detail in Czech
/en/offer/[slug]/           -> Detail in English
/pl/oferta/[slug]/          -> Detail in Polish
```

## License

Private project - All rights reserved
