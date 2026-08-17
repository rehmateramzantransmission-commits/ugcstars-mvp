import en from './en.json';
import ur from './ur.json';

export type Locale = 'en' | 'ur';
export type TranslationKey = string;

const translations: Record<Locale, Record<string, any>> = { en, ur };

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  for (const k of keys) {
    if (value === undefined || value === null) return key;
    value = value[k];
  }
  return typeof value === 'string' ? value : key;
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ur';
}

export function formatCurrency(amount: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(locale === 'ur' ? 'ur-PK' : 'en-PK').format(num);
}

export function formatFollowerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export { en, ur };
