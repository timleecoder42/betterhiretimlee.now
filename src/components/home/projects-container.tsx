import ProjectsSection from '@/components/home/projects-section';
import { getProjects } from '@/lib/github';

export async function ProjectsContainer() {
  const projects = await getProjects();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProjectsSection projects={projects} />
    </section>
  );
}
