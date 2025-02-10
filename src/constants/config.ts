import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/common';

// Revalidation settings
export const REVALIDATE_TIME = 3600; // 1 hour in seconds

// Locale settings
export const SUPPORTED_LOCALES = routing.locales as readonly Locale[];

// Contact information
export const CONTACT_EMAIL = 'timleecoder42@gmail.com';
export const GITHUB_USERNAME = 'timleecoder42';
