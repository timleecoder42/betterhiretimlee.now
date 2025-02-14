import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';
import { SUPPORTED_LOCALES } from '@/constants/config';

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default async function Home() {
  return (
    <div className="min-h-screen w-full">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
