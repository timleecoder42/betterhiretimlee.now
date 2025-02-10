import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/common';

export function isValidLocale(locale: string): locale is Locale {
  return routing.locales.includes(locale as Locale);
}
