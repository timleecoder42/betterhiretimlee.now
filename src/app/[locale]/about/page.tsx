import { AboutContent } from '@/components/about/about-content';
import { SUPPORTED_LOCALES } from '@/constants/config';

export const revalidate = 3600; // 1 hour in seconds

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function AboutPage() {
  return <AboutContent />;
}
