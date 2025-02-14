import type { routing } from '@/i18n/routing';

export type Locale = (typeof routing.locales)[number];
export type DefaultLocale = typeof routing.defaultLocale;

export type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};
