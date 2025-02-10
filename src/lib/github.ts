import type { Project } from '@/types/project';

export async function getProjects(): Promise<Project[]> {
  try {
    // Get the base URL from environment variables, falling back to localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/github`, {
      // Add cache: 'no-store' to prevent caching issues during development
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}
