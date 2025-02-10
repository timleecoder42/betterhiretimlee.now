import { ExperienceSection } from '@/components/about/experience-section';
import { HeroSection } from '@/components/about/hero-section';
import { SkillsSection } from '@/components/about/skills-section';

export function AboutContent() {
  return (
    <div className="min-h-screen w-full pb-48">
      {/* Hero Section */}
      <HeroSection />

      {/* Other sections with original width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <ExperienceSection />
      </div>
    </div>
  );
}
