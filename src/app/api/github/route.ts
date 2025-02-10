import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

import { GITHUB_USERNAME } from '@/constants/config';
import type { Project, GitHubRepo } from '@/types/project';

// Cache the fetch call to avoid unnecessary API calls
const getGitHubRepos = unstable_cache(
  async () => {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`,
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
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos: GitHubRepo[] = await response.json();
    return repos;
  },
  ['github-repos'],
  {
    revalidate: 60, // 1 minute
  }
);

// Helper function to extract weight from topics
function getWeightFromTopics(topics: string[]): number {
  const weightTopic = topics.find((topic: string) => topic.startsWith('weight-'));
  if (weightTopic) {
    const weight = parseInt(weightTopic.replace('weight-', ''), 10);
    return isNaN(weight) ? 0 : weight;
  }
  return 0;
}

export async function GET() {
  try {
    const repos = await getGitHubRepos();

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

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return new NextResponse('Error fetching GitHub repos', { status: 500 });
  }
}
