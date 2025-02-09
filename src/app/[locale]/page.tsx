import { HeroSection } from '@/components/home/hero-section';
import { ProjectsContainer } from '@/components/home/projects-container';

export default function Home() {
  return (
    <div className="min-h-screen w-full pb-48">
      <HeroSection />
      <ProjectsContainer />
    </div>
  );
}
