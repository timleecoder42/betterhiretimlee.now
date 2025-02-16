import { AboutContent } from '@/components/about/about-content';
import { SUPPORTED_LOCALES } from '@/constants/config';

// Force static generation for all pages
export const dynamic = 'force-static';

// Add revalidation period - 1 hour
export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function AboutPage() {
  return <AboutContent />;
}
