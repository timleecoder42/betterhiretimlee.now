import { routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];
export type DefaultLocale = typeof routing.defaultLocale;

// Type guard to check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}
