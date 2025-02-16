import { AboutContent } from '@/components/about/about-content';
import { SUPPORTED_LOCALES } from '@/constants/config';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function AboutPage() {
  return <AboutContent />;
}
