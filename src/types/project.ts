export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  stars: number;
  updatedAt: string;
  weight: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
}

export interface ProjectsSectionProps {
  projects: Project[];
}
