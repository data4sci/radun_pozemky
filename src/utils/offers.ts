import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import type { Language } from './i18n';

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
  map_position: {
    x: number;
    y: number;
    label: string;
  };
  title: Record<Language, string>;
  description: Record<Language, string>;
  features: {
    utilities: string[];
    access: string;
    zoning: string;
  };
  images: string[];
  contact: string;
  created: string;
  updated: string;
}

let offersCache: Offer[] | null = null;

export function loadOffers(): Offer[] {
  if (offersCache) return offersCache;

  const offersDir = path.join(process.cwd(), 'content/offers');
  const files = fs.readdirSync(offersDir).filter(f => f.endsWith('.yaml'));

  offersCache = files.map(file => {
    const filePath = path.join(offersDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContents) as Offer;
  });

  return offersCache;
}

export function getActiveOffers(): Offer[] {
  const offers = loadOffers();
  return offers.filter(o => o.status !== 'inactive');
}

export function getAllOffers(): Offer[] {
  return loadOffers();
}

export function getOfferBySlug(slug: string, lang: Language): Offer | undefined {
  const offers = loadOffers();
  return offers.find(o => o.slug[lang] === slug);
}

export function getOfferById(id: string): Offer | undefined {
  const offers = loadOffers();
  return offers.find(o => o.id === id);
}
