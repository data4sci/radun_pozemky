import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const languages = ['cs', 'en', 'pl'] as const;
export type Language = typeof languages[number];

export const defaultLang: Language = 'cs';

export const languageNames: Record<Language, string> = {
  cs: 'Čeština',
  en: 'English',
  pl: 'Polski'
};

export const offerPathSegment: Record<Language, string> = {
  cs: 'offer',
  en: 'offer',
  pl: 'offer'
};

// Helper to add base URL to paths
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove trailing slash from base and leading slash from path if present
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return cleanBase + cleanPath;
}

// Helper to generate offer detail URL
export function getOfferUrl(lang: Language, slug: string): string {
  return withBase(`/${lang}/${offerPathSegment[lang]}/${slug}/`);
}

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) {
    return lang as Language;
  }
  return defaultLang;
}

let translationsCache: Record<string, any> | null = null;
let globalCache: Record<string, any> | null = null;
let contactsCache: Record<string, any> | null = null;

export function loadTranslations(): Record<string, any> {
  if (translationsCache) return translationsCache;

  const filePath = path.join(process.cwd(), 'content/site/translations.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  translationsCache = yaml.load(fileContents) as Record<string, any>;
  return translationsCache;
}

export function loadGlobalConfig(): Record<string, any> {
  if (globalCache) return globalCache;

  const filePath = path.join(process.cwd(), 'content/site/global.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  globalCache = yaml.load(fileContents) as Record<string, any>;
  return globalCache;
}

export function loadContacts(): Record<string, any> {
  if (contactsCache) return contactsCache;

  const filePath = path.join(process.cwd(), 'content/site/contacts.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  contactsCache = yaml.load(fileContents) as Record<string, any>;
  return contactsCache;
}

export function t(key: string, lang: Language): string {
  const translations = loadTranslations();
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (value && typeof value === 'object' && lang in value) {
    return value[lang];
  }

  return key;
}

export function formatPrice(price: number, lang: Language): string {
  const formatted = price.toLocaleString('cs-CZ');
  const template = t('general.currency_format', lang);
  return template.replace('{price}', formatted);
}

export interface OfferSlugs {
  cs: string;
  en: string;
  pl: string;
}

export function getAlternateUrls(
  currentPath: string,
  currentLang: Language,
  offerSlugs?: OfferSlugs
): Record<Language, string> {
  const urls: Record<Language, string> = {} as Record<Language, string>;

  for (const lang of languages) {
    if (currentPath.includes(`/${currentLang}/`)) {
      let newPath = currentPath.replace(`/${currentLang}/`, `/${lang}/`);

      // Handle offer path segment translation
      const currentSegment = offerPathSegment[currentLang];
      const newSegment = offerPathSegment[lang];
      newPath = newPath.replace(`/${currentSegment}/`, `/${newSegment}/`);

      // Handle offer slug translation if provided
      if (offerSlugs) {
        const currentSlug = offerSlugs[currentLang];
        const newSlug = offerSlugs[lang];
        newPath = newPath.replace(`/${currentSlug}/`, `/${newSlug}/`);
      }

      urls[lang] = newPath;
    } else {
      urls[lang] = `/${lang}/`;
    }
  }

  return urls;
}
