import { setRequestLocale } from 'next-intl/server';

import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';
import { SUPPORTED_LOCALES } from '@/constants/config';
import type { PageProps } from '@/types/common';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
