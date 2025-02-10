import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';
import { REVALIDATE_TIME, SUPPORTED_LOCALES } from '@/constants/config';

export const revalidate = REVALIDATE_TIME;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

export default function Home() {
  return (
    <div className="min-h-screen w-full pb-48">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
