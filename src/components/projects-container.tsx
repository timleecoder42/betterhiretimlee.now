import ProjectsSection from '@/components/projects-section';
import { getProjects } from '@/lib/github';

export async function ProjectsContainer() {
  const projects = await getProjects();
  return <ProjectsSection projects={projects} />;
}
