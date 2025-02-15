import { GITHUB_USERNAME } from '@/constants/config';
import type { Project, GitHubRepo } from '@/types/project';

// Helper function to extract weight from topics
function getWeightFromTopics(topics: string[]): number {
  const weightTopic = topics.find((topic: string) => topic.startsWith('weight-'));
  if (weightTopic) {
    const weight = parseInt(weightTopic.replace('weight-', ''), 10);
    return isNaN(weight) ? 0 : weight;
  }
  return 0;
}

/**
 * Fetches GitHub repositories using the GitHub API.
 * This function runs on the server side only, so it's safe to use GITHUB_TOKEN here.
 * The token is used to increase the API rate limit from 60 to 5000 requests per hour.
 */
async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      // next: {
      //   revalidate: REVALIDATE_TIME.EVERY_MINUTE,
      // },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repos');
  }

  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  try {
    const repos = await fetchGitHubRepos();

    // Filter out forks and archived repos and the current user's repos
    const filteredRepos = repos.filter(
      repo => !repo.fork && !repo.archived && repo.name !== GITHUB_USERNAME
    );

    // Transform GitHub repos into projects
    const projects: Project[] = filteredRepos.map(repo => {
      // Generate GitHub repository preview image URL
      const imageUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;
      const topics = repo.topics || [];
      const displayTags = topics.filter((topic: string) => !topic.startsWith('weight-'));

      return {
        title: repo.name,
        description: repo.description || '',
        image: imageUrl,
        tags: displayTags,
        demoUrl: repo.homepage || '',
        githubUrl: repo.html_url,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        weight: getWeightFromTopics(repo.topics),
      };
    });

    // Sort projects by weight (ascending)
    projects.sort((a, b) => a.weight - b.weight);

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return empty array instead of throwing to prevent build failures
  }
}
