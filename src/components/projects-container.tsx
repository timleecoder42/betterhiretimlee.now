import { getProjects } from '@/api/github';
import ProjectsSection from '@/components/projects-section';

export async function ProjectsContainer() {
  const projects = await getProjects();
  return <ProjectsSection projects={projects} />;
}
