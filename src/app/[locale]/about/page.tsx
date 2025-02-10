import { AboutContent } from '@/components/about/about-content';
import { REVALIDATE_TIME, SUPPORTED_LOCALES } from '@/constants/config';

export const revalidate = REVALIDATE_TIME;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function AboutPage() {
  return <AboutContent />;
}
