import { HeroSection } from '@/components/hero-section';
import { ProjectsContainer } from '@/components/projects-container';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
