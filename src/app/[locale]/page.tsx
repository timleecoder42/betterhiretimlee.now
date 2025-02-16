import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';
import { SUPPORTED_LOCALES } from '@/constants/config';

// Force static generation for all pages
export const dynamic = 'force-static';

// Add revalidation period - 1 hour
export const revalidate = 3600;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
