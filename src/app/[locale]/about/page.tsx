import { AboutContent } from '@/components/about/about-content';
import { SUPPORTED_LOCALES } from '@/constants/config';

// Add revalidation period - 1 hour
export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function AboutPage() {
  return <AboutContent />;
}
