import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

import { REVALIDATE_TIME } from '@/constants/config';
import type { Project, GitHubRepo } from '@/types/project';

// Cache the fetch call to avoid unnecessary API calls
const getGitHubRepos = unstable_cache(
  async () => {
    const response = await fetch('https://api.github.com/users/timlee0119/repos?sort=updated', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos: GitHubRepo[] = await response.json();
    return repos;
  },
  ['github-repos'],
  {
    revalidate: REVALIDATE_TIME,
  }
);

function calculateWeight(repo: GitHubRepo): number {
  let weight = 0;

  // Add weight based on stars
  if (repo.stargazers_count >= 100) weight += 5;
  else if (repo.stargazers_count >= 50) weight += 4;
  else if (repo.stargazers_count >= 20) weight += 3;
  else if (repo.stargazers_count >= 10) weight += 2;
  else if (repo.stargazers_count >= 5) weight += 1;

  // Add weight for being recently updated
  const lastUpdated = new Date(repo.updated_at);
  const now = new Date();
  const monthsAgo = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (monthsAgo <= 1) weight += 3;
  else if (monthsAgo <= 3) weight += 2;
  else if (monthsAgo <= 6) weight += 1;

  return weight;
}

export async function GET() {
  try {
    const repos = await getGitHubRepos();

    // Filter out forks and archived repos
    const filteredRepos = repos.filter(repo => !repo.fork && !repo.archived);

    // Transform GitHub repos into projects
    const projects: Project[] = filteredRepos.map(repo => ({
      title: repo.name,
      description: repo.description || '',
      image: '', // Add image URL if available
      tags: repo.topics || [],
      demoUrl: repo.homepage || '',
      githubUrl: repo.html_url,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
      weight: calculateWeight(repo),
    }));

    // Sort projects by weight (descending)
    projects.sort((a, b) => b.weight - a.weight);

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return new NextResponse('Error fetching GitHub repos', { status: 500 });
  }
}
