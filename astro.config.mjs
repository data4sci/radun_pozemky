import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pozemky-radun.cz',
  base: '/',
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
  },
  trailingSlash: 'always'
});
