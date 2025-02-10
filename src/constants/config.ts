import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/common';

// Locale settings
export const SUPPORTED_LOCALES = routing.locales as readonly Locale[];

// Contact information
export const CONTACT_EMAIL = 'timleecoder42@gmail.com';
export const GITHUB_USERNAME = 'timleecoder42';

export const REVALIDATE_TIME = {
  EVERY_MINUTE: 60,
  EVERY_HOUR: 3600,
} as const;
