import { setRequestLocale } from 'next-intl/server';

import { AboutContent } from '@/components/about/about-content';
import type { PageProps } from '@/types/common';

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <AboutContent />;
}
