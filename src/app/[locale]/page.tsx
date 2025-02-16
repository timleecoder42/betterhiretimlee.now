import { setRequestLocale } from 'next-intl/server';

import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';
import type { PageProps } from '@/types/common';

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
