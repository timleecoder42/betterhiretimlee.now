import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  stars: number;
  updatedAt: string;
  weight: number;
};

// Helper function to extract weight from topics
function getWeightFromTopics(topics: string[]): number {
  const weightTopic = topics.find((topic: string) => topic.startsWith('weight-'));
  if (weightTopic) {
    const weight = parseInt(weightTopic.replace('weight-', ''), 10);
    return isNaN(weight) ? 0 : weight;
  }
  return 0;
}

// GitHub API repository response type
interface GitHubRepo {
  name: string;
  fork: boolean;
  archived: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

// Cache the fetch call to avoid unnecessary API calls
const getProjects = unstable_cache(
  async () => {
    const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
    if (!username) {
      throw new Error(
        'GitHub username not configured. Set NEXT_PUBLIC_GITHUB_USERNAME in your environment variables.'
      );
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            }),
          },
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Failed to fetch GitHub repositories: ${response.status}`);
      }

      const repos = await response.json();

      // Transform the GitHub data into our Project type
      const projects: Project[] = repos
        .filter((repo: GitHubRepo) => !repo.fork && !repo.archived && repo.name !== username)
        .map((repo: GitHubRepo) => {
          const image = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
          const topics = repo.topics || [];
          const displayTags = topics.filter((topic: string) => !topic.startsWith('weight-'));

          return {
            title: repo.name,
            description: repo.description || '',
            image,
            tags: displayTags,
            demoUrl: repo.homepage,
            githubUrl: repo.html_url,
            stars: repo.stargazers_count,
            updatedAt: repo.updated_at,
            weight: getWeightFromTopics(topics),
          };
        })
        .sort((a: Project, b: Project) => a.weight - b.weight);

      return projects;
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      throw error;
    }
  },
  ['github-projects'],
  {
    revalidate: 3600,
    tags: ['github-projects'],
  }
);

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error: unknown) {
    console.error('Error in GitHub API route:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
