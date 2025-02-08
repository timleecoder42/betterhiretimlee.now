import { getProjects } from '@/api/github';
import ProjectsSection from '@/app/components/projects-section';

export async function ProjectsContainer() {
  const projects = await getProjects();
  return <ProjectsSection projects={projects} />;
}
